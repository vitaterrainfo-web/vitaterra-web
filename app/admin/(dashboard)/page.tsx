"use client";

import { useEffect, useState } from "react";
import { Wallet, TrendingUp, Users, FolderKanban, type LucideIcon } from "lucide-react";
import { getFideicomisos, getFiduciantes } from "@/lib/admin-store";
import { formatUsd, type Fideicomiso, type Fiduciante } from "@/lib/panel-data";

export default function AdminResumenPage() {
  const [fideicomisos, setFideicomisos] = useState<Fideicomiso[]>([]);
  const [fiduciantes, setFiduciantes] = useState<Fiduciante[]>([]);

  useEffect(() => {
    setFideicomisos(getFideicomisos());
    setFiduciantes(getFiduciantes());
  }, []);

  const capitalAdjudicado = fideicomisos.reduce(
    (acc, f) => acc + f.modulosAdjudicados * f.valorModulo,
    0
  );
  const resultadosDistribuidos = fideicomisos.reduce(
    (acc, f) => acc + f.resultadosDistribuidosUsd,
    0
  );
  const porEstado = fideicomisos.reduce<Record<string, number>>((acc, f) => {
    acc[f.estado] = (acc[f.estado] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-medium text-ink-900">
        Resumen
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Vista consolidada de todos los fideicomisos y fiduciantes de la
        plataforma.
      </p>

      <div className="mt-8 grid gap-px overflow-hidden rounded-[2px] border border-paper-line bg-paper-line md:grid-cols-4">
        <StatCard
          icon={Wallet}
          label="Capital total adjudicado"
          value={formatUsd(capitalAdjudicado)}
        />
        <StatCard
          icon={TrendingUp}
          label="Resultados distribuidos"
          value={formatUsd(resultadosDistribuidos)}
        />
        <StatCard
          icon={Users}
          label="Fiduciantes activos"
          value={String(fiduciantes.length)}
        />
        <StatCard
          icon={FolderKanban}
          label="Fideicomisos gestionados"
          value={String(fideicomisos.length)}
        />
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-medium text-ink-900">
          Estado de los fideicomisos
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {Object.entries(porEstado).map(([estado, count]) => (
            <div
              key={estado}
              className="rounded-[2px] border border-paper-line bg-paper-50 p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-paper-muted">
                {estado}
              </p>
              <p className="mt-1.5 font-display text-2xl font-medium text-ink-900">
                {count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
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
