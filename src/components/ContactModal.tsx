'use client';

import React, { useState } from 'react';
import { Language } from '../types';
import { X, Send, Lock, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: 'Corporate & M&A',
  message: '',
};

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result?.ok) {
        setError(
          result?.error ??
            (lang === 'EN'
              ? 'We could not send your request. Please try again or email us directly.'
              : 'No pudimos enviar su solicitud. Intente de nuevo o escríbanos directamente.'),
        );
        return;
      }

      // Éxito confirmado por el servidor: recién ahora mostramos el acuse.
      setFormData(EMPTY_FORM);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 4000);
    } catch {
      setError(
        lang === 'EN'
          ? 'Connection error. Please check your internet connection and try again.'
          : 'Error de conexión. Verifique su conexión a internet e intente de nuevo.',
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0D0D0D]/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#151515] border border-white/10 rounded-xl p-6 sm:p-10 shadow-2xl overflow-hidden glass-reflection max-h-[90vh] my-auto overflow-y-auto">
        {/* Top Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A45D] to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#A1A1AA] hover:text-[#C6A45D] p-2 transition-colors focus:outline-none cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 sm:py-16 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#C6A45D]/10 border border-[#C6A45D] flex items-center justify-center mx-auto text-[#C6A45D]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-normal text-[#F4F4F4]">
              {lang === 'EN' ? 'Consultation Request Received' : 'Solicitud Recibida'}
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md mx-auto font-light leading-relaxed">
              {lang === 'EN'
                ? 'We have sent a confirmation to your email. A senior managing partner at EIP & ASSOCIATES will reach out confidentially shortly.'
                : 'Le hemos enviado una confirmación a su correo electrónico. Un socio director de EIP & ASSOCIATES se pondrá en contacto confidencial con usted a la brevedad.'}
            </p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6 sm:mb-8 pr-8">
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C6A45D] mb-2 font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>{lang === 'EN' ? 'Encrypted Confidential Channel' : 'Canal Confidencial Encriptado'}</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-light text-[#F4F4F4]">
                {lang === 'EN' ? 'Executive Legal Consultation' : 'Consulta Legal Ejecutiva'}
              </h3>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A1A1AA] mb-1.5 font-medium uppercase tracking-wider text-[10px]">
                    {lang === 'EN' ? 'Full Name *' : 'Nombre Completo *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded px-3.5 py-2.5 text-[#F4F4F4] focus:outline-none focus:border-[#C6A45D] transition-colors"
                    placeholder="Lord Arthur Sterling"
                  />
                </div>

                <div>
                  <label className="block text-[#A1A1AA] mb-1.5 font-medium uppercase tracking-wider text-[10px]">
                    {lang === 'EN' ? 'Email Address *' : 'Correo Electrónico *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded px-3.5 py-2.5 text-[#F4F4F4] focus:outline-none focus:border-[#C6A45D] transition-colors"
                    placeholder="asterling@holding.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A1A1AA] mb-1.5 font-medium uppercase tracking-wider text-[10px]">
                    {lang === 'EN' ? 'Phone / WhatsApp' : 'Teléfono / WhatsApp'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded px-3.5 py-2.5 text-[#F4F4F4] focus:outline-none focus:border-[#C6A45D] transition-colors"
                    placeholder="+507 6000-0000"
                  />
                </div>

                <div>
                  <label className="block text-[#A1A1AA] mb-1.5 font-medium uppercase tracking-wider text-[10px]">
                    {lang === 'EN' ? 'Company / Entity' : 'Empresa / Entidad'}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded px-3.5 py-2.5 text-[#F4F4F4] focus:outline-none focus:border-[#C6A45D] transition-colors"
                    placeholder="Sterling & Co. Group"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A1A1AA] mb-1.5 font-medium uppercase tracking-wider text-[10px]">
                  {lang === 'EN' ? 'Practice Area' : 'Área de Interés'}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded px-3.5 py-2.5 text-[#F4F4F4] focus:outline-none focus:border-[#C6A45D] transition-colors"
                >
                  <option value="Corporate & M&A">Corporate & M&A</option>
                  <option value="Banking & Finance">Banking & Finance</option>
                  <option value="Litigation & Arbitration">Litigation & Arbitration</option>
                  <option value="Intellectual Property">Intellectual Property</option>
                  <option value="Maritime Law">Maritime & Logistics Law</option>
                  <option value="Estate Planning">Estate Planning & Tax</option>
                </select>
              </div>

              <div>
                <label className="block text-[#A1A1AA] mb-1.5 font-medium uppercase tracking-wider text-[10px]">
                  {lang === 'EN' ? 'Brief Inquiry Summary' : 'Descripción Breve del Caso'}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded px-3.5 py-2.5 text-[#F4F4F4] focus:outline-none focus:border-[#C6A45D] transition-colors resize-none"
                  placeholder={
                    lang === 'EN'
                      ? 'Please share general details regarding your legal inquiry...'
                      : 'Por favor comparta detalles generales sobre su requerimiento legal...'
                  }
                ></textarea>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded border border-red-500/30 bg-red-500/10 px-3.5 py-3 text-[11px] leading-relaxed text-red-300"
                >
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-px" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-3 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-gold text-xs uppercase tracking-[0.15em] font-semibold px-8 py-3.5 w-full sm:w-auto cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                      {lang === 'EN' ? 'Sending…' : 'Enviando…'}
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 mr-2" />
                      {lang === 'EN' ? 'Send Confidential Request' : 'Enviar Solicitud Privada'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
