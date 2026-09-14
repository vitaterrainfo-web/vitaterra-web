"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Wallet,
  UserRound,
  FolderKanban,
  Newspaper,
  FileText,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { logout } from "@/app/panel/actions";
import { getCurrentFiduciante } from "@/lib/panel-session";

const TABS = [
  { href: "/panel", label: "Mis inversiones", icon: Wallet },
  { href: "/panel/datos", label: "Mis datos", icon: UserRound },
  { href: "/panel/fideicomisos", label: "Fideicomisos", icon: FolderKanban },
  { href: "/panel/noticias", label: "Noticias", icon: Newspaper },
  { href: "/panel/archivos", label: "Mis archivos", icon: FileText },
];

export function PanelTopNav() {
  const pathname = usePathname();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getCurrentFiduciante().then((f) => {
      if (f) {
        setNombre(f.nombre);
        setEmail(f.email);
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-paper-line bg-paper-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-8">
        <Link href="/panel" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-vitaterra-badge.jpg"
            alt="Vita Terra"
            width={30}
            height={30}
            className="rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="font-display text-lg font-bold text-ink-900">
              Vita Terra
            </p>
            <p className="text-[11px] text-paper-muted">
              Mi perfil de fiduciante
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 text-right sm:flex">
          <div className="leading-tight">
            <p className="truncate text-xs font-medium text-ink-900">
              {nombre}
            </p>
            <p className="truncate text-[11px] text-paper-muted">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/admin/login"
            className="hidden items-center gap-1.5 text-xs font-medium text-paper-muted transition-colors hover:text-ink-900 md:flex"
            title="Acceso para administradores de Vita Terra"
          >
            <ShieldCheck size={13} />
            Panel de gestión
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-1.5 text-xs font-medium text-clay-600 hover:text-clay-500"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </form>
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 md:px-8">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-3.5 py-3 text-sm font-medium transition-colors ${
                active
                  ? "border-brass-500 text-ink-900"
                  : "border-transparent text-paper-muted hover:border-paper-line hover:text-ink-900"
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
