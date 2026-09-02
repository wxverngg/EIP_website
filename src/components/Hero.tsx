'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Users, Globe2, Clock, Film } from 'lucide-react';

interface HeroProps {
  onOpenConsultation?: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-36 lg:pt-44 pb-16 px-6 lg:px-16 overflow-hidden bg-[#0D0D0D]">
      {/* VIDEO BACKDROP & OVERLAY */}
      <div className="absolute inset-0 z-0">
        {/* Animated Cinematic Video Simulation Canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#0D0D0D]/90 to-[#0D0D0D] z-0" />
        
        {/* Subtle Video Background Simulation layer with moving panama skyline gradient */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-10000 animate-pulse-slow" />
        
        {/* REQUIRED 50% BLACK OVERLAY */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10" />

        {/* REQUIRED VIDEO DEL CLIENTE PLACEHOLDER BADGE */}
        <div className="absolute top-28 right-8 lg:right-16 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-[#C8A04A]/40 text-[#C8A04A] text-[10px] font-mono tracking-widest uppercase shadow-xl backdrop-blur-md">
          <Film className="w-3.5 h-3.5 animate-pulse text-[#C8A04A]" />
          <span>VIDEO DEL CLIENTE</span>
        </div>

        {/* Ambient Subtle Gold Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C8A04A]/10 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#C8A04A]/5 rounded-full filter blur-[100px] pointer-events-none" />
      </div>

      {/* HERO MAIN CONTENT GRID (2 COLUMNS) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-8">
        
        {/* LEFT COLUMN (Cols 1-7) */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          {/* Top Tagline */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C8A04A]">
              EXPERIENCE. SOLUTIONS. RESULTS.
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#C8A04A] to-transparent" />
          </div>

          {/* Headline (Serif, Very Large, 2-3 lines) */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.08] tracking-tight">
            Your Trusted Legal <br />
            Partner in{' '}
            <span className="font-serif italic font-normal text-gold-gradient drop-shadow-sm">
              Panama
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-base sm:text-lg text-white/70 max-w-xl font-sans font-light leading-relaxed">
            We provide comprehensive legal, corporate, immigration and accounting services to individuals and businesses around the world.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#services"
              className="group px-8 py-4 rounded-xl bg-gold-gradient hover:opacity-95 text-black font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300 shadow-xl shadow-[#C8A04A]/25 flex items-center gap-3 gold-glow-hover"
            >
              <span>OUR SERVICES</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              onClick={onOpenConsultation}
              className="group px-8 py-4 rounded-xl glass-panel hover:bg-white/10 text-white font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300 border border-white/15 hover:border-[#C8A04A]/60 flex items-center gap-3"
            >
              <span>CONTACT US</span>
              <ArrowRight className="w-4 h-4 text-[#C8A04A] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN (Cols 8-12): Floating Card with 4 Key Benefits */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="glass-panel p-8 sm:p-9 rounded-2xl border border-white/10 max-w-md w-full shadow-2xl shadow-black/80 relative backdrop-blur-xl animate-float">
            {/* Corner accent glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C8A04A]/10 rounded-bl-full pointer-events-none" />

            <div className="space-y-6">
              {/* Benefit 1 */}
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-[#C8A04A]/10 border border-[#C8A04A]/25 text-[#C8A04A] transition-colors group-hover:bg-[#C8A04A] group-hover:text-black">
                  <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#C8A04A] transition-colors">
                    More than 15 years
                  </h4>
                  <p className="text-xs text-white/60 font-light mt-0.5">
                    of proven legal experience
                  </p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/5" />

              {/* Benefit 2 */}
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-[#C8A04A]/10 border border-[#C8A04A]/25 text-[#C8A04A] transition-colors group-hover:bg-[#C8A04A] group-hover:text-black">
                  <Users className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#C8A04A] transition-colors">
                    1,000+
                  </h4>
                  <p className="text-xs text-white/60 font-light mt-0.5">
                    Clients worldwide trust our firm
                  </p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/5" />

              {/* Benefit 3 */}
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-[#C8A04A]/10 border border-[#C8A04A]/25 text-[#C8A04A] transition-colors group-hover:bg-[#C8A04A] group-hover:text-black">
                  <Globe2 className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#C8A04A] transition-colors">
                    Global Solutions
                  </h4>
                  <p className="text-xs text-white/60 font-light mt-0.5">
                    with deep local Panamanian expertise
                  </p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/5" />

              {/* Benefit 4 */}
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-[#C8A04A]/10 border border-[#C8A04A]/25 text-[#C8A04A] transition-colors group-hover:bg-[#C8A04A] group-hover:text-black">
                  <Clock className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#C8A04A] transition-colors">
                    Personalized Attention
                  </h4>
                  <p className="text-xs text-white/60 font-light mt-0.5">
                    and fast response guarantees
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ELEGANT HERO TRANSITION TO BELOW SECTIONS */}
      <div className="relative z-20 w-full pt-8 flex justify-center">
        <a
          href="#services"
          className="group flex flex-col items-center gap-2 text-white/40 hover:text-[#C8A04A] transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll to explore</span>
          <div className="w-5 h-9 rounded-full border border-white/20 group-hover:border-[#C8A04A] flex justify-center pt-2 transition-colors">
            <div className="w-1 h-2 bg-[#C8A04A] rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
