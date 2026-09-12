import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// El panel de fiduciante/admin usa el cliente de Supabase del lado del
// browser (lib/supabase/client.ts) para leer datos en componentes "use
// client" -- sin declarar esto en connect-src, el default-src 'self' de
// abajo bloquea silenciosamente esas llamadas (falla como "Failed to
// fetch" sin ningún error visible en la respuesta).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

// Sin 'unsafe-inline' en script-src/style-src esto rompe: Next.js inyecta el
// payload de React Server Components en un <script> inline en cada página
// (self.__next_f.push(...)) y varios componentes usan estilos inline
// (clip-path, transition-delay, etc.). La alternativa "correcta" es CSP por
// nonce vía proxy.ts, pero eso obliga a renderizado dinámico en todas las
// páginas (se pierde la generación estática del sitio, que hoy es 100%
// estático) — no vale la pena para este sitio de marketing + panel demo.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self' ${supabaseUrl};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
