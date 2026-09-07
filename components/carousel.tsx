"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel({
  images,
  alt,
  labels,
  intervalMs = 4500,
}: {
  images: string[];
  alt: string;
  labels?: string[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % images.length) + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (paused || images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, images.length, intervalMs]);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2px] border border-paper-line bg-ink-950">
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}

        {labels && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-5">
            <p className="font-display text-sm text-paper-50">
              {labels[index]}
            </p>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Imagen anterior"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-paper-50/30 bg-ink-950/50 p-2 text-paper-50 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-ink-950/80"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Imagen siguiente"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-paper-50/30 bg-ink-950/50 p-2 text-paper-50 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-ink-950/80"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Ir a la imagen ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-brass-400"
                      : "w-1.5 bg-paper-50/50 hover:bg-paper-50/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:gap-4">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`relative aspect-[4/3] overflow-hidden rounded-[2px] border transition-colors ${
                i === index
                  ? "border-brass-500"
                  : "border-paper-line hover:border-clay-400"
              }`}
            >
              <Image src={src} alt={alt} fill className="object-cover" />
              {i !== index && (
                <div className="absolute inset-0 bg-ink-950/30" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
