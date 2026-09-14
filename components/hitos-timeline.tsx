import { Reveal } from "./reveal";

export type Hito = {
  fecha: string;
  titulo: string;
  body: string;
  estado: "confirmado" | "proyectado";
};

export function HitosTimeline({ hitos }: { hitos: Hito[] }) {
  return (
    <div className="space-y-0">
      {hitos.map((hito, i) => (
        <Reveal key={hito.titulo} delay={i * 70}>
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-3 w-3 shrink-0 rounded-full ${
                  hito.estado === "confirmado"
                    ? "bg-brass-400"
                    : "border border-brass-400/50 bg-transparent"
                }`}
              />
              {i < hitos.length - 1 && (
                <div className="w-px flex-1 bg-paper-50/15" />
              )}
            </div>
            <div className="pb-8">
              <span className="text-xs font-semibold uppercase tracking-wide text-brass-400">
                {hito.fecha}
                {hito.estado === "proyectado" && (
                  <span className="ml-2 text-paper-100/40">Proyectado</span>
                )}
              </span>
              <h4 className="mt-1 font-sans text-lg font-bold text-paper-50">
                {hito.titulo}
              </h4>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-paper-100/70">
                {hito.body}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
