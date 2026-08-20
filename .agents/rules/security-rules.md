# Reglas de Seguridad y Calidad de Código — EIP & Associates

Este documento consolida las directivas obligatorias de arquitectura, seguridad y buenas prácticas para prevenir la reincidencia en los 23 errores identificados durante la auditoría de código.

---

## 1. Autenticación y Endpoints Críticos (P0)

### 1.1 Política "Fail-Closed" en Endpoints de Cron y Sincronización
- **REGLA**: Todo endpoint que ejecute tareas administrativas, sincronización de feeds (RSS) o tareas de cron (`/api/cron/*`, `/api/*/sync`) **debe requerir un token de seguridad obligatorio** (`CRON_SECRET` o `SYNC_SECRET`).
- **PROHIBIDO**: `if (!secret) return true;` (Fail-Open). Si la variable de entorno no está definida o es nula, la solicitud **DEBE ser rechazada con HTTP 403 Forbidden**.
```typescript
// Correcto: Fail-Closed
const secret = process.env.CRON_SECRET;
if (!secret) {
  console.warn("[Auth] Token no configurado. Acceso denegado por seguridad.");
  return NextResponse.json({ success: false, error: "Access denied." }, { status: 403 });
}
```

### 1.2 Verificación de CAPTCHA / Bot Protection (Turnstile)
- **REGLA**: La verificación de Cloudflare Turnstile en formularios públicos (como `/api/contact`) **es obligatoria**.
- **PROHIBIDO**: Aceptar solicitudes donde `turnstileToken` sea nulo o esté ausente.
- **ENTORNO**: En producción (`process.env.NODE_ENV === "production"`), si la API de verificación de Cloudflare falla por red/error interno, se debe aplicar **Fail-Closed** (`return false`). Solo se permite Fail-Open en entorno de desarrollo local.

---

## 2. Configuración de Red, TLS y CSP (P1)

### 2.1 Cifrado TLS / SSL en Servicios de Correo (SMTP)
- **PROHIBIDO**: Deshabilitar la verificación de certificados TLS (`rejectUnauthorized: false`) de forma global en producción.
- **REGLA**: Usar `rejectUnauthorized: process.env.NODE_ENV === "production"` si se requiere compatibilidad con certificados autofirmados únicamente durante desarrollo local.

### 2.2 Content-Security-Policy (CSP)
- **PROHIBIDO**: Incluir `'unsafe-eval'` en la directiva `script-src` de CSP.
- **REGLA**: Si se integra un servicio de terceros (Cloudflare Turnstile, Google Maps, Supabase), sus dominios oficiales deben registrarse explícitamente en todas las directivas CSP correspondientes (`script-src`, `connect-src`, `frame-src`).

### 2.3 Diagnóstico y Manejo de Excepciones
- **PROHIBIDO**: Bloques `catch (e) {}` o `catch (err) {}` vacíos que traguen excepciones silenciosamente.
- **REGLA**: Al menos registrar un `console.warn` o `console.error` con el contexto suficiente para diagnóstico en producción.

---

## 3. Manejo de Variables de Entorno e Infraestructura (P1 / P2)

### 3.1 Cero Hardcoding de URLs de Infraestructura
- **PROHIBIDO**: Colocar URLs de respaldo hardcodeadas en el código fuente (ej. `process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mklfsdnl...supabase.co"`).
- **REGLA**: Si una variable de entorno requerida no existe, lanzar un error explícito en tiempo de ejecución para evitar apuntar a entornos erróneos.

### 3.2 Protección contra Filtración de Datos Internos (IDOR)
- **PROHIBIDO**: Devolver UUIDs internos de la base de datos o claves primarias autogeneradas (`recordId`, `id`) en las respuestas JSON de APIs públicas a menos que sea estrictamente necesario para la navegación.

---

## 4. Calidad de Código y Estándares Next.js (P2 / P3)

### 4.1 Evitar Parsing de HTML con Expresiones Regulares
- **REGLA**: No usar expresiones complejas de Regex para parsear estructuras HTML de feeds RSS o entradas de usuario (Riesgo de ReDoS e inestabilidad). Usar librerías especializadas como `cheerio` o `linkedom` si se requiere manipulación del DOM.

### 4.2 Limpieza de `remotePatterns` en `next.config.ts`
- **REGLA**: Mantener los dominios de imágenes en `next.config.ts` limpios y sin redundancias. No combinar comodines innecesarios (`*.supabase.co` ya cubre la subdominación).

### 4.3 Uso de APIs Modernas de Node.js
- **PROHIBIDO**: El uso del módulo `url.parse()` deprecado de Node.js.
- **REGLA**: Usar la API estándar `new URL(req.url, base)`.

### 4.4 Prevención de Contaminación del Objeto Global `window`
- **REGLA**: Si un componente React necesita registrar una función callback global en `window` (ej. scripts asíncronos), usar nombres namespaceados (ej. `window.__eip_onloadTurnstile`) y eliminar la propiedad en la función de limpieza del `useEffect`.

---

## Resumen de Verificación en PRs
Antes de unir cualquier cambio a `main`:
1. Ejecutar `npx tsc --noEmit` para verificar 0 errores de tipos.
2. Confirmar que no se hayan introducido `catch` vacíos.
3. Verificar que no haya credenciales o claves privadas hardcodeadas en archivos `.ts`/`.tsx`.
