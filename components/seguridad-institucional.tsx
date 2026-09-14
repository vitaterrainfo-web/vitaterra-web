"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Target, Users, ChevronDown } from "lucide-react";
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

const PROCESO = [
  {
    titulo: "Vita Terra estructura el fideicomiso",
    body: "Se define el proyecto productivo, el presupuesto y la cantidad de Módulos de Adhesión disponibles.",
    imagen: "/images/proceso/paso-1.jpeg",
  },
  {
    titulo: "Un fiduciario independiente administra los bienes",
    body: "Grupo Agro SRL toma la titularidad fiduciaria de los activos del proyecto bajo un patrimonio separado y auditable.",
    imagen: "/images/proceso/paso-2.jpeg",
  },
  {
    titulo: "Los participantes adhieren mediante contrato digital",
    body: "Cada fiduciante firma electrónicamente su Acta de Adhesión y aporta capital directo a la cuenta del fideicomiso.",
    imagen: "/images/proceso/paso-3.jpeg",
  },
  {
    titulo: "Los resultados se distribuyen según el reglamento",
    body: "La actividad productiva genera resultados que se calculan y distribuyen periódicamente según la política de capitalización de cada proyecto.",
    imagen: "/images/proceso/paso-4.jpeg",
  },
  {
    titulo: "Al finalizar el plazo, se liquida o renueva el fideicomiso",
    body: "Se realiza la liquidación de los activos o se define la continuidad del proyecto según lo previsto en el reglamento.",
    imagen: "/images/proceso/paso-5.jpeg",
  },
  {
    titulo: "Los participantes reciben su parte proporcional",
    body: "El resultado final se distribuye entre los fiduciantes en proporción a sus Módulos de Adhesión.",
    imagen: "/images/proceso/paso-6.jpeg",
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
  const [openStep, setOpenStep] = useState<number | null>(0);

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
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[2px] border border-paper-50/10 bg-paper-50/10 md:grid-cols-3">
          {PILARES.map(({ icon: Icon, title, subtitle, points }, i) => (
            <Reveal
              key={title}
              delay={i * 100}
              className="bg-ink-950 p-7 transition-colors duration-300 hover:bg-ink-900"
            >
              <Icon size={20} className="text-brass-400" />
              <h3 className="mt-4 font-sans text-xl font-bold text-paper-50">
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

        <div className="mt-20">
          <h3 className="font-sans text-2xl font-bold text-paper-50">
            El proceso de Vita Terra
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-100/70">
            La mecánica jurídica detrás de cada fideicomiso, paso a paso.
          </p>

          <div className="mt-8 space-y-0">
            {PROCESO.map((step, i) => {
              const isOpen = openStep === i;
              return (
                <Reveal key={step.titulo} delay={i * 70}>
                  <div className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-display text-sm transition-colors ${
                          isOpen
                            ? "border-brass-400 bg-brass-400 text-ink-950"
                            : "border-brass-400/50 text-brass-400"
                        }`}
                      >
                        {i + 1}
                      </div>
                      {i < PROCESO.length - 1 && (
                        <div className="w-px flex-1 bg-paper-50/15" />
                      )}
                    </div>
                    <div className="w-full pb-8">
                      <button
                        type="button"
                        onClick={() => setOpenStep(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 text-left"
                      >
                        <h4 className="font-sans text-lg font-bold text-paper-50">
                          {step.titulo}
                        </h4>
                        <ChevronDown
                          size={18}
                          className={`mt-1 shrink-0 text-brass-400 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen
                            ? "mt-4 grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-xl text-sm leading-relaxed text-paper-100/70">
                            {step.body}
                          </p>
                          <div className="relative mt-4 aspect-[16/9] w-full max-w-xl overflow-hidden rounded-[2px] border border-paper-50/10">
                            <Image
                              src={step.imagen}
                              alt={step.titulo}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-sans text-2xl font-bold text-paper-50">
            ¿Por qué hacerte socio con nuestro esquema fiduciario?
          </h3>
          <div className="mt-6 grid gap-px overflow-hidden rounded-[2px] border border-paper-50/10 bg-paper-50/10 md:grid-cols-3">
            {BENEFICIOS.map((b, i) => (
              <Reveal
                key={b.title}
                delay={i * 90}
                className="bg-ink-900/60 p-6 transition-colors duration-300 hover:bg-ink-900"
              >
                <h4 className="font-sans text-lg font-bold text-brass-400">
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
