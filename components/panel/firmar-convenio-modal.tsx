"use client";

import { useState } from "react";
import { X, FileSignature } from "lucide-react";

export function FirmarConvenioModal({
  fideicomisoId,
  onClose,
}: {
  fideicomisoId: string;
  onClose: () => void;
}) {
  const [tramo, setTramo] = useState("Tramo 1");
  const [montoUsd, setMontoUsd] = useState("");
  const [montoUsdLetras, setMontoUsdLetras] = useState("");
  const [montoArs, setMontoArs] = useState("");
  const [esPep, setEsPep] = useState<"Sí" | "No">("No");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/zapsign/crear-documento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fideicomisoId,
          tramo,
          montoUsd,
          montoUsdLetras,
          montoArs,
          esPep,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Error desconocido");
      }
      window.open(data.signUrl, "_blank", "noopener,noreferrer");
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo generar el convenio de adhesión."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 px-4">
      <div className="w-full max-w-md rounded-[2px] bg-paper-50 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <FileSignature size={18} className="text-brass-600" />
            <h3 className="font-sans text-xl font-bold text-ink-900">
              Firmar Convenio de Adhesión
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-paper-muted hover:text-ink-900"
          >
            <X size={18} />
          </button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-paper-muted">
          Completá el tramo y el monto comprometido. Vas a firmar el
          documento vía ZapSign, con verificación de identidad y
          auditabilidad conforme a la Cláusula Novena del contrato.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-paper-muted">
              Tramo de emisión
            </label>
            <select
              value={tramo}
              onChange={(e) => setTramo(e.target.value)}
              className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
            >
              <option>Tramo 1</option>
              <option>Tramo 2</option>
              <option>Tramo 3</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-paper-muted">
                Monto (USD)
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={montoUsd}
                onChange={(e) => setMontoUsd(e.target.value)}
                placeholder="5.000"
                className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-paper-muted">
                Monto en ARS
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={montoArs}
                onChange={(e) => setMontoArs(e.target.value)}
                placeholder="5.500.000"
                className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-paper-muted">
              Monto en letras (USD)
            </label>
            <input
              type="text"
              value={montoUsdLetras}
              onChange={(e) => setMontoUsdLetras(e.target.value)}
              placeholder="cinco mil"
              className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
              required
            />
          </div>

          <label className="flex items-center gap-2.5 text-xs text-paper-muted">
            <input
              type="checkbox"
              checked={esPep === "Sí"}
              onChange={(e) => setEsPep(e.target.checked ? "Sí" : "No")}
              className="h-3.5 w-3.5 accent-ink-900"
            />
            Soy una Persona Expuesta Políticamente (PEP)
          </label>

          {error && <p className="text-sm text-clay-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[2px] bg-ink-900 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-800 disabled:opacity-60"
          >
            {loading ? "Generando convenio..." : "Continuar a la firma"}
          </button>
        </form>
      </div>
    </div>
  );
}
