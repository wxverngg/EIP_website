"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FIRM_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import { MapPin, Mail, Phone, Clock, ExternalLink, Instagram, Facebook, MessageSquare } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Instagram":
        return <Instagram className="w-4 h-4" />;
      case "Facebook":
        return <Facebook className="w-4 h-4" />;
      case "WhatsApp":
      case "MessageSquare":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.705 1.754zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        );
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <footer id="footer" className="bg-[#0D0D0D] border-t border-white/10 text-zinc-400 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {/* COLUMNA 1: LOGO E INFORMACIÓN DE LA FIRMA */}
          <div className="flex flex-col items-center text-center gap-6 max-w-sm md:mr-auto">
            <Link href="#hero" className="inline-block focus:outline-none">
              <div className="relative h-12 w-44">
                <Image
                  src="/images/logo/eip-white.png"
                  alt="Logo Firma Legal EIP & Associates"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="font-sans-body text-sm text-zinc-400 font-light leading-relaxed">
              {t.footer.summary}
            </p>

            {/* Redes Sociales */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#C8A04A] hover:border-[#C8A04A]/50 transition-all duration-300"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNA 2: UBICACIÓN & GOOGLE MAPS LINK */}
          <div>
            <h3 className="font-serif-title text-lg font-medium text-[#F5F5F5] uppercase tracking-wider mb-6 border-b border-white/5 pb-2">
              {t.footer.locationTitle}
            </h3>
            <div className="space-y-4 text-sm font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C8A04A] shrink-0 mt-0.5" />
                <span>{FIRM_INFO.address}</span>
              </div>

              <a
                href={FIRM_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8A04A] hover:text-[#D8B86C] transition-colors pt-2"
              >
                <span>{t.footer.mapsLink}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-start gap-3 pt-2">
                <Clock className="w-5 h-5 text-[#C8A04A] shrink-0 mt-0.5" />
                <div className="text-xs text-zinc-400">
                  <span className="block font-semibold text-zinc-300">{t.footer.hoursTitle}</span>
                  <span>{t.footer.hoursValue}</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA 3: CONTACTO DIRECTO */}
          <div>
            <h3 className="font-serif-title text-lg font-medium text-[#F5F5F5] uppercase tracking-wider mb-6 border-b border-white/5 pb-2">
              {t.footer.contactTitle}
            </h3>
            <div className="space-y-4 text-sm font-light">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C8A04A] shrink-0" />
                <a
                  href={`mailto:${FIRM_INFO.email}`}
                  className="hover:text-[#C8A04A] transition-colors"
                >
                  {FIRM_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C8A04A] shrink-0" />
                <a
                  href={`tel:${FIRM_INFO.phone}`}
                  className="hover:text-[#C8A04A] transition-colors"
                >
                  {FIRM_INFO.phone}
                </a>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="btn-gold w-full py-3 text-xs justify-center"
                >
                  {t.nav.schedule}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* LÍNEA SEPARADORA Y COPYRIGHT */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-light">
          <p>{FIRM_INFO.copyright}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#C8A04A] transition-colors">
              {t.footer.privacy}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#C8A04A] transition-colors">
              {t.footer.terms}
            </Link>
            <span>•</span>
            <Link href="/compliance" className="hover:text-[#C8A04A] transition-colors">
              {t.footer.compliance}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
