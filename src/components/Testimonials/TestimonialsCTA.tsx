"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { FIRM_INFO } from "@/lib/constants";

interface TestimonialsCTAProps {
  googleMapsUri?: string;
}

export function TestimonialsCTA({
  googleMapsUri = FIRM_INFO.googleMapsUrl,
}: TestimonialsCTAProps) {
  const { t } = useLanguage();
  const ctaData = t.testimonialsPage.cta;

  return (
    <section
      id="testimonials-cta"
      aria-label="Call to Action Section"
      className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full"
    >
      <div className="bg-[#1A1A1A] border border-white/10 rounded-sm p-8 sm:p-14 lg:p-20 relative overflow-hidden flex flex-col items-center text-center shadow-2xl">
        {/* Subtle accent border top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#C8A04A] to-transparent" />

        <div className="max-w-3xl z-10">
          <h2 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F5F5F5] mb-6 leading-tight">
            {ctaData.title}
          </h2>

          <p className="font-sans-body text-[#A1A1AA] text-base sm:text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            {ctaData.text}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded bg-[#C8A04A] hover:bg-[#D8B86C] text-[#0D0D0D] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl group w-full sm:w-auto"
            >
              <span>{ctaData.btnSchedule}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Small Google Maps Block */}
        <div className="pt-10 border-t border-white/10 w-full max-w-md flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
          <span className="font-sans-body text-xs text-[#A1A1AA] uppercase tracking-wider font-medium">
            {ctaData.mapsBlockTitle}
          </span>

          <a
            href={googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#C8A04A] hover:text-[#D8B86C] uppercase tracking-wider transition-colors"
          >
            <span>{ctaData.mapsBlockBtn}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
