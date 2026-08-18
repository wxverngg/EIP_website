"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { EipIsotype } from "@/components/EipIsotype";
import {
  ShieldCheck,
  Award,
  Eye,
  Handshake,
  Compass,
  Globe2,
  Clock5,
  FileCheck2,
  Building2,
  UserCheck,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Quote,
  Scale,
  Briefcase,
  Globe,
  Landmark,
} from "lucide-react";

function AboutUsContent() {
  const { language, t } = useLanguage();
  const data = t.aboutPage;

  // Credibility Bar minimalist icons
  const credibilityIcons = [
    <Award key="cred-1" className="w-5 h-5 text-[#C8A04A] transition-transform duration-300 group-hover:scale-110" />,
    <Scale key="cred-2" className="w-5 h-5 text-[#C8A04A] transition-transform duration-300 group-hover:scale-110" />,
    <Globe key="cred-3" className="w-5 h-5 text-[#C8A04A] transition-transform duration-300 group-hover:scale-110" />,
    <Landmark key="cred-4" className="w-5 h-5 text-[#C8A04A] transition-transform duration-300 group-hover:scale-110" />,
  ];

  // Icons mapping for Section 4 (Our Values - Line Icons only)
  const valueIcons = [
    <ShieldCheck key="val-1" className="w-6 h-6 text-[#C8A04A] stroke-[1.5]" />,
    <Award key="val-2" className="w-6 h-6 text-[#C8A04A] stroke-[1.5]" />,
    <Eye key="val-3" className="w-6 h-6 text-[#C8A04A] stroke-[1.5]" />,
    <Handshake key="val-4" className="w-6 h-6 text-[#C8A04A] stroke-[1.5]" />,
  ];

  // Icons mapping for Section 5 (Why Clients Trust EIP)
  const trustIcons = [
    <Compass key="tr-1" className="w-5 h-5 text-[#C8A04A] stroke-[1.5]" />,
    <Globe2 key="tr-2" className="w-5 h-5 text-[#C8A04A] stroke-[1.5]" />,
    <Clock5 key="tr-3" className="w-5 h-5 text-[#C8A04A] stroke-[1.5]" />,
    <FileCheck2 key="tr-4" className="w-5 h-5 text-[#C8A04A] stroke-[1.5]" />,
    <Building2 key="tr-5" className="w-5 h-5 text-[#C8A04A] stroke-[1.5]" />,
    <UserCheck key="tr-6" className="w-5 h-5 text-[#C8A04A] stroke-[1.5]" />,
  ];

  // Schema.org JSON-LD Structured Data (LegalService & Organization)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": "https://eippanamalawyers.net/#legalservice",
        name: "EIP & Associates",
        url: "https://eippanamalawyers.net/about",
        logo: "https://eippanamalawyers.net/images/logo/eip-white.png",
        image: "https://eippanamalawyers.net/images/logo/eip-white.png",
        description: data.hero.subtitle,
        telephone: "+507 6725-6030",
        email: "info@eippanamalawyers.net",
        knowsAbout: [
          "Immigration Law Panama",
          "Corporate Law Panama",
          "Regulatory Compliance",
          "Qualified Investor Visa",
          "Friendly Nations Visa",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Century tower, Panama City",
          addressLocality: "Ciudad de Panamá",
          addressRegion: "Panamá",
          addressCountry: "PA",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://eippanamalawyers.net/#organization",
        name: "EIP & Associates",
        url: "https://eippanamalawyers.net",
        logo: "https://eippanamalawyers.net/images/logo/eip-white.png",
        sameAs: [
          "https://www.instagram.com/eip_attorneys_panama/",
          "https://www.facebook.com/profile.php?id=61565610636051",
          "https://wa.me/50767256030",
        ],
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: language === "ES" ? "Inicio" : "Home",
        item: "https://eippanamalawyers.net",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: language === "ES" ? "Nosotros" : "About Us",
        item: "https://eippanamalawyers.net/about",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] relative overflow-hidden flex flex-col justify-between selection:bg-[#C8A04A] selection:text-[#0D0D0D]">
      {/* JSON-LD Injections for Google SEO, Organization & Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      {/* =========================================================================
          SECTION 1: HERO (Left-Aligned Editorial, 60% Negative Space, No Boxes)
         ========================================================================= */}
      <section
        id="hero"
        aria-label="Hero Section"
        className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full min-h-[82vh] flex flex-col justify-center architectural-texture"
      >
        {/* Subtle Panama Skyline Abstract Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/90 via-[#0D0D0D]/40 to-[#0D0D0D] pointer-events-none" />

        {/* EIP Typography Decorative Watermark (30-40% width, right-side, 4-5% opacity, slight blur) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-6 lg:right-12 w-[75vw] sm:w-[45vw] md:w-[35vw] max-w-[500px] aspect-[2/1] pointer-events-none opacity-[0.05] filter blur-[0.5px] z-0 select-none">
          <EipIsotype strokeColor="#C8A04A" fillColor="#C8A04A" />
        </div>

        {/* Left-Aligned Editorial Composition Content (60% negative space) */}
        <div className="relative z-10 max-w-3xl animate-fade-up">
          {/* Title (Cormorant Garamond Serif Editorial) */}
          <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-normal text-[#F5F5F5] tracking-tight leading-[1.1] mb-8">
            {data.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="font-sans-body text-zinc-300 text-base sm:text-xl font-light leading-relaxed mb-12 max-w-2xl">
            {data.hero.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <Link
              href="/#who-we-are"
              className="btn-gold text-xs sm:text-sm py-3.5 px-8 justify-center shadow-lg"
            >
              <span>{data.hero.btnExplore}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/#cta"
              className="btn-glass text-xs sm:text-sm py-3.5 px-8 justify-center"
            >
              <PhoneCall className="w-4 h-4 text-[#C8A04A]" />
              <span>{data.hero.btnContact}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CREDIBILITY BAR (Horizontal, No Counters, Minimalist Badges)
         ========================================================================= */}
      <section
        id="credibility-bar"
        aria-label="Credibility Badges"
        className="w-full bg-[#151515] border-y border-white/10 py-6 px-4 sm:px-6 lg:px-8 relative z-20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center justify-between">
          {data.credibilityBar.map((item, idx) => (
            <div
              key={`cred-badge-${idx}`}
              className="flex items-center gap-3.5 group py-2 px-3 rounded-md hover:bg-white/5 transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded bg-[#0D0D0D] border border-[#C8A04A]/30 flex items-center justify-center shrink-0 group-hover:border-[#C8A04A]">
                {credibilityIcons[idx]}
              </div>
              <span className="font-sans-body text-xs sm:text-sm text-zinc-300 font-medium tracking-wide group-hover:text-[#F5F5F5] transition-colors leading-snug">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHO WE ARE (Editorial Story & Purpose)
         ========================================================================= */}
      <section
        id="who-we-are"
        aria-label="Who We Are"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A04A] mb-4">
              <span>{data.whoWeAre.badge}</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-[#F5F5F5] leading-tight mb-6">
              {data.whoWeAre.title}
            </h2>

            <div className="w-16 h-0.5 bg-[#C8A04A] mb-6" />

            <p className="font-sans-body text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              {language === "ES"
                ? "Compromiso ininterrumpido con el prestigio, la estricta confidencialidad y la excelencia estratégica en Panamá."
                : "Uninterrupted commitment to prestige, strict confidentiality, and strategic legal excellence in Panama."}
            </p>
          </div>

          {/* Right Column: Editorial Paragraphs */}
          <div className="lg:col-span-7 space-y-6 font-sans-body text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
            {/* Card 1 */}
            <div className="luxury-card p-8 relative overflow-hidden group cursor-default transition-all duration-300 hover:border-[#C8A04A]/40 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#C8A04A]/30 group-hover:bg-[#C8A04A] group-hover:w-1.5 transition-all duration-300" />
              <p className="pl-2">{data.whoWeAre.p1}</p>
            </div>

            {/* Card 2 */}
            <div className="luxury-card p-8 relative overflow-hidden group cursor-default transition-all duration-300 hover:border-[#C8A04A]/40 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#C8A04A]/30 group-hover:bg-[#C8A04A] group-hover:w-1.5 transition-all duration-300" />
              <p className="pl-2">{data.whoWeAre.p2}</p>
            </div>

            {/* Card 3 */}
            <div className="luxury-card p-8 relative overflow-hidden group cursor-default transition-all duration-300 hover:border-[#C8A04A]/40 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#C8A04A]/30 group-hover:bg-[#C8A04A] group-hover:w-1.5 transition-all duration-300" />
              <p className="pl-2">{data.whoWeAre.p3}</p>
            </div>

            {/* Card 4 - Our Promise */}
            <div className="luxury-card p-8 relative overflow-hidden group cursor-default transition-all duration-300 hover:border-[#C8A04A]/50 hover:-translate-y-1 border-white/10 shadow-2xl">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#C8A04A]/30 group-hover:bg-[#C8A04A] group-hover:w-1.5 transition-all duration-300" />
              <div className="absolute top-3 right-6 px-3 py-0.5 rounded bg-[#C8A04A]/10 border border-[#C8A04A]/30 text-[#C8A04A] group-hover:bg-[#C8A04A] group-hover:text-[#0D0D0D] text-[10px] font-bold uppercase tracking-widest transition-colors duration-300">
                {language === "ES" ? "Nuestra Promesa" : "Our Promise"}
              </div>
              <p className="text-[#F5F5F5] font-normal pl-2 pr-4">{data.whoWeAre.p4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C8A04A]/30 to-transparent" />
      </div>

      {/* =========================================================================
          SECTION 4: OUR VALUES (4 Equal Height Cards, Gold Border, Line Icons)
         ========================================================================= */}
      <section
        id="values"
        aria-label="Our Values"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-[#F5F5F5] leading-tight mb-4">
            {data.values.title}
          </h2>
          <div className="w-12 h-0.5 bg-[#C8A04A] mx-auto" />
        </div>

        <div className="about-values-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.values.items.map((item, idx) => (
            <div
              key={`val-card-${idx}`}
              className="animated-gold-card p-8 sm:p-10 flex flex-col justify-between h-full group cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-[#C8A04A]/30 flex items-center justify-center group-hover:border-[#C8A04A] group-hover:scale-110 transition-all duration-300">
                    {valueIcons[idx]}
                  </div>
                  <span className="font-serif-title text-xl font-light text-[#C8A04A]/60 group-hover:text-[#C8A04A] transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif-title text-2xl sm:text-3xl font-medium text-[#F5F5F5] mb-4 group-hover:text-[#C8A04A] transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="font-sans-body text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-end">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-[#C8A04A] transition-colors">
                  EIP Principle
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Separator Line */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C8A04A]/30 to-transparent" />
      </div>

      {/* =========================================================================
          SECTION 5: WHY CLIENTS TRUST EIP (6 Responsive Cards)
         ========================================================================= */}
      <section
        id="why-trust-eip"
        aria-label="Why Clients Trust EIP"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-[#F5F5F5] leading-tight mb-4">
            {data.whyTrust.title}
          </h2>
          <div className="w-12 h-0.5 bg-[#C8A04A] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.whyTrust.items.map((item, idx) => (
            <div
              key={`trust-card-${idx}`}
              className="luxury-card p-8 flex flex-col justify-between group hover:border-[#C8A04A]/40 transition-all duration-400"
            >
              <div>
                <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#C8A04A]/50 transition-colors">
                  {trustIcons[idx]}
                </div>

                <h3 className="font-serif-title text-xl sm:text-2xl font-medium text-[#F5F5F5] mb-3 group-hover:text-[#C8A04A] transition-colors">
                  {item.title}
                </h3>

                <p className="font-sans-body text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Panama Legal Advisory</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A04A]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Separator Line */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C8A04A]/30 to-transparent" />
      </div>

      {/* =========================================================================
          SECTION 6: OUR JOURNEY (Horizontal Timeline on Desktop / Clean Responsive Line)
         ========================================================================= */}
      <section
        id="journey"
        aria-label="Our Journey Timeline"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-[#F5F5F5] leading-tight mb-4">
            {data.journey.title}
          </h2>
          <div className="w-12 h-0.5 bg-[#C8A04A] mx-auto" />
        </div>

        {/* Premium Horizontal Timeline Container */}
        <div className="relative py-8">
          {/* Thin Horizontal Gold Line Connector (Desktop) */}
          <div className="hidden lg:block absolute top-[27px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A04A]/60 to-transparent z-0" />

          {/* Desktop Horizontal Grid / Mobile Vertical Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {data.journey.timeline.map((step, idx) => (
              <div key={`journey-step-${idx}`} className="flex flex-col items-start lg:items-center text-left lg:text-center group">
                {/* Milestone Circular Node */}
                <div className="w-8 h-8 rounded-full bg-[#0D0D0D] border-2 border-[#C8A04A] flex items-center justify-center mb-6 shadow-md shadow-[#C8A04A]/20 group-hover:scale-110 transition-transform">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C8A04A]" />
                </div>

                {/* Milestone Content */}
                <div className="luxury-card p-6 w-full flex-1 flex flex-col justify-between group-hover:border-[#C8A04A]/50 transition-colors">
                  <div>
                    <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#C8A04A] mb-2 px-2 py-0.5 rounded bg-[#C8A04A]/10">
                      {step.year}
                    </span>

                    <h3 className="font-serif-title text-lg font-medium text-[#F5F5F5] mb-2 group-hover:text-[#C8A04A] transition-colors">
                      {step.title}
                    </h3>

                    <p className="font-sans-body text-zinc-400 text-xs font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C8A04A]/30 to-transparent" />
      </div>

      {/* =========================================================================
          SECTION 7: OUR COMMITMENT (Corporate Philosophy & Editorial Quote)
         ========================================================================= */}
      <section
        id="commitment"
        aria-label="Our Commitment"
        className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center relative"
      >
        <Quote className="w-12 h-12 text-[#C8A04A]/30 mx-auto mb-8 rotate-180" />

        <blockquote className="font-serif-title text-2xl sm:text-4xl md:text-5xl font-normal text-[#F5F5F5] italic leading-snug max-w-4xl mx-auto mb-10 tracking-tight">
          {data.commitment.quote}
        </blockquote>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C8A04A] to-transparent mx-auto mb-10" />

        <p className="font-sans-body text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto">
          {data.commitment.subtext}
        </p>
      </section>

      {/* Separator Line */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C8A04A]/30 to-transparent" />
      </div>

      {/* =========================================================================
          SECTION 8: CALL TO ACTION
         ========================================================================= */}
      <section
        id="cta"
        aria-label="Call to Action"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="luxury-card p-10 sm:p-16 lg:p-20 text-center relative overflow-hidden bg-gradient-to-b from-[#1A1A1A] to-[#151515] border border-white/10">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C8A04A]/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F5F5F5] leading-tight mb-6">
              {data.cta.title}
            </h2>

            <p className="font-sans-body text-zinc-300 text-base sm:text-lg font-light leading-relaxed mb-10">
              {data.cta.text}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/#cta"
                className="btn-gold text-xs sm:text-sm py-4 px-9 w-full sm:w-auto justify-center"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{data.cta.btnSchedule}</span>
              </Link>

              <a
                href="mailto:info@eippanamalawyers.net"
                className="btn-glass text-xs sm:text-sm py-4 px-9 w-full sm:w-auto justify-center"
              >
                <span>{data.cta.btnContact}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reused Global Footer */}
      <Footer />
    </main>
  );
}

export default function AboutPage() {
  return (
    <LanguageProvider>
      <AboutUsContent />
    </LanguageProvider>
  );
}
