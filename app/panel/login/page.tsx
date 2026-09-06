"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/panel/auth-card";
import { checkPassword, DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/panel-auth";

export default function PanelLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (checkPassword(email, password)) {
      router.push("/panel/verificar");
    } else {
      setError("Email o contraseña incorrectos.");
    }
  }

  return (
    <AuthCard
      step="Acceso de fiduciantes"
      title="Ingresá a tu perfil"
      subtitle="Panel privado para el seguimiento de tus fideicomisos."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-paper-muted">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
            required
          />
        </div>
        <div>
          <label className="text-xs font-medium text-paper-muted">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
            placeholder="••••••••"
            required
          />
        </div>

        {error && <p className="text-sm text-clay-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-[2px] bg-ink-900 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-800"
        >
          Continuar
        </button>

        <p className="text-xs text-paper-muted">
          Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}
        </p>
      </form>

      <Link
        href="/"
        className="mt-6 inline-block text-xs font-medium text-paper-muted hover:text-ink-900"
      >
        ← Volver al sitio
      </Link>
    </AuthCard>
  );
}
