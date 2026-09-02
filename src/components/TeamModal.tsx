import React from 'react';
import { teamData } from '../data/content';
import { X, Award, GraduationCap, ShieldCheck, Mail } from 'lucide-react';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
  lang: 'ES' | 'EN';
}

export const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose, onOpenContact, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#151515] border border-[#C6A45D]/40 rounded-sm shadow-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto">
        {/* Top Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#A1A1AA] hover:text-[#C6A45D] transition-colors p-2 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-8 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C6A45D]/30 bg-[#0D0D0D] text-[10px] font-medium tracking-[0.2em] text-[#C6A45D] uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'ES' ? 'SOCIOS PRINCIPALES' : 'SENIOR PARTNERS'}</span>
          </div>
          <h3 className="font-garamond text-3xl md:text-4xl font-light text-[#F4F4F4] leading-tight mb-2">
            {lang === 'ES' ? 'Nuestro Equipo de Socios' : 'Our Senior Leadership'}
          </h3>
          <p className="text-xs text-[#A1A1AA] font-light">
            {lang === 'ES'
              ? 'Abogados formados en las universidades más prestigiosas del mundo, comprometidos con la excelencia jurídica.'
              : 'Attorneys educated at premier global law schools committed to legal excellence.'}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {teamData.map((partner, i) => (
            <div
              key={i}
              className="bg-[#1B1B1B] border border-white/10 hover:border-[#C6A45D]/40 rounded-sm p-6 flex flex-col justify-between transition-colors"
            >
              <div>
                {/* Photo Placeholder Frame */}
                <div className="w-full h-40 bg-[#0D0D0D] border border-white/5 rounded-sm flex items-center justify-center mb-6 relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full border border-[#C6A45D]/40 bg-[#151515] flex items-center justify-center text-[#C6A45D] font-garamond text-xl font-bold">
                    EIP
                  </div>
                  <div className="absolute bottom-2 text-[9px] uppercase tracking-widest text-[#A1A1AA]/60 font-mono">
                    FOTO PLACEHOLDER
                  </div>
                </div>

                <h4 className="font-garamond text-xl font-semibold text-[#F4F4F4] mb-1">
                  {partner.name}
                </h4>
                <p className="text-xs text-[#C6A45D] font-medium uppercase tracking-wider mb-3">
                  {partner.title[lang.toLowerCase() as 'es' | 'en']}
                </p>

                <div className="space-y-2 text-xs text-[#A1A1AA] border-t border-white/5 pt-3">
                  <div className="flex items-start gap-2">
                    <Award className="w-3.5 h-3.5 text-[#C6A45D] flex-shrink-0 mt-0.5" />
                    <span>{partner.specialty[lang.toLowerCase() as 'es' | 'en']}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-[#C6A45D] flex-shrink-0 mt-0.5" />
                    <span>{partner.education}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="mt-6 w-full py-2.5 bg-[#151515] hover:bg-[#C6A45D] text-[#F4F4F4] hover:text-[#0D0D0D] border border-white/10 hover:border-[#C6A45D] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{lang === 'ES' ? 'Contactar Socio' : 'Contact Partner'}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[#1B1B1B] hover:bg-[#C6A45D] text-[#F4F4F4] hover:text-[#0D0D0D] border border-white/10 text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors cursor-pointer"
          >
            {lang === 'ES' ? 'Cerrar Ventana' : 'Close Window'}
          </button>
        </div>
      </div>
    </div>
  );
};
