export function LineChart({
  points,
}: {
  points: { label: string; value: number }[];
}) {
  if (points.length === 0) return null;

  const w = 600;
  const h = 200;
  const padX = 16;
  const padY = 20;
  const values = points.map((p) => p.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const stepX = points.length > 1 ? (w - padX * 2) / (points.length - 1) : 0;

  const coords = points.map((p, i) => ({
    x: padX + i * stepX,
    y: h - padY - ((p.value - min) / range) * (h - padY * 2),
    ...p,
  }));

  const linePath = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${h - padY} L ${coords[0].x} ${h - padY} Z`;

  return (
    <div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="h-40 w-full"
        role="img"
        aria-label="Evolución del avance físico"
      >
        <defs>
          <linearGradient id="panelAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b8952f" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#b8952f" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#panelAreaFill)" />
        <path d={linePath} fill="none" stroke="#b8952f" strokeWidth="2.5" />
        {coords.map((c) => (
          <circle key={c.label} cx={c.x} cy={c.y} r="3.5" fill="#b8952f" />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-paper-muted">
        {points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}

export function BarChart({
  bars,
  max,
}: {
  bars: { label: string; value: number; display?: string }[];
  max?: number;
}) {
  const computedMax = max ?? Math.max(...bars.map((b) => b.value), 1);

  return (
    <div className="space-y-4">
      {bars.map((b) => (
        <div key={b.label}>
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="font-medium text-ink-900">{b.label}</span>
            <span className="shrink-0 tabular-nums text-paper-muted">
              {b.display ?? b.value.toLocaleString("es-AR")}
            </span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-paper-200">
            <div
              className="h-full rounded-full bg-brass-500 transition-[width] duration-700 ease-out"
              style={{ width: `${Math.min((b.value / computedMax) * 100, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const DONUT_COLORS = ["#b8952f", "#1a4029", "#2c2c2c", "#d4af6a", "#5c5c58"];

export function DonutChart({
  segments,
}: {
  segments: { label: string; value: number }[];
}) {
  const total = segments.reduce((acc, s) => acc + s.value, 0) || 1;
  let acc = 0;
  const withColor = segments.map((s, i) => {
    const start = (acc / total) * 360;
    acc += s.value;
    const end = (acc / total) * 360;
    return { ...s, start, end, color: DONUT_COLORS[i % DONUT_COLORS.length] };
  });
  const stops = withColor
    .map((s) => `${s.color} ${s.start}deg ${s.end}deg`)
    .join(", ");

  return (
    <div className="flex items-center gap-7">
      <div
        className="relative h-32 w-32 shrink-0 rounded-full"
        style={{ background: `conic-gradient(${stops})` }}
      >
        <div className="absolute left-1/2 top-1/2 h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper-50" />
      </div>
      <ul className="space-y-2.5">
        {withColor.map((s) => (
          <li
            key={s.label}
            className="flex items-center gap-2.5 text-xs text-paper-muted"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: s.color }}
            />
            <span className="text-ink-900">{s.label}</span>
            <span>{Math.round((s.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
