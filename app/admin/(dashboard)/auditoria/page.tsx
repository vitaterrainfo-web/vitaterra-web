"use client";

import { useEffect, useState } from "react";
import { adminListAuditoria, type AuditLogEntry } from "@/app/admin/data-actions";

const ACCION_LABEL: Record<string, string> = {
  actualizar: "Actualizó",
  agregar_actualizacion: "Agregó actualización",
  kyc: "Cambió KYC",
  ddjj: "Cambió DDJJ",
};

export default function AdminAuditoriaPage() {
  const [entradas, setEntradas] = useState<AuditLogEntry[]>([]);

  useEffect(() => {
    adminListAuditoria().then(setEntradas);
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-medium text-ink-900">
        Registro de auditoría
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Historial de cambios hechos desde el panel de administración.
      </p>

      {entradas.length === 0 ? (
        <p className="mt-8 text-sm text-paper-muted">
          Todavía no hay movimientos registrados.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-[2px] border border-paper-line bg-paper-50">
          {entradas.map((e, i) => (
            <div
              key={e.id}
              className={`px-5 py-4 ${i !== 0 ? "border-t border-paper-line" : ""}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-ink-900">
                  {ACCION_LABEL[e.accion] ?? e.accion} — {e.entidad}
                </p>
                <p className="text-xs text-paper-muted">
                  {new Date(e.created_at).toLocaleString("es-AR")}
                </p>
              </div>
              <p className="mt-1 text-xs text-paper-muted">{e.admin_email}</p>
              <pre className="mt-2 whitespace-pre-wrap break-all text-xs text-paper-muted">
                {JSON.stringify(e.detalle)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
