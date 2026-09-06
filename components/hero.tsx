"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";

const SLIDES = [
  { src: "/images/hero-1.jpeg", label: "Inmobiliario en pozo" },
  { src: "/images/hero-2.jpeg", label: "Producción agroganadera" },
  { src: "/images/hero-3.jpeg", label: "Proyecto vitivinícola" },
  { src: "/images/hero-4.jpeg", label: "Flotas comerciales" },
];

export function Hero() {
  const [active, setActive] = useState(1);

  return (
    <section className="relative overflow-hidden border-b border-paper-line bg-paper-50">
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[1.05fr_1fr] md:items-center md:px-8 md:py-28">
        <Reveal>
          <span className="index-mark text-7xl leading-none md:text-8xl">
            01
          </span>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-brass-600">
            Economía real &amp; productiva
          </p>

          <h1 className="mt-5 max-w-xl font-display text-4xl font-medium leading-[1.08] text-ink-900 md:text-[3.4rem]">
            Participá en fideicomisos{" "}
            <span className="font-display italic text-clay-600">
              sin complicaciones.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-paper-muted">
            Adquirí participación en desarrollos inmobiliarios, producción
            agroganadera, proyecto vitivinícola y flotas comerciales,
            mediante contratos privados respaldados por activos reales.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/#oportunidades"
              className="group inline-flex items-center gap-2 border-b-2 border-ink-900 pb-1 text-sm font-semibold text-ink-900 transition-colors hover:border-clay-600 hover:text-clay-600"
            >
              Explorar proyectos
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              href="/#como-funciona"
              className="text-sm font-medium text-paper-muted transition-colors hover:text-ink-900"
            >
              Cómo funciona
            </Link>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative">
            <div className="absolute -right-3 -top-3 h-full w-full rounded-[2px] border border-brass-400/60 md:-right-4 md:-top-4" />
            <div
              className="relative h-80 w-full overflow-hidden rounded-[2px] shadow-[0_30px_60px_-25px_rgba(12,23,18,0.45)] md:h-[420px]"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 88%)",
              }}
            >
              {SLIDES.map((slide, i) => (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.label}
                  fill
                  priority={i === active}
                  className={`object-cover transition-opacity duration-700 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/70 to-transparent p-5">
                <p className="font-display text-sm text-paper-50">
                  {SLIDES[active].label}
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={slide.label}
                  className={`relative h-14 flex-1 overflow-hidden rounded-[2px] transition-opacity ${
                    i === active
                      ? "opacity-100 ring-1 ring-brass-500"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
