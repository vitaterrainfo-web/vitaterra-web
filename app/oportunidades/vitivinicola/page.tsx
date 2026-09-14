"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Sprout,
  TrendingUp,
  Layers,
  FlaskConical,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Carousel } from "@/components/carousel";
import { MapEmbed } from "@/components/map-embed";
import { HitosTimeline, type Hito } from "@/components/hitos-timeline";

const PILARES = [
  {
    icon: Sprout,
    title: "Respaldo en Viñedos Propios",
    body: "El capital de los fiduciantes se destina a la adquisición o desarrollo de hectáreas de viñedo propio, un activo agrícola tangible y de valorización sostenida.",
  },
  {
    icon: TrendingUp,
    title: "Margen por Producción y Venta de Vino",
    body: "El resultado surge de la diferencia entre el costo de producción vitivinícola y el valor de venta del vino a granel o embotellado en el mercado.",
  },
  {
    icon: Layers,
    title: "Módulos de Adhesión Accesibles",
    body: "Participá con un Módulo de Adhesión desde un monto accesible, sin necesidad de adquirir una hectárea de viñedo completa.",
  },
  {
    icon: FlaskConical,
    title: "Gestión Enológica Profesional",
    body: "Grupo Agro SRL coordina el manejo agronómico del viñedo, la vinificación y el proceso de comercialización con bodegas y distribuidores.",
  },
  {
    icon: ShieldCheck,
    title: "Patrimonio Separado y Blindado",
    body: "Cada proyecto vitivinícola cuenta con su propio patrimonio de afectación, aislado de riesgos externos al ciclo productivo.",
  },
];

const HITOS: Hito[] = [
  {
    fecha: "Septiembre 2026",
    titulo: "Selección del viñedo y análisis enológico",
    body: "Estudio de suelo, clima y varietales de la región vitivinícola seleccionada, en curso.",
    estado: "confirmado",
  },
  {
    fecha: "Próxima etapa",
    titulo: "Estructuración del Fideicomiso",
    body: "Constitución del Fideicomiso Privado Ordinario y apertura de la ficha técnica con el detalle de Módulos de Adhesión.",
    estado: "proyectado",
  },
  {
    fecha: "Etapa final",
    titulo: "Producción y Comercialización",
    body: "Manejo del viñedo, cosecha y vinificación bajo supervisión enológica profesional, con venta de vino a granel o embotellado.",
    estado: "proyectado",
  },
];

const GALERIA = [
  "/images/vitivinicola/foto-1.jpeg",
  "/images/vitivinicola/foto-2.jpeg",
];

export default function VitivinicolaPage() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.telefono) return;
    setEnviado(true);
  }

  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[42vh] items-start overflow-hidden bg-ink-950">
          <Image
            src="/images/vitivinicola/foto-1.jpeg"
            alt="Proyecto Vitivinícola Vita Terra"
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10" />
          <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-8 sm:pt-10 md:px-8">
            <Link
              href="/#oportunidades"
              className="text-xs font-medium text-paper-100/70 hover:text-brass-400"
            >
              ← Volver a oportunidades
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-brass-400">
              Proyecto Vitivinícola · Próximamente
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium text-paper-50 md:text-5xl">
              Proyecto <span className="italic">Vitivinícola Vita Terra</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper-100/80">
              Estamos estructurando el primer fideicomiso vitivinícola de
              Vita Terra. Así es como va a funcionar el modelo de
              participación cuando abramos la ficha técnica.
            </p>
            <p className="mt-5 max-w-2xl text-xs text-paper-100/60">
              Será administrado y auditado por Grupo Agro SRL en su carácter
              de Fiduciario (Código Civil y Comercial de la Nación, Ley N.°
              26.994).
            </p>
          </div>
        </section>

        <section className="border-b border-paper-line bg-paper-100 py-10">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <div className="flex items-center gap-3 rounded-[2px] border border-brass-400/40 bg-paper-50 px-6 py-4">
              <CheckCircle2 size={18} className="shrink-0 text-brass-600" />
              <p className="text-sm text-paper-muted">
                <strong className="text-ink-900">Ficha técnica en preparación.</strong>{" "}
                Todavía no hay un monto ni un viñedo definitivo seleccionado. Dejanos
                tus datos al final de la página para avisarte apenas esté disponible.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-paper-50 py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-brass-600">
                  Pilares del modelo
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-ink-900 md:text-4xl">
                  Cómo va a funcionar el proyecto vitivinícola
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
                  <h3 className="mt-4 font-subtitle text-xl font-bold text-ink-900">
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
                  Del viñedo a la botella
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-paper-50 md:text-4xl">
                  Proceso de estructuración del proyecto
                </h2>
              </div>
            </Reveal>

            <div className="mt-12">
              <HitosTimeline hitos={HITOS} />
            </div>
          </div>
        </section>

        <section className="bg-paper-50 py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-brass-600">
                  Ubicación
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-ink-900 md:text-4xl">
                  Dónde va a estar el proyecto
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-10">
                <MapEmbed
                  lat={-33.0779}
                  lon={-68.8631}
                  label="Región vitivinícola — Luján de Cuyo, Mendoza"
                />
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
                  El terroir de Vita Terra
                </h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-10">
                <Carousel
                  images={GALERIA}
                  alt="Proyecto Vitivinícola Vita Terra"
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
                  Marco jurídico previsto
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-ink-900 md:text-4xl">
                  Condiciones generales del modelo
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-px overflow-hidden rounded-[2px] border border-paper-line bg-paper-line md:grid-cols-2">
              <ModeloItem
                label="Estructura jurídica"
                valor="Fideicomiso Privado Ordinario Cerrado, específico para cada proyecto vitivinícola."
              />
              <ModeloItem
                label="Horizonte operativo"
                valor="Ciclo estimado en función del tipo de viñedo (implantación o producción) y de los contratos de comercialización de vino."
              />
              <ModeloItem
                label="Esquema de salida / liquidación"
                valor="Mecanismo de cesión de participaciones o rescate programado con preaviso formal, sujeto a las condiciones particulares de cada proyecto."
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
                  Lista de espera
                </span>
                <h2 className="mt-3 font-display text-3xl font-medium text-paper-50 md:text-4xl">
                  Enterate primero
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-paper-100/70">
                  Dejanos tus datos y te avisamos apenas se publique la ficha
                  técnica del primer fideicomiso vitivinícola.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              {enviado ? (
                <div className="mt-10 rounded-[2px] border border-brass-400/30 bg-ink-900/60 p-8 text-center">
                  <CheckCircle2 size={28} className="mx-auto text-brass-400" />
                  <p className="mt-4 font-subtitle text-xl font-bold text-paper-50">
                    ¡Listo!
                  </p>
                  <p className="mt-2 text-sm text-paper-100/70">
                    Gracias, {form.nombre.split(" ")[0]}. Te vamos a escribir a{" "}
                    {form.email} apenas esté disponible la ficha técnica.
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
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-brass-500 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-brass-400"
                  >
                    Sumarme a la lista de espera
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
                la información expuesta en esta página es netamente
                descriptiva e informativa sobre un modelo de negocio en
                preparación, y no implica, bajo ninguna circunstancia, oferta
                pública de valores, invitación a la captación de ahorro
                público ni intermediación financiera en los términos de la
                Ley N.° 26.831 y Ley N.° 21.526. Las incorporaciones de
                participantes corresponderán a Fideicomisos Privados
                Ordinarios regidos bajo el Código Civil y Comercial de la
                Nación Argentina, administrados por Grupo Agro SRL, una vez
                publicada la ficha técnica definitiva de cada proyecto.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
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
