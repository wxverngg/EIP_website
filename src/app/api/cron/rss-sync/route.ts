import { NextRequest, NextResponse } from "next/server";
import { syncRssFeed } from "@/lib/rss/rss-sync";

export const dynamic = "force-dynamic";

/**
 * Endpoint de Cron Job para sincronización automática de noticias desde el RSS de Soro AI.
 * Ruta: GET /api/cron/rss-sync
 * Incluye validación de token de seguridad CRON_SECRET para prevenir accesos no autorizados.
 */
export async function GET(request: NextRequest) {
  // Verificar token de autorización si está definido CRON_SECRET en el entorno
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    const searchParams = request.nextUrl.searchParams;
    const tokenParam = searchParams.get("key");

    const expectedHeader = `Bearer ${cronSecret}`;
    if (authHeader !== expectedHeader && tokenParam !== cronSecret) {
      return NextResponse.json(
        { success: false, error: "No autorizado. Token de CRON_SECRET inválido." },
        { status: 401 }
      );
    }
  }

  try {
    const result = await syncRssFeed();
    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Error desconocido durante la sincronización",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * Permite desencadenar la sincronización manual mediante POST /api/cron/rss-sync
 */
export async function POST(request: NextRequest) {
  return GET(request);
}
