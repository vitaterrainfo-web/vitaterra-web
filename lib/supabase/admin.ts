import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cliente con la secret key: bypassa RLS por completo. SOLO para código que
// corre en el servidor (API routes, webhooks) y nunca debe importarse desde
// un Client Component -- "server-only" hace fallar el build si eso pasa.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
