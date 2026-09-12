"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type RegistroState = { error: string | null };

export async function registrar(
  _prevState: RegistroState,
  formData: FormData
): Promise<RegistroState> {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const acepta = formData.get("acepta") === "on";

  if (!nombre || !email) {
    return { error: "Completá tu nombre y un email válido para continuar." };
  }
  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }
  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden." };
  }
  if (!acepta) {
    return {
      error:
        "Necesitamos que aceptes la declaración jurada y los Términos y Condiciones para continuar.",
    };
  }

  // El origin se arma en tiempo de request (no un env var fijo) para que el
  // link de confirmación apunte siempre al dominio que el usuario está
  // usando de verdad -- funciona igual en localhost, en un preview de Vercel
  // o en producción.
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nombre },
      emailRedirectTo: `${protocol}://${host}/auth/confirm?next=/panel/kyc`,
    },
  });

  if (error) {
    if (error.message.toLowerCase().includes("already registered")) {
      return { error: "Ya existe una cuenta con ese email. Iniciá sesión." };
    }
    return { error: "No pudimos crear tu perfil. Probá de nuevo." };
  }

  redirect(`/panel/verificar?email=${encodeURIComponent(email)}`);
}
