"use client";

import React from "react";
import { EipIsotype } from "@/components/EipIsotype";
import { useLanguage } from "@/lib/i18n";

export function TestimonialsHero() {
  const { t } = useLanguage();
  const heroData = t.testimonialsPage.hero;

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative pt-36 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full min-h-[50vh] flex flex-col justify-center architectural-texture"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/90 via-[#0D0D0D]/40 to-[#0D0D0D] pointer-events-none" />

      {/* Decorative EIP Isotype Watermark */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-6 lg:right-12 w-[75vw] sm:w-[45vw] md:w-[35vw] max-w-[500px] aspect-[2/1] pointer-events-none opacity-[0.04] filter blur-[0.5px] z-0 select-none">
        <EipIsotype strokeColor="#C8A04A" fillColor="#C8A04A" />
      </div>

      <div className="relative z-10 max-w-3xl animate-fade-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#1A1A1A] border border-[#C8A04A]/30 text-[#C8A04A] text-xs font-semibold uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A04A] animate-pulse" />
          <span>{heroData.badge}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-normal text-[#F5F5F5] tracking-tight leading-[1.1] mb-6">
          {heroData.title}
        </h1>

        {/* Subtitle */}
        <p className="font-sans-body text-[#A1A1AA] text-base sm:text-xl font-light leading-relaxed max-w-2xl">
          {heroData.subtitle}
        </p>
      </div>
    </section>
  );
}
