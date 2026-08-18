"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const { t } = useLanguage();

  return (
    <div className="relative z-20 flex flex-col items-center gap-2 group cursor-pointer mt-6 sm:mt-8">
      <Link
        href="#why-panama"
        className="flex flex-col items-center gap-2 text-zinc-400 hover:text-[#C8A04A] transition-colors duration-300 focus:outline-none"
        aria-label={t.hero.scroll}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-400 group-hover:text-[#C8A04A] transition-colors">
          {t.hero.scroll}
        </span>

        {/* Haz de luz de scroll animado por CSS */}
        <div className="w-[1.5px] h-8 sm:h-10 bg-white/10 rounded-full overflow-hidden relative">
          <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#C8A04A] to-transparent animate-scroll-beam" />
        </div>

        <ChevronDown className="w-4 h-4 text-[#C8A04A] animate-bounce" />
      </Link>
    </div>
  );
}
