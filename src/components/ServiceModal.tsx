import React from 'react';
import type { ServiceItem } from '../data/content';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenContact: () => void;
  lang: 'ES' | 'EN';
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onOpenContact, lang }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#151515] border border-[#C6A45D]/40 rounded-sm shadow-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto">
        {/* Top Gold Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#A1A1AA] hover:text-[#C6A45D] transition-colors p-2 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C6A45D]/30 bg-[#0D0D0D] text-[10px] font-medium tracking-[0.2em] text-[#C6A45D] uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'ES' ? 'ÁREA DE PRÁCTICA ESPECIALIZADA' : 'SPECIALIZED PRACTICE AREA'}</span>
          </div>
          <h3 className="font-garamond text-3xl md:text-4xl font-light text-[#F4F4F4] leading-tight mb-3">
            {service.title[lang.toLowerCase() as 'es' | 'en']}
          </h3>
        </div>

        {/* Full Description */}
        <div className="py-4 border-y border-white/10 mb-6">
          <p className="text-sm md:text-base text-[#A1A1AA] font-light leading-relaxed mb-6">
            {service.fullDesc[lang.toLowerCase() as 'es' | 'en']}
          </p>

          <h4 className="font-garamond text-xl font-semibold text-[#F4F4F4] mb-4">
            {lang === 'ES' ? 'Capacidades Clave' : 'Key Capabilities'}
          </h4>

          <ul className="space-y-3">
            {service.keyFeatures[lang.toLowerCase() as 'es' | 'en'].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-[#F4F4F4]">
                <CheckCircle2 className="w-4 h-4 text-[#C6A45D] flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-white/10 text-xs uppercase tracking-wider text-[#A1A1AA] hover:text-[#F4F4F4] rounded-sm transition-colors cursor-pointer"
          >
            {lang === 'ES' ? 'Cerrar' : 'Close'}
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="px-8 py-3 bg-gold-gradient hover:bg-[#D7B76F] text-[#0D0D0D] font-semibold text-xs uppercase tracking-[0.2em] rounded-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>{lang === 'ES' ? 'Solicitar Asesoría' : 'Request Advice'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
