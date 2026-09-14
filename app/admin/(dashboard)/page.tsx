"use client";

import { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  Users,
  FolderKanban,
  type LucideIcon,
} from "lucide-react";
import {
  adminListFideicomisos,
  adminListFiduciantes,
  type AdminFideicomiso,
  type AdminFiduciante,
} from "@/app/admin/data-actions";
import { formatUsd, mesOrden } from "@/lib/panel-data";
import { BarChart, DonutChart, LineChart } from "@/components/panel/charts";
import { Reveal } from "@/components/reveal";

export default function AdminResumenPage() {
  const [fideicomisos, setFideicomisos] = useState<AdminFideicomiso[]>([]);
  const [fiduciantes, setFiduciantes] = useState<AdminFiduciante[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([adminListFideicomisos(), adminListFiduciantes()]).then(
      ([f, u]) => {
        setFideicomisos(f);
        setFiduciantes(u);
        setLoaded(true);
      }
    );
  }, []);

  const capitalAdjudicado = fideicomisos.reduce(
    (acc, f) => acc + f.modulos_adjudicados * f.valor_modulo,
    0
  );
  const resultadosDistribuidos = fideicomisos.reduce(
    (acc, f) => acc + f.resultados_distribuidos_usd,
    0
  );
  const porEstado = fideicomisos.reduce<Record<string, number>>((acc, f) => {
    acc[f.estado] = (acc[f.estado] ?? 0) + 1;
    return acc;
  }, {});

  const capitalPorFideicomiso = fideicomisos.map((f) => ({
    label: f.nombre,
    value: f.modulos_adjudicados * f.valor_modulo,
    display: formatUsd(f.modulos_adjudicados * f.valor_modulo),
  }));

  const kycVerificados = fiduciantes.filter((f) => f.kyc_verificado).length;
  const kycPendientes = fiduciantes.length - kycVerificados;
  const ddjjFirmadas = fiduciantes.filter((f) => f.ddjj_firmada).length;
  const ddjjPendientes = fiduciantes.length - ddjjFirmadas;

  // Promedio de avance físico por mes, combinando todos los fideicomisos que
  // tengan una actualización cargada para ese mes.
  const meses: string[] = [];
  fideicomisos.forEach((f) =>
    f.actualizaciones.forEach((a) => {
      if (!meses.includes(a.mes)) meses.push(a.mes);
    })
  );
  meses.sort((a, b) => mesOrden(a) - mesOrden(b));
  const evolucionCombinada = meses.map((mes) => {
    const valores = fideicomisos
      .flatMap((f) => f.actualizaciones)
      .filter((a) => a.mes === mes)
      .map((a) => a.avance);
    const promedio = valores.length
      ? Math.round(valores.reduce((acc, v) => acc + v, 0) / valores.length)
      : 0;
    return { label: mes.split(" ")[0].slice(0, 3), value: promedio };
  });

  if (!loaded) return null;

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-medium text-ink-900">
        Resumen
      </h1>
      <p className="mt-1 text-sm text-paper-muted">
        Vista consolidada de todos los fideicomisos y fiduciantes de la
        plataforma.
      </p>

      <Reveal>
        <div className="mt-8 grid gap-px overflow-hidden rounded-[2px] border border-paper-line bg-paper-line md:grid-cols-4">
          <StatCard
            icon={Wallet}
            label="Capital total adjudicado"
            value={formatUsd(capitalAdjudicado)}
          />
          <StatCard
            icon={TrendingUp}
            label="Resultados distribuidos"
            value={formatUsd(resultadosDistribuidos)}
          />
          <StatCard
            icon={Users}
            label="Fiduciantes activos"
            value={String(fiduciantes.length)}
          />
          <StatCard
            icon={FolderKanban}
            label="Fideicomisos gestionados"
            value={String(fideicomisos.length)}
          />
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Reveal delay={80}>
          <ChartCard title="Capital adjudicado por fideicomiso">
            {capitalPorFideicomiso.length > 0 ? (
              <BarChart bars={capitalPorFideicomiso} />
            ) : (
              <EmptyChart />
            )}
          </ChartCard>
        </Reveal>

        <Reveal delay={140}>
          <ChartCard title="Validación de identidad (KYC)">
            {fiduciantes.length > 0 ? (
              <DonutChart
                segments={[
                  { label: "Verificado", value: kycVerificados },
                  { label: "Pendiente", value: kycPendientes },
                ]}
              />
            ) : (
              <EmptyChart />
            )}
          </ChartCard>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Reveal delay={80}>
          <ChartCard title="Avance físico promedio por mes">
            {evolucionCombinada.length > 0 ? (
              <LineChart points={evolucionCombinada} />
            ) : (
              <EmptyChart />
            )}
          </ChartCard>
        </Reveal>

        <Reveal delay={140}>
          <ChartCard title="Declaración jurada de origen lícito">
            {fiduciantes.length > 0 ? (
              <DonutChart
                segments={[
                  { label: "Firmada", value: ddjjFirmadas },
                  { label: "Pendiente", value: ddjjPendientes },
                ]}
              />
            ) : (
              <EmptyChart />
            )}
          </ChartCard>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="mt-10">
          <h2 className="font-sans text-xl font-bold text-ink-900">
            Avance por fideicomiso
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {fideicomisos.map((f) => (
              <div
                key={f.id}
                className="rounded-[2px] border border-paper-line bg-paper-50 p-5 transition-shadow hover:shadow-[0_16px_30px_-20px_rgba(12,23,18,0.35)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-paper-muted">
                      {f.categoria}
                    </p>
                    <p className="mt-1 font-sans text-lg font-bold text-ink-900">
                      {f.nombre}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-[2px] border border-brass-500/40 bg-brass-200/30 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-brass-600">
                    {f.avance_fisico}%
                  </span>
                </div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-paper-200">
                  <div
                    className="h-full rounded-full bg-brass-500 transition-[width] duration-700 ease-out"
                    style={{ width: `${f.avance_fisico}%` }}
                  />
                </div>
                <p className="mt-3 text-xs tabular-nums text-paper-muted">
                  {f.modulos_adjudicados} / {f.modulos_totales} módulos
                  adjudicados · {f.fiduciantes_activos} fiduciante
                  {f.fiduciantes_activos === 1 ? "" : "s"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={260}>
        <div className="mt-10">
          <h2 className="font-sans text-xl font-bold text-ink-900">
            Estado de los fideicomisos
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {Object.entries(porEstado).map(([estado, count]) => (
              <div
                key={estado}
                className="rounded-[2px] border border-paper-line bg-paper-50 p-5 transition-shadow hover:shadow-[0_16px_30px_-20px_rgba(12,23,18,0.35)]"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-paper-muted">
                  {estado}
                </p>
                <p className="mt-1.5 font-display text-2xl font-medium tabular-nums text-ink-900">
                  {count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="group bg-paper-50 p-6 transition-colors hover:bg-paper-100/60">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brass-200/30 text-brass-600 transition-transform group-hover:scale-105">
        <Icon size={16} />
      </span>
      <p className="mt-4 text-xs font-medium text-paper-muted">{label}</p>
      <p className="mt-1 font-sans text-2xl font-bold tabular-nums text-ink-900">
        {value}
      </p>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full rounded-[2px] border border-paper-line bg-paper-50 p-6 transition-shadow hover:shadow-[0_16px_30px_-20px_rgba(12,23,18,0.35)]">
      <h3 className="font-sans text-lg font-bold text-ink-900">
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function EmptyChart() {
  return (
    <p className="text-sm text-paper-muted">Todavía no hay datos suficientes.</p>
  );
}
