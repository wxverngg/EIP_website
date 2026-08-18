"use client";

import React from "react";
import { ShieldCheck, Award, Building2, Globe2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function TrustSection() {
  const { t } = useLanguage();
  const trustData = t.testimonialsPage.trust;

  const trustHighlights = [
    {
      icon: <Award className="w-6 h-6 text-[#C8A04A]" />,
      title: trustData.item1Title,
      description: trustData.item1Desc,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C8A04A]" />,
      title: trustData.item2Title,
      description: trustData.item2Desc,
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#C8A04A]" />,
      title: trustData.item3Title,
      description: trustData.item3Desc,
    },
    {
      icon: <Globe2 className="w-6 h-6 text-[#C8A04A]" />,
      title: trustData.item4Title,
      description: trustData.item4Desc,
    },
  ];

  return (
    <section
      id="trust"
      aria-label="Trust Section"
      className="bg-[#151515] border-y border-white/10 py-20 px-4 sm:px-6 lg:px-12 w-full relative z-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C8A04A] text-xs font-semibold uppercase tracking-widest block mb-3">
            {trustData.badge}
          </span>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-[#F5F5F5] mb-6">
            {trustData.title}
          </h2>
          <p className="font-sans-body text-[#A1A1AA] text-base font-light leading-relaxed">
            {trustData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustHighlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0D0D0D] border border-white/5 p-8 rounded-sm hover:border-[#C8A04A]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#1A1A1A] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-serif-title text-xl font-medium text-[#F5F5F5] mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans-body text-xs text-[#A1A1AA] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
