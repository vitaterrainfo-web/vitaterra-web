import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="bg-brass-500">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center md:px-8">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink-950 md:text-3xl">
            Sumate a la economía real
          </h2>
          <p className="mt-2 max-w-lg text-sm text-ink-950/80">
            Conocé el detalle técnico de cada proyecto y el esquema de
            participación antes de tomar una decisión.
          </p>
        </div>
        <Link
          href="/#oportunidades"
          className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-7 py-3.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-900"
        >
          Ver proyectos
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
