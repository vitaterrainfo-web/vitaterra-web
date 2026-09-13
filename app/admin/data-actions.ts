"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ADMIN_EMAIL } from "@/lib/auth/constants";
import { mesOrden } from "@/lib/panel-data";

async function requireAdmin(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email !== ADMIN_EMAIL) {
    throw new Error("No autorizado.");
  }
  return user.email;
}

async function registrarAuditoria(
  adminEmail: string,
  accion: string,
  entidad: string,
  entidadId: string,
  detalle: Record<string, unknown>
) {
  const db = createAdminClient();
  await db
    .from("audit_log")
    .insert({ admin_email: adminEmail, accion, entidad, entidad_id: entidadId, detalle });
}

export type AdminFideicomiso = {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  estado: string;
  imagen: string;
  presupuesto_meta: number;
  moneda: string;
  ciclo: string;
  avance_fisico: number;
  modulos_totales: number;
  modulos_adjudicados: number;
  valor_modulo: number;
  resultados_distribuidos_usd: number;
  fiduciantes_activos: number;
  actualizaciones: { mes: string; avance: number; nota: string }[];
};

export async function adminListFideicomisos(): Promise<AdminFideicomiso[]> {
  await requireAdmin();
  const db = createAdminClient();

  const { data: fideicomisos } = await db
    .from("fideicomisos")
    .select("*")
    .order("created_at", { ascending: true });
  const { data: participaciones } = await db
    .from("participaciones")
    .select("fideicomiso_id, fiduciante_id");
  const { data: actualizaciones } = await db
    .from("actualizaciones_mensuales")
    .select("fideicomiso_id, mes, avance, nota")
    .order("created_at", { ascending: true });

  return (fideicomisos ?? []).map((f) => {
    const activos = new Set(
      (participaciones ?? [])
        .filter((p) => p.fideicomiso_id === f.id)
        .map((p) => p.fiduciante_id)
    );
    return {
      ...f,
      fiduciantes_activos: activos.size,
      actualizaciones: (actualizaciones ?? [])
        .filter((a) => a.fideicomiso_id === f.id)
        .map((a) => ({ mes: a.mes, avance: a.avance, nota: a.nota }))
        .sort((a, b) => mesOrden(a.mes) - mesOrden(b.mes)),
    };
  });
}

export async function adminGetFideicomiso(
  id: string
): Promise<AdminFideicomiso | null> {
  const todos = await adminListFideicomisos();
  return todos.find((f) => f.id === id) ?? null;
}

export async function adminActualizarFideicomiso(
  id: string,
  patch: {
    avance_fisico: number;
    estado: string;
    modulos_adjudicados: number;
    resultados_distribuidos_usd: number;
  }
) {
  const adminEmail = await requireAdmin();
  const db = createAdminClient();
  const { error } = await db
    .from("fideicomisos")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await registrarAuditoria(adminEmail, "actualizar", "fideicomiso", id, patch);
}

export async function adminAgregarActualizacion(
  fideicomisoId: string,
  actualizacion: { mes: string; avance: number; nota: string }
) {
  const adminEmail = await requireAdmin();
  const db = createAdminClient();
  const { error } = await db
    .from("actualizaciones_mensuales")
    .insert({ fideicomiso_id: fideicomisoId, ...actualizacion });
  if (error) throw new Error(error.message);
  await registrarAuditoria(
    adminEmail,
    "agregar_actualizacion",
    "fideicomiso",
    fideicomisoId,
    actualizacion
  );
}

export type AdminFiduciante = {
  id: string;
  nombre: string;
  email: string;
  cuit: string | null;
  telefono: string | null;
  domicilio: string | null;
  kyc_verificado: boolean;
  ddjj_firmada: boolean;
  participaciones: { fideicomiso_nombre: string; modulos: number }[];
};

export async function adminListFiduciantes(): Promise<AdminFiduciante[]> {
  await requireAdmin();
  const db = createAdminClient();

  const { data: fiduciantes } = await db
    .from("fiduciantes")
    .select("*")
    .order("created_at", { ascending: true });
  const { data: participaciones } = await db
    .from("participaciones")
    .select("fiduciante_id, modulos, fideicomiso:fideicomisos(nombre)");

  return (fiduciantes ?? []).map((f) => ({
    id: f.id,
    nombre: f.nombre,
    email: f.email,
    cuit: f.cuit,
    telefono: f.telefono,
    domicilio: f.domicilio,
    kyc_verificado: f.kyc_verificado,
    ddjj_firmada: f.ddjj_firmada,
    participaciones: (participaciones ?? [])
      .filter((p) => p.fiduciante_id === f.id)
      .map((p) => {
        const fi = Array.isArray(p.fideicomiso) ? p.fideicomiso[0] : p.fideicomiso;
        return { fideicomiso_nombre: fi?.nombre ?? "", modulos: p.modulos };
      }),
  }));
}

export async function adminSetKyc(id: string, verificado: boolean) {
  const adminEmail = await requireAdmin();
  const db = createAdminClient();
  const { error } = await db
    .from("fiduciantes")
    .update({ kyc_verificado: verificado })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await registrarAuditoria(adminEmail, "kyc", "fiduciante", id, { verificado });
}

export async function adminSetDdjj(id: string, firmada: boolean) {
  const adminEmail = await requireAdmin();
  const db = createAdminClient();
  const { error } = await db
    .from("fiduciantes")
    .update({ ddjj_firmada: firmada })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await registrarAuditoria(adminEmail, "ddjj", "fiduciante", id, { firmada });
}

export type AdminConvenio = {
  id: string;
  estado: string;
  tramo: string | null;
  monto_usd: number | null;
  firmado_at: string | null;
  created_at: string;
  storage_path: string | null;
  fiduciante_nombre: string;
  fideicomiso_nombre: string;
};

export async function adminListConvenios(): Promise<AdminConvenio[]> {
  await requireAdmin();
  const db = createAdminClient();

  const { data } = await db
    .from("convenios")
    .select(
      "id, estado, tramo, monto_usd, firmado_at, created_at, storage_path, fiduciante:fiduciantes(nombre), fideicomiso:fideicomisos(nombre)"
    )
    .order("created_at", { ascending: false });

  return (data ?? []).map((c) => {
    const fid = Array.isArray(c.fiduciante) ? c.fiduciante[0] : c.fiduciante;
    const fdc = Array.isArray(c.fideicomiso) ? c.fideicomiso[0] : c.fideicomiso;
    return {
      id: c.id,
      estado: c.estado,
      tramo: c.tramo,
      monto_usd: c.monto_usd === null ? null : Number(c.monto_usd),
      firmado_at: c.firmado_at,
      created_at: c.created_at,
      storage_path: c.storage_path,
      fiduciante_nombre: fid?.nombre ?? "",
      fideicomiso_nombre: fdc?.nombre ?? "",
    };
  });
}

export async function adminUrlDescarga(convenioId: string): Promise<string | null> {
  await requireAdmin();
  const db = createAdminClient();
  const { data: convenio } = await db
    .from("convenios")
    .select("storage_path")
    .eq("id", convenioId)
    .maybeSingle();
  if (!convenio?.storage_path) return null;

  const { data, error } = await db.storage
    .from("convenios")
    .createSignedUrl(convenio.storage_path, 60);
  if (error) return null;
  return data.signedUrl;
}

export type AuditLogEntry = {
  id: string;
  admin_email: string;
  accion: string;
  entidad: string;
  entidad_id: string;
  detalle: Record<string, unknown>;
  created_at: string;
};

export async function adminListAuditoria(): Promise<AuditLogEntry[]> {
  await requireAdmin();
  const db = createAdminClient();
  const { data } = await db
    .from("audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  return data ?? [];
}
