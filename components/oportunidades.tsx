"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";

type Categoria =
  | "Todos"
  | "Desarrollo Agroganadero"
  | "Flota Automotor"
  | "Inmobiliario en Pozo"
  | "Proyecto Vitivinícola";

const CATEGORIAS: Categoria[] = [
  "Todos",
  "Desarrollo Agroganadero",
  "Flota Automotor",
  "Inmobiliario en Pozo",
  "Proyecto Vitivinícola",
];

const PROYECTOS = [
  {
    categoria: "Desarrollo Agroganadero" as Categoria,
    estado: "En desarrollo",
    titulo: "Fideicomiso Agro Ganadero Vita Terra",
    ubicacion: "Zona rural — Argentina",
    imagen: "/images/agroganadero/foto-1.jpeg",
    presupuesto: "USD 1.000.000",
    presupuestoLabel: "Fondo meta inicial (primer tramo)",
    ciclo: "30 años",
    href: "/oportunidades/agroganadero",
    ctaLabel: "Ver proyecto y esquema de participación",
    disponible: true,
  },
  {
    categoria: "Flota Automotor" as Categoria,
    estado: "Próximamente",
    titulo: "Fideicomiso Flota Comercial Vita Terra",
    ubicacion: "Operación logística e industrial",
    imagen: "/images/flota/foto-1.jpeg",
    presupuesto: "USD 500.000",
    presupuestoLabel: "Fondo meta inicial",
    ciclo: "10 años",
    href: "/oportunidades/flota",
    ctaLabel: "Ver proyecto y esquema de participación",
    disponible: false,
  },
  {
    categoria: "Inmobiliario en Pozo" as Categoria,
    estado: "Próximamente",
    titulo: "Desarrollo Inmobiliario en Pozo Vita Terra",
    ubicacion: "Construcción de unidades residenciales",
    imagen: "/images/inmobiliario/foto-1.jpeg",
    presupuesto: "Próximamente",
    presupuestoLabel: "Ficha técnica en preparación",
    ciclo: "A definir",
    href: "/oportunidades/inmobiliario",
    ctaLabel: "Conocer el modelo y sumarme a la lista de espera",
    disponible: true,
  },
  {
    categoria: "Proyecto Vitivinícola" as Categoria,
    estado: "Próximamente",
    titulo: "Proyecto Vitivinícola Vita Terra",
    ubicacion: "Región vitivinícola — Argentina",
    imagen: "/images/vitivinicola/foto-1.jpeg",
    presupuesto: "Próximamente",
    presupuestoLabel: "Ficha técnica en preparación",
    ciclo: "A definir",
    href: "/oportunidades/vitivinicola",
    ctaLabel: "Conocer el modelo y sumarme a la lista de espera",
    disponible: true,
  },
];

export function Oportunidades() {
  const [filtro, setFiltro] = useState<Categoria>("Todos");

  const visibles = PROYECTOS.filter(
    (p) => filtro === "Todos" || p.categoria === filtro
  );

  return (
    <section id="oportunidades" className="scroll-mt-20 bg-paper-100 py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-brass-600">
            Oportunidades
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-900 md:text-4xl">
            Proyectos de la economía real
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFiltro(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                filtro === cat
                  ? "border-ink-800 bg-ink-800 text-paper-50"
                  : "border-paper-100/70 bg-paper-50 text-paper-muted hover:-translate-y-0.5 hover:border-brass-400 hover:text-ink-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visibles.map((p) => (
            <article
              key={p.titulo}
              className="group overflow-hidden rounded-[2px] border border-paper-line bg-paper-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(12,23,18,0.55)]"
            >
              {p.disponible && p.href ? (
                <Link
                  href={p.href}
                  className="relative block aspect-[16/10] w-full overflow-hidden"
                  aria-label={p.titulo}
                >
                  <Image
                    src={p.imagen}
                    alt={p.titulo}
                    fill
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ${
                      p.estado === "Próximamente" ? "grayscale" : ""
                    }`}
                  />
                  <span className="absolute left-4 top-4 rounded-[2px] bg-paper-50/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-900">
                    {p.estado}
                  </span>
                </Link>
              ) : (
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={p.imagen}
                    alt={p.titulo}
                    fill
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ${
                      p.estado === "Próximamente" ? "grayscale" : ""
                    }`}
                  />
                  <span className="absolute left-4 top-4 rounded-[2px] bg-paper-50/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-900">
                    {p.estado}
                  </span>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs font-medium text-paper-muted">
                  <MapPin size={13} />
                  {p.ubicacion}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink-900">
                  {p.titulo}
                </h3>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-paper-line pt-5">
                  <div>
                    <p className="text-xs text-paper-muted">
                      {p.presupuestoLabel}
                    </p>
                    <p className="mt-0.5 font-display text-base font-semibold text-ink-900">
                      {p.presupuesto}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-paper-muted">
                      Ciclo estimado del fideicomiso
                    </p>
                    <p className="mt-0.5 font-display text-base font-semibold text-ink-900">
                      {p.ciclo}
                    </p>
                  </div>
                </div>

                {p.disponible && p.href ? (
                  <Link
                    href={p.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-800 hover:text-brass-600"
                  >
                    {p.ctaLabel}
                    <ArrowRight size={15} />
                  </Link>
                ) : (
                  <p className="mt-6 text-sm font-medium text-paper-muted">
                    Ficha técnica disponible próximamente.
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
