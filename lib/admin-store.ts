// Store de overrides del panel de administración — persistido en localStorage,
// misma convención que lib/panel-auth.ts. FIDEICOMISOS y FIDUCIANTES_DEMO de
// panel-data.ts siguen siendo la fuente de verdad; acá solo se guardan los
// campos que un administrador puede editar desde el panel.

import {
  FIDEICOMISOS,
  FIDUCIANTES_DEMO,
  type ActualizacionMensual,
  type EstadoFideicomiso,
  type Fideicomiso,
  type Fiduciante,
} from "@/lib/panel-data";

const OVERRIDES_KEY = "vitaterra_admin_overrides";

type FideicomisoOverride = Partial<
  Pick<
    Fideicomiso,
    | "avanceFisico"
    | "estado"
    | "resultadosDistribuidosUsd"
    | "modulosAdjudicados"
  >
> & { actualizaciones?: ActualizacionMensual[] };

type FiducianteOverride = Partial<
  Pick<Fiduciante, "kycVerificado" | "ddjjFirmada">
>;

type OverridesStore = {
  fideicomisos: Record<string, FideicomisoOverride>;
  fiduciantes: Record<string, FiducianteOverride>;
};

function emptyStore(): OverridesStore {
  return { fideicomisos: {}, fiduciantes: {} };
}

function readOverrides(): OverridesStore {
  if (typeof window === "undefined") return emptyStore();
  const raw = window.localStorage.getItem(OVERRIDES_KEY);
  if (!raw) return emptyStore();
  try {
    const parsed = JSON.parse(raw) as Partial<OverridesStore>;
    return {
      fideicomisos: parsed.fideicomisos ?? {},
      fiduciantes: parsed.fiduciantes ?? {},
    };
  } catch {
    return emptyStore();
  }
}

function writeOverrides(store: OverridesStore) {
  window.localStorage.setItem(OVERRIDES_KEY, JSON.stringify(store));
}

export function getFideicomisos(): Fideicomiso[] {
  const overrides = readOverrides();
  return FIDEICOMISOS.map((f) => {
    const o = overrides.fideicomisos[f.id];
    if (!o) return f;
    return {
      ...f,
      ...o,
      actualizaciones: o.actualizaciones ?? f.actualizaciones,
    };
  });
}

export function getFideicomiso(id: string): Fideicomiso | undefined {
  return getFideicomisos().find((f) => f.id === id);
}

export function updateFideicomiso(
  id: string,
  patch: Partial<
    Pick<
      Fideicomiso,
      | "avanceFisico"
      | "estado"
      | "resultadosDistribuidosUsd"
      | "modulosAdjudicados"
    >
  >
) {
  const overrides = readOverrides();
  const current = overrides.fideicomisos[id] ?? {};
  overrides.fideicomisos[id] = { ...current, ...patch };
  writeOverrides(overrides);
}

export function addActualizacion(
  id: string,
  actualizacion: ActualizacionMensual
) {
  const base = FIDEICOMISOS.find((f) => f.id === id);
  if (!base) return;
  const overrides = readOverrides();
  const current = overrides.fideicomisos[id] ?? {};
  const existentes = current.actualizaciones ?? base.actualizaciones;
  overrides.fideicomisos[id] = {
    ...current,
    actualizaciones: [...existentes, actualizacion],
  };
  writeOverrides(overrides);
}

export function getFiduciantes(): Fiduciante[] {
  const overrides = readOverrides();
  return FIDUCIANTES_DEMO.map((f) => {
    const o = overrides.fiduciantes[f.id];
    if (!o) return f;
    return { ...f, ...o };
  });
}

export function toggleKyc(id: string) {
  const current = getFiduciantes().find((f) => f.id === id);
  if (!current) return;
  const overrides = readOverrides();
  overrides.fiduciantes[id] = {
    ...overrides.fiduciantes[id],
    kycVerificado: !current.kycVerificado,
  };
  writeOverrides(overrides);
}

export function toggleDdjj(id: string) {
  const current = getFiduciantes().find((f) => f.id === id);
  if (!current) return;
  const overrides = readOverrides();
  overrides.fiduciantes[id] = {
    ...overrides.fiduciantes[id],
    ddjjFirmada: !current.ddjjFirmada,
  };
  writeOverrides(overrides);
}

export type { EstadoFideicomiso };
