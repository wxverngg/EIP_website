import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  extractClientIp,
  buildRateLimitHeaders,
  getConfigForPath,
} from "@/lib/rate-limiter";

/**
 * =================================================================
 * EIP & Associates – Next.js Edge Middleware
 * =================================================================
 *
 * Middleware global que intercepta TODAS las solicitudes antes de que
 * lleguen a los API Routes o Server Components.
 *
 * Funcionalidades:
 * 1. Rate Limiting por IP con ventana deslizante + burst tokens
 * 2. Cabeceras de seguridad HTTP reforzadas (CSP, HSTS, Permissions-Policy)
 * 3. Respuestas 429 Too Many Requests con JSON y Retry-After
 * 4. Degradación elegante (fail-open) si el limiter falla
 *
 * Compatible con CDNs: Cloudflare, Vercel Edge Network, AWS CloudFront.
 * =================================================================
 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Excluir assets estáticos, imágenes y archivos internos de Next.js ───
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/videos/") ||
    pathname.startsWith("/favicon") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".avif") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".woff2") ||
    pathname.endsWith(".woff") ||
    pathname.endsWith(".map")
  ) {
    return NextResponse.next();
  }

  // ─── Rate Limiting (Fail-Open: si falla, permitir la solicitud) ───
  try {
    const clientIp = extractClientIp(request.headers);
    const config = getConfigForPath(pathname);

    // Crear clave compuesta: IP + categoría de endpoint
    const rateLimitKey = `${clientIp}:${
      pathname.startsWith("/api/cron") || pathname.includes("/sync")
        ? "sync"
        : pathname.startsWith("/api/")
        ? "api"
        : "page"
    }`;

    const result = checkRateLimit(rateLimitKey, config);
    const rateLimitHeaders = buildRateLimitHeaders(result);

    if (!result.allowed) {
      // ─── Respuesta 429 Too Many Requests ───
      const isApiRoute = pathname.startsWith("/api/");

      if (isApiRoute) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            error: "Demasiadas solicitudes. Inténtelo de nuevo más tarde.",
            error_en: "Too many requests. Please try again later.",
            retryAfter: result.retryAfterSeconds,
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              ...rateLimitHeaders,
            },
          }
        );
      }

      // Para páginas HTML, devolver una respuesta HTML elegante
      return new NextResponse(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Too Many Requests | EIP &amp; Associates</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0D0D0D;
      color: #F5F5F5;
      font-family: 'Inter', system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
    }
    .container {
      text-align: center;
      max-width: 480px;
    }
    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 2.5rem;
      font-weight: 400;
      color: #C8A04A;
      margin-bottom: 1rem;
    }
    p {
      color: #A1A1AA;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .retry {
      display: inline-block;
      padding: 0.75rem 2rem;
      background: transparent;
      border: 1px solid #C8A04A;
      color: #C8A04A;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .retry:hover { background: #C8A04A; color: #0D0D0D; }
  </style>
</head>
<body>
  <div class="container">
    <h1>429</h1>
    <p>You have made too many requests in a short period of time. Please wait a few moments before trying again.</p>
    <a href="/" class="retry">Return to Home</a>
  </div>
</body>
</html>`,
        {
          status: 429,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            ...rateLimitHeaders,
          },
        }
      );
    }

    // ─── Solicitud Permitida: Agregar cabeceras de rate limit + seguridad ───
    const response = NextResponse.next();

    // Cabeceras de Rate Limiting (visibles en DevTools para debugging)
    for (const [key, value] of Object.entries(rateLimitHeaders)) {
      response.headers.set(key, value);
    }

    // ─── Cabeceras de Seguridad Reforzadas (CDN / Balanceador) ───

    // HSTS – Forzar HTTPS en navegadores durante 1 año con preload
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );

    // Content-Security-Policy – Restricciones granulares de carga de recursos
    // NOTA: 'unsafe-inline' se mantiene por compatibilidad con Next.js inline scripts.
    // 'unsafe-eval' fue eliminado para prevenir ejecución de código inyectado.
    response.headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://maps.googleapis.com https://challenges.cloudflare.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https://images.unsplash.com https://*.googleusercontent.com https://*.supabase.co https://app.trysoro.com",
        "connect-src 'self' https://*.supabase.co https://maps.googleapis.com https://search.google.com https://challenges.cloudflare.com",
        "frame-src 'self' https://www.google.com https://maps.google.com https://challenges.cloudflare.com",
        "media-src 'self' blob:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
      ].join("; ")
    );

    // Permissions-Policy – Restringir acceso a APIs del navegador
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
    );

    return response;
  } catch (error) {
    // Fail-open: si el rate limiter falla internamente, no bloquear al visitante
    console.error("[Rate Limiter] Error interno (fail-open):", error);
    return NextResponse.next();
  }
}

/**
 * Configuración del matcher de Next.js Middleware.
 * Intercepta todas las rutas excepto assets internos del framework.
 */
export const config = {
  matcher: [
    /*
     * Interceptar todas las rutas excepto:
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (ícono del navegador)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
