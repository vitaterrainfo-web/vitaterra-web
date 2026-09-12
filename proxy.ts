import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { ADMIN_EMAIL } from "@/lib/auth/constants";

// Rutas de /panel/* que no requieren sesión (login, alta, y la pantalla que
// pide confirmar el email antes de que exista una sesión real).
const PANEL_PUBLIC_PATHS = ["/panel/login", "/panel/registro", "/panel/verificar"];

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

// Refresca la sesión de Supabase (el token expira y hay que renovarlo en
// cada request) y devuelve la response con las cookies actualizadas. Patrón
// oficial de @supabase/ssr para Next.js -- ver
// https://supabase.com/docs/guides/auth/server-side/nextjs
async function updateSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // No usar getSession(): getUser() revalida el token contra el servidor de
  // Supabase en vez de confiar ciegamente en la cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user || user.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (
    pathname.startsWith("/panel") &&
    !PANEL_PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    if (!user) {
      return NextResponse.redirect(new URL("/panel/login", request.url));
    }

    // El KYC lo valida el equipo de Grupo Agro desde el panel admin, no es
    // autoservicio: mientras no esté verificado, solo puede ver /panel/kyc.
    const { data: fiduciante } = await supabase
      .from("fiduciantes")
      .select("kyc_verificado")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (!fiduciante?.kyc_verificado && pathname !== "/panel/kyc") {
      return NextResponse.redirect(new URL("/panel/kyc", request.url));
    }
    if (fiduciante?.kyc_verificado && pathname === "/panel/kyc") {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rule = limitFor(pathname);
  if (!rule) return updateSupabaseSession(request);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const key = `${rule.key}:${ip}`;
  const now = Date.now();

  if (hits.size > 5000) pruneExpired(now);

  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return updateSupabaseSession(request);
  }

  entry.count += 1;
  if (entry.count > rule.max) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Probá de nuevo en un minuto." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  return updateSupabaseSession(request);
}

export const config = {
  matcher: ["/panel/:path*", "/admin/:path*"],
};
