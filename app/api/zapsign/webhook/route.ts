import { NextRequest, NextResponse } from "next/server";

// ZapSign notifica acá cuando un documento cambia de estado (firmado,
// rechazado, etc.). Por ahora solo lo registramos: el proyecto todavía no
// tiene una base de datos real donde guardar el estado de cada convenio.
// Cuando exista, este handler debe actualizar el registro del fiduciante
// correspondiente (buscándolo por external_id o por el token del documento).
export async function POST(req: NextRequest) {
  const evento = await req.json();
  console.log("[zapsign webhook]", JSON.stringify(evento));
  return NextResponse.json({ ok: true });
}
