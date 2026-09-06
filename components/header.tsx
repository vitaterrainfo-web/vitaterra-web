"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-paper-line bg-paper-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-vitaterra.jpeg"
            alt="Vitaterra"
            width={34}
            height={34}
            className="rounded-full object-cover"
          />
          <span className="font-display text-lg font-medium tracking-tight text-ink-900">
            Vitaterra
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-paper-muted transition-colors hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/#oportunidades"
            className="group inline-flex items-center gap-1.5 border-b-2 border-ink-900 pb-0.5 text-sm font-semibold text-ink-900 transition-colors hover:border-clay-600 hover:text-clay-600"
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
          className="text-ink-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-paper-line bg-paper-50 px-6 py-4 md:hidden">
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
          </nav>
        </div>
      )}
    </header>
  );
}
