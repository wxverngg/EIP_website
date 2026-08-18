"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { useLanguage } from "@/lib/i18n";
import { ShieldCheck, Lock, ArrowLeft, PhoneCall } from "lucide-react";

export default function PrivacyPage() {
  const { t } = useLanguage();
  const data = (t as any).privacyPage || {};

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] pt-28 pb-20">
        {/* Header Hero */}
        <section className="relative py-16 sm:py-24 border-b border-white/5 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#C8A04A] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.nav.home}</span>
            </Link>

            <h1 className="font-serif-title text-4xl sm:text-5xl font-normal text-[#F5F5F5] leading-tight mb-4">
              {data?.hero?.title || "Política de Privacidad"}
            </h1>

            <p className="font-sans-body text-zinc-400 text-base font-light leading-relaxed mb-4">
              {data?.hero?.subtitle}
            </p>

            <span className="text-xs text-zinc-500 font-mono">
              {data?.hero?.updatedDate}
            </span>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {data?.sections?.map((sec: { title: string; content: string }, idx: number) => (
              <div key={idx} className="luxury-card p-8 border border-white/10">
                <h2 className="font-serif-title text-xl sm:text-2xl font-medium text-[#F5F5F5] mb-4 text-[#C8A04A]">
                  {sec.title}
                </h2>
                <p className="text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Direct Support CTA */}
          <div className="mt-16 p-8 rounded-xl bg-[#151515] border border-[#C8A04A]/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="font-serif-title text-xl text-[#F5F5F5] mb-1">
                ¿Tiene dudas sobre nuestra política de confidencialidad?
              </h3>
              <p className="text-xs text-zinc-400 font-light">
                Nuestro equipo de oficiales de cumplimiento está a su disposición.
              </p>
            </div>
            <Link href="/contact" className="btn-gold text-xs px-6 py-3 shrink-0">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.hero.contact}</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
