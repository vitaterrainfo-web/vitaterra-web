"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export type ResendState = { sent: boolean; error: string | null };

export async function reenviarConfirmacion(
  _prevState: ResendState,
  formData: FormData
): Promise<ResendState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { sent: false, error: "Falta el email." };

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${protocol}://${host}/auth/confirm?next=/panel/kyc`,
    },
  });

  if (error) {
    return { sent: false, error: "No pudimos reenviar el email. Probá de nuevo en un minuto." };
  }
  return { sent: true, error: null };
}
