"use client";

import React from "react";
import { ExternalLink, AlertCircle } from "lucide-react";
import { GoogleReview } from "@/lib/google-reviews";
import { ReviewCard } from "./ReviewCard";
import { useLanguage } from "@/lib/i18n";
import { FIRM_INFO } from "@/lib/constants";

interface ReviewsGridProps {
  reviews: GoogleReview[];
  isAvailable: boolean;
  googleMapsUri?: string;
}

export function ReviewsGrid({
  reviews = [],
  isAvailable = false,
  googleMapsUri = FIRM_INFO.googleMapsUrl,
}: ReviewsGridProps) {
  const { language, t } = useLanguage();
  const fallback = t.testimonialsPage.fallback;
  const gridHeader = t.testimonialsPage.googleReviews;

  // Fallback view when API is unavailable or returns no reviews
  if (!isAvailable || reviews.length === 0) {
    return (
      <section
        id="reviews"
        aria-label="Google Reviews Section"
        className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full"
      >
        <div className="bg-[#1A1A1A] border border-white/10 rounded-sm p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#0D0D0D] border border-white/10 flex items-center justify-center mx-auto mb-6 text-[#C8A04A]">
            <AlertCircle className="w-7 h-7" />
          </div>

          <h2 className="font-serif-title text-2xl sm:text-3xl font-medium text-[#F5F5F5] mb-4">
            {fallback.title}
          </h2>

          <p className="font-sans-body text-[#A1A1AA] text-sm sm:text-base font-light leading-relaxed mb-8">
            {language === "ES" ? fallback.messageEs : fallback.message}
          </p>

          <a
            href={googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-[#C8A04A] hover:bg-[#D8B86C] text-[#0D0D0D] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg group"
          >
            <span>{language === "ES" ? fallback.btnGoogleEs : fallback.btnGoogle}</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      id="reviews"
      aria-label="Google Reviews Section"
      className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[#C8A04A] text-xs font-semibold uppercase tracking-widest block mb-2">
            Google Business Profile
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-normal text-[#F5F5F5]">
            {gridHeader.title}
          </h2>
        </div>

        <a
          href={googleMapsUri}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#C8A04A] hover:text-[#D8B86C] uppercase tracking-wider transition-colors"
        >
          <span>{gridHeader.viewOnGoogle}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 3 cols Desktop, 2 cols Tablet, 1 col Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {reviews.map((review, idx) => (
          <ReviewCard key={`${review.authorName}-${idx}`} review={review} />
        ))}
      </div>
    </section>
  );
}
