"use client";

import { FileText, Download } from "lucide-react";
import { FIDEICOMISOS, FIDUCIANTE_DEMO } from "@/lib/panel-data";

type Documento = {
  nombre: string;
  fideicomiso: string;
  tipo: string;
};

export default function PanelDocumentosPage() {
  const documentos: Documento[] = FIDUCIANTE_DEMO.participaciones.flatMap(
    (p) => {
      const fideicomiso = FIDEICOMISOS.find((f) => f.id === p.fideicomisoId)!;
      return [
        {
          nombre: `Contrato de adhesión — ${fideicomiso.nombre}`,
          fideicomiso: fideicomiso.nombre,
          tipo: "Contrato",
        },
        {
          nombre: `Certificado de módulos adjudicados (${p.modulos})`,
          fideicomiso: fideicomiso.nombre,
          tipo: "Certificado",
        },
        {
          nombre: "Declaración jurada de origen lícito de fondos",
          fideicomiso: fideicomiso.nombre,
          tipo: "DDJJ",
        },
      ];
    }
  );

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-medium text-ink-900">
        Contratos y respaldos
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Documentación asociada a tu participación en cada fideicomiso.
      </p>

      <div className="mt-8 overflow-hidden rounded-[2px] border border-paper-line bg-paper-50">
        {documentos.map((doc, i) => (
          <div
            key={doc.nombre}
            className={`flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-paper-100 ${
              i !== 0 ? "border-t border-paper-line" : ""
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-paper-line text-brass-600">
                <FileText size={15} />
              </span>
              <div>
                <p className="text-sm font-medium text-ink-900">
                  {doc.nombre}
                </p>
                <p className="text-xs text-paper-muted">{doc.tipo}</p>
              </div>
            </div>
            <button
              type="button"
              disabled
              title="Demo: la descarga real se habilita cuando el documento esté firmado"
              className="flex shrink-0 items-center gap-1.5 rounded-[2px] border border-paper-line px-3 py-1.5 text-xs font-semibold text-paper-muted opacity-60"
            >
              <Download size={13} />
              Descargar
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-paper-muted">
        Demo: los documentos son de ejemplo. La descarga de archivos reales se
        habilitará junto con la firma digital.
      </p>
    </div>
  );
}
