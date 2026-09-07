"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type Pregunta = { q: string; a: string };
type Categoria = { titulo: string; preguntas: Pregunta[] };

const CATEGORIAS: Categoria[] = [
  {
    titulo: "Sobre Vitaterra",
    preguntas: [
      {
        q: "¿Qué es exactamente Vitaterra y cuál es su modelo?",
        a: "Somos una plataforma digital que facilita el acceso a proyectos productivos de la economía real. Nuestro modelo permite a personas y empresas sumar capital de forma simplificada para el desarrollo de obras inmobiliarias en pozo, producción agroganadera, proyectos vitivinícolas o la explotación comercial de flotas de vehículos, utilizando como estructura jurídica contratos privados de fideicomisos administrados profesionalmente por Grupo Agro SRL.",
      },
      {
        q: "¿Cómo gana dinero Vitaterra?",
        a: "No cobramos comisión de entrada ni cargos ocultos al fiduciante. Nuestra remuneración es un honorario de administración fiduciaria, ya incorporado a la estructura de cada proyecto y descontado de los resultados operativos, nunca cobrado aparte. Parte de esa remuneración está además vinculada al éxito del proyecto: ganamos cuando el fideicomiso genera resultados.",
      },
    ],
  },
  {
    titulo: "Marco legal y regulatorio",
    preguntas: [
      {
        q: "¿Estoy realizando una inversión financiera o bursátil?",
        a: "No. Al participar en Vitaterra no estás comprando acciones, bonos, títulos valores de oferta pública ni ningún instrumento del mercado de capitales. Estás realizando un aporte de capital privado destinado exclusivamente a activos físicos tangibles bajo el régimen de la ley de fideicomisos del Código Civil y Comercial de la Nación.",
      },
      {
        q: "¿Están regulados por la Comisión Nacional de Valores (CNV) o el Banco Central (BCRA)?",
        a: "No, y por ley corresponde que así sea. Al tratarse de contratos asociativos privados de la economía real y no de la captación de ahorro público para intermediación financiera o títulos negociables, esta operatoria se encuentra excluida de la órbita de la CNV y del BCRA. Nos regimos exclusivamente por el derecho civil y comercial ordinario.",
      },
      {
        q: "¿Qué es un Fideicomiso Privado y cómo protege mi capital?",
        a: 'Un fideicomiso es una figura legal argentina muy sólida. Funciona creando un "patrimonio de afectación separado": el dinero y los bienes de cada proyecto forman una caja independiente y blindada, que no pueden ser tocados por acreedores de Vitaterra ni de otros proyectos.',
      },
      {
        q: '¿Qué es un "Módulo de Adhesión"?',
        a: "Es la unidad de medida contractual que representa tu porcentaje de participación en un proyecto determinado. El presupuesto total del fideicomiso se divide en Módulos: al adquirir uno o más, te convertís en fiduciante y adquirís el derecho proporcional sobre los resultados económicos que genere ese negocio específico.",
      },
    ],
  },
  {
    titulo: "Resultados y distribución",
    preguntas: [
      {
        q: "¿Cómo se calculan y distribuyen los resultados?",
        a: "Se derivan estrictamente del éxito comercial del proyecto real: en proyectos inmobiliarios, de la plusvalía entre el costo de construir en pozo y el valor final de venta; en agroganadero y vitivinícola, del margen de la actividad productiva; en flota automotor, del remanente neto de alquileres y contratos logísticos, deducidos los gastos operativos, de seguro y mantenimiento.",
      },
      {
        q: "¿Existe una tasa de interés o rendimiento garantizado?",
        a: "No. Al tratarse de negocios de la economía real y productiva, no se pueden prometer tasas de interés fijas ni rendimientos garantizados. Lo que se publica en la plataforma son proyecciones y estimaciones basadas en estudios técnicos de costos de mercado y valuación de activos fijos, nunca una promesa de resultado.",
      },
    ],
  },
  {
    titulo: "Seguridad",
    preguntas: [
      {
        q: "¿Qué pasa con mi aporte si Vitaterra deja de operar?",
        a: "El patrimonio de cada fideicomiso es un bien separado por ley del patrimonio de Grupo Agro SRL y de Vitaterra SRL: no pertenece a la empresa administradora, pertenece al fideicomiso. Si la administradora dejara de operar, el patrimonio del proyecto no se ve afectado y la normativa civil prevé la designación de un fiduciario sustituto para continuar la gestión hasta la liquidación del proyecto.",
      },
      {
        q: "¿Dónde están mis fondos mientras se conforma un proyecto?",
        a: "Todo aporte se envía por transferencia bancaria directa a la cuenta corriente de titularidad del fideicomiso específico, nunca a una cuenta de la empresa administradora. La plataforma no procesa pagos ni retiene saldos: es un panel de visualización y gestión, no una billetera.",
      },
      {
        q: "¿Qué documentación debo presentar para comenzar?",
        a: "En cumplimiento con las normativas locales de prevención de lavado de activos de la Unidad de Información Financiera (UIF), solicitamos a todos nuestros usuarios validar su identidad y completar una declaración jurada sobre el origen lícito de los fondos antes de habilitar cualquier adhesión.",
      },
    ],
  },
  {
    titulo: "Mi participación",
    preguntas: [
      {
        q: "¿Cómo se formaliza legalmente mi participación en la plataforma?",
        a: 'Todo el proceso está digitalizado y cuenta con validez jurídica plena bajo la Ley de Firma Digital N.° 25.506. Al confirmar tu participación, firmás electrónicamente un contrato privado de "Cesión de Derechos y Adhesión al Fideicomiso", con el mismo valor legal que un contrato firmado ante escribano.',
      },
      {
        q: "¿Puedo salirme de un proyecto antes de que finalice el plazo estimado?",
        a: "Cada proyecto cuenta con sus propias condiciones particulares de salida en su ficha técnica. En general, contemplamos mecanismos de salida anticipada mediante la cesión de tus módulos a nuevos interesados, o ventanas de resolución contractual estipuladas según los plazos de ejecución.",
      },
    ],
  },
];

export function Faq() {
  const [openCategoria, setOpenCategoria] = useState<number | null>(0);
  const [openPregunta, setOpenPregunta] = useState<string | null>(
    `0-0`
  );

  return (
    <section id="preguntas" className="scroll-mt-20 bg-paper-50 py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brass-600">
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900 md:text-4xl">
            Todo lo que necesitás saber
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {CATEGORIAS.map((cat, ci) => {
            const isCatOpen = openCategoria === ci;
            return (
              <div
                key={cat.titulo}
                className="overflow-hidden rounded-[2px] border border-paper-line"
              >
                <button
                  type="button"
                  onClick={() => setOpenCategoria(isCatOpen ? null : ci)}
                  className="flex w-full items-center justify-between gap-4 bg-paper-100 px-6 py-4 text-left transition-colors hover:bg-paper-200"
                >
                  <span className="font-display text-lg font-semibold text-ink-900">
                    {cat.titulo}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-brass-600 transition-transform ${
                      isCatOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCatOpen && (
                  <div className="divide-y divide-paper-line px-6">
                    {cat.preguntas.map((item, qi) => {
                      const key = `${ci}-${qi}`;
                      const isOpen = openPregunta === key;
                      return (
                        <div key={item.q}>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenPregunta(isOpen ? null : key)
                            }
                            className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-brass-600"
                          >
                            <span className="flex items-start gap-2 text-sm font-medium text-ink-900">
                              <ChevronRight
                                size={14}
                                className={`mt-0.5 shrink-0 text-paper-muted transition-transform ${
                                  isOpen ? "rotate-90" : ""
                                }`}
                              />
                              {item.q}
                            </span>
                          </button>
                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              isOpen
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="-mt-1 pb-4 pl-5 text-sm leading-relaxed text-paper-muted">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
