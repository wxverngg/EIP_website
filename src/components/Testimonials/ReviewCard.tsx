"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ExternalLink, Quote } from "lucide-react";
import { GoogleReview } from "@/lib/google-reviews";
import { useLanguage } from "@/lib/i18n";
import { FIRM_INFO } from "@/lib/constants";

interface ReviewCardProps {
  review: GoogleReview;
}

function GoogleLogoSvg({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
      />
    </svg>
  );
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();
  const labels = t.testimonialsPage.googleReviews;

  const MAX_LENGTH = 180;
  const isLong = review.text.length > MAX_LENGTH;
  const displayedText = isExpanded || !isLong ? review.text : `${review.text.slice(0, MAX_LENGTH)}...`;

  const reviewUrl = review.authorUrl || FIRM_INFO.googleMapsUrl;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <article className="bg-[#1A1A1A] border border-white/10 rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#C8A04A]/40 hover:shadow-xl relative group">
      <div>
        {/* Top bar: Source badge + Stars */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Source Tag */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D0D0D] border border-white/10 text-xs text-[#A1A1AA]">
            <GoogleLogoSvg className="w-3.5 h-3.5" />
            <span className="font-medium text-[#F5F5F5]">{labels.sourceTag}</span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 text-[#C8A04A]" aria-label={`${review.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? "fill-[#C8A04A] stroke-none" : "fill-none stroke-zinc-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quote Icon watermark */}
        <Quote className="w-8 h-8 text-[#C8A04A]/10 mb-2 pointer-events-none" />

        {/* Review Content (Original Text) */}
        <p className="font-sans-body text-sm sm:text-base text-[#F5F5F5] font-light leading-relaxed mb-4 whitespace-pre-line">
          &ldquo;{displayedText}&rdquo;
        </p>

        {/* Read More / Read Less Toggle */}
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-[#C8A04A] hover:text-[#D8B86C] transition-colors mb-6 focus:outline-none"
          >
            {isExpanded ? labels.readLess : labels.readMore}
          </button>
        )}
      </div>

      {/* Footer: Author Info & Link */}
      <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#C8A04A]/30 shrink-0 bg-[#0D0D0D] flex items-center justify-center shadow-inner">
            {review.authorPhotoUrl ? (
              <img
                src={review.authorPhotoUrl}
                alt={review.authorName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback al avatar estilizado si Google bloquea la imagen
                  (e.target as HTMLElement).style.display = "none";
                  const fallbackDiv = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                  if (fallbackDiv) fallbackDiv.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className={`w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center text-[#C8A04A] text-xs font-bold ${
                review.authorPhotoUrl ? "hidden" : "flex"
              }`}
            >
              {getInitials(review.authorName)}
            </div>
          </div>

          <div>
            <h3 className="font-serif-title text-base font-medium text-[#F5F5F5] leading-tight">
              {review.authorName}
            </h3>
            {(review.relativeTime || review.publishTime) && (
              <p className="font-sans-body text-xs text-[#A1A1AA]">
                {review.relativeTime ||
                  (review.publishTime
                    ? new Date(review.publishTime).toLocaleDateString()
                    : "")}
              </p>
            )}
          </div>
        </div>

        {/* External Link */}
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#A1A1AA] hover:text-[#C8A04A] transition-colors p-2 focus:outline-none"
          aria-label={`${review.authorName}'s review on Google Maps`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}
