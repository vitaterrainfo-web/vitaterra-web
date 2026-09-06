import { Search, FileCheck2, Building2, LineChart } from "lucide-react";
import { Reveal } from "./reveal";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Selección del proyecto productivo",
    body: "Explorá los diferentes proyectos de la economía real disponibles en la plataforma. Elegí participar en un desarrollo inmobiliario en pozo o sumarte a la explotación de nuestra flota automotor comercial.",
  },
  {
    n: "02",
    icon: FileCheck2,
    title: "Adhesión digital y aporte de capital",
    body: "Elegí la cantidad de Módulos de Adhesión con los que querés participar. Validá tu identidad, completá tu declaración jurada de origen de fondos y firmá electrónicamente tu Acta de Adhesión, 100% digital.",
  },
  {
    n: "03",
    icon: Building2,
    title: "Gestión profesional del patrimonio separado",
    body: "Nos encargamos del trabajo duro: ejecución de obras, compra de materiales, seguros y mantenimiento técnico. El capital queda protegido dentro de un patrimonio separado y blindado, ajeno a riesgos externos.",
  },
  {
    n: "04",
    icon: LineChart,
    title: "Rendición de cuentas y distribución de resultados",
    body: "Seguí la evolución del proyecto en tiempo real desde tu panel. Periódicamente se calculan y distribuyen los resultados netos de la liquidación de la obra o de la explotación comercial de la flota.",
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
            <span className="index-mark hidden text-6xl md:block">02</span>
          </div>
        </Reveal>

        <div className="mt-4 grid divide-y divide-paper-line md:grid-cols-2 md:divide-x md:divide-y-0">
          {STEPS.map(({ icon: Icon, title, body, n }, i) => (
            <Reveal key={title} delay={i * 90}>
              <div className="flex gap-5 py-8 md:px-8">
                <div className="shrink-0">
                  <span className="font-display text-sm text-brass-600">
                    {n}
                  </span>
                  <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-full border border-paper-line text-ink-800">
                    <Icon size={17} />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-ink-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-muted">
                    {body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
