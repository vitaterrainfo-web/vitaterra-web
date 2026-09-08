"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  FIDEICOMISOS,
  FIDUCIANTE_DEMO,
  FIDEICOMISO_SLUGS,
  formatUsd,
} from "@/lib/panel-data";

export default function PanelFideicomisosPage() {
  const participaciones = FIDUCIANTE_DEMO.participaciones.map((p) => ({
    ...p,
    fideicomiso: FIDEICOMISOS.find((f) => f.id === p.fideicomisoId)!,
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink-900">
        Fideicomisos
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Detalle de tu participación y el avance de cada fideicomiso.
      </p>

      {participaciones.length === 0 && (
        <p className="mt-8 text-sm text-paper-muted">
          Todavía no adherís a ningún fideicomiso.{" "}
          <Link href="/#oportunidades" className="font-medium text-ink-900 hover:text-brass-600">
            Explorá los proyectos disponibles
          </Link>
          .
        </p>
      )}

      <div className="mt-8 space-y-5">
        {participaciones.map(({ fideicomiso, modulos }) => (
          <div
            key={fideicomiso.id}
            className="rounded-[2px] border border-paper-line bg-paper-50 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-paper-muted">
                  {fideicomiso.categoria} · {fideicomiso.estado}
                </p>
                <p className="mt-1.5 font-display text-lg font-medium text-ink-900">
                  {fideicomiso.nombre}
                </p>
              </div>
              <span className="rounded-[2px] border border-brass-500/40 bg-brass-200/30 px-3 py-1 text-xs font-semibold text-brass-600">
                {modulos} módulos · {formatUsd(modulos * fideicomiso.valorModulo)}
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <Metric
                label="Ciclo del proyecto"
                value={fideicomiso.ciclo}
              />
              <Metric
                label="Avance físico"
                value={`${fideicomiso.avanceFisico}%`}
              />
              <Metric
                label="Módulos adjudicados"
                value={`${fideicomiso.modulosAdjudicados} / ${fideicomiso.modulosTotales}`}
              />
            </div>

            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-paper-200">
              <div
                className="h-full rounded-full bg-brass-500"
                style={{ width: `${fideicomiso.avanceFisico}%` }}
              />
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-paper-muted">
                Últimas actualizaciones
              </p>
              <ul className="mt-3 space-y-3">
                {fideicomiso.actualizaciones
                  .slice()
                  .reverse()
                  .map((a) => (
                    <li
                      key={a.mes}
                      className="flex gap-4 border-l-2 border-paper-line pl-4"
                    >
                      <span className="w-24 shrink-0 text-xs font-medium text-brass-600">
                        {a.mes}
                      </span>
                      <span className="text-sm text-paper-muted">
                        {a.nota}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {FIDEICOMISO_SLUGS[fideicomiso.id] && (
              <Link
                href={`/oportunidades/${FIDEICOMISO_SLUGS[fideicomiso.id]}`}
                className="group mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900 hover:text-brass-600"
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
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[2px] bg-paper-100 px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-paper-muted">
        {label}
      </p>
      <p className="mt-1 font-display text-base font-medium text-ink-900">
        {value}
      </p>
    </div>
  );
}
