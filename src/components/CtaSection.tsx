'use client';

import React from 'react';
import { ArrowRight, Shield, PhoneCall } from 'lucide-react';

interface CtaSectionProps {
  onOpenConsultation?: () => void;
}

export default function CtaSection({ onOpenConsultation }: CtaSectionProps) {
  return (
    <section id="contact" className="relative bg-[#0D0D0D] py-28 px-6 lg:px-16 border-t border-white/10 z-20 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C8A04A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8 glass-panel p-12 lg:p-16 rounded-3xl border border-[#C8A04A]/30 shadow-2xl">
        {/* Emblem */}
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#C8A04A]/10 border border-[#C8A04A]/30 text-[#C8A04A] mb-2">
          <Shield className="w-6 h-6 stroke-[1.8]" />
        </div>

        {/* Title */}
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight">
          Ready to Secure Your Legal Success in{' '}
          <span className="font-serif italic font-normal text-gold-gradient">
            Panama?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
          Schedule a private consultation with our senior partners today. We provide personalized legal strategies tailored to your global business and individual needs.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
          <button
            onClick={onOpenConsultation}
            className="group px-9 py-4 rounded-xl bg-gold-gradient hover:opacity-95 text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-[#C8A04A]/30 flex items-center gap-3 gold-glow-hover"
          >
            <span>SCHEDULE CONSULTATION</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="tel:+5072000000"
            className="px-8 py-4 rounded-xl glass-panel hover:bg-white/10 text-white font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 border border-white/15 hover:border-[#C8A04A]/60 flex items-center gap-3"
          >
            <PhoneCall className="w-4 h-4 text-[#C8A04A]" />
            <span>+507 200-0000</span>
          </a>
        </div>
      </div>
    </section>
  );
}
