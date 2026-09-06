"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Check } from "lucide-react";
import { AuthCard } from "@/components/panel/auth-card";
import { completeKyc, getStage } from "@/lib/panel-auth";

export default function KycPage() {
  const router = useRouter();
  const [dni, setDni] = useState("");
  const [cuit, setCuit] = useState("");
  const [dniFile, setDniFile] = useState<string | null>(null);
  const [selfieFile, setSelfieFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stage = getStage();
    if (stage === null) router.replace("/panel/login");
    if (stage === "otp") router.replace("/panel/verificar");
    if (stage === "done") router.replace("/panel");
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dni || !cuit || !dniFile || !selfieFile) {
      setError("Completá tus datos y subí ambas fotos para continuar.");
      return;
    }
    completeKyc();
    router.push("/panel");
  }

  return (
    <AuthCard
      step="Paso 3 de 3"
      title="Validación de identidad"
      subtitle="En cumplimiento de la normativa de la UIF, necesitamos validar tu identidad antes de habilitar tu perfil de fiduciante."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-paper-muted">
              N.° de documento
            </label>
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-paper-muted">
              CUIT / CUIL
            </label>
            <input
              type="text"
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              className="mt-1.5 w-full rounded-[2px] border border-paper-line bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brass-500"
              required
            />
          </div>
        </div>

        <FileField
          label="Foto del documento (frente)"
          value={dniFile}
          onChange={setDniFile}
        />
        <FileField
          label="Selfie sosteniendo el documento"
          value={selfieFile}
          onChange={setSelfieFile}
        />

        {error && <p className="text-sm text-clay-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-[2px] bg-ink-900 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-800"
        >
          Enviar y acceder a mi perfil
        </button>

        <p className="text-xs text-paper-muted">
          Demo: no se sube ningún archivo real, solo se valida que hayas
          seleccionado uno.
        </p>
      </form>
    </AuthCard>
  );
}

function FileField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (name: string | null) => void;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-paper-muted">{label}</label>
      <label className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-[2px] border border-dashed border-paper-line bg-paper-100 px-3.5 py-3 text-sm text-paper-muted transition-colors hover:border-brass-500">
        {value ? (
          <>
            <Check size={16} className="text-clay-600" />
            <span className="truncate text-ink-900">{value}</span>
          </>
        ) : (
          <>
            <Upload size={16} />
            <span>Subir foto</span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0]?.name ?? null)}
        />
      </label>
    </div>
  );
}
