"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAIL } from "@/lib/auth/constants";

export type AdminLoginState = { error: string | null };

export async function adminLogin(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Email o contraseña incorrectos." };
  }

  if (data.user.email !== ADMIN_EMAIL) {
    // No es la cuenta de administración: no dejamos una sesión válida
    // colgada, aunque proxy.ts igual le bloquearía el resto de /admin.
    await supabase.auth.signOut();
    return { error: "Esta cuenta no tiene acceso al panel de administración." };
  }

  redirect("/admin");
}
