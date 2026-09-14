import { Search, FileCheck2, Building2, LineChart } from "lucide-react";
import { Reveal } from "./reveal";

const STEPS = [
  {
    icon: Search,
    title: "Selección del proyecto productivo",
    body: "Explorá los diferentes proyectos de la economía real disponibles en la plataforma.",
  },
  {
    icon: FileCheck2,
    title: "Adhesión digital y aporte de capital",
    body: "Validá tu identidad, elegí la cantidad de Módulos de Adhesión con los que querés participar, completá el formulario y firmá tu Acta de Adhesión, 100% digital.",
  },
  {
    icon: Building2,
    title: "Gestión profesional del patrimonio separado",
    body: "Nos ocupamos de la administración integral, contrataciones y mantenimiento operativo del proyecto.",
  },
  {
    icon: LineChart,
    title: "Rendición de cuentas y distribución de resultados",
    body: "Seguí la evolución del proyecto en tiempo real desde tu panel. Periódicamente se calculan y distribuyen los resultados netos.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-paper-50 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-paper-line pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-600">
                Cómo funciona
              </p>
              <h2 className="mt-3 max-w-lg font-display text-3xl font-medium text-ink-900 md:text-4xl">
                Nuestro modelo de economía real
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-paper-line lg:block" />

          <div className="relative grid gap-y-14 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 90} className="group">
                <div className="flex flex-col items-center text-center transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-paper-line bg-paper-50 text-ink-800 transition-all duration-300 group-hover:border-brass-400 group-hover:text-brass-600 group-hover:shadow-[0_10px_24px_-12px_rgba(184,149,47,0.55)]">
                    <Icon size={18} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 font-display text-[11px] font-medium text-paper-50 transition-colors duration-300 group-hover:bg-brass-500 group-hover:text-ink-950">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-sans text-xl font-bold text-ink-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-muted">
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
