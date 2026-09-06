"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  PiggyBank,
  Beef,
  Warehouse,
  Link2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { FIDEICOMISOS, formatUsd } from "@/lib/panel-data";

const fideicomiso = FIDEICOMISOS.find(
  (f) => f.id === "agroganadero-vitaterra-i"
)!;

const PILARES = [
  {
    icon: Building2,
    title: "Respaldo Patrimonial Tangible",
    body: "Adquisición de 100 a 150 hectáreas propias como activo base del fideicomiso, brindando sólida cobertura de valor en tierra agrícola de alta productividad.",
  },
  {
    icon: PiggyBank,
    title: "Escalamiento Porcino Progresivo",
    body: "Desarrollo tecnificado modular con proyección de hasta 2.000 cerdas madres en ciclo completo, sumado al esquema de engorde ágil para optimización del flujo operativo.",
  },
  {
    icon: Beef,
    title: "Feedlot Bovino Integrado",
    body: "Módulo de engorde a corral para hacienda vacuna, aprovechando la capacidad instalada del establecimiento y diversificando las líneas de comercialización.",
  },
  {
    icon: Warehouse,
    title: "Soberanía e Infraestructura de Acopio",
    body: "Planta de silos y capacidad de almacenamiento propia para el resguardo de granos (maíz/soja), reduciendo costos operativos de alimentación y optimizando márgenes.",
  },
  {
    icon: Link2,
    title: "Integración Vertical y Red de Distribución Propia",
    body: "Capturamos el valor total de la cadena: producimos, procesamos y comercializamos sin intermediarios, reteniendo el margen minorista de la carne y maximizando el flujo de caja y la rentabilidad neta del fideicomiso.",
  },
];

const ROADMAP = [
  {
    fase: "Fase 1",
    titulo: "Asentamiento y Canal Directo",
    items: [
      "Red de Distribución Propia: apertura de carnicerías y logística propia para comercializar sin intermediarios desde el primer día.",
      "Infraestructura Base: adquisición del campo productivo e instalación del primer núcleo de recría y engorde (bovino y porcino).",
    ],
  },
  {
    fase: "Fase 2",
    titulo: "Escala y Autonomía",
    items: [
      "Planta de Acopio y Silos: garantía de abastecimiento nutricional y almacenamiento de granos propio.",
      "Expansión Productiva: duplicación del plantel ganadero y ampliación de sucursales comerciales.",
    ],
  },
  {
    fase: "Fase 3",
    titulo: "Gran Escala Agroindustrial",
    items: [
      "Circuito Cerrado (Farm to Fork): consolidación como complejo agroindustrial integrando producción, procesamiento y red nacional de venta.",
      "Capacidad Máxima: alcance del techo proyectado de producción intensiva con monitoreo 100% automatizado por IA.",
    ],
  },
];

const CAPITALIZACION = [
  {
    periodo: "Años 1 y 2",
    subtitulo: "Fase de crecimiento",
    filas: [
      { label: "Distribución periódica de utilidades líquidas", valor: "60%" },
      {
        label: "Reinversión operativa directa (infraestructura / CapEx)",
        valor: "30%",
      },
      { label: "Fondo de reserva y liquidez", valor: "10%" },
    ],
  },
  {
    periodo: "Años 3 y 4",
    subtitulo: "Fase de consolidación",
    filas: [
      { label: "Distribución periódica de utilidades líquidas", valor: "65%" },
      { label: "Reinversión operativa directa", valor: "30%" },
      { label: "Fondo de reserva y liquidez", valor: "5%" },
    ],
  },
  {
    periodo: "Año 5 en adelante",
    subtitulo: "Fase madura",
    filas: [
      { label: "Distribución periódica de utilidades líquidas", valor: "70%" },
      { label: "Mantenimiento y actualización tecnológica", valor: "25%" },
      { label: "Fondo de reserva y liquidez", valor: "5%" },
    ],
  },
];

const RENDIMIENTO = [
  { periodo: "Años 1 y 2", rango: "10,0% – 15,0% Anual en USD" },
  { periodo: "Años 3 y 4", rango: "14,0% – 20,0% Anual en USD" },
  { periodo: "Año 5 en adelante", rango: "18,0% – 22,0% Anual en USD" },
];

const GALERIA = [
  "/images/agroganadero/foto-1.jpeg",
  "/images/agroganadero/foto-2.jpeg",
  "/images/agroganadero/foto-3.jpeg",
  "/images/agroganadero/foto-4.jpeg",
];

export default function AgroganaderoPage() {
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
            src="/images/agroganadero/foto-1.jpeg"
            alt="Fideicomiso Agro Ganadero Vita Terra"
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
              Desarrollo Agroganadero
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium text-paper-50 md:text-5xl">
              Fideicomiso Privado <span className="italic">Agro Ganadero Vita Terra</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper-100/80">
              Plataforma de desarrollo agro productivo orientada al
              escalamiento de infraestructura, acopio estratégico de granos y
              producción integral de proteína animal.
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
                  Cinco frentes de desarrollo productivo
                </h2>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-paper-line bg-paper-line md:grid-cols-2 lg:grid-cols-3">
              {PILARES.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={i * 80} className="bg-paper-50 p-7">
                  <Icon size={22} className="text-clay-600" />
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

            <div className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-paper-50/10 bg-paper-50/10 md:grid-cols-3">
              {ROADMAP.map((f, i) => (
                <Reveal key={f.fase} delay={i * 100} className="bg-ink-950 p-7">
                  <span className="font-display text-sm text-brass-400">
                    {f.fase}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-medium text-paper-50">
                    {f.titulo}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {f.items.map((it) => (
                      <li
                        key={it}
                        className="text-sm leading-relaxed text-paper-100/70"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
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
                    <h3 className="mt-1 font-display text-lg font-medium text-ink-900">
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
                <h3 className="font-display text-xl font-medium text-ink-900">
                  Indicadores y expectativa de rendimiento
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-paper-muted">
                  Los valores expuestos representan proyecciones basadas en el
                  plan de producción y eficiencias históricas de la actividad
                  en la región.
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
                  proporcionalmente de un fideicomiso respaldado por tierras,
                  biomasa en crecimiento e infraestructura agroindustrial.
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
                  El proyecto en el terreno
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {GALERIA.map((src, i) => (
                <Reveal key={src} delay={i * 70}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] border border-paper-line">
                    <Image
                      src={src}
                      alt="Fideicomiso Agro Ganadero Vita Terra"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
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
                valor="Proyecto proyectado a 30 años (empresa en marcha con distribución periódica de utilidades netas operativas)."
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
                  Sumate al proyecto
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
                  <p className="mt-4 font-display text-lg font-medium text-paper-50">
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
    <div className="bg-paper-50 p-7">
      <p className="text-xs font-semibold uppercase tracking-wide text-brass-600">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-paper-muted">{valor}</p>
    </div>
  );
}
