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
            <span className="index-mark hidden text-6xl md:block">03</span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-x-10">
          {VENTAJAS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 100}>
              <Icon size={24} className="text-clay-600" />
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
