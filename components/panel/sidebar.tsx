"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderKanban, FileText, User, LogOut } from "lucide-react";
import { logout, getSessionNombre, getSessionEmail } from "@/lib/panel-auth";
import { FIDUCIANTE_DEMO } from "@/lib/panel-data";

const NAV = [
  { href: "/panel", label: "Resumen", icon: LayoutDashboard },
  { href: "/panel/proyectos", label: "Mis proyectos", icon: FolderKanban },
  { href: "/panel/documentos", label: "Contratos y respaldos", icon: FileText },
  { href: "/panel/perfil", label: "Mi perfil", icon: User },
];

export function PanelSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [nombre, setNombre] = useState(FIDUCIANTE_DEMO.nombre);
  const [email, setEmail] = useState(FIDUCIANTE_DEMO.email);

  useEffect(() => {
    setNombre(getSessionNombre() ?? FIDUCIANTE_DEMO.nombre);
    setEmail(getSessionEmail() ?? FIDUCIANTE_DEMO.email);
  }, []);

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-paper-line bg-paper-50">
      <div className="flex items-center gap-2.5 border-b border-paper-line px-6 py-5">
        <Image
          src="/images/logo-vitaterra.jpeg"
          alt="Vitaterra"
          width={30}
          height={30}
          className="rounded-full object-cover"
        />
        <div className="leading-tight">
          <p className="font-display text-base font-medium text-ink-900">
            Vitaterra
          </p>
          <p className="text-[11px] text-paper-muted">Mi perfil de fiduciante</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-[2px] px-3.5 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-ink-900 text-paper-50"
                  : "text-paper-muted hover:bg-paper-100 hover:text-ink-900"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-paper-line px-4 py-4">
        <p className="truncate text-xs text-paper-muted">{nombre}</p>
        <p className="truncate text-[11px] text-paper-muted/70">{email}</p>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/panel/login");
          }}
          className="mt-3 flex items-center gap-2 text-xs font-medium text-clay-600 hover:text-clay-500"
        >
          <LogOut size={13} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
