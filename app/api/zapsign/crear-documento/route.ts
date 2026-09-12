import { NextRequest, NextResponse } from "next/server";
import { crearConvenioDeAdhesion, type DatosAdhesion } from "@/lib/zapsign";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<DatosAdhesion>;

  const requeridos: (keyof DatosAdhesion)[] = [
    "nombreCompleto",
    "documento",
    "domicilio",
    "email",
    "telefono",
    "tramo",
    "montoUsd",
    "montoUsdLetras",
    "montoArs",
    "esPep",
  ];
  const faltantes = requeridos.filter((campo) => !body[campo]);
  if (faltantes.length > 0) {
    return NextResponse.json(
      { error: `Faltan campos: ${faltantes.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const resultado = await crearConvenioDeAdhesion(body as DatosAdhesion);
    return NextResponse.json(resultado);
  } catch (err) {
    console.error("Error creando convenio en ZapSign:", err);
    return NextResponse.json(
      { error: "No se pudo generar el convenio de adhesión." },
      { status: 502 }
    );
  }
}
