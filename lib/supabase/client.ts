import { createBrowserClient } from "@supabase/ssr";

// Cliente de Supabase para Client Components ("use client").
// Usa la publishable key: segura para el navegador siempre que las tablas
// tengan RLS (Row Level Security) habilitado.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
