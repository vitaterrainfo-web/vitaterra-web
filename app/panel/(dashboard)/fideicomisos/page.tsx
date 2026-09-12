"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FileSignature } from "lucide-react";
import { FIDEICOMISO_SLUGS, formatUsd } from "@/lib/panel-data";
import {
  getMisParticipaciones,
  type ParticipacionReal,
} from "@/lib/panel-session";
import { FirmarConvenioModal } from "@/components/panel/firmar-convenio-modal";

// Por ahora solo el Agroganadero tiene la plantilla de convenio cargada en ZapSign.
const FIDEICOMISOS_CON_FIRMA = new Set(["agroganadero-vitaterra-i"]);

export default function PanelFideicomisosPage() {
  const [firmando, setFirmando] = useState<string | null>(null);
  const [participaciones, setParticipaciones] = useState<ParticipacionReal[]>(
    []
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMisParticipaciones().then((p) => {
      setParticipaciones(p);
      setLoaded(true);
    });
  }, []);

  if (!loaded) return null;

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

            <div className="mt-6 flex flex-wrap items-center gap-5">
              {FIDEICOMISO_SLUGS[fideicomiso.slug] && (
                <Link
                  href={`/oportunidades/${FIDEICOMISO_SLUGS[fideicomiso.slug]}`}
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-ink-900 hover:text-brass-600"
                >
                  Ver ficha del proyecto
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              )}

              {FIDEICOMISOS_CON_FIRMA.has(fideicomiso.slug) && (
                <button
                  type="button"
                  onClick={() => setFirmando(fideicomiso.id)}
                  className="inline-flex items-center gap-1.5 rounded-[2px] bg-brass-500 px-3.5 py-2 text-xs font-semibold text-ink-950 transition-colors hover:bg-brass-400"
                >
                  <FileSignature size={13} />
                  Firmar Convenio de Adhesión
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {firmando && (
        <FirmarConvenioModal
          fideicomisoId={firmando}
          onClose={() => setFirmando(null)}
        />
      )}
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
