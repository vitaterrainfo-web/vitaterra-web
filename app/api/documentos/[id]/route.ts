import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Genera un link de descarga temporal para un convenio firmado, verificando
// que el fiduciante logueado sea el dueño del documento antes de emitirlo.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  }

  const { data: fiduciante } = await supabase
    .from("fiduciantes")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (!fiduciante) {
    return NextResponse.json({ error: "No encontrado." }, { status: 404 });
  }

  const admin = createAdminClient();
  const { data: convenio } = await admin
    .from("convenios")
    .select("fiduciante_id, storage_path")
    .eq("id", id)
    .maybeSingle();
  if (
    !convenio ||
    convenio.fiduciante_id !== fiduciante.id ||
    !convenio.storage_path
  ) {
    return NextResponse.json({ error: "No encontrado." }, { status: 404 });
  }

  const { data, error } = await admin.storage
    .from("convenios")
    .createSignedUrl(convenio.storage_path, 60);
  if (error || !data) {
    return NextResponse.json(
      { error: "No se pudo generar el enlace de descarga." },
      { status: 500 }
    );
  }

  return NextResponse.redirect(data.signedUrl);
}
