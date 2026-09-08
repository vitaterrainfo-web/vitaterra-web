"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wallet, TrendingUp, FolderKanban, ArrowUpRight } from "lucide-react";
import {
  FIDEICOMISOS,
  FIDUCIANTE_DEMO,
  formatUsd,
} from "@/lib/panel-data";
import { getSessionNombre } from "@/lib/panel-auth";

export default function PanelResumenPage() {
  const [nombre, setNombre] = useState(FIDUCIANTE_DEMO.nombre);

  useEffect(() => {
    setNombre(getSessionNombre() ?? FIDUCIANTE_DEMO.nombre);
  }, []);

  const participaciones = FIDUCIANTE_DEMO.participaciones.map((p) => ({
    ...p,
    fideicomiso: FIDEICOMISOS.find((f) => f.id === p.fideicomisoId)!,
  }));

  const capitalAdjudicado = participaciones.reduce(
    (acc, p) => acc + p.modulos * p.fideicomiso.valorModulo,
    0
  );
  const resultadosDistribuidos = participaciones.reduce(
    (acc, p) =>
      acc +
      (p.fideicomiso.resultadosDistribuidosUsd *
        (p.modulos / p.fideicomiso.modulosAdjudicados) || 0),
    0
  );

  return (
    <div className="p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
        Mi perfil de fiduciante
      </p>
      <h1 className="mt-1.5 font-display text-2xl font-medium text-ink-900">
        Hola, {nombre.split(" ")[0]}
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Seguimiento de tu participación en los fideicomisos privados de
        Vitaterra.
      </p>

      <div className="mt-8 grid gap-px overflow-hidden rounded-[2px] border border-paper-line bg-paper-line md:grid-cols-3">
        <StatCard
          icon={Wallet}
          label="Capital adjudicado"
          value={formatUsd(capitalAdjudicado)}
        />
        <StatCard
          icon={TrendingUp}
          label="Resultados netos por distribuir"
          value={formatUsd(Math.round(resultadosDistribuidos))}
        />
        <StatCard
          icon={FolderKanban}
          label="Proyectos activos"
          value={String(participaciones.length)}
        />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-lg font-medium text-ink-900">
          Mis proyectos
        </h2>
        <Link
          href="/panel/proyectos"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900 hover:text-brass-600"
        >
          Ver todos
          <ArrowUpRight
            size={13}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {participaciones.map(({ fideicomiso, modulos }) => (
          <div
            key={fideicomiso.id}
            className="rounded-[2px] border border-paper-line bg-paper-50 p-5 transition-shadow hover:shadow-[0_16px_30px_-20px_rgba(12,23,18,0.35)]"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-paper-muted">
              {fideicomiso.categoria}
            </p>
            <p className="mt-1.5 font-display text-lg font-medium text-ink-900">
              {fideicomiso.nombre}
            </p>
            <p className="mt-2 text-sm text-paper-muted">
              {modulos} módulos adjudicados ·{" "}
              {formatUsd(modulos * fideicomiso.valorModulo)}
            </p>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-paper-200">
              <div
                className="h-full rounded-full bg-brass-500"
                style={{ width: `${fideicomiso.avanceFisico}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-paper-muted">
              {fideicomiso.avanceFisico}% de avance físico del proyecto
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-paper-50 p-6">
      <Icon size={18} className="text-brass-600" />
      <p className="mt-4 text-xs font-medium text-paper-muted">{label}</p>
      <p className="mt-1 font-display text-xl font-medium text-ink-900">
        {value}
      </p>
    </div>
  );
}
