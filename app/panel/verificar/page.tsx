"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/panel/auth-card";
import { checkOtp, getStage } from "@/lib/panel-auth";

export default function VerificarPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stage = getStage();
    if (stage === null) router.replace("/panel/login");
    if (stage === "kyc" || stage === "done") router.replace("/panel/kyc");
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (checkOtp(code)) {
      router.push("/panel/kyc");
    } else {
      setError("Ingresá el código de 6 dígitos que enviamos a tu email.");
    }
  }

  return (
    <AuthCard
      step="Paso 2 de 3"
      title="Verificá tu email"
      subtitle="Te enviamos un código de 6 dígitos a tu casilla de correo registrada."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-paper-muted">
            Código de verificación
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-center text-lg tracking-[0.5em] text-ink-900 outline-none focus:border-brass-500"
            placeholder="000000"
            required
          />
        </div>

        {error && <p className="text-sm text-clay-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-[2px] bg-ink-900 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-800"
        >
          Verificar
        </button>

        <p className="text-xs text-paper-muted">
          Demo: cualquier código de 6 dígitos es válido (ej. 123456).
        </p>
      </form>
    </AuthCard>
  );
}
