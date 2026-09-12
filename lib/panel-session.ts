"use client";

import { createClient } from "@/lib/supabase/client";

export type FiducianteActual = {
  nombre: string;
  email: string;
  telefono: string | null;
  domicilio: string | null;
  cuit: string | null;
  kyc_verificado: boolean;
  ddjj_firmada: boolean;
};

// Reemplaza los antiguos getSessionNombre()/getSessionEmail() de
// lib/panel-auth.ts (localStorage) -- ahora lee el perfil real desde
// Supabase. RLS ya garantiza que cada fiduciante solo puede leer su propia
// fila (auth_user_id = auth.uid()).
export async function getCurrentFiduciante(): Promise<FiducianteActual | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("fiduciantes")
    .select("nombre, email, telefono, domicilio, cuit, kyc_verificado, ddjj_firmada")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  return (
    data ?? {
      nombre: user.email ?? "",
      email: user.email ?? "",
      telefono: null,
      domicilio: null,
      cuit: null,
      kyc_verificado: false,
      ddjj_firmada: false,
    }
  );
}

export async function getModulosAdjudicados(): Promise<number> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 0;

  const { data: fiduciante } = await supabase
    .from("fiduciantes")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (!fiduciante) return 0;

  const { data } = await supabase
    .from("participaciones")
    .select("modulos")
    .eq("fiduciante_id", fiduciante.id);

  return (data ?? []).reduce((acc, p) => acc + p.modulos, 0);
}
