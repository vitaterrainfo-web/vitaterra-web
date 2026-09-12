"use client";

import { useEffect, useState } from "react";
import { FileText, Download, Clock } from "lucide-react";
import { getMisConvenios, type ConvenioReal } from "@/lib/panel-session";
import { formatUsd } from "@/lib/panel-data";

export default function PanelArchivosPage() {
  const [convenios, setConvenios] = useState<ConvenioReal[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMisConvenios().then((c) => {
      setConvenios(c);
      setLoaded(true);
    });
  }, []);

  if (!loaded) return null;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink-900">
        Mis archivos
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Convenios de adhesión firmados en cada fideicomiso.
      </p>

      {convenios.length === 0 ? (
        <p className="mt-8 text-sm text-paper-muted">
          Todavía no generaste ningún convenio de adhesión. Se van a listar
          acá una vez que firmes desde la sección Fideicomisos.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-[2px] border border-paper-line bg-paper-50">
          {convenios.map((c, i) => {
            const firmado = c.estado === "firmado";
            return (
              <div
                key={c.id}
                className={`flex flex-wrap items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-paper-100 ${
                  i !== 0 ? "border-t border-paper-line" : ""
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-paper-line text-brass-600">
                    <FileText size={15} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink-900">
                      Convenio de adhesión — {c.fideicomisoNombre}
                    </p>
                    <p className="text-xs text-paper-muted">
                      {c.tramo ?? "—"}
                      {c.montoUsd !== null ? ` · ${formatUsd(c.montoUsd)}` : ""}
                    </p>
                  </div>
                </div>
                {firmado ? (
                  <a
                    href={`/api/documentos/${c.id}`}
                    className="flex shrink-0 items-center gap-1.5 rounded-[2px] border border-ink-900 px-3 py-1.5 text-xs font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-50"
                  >
                    <Download size={13} />
                    Descargar
                  </a>
                ) : (
                  <span
                    title="El documento se habilita para descarga cuando todas las partes lo firman"
                    className="flex shrink-0 items-center gap-1.5 rounded-[2px] border border-paper-line px-3 py-1.5 text-xs font-semibold text-paper-muted opacity-70"
                  >
                    <Clock size={13} />
                    Pendiente de firma
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
