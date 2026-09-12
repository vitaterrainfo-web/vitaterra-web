"use client";

import { ShieldCheck } from "lucide-react";
import { AuthCard } from "@/components/panel/auth-card";
import { logout } from "@/app/panel/actions";

export default function KycPage() {
  return (
    <AuthCard
      step="Validación de identidad"
      title="Tu cuenta está en revisión"
      subtitle="En cumplimiento de la normativa de la UIF, el equipo de Grupo Agro valida manualmente la identidad de cada fiduciante antes de habilitar el acceso completo al panel."
    >
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper-line text-brass-600">
          <ShieldCheck size={20} />
        </span>
        <p className="text-sm text-paper-muted">
          Ya confirmamos tu email. Nos vamos a contactar para pedirte tu
          documentación (DNI y una foto de validación) y activar tu perfil.
          Esto suele tardar menos de 24 horas hábiles.
        </p>

        <form action={logout} className="w-full">
          <button
            type="submit"
            className="mt-2 w-full rounded-[2px] border border-paper-line py-2.5 text-sm font-medium text-paper-muted transition-colors hover:border-ink-900 hover:text-ink-900"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </AuthCard>
  );
}
