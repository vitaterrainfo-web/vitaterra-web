import { ShieldCheck, Tractor, FileSignature } from "lucide-react";
import { Reveal } from "./reveal";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Patrimonio separado",
    body: "Los fondos de cada fideicomiso están protegidos legalmente por el Código Civil y Comercial, ajenos a riesgos de la empresa.",
  },
  {
    icon: Tractor,
    title: "Activos tangibles",
    body: "Respaldo en hacienda, producción vitivinícola, metros cuadrados reales y flotas comerciales aseguradas.",
  },
  {
    icon: FileSignature,
    title: "Contratos digitales",
    body: "Firma electrónica con validez legal inmediata en Argentina, bajo la Ley N.° 25.506.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-b border-paper-line bg-paper-100">
      <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-10 px-6 py-14 md:grid-cols-3 md:px-8">
        {ITEMS.map(({ icon: Icon, title, body }, i) => (
          <Reveal key={title} delay={i * 100}>
            <div className="flex items-start gap-4">
              <Icon size={22} className="mt-0.5 shrink-0 text-clay-600" />
              <div>
                <h3 className="font-display text-lg font-medium text-ink-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-paper-muted">
                  {body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
