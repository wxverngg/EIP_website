import React from 'react';
import type { NewsItem } from '../data/content';
import { X, Calendar, Clock, Bot, Sparkles, Share2 } from 'lucide-react';

interface NewsModalProps {
  news: NewsItem | null;
  onClose: () => void;
  lang: 'ES' | 'EN';
}

export const NewsModal: React.FC<NewsModalProps> = ({ news, onClose, lang }) => {
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#151515] border border-[#C6A45D]/40 rounded-sm shadow-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto">
        {/* Top Gold Accent Line */}
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
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#0D0D0D] px-3 py-1 border border-[#C6A45D]/30 text-[10px] font-semibold tracking-widest text-[#C6A45D] uppercase rounded-xs">
              {news.category[lang.toLowerCase() as 'es' | 'en']}
            </span>
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#A1A1AA]">
              <Sparkles className="w-3 h-3 text-[#C6A45D]" />
              <span>AI Legal Verified Report</span>
            </div>
          </div>

          <h3 className="font-garamond text-2xl md:text-4xl font-light text-[#F4F4F4] leading-tight mb-4">
            {news.title[lang.toLowerCase() as 'es' | 'en']}
          </h3>

          <div className="flex items-center gap-4 text-xs text-[#A1A1AA] font-mono pb-4 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C6A45D]" />
              <span>{news.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{news.readTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-[#C6A45D]">
              <Bot className="w-3.5 h-3.5" />
              <span>{news.author}</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-4 text-sm md:text-base text-[#A1A1AA] font-light leading-relaxed mb-8">
          <p className="font-medium text-[#F4F4F4] italic text-base md:text-lg border-l-2 border-[#C6A45D] pl-4 py-1">
            "{news.summary[lang.toLowerCase() as 'es' | 'en']}"
          </p>

          <p>
            {news.content[lang.toLowerCase() as 'es' | 'en']}
          </p>

          <p>
            {lang === 'ES'
              ? 'Nuestros socios sénior revisan continuamente estos reportes normativos para asesorar con precisión a inversionistas corporativos y patrimonios sobre el impacto práctico en sus estructuras legales en Panamá.'
              : 'Our senior partners continuously review these regulatory reports to advise corporate investors and estates on practical impacts.'}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: news.title[lang.toLowerCase() as 'es' | 'en'],
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert(lang === 'ES' ? 'Enlace copiado al portapapeles' : 'Link copied to clipboard');
              }
            }}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#A1A1AA] hover:text-[#C6A45D] transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#C6A45D]" />
            <span>{lang === 'ES' ? 'Compartir Artículo' : 'Share Article'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1B1B1B] hover:bg-[#C6A45D] text-[#F4F4F4] hover:text-[#0D0D0D] border border-white/10 hover:border-[#C6A45D] font-medium text-xs tracking-wider uppercase rounded-sm transition-all cursor-pointer"
          >
            {lang === 'ES' ? 'Cerrar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
