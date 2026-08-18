/**
 * =================================================================
 * EIP & Associates – Rate Limiter (In-Memory Sliding Window)
 * =================================================================
 *
 * Implementación de rate limiting basada en el algoritmo Token Bucket
 * con ventana deslizante por dirección IP, optimizada para Next.js
 * Edge Middleware y API Routes.
 *
 * Características:
 * - Limitación por IP con Token Bucket y ventana deslizante
 * - Múltiples niveles de restricción (por segundo, minuto, hora)
 * - Cabeceras HTTP estándar (RateLimit-*, Retry-After)
 * - Respuestas 429 Too Many Requests
 * - Auto-limpieza de entradas expiradas (garbage collection)
 * - Degradación elegante (fail-open) si el limiter falla
 * - Protección contra ataques DoS/DDoS en API Routes
 *
 * Basado en la skill "Rate Limiting Implementation" y mejores
 * prácticas de OWASP para protección de APIs públicas.
 * =================================================================
 */

// ─── Configuración de Límites por Endpoint ────────────────────────

export interface RateLimitConfig {
  /** Número máximo de solicitudes permitidas en la ventana */
  maxRequests: number;
  /** Duración de la ventana en segundos */
  windowSeconds: number;
  /** Capacidad de ráfaga (burst) permitida por encima del límite base */
  burstAllowance?: number;
}

/**
 * Configuración predeterminada para diferentes categorías de endpoints.
 * Los endpoints más sensibles (sync, cron) tienen límites más estrictos.
 */
export const RATE_LIMIT_CONFIGS: Record<string, RateLimitConfig> = {
  // Endpoints públicos de lectura (GET /api/google-reviews)
  "api-public": {
    maxRequests: 60,
    windowSeconds: 60,
    burstAllowance: 10,
  },
  // Endpoints de sincronización protegidos (POST /api/google-reviews/sync, /api/cron/*)
  "api-sync": {
    maxRequests: 5,
    windowSeconds: 60,
    burstAllowance: 2,
  },
  // Endpoint de formulario de contacto (POST /api/contact) - 3 peticiones por 5 minutos
  "api-contact": {
    maxRequests: 3,
    windowSeconds: 300,
    burstAllowance: 1,
  },
  // Páginas estáticas y assets (navegación normal del sitio)
  "page-default": {
    maxRequests: 120,
    windowSeconds: 60,
    burstAllowance: 30,
  },
};

// ─── Estructuras de Datos Internas ─────────────────────────────────

interface SlidingWindowEntry {
  /** Timestamps de las solicitudes recientes dentro de la ventana */
  timestamps: number[];
  /** Conteo de tokens de ráfaga disponibles */
  burstTokens: number;
  /** Último momento de recarga de tokens de ráfaga */
  lastBurstRefill: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetAt: number;
  retryAfterSeconds: number;
}

// ─── Almacenamiento In-Memory con Auto-Limpieza ────────────────────

const ipStore = new Map<string, SlidingWindowEntry>();

/** Intervalo de limpieza automática de entradas expiradas (cada 5 minutos) */
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
/** Tiempo máximo de vida de una entrada sin actividad (10 minutos) */
const MAX_ENTRY_AGE_MS = 10 * 60 * 1000;

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function startCleanupScheduler(): void {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of ipStore.entries()) {
      const latestTimestamp = entry.timestamps[entry.timestamps.length - 1] || 0;
      if (now - latestTimestamp > MAX_ENTRY_AGE_MS) {
        ipStore.delete(key);
      }
    }
  }, CLEANUP_INTERVAL_MS);

  // Evitar que el timer bloquee el cierre del proceso
  if (typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

// Iniciar el scheduler al cargar el módulo
startCleanupScheduler();

// ─── Motor Principal de Rate Limiting ──────────────────────────────

/**
 * Evalúa si una solicitud desde una IP dada debe ser permitida o rechazada.
 * Implementa un algoritmo de ventana deslizante con burst tokens.
 *
 * @param identifier - Dirección IP o identificador único del solicitante
 * @param config - Configuración de límites a aplicar
 * @returns Resultado indicando si la solicitud es permitida con metadatos para cabeceras HTTP
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const windowStart = now - windowMs;
  const burstAllowance = config.burstAllowance ?? 0;
  const effectiveLimit = config.maxRequests + burstAllowance;

  // Obtener o crear la entrada para esta IP
  let entry = ipStore.get(identifier);
  if (!entry) {
    entry = {
      timestamps: [],
      burstTokens: burstAllowance,
      lastBurstRefill: now,
    };
    ipStore.set(identifier, entry);
  }

  // Limpiar timestamps fuera de la ventana activa (sliding window)
  entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart);

  // Recargar burst tokens gradualmente (1 token cada windowSeconds/burstAllowance segundos)
  if (burstAllowance > 0) {
    const timeSinceLastRefill = now - entry.lastBurstRefill;
    const refillInterval = (config.windowSeconds * 1000) / Math.max(burstAllowance, 1);
    const tokensToRefill = Math.floor(timeSinceLastRefill / refillInterval);
    if (tokensToRefill > 0) {
      entry.burstTokens = Math.min(burstAllowance, entry.burstTokens + tokensToRefill);
      entry.lastBurstRefill = now;
    }
  }

  // Contar solicitudes en la ventana activa
  const requestsInWindow = entry.timestamps.length;

  // Evaluar si la solicitud excede el límite base
  if (requestsInWindow >= config.maxRequests) {
    // Intentar consumir un token de ráfaga si está disponible
    if (entry.burstTokens > 0) {
      entry.burstTokens--;
      entry.timestamps.push(now);

      return {
        allowed: true,
        remaining: Math.max(0, effectiveLimit - entry.timestamps.length),
        limit: effectiveLimit,
        resetAt: Math.ceil((entry.timestamps[0] + windowMs) / 1000),
        retryAfterSeconds: 0,
      };
    }

    // Solicitud rechazada: calcular Retry-After
    const oldestTimestamp = entry.timestamps[0] || now;
    const retryAfterMs = oldestTimestamp + windowMs - now;
    const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));

    return {
      allowed: false,
      remaining: 0,
      limit: effectiveLimit,
      resetAt: Math.ceil((oldestTimestamp + windowMs) / 1000),
      retryAfterSeconds,
    };
  }

  // Solicitud permitida dentro del límite base
  entry.timestamps.push(now);

  return {
    allowed: true,
    remaining: Math.max(0, effectiveLimit - entry.timestamps.length),
    limit: effectiveLimit,
    resetAt: Math.ceil((entry.timestamps[0] + windowMs) / 1000),
    retryAfterSeconds: 0,
  };
}

// ─── Utilidades de Extracción de IP ────────────────────────────────

/**
 * Extrae la dirección IP real del solicitante desde las cabeceras HTTP,
 * considerando proxies inversos, CDNs (Cloudflare, Vercel, AWS) y balanceadores.
 *
 * Orden de prioridad:
 * 1. CF-Connecting-IP (Cloudflare)
 * 2. X-Real-IP (Nginx, Vercel)
 * 3. X-Forwarded-For (primer IP = cliente real)
 * 4. Fallback a "unknown"
 */
export function extractClientIp(headers: Headers): string {
  // Cloudflare CDN
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  // Nginx / Vercel edge
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // Estándar X-Forwarded-For (primer IP = cliente original)
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0];
    if (firstIp) return firstIp.trim();
  }

  return "unknown";
}

// ─── Generación de Cabeceras HTTP de Rate Limiting ────────────────

/**
 * Genera las cabeceras HTTP estándar de rate limiting según el draft IETF RateLimit.
 * Incluye: RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset, Retry-After (si aplica).
 */
export function buildRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "RateLimit-Limit": result.limit.toString(),
    "RateLimit-Remaining": result.remaining.toString(),
    "RateLimit-Reset": result.resetAt.toString(),
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.resetAt.toString(),
  };

  if (!result.allowed) {
    headers["Retry-After"] = result.retryAfterSeconds.toString();
  }

  return headers;
}

// ─── Helper para Clasificar Endpoints ──────────────────────────────

/**
 * Determina qué perfil de rate limiting aplicar según la ruta de la solicitud.
 */
export function getConfigForPath(pathname: string): RateLimitConfig {
  // Formulario de contacto
  if (pathname === "/api/contact" || pathname.startsWith("/api/contact")) {
    return RATE_LIMIT_CONFIGS["api-contact"];
  }

  // Endpoints de sincronización / cron (alta sensibilidad)
  if (
    pathname.startsWith("/api/cron") ||
    pathname.includes("/sync")
  ) {
    return RATE_LIMIT_CONFIGS["api-sync"];
  }

  // Endpoints de API públicos de lectura
  if (pathname.startsWith("/api/")) {
    return RATE_LIMIT_CONFIGS["api-public"];
  }

  // Páginas estáticas y navegación general
  return RATE_LIMIT_CONFIGS["page-default"];
}
