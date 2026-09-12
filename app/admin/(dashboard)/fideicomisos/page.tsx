"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  adminListFideicomisos,
  type AdminFideicomiso,
} from "@/app/admin/data-actions";
import { formatUsd } from "@/lib/panel-data";

export default function AdminFideicomisosPage() {
  const [fideicomisos, setFideicomisos] = useState<AdminFideicomiso[]>([]);

  useEffect(() => {
    adminListFideicomisos().then(setFideicomisos);
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-medium text-ink-900">
        Fideicomisos
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Gestioná el avance físico, el estado y las actualizaciones de cada
        fideicomiso.
      </p>

      <div className="mt-8 overflow-x-auto rounded-[2px] border border-paper-line bg-paper-50">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-paper-line text-xs uppercase tracking-wide text-paper-muted">
              <th className="px-5 py-3 font-medium">Fideicomiso</th>
              <th className="px-5 py-3 font-medium">Estado</th>
              <th className="px-5 py-3 font-medium">Avance físico</th>
              <th className="px-5 py-3 font-medium">Módulos adjudicados</th>
              <th className="px-5 py-3 font-medium">Fiduciantes activos</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {fideicomisos.map((f) => (
              <tr
                key={f.id}
                className="border-b border-paper-line last:border-0"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-ink-900">{f.nombre}</p>
                  <p className="text-xs text-paper-muted">{f.categoria}</p>
                </td>
                <td className="px-5 py-4 text-paper-muted">{f.estado}</td>
                <td className="px-5 py-4 text-paper-muted">
                  {f.avance_fisico}%
                </td>
                <td className="px-5 py-4 text-paper-muted">
                  {f.modulos_adjudicados} / {f.modulos_totales} (
                  {formatUsd(f.modulos_adjudicados * f.valor_modulo)})
                </td>
                <td className="px-5 py-4 text-paper-muted">
                  {f.fiduciantes_activos}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/fideicomisos/${f.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-ink-800 hover:text-brass-600"
                  >
                    Editar
                    <ArrowUpRight size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
