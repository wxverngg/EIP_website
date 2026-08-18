"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { CalendarCheck, Shield, ArrowRight } from "lucide-react";

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section
      id="cta"
      className="relative py-32 md:py-44 bg-[#151515] border-t border-white/5 overflow-hidden text-center"
    >
      {/* Resplandor ambiental de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C8A04A]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título Principal CTA */}
        <h2 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-normal text-[#F5F5F5] leading-tight mb-8">
          {t.cta.title}
        </h2>

        {/* Subtítulo */}
        <p className="font-sans-body text-zinc-400 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12 text-balance">
          {t.cta.subtitle}
        </p>

        {/* Botón Dorado Agendar una Consulta */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-gold text-sm px-9 py-4 group">
            <CalendarCheck className="w-4 h-4 text-[#0D0D0D]" />
            <span>{t.cta.button}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Garantía de Confidencialidad */}
        <p className="mt-8 text-xs text-zinc-500 font-light">
          {t.cta.disclaimer}
        </p>
      </div>
    </section>
  );
}
