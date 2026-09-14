"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";

type Pilar = { icon: LucideIcon; title: string; body: string };

export function PilaresCarousel({
  pilares,
  durationSeconds = 28,
}: {
  pilares: Pilar[];
  durationSeconds?: number;
}) {
  const [paused, setPaused] = useState(false);
  const items = [...pilares, ...pilares];

  return (
    <div
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex w-max gap-6"
        style={{
          animation: `pilares-marquee ${durationSeconds}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map(({ icon: Icon, title, body }, i) => (
          <div
            key={i}
            aria-hidden={i >= pilares.length}
            className="w-[300px] shrink-0 rounded-[2px] border border-paper-line bg-paper-50 p-7"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-paper-line text-clay-600">
              <Icon size={20} />
            </div>
            <h3 className="mt-4 font-subtitle text-xl font-bold text-ink-900">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-paper-muted">
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
