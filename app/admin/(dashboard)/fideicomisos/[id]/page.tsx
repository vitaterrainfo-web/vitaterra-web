"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import {
  addActualizacion,
  getFideicomiso,
  updateFideicomiso,
} from "@/lib/admin-store";
import {
  formatUsd,
  type EstadoFideicomiso,
  type Fideicomiso,
} from "@/lib/panel-data";

const ESTADOS: EstadoFideicomiso[] = [
  "En desarrollo",
  "Flota en adquisición",
  "Finalizado",
];

export default function AdminFideicomisoEditPage() {
  const params = useParams<{ id: string }>();
  const [fideicomiso, setFideicomiso] = useState<Fideicomiso | null>(null);
  const [avance, setAvance] = useState(0);
  const [estado, setEstado] = useState<EstadoFideicomiso>("En desarrollo");
  const [modulosAdjudicados, setModulosAdjudicados] = useState(0);
  const [resultados, setResultados] = useState(0);
  const [mes, setMes] = useState("");
  const [avanceNota, setAvanceNota] = useState(0);
  const [nota, setNota] = useState("");
  const [saved, setSaved] = useState(false);

  function load(id: string) {
    const f = getFideicomiso(id);
    if (!f) return;
    setFideicomiso(f);
    setAvance(f.avanceFisico);
    setEstado(f.estado);
    setModulosAdjudicados(f.modulosAdjudicados);
    setResultados(f.resultadosDistribuidosUsd);
  }

  useEffect(() => {
    load(params.id);
  }, [params.id]);

  if (!fideicomiso) {
    return (
      <div className="p-8">
        <p className="text-sm text-paper-muted">Fideicomiso no encontrado.</p>
        <Link
          href="/admin/fideicomisos"
          className="mt-4 inline-block text-sm font-semibold text-ink-800"
        >
          ← Volver
        </Link>
      </div>
    );
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateFideicomiso(params.id, {
      avanceFisico: avance,
      estado,
      modulosAdjudicados,
      resultadosDistribuidosUsd: resultados,
    });
    load(params.id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleAddActualizacion(e: React.FormEvent) {
    e.preventDefault();
    if (!mes || !nota) return;
    addActualizacion(params.id, { mes, avance: avanceNota, nota });
    setMes("");
    setNota("");
    setAvanceNota(0);
    load(params.id);
  }

  return (
    <div className="p-8">
      <Link
        href="/admin/fideicomisos"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-paper-muted hover:text-ink-900"
      >
        <ArrowLeft size={13} />
        Volver a fideicomisos
      </Link>

      <h1 className="mt-4 font-display text-2xl font-medium text-ink-900">
        {fideicomiso.nombre}
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        {fideicomiso.categoria} — {formatUsd(fideicomiso.presupuestoMeta)}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-[2px] border border-paper-line bg-paper-50 p-6"
        >
          <h2 className="font-display text-lg font-medium text-ink-900">
            Datos generales
          </h2>

          <div>
            <label className="text-xs font-medium text-paper-muted">
              Avance físico (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={avance}
              onChange={(e) => setAvance(Number(e.target.value))}
              className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-paper-muted">
              Estado
            </label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value as EstadoFideicomiso)}
              className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
            >
              {ESTADOS.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-paper-muted">
              Módulos adjudicados
            </label>
            <input
              type="number"
              min={0}
              max={fideicomiso.modulosTotales}
              value={modulosAdjudicados}
              onChange={(e) => setModulosAdjudicados(Number(e.target.value))}
              className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-paper-muted">
              Resultados distribuidos (USD)
            </label>
            <input
              type="number"
              min={0}
              value={resultados}
              onChange={(e) => setResultados(Number(e.target.value))}
              className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-[2px] bg-ink-900 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-800"
          >
            Guardar cambios
          </button>
          {saved && <p className="text-sm text-clay-600">Cambios guardados.</p>}
        </form>

        <div className="space-y-6">
          <div className="rounded-[2px] border border-paper-line bg-paper-50 p-6">
            <h2 className="font-display text-lg font-medium text-ink-900">
              Agregar actualización mensual
            </h2>
            <form onSubmit={handleAddActualizacion} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-paper-muted">
                  Mes
                </label>
                <input
                  type="text"
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  placeholder="Octubre 2026"
                  className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-paper-muted">
                  Avance (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={avanceNota}
                  onChange={(e) => setAvanceNota(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-paper-muted">
                  Nota
                </label>
                <textarea
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-[2px] border border-ink-900 px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-50"
              >
                <Plus size={15} />
                Agregar actualización
              </button>
            </form>
          </div>

          <div className="rounded-[2px] border border-paper-line bg-paper-50 p-6">
            <h2 className="font-display text-lg font-medium text-ink-900">
              Historial de actualizaciones
            </h2>
            <ul className="mt-4 space-y-4">
              {[...fideicomiso.actualizaciones].reverse().map((a, i) => (
                <li
                  key={`${a.mes}-${i}`}
                  className="border-b border-paper-line pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink-900">
                      {a.mes}
                    </p>
                    <p className="text-xs text-paper-muted">
                      {a.avance}% avance
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-paper-muted">{a.nota}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
