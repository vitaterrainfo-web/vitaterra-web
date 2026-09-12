"use client";

import { useEffect, useState } from "react";
import { Download, Clock } from "lucide-react";
import {
  adminListConvenios,
  adminUrlDescarga,
  type AdminConvenio,
} from "@/app/admin/data-actions";
import { formatUsd } from "@/lib/panel-data";

export default function AdminDocumentosPage() {
  const [convenios, setConvenios] = useState<AdminConvenio[]>([]);

  useEffect(() => {
    adminListConvenios().then(setConvenios);
  }, []);

  async function descargar(id: string) {
    const url = await adminUrlDescarga(id);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-medium text-ink-900">
        Documentos
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Convenios de adhesión generados por los fiduciantes, con su estado de
        firma.
      </p>

      {convenios.length === 0 ? (
        <p className="mt-8 text-sm text-paper-muted">
          Todavía no se generó ningún convenio de adhesión.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-[2px] border border-paper-line bg-paper-50">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-paper-line text-xs uppercase tracking-wide text-paper-muted">
                <th className="px-5 py-3 font-medium">Fiduciante</th>
                <th className="px-5 py-3 font-medium">Fideicomiso</th>
                <th className="px-5 py-3 font-medium">Tramo</th>
                <th className="px-5 py-3 font-medium">Monto</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {convenios.map((c) => {
                const firmado = c.estado === "firmado";
                return (
                  <tr
                    key={c.id}
                    className="border-b border-paper-line last:border-0"
                  >
                    <td className="px-5 py-4 font-medium text-ink-900">
                      {c.fiduciante_nombre}
                    </td>
                    <td className="px-5 py-4 text-paper-muted">
                      {c.fideicomiso_nombre}
                    </td>
                    <td className="px-5 py-4 text-paper-muted">
                      {c.tramo ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-paper-muted">
                      {c.monto_usd !== null ? formatUsd(c.monto_usd) : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                          firmado
                            ? "border-ink-800/20 bg-ink-800/10 text-ink-900"
                            : "border-brass-500/30 bg-brass-200/20 text-brass-600"
                        }`}
                      >
                        {firmado ? (
                          <Download size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
                        {firmado ? "Firmado" : "Pendiente"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {firmado && (
                        <button
                          type="button"
                          onClick={() => descargar(c.id)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-800 hover:text-brass-600"
                        >
                          <Download size={14} />
                          Descargar
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
