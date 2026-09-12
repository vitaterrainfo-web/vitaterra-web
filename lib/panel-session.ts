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

export type ActualizacionReal = { mes: string; avance: number; nota: string };

export type FideicomisoReal = {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  estado: string;
  avanceFisico: number;
  valorModulo: number;
  ciclo: string;
  resultadosDistribuidosUsd: number;
  modulosAdjudicados: number;
  modulosTotales: number;
  actualizaciones: ActualizacionReal[];
};

export type ParticipacionReal = {
  modulos: number;
  fideicomiso: FideicomisoReal;
};

// Trae las participaciones reales del fiduciante logueado, con el
// fideicomiso y sus actualizaciones mensuales.
export async function getMisParticipaciones(): Promise<ParticipacionReal[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: fiduciante } = await supabase
    .from("fiduciantes")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (!fiduciante) return [];

  const { data: participaciones } = await supabase
    .from("participaciones")
    .select(
      "modulos, fideicomiso:fideicomisos(id, slug, nombre, categoria, estado, avance_fisico, valor_modulo, ciclo, resultados_distribuidos_usd, modulos_adjudicados, modulos_totales)"
    )
    .eq("fiduciante_id", fiduciante.id);
  if (!participaciones?.length) return [];

  const fideicomisoIds = participaciones
    .map((p) => (Array.isArray(p.fideicomiso) ? p.fideicomiso[0] : p.fideicomiso)?.id)
    .filter((id): id is string => Boolean(id));

  const { data: actualizaciones } = await supabase
    .from("actualizaciones_mensuales")
    .select("fideicomiso_id, mes, avance, nota")
    .in("fideicomiso_id", fideicomisoIds)
    .order("created_at", { ascending: true });

  return mapParticipaciones(participaciones, actualizaciones ?? []);
}

type FideicomisoRow = {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  estado: string;
  avance_fisico: number;
  valor_modulo: number;
  ciclo: string;
  resultados_distribuidos_usd: number;
  modulos_adjudicados: number;
  modulos_totales: number;
};

function mapParticipaciones(
  participaciones: { modulos: number; fideicomiso: FideicomisoRow | FideicomisoRow[] | null }[],
  actualizaciones: { fideicomiso_id: string; mes: string; avance: number; nota: string }[]
): ParticipacionReal[] {
  return participaciones.map((p) => {
    const f = Array.isArray(p.fideicomiso) ? p.fideicomiso[0] : p.fideicomiso;
    return {
      modulos: p.modulos,
      fideicomiso: {
        id: f!.id,
        slug: f!.slug,
        nombre: f!.nombre,
        categoria: f!.categoria,
        estado: f!.estado,
        avanceFisico: f!.avance_fisico,
        valorModulo: Number(f!.valor_modulo),
        ciclo: f!.ciclo,
        resultadosDistribuidosUsd: Number(f!.resultados_distribuidos_usd),
        modulosAdjudicados: f!.modulos_adjudicados,
        modulosTotales: f!.modulos_totales,
        actualizaciones: (actualizaciones ?? [])
          .filter((a) => a.fideicomiso_id === f!.id)
          .map((a) => ({ mes: a.mes, avance: a.avance, nota: a.nota })),
      },
    };
  });
}

export type ConvenioReal = {
  id: string;
  estado: string;
  tramo: string | null;
  montoUsd: number | null;
  firmadoAt: string | null;
  createdAt: string;
  fideicomisoNombre: string;
};

// Convenios de adhesión reales (creados vía ZapSign) del fiduciante
// logueado -- reemplaza los documentos de ejemplo hardcodeados del panel.
export async function getMisConvenios(): Promise<ConvenioReal[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: fiduciante } = await supabase
    .from("fiduciantes")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (!fiduciante) return [];

  const { data } = await supabase
    .from("convenios")
    .select(
      "id, estado, tramo, monto_usd, firmado_at, created_at, fideicomiso:fideicomisos(nombre)"
    )
    .eq("fiduciante_id", fiduciante.id)
    .order("created_at", { ascending: false });

  return (data ?? []).map((c) => {
    const f = Array.isArray(c.fideicomiso) ? c.fideicomiso[0] : c.fideicomiso;
    return {
      id: c.id,
      estado: c.estado,
      tramo: c.tramo,
      montoUsd: c.monto_usd === null ? null : Number(c.monto_usd),
      firmadoAt: c.firmado_at,
      createdAt: c.created_at,
      fideicomisoNombre: f?.nombre ?? "",
    };
  });
}
