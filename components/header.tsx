"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-paper-line bg-paper-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-display text-xl font-semibold uppercase tracking-[0.08em] text-ink-950">
            Vitaterra
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex lg:gap-6">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm text-paper-muted transition-colors hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex lg:gap-4">
          <Link
            href="/panel/login"
            className="whitespace-nowrap rounded-[2px] border border-ink-900 px-3.5 py-1.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-50"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/#oportunidades"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap border-b-2 border-ink-900 pb-0.5 text-sm font-semibold text-ink-900 transition-colors hover:border-clay-600 hover:text-clay-600"
          >
            Explorar proyectos
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          className="text-ink-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-paper-line bg-paper-50 px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-paper-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#oportunidades"
              className="text-sm font-semibold text-ink-900"
              onClick={() => setOpen(false)}
            >
              Explorar proyectos →
            </Link>
            <div className="mt-2 flex items-center gap-5 border-t border-paper-line pt-4">
              <Link
                href="/panel/login"
                className="text-sm text-paper-muted"
                onClick={() => setOpen(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/panel/login"
                className="text-sm font-semibold text-ink-900"
                onClick={() => setOpen(false)}
              >
                Registrarme
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
