import React from 'react';
import { Language } from '../types';
import { ChevronDown, ArrowRight, ShieldCheck } from 'lucide-react';

/** Propiedades que acepta la sección Hero */
interface HeroSectionProps {
  /** Estado del idioma activo ('EN' o 'ES') */
  lang: Language;
  /** Función callback para abrir el modal de consulta ejecutiva */
  onOpenContact: () => void;
}

/**
 * Componente HeroSection
 * Sección principal de la página de inicio (100vh) que incluye:
 * 1. Espacio reservado en pantalla completa para el video cinematográfico del cliente (VIDEO PROPORCIONADO POR EL CLIENTE).
 * 2. Animación CSS de zoom lento (animate-video-zoom) sobre la capa de fondo.
 * 3. Capas de overlay oscuro (#0D0D0D) para garantizar un contraste del 100% en la lectura.
 * 4. Insignia ejecutiva de residencia (personalizable en la línea 45).
 * 5. Titular principal con tipografía fluida Cormorant Garamond.
 * 6. Botones de acción y marcador animado de scroll hacia abajo.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ lang, onOpenContact }) => {
  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-36 sm:pt-44 lg:pt-48 pb-24">
      {/* 
        CONTENEDOR DE VIDEO DEL HERO (ESPACIO RESERVADO PARA VIDEO DEL CLIENTE)
        "VIDEO PROPORCIONADO POR EL CLIENTE"
        Contenedor de fondo en pantalla completa con overlay oscuro para optimizar la lectura del texto.
      */}
      <div className="absolute inset-0 w-full h-full z-0 bg-[#0D0D0D]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35 filter brightness-75 contrast-110 animate-video-zoom"
          poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><rect width='100%' height='100%' fill='%230D0D0D'/></svg>"
        >
          {/* El archivo de video del cliente se vinculará aquí al ser proporcionado */}
        </video>

        {/* Capas de Luz Ambiental y Overlay Oscuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/65 to-[#0D0D0D]/85 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-[#0D0D0D] z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#C6A45D]/5 rounded-full blur-[140px] pointer-events-none z-10" />
      </div>

      {/* Capa de Contenido Principal */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center">
        {/* Insignia Ejecutiva de Confianza */}
        <div 
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.03] border border-[#C6A45D]/30 backdrop-blur-md mb-8 animate-blur-reveal shadow-xl"
          style={{ '--i': 1 } as React.CSSProperties}
        >
          <ShieldCheck className="w-4 h-4 text-[#C6A45D]" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#F4F4F4]/90 font-medium">
            {lang === 'EN' ? 'Panama Lawyers Providing Residency Solutions' : 'Abogados en Panamá: Soluciones de Residencia Legal'}
          </span>
        </div>

        {/* Título Principal (Tipografía Fluida) */}
        <h1 
          className="font-heading fluid-title font-light text-[#F4F4F4] tracking-tight max-w-5xl mb-8 animate-blur-reveal"
          style={{ '--i': 2 } as React.CSSProperties}
        >
          {lang === 'EN' ? (
            <>
              Friendly Nations, Pensionado, Investors, Work Permit <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F4F4F4] via-[#C6A45D] to-[#D7B76F]">
                Complete Guidance & Panamanian Corporation Structures
              </span>
            </>
          ) : (
            <>
              Países Amigos, Pensionado, Inversionistas, Permisos de Trabajo <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F4F4F4] via-[#C6A45D] to-[#D7B76F]">
                Asesoría Integral y Estructuras de Sociedades Anónimas
              </span>
            </>
          )}
        </h1>

        {/* Descripción Breve */}
        <p 
          className="text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-2xl font-light leading-relaxed mb-12 animate-fade-up"
          style={{ '--i': 3 } as React.CSSProperties}
        >
          {lang === 'EN'
            ? 'Expert legal solutions for international executives, investors, and families seeking Panama residency programs, work permits, and asset protection.'
            : 'Asesoría legal experta para ejecutivos internacionales, inversionistas y familias que buscan programas de residencia en Panamá, permisos de trabajo y protección patrimonial.'}
        </p>

        {/* Botones de Acción */}
        <div 
          className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto animate-fade-up"
          style={{ '--i': 4 } as React.CSSProperties}
        >
          <a
            href="#servicios"
            className="btn-gold w-full sm:w-auto text-xs uppercase tracking-[0.15em] font-semibold px-8 py-4"
          >
            {lang === 'EN' ? 'Explore Services' : 'Explorar Servicios'}
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={onOpenContact}
            className="btn-outline-glass w-full sm:w-auto text-xs uppercase tracking-[0.15em] font-medium px-8 py-4 cursor-pointer"
          >
            {lang === 'EN' ? 'Contact Us' : 'Contáctanos'}
          </button>
        </div>
      </div>

      {/* Indicador Animado para hacer Scroll hacia Abajo */}
      <a
        href="#noticias"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group focus:outline-none"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#A1A1AA]/60 group-hover:text-[#C6A45D] transition-colors duration-300">
          Scroll
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center pt-2 group-hover:border-[#C6A45D]/50 transition-colors">
          <ChevronDown className="w-4 h-4 text-[#C6A45D] animate-scroll-indicator" />
        </div>
      </a>
    </section>
  );
};
