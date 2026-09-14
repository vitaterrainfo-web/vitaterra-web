"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  ScrollText,
  LogOut,
} from "lucide-react";
import { adminLogout } from "@/app/admin/actions";
import { ADMIN_EMAIL } from "@/lib/auth/constants";

const NAV = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/fideicomisos", label: "Fideicomisos", icon: FolderKanban },
  { href: "/admin/fiduciantes", label: "Fiduciantes", icon: Users },
  { href: "/admin/documentos", label: "Documentos", icon: FileText },
  { href: "/admin/auditoria", label: "Auditoría", icon: ScrollText },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-paper-line bg-paper-50">
      <div className="flex items-center gap-2.5 border-b border-paper-line px-6 py-5">
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
          <p className="text-[11px] text-paper-muted">Panel de Grupo Agro SRL</p>
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
        <p className="truncate text-xs text-paper-muted">{ADMIN_EMAIL}</p>
        <form action={adminLogout}>
          <button
            type="submit"
            className="mt-3 flex items-center gap-2 text-xs font-medium text-clay-600 hover:text-clay-500"
          >
            <LogOut size={13} />
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
