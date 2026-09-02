'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Shield, Scale, Loader2, AlertTriangle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  service: 'Immigration & Visas',
  message: '',
};

export default function ConsultationModal({ isOpen, onClose }: ModalProps) {
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
        body: JSON.stringify({ ...formData, lang: 'EN' }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result?.ok) {
        setError(
          result?.error ?? 'We could not send your request. Please try again or email us directly.',
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
      setError('Connection error. Please check your internet connection and try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#141414] border border-white/15 rounded-2xl p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center text-black shadow-md">
            <Scale className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#C8A04A] uppercase tracking-widest">
              PRIVATE LEGAL CONSULTATION
            </span>
            <h3 className="font-serif text-2xl text-white font-light">EIP & Associates Panama</h3>
          </div>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-[#C8A04A] mx-auto animate-bounce" />
            <h4 className="font-serif text-2xl text-white">Consultation Request Received</h4>
            <p className="text-xs text-white/70 max-w-md mx-auto">
              Thank you. One of our senior legal partners will contact you within 24 hours to schedule your private briefing.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lord Alexander Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#C8A04A] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alexander@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#C8A04A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#C8A04A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                Practice Area
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C8A04A] transition-colors"
              >
                <option value="Immigration & Visas">Immigration & Residency Solutions</option>
                <option value="Corporations & Offshore">Company Formation & Corporate Law</option>
                <option value="Accounting & Tax">Accounting, Tax & Advisory</option>
                <option value="Maritime Law">Maritime Law & Vessel Registration</option>
                <option value="Naturalization">Panamanian Naturalization & Citizenship</option>
                <option value="Work Permits">Work Permits & Labor Legal Support</option>
                <option value="Real Estate">Real Estate Due Diligence & Transactions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                Case Details / Inquiry
              </label>
              <textarea
                rows={3}
                required
                placeholder="Briefly describe your legal requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#C8A04A] transition-colors"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[11px] leading-relaxed text-red-300"
              >
                <AlertTriangle className="w-4 h-4 shrink-0 mt-px" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-white/50">
                <Shield className="w-3.5 h-3.5 text-[#C8A04A]" />
                <span>100% Attorney-Client Privilege Protected</span>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="px-6 py-3 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-[#C8A04A]/20 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {sending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {sending ? 'Sending…' : 'Submit Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
