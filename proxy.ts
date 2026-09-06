import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limit liviano en memoria, sin dependencias externas (Next.js 16 renombró
// `middleware.ts` a `proxy.ts` / `middleware()` a `proxy()`).
//
// LIMITACIÓN REAL, no cosmética: este Map vive en la memoria de UNA sola
// instancia del servidor. En un despliegue serverless (Vercel y similares)
// cada cold start arranca el contador en cero, y si hay más de una instancia
// corriendo en simultáneo el conteo no se comparte entre ellas — un atacante
// con IPs rotativas o que golpea distintas instancias lo esquiva sin
// esfuerzo. Esto alcanza para frenar abuso trivial de un solo origen, no
// para un ataque de denegación de servicio real. Antes de manejar plata o
// PII real de fiduciantes, esto tiene que moverse a un store compartido
// (Upstash/Redis) o quedar cubierto por un WAF de plataforma (Cloudflare,
// Vercel Firewall) delante de la app.
const WINDOW_MS = 60_000;

const LIMITS: Record<string, number> = {
  "/panel/login": 20,
  "/panel/verificar": 20,
  "/panel/kyc": 30,
  "/panel": 60,
  "/admin/login": 10,
  "/admin": 60,
};

const PREFIXES = Object.keys(LIMITS).sort((a, b) => b.length - a.length);

const hits = new Map<string, { count: number; resetAt: number }>();

function limitFor(pathname: string): { key: string; max: number } | null {
  for (const prefix of PREFIXES) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) {
      return { key: prefix, max: LIMITS[prefix] };
    }
  }
  return null;
}

function pruneExpired(now: number) {
  for (const [key, entry] of hits) {
    if (now > entry.resetAt) hits.delete(key);
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rule = limitFor(pathname);
  if (!rule) return NextResponse.next();

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const key = `${rule.key}:${ip}`;
  const now = Date.now();

  if (hits.size > 5000) pruneExpired(now);

  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return NextResponse.next();
  }

  entry.count += 1;
  if (entry.count > rule.max) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Probá de nuevo en un minuto." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*", "/admin/:path*"],
};
