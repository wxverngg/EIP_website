import { getSupabaseAdmin } from "@/lib/supabase";
import { parseRssFeed } from "./rss-parser";
import { mapRssItemToNewsRow } from "./rss-mapper";

export interface SyncResult {
  success: boolean;
  newArticlesCount: number;
  skippedArticlesCount: number;
  durationMs: number;
  error?: string;
  timestamp: string;
}

/**
 * Ejecuta el proceso automático de sincronización de noticias desde el RSS de Soro AI hacia Supabase.
 */
export async function syncRssFeed(): Promise<SyncResult> {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  // 1. Obtener la URL del feed RSS desde la variable de entorno
  const rssUrl =
    process.env.RSS_FEED_URL ||
    "https://app.trysoro.com/api/rss/13edf2bf-1c48-406c-9b19-d09975ddafb3";

  let newArticlesCount = 0;
  let skippedArticlesCount = 0;
  let errorMessage: string | undefined = undefined;

  try {
    const supabaseAdmin = getSupabaseAdmin();

    // 2. Parsear el XML del RSS
    const parsedFeed = await parseRssFeed(rssUrl);
    const feedItems = parsedFeed.items || [];

    if (feedItems.length === 0) {
      const durationMs = Date.now() - startTime;
      await logSyncExecution(supabaseAdmin, 0, 0, undefined, durationMs);
      return {
        success: true,
        newArticlesCount: 0,
        skippedArticlesCount: 0,
        durationMs,
        timestamp,
      };
    }

    // 3. Obtener GUIDs y Slugs existentes en Supabase para evitar duplicados
    const { data: existingRows, error: selectError } = await supabaseAdmin
      .from("news")
      .select("guid, slug");

    if (selectError) {
      console.warn("Aviso al consultar noticias existentes en Supabase:", selectError.message);
    }

    const existingGuids = new Set((existingRows || []).map((row: any) => row.guid));
    const existingSlugs = new Set((existingRows || []).map((row: any) => row.slug));

    // 4. Filtrar elementos nuevos
    const itemsToInsert = [];
    for (let i = 0; i < feedItems.length; i++) {
      const item = feedItems[i];
      const mapped = mapRssItemToNewsRow(item, i);

      // Si el GUID o el Slug ya existen, ignorar
      if (existingGuids.has(mapped.guid) || existingSlugs.has(mapped.slug)) {
        skippedArticlesCount++;
      } else {
        itemsToInsert.push(mapped);
        existingGuids.add(mapped.guid);
        existingSlugs.add(mapped.slug);
      }
    }

    // 5. Insertar noticias nuevas en Supabase
    if (itemsToInsert.length > 0) {
      const { data: inserted, error: insertError } = await supabaseAdmin
        .from("news")
        .insert(itemsToInsert)
        .select("id");

      if (insertError) {
        throw new Error(`Error insertando noticias en Supabase: ${insertError.message}`);
      }

      newArticlesCount = inserted ? inserted.length : itemsToInsert.length;
    }

    const durationMs = Date.now() - startTime;

    // 6. Registrar log de sincronización exitosa
    await logSyncExecution(supabaseAdmin, newArticlesCount, skippedArticlesCount, undefined, durationMs);

    return {
      success: true,
      newArticlesCount,
      skippedArticlesCount,
      durationMs,
      timestamp,
    };
  } catch (err: any) {
    const durationMs = Date.now() - startTime;
    errorMessage = err?.message || String(err);
    console.error("Error en sincronización de RSS:", errorMessage);

    // Intentar guardar el error en sync_logs
    try {
      const supabaseAdmin = getSupabaseAdmin();
      await logSyncExecution(supabaseAdmin, newArticlesCount, skippedArticlesCount, errorMessage, durationMs);
    } catch {
      // Ignorar error secundario de log si Supabase no responde
    }

    return {
      success: false,
      newArticlesCount,
      skippedArticlesCount,
      durationMs,
      error: errorMessage,
      timestamp,
    };
  }
}

/**
 * Guarda un registro de ejecución en la tabla sync_logs en Supabase.
 */
async function logSyncExecution(
  supabaseAdmin: any,
  newCount: number,
  skippedCount: number,
  errorMsg: string | undefined,
  durationMs: number
) {
  try {
    await supabaseAdmin.from("sync_logs").insert({
      sync_date: new Date().toISOString(),
      new_articles_count: newCount,
      skipped_articles_count: skippedCount,
      error_message: errorMsg || null,
      duration_ms: durationMs,
    });
  } catch (err) {
    console.warn("No se pudo escribir en sync_logs:", err);
  }
}
