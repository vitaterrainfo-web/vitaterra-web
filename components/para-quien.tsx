import { Sprout, LayoutGrid, Briefcase } from "lucide-react";
import { Reveal } from "./reveal";

const PERFILES = [
  {
    icon: Sprout,
    title: "Recién te sumás a la economía real",
    body: "Empezá con un solo Módulo de Adhesión y seguí el avance del proyecto paso a paso desde tu panel, sin necesidad de conocimiento previo del sector agroganadero o inmobiliario.",
  },
  {
    icon: LayoutGrid,
    title: "Ya diversificás tu capital",
    body: "Sumá un fideicomiso de activos tangibles a un portafolio que hoy depende solo de instrumentos financieros tradicionales, con patrimonio separado por proyecto.",
  },
  {
    icon: Briefcase,
    title: "Gestionás patrimonio de terceros",
    body: "Accedé a la ficha técnica completa de cada proyecto, con indicadores, cronograma y estructura jurídica claros, para evaluarlo dentro de la cartera de tus clientes.",
  },
];

export function ParaQuien() {
  return (
    <section className="bg-paper-50 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <Reveal>
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-600">
              Para quién es Vitaterra
            </span>
            <h2 className="mt-3 font-display text-3xl font-medium text-ink-900 md:text-4xl">
              Pensado para distintos puntos de partida
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PERFILES.map(({ icon: Icon, title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 100}
              className="rounded-[2px] border border-paper-line bg-paper-100/60 p-7"
            >
              <Icon size={22} className="text-ink-800" />
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
