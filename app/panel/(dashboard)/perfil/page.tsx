"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { FIDUCIANTE_DEMO } from "@/lib/panel-data";
import { getSessionNombre, getSessionEmail } from "@/lib/panel-auth";

export default function PanelPerfilPage() {
  const f = FIDUCIANTE_DEMO;
  const [nombre, setNombre] = useState(f.nombre);
  const [email, setEmail] = useState(f.email);

  useEffect(() => {
    setNombre(getSessionNombre() ?? f.nombre);
    setEmail(getSessionEmail() ?? f.email);
  }, [f.nombre, f.email]);

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-medium text-ink-900">
        Mi perfil
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Datos de tu perfil de fiduciante y estado de tu validación de
        identidad.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field label="Nombre y apellido" value={nombre} />
        <Field label="Email" value={email} />
        <Field label="CUIT / CUIL" value={f.cuit} />
        <Field
          label="Módulos totales adjudicados"
          value={String(
            f.participaciones.reduce((acc, p) => acc + p.modulos, 0)
          )}
        />
      </div>

      <div className="mt-8 space-y-3">
        <StatusRow
          ok={f.kycVerificado}
          label="Validación de identidad (KYC)"
          okText="Verificada"
          badText="Pendiente"
        />
        <StatusRow
          ok={f.ddjjFirmada}
          label="Declaración jurada de origen lícito de fondos"
          okText="Firmada"
          badText="Pendiente de firma"
        />
      </div>

      <p className="mt-8 text-xs text-paper-muted">
        Demo: este perfil es de prueba. En producción, estos datos se
        actualizan a través del circuito de KYC y del back office de
        Vitaterra.
      </p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[2px] border border-paper-line bg-paper-50 px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-paper-muted">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-ink-900">{value}</p>
    </div>
  );
}

function StatusRow({
  ok,
  label,
  okText,
  badText,
}: {
  ok: boolean;
  label: string;
  okText: string;
  badText: string;
}) {
  const Icon = ok ? ShieldCheck : ShieldAlert;
  return (
    <div className="flex items-center justify-between rounded-[2px] border border-paper-line bg-paper-50 px-4 py-3.5">
      <span className="text-sm text-ink-900">{label}</span>
      <span
        className={`flex items-center gap-1.5 text-xs font-semibold ${
          ok ? "text-clay-600" : "text-brass-600"
        }`}
      >
        <Icon size={14} />
        {ok ? okText : badText}
      </span>
    </div>
  );
}
