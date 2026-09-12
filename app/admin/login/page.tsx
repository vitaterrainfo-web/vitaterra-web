"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/panel/auth-card";
import { adminLogin, type AdminLoginState } from "./actions";

const initialState: AdminLoginState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState);

  return (
    <AuthCard
      step="Panel de Grupo Agro SRL"
      title="Acceso de administración"
      subtitle="Panel interno para la gestión de fideicomisos y fiduciantes."
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
          {pending ? "Ingresando..." : "Ingresar"}
        </button>
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
