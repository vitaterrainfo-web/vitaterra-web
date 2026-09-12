"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  adminListFiduciantes,
  adminSetDdjj,
  adminSetKyc,
  type AdminFiduciante,
} from "@/app/admin/data-actions";

export default function AdminFiduciantesPage() {
  const [fiduciantes, setFiduciantes] = useState<AdminFiduciante[]>([]);

  function load() {
    adminListFiduciantes().then(setFiduciantes);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-medium text-ink-900">
        Fiduciantes
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Estado de validación de identidad y declaración jurada de cada
        fiduciante.
      </p>

      <div className="mt-8 overflow-x-auto rounded-[2px] border border-paper-line bg-paper-50">
        <table className="w-full min-w-[840px] text-left text-sm">
          <thead>
            <tr className="border-b border-paper-line text-xs uppercase tracking-wide text-paper-muted">
              <th className="px-5 py-3 font-medium">Fiduciante</th>
              <th className="px-5 py-3 font-medium">CUIT</th>
              <th className="px-5 py-3 font-medium">Módulos</th>
              <th className="px-5 py-3 font-medium">KYC</th>
              <th className="px-5 py-3 font-medium">DDJJ</th>
            </tr>
          </thead>
          <tbody>
            {fiduciantes.map((f) => (
              <tr
                key={f.id}
                className="border-b border-paper-line last:border-0"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-ink-900">{f.nombre}</p>
                  <p className="text-xs text-paper-muted">{f.email}</p>
                </td>
                <td className="px-5 py-4 text-paper-muted">{f.cuit ?? "—"}</td>
                <td className="px-5 py-4 text-paper-muted">
                  {f.participaciones.map((p, i) => (
                    <p key={i}>
                      {p.modulos} — {p.fideicomiso_nombre}
                    </p>
                  ))}
                </td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={async () => {
                      await adminSetKyc(f.id, !f.kyc_verificado);
                      load();
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      f.kyc_verificado
                        ? "border-ink-800/20 bg-ink-800/10 text-ink-900"
                        : "border-clay-600/30 bg-clay-600/10 text-clay-600"
                    }`}
                  >
                    {f.kyc_verificado ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <XCircle size={13} />
                    )}
                    {f.kyc_verificado ? "Verificado" : "Pendiente"}
                  </button>
                </td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={async () => {
                      await adminSetDdjj(f.id, !f.ddjj_firmada);
                      load();
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      f.ddjj_firmada
                        ? "border-ink-800/20 bg-ink-800/10 text-ink-900"
                        : "border-clay-600/30 bg-clay-600/10 text-clay-600"
                    }`}
                  >
                    {f.ddjj_firmada ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <XCircle size={13} />
                    )}
                    {f.ddjj_firmada ? "Firmada" : "Pendiente"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
