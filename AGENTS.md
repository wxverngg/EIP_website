# Guía del Desarrollador y Agente AI — EIP & Associates

Este repositorio cuenta con reglas estrictas de seguridad y calidad de código establecidas a partir de una auditoría exhaustiva.

## Reglas Principales

1. **Seguridad en APIs y Crons (Fail-Closed)**:
   - Todo endpoint de sincronización o cron (`/api/cron/*`, `/api/*/sync`) **debe exigir** `CRON_SECRET`. Si falta la variable, responder 403 Forbidden.
   - El CAPTCHA (Turnstile) en formularios de contacto es **obligatorio** (`turnstileToken` requerido en body; en producción es fail-closed).

2. **Seguridad en Red y Cabeceras**:
   - `rejectUnauthorized: process.env.NODE_ENV === "production"` para conexiones SMTP.
   - Sin `'unsafe-eval'` en la política de seguridad de contenido (CSP).

3. **Sin Fallbacks Hardcodeados**:
   - No hardcodear URLs de infraestructura (ej. Supabase) como valor por defecto en el código fuente. Lanzar errores claros en runtime si faltan en `.env.local`.

4. **Tratamiento de Excepciones y Limpieza**:
   - Prohibidos los bloques `catch (e) {}` silenciosos. Registrar siempre contexto en consola.
   - No exponer UUIDs o IDs internos de la BD (`recordId`) en respuestas públicas JSON.
   - Usar `new URL()` en lugar de `url.parse()` deprecado.

Para consultar el estándar completo y detallado por severidades P0-P3, revisa el archivo de reglas en:
[`.agents/rules/security-rules.md`](file:///d:/pagina%20web/.agents/rules/security-rules.md)
