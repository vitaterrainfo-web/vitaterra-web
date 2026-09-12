"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import { AuthCard } from "@/components/panel/auth-card";
import { reenviarConfirmacion, type ResendState } from "./actions";

const initialState: ResendState = { sent: false, error: null };

export default function VerificarPage() {
  return (
    <Suspense fallback={null}>
      <VerificarContent />
    </Suspense>
  );
}

function VerificarContent() {
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const [state, formAction, pending] = useActionState(
    reenviarConfirmacion,
    initialState
  );

  return (
    <AuthCard
      step="Último paso"
      title="Confirmá tu email"
      subtitle={
        email
          ? `Te enviamos un link de confirmación a ${email}. Abrilo para activar tu cuenta.`
          : "Te enviamos un link de confirmación a tu casilla de correo."
      }
    >
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper-line text-brass-600">
          <Mail size={20} />
        </span>
        <p className="text-sm text-paper-muted">
          Si no lo encontrás, revisá la carpeta de spam. El link te va a
          llevar directo a tu perfil.
        </p>

        <form action={formAction} className="w-full">
          <input type="hidden" name="email" value={email} />
          <button
            type="submit"
            disabled={pending || !email}
            className="mt-2 w-full rounded-[2px] border border-ink-900 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-50 disabled:opacity-50"
          >
            {pending ? "Reenviando..." : "Reenviar email"}
          </button>
          {state.sent && (
            <p className="mt-2 text-xs text-clay-600">
              Listo, te lo volvimos a enviar.
            </p>
          )}
          {state.error && (
            <p className="mt-2 text-xs text-clay-600">{state.error}</p>
          )}
        </form>
      </div>
    </AuthCard>
  );
}
