# Seguridad de Vita Terra — estado actual y checklist antes de lanzar

Este documento es para quien tome la decisión de negocio de lanzar el sitio
con plata y datos reales de fiduciantes. No es un ensayo de seguridad
genérico: es la lista concreta de lo que hoy es una maqueta (demo) y lo que
tiene que cambiar antes de que esto maneje dinero real o datos personales
reales, en un país (Argentina) donde el flujo de KYC/DDJJ está regulado por
la UIF.

## Lo que hay hoy (y por qué NO alcanza para producción)

| Área | Estado actual | Riesgo si se lanza así |
|---|---|---|
| Login del panel (`/panel/login`) | Contraseña fija hardcodeada en el código (`lib/panel-auth.ts`), visible en pantalla en la propia página ("Demo: ..."). No hay backend. | Cualquiera que abra el código fuente o lea la pantalla entra. No hay usuarios reales, no hay forma de dar de baja acceso a alguien. |
| Verificación por email (`/panel/verificar`) | Acepta **cualquier código de 6 dígitos**. No se envía ningún email real. | No verifica identidad de nada. Es un paso decorativo hoy. |
| Sesión del panel | Se guarda en `localStorage` del navegador, sin firma ni validación de servidor. | Cualquiera con acceso a las devtools del navegador puede editar `localStorage` y saltarse los 3 pasos (login → OTP → KYC) escribiendo el estado "done" a mano. No hay expiración real del lado del servidor, ni forma de invalidar una sesión remotamente. |
| KYC (`/panel/kyc`) | Formulario pide DNI, CUIT y dos fotos, pero **no sube ni guarda nada real** — solo valida que se haya seleccionado un archivo y guarda el nombre en memoria del navegador. | Hoy no hay ningún dato de identidad real en riesgo porque no se persiste nada. Pero el formulario ya le pide al usuario datos sensibles (DNI, CUIT, foto de documento, selfie) — si se conecta un backend sin cifrado/control de acceso, ahí sí hay riesgo real. |
| Declaración jurada de origen de fondos | No implementada todavía como tal (fuera del alcance de esta pasada). | Cuando se implemente, es contenido regulado por UIF — ver sección legal más abajo. |
| Rate limiting | `proxy.ts` nuevo, en memoria, por instancia de servidor. Cubre `/panel/*` y `/admin/*`. | Se resetea en cada cold start y no se comparte entre instancias — ver limitación técnica documentada en el propio archivo. Además, como el login de hoy es 100% client-side (no pega contra un servidor), este rate limit frena scraping/DoS de la *página*, pero no frena fuerza bruta de la contraseña demo en sí, porque esa validación no pasa por el servidor. |
| Headers de seguridad | Agregados en `next.config.ts`: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Strict-Transport-Security. | Buena base, pero la CSP permite `'unsafe-inline'` en scripts/estilos porque Next.js lo necesita para hidratar la página sin perder el sitio estático (ver comentario en `next.config.ts`). Es un endurecimiento real, no defensa perfecta contra XSS. |
| Panel admin (`app/admin/**`) | Lo está construyendo otro agente en paralelo, en otro worktree. No fue tocado ni revisado en esta pasada. | Necesita su propia revisión de seguridad antes de lanzar — no asumir que hereda nada de esta pasada más que las cabeceras HTTP globales y el rate limit de `/admin/*` en `proxy.ts`. |
| Secretos / `.env` | No hay secretos hardcodeados en el código, ni archivos `.env` comiteados al repo. `.gitignore` ya excluye `.env*`. | Sin hallazgos hoy. Mantener así: cuando se conecte Supabase u otro backend, las claves van a variables de entorno, nunca al código. |

## Bloqueadores para lanzar con plata/datos reales

Estos puntos son innegociables antes de manejar un fiduciante real:

1. **Backend real de autenticación.** Contraseñas con hash (bcrypt/argon2), nunca en texto plano ni hardcodeadas. Validación de sesión del lado del servidor (cookie `httpOnly` + `secure` + firmada, no `localStorage`).
2. **OTP real por email.** Un proveedor de envío (ej. Resend, SendGrid, Amazon SES) que genere y valide un código de un solo uso con expiración corta — no "cualquier código de 6 dígitos sirve".
3. **Almacenamiento real y seguro de documentos de KYC.** Cifrado en reposo, bucket con acceso restringido (no público), registro de auditoría de quién accede a qué documento y cuándo. Hoy no se sube nada, así que no hay nada que asegurar todavía — pero el día que se conecte, esto tiene que estar desde el primer commit, no "para después".
4. **Rate limiting compartido entre instancias.** Mover el `Map` en memoria de `proxy.ts` a Redis/Upstash (o equivalente) antes de que el rate limit sea la única defensa contra abuso de un endpoint que ya mueve plata o datos reales.
5. **WAF / capa anti-DDoS delante del deploy.** Cloudflare (o el firewall de la plataforma de hosting) delante de Vercel. El rate limit en memoria de esta pasada es una mitigación liviana, no un reemplazo de una capa de borde real.
6. **Revisión legal específica de UIF.** Esto no lo resuelve ningún cambio de código: un abogado especializado en el régimen de Prevención de Lavado de Activos y Financiamiento del Terrorismo (UIF Argentina) tiene que confirmar, para el flujo real de "declaración jurada de origen lícito de fondos": qué datos hay que retener, por cuánto tiempo, en qué formato, y qué reportes (ROS, etc.) hay que poder generar. El copy legal del sitio no es una fuente confiable para esto.
7. **Dejar de mostrar la contraseña demo en pantalla** (`app/panel/login/page.tsx`, línea con "Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}") y sacar `DEMO_PASSWORD`/`checkOtp` de la build de producción — hoy está bien que exista para que el cliente pruebe el flujo, pero **no debe llegar a producción tal cual**. Esta pasada no lo tocó a propósito (no es su alcance), pero queda anotado como bloqueador explícito.

## Lo que esta pasada sí resolvió (2026-09-05/06)

- `proxy.ts` — rate limiting en memoria en `/panel/login`, `/panel/verificar`, `/panel/kyc`, `/panel` (dashboard) y `/admin/*` (este último no existía todavía al momento de esta pasada, pero el matcher ya lo cubre para cuando el otro agente lo termine).
- `next.config.ts` — cabeceras de seguridad HTTP en todo el sitio (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Strict-Transport-Security) + `poweredByHeader: false`.
- Verificado: no hay secretos hardcodeados, no hay `.env` comiteado al repo, `.gitignore` ya cubre lo necesario.
- Fix de build no relacionado a seguridad pero bloqueante: configuración inválida de `next/font` (Fraunces) en `app/layout.tsx` rompía `npm run build` por completo — se corrigió `weight` a `"variable"` para que sea compatible con los `axes` variables que ya usaba.

## Fuera de alcance de esta pasada (a propósito)

- No se tocó `app/admin/**`, `lib/admin-auth.ts`, `lib/admin-store.ts`, `components/admin/**` (otro agente los está construyendo en paralelo).
- No se conectó ningún backend real (Supabase se está configurando aparte). No se agregó ninguna dependencia de rate limiting externa (Redis/Upstash) — a propósito, para no adelantarse a esa migración.
- No se tocó copy de marketing ni contenido legal existente.
