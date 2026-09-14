"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Truck,
  Briefcase,
  Wrench,
  Layers,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Carousel } from "@/components/carousel";
import { MapEmbed } from "@/components/map-embed";
import { HitosTimeline, type Hito } from "@/components/hitos-timeline";
import { FIDEICOMISOS, formatUsd } from "@/lib/panel-data";

const fideicomiso = FIDEICOMISOS.find(
  (f) => f.id === "flota-comercial-vitaterra"
)!;

const PILARES = [
  {
    icon: Truck,
    title: "Respaldo Patrimonial Tangible",
    body: "Adquisición progresiva de utilitarios y camionetas 0km, activos tangibles con valor de reventa consolidado en el mercado automotor comercial.",
  },
  {
    icon: Briefcase,
    title: "Contratos de Logística Corporativa",
    body: "Explotación comercial mediante contratos de alquiler y transporte con empresas de logística, distribución y servicios de la región.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento y Seguro Integral",
    body: "Gestión centralizada de service oficial, seguros contra todo riesgo y protocolos de mantenimiento preventivo para sostener el valor de cada unidad.",
  },
  {
    icon: Layers,
    title: "Diversificación de Marcas y Modelos",
    body: "Selección de utilitarios y camionetas de alta rotación en el mercado de reventa, reduciendo el riesgo de concentración en una sola marca.",
  },
  {
    icon: RefreshCw,
    title: "Escalamiento y Rotación de Unidades",
    body: "Reinversión de resultados en la incorporación de nuevas unidades y renovación programada de las de mayor kilometraje.",
  },
];

const HITOS: Hito[] = [
  {
    fecha: "Agosto 2026",
    titulo: "Compra de las primeras unidades",
    body: "Adquisición de las primeras camionetas utilitarias 0km para dar inicio a la operación comercial.",
    estado: "confirmado",
  },
  {
    fecha: "Septiembre 2026",
    titulo: "Primeros contratos de logística",
    body: "Firma de los primeros contratos de logística corporativa con empresas de la región.",
    estado: "confirmado",
  },
  {
    fecha: "Año 2",
    titulo: "Ampliación de la flota",
    body: "Diversificación de contratos con nuevas empresas cliente.",
    estado: "proyectado",
  },
  {
    fecha: "Años 3 a 6",
    titulo: "Consolidación operativa",
    body: "Monitoreo satelital y gestión centralizada de mantenimiento de toda la flota.",
    estado: "proyectado",
  },
  {
    fecha: "Año 7 en adelante",
    titulo: "Rotación continua de unidades",
    body: "Capacidad máxima bajo contratos de logística de largo plazo, con renovación programada de vehículos.",
    estado: "proyectado",
  },
  {
    fecha: "Año 10",
    titulo: "Liquidación o renovación del fideicomiso",
    body: "Cierre del ciclo contractual proyectado y distribución final de resultados a los fiduciantes.",
    estado: "proyectado",
  },
];

const CAPITALIZACION = [
  {
    periodo: "Años 1 y 2",
    subtitulo: "Fase de puesta en marcha",
    filas: [
      { label: "Distribución periódica de utilidades líquidas", valor: "55%" },
      { label: "Reinversión en adquisición de unidades", valor: "35%" },
      { label: "Fondo de reserva y liquidez", valor: "10%" },
    ],
  },
  {
    periodo: "Años 3 a 6",
    subtitulo: "Fase de consolidación",
    filas: [
      { label: "Distribución periódica de utilidades líquidas", valor: "65%" },
      { label: "Reinversión operativa directa", valor: "25%" },
      { label: "Fondo de reserva y liquidez", valor: "10%" },
    ],
  },
  {
    periodo: "Año 7 en adelante",
    subtitulo: "Fase madura",
    filas: [
      { label: "Distribución periódica de utilidades líquidas", valor: "70%" },
      { label: "Mantenimiento y renovación de flota", valor: "25%" },
      { label: "Fondo de reserva y liquidez", valor: "5%" },
    ],
  },
];

const RENDIMIENTO = [
  { periodo: "Años 1 y 2", rango: "8,0% – 12,0% Anual en USD" },
  { periodo: "Años 3 a 6", rango: "12,0% – 16,0% Anual en USD" },
  { periodo: "Año 7 en adelante", rango: "14,0% – 18,0% Anual en USD" },
];

const GALERIA = [
  "/images/flota/foto-1.jpeg",
  "/images/flota/foto-2.jpeg",
  "/images/flota/foto-3.jpeg",
];

export default function FlotaPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    modulos: "",
  });
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.telefono) return;
    setEnviado(true);
  }

  const porcentajeAdjudicado = Math.round(
    (fideicomiso.modulosAdjudicados / fideicomiso.modulosTotales) * 100
  );

  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink-950">
          <Image
            src="/images/flota/foto-1.jpeg"
            alt="Fideicomiso Flota Comercial Vita Terra"
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10" />
          <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-40 md:px-8">
            <Link
              href="/#oportunidades"
              className="text-xs font-medium text-paper-100/70 hover:text-brass-400"
            >
              ← Volver a oportunidades
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-brass-400">
              Flota Automotor
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium text-paper-50 md:text-5xl">
              Fideicomiso <span className="italic">Flota Comercial Vita Terra</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper-100/80">
              Plataforma de explotación comercial de una flota de vehículos
              utilitarios orientada a contratos de logística y transporte
              corporativo.
            </p>
            <p className="mt-5 max-w-2xl text-xs text-paper-100/60">
              Administrado y auditado por Grupo Agro SRL en su carácter de
              Fiduciario (Código Civil y Comercial de la Nación, Ley N.°
              26.994).
            </p>
          </div>
        </section>

        <section className="border-b border-paper-line bg-paper-100 py-14">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FichaDato label="Fiduciario / Administrador" valor="Grupo Agro S.R.L." />
              <FichaDato
                label="Vehículo legal"
                valor="Fideicomiso Privado Ordinario (Ley 26.994)"
              />
              <FichaDato label="Plazo contractual" valor={fideicomiso.ciclo} />
              <FichaDato
                label="Fondo meta inicial"
                valor={formatUsd(fideicomiso.presupuestoMeta)}
              />
            </div>

            <div className="mt-8 rounded-[2px] border border-paper-line bg-paper-50 p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink-900">
                  Módulos adjudicados
                </span>
                <span className="font-semibold text-ink-900">
                  {porcentajeAdjudicado}%
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-paper-line">
                <div
                  className="h-full rounded-full bg-brass-500"
                  style={{ width: `${porcentajeAdjudicado}%` }}
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-paper-muted">
                <span>
                  {fideicomiso.modulosAdjudicados} de{" "}
                  {fideicomiso.modulosTotales} módulos adjudicados
                </span>
                <span>
                  Valor por módulo: {formatUsd(fideicomiso.valorModulo)}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper-50 py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-brass-600">
                  Pilares del proyecto
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-ink-900 md:text-4xl">
                  Cinco frentes de operación logística
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-paper-line bg-paper-line md:grid-cols-2 lg:grid-cols-3">
              {PILARES.map(({ icon: Icon, title, body }, i) => (
                <Reveal
                  key={title}
                  delay={i * 80}
                  className="group bg-paper-50 p-7 transition-colors duration-300 hover:bg-paper-100"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-paper-line text-clay-600 transition-colors group-hover:border-brass-400 group-hover:text-brass-500">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink-900">
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

        <section className="bg-ink-950 py-24 text-paper-100">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-brass-400">
                  Modelo operativo y escala
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-paper-50 md:text-4xl">
                  Hoja de ruta del proyecto
                </h2>
              </div>
            </Reveal>

            <div className="mt-12">
              <HitosTimeline hitos={HITOS} />
            </div>
          </div>
        </section>

        <section className="bg-paper-100 py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-brass-600">
                  Ubicación
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-ink-900 md:text-4xl">
                  Dónde está el proyecto
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-10">
                <MapEmbed
                  lat={-34.69}
                  lon={-58.7}
                  label="Zona logística — Gran Buenos Aires"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-paper-50 py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-brass-600">
                  Política de capitalización y liquidez
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-ink-900 md:text-4xl">
                  Cómo se distribuyen los resultados
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {CAPITALIZACION.map((c, i) => (
                <Reveal key={c.periodo} delay={i * 90}>
                  <div className="h-full rounded-[2px] border border-paper-line bg-paper-100 p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brass-600">
                      {c.subtitulo}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink-900">
                      {c.periodo}
                    </h3>
                    <ul className="mt-5 space-y-3 border-t border-paper-line pt-5">
                      {c.filas.map((row) => (
                        <li
                          key={row.label}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <span className="text-paper-muted">
                            {row.label}
                          </span>
                          <span className="shrink-0 font-display font-semibold text-ink-900">
                            {row.valor}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-14">
                <h3 className="font-display text-2xl font-bold text-ink-900">
                  Indicadores y expectativa de rendimiento
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-paper-muted">
                  Los valores expuestos representan proyecciones basadas en el
                  plan de operación comercial y eficiencias históricas del
                  mercado de transporte y logística.
                </p>
                <div className="mt-6 overflow-x-auto rounded-[2px] border border-paper-line">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-paper-line bg-paper-100 text-xs uppercase tracking-wide text-paper-muted">
                        <th className="px-5 py-3 font-medium">Período</th>
                        <th className="px-5 py-3 font-medium">
                          Rendimiento objetivo proyectado
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {RENDIMIENTO.map((r) => (
                        <tr
                          key={r.periodo}
                          className="border-b border-paper-line bg-paper-50 last:border-0"
                        >
                          <td className="px-5 py-4 font-medium text-ink-900">
                            {r.periodo}
                          </td>
                          <td className="px-5 py-4 text-paper-muted">
                            {r.rango}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-paper-muted">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-clay-600"
                  />
                  Respaldo en economía real: el fiduciante no ingresa a un
                  producto financiero abstracto, sino que participa
                  proporcionalmente de un fideicomiso respaldado por
                  vehículos utilitarios y contratos comerciales de logística.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-paper-100 py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-brass-600">
                  Galería
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-ink-900 md:text-4xl">
                  La flota en operación
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-10">
                <Carousel
                  images={GALERIA}
                  alt="Fideicomiso Flota Comercial Vita Terra"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-paper-50 py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-brass-600">
                  Modelo de participación y rescate
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-ink-900 md:text-4xl">
                  Condiciones del fideicomiso
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-px overflow-hidden rounded-[2px] border border-paper-line bg-paper-line md:grid-cols-2">
              <ModeloItem
                label="Estructura jurídica"
                valor="Fideicomiso Privado Ordinario Cerrado."
              />
              <ModeloItem
                label="Horizonte operativo"
                valor="Proyecto proyectado a 10 años (empresa en marcha con distribución periódica de utilidades netas operativas)."
              />
              <ModeloItem
                label="Esquema de salida / liquidación"
                valor="Mecanismo reglamentado de cesión de participaciones o rescate programado con preaviso formal de 60 a 90 días, sujeto a las condiciones operativas de la masa patrimonial."
              />
              <ModeloItem
                label="Administración y custodia"
                valor="Gestión administrativa, contable y jurídica centralizada a cargo de Grupo Agro SRL."
              />
            </div>
          </div>
        </section>

        <section className="bg-ink-950 py-24 text-paper-100">
          <div className="mx-auto max-w-2xl px-6 md:px-8">
            <Reveal>
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-brass-400">
                  Solicitar adhesión
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-paper-50 md:text-4xl">
                  Sumate a la flota
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-paper-100/70">
                  Dejanos tus datos y un asesor de Grupo Agro SRL te va a
                  contactar con el detalle del esquema de adhesión.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              {enviado ? (
                <div className="mt-10 rounded-[2px] border border-brass-400/30 bg-ink-900/60 p-8 text-center">
                  <CheckCircle2 size={28} className="mx-auto text-brass-400" />
                  <p className="mt-4 font-display text-xl font-bold text-paper-50">
                    Solicitud recibida
                  </p>
                  <p className="mt-2 text-sm text-paper-100/70">
                    Gracias, {form.nombre.split(" ")[0]}. Un asesor de Grupo
                    Agro SRL se va a contactar a {form.email} para avanzar con
                    el esquema de adhesión.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-10 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-paper-100/60">
                        Nombre y apellido
                      </label>
                      <input
                        type="text"
                        required
                        value={form.nombre}
                        onChange={(e) =>
                          setForm({ ...form, nombre: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-[2px] border border-paper-50/15 bg-ink-900 px-3.5 py-2.5 text-sm text-paper-50 outline-none focus:border-brass-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-paper-100/60">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.telefono}
                        onChange={(e) =>
                          setForm({ ...form, telefono: e.target.value })
                        }
                        className="mt-1.5 w-full rounded-[2px] border border-paper-50/15 bg-ink-900 px-3.5 py-2.5 text-sm text-paper-50 outline-none focus:border-brass-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-paper-100/60">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-[2px] border border-paper-50/15 bg-ink-900 px-3.5 py-2.5 text-sm text-paper-50 outline-none focus:border-brass-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-paper-100/60">
                      Cantidad de módulos de interés
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={form.modulos}
                      onChange={(e) =>
                        setForm({ ...form, modulos: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-[2px] border border-paper-50/15 bg-ink-900 px-3.5 py-2.5 text-sm text-paper-50 outline-none focus:border-brass-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-brass-500 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-brass-400"
                  >
                    Enviar solicitud
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>

        <section className="bg-paper-100 py-14">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <div className="rounded-[2px] border border-paper-line bg-paper-50 p-6">
              <p className="text-xs leading-relaxed text-paper-muted">
                <strong className="text-ink-900">Aviso importante:</strong>{" "}
                la información expuesta en el presente sitio web es netamente
                descriptiva e informativa y no implica, bajo ninguna
                circunstancia, oferta pública de valores, invitación a la
                captación de ahorro público ni intermediación financiera en
                los términos de la Ley N.° 26.831 y Ley N.° 21.526. Las
                incorporaciones de participantes corresponden a Fideicomisos
                Privados Ordinarios regidos bajo el Código Civil y Comercial
                de la Nación Argentina, administrados por Grupo Agro SRL. Las
                proyecciones operativas corresponden a modelos estimativos de
                economía real sujetos a variaciones del sector productivo.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FichaDato({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p className="text-xs text-paper-muted">{label}</p>
      <p className="mt-1 font-display text-base font-semibold text-ink-900">
        {valor}
      </p>
    </div>
  );
}

function ModeloItem({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="bg-paper-50 p-7 transition-colors duration-300 hover:bg-paper-100">
      <p className="text-xs font-semibold uppercase tracking-wide text-brass-600">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-paper-muted">{valor}</p>
    </div>
  );
}
