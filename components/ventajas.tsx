import { Globe2, HardHat, ClipboardCheck } from "lucide-react";
import { Reveal } from "./reveal";

const VENTAJAS = [
  {
    icon: Globe2,
    title: "Especialistas del sector real",
    body: "Nuestro equipo conoce el terreno: producción agroganadera, desarrollo inmobiliario y logística de flotas. Seleccionamos cada proyecto con el mismo rigor que aplicaríamos a nuestro propio capital.",
  },
  {
    icon: HardHat,
    title: "Hacemos el trabajo pesado",
    body: "Diligencia técnica y legal, gestión de obra, seguros, mantenimiento y proveedores. Vos seguís el avance desde tu panel; nosotros nos encargamos de que cada etapa se ejecute según lo planeado.",
  },
  {
    icon: ClipboardCheck,
    title: "Rendición de cuentas sin atajos",
    body: "Actualizaciones periódicas con fotos y datos concretos de avance, auditoría contable propia y un patrimonio separado por fideicomiso. Nada de números sin respaldo documental.",
  },
];

export function Ventajas() {
  return (
    <section className="bg-paper-100 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-paper-line pb-6">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-600">
                Por qué Vitaterra
              </span>
              <h2 className="mt-3 font-display text-3xl font-medium text-ink-900 md:text-4xl">
                La ventaja de trabajar con nosotros
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {VENTAJAS.map(({ icon: Icon, title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 100}
              className="group relative overflow-hidden rounded-[2px] border border-paper-line bg-paper-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brass-400/50 hover:shadow-[0_20px_40px_-28px_rgba(12,23,18,0.4)]"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brass-500 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-100 text-clay-600 transition-colors duration-300 group-hover:bg-brass-500 group-hover:text-ink-950">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-display text-lg font-medium text-ink-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-muted">
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
