'use client';

import React from 'react';
import { Scale, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-white/70 border-t border-white/10 z-20 pt-16 pb-12 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C8A04A] to-[#9A772D] flex items-center justify-center shadow-lg shadow-[#C8A04A]/20">
                <Scale className="w-5 h-5 text-black stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base tracking-[0.2em] font-semibold text-white">
                  EIP & ASSOCIATES
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#C8A04A]">
                  ATTORNEYS AT LAW &bull; PANAMA
                </span>
              </div>
            </a>

            <p className="text-xs text-white/50 font-light leading-relaxed max-w-sm">
              Premier Panamanian law firm delivering international standard legal solutions in corporate law, residency, offshore structures, maritime, and taxation.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#C8A04A] border border-white/10 hover:border-[#C8A04A] text-white hover:text-black flex items-center justify-center transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links (Cols 5-7) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              {['Home', 'About Us', 'Services', 'Team', 'Testimonials', 'Blog', 'Contact Us'].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '')}`}
                    className="text-white/60 hover:text-[#C8A04A] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas (Cols 8-9) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Practices
            </h4>
            <ul className="space-y-2.5 text-xs font-light text-white/60">
              <li>Immigration Visas</li>
              <li>Corporations</li>
              <li>Tax & Accounting</li>
              <li>Maritime Registration</li>
              <li>Naturalization</li>
              <li>Work Permits</li>
              <li>Real Estate Law</li>
            </ul>
          </div>

          {/* Contact Details (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Panama Headquarters
            </h4>
            <ul className="space-y-3.5 text-xs font-light text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C8A04A] shrink-0 mt-0.5" />
                <span>Oceania Business Plaza, Tower 2000, 34th Floor, Punta Pacifica, Panama City</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C8A04A] shrink-0" />
                <span>+507 200-0000 / +507 6000-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C8A04A] shrink-0" />
                <span>info@eipassociates.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} EIP & Associates. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/70 transition-colors">Regulatory Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
