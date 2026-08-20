import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL no está definida en las variables de entorno. " +
    "Configúrela en .env.local o en las variables de entorno del hosting."
  );
}

if (!supabaseAnonKey && typeof window !== "undefined") {
  console.warn("ADVERTENCIA DE SEGURIDAD: NEXT_PUBLIC_SUPABASE_ANON_KEY no está definida.");
}

/**
 * Cliente público de Supabase (uso en Frontend / Cliente / Operaciones estándar)
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey || "");

/**
 * Cliente administrador de Supabase con permisos Service Role
 * (Únicamente para uso en el Servidor / API Routes / Server Actions)
 */
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY no está definida en las variables de entorno.");
  }
  return createClient(supabaseUrl!, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
