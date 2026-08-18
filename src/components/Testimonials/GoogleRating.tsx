"use client";

import React from "react";
import { Star, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FIRM_INFO } from "@/lib/constants";

interface GoogleRatingProps {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  isAvailable?: boolean;
}

function GoogleLogoSvg({ className = "w-6 h-6" }: { className?: string }) {
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

export function GoogleRating({
  rating = 0,
  userRatingCount = 0,
  googleMapsUri = FIRM_INFO.googleMapsUrl,
  isAvailable = false,
}: GoogleRatingProps) {
  const { t } = useLanguage();
  const summaryText = t.testimonialsPage.summary;

  return (
    <section
      id="google-summary"
      aria-label="Google Rating Summary"
      className="w-full bg-[#151515] border-y border-white/10 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative z-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Rating & Brand */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0D0D0D] border border-white/10 shadow-lg shrink-0">
            <GoogleLogoSvg className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              {isAvailable && rating > 0 ? (
                <>
                  <span className="font-serif-title text-2xl sm:text-3xl font-medium text-[#F5F5F5]">
                    {rating.toFixed(1)}
                  </span>
                  <div className="flex items-center gap-1 text-[#C8A04A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#C8A04A] stroke-none" />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-1 text-[#C8A04A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#C8A04A] stroke-none" />
                  ))}
                </div>
              )}
            </div>

            <p className="font-sans-body text-xs text-[#A1A1AA] uppercase tracking-wider">
              {summaryText.basedOn}
              {isAvailable && userRatingCount > 0 && (
                <span className="ml-1.5 sm:ml-2 font-medium text-[#F5F5F5]">
                  ({userRatingCount} {userRatingCount === 1 ? "reseña" : "reseñas"})
                </span>
              )}
            </p>
          </div>
        </div>

        {/* View on Google Link */}
        <a
          href={googleMapsUri}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded bg-white/5 border border-white/10 hover:border-[#C8A04A]/50 text-[#F5F5F5] hover:text-[#C8A04A] text-xs font-semibold uppercase tracking-wider transition-all duration-300 group shadow-md"
        >
          <span>{summaryText.viewAll}</span>
          <ExternalLink className="w-4 h-4 text-[#C8A04A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
