'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Globe, Menu, X, Scale } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'EN' | 'ES'>('EN');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: selectedLang === 'EN' ? 'HOME' : 'INICIO', href: '#' },
    { name: selectedLang === 'EN' ? 'ABOUT US' : 'NOSOTROS', href: '#about' },
    { name: selectedLang === 'EN' ? 'SERVICES' : 'SERVICIOS', href: '#services', hasDropdown: true },
    { name: selectedLang === 'EN' ? 'TEAM' : 'EQUIPO', href: '#team' },
    { name: selectedLang === 'EN' ? 'TESTIMONIALS' : 'TESTIMONIOS', href: '#testimonials' },
    { name: selectedLang === 'EN' ? 'BLOG' : 'NOTICIAS', href: '#news' },
    { name: selectedLang === 'EN' ? 'CONTACT' : 'CONTACTO', href: '#contact' },
  ];

  const servicesList = [
    { title: 'Immigration & Residency', href: '#services' },
    { title: 'Corporations & Offshore', href: '#services' },
    { title: 'Accounting & Tax', href: '#services' },
    { title: 'Maritime Law', href: '#services' },
    { title: 'Naturalization', href: '#services' },
    { title: 'Work Permits', href: '#services' },
    { title: 'Real Estate Due Diligence', href: '#services' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-nav py-4 shadow-2xl shadow-black/60'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* LOGO LEFT */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A04A] to-[#9A772D] flex items-center justify-center shadow-lg shadow-[#C8A04A]/20 transition-transform duration-300 group-hover:scale-105">
            <Scale className="w-6 h-6 text-black stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.2em] font-semibold text-white leading-tight">
              EIP & ASSOCIATES
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A04A] font-medium">
              ATTORNEYS AT LAW &bull; PANAMA
            </span>
          </div>
        </a>

        {/* CENTER LINKS (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.hasDropdown ? (
                <div
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  className="relative"
                >
                  <a
                    href={link.href}
                    className="text-xs font-semibold uppercase tracking-[0.15em] text-white/90 hover:text-[#C8A04A] transition-colors py-2 flex items-center gap-1 cursor-pointer"
                  >
                    {link.name}
                    <ChevronDown className="w-3.5 h-3.5 text-[#C8A04A] transition-transform duration-300 group-hover:rotate-180" />
                  </a>
                  
                  {/* Dropdown menu */}
                  {servicesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 glass-panel rounded-xl py-3 px-2 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
                      {servicesList.map((service, idx) => (
                        <a
                          key={idx}
                          href={service.href}
                          className="block px-4 py-2.5 text-xs text-white/80 hover:text-[#C8A04A] hover:bg-white/5 rounded-lg transition-all font-medium"
                        >
                          {service.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-white/90 hover:text-[#C8A04A] transition-colors py-2 relative block"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C8A04A] transition-all duration-300 group-hover:w-full" />
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* RIGHT BUTTONS (Desktop) */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white/90 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#C8A04A]" />
              <span>{selectedLang === 'EN' ? '🇺🇸 EN' : '🇵🇦 ES'}</span>
              <ChevronDown className="w-3 h-3 text-white/60" />
            </button>

            {langDropdown && (
              <div className="absolute right-0 mt-2 w-32 glass-panel rounded-xl py-1.5 border border-white/10 shadow-2xl z-50">
                <button
                  onClick={() => {
                    setSelectedLang('EN');
                    setLangDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-white/5 ${
                    selectedLang === 'EN' ? 'text-[#C8A04A] font-bold' : 'text-white/80'
                  }`}
                >
                  <span>🇺🇸 English</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedLang('ES');
                    setLangDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-white/5 ${
                    selectedLang === 'ES' ? 'text-[#C8A04A] font-bold' : 'text-white/80'
                  }`}
                >
                  <span>🇵🇦 Español</span>
                </button>
              </div>
            )}
          </div>

          {/* Contact Us Button */}
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-lg border border-[#C8A04A]/60 hover:border-[#C8A04A] bg-[#C8A04A]/10 hover:bg-[#C8A04A] text-white hover:text-black font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#C8A04A]/10 hover:shadow-[#C8A04A]/30"
          >
            {selectedLang === 'EN' ? 'CONTACT US' : 'CONTACTAR'}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white"
        >
          {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="lg:hidden glass-panel border-t border-white/10 px-6 py-6 mt-4 space-y-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenu(false)}
                className="text-sm font-semibold tracking-wider text-white/90 hover:text-[#C8A04A] py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setSelectedLang(selectedLang === 'EN' ? 'ES' : 'EN')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
            >
              <Globe className="w-4 h-4 text-[#C8A04A]" />
              <span>{selectedLang === 'EN' ? 'Switch to 🇵🇦 ES' : 'Switch to 🇺🇸 EN'}</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenu(false)}
              className="px-5 py-2.5 rounded-lg bg-[#C8A04A] text-black font-bold text-xs uppercase tracking-wider"
            >
              {selectedLang === 'EN' ? 'CONTACT US' : 'CONTACTAR'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
