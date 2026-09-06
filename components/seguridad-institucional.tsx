import { ShieldCheck, Target, Users } from "lucide-react";
import { Reveal } from "./reveal";

const PILARES = [
  {
    icon: ShieldCheck,
    title: "Contralor interno",
    subtitle: "Double-check contable y legal",
    points: [
      "Auditoría permanente: un equipo contable propio audita en tiempo real la administración de cada fideicomiso.",
      "Trazabilidad: verificación cruzada de cada factura, pago a proveedores y liquidación impositiva.",
      "Garantía: cero riesgos de fugas de capital, errores fiscales o desvíos presupuestarios.",
    ],
  },
  {
    icon: Target,
    title: "Gerencia de proyectos",
    subtitle: "Project management",
    points: [
      "Supervisión de hitos: monitoreo del cronograma técnico, metas de producción e indicadores operativos.",
      "Cumplimiento de plazos: aseguramos que la estrategia acordada se ejecute según lo previsto.",
    ],
  },
  {
    icon: Users,
    title: "Dirección comercial",
    subtitle: "Relación con fiduciantes",
    points: [
      "Atención personalizada: canal directo de comunicación y reportes periódicos sobre el estado del proyecto.",
      "Transparencia activa: rendición de cuentas clara y accesible sobre la evolución del capital aportado.",
    ],
  },
];

const BENEFICIOS = [
  {
    title: "Patrimonio inembargable",
    body: "Cada fideicomiso cuenta con su propio CUIT y patrimonio independiente, aislado de contingencias externas.",
  },
  {
    title: "Alineación de intereses",
    body: "Nuestra remuneración de éxito está vinculada al resultado neto del proyecto. Ganamos cuando el proyecto avanza.",
  },
  {
    title: "Gobernanza corporativa",
    body: "La separación entre el equipo que administra el día a día y el equipo que audita garantiza un control imparcial y riguroso.",
  },
];

export function SeguridadInstitucional() {
  return (
    <section
      id="seguridad"
      className="scroll-mt-20 bg-ink-950 py-24 text-paper-100"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-paper-50/10 pb-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-400">
                Seguridad institucional
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium text-paper-50 md:text-4xl">
                Un modelo diseñado para blindar tu aporte
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-paper-100/70">
                En Grupo Agro SRL administramos fideicomisos bajo una premisa
                fundamental: transparencia absoluta y control riguroso.
                Estructuramos un ecosistema de control cruzado que protege el
                patrimonio del proyecto.
              </p>
            </div>
            <span
              className="hidden text-6xl font-display font-medium md:block"
              style={{ color: "transparent", WebkitTextStroke: "1px rgba(247,242,231,0.15)" }}
            >
              03
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-paper-50/10 bg-paper-50/10 md:grid-cols-3">
          {PILARES.map(({ icon: Icon, title, subtitle, points }, i) => (
            <Reveal key={title} delay={i * 100} className="bg-ink-950 p-7">
              <Icon size={20} className="text-brass-400" />
              <h3 className="mt-4 font-display text-lg font-medium text-paper-50">
                {title}
              </h3>
              <p className="text-xs font-medium uppercase tracking-wide text-brass-400/70">
                {subtitle}
              </p>
              <ul className="mt-4 space-y-2.5">
                {points.map((p) => (
                  <li
                    key={p}
                    className="text-sm leading-relaxed text-paper-100/70"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-display text-xl font-medium text-paper-50">
            ¿Por qué hacerte socio con nuestro esquema fiduciario?
          </h3>
          <div className="mt-6 grid gap-px overflow-hidden rounded-[2px] border border-paper-50/10 bg-paper-50/10 md:grid-cols-3">
            {BENEFICIOS.map((b, i) => (
              <Reveal key={b.title} delay={i * 90} className="bg-ink-900/60 p-6">
                <h4 className="font-display text-base font-medium text-brass-400">
                  {b.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-paper-100/70">
                  {b.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
