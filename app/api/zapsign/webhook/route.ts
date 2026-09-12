import { NextRequest, NextResponse } from "next/server";
import { obtenerDocumento } from "@/lib/zapsign";
import { createAdminClient } from "@/lib/supabase/admin";

// ZapSign notifica acá cuando un documento cambia de estado. Si el evento
// indica que ya está firmado, bajamos el PDF final, lo subimos al bucket
// privado "convenios" y marcamos el registro como firmado.
export async function POST(req: NextRequest) {
  const evento = await req.json();
  console.log("[zapsign webhook]", JSON.stringify(evento));

  const token: string | undefined = evento.token ?? evento.doc_token;
  if (!token) {
    return NextResponse.json({ ok: true });
  }

  const admin = createAdminClient();
  const { data: convenio } = await admin
    .from("convenios")
    .select("id, fiduciante_id, estado")
    .eq("zapsign_doc_token", token)
    .maybeSingle();
  if (!convenio || convenio.estado === "firmado") {
    return NextResponse.json({ ok: true });
  }

  const firmado =
    evento.status === "signed" ||
    evento.event === "doc_signed" ||
    evento.event_type === "doc_signed";
  if (!firmado) {
    return NextResponse.json({ ok: true });
  }

  try {
    const doc = await obtenerDocumento(token);
    const fileUrl = doc.signed_file ?? doc.original_file;
    if (!fileUrl) {
      throw new Error("ZapSign no devolvió un archivo firmado para " + token);
    }

    const pdfRes = await fetch(fileUrl);
    if (!pdfRes.ok) {
      throw new Error(`No se pudo descargar el PDF firmado (${pdfRes.status}).`);
    }
    const pdfBuffer = await pdfRes.arrayBuffer();

    const storagePath = `${convenio.fiduciante_id}/${convenio.id}.pdf`;
    const { error: uploadError } = await admin.storage
      .from("convenios")
      .upload(storagePath, Buffer.from(pdfBuffer), {
        contentType: "application/pdf",
        upsert: true,
      });
    if (uploadError) throw uploadError;

    await admin
      .from("convenios")
      .update({
        estado: "firmado",
        storage_path: storagePath,
        firmado_at: new Date().toISOString(),
      })
      .eq("id", convenio.id);
  } catch (err) {
    console.error("[zapsign webhook] error guardando el documento firmado:", err);
  }

  return NextResponse.json({ ok: true });
}
