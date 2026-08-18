"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { Compass, TrendingUp, Landmark, Award, ArrowUpRight } from "lucide-react";

export function WhyPanama() {
  const { t } = useLanguage();

  const cards = [
    {
      id: "card-1",
      icon: Compass,
      title: t.whyPanama.card1Title,
      description: t.whyPanama.card1Desc,
      tag: t.whyPanama.card1Tag,
    },
    {
      id: "card-2",
      icon: TrendingUp,
      title: t.whyPanama.card2Title,
      description: t.whyPanama.card2Desc,
      tag: t.whyPanama.card2Tag,
    },
    {
      id: "card-3",
      icon: Landmark,
      title: t.whyPanama.card3Title,
      description: t.whyPanama.card3Desc,
      tag: t.whyPanama.card3Tag,
    },
    {
      id: "card-4",
      icon: Award,
      title: t.whyPanama.card4Title,
      description: t.whyPanama.card4Desc,
      tag: t.whyPanama.card4Tag,
    },
  ];

  return (
    <section
      id="why-panama"
      className="relative py-28 md:py-36 bg-[#151515] border-t border-white/5 overflow-hidden"
    >
      {/* Luz Ambiental de Fondo Sutil */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C8A04A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="max-w-3xl mb-20">
          <h2 className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-normal text-[#F5F5F5] leading-tight mb-6">
            {t.whyPanama.title}
          </h2>

          <p className="font-sans-body text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            {t.whyPanama.subtitle}
          </p>
        </div>

        {/* GRID DE 4 TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="luxury-card p-8 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Resplandor dorado superior en hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A04A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Icono e Indicador */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C8A04A] group-hover:scale-110 group-hover:bg-[#C8A04A]/10 group-hover:border-[#C8A04A]/30 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-[#C8A04A] transition-colors duration-300" />
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2 block">
                    {card.tag}
                  </span>

                  <h3 className="font-serif-title text-2xl font-medium text-[#F5F5F5] group-hover:text-[#C8A04A] transition-colors duration-300 mb-4">
                    {card.title}
                  </h3>

                  <p className="font-sans-body text-zinc-400 text-sm font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8A04A] opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>{t.whyPanama.learnMore}</span>
                  <span className="text-sm">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
