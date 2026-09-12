"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/panel/auth-card";
import { registrar, type RegistroState } from "./actions";

const initialState: RegistroState = { error: null };

export default function PanelRegistroPage() {
  const [state, formAction, pending] = useActionState(registrar, initialState);

  return (
    <AuthCard
      step="Alta de fiduciante"
      title="Creá tu perfil"
      subtitle="Registrate para adherir a un fideicomiso y hacer el seguimiento de tu participación."
    >
      <form action={formAction} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-paper-muted">
            Nombre y apellido
          </label>
          <input
            type="text"
            name="nombre"
            className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
            required
          />
        </div>
        <div>
          <label className="text-xs font-medium text-paper-muted">Email</label>
          <input
            type="email"
            name="email"
            className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
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
          <div>
            <label className="text-xs font-medium text-paper-muted">
              Repetir contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-paper-muted">
          <input
            type="checkbox"
            name="acepta"
            className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-ink-900"
          />
          Declaro el origen lícito de los fondos a aportar y acepto los{" "}
          <Link
            href="/terminos-y-condiciones"
            className="underline hover:text-ink-900"
          >
            Términos y Condiciones
          </Link>{" "}
          y la{" "}
          <Link
            href="/politica-de-privacidad"
            className="underline hover:text-ink-900"
          >
            Política de Privacidad
          </Link>
          .
        </label>

        {state.error && <p className="text-sm text-clay-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-[2px] bg-ink-900 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-800 disabled:opacity-60"
        >
          {pending ? "Creando..." : "Crear mi perfil"}
        </button>
      </form>

      <p className="mt-6 text-xs text-paper-muted">
        ¿Ya tenés un perfil?{" "}
        <Link
          href="/panel/login"
          className="font-medium text-ink-900 hover:text-brass-600"
        >
          Iniciá sesión
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
