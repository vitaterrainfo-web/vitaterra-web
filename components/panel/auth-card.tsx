import Image from "next/image";
import type { ReactNode } from "react";

export function AuthCard({
  step,
  title,
  subtitle,
  children,
}: {
  step: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="grain relative flex min-h-screen items-center justify-center bg-paper-100 px-6 py-16">
      <div className="relative w-full max-w-md rounded-[2px] border border-paper-line bg-paper-50 p-8 shadow-[0_30px_60px_-30px_rgba(12,23,18,0.35)]">
        <div className="flex items-center gap-2.5">
          <Image
            src="/images/logo-vitaterra-badge.jpg"
            alt="Vita Terra"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <span className="font-subtitle text-xl font-bold text-ink-900">
            Vita Terra
          </span>
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brass-600">
          {step}
        </p>
        <h1 className="mt-2 font-display text-2xl font-medium text-ink-900">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">
          {subtitle}
        </p>

        <div className="mt-7">{children}</div>
      </div>
    </div>
  );
}
