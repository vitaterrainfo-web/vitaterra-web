import { NextRequest, NextResponse } from "next/server";
import { crearConvenioDeAdhesion } from "@/lib/zapsign";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function aNumero(valor: string): number | null {
  const limpio = valor.replace(/[^\d,]/g, "").replace(",", ".");
  const n = Number(limpio);
  return Number.isFinite(n) ? n : null;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  }

  const { data: fiduciante } = await supabase
    .from("fiduciantes")
    .select("id, nombre, email, cuit, telefono, domicilio")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (!fiduciante) {
    return NextResponse.json(
      { error: "No se encontró tu perfil de fiduciante." },
      { status: 404 }
    );
  }

  const body = await req.json();
  const { fideicomisoId, tramo, montoUsd, montoUsdLetras, montoArs, esPep } =
    body ?? {};
  if (!fideicomisoId || !tramo || !montoUsd || !montoUsdLetras || !montoArs) {
    return NextResponse.json(
      { error: "Faltan datos del convenio." },
      { status: 400 }
    );
  }

  try {
    const resultado = await crearConvenioDeAdhesion({
      nombreCompleto: fiduciante.nombre,
      documento: fiduciante.cuit ?? "",
      domicilio: fiduciante.domicilio ?? "",
      email: fiduciante.email,
      telefono: fiduciante.telefono ?? "",
      tramo,
      montoUsd,
      montoUsdLetras,
      montoArs,
      esPep: esPep === "Sí" ? "Sí" : "No",
    });

    const admin = createAdminClient();
    const { error: dbError } = await admin.from("convenios").insert({
      fiduciante_id: fiduciante.id,
      fideicomiso_id: fideicomisoId,
      zapsign_doc_token: resultado.documentoToken,
      zapsign_signer_token: resultado.signerToken,
      estado: "pendiente_firma",
      tramo,
      monto_usd: aNumero(montoUsd),
      monto_ars: aNumero(montoArs),
      es_pep: esPep === "Sí",
    });
    if (dbError) {
      console.error("Error guardando el convenio en la base:", dbError);
    }

    return NextResponse.json({ signUrl: resultado.signUrl });
  } catch (err) {
    console.error("Error creando convenio en ZapSign:", err);
    return NextResponse.json(
      { error: "No se pudo generar el convenio de adhesión." },
      { status: 502 }
    );
  }
}
