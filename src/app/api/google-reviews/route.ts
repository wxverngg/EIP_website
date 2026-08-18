import { NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/google-reviews";

export const revalidate = 21600; // Revalidate every 6 hours

export async function GET() {
  try {
    const data = await getGoogleReviews();

    return NextResponse.json(
      {
        success: data.isAvailable,
        rating: data.rating,
        userRatingCount: data.userRatingCount,
        googleMapsUri: data.googleMapsUri,
        total: data.reviews.length,
        reviews: data.reviews,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Client testimonials are temporarily unavailable.",
      },
      { status: 500 }
    );
  }
}
