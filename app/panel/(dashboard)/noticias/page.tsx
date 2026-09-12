"use client";

import { useEffect, useState } from "react";
import { Newspaper, Sprout, Truck } from "lucide-react";
import { getMisParticipaciones, type ParticipacionReal } from "@/lib/panel-session";

const ICONOS: Record<string, typeof Sprout> = {
  "Desarrollo Agroganadero": Sprout,
  "Flota Automotor": Truck,
};

export default function PanelNoticiasPage() {
  const [participaciones, setParticipaciones] = useState<ParticipacionReal[]>(
    []
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMisParticipaciones().then((p) => {
      setParticipaciones(p);
      setLoaded(true);
    });
  }, []);

  if (!loaded) return null;

  const novedades = participaciones
    .flatMap((p) =>
      p.fideicomiso.actualizaciones.map((a) => ({
        ...a,
        fideicomiso: p.fideicomiso.nombre,
        categoria: p.fideicomiso.categoria,
      }))
    )
    .reverse();

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink-900">
        Noticias
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Novedades sobre el avance de los fideicomisos en los que participás.
      </p>

      {novedades.length === 0 ? (
        <p className="mt-8 text-sm text-paper-muted">
          Todavía no hay novedades para mostrar.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {novedades.map((n, i) => {
            const Icon = ICONOS[n.categoria] ?? Newspaper;
            return (
              <div
                key={`${n.fideicomiso}-${n.mes}-${i}`}
                className="flex gap-4 rounded-[2px] border border-paper-line bg-paper-50 p-5 transition-colors hover:bg-paper-100/60"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper-line text-brass-600">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-paper-muted">
                    {n.fideicomiso} · {n.mes}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-900">
                    {n.nota}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
