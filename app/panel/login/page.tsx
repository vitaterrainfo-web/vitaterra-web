"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/panel/auth-card";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export default function PanelLoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <AuthCard
      step="Acceso de fiduciantes"
      title="Ingresá a tu perfil"
      subtitle="Panel privado para el seguimiento de tus fideicomisos."
    >
      <form action={formAction} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-paper-muted">
            Email
          </label>
          <input
            type="email"
            name="email"
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
            name="password"
            className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
            placeholder="••••••••"
            required
          />
        </div>

        {state.error && <p className="text-sm text-clay-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-[2px] bg-ink-900 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-800 disabled:opacity-60"
        >
          {pending ? "Ingresando..." : "Continuar"}
        </button>
      </form>

      <p className="mt-6 text-xs text-paper-muted">
        ¿Todavía no tenés un perfil?{" "}
        <Link
          href="/panel/registro"
          className="font-medium text-ink-900 hover:text-brass-600"
        >
          Registrate
        </Link>
      </p>

      <Link
        href="/"
        className="mt-4 inline-block text-xs font-medium text-paper-muted hover:text-ink-900"
      >
        ← Volver al sitio
      </Link>
    </AuthCard>
  );
}
