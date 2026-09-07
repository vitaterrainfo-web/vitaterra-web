import { ArrowUpRight } from "lucide-react";

export function MapEmbed({
  lat,
  lon,
  label,
  zoom = 10,
  delta = 0.6,
}: {
  lat: number;
  lon: number;
  label: string;
  zoom?: number;
  delta?: number;
}) {
  const bbox = `${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  const externalHref = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`;

  return (
    <div className="overflow-hidden rounded-[2px] border border-paper-line">
      <iframe
        src={src}
        title={`Mapa de ubicación aproximada: ${label}`}
        loading="lazy"
        className="h-[360px] w-full grayscale-[15%]"
        style={{ border: 0 }}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 bg-paper-100 px-5 py-3 text-xs text-paper-muted">
        <span>{label} · ubicación aproximada</span>
        <a
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-brass-600 hover:text-brass-500"
        >
          Ver mapa más grande
          <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  );
}
