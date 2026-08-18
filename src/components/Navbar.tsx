"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPanamaTime } from "@/lib/panama-time";
import { useLanguage } from "@/lib/i18n";
import { Menu, X, Globe, PhoneCall } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    // Escuchar scroll para alternar entre transparente y Glassmorphism
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-[#0D0D0D]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
        : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO OFICIAL (Exclusivo en el Navbar) */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C8A04A] rounded-sm p-1 transition-transform duration-300 hover:scale-105"
          aria-label="EIP & Associates Home"
        >
          <div className="relative h-11 w-36 sm:h-12 sm:w-44 transition-all duration-300">
            <Image
              src="/images/logo/eip-white.png"
              alt="EIP & Associates Legal Firm Logo"
              fill
              className="object-contain filter drop-shadow-md"
              priority
            />
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest font-medium text-zinc-300 hover:text-[#C8A04A] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C8A04A] hover:after:w-full after:transition-all after:duration-300"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/about"
            className="text-xs uppercase tracking-widest font-medium text-zinc-300 hover:text-[#C8A04A] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C8A04A] hover:after:w-full after:transition-all after:duration-300"
          >
            {t.nav.about || (language === "ES" ? "Nosotros" : "About Us")}
          </Link>
          <Link
            href="/testimonials"
            className="text-xs uppercase tracking-widest font-medium text-zinc-300 hover:text-[#C8A04A] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C8A04A] hover:after:w-full after:transition-all after:duration-300"
          >
            {t.nav.testimonials || (language === "ES" ? "Testimonios" : "Testimonials")}
          </Link>
          <Link
            href="/news"
            className="text-xs uppercase tracking-widest font-medium text-zinc-300 hover:text-[#C8A04A] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C8A04A] hover:after:w-full after:transition-all after:duration-300"
          >
            {language === "ES" ? "Noticias" : "News"}
          </Link>
          <Link
            href="/contact"
            className="text-xs uppercase tracking-widest font-medium text-zinc-300 hover:text-[#C8A04A] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C8A04A] hover:after:w-full after:transition-all after:duration-300"
          >
            {t.nav.contact || (language === "ES" ? "Contacto" : "Contact Us")}
          </Link>
        </nav>

        {/* ACCIONES Y SELECTOR DINÁMICO DE IDIOMA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* BOTÓN CONMUTADOR DE IDIOMA (ES / EN) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs tracking-wider text-zinc-300 hover:text-[#C8A04A] px-3 py-1.5 rounded border border-white/10 hover:border-[#C8A04A]/50 transition-all duration-300 bg-white/5 group"
            aria-label="Toggle Language ES/EN"
          >
            <Globe className="w-3.5 h-3.5 text-[#C8A04A] group-hover:rotate-12 transition-transform" />
            <span className="font-semibold">{language === "ES" ? "ES" : "EN"}</span>
            <span className="text-[10px] text-zinc-500 ml-0.5">| {language === "ES" ? "EN" : "ES"}</span>
          </button>

          {/* Botón de Contacto Destacado */}
          <Link href="/contact" className="btn-gold text-xs px-5 py-2.5">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t.nav.schedule}</span>
          </Link>
        </div>

        {/* BOTÓN MOBILE MENU */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-xs text-zinc-300 px-2.5 py-1 rounded border border-white/10 bg-white/5 font-semibold"
          >
            <Globe className="w-3 h-3 text-[#C8A04A]" />
            <span>{language}</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-[#C8A04A] focus:outline-none focus:ring-2 focus:ring-[#C8A04A] rounded-md bg-white/5 border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENÚ MOBILE DESPLEGABLE */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D0D]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all duration-300 animate-fade-down">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-zinc-300 hover:text-[#C8A04A] transition-colors py-2 border-b border-white/5"
            >
              {t.nav.home}
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-zinc-300 hover:text-[#C8A04A] transition-colors py-2 border-b border-white/5"
            >
              {t.nav.about || (language === "ES" ? "Nosotros" : "About Us")}
            </Link>

            <Link
              href="/testimonials"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-zinc-300 hover:text-[#C8A04A] transition-colors py-2 border-b border-white/5"
            >
              {t.nav.testimonials || (language === "ES" ? "Testimonios" : "Testimonials")}
            </Link>

            <Link
              href="/news"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-zinc-300 hover:text-[#C8A04A] transition-colors py-2 border-b border-white/5"
            >
              {language === "ES" ? "Noticias" : "News"}
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-zinc-300 hover:text-[#C8A04A] transition-colors py-2 border-b border-white/5"
            >
              {t.nav.contact || (language === "ES" ? "Contacto" : "Contact Us")}
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-gold text-xs py-3 text-center mt-2"
            >
              {t.nav.schedule}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
