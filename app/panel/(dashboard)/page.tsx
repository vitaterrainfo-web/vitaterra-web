"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  FolderKanban,
  Gauge,
  ArrowUpRight,
  Info,
} from "lucide-react";
import {
  FIDEICOMISOS,
  FIDUCIANTE_DEMO,
  FIDEICOMISO_SLUGS,
  formatUsd,
} from "@/lib/panel-data";
import { getCurrentFiduciante } from "@/lib/panel-session";
import { LineChart, DonutChart } from "@/components/panel/charts";

export default function PanelInversionesPage() {
  const [nombre, setNombre] = useState(FIDUCIANTE_DEMO.nombre);

  useEffect(() => {
    getCurrentFiduciante().then((f) => {
      if (f?.nombre) setNombre(f.nombre);
    });
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
  const avanceFisicoPromedio = participaciones.length
    ? Math.round(
        participaciones.reduce(
          (acc, p) => acc + p.fideicomiso.avanceFisico * (p.modulos * p.fideicomiso.valorModulo),
          0
        ) / (capitalAdjudicado || 1)
      )
    : 0;

  // Evolución del avance físico del fideicomiso con mayor capital aportado.
  const principal = participaciones
    .slice()
    .sort(
      (a, b) =>
        b.modulos * b.fideicomiso.valorModulo - a.modulos * a.fideicomiso.valorModulo
    )[0];
  const evolucion =
    principal?.fideicomiso.actualizaciones.map((a) => ({
      label: a.mes.split(" ")[0].slice(0, 3),
      value: a.avance,
    })) ?? [];

  const distribucion = participaciones.map((p) => ({
    label: p.fideicomiso.nombre,
    value: p.modulos * p.fideicomiso.valorModulo,
  }));

  const actualizaciones = participaciones
    .flatMap((p) =>
      p.fideicomiso.actualizaciones.map((a) => ({
        ...a,
        fideicomiso: p.fideicomiso.nombre,
      }))
    )
    .reverse();

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
        Mis inversiones
      </p>
      <h1 className="mt-1.5 font-display text-2xl font-medium text-ink-900">
        Hola, {nombre.split(" ")[0]}
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Panel consolidado de tu participación en los fideicomisos privados de
        Vita Terra.
      </p>

      <div className="mt-6 flex gap-3 rounded-[2px] border border-brass-500/30 bg-brass-200/15 px-4 py-3.5">
        <Info size={16} className="mt-0.5 shrink-0 text-brass-600" />
        <p className="text-xs leading-relaxed text-paper-muted">
          Los resultados netos que se muestran a continuación dependen del
          desempeño real de cada proyecto productivo. Los datos históricos y
          las proyecciones son estimativos y no garantizan resultados
          futuros.
        </p>
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-[2px] border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-4">
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
          icon={Gauge}
          label="Avance físico promedio"
          value={`${avanceFisicoPromedio}%`}
        />
        <StatCard
          icon={FolderKanban}
          label="Fideicomisos activos"
          value={String(participaciones.length)}
        />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-lg font-medium text-ink-900">
          Mis fideicomisos activos
        </h2>
        <Link
          href="/panel/fideicomisos"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900 hover:text-brass-600"
        >
          Ver todos
          <ArrowUpRight
            size={13}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {participaciones.map(({ fideicomiso, modulos }) => (
          <div
            key={fideicomiso.id}
            className="rounded-[2px] border border-paper-line bg-paper-50 p-5 transition-shadow hover:shadow-[0_16px_30px_-20px_rgba(12,23,18,0.35)]"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-paper-muted">
                {fideicomiso.categoria}
              </p>
              <span className="shrink-0 rounded-[2px] border border-brass-500/40 bg-brass-200/30 px-2 py-0.5 text-[11px] font-semibold text-brass-600">
                {fideicomiso.avanceFisico}%
              </span>
            </div>
            <p className="mt-1.5 font-display text-base font-medium text-ink-900">
              {fideicomiso.nombre}
            </p>
            <p className="mt-3 text-sm text-paper-muted">
              {modulos} módulos · {formatUsd(modulos * fideicomiso.valorModulo)}
            </p>
            <p className="text-xs text-paper-muted">
              Ciclo: {fideicomiso.ciclo}
            </p>
            {FIDEICOMISO_SLUGS[fideicomiso.id] && (
              <Link
                href={`/oportunidades/${FIDEICOMISO_SLUGS[fideicomiso.id]}`}
                className="group mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900 hover:text-brass-600"
              >
                Ver ficha del proyecto
                <ArrowUpRight
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[2px] border border-paper-line bg-paper-50 p-6">
          <h3 className="font-display text-base font-medium text-ink-900">
            Evolución del avance físico
          </h3>
          <p className="mt-1 text-xs text-paper-muted">
            {principal?.fideicomiso.nombre ?? "Sin datos"}
          </p>
          <div className="mt-4">
            {evolucion.length > 0 ? (
              <LineChart points={evolucion} />
            ) : (
              <p className="text-sm text-paper-muted">
                Todavía no hay actualizaciones cargadas.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[2px] border border-paper-line bg-paper-50 p-6">
          <h3 className="font-display text-base font-medium text-ink-900">
            Distribución del capital
          </h3>
          <p className="mt-1 text-xs text-paper-muted">
            Por fideicomiso adjudicado
          </p>
          <div className="mt-5">
            {distribucion.length > 0 ? (
              <DonutChart segments={distribucion} />
            ) : (
              <p className="text-sm text-paper-muted">
                Todavía no tenés módulos adjudicados.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-medium text-ink-900">
          Últimas actualizaciones
        </h2>
        <div className="mt-4 overflow-x-auto rounded-[2px] border border-paper-line bg-paper-50">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-paper-line text-xs uppercase tracking-wide text-paper-muted">
                <th className="px-5 py-3 font-medium">Mes</th>
                <th className="px-5 py-3 font-medium">Fideicomiso</th>
                <th className="px-5 py-3 font-medium">Novedad</th>
              </tr>
            </thead>
            <tbody>
              {actualizaciones.map((a, i) => (
                <tr
                  key={`${a.fideicomiso}-${a.mes}`}
                  className={i !== 0 ? "border-t border-paper-line" : ""}
                >
                  <td className="whitespace-nowrap px-5 py-3.5 font-medium text-brass-600">
                    {a.mes}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-ink-900">
                    {a.fideicomiso}
                  </td>
                  <td className="px-5 py-3.5 text-paper-muted">{a.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
