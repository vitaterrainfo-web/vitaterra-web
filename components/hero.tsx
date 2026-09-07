"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";

const SLIDES = [
  { src: "/images/hero-1.jpeg", label: "Inmobiliario en pozo" },
  { src: "/images/hero-2.jpeg", label: "Producción agroganadera" },
  { src: "/images/hero-3.jpeg", label: "Proyecto vitivinícola" },
  { src: "/images/hero-4.jpeg", label: "Flotas comerciales" },
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-ink-950">
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.label}
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-ink-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />

      <Image
        src="/images/logo-vitaterra.jpeg"
        alt=""
        width={1100}
        height={1100}
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 w-[1100px] max-w-none -translate-y-1/2 opacity-[0.07] brightness-0 invert"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-400">
            Economía real &amp; productiva
          </p>

          <h1 className="mt-5 max-w-xl font-display text-4xl font-medium leading-[1.08] text-paper-50 md:text-[3.4rem]">
            Participá en fideicomisos{" "}
            <span className="font-display italic text-brass-300">
              sin complicaciones.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-paper-100/75">
            Adquirí participación en desarrollos inmobiliarios, producción
            agroganadera, proyecto vitivinícola y flotas comerciales,
            mediante contratos privados respaldados por activos reales.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/#oportunidades"
              className="group inline-flex items-center gap-2.5 rounded-[2px] bg-brass-500 px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_16px_30px_-14px_rgba(184,149,47,0.6)] transition-colors hover:bg-brass-400"
            >
              Adherir Ahora
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              href="/#como-funciona"
              className="text-sm font-medium text-paper-100/70 transition-colors hover:text-paper-50"
            >
              Cómo funciona
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 flex items-center gap-3">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={slide.label}
              className="group flex items-center gap-2"
            >
              <span
                className={`h-1.5 rounded-full transition-all ${
                  i === active
                    ? "w-8 bg-brass-400"
                    : "w-1.5 bg-paper-50/30 group-hover:bg-paper-50/60"
                }`}
              />
              <span
                className={`hidden text-xs transition-colors sm:inline ${
                  i === active
                    ? "text-paper-50"
                    : "text-paper-100/40 group-hover:text-paper-100/70"
                }`}
              >
                {slide.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
