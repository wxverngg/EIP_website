import { NextRequest, NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/google-reviews";

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET || process.env.SYNC_SECRET;
  // Fail-closed: if no secret is configured, deny all access
  if (!secret) {
    console.warn("[Sync Auth] CRON_SECRET / SYNC_SECRET no configurado. Acceso denegado por seguridad (fail-closed).");
    return false;
  }

  const authHeader = request.headers.get("authorization");
  const querySecret = request.nextUrl.searchParams.get("secret") || request.nextUrl.searchParams.get("key");

  return authHeader === `Bearer ${secret}` || querySecret === secret;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  const data = await getGoogleReviews();
  return NextResponse.json({
    success: data.isAvailable,
    reviewsCount: data.reviews.length,
    rating: data.rating,
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
