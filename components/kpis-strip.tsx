import { FIDEICOMISOS, formatUsd } from "@/lib/panel-data";
import { Reveal } from "./reveal";

function computeKpis() {
  const capitalAdherido = FIDEICOMISOS.reduce(
    (sum, f) => sum + f.modulosAdjudicados * f.valorModulo,
    0
  );
  const resultadosDistribuidos = FIDEICOMISOS.reduce(
    (sum, f) => sum + f.resultadosDistribuidosUsd,
    0
  );
  const fiduciantesActivos = FIDEICOMISOS.reduce(
    (sum, f) => sum + f.fiduciantesActivos,
    0
  );
  const proyectosActivos = FIDEICOMISOS.length;

  return [
    { label: "Capital adherido", value: formatUsd(capitalAdherido) },
    { label: "Proyectos activos", value: String(proyectosActivos) },
    { label: "Fiduciantes participantes", value: String(fiduciantesActivos) },
    {
      label: "Resultados distribuidos",
      value: formatUsd(resultadosDistribuidos),
    },
  ];
}

export function KpisStrip() {
  const kpis = computeKpis();

  return (
    <section className="border-b border-paper-line bg-ink-950">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {kpis.map((kpi, i) => (
            <Reveal key={kpi.label} delay={i * 80}>
              <div>
                <p className="font-display text-2xl font-semibold text-paper-50 md:text-3xl">
                  {kpi.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-paper-100/60">
                  {kpi.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-paper-100/40">
          Datos consolidados de los fideicomisos actualmente en desarrollo.
          Actualizado a septiembre de 2026.
        </p>
      </div>
    </section>
  );
}
