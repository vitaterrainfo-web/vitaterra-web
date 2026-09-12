"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";

const SLIDES = [
  {
    src: "/images/hero-1.jpeg",
    label: "Inmobiliario en pozo",
    title: "Participá en el desarrollo",
    highlight: "de tu próxima propiedad.",
    body: "Sumate a la construcción de unidades residenciales desde el pozo, con contratos privados respaldados por el inmueble en obra.",
  },
  {
    src: "/images/hero-2.jpeg",
    label: "Producción agroganadera",
    title: "Participá en el campo",
    highlight: "sin ser productor.",
    body: "Sumate a un fideicomiso agroganadero respaldado por tierra propia, hacienda y una red de distribución directa.",
  },
  {
    src: "/images/hero-3.jpeg",
    label: "Proyecto vitivinícola",
    title: "Participá del vino",
    highlight: "desde el viñedo.",
    body: "Sumate a la producción y comercialización de vino, respaldada por viñedos propios y gestión enológica profesional.",
  },
  {
    src: "/images/hero-4.jpeg",
    label: "Flotas comerciales",
    title: "Participá en logística",
    highlight: "sin gestionar una flota.",
    body: "Sumate a una flota de utilitarios en explotación comercial, respaldada por contratos de logística corporativa.",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-ink-950">
      {SLIDES.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.label}
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[78%] max-w-3xl md:w-[60%]"
        style={{
          background:
            "radial-gradient(ellipse 100% 85% at 22% 50%, rgba(8,8,8,0.8) 0%, rgba(8,8,8,0.55) 50%, transparent 82%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
        <Image
          src="/images/logo-vitaterra-mark-v2.png"
          alt=""
          width={1600}
          height={1600}
          aria-hidden
          className="pointer-events-none absolute right-[-60px] top-1/2 w-[420px] max-w-none -translate-y-1/2 opacity-80 sm:w-[540px] md:w-[660px] lg:w-[740px]"
        />

        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-400">
            Economía real &amp; productiva
          </p>

          <h1
            key={active}
            className="mt-5 max-w-xl font-display text-4xl font-medium leading-[1.08] text-paper-50 md:text-[3.4rem]"
          >
            {slide.title}{" "}
            <span className="font-display italic text-brass-300">
              {slide.highlight}
            </span>
          </h1>

          <p
            key={`body-${active}`}
            className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-paper-100/90"
          >
            {slide.body}
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

        <div className="mt-14 flex flex-wrap items-center gap-3">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={s.label}
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
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
