"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/panel/auth-card";
import { registrar } from "@/lib/panel-auth";

export default function PanelRegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acepta, setAcepta] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!acepta) {
      setError(
        "Necesitamos que aceptes la declaración jurada y los Términos y Condiciones para continuar."
      );
      return;
    }

    if (registrar(nombre, email, password)) {
      router.push("/panel/verificar");
    } else {
      setError("Completá tu nombre y un email válido para continuar.");
    }
  }

  return (
    <AuthCard
      step="Paso 1 de 3 — Alta de fiduciante"
      title="Creá tu perfil"
      subtitle="Registrate para adherir a un fideicomiso y hacer el seguimiento de tu participación."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-paper-muted">
            Nombre y apellido
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
            required
          />
        </div>
        <div>
          <label className="text-xs font-medium text-paper-muted">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-paper-muted">
          <input
            type="checkbox"
            checked={acepta}
            onChange={(e) => setAcepta(e.target.checked)}
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

        {error && <p className="text-sm text-clay-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-[2px] bg-ink-900 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-800"
        >
          Crear mi perfil
        </button>

        <p className="text-xs text-paper-muted">
          Demo: no se crea ninguna cuenta real, solo se prueba el circuito de
          verificación.
        </p>
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
