"use client";

import React from "react";
import { LanguageProvider } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { WhyPanama } from "@/components/WhyPanama/WhyPanama";
import { LegalInsights } from "@/components/LegalInsights/LegalInsights";
import { CtaSection } from "@/components/CTA/CtaSection";
import { Footer } from "@/components/Footer/Footer";

export default function HomePage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] relative">
        {/* Navbar Fijo con Glassmorphism, Logo Exclusivo y Conmutador ES / EN */}
        <Navbar />

        {/* SECCIÓN 1: HERO (100vh) Conmutador Día/Noche en Panamá */}
        <Hero />

        {/* SECCIÓN 2: WHY PANAMA (Grid 4 Tarjetas de Valor Estratégico) */}
        <WhyPanama />

        {/* SECCIÓN 3: LEGAL INSIGHTS (Grid 2x2 Publicaciones Legales) */}
        <LegalInsights />

        {/* SECCIÓN 4: CALL TO ACTION (Agendamiento de Consulta Privada) */}
        <CtaSection />

        {/* FOOTER: Pie de Página Corporativo Minimalista */}
        <Footer />
      </main>
    </LanguageProvider>
  );
}
