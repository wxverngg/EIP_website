"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { useLanguage } from "@/lib/i18n";
import { EipIsotype } from "@/components/EipIsotype";
import { FIRM_INFO } from "@/lib/constants";
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  HelpCircle,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const data = (t as any).contactPage || {};

  // ─── Estado del Formulario ───────────────────────────────────────
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    subject: "",
    customSubject: "",
    message: "",
    privacyPolicy: false,
    website: "", // Honeypot (debe permanecer vacío)
  });

  const [turnstileToken, setTurnstileToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // ─── Carga Dinámica de Cloudflare Turnstile ─────────────────────
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
    
    // Función callback global declarada en window
    (window as any).onloadTurnstileCallback = () => {
      if ((window as any).turnstile) {
        try {
          (window as any).turnstile.render("#turnstile-container", {
            sitekey: siteKey,
            theme: "dark",
            callback: (token: string) => {
              setTurnstileToken(token);
            },
            "expired-callback": () => {
              setTurnstileToken("");
            },
          });
        } catch (e) {
          // El contenedor podría no estar listo aún
        }
      }
    };

    // Cargar script de Turnstile si no existe
    if (!document.getElementById("cloudflare-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cloudflare-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if ((window as any).turnstile) {
      (window as any).onloadTurnstileCallback();
    }
  }, []);

  // ─── Manejo de Cambios en Formulario ─────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errorMessage) setErrorMessage("");
  };

  // ─── Envió del Formulario ────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validaciones Client-side
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.country.trim() || !formData.subject || !formData.message.trim()) {
      setErrorMessage(language === "ES" ? "Por favor complete todos los campos obligatorios (*)." : "Please fill in all required fields (*).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage(language === "ES" ? "Por favor ingrese un correo electrónico válido." : "Please enter a valid email address.");
      return;
    }

    const msgLength = formData.message.trim().length;
    if (msgLength < 20) {
      setErrorMessage(language === "ES" ? "El mensaje debe tener al menos 20 caracteres." : "The message must be at least 20 characters.");
      return;
    }

    if (msgLength > 3000) {
      setErrorMessage(language === "ES" ? "El mensaje no debe exceder los 3000 caracteres." : "The message must not exceed 3000 characters.");
      return;
    }

    const isOtherSubject =
      formData.subject === "Otro Asunto" ||
      formData.subject === "Other Subject" ||
      formData.subject === subjectOptions[subjectOptions.length - 1];

    if (isOtherSubject && !formData.customSubject.trim()) {
      setErrorMessage(
        language === "ES"
          ? "Por favor especifique el asunto de su consulta."
          : "Please specify the subject of your inquiry."
      );
      return;
    }

    if (!formData.privacyPolicy) {
      setErrorMessage(language === "ES" ? "Debe aceptar la Política de Privacidad para continuar." : "You must agree to the Privacy Policy to continue.");
      return;
    }

    setIsSubmitting(true);

    const finalSubject = isOtherSubject
      ? `Otro Asunto: ${formData.customSubject.trim()}`
      : formData.subject;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: finalSubject,
          turnstileToken,
        }),
      });

      let result: any = {};
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        result = await res.json();
      } else {
        const rawText = await res.text();
        console.error("[API Contact Response Error]", res.status, rawText);
        throw new Error(
          language === "ES"
            ? "El servidor está reiniciándose o actualizándose. Por favor vuelva a enviar su mensaje en unos momentos o contáctenos por WhatsApp."
            : "The server is updating. Please resubmit your message in a few moments or contact us via WhatsApp."
        );
      }

      if (!res.ok || !result.success) {
        throw new Error(result.error || (language === "ES" ? "No se pudo procesar la solicitud." : "Could not process request."));
      }

      // Éxito: Limpiar formulario y abrir Modal
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        subject: "",
        customSubject: "",
        message: "",
        privacyPolicy: false,
        website: "",
      });

      // Resetear Turnstile si existe
      if ((window as any).turnstile) {
        try {
          (window as any).turnstile.reset("#turnstile-container");
        } catch (e) {}
      }

      setShowSuccessModal(true);
    } catch (err: any) {
      setErrorMessage(err.message || (language === "ES" ? "Ocurrió un error inesperado. Por favor intente más tarde." : "An unexpected error occurred. Please try again later."));
    } finally {
      setIsSubmitting(false);
    }
  };

  // JSON-LD Esquema de ContactPage para SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://eippanamalawyers.net/contact/#webpage",
        url: "https://eippanamalawyers.net/contact",
        name: data?.hero?.title || "Contacto | EIP & Associates",
        description: data?.hero?.subtitle || "Contacte a EIP & Associates para asesoría legal en Panamá.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://eippanamalawyers.net/#website",
          name: "EIP & Associates",
          url: "https://eippanamalawyers.net",
        },
      },
      {
        "@type": "LegalService",
        name: "EIP & Associates",
        image: "https://eippanamalawyers.net/images/logo/eip-white.png",
        telephone: "+507 6725-6030",
        email: "info@eippanamalawyers.net",
        address: {
          "@type": "PostalAddress",
          streetAddress: FIRM_INFO.address,
          addressLocality: "Ciudad de Panamá",
          addressRegion: "Panamá",
          addressCountry: "PA",
        },
      },
    ],
  };

  const subjectOptions = data?.form?.subjectOptions || [
    "Seleccione un Asunto",
    "Residencia e Inmigración",
    "Permiso de Trabajo",
    "Corporativo",
    "Compra Venta de Propiedades",
    "Servicios de Cédula",
    "Notariales y Apostilla",
    "Fingerprints & FBI Request",
    "Otro Asunto",
  ];

  const isOtherSubject =
    formData.subject === "Otro Asunto" ||
    formData.subject === "Other Subject" ||
    formData.subject === subjectOptions[subjectOptions.length - 1];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] pt-28 pb-20">
        
        {/* =========================================================
            SECCIÓN 1: HERO (Minimalista, Tipográfico con Isotipo Marca de Agua)
            ========================================================= */}
        <section className="relative py-16 sm:py-24 border-b border-white/5 overflow-hidden">
          {/* Isotipo EIP como marca de agua sutil a la derecha */}
          <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] md:w-[650px] opacity-[0.035] pointer-events-none select-none">
            <EipIsotype strokeColor="#C8A04A" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8A04A]/10 border border-[#C8A04A]/30 text-xs font-semibold uppercase tracking-[0.18em] text-[#C8A04A] mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{data?.hero?.badge || "Contact Our Legal Team"}</span>
              </div>

              {/* Título Principal */}
              <h1 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-normal text-[#F5F5F5] leading-[1.15] mb-6">
                {data?.hero?.title || "Let's Discuss Your Legal Needs"}
              </h1>

              {/* Subtítulo */}
              <p className="font-sans-body text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                {data?.hero?.subtitle || "Whether you need immigration assistance, corporate legal services or strategic legal guidance in Panama, our experienced team is ready to help."}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 2: CONTACT INFORMATION CARDS
            ========================================================= */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Card 1: Dirección */}
            <div className="luxury-card p-6 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#C8A04A]/10 border border-[#C8A04A]/20 flex items-center justify-center text-[#C8A04A] mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-serif-title text-lg font-medium text-[#F5F5F5] mb-2">
                  {data?.cards?.addressTitle || "Office Address"}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {FIRM_INFO.address}
                </p>
              </div>
              <a
                href={FIRM_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#C8A04A] hover:text-[#D8B86C] mt-6 transition-colors"
              >
                <span>{data?.cards?.openMaps || "Open Maps"}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Card 2: Horario */}
            <div className="luxury-card p-6 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#C8A04A]/10 border border-[#C8A04A]/20 flex items-center justify-center text-[#C8A04A] mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif-title text-lg font-medium text-[#F5F5F5] mb-2">
                  {data?.cards?.hoursTitle || "Business Hours"}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {FIRM_INFO.businessHours}
                </p>
              </div>
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mt-6">
                {data?.cards?.panamaTime || "EST / Panama Time"}
              </span>
            </div>

            {/* Card 3: Email Corporativo */}
            <div className="luxury-card p-6 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#C8A04A]/10 border border-[#C8A04A]/20 flex items-center justify-center text-[#C8A04A] mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-serif-title text-lg font-medium text-[#F5F5F5] mb-2">
                  {data?.cards?.emailTitle || "Corporate Email"}
                </h3>
                <a
                  href={`mailto:${FIRM_INFO.email}`}
                  className="text-xs text-zinc-300 hover:text-[#C8A04A] font-light transition-colors break-all"
                >
                  {FIRM_INFO.email}
                </a>
              </div>
              <a
                href={`mailto:${FIRM_INFO.email}`}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#C8A04A] hover:text-[#D8B86C] mt-6 transition-colors"
              >
                <span>{data?.cards?.sendEmail || "Send Email"}</span>
                <Send className="w-3 h-3" />
              </a>
            </div>

            {/* Card 4: Teléfono Corporativo */}
            <div className="luxury-card p-6 flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#C8A04A]/10 border border-[#C8A04A]/20 flex items-center justify-center text-[#C8A04A] mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-serif-title text-lg font-medium text-[#F5F5F5] mb-2">
                  {data?.cards?.phoneTitle || "Corporate Phone"}
                </h3>
                <a
                  href={`tel:${FIRM_INFO.phone}`}
                  className="text-xs text-zinc-300 hover:text-[#C8A04A] font-light transition-colors"
                >
                  {FIRM_INFO.phone}
                </a>
              </div>
              <a
                href={`tel:${FIRM_INFO.phone}`}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#C8A04A] hover:text-[#D8B86C] mt-6 transition-colors"
              >
                <span>{data?.cards?.callUs || "Call Us"}</span>
                <Phone className="w-3 h-3" />
              </a>
            </div>

            {/* Card 5: WhatsApp Business */}
            <div className="luxury-card p-6 flex flex-col justify-between group border-[#C8A04A]/30">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#C8A04A]/20 border border-[#C8A04A]/40 flex items-center justify-center text-[#C8A04A] mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-serif-title text-lg font-medium text-[#F5F5F5] mb-2">
                  {data?.cards?.whatsappTitle || "WhatsApp Business"}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {FIRM_INFO.whatsapp}
                </p>
              </div>
              <a
                href={`https://wa.me/${FIRM_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#C8A04A] hover:text-[#D8B86C] mt-6 transition-colors"
              >
                <span>{data?.cards?.openChat || "Open Chat"}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </section>

        {/* =========================================================
            SECCIÓN 3: FORMULARIO DE CONTACTO & TARJETA TIEMPO RESPUESTA
            ========================================================= */}
        <section id="contact-form" className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#151515] border border-white/10 rounded-xl p-6 sm:p-10 shadow-2xl relative">
            
            {/* Encabezado Formulario */}
            <div className="mb-8 border-b border-white/5 pb-6 text-center sm:text-left">
              <h2 className="font-serif-title text-2xl sm:text-3xl font-medium text-[#F5F5F5] mb-2">
                {language === "ES" ? "Envíenos su Consulta Legal" : "Send Us Your Legal Inquiry"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light">
                {language === "ES"
                  ? "Complete el siguiente formulario y un abogado socio revisará su solicitud en estricta confidencialidad."
                  : "Fill out the form below and a partner attorney will review your request under strict confidentiality."}
              </p>
            </div>

            {/* Mensaje de Error Inline */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Campo Honeypot Oculto (Trampa para Bots) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  value={formData.website}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              {/* Fila 1: Nombre y Apellido */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs uppercase tracking-wider font-medium text-zinc-300 mb-2">
                    {data?.form?.firstName || "First Name"} <span className="text-[#C8A04A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xs uppercase tracking-wider font-medium text-zinc-300 mb-2">
                    {data?.form?.lastName || "Last Name"} <span className="text-[#C8A04A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
              </div>

              {/* Fila 2: Email y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider font-medium text-zinc-300 mb-2">
                    {data?.form?.email || "Email Address"} <span className="text-[#C8A04A]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-medium text-zinc-300 mb-2">
                    {data?.form?.phone || "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>
              </div>

              {/* Fila 3: País y Asunto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="country" className="block text-xs uppercase tracking-wider font-medium text-zinc-300 mb-2">
                    {data?.form?.country || "Country"} <span className="text-[#C8A04A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs uppercase tracking-wider font-medium text-zinc-300 mb-2">
                    {data?.form?.subject || "Subject"} <span className="text-[#C8A04A]">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="contact-select"
                  >
                    {subjectOptions.map((opt: string, i: number) => (
                      <option key={i} value={i === 0 ? "" : opt} disabled={i === 0}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Campo Dinámico para Asunto Personalizado ("Otro Asunto") */}
              {isOtherSubject && (
                <div className="animate-fade-in bg-[#1A1A1A] p-4 rounded-md border border-[#C8A04A]/30">
                  <label
                    htmlFor="customSubject"
                    className="block text-xs uppercase tracking-wider font-medium text-zinc-300 mb-2"
                  >
                    {data?.form?.customSubjectLabel || (language === "ES" ? "Escriba el Asunto Específico" : "Specify Custom Subject")} <span className="text-[#C8A04A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="customSubject"
                    name="customSubject"
                    required
                    value={formData.customSubject}
                    onChange={handleChange}
                    placeholder={data?.form?.customSubjectPlaceholder || (language === "ES" ? "Especifique el asunto de su consulta..." : "Specify the subject of your inquiry...")}
                    className="contact-input"
                  />
                </div>
              )}

              {/* Fila 4: Mensaje */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider font-medium text-zinc-300">
                    {data?.form?.message || "Message"} <span className="text-[#C8A04A]">*</span>
                  </label>
                  <span className="text-[11px] text-zinc-500">
                    {formData.message.length} / 3000
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-input resize-y min-h-[120px]"
                />
              </div>

              {/* Cloudflare Turnstile Container */}
              <div className="pt-2 flex justify-center sm:justify-start">
                <div id="turnstile-container"></div>
              </div>

              {/* Checkbox Privacidad */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  name="privacyPolicy"
                  required
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                  className="mt-1 accent-[#C8A04A] w-4 h-4 rounded cursor-pointer shrink-0"
                />
                <div className="text-xs text-zinc-400 font-light leading-relaxed">
                  <label htmlFor="privacyPolicy" className="cursor-pointer select-none">
                    {data?.form?.privacyCheck || "Acepto la Política de Privacidad."}{" "}
                  </label>
                  <Link
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8A04A] underline hover:text-[#D8B86C] font-normal cursor-pointer inline-block ml-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {language === "ES" ? "Ver Política de Privacidad" : "View Privacy Policy"}
                  </Link>
                </div>
              </div>

              {/* Botón de Enviar */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-4 text-xs tracking-widest justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin-custom" />
                      <span>{data?.form?.submittingBtn || "Sending..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      <span>{data?.form?.submitBtn || "Send Message"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* =========================================================
              SECCIÓN 3.5: TARJETA DE TIEMPO PROMEDIO DE RESPUESTA
              ========================================================= */}
          <div className="mt-8 luxury-card p-6 flex items-center justify-between gap-4 border-[#C8A04A]/30 bg-gradient-to-r from-[#1A1A1A] via-[#151515] to-[#1A1A1A]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#C8A04A]/10 border border-[#C8A04A]/30 flex items-center justify-center text-[#C8A04A] shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif-title text-lg font-medium text-[#F5F5F5]">
                  {data?.responseTime?.title || "Average Response Time"}
                </h4>
                <p className="text-xs text-zinc-400 font-light">
                  {language === "ES"
                    ? "Revisamos y contestamos todas las solicitudes corporativas con máxima prioridad."
                    : "We review and answer all corporate requests with top priority."}
                </p>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <span className="inline-block px-4 py-2 rounded-full bg-[#C8A04A]/15 border border-[#C8A04A]/40 text-xs font-semibold uppercase tracking-wider text-[#C8A04A]">
                {data?.responseTime?.content || "Less than 24 Business Hours"}
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 4: UBICACIÓN DE OFICINA (Tarjeta Estática de Lujo sin iframe)
            ========================================================= */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="luxury-card p-8 sm:p-12 relative overflow-hidden bg-[#151515] border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              
              <div>
                <h3 className="font-serif-title text-3xl sm:text-4xl font-medium text-[#F5F5F5] mb-4">
                  {data?.locationCard?.title || "Central Office in Panama"}
                </h3>

                <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
                  {data?.locationCard?.subtitle || "Century Tower, Panama City, Republic of Panama"}
                </p>

                <div className="space-y-3 text-xs text-zinc-400 font-light mb-8">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#C8A04A]" />
                    <span>{data?.locationCard?.hours || FIRM_INFO.businessHours}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#C8A04A]" />
                    <span>Ubicación estratégica en el distrito financiero de la Ciudad de Panamá.</span>
                  </div>
                </div>

                <a
                  href={FIRM_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-xs px-8 py-3.5 inline-flex items-center gap-2"
                >
                  <span>{data?.locationCard?.btnMaps || "Open in Google Maps"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Miniprevisualización de Ubicación en Google Maps con Filtro Oscuro de Lujo */}
              <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden border border-[#C8A04A]/30 group shadow-2xl">
                {/* Embed de Google Maps como miniatura limpia */}
                <iframe
                  title="Google Maps Location - Century Tower"
                  src="https://maps.google.com/maps?q=2F38%2B5XF%2C+C.+65+Oeste%2C+Panam%C3%A1+(Century+Tower)&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)",
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 5: FREQUENTLY ASKED QUESTIONS (Acordeón Animado)
            ========================================================= */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold uppercase tracking-widest text-[#C8A04A] mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{data?.faq?.badge || "FAQ"}</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-normal text-[#F5F5F5]">
              {data?.faq?.title || "Frequently Asked Questions About Legal Inquiries"}
            </h2>
          </div>

          <div className="space-y-4">
            {data?.faq?.items?.map((item: { q: string; a: string }, idx: number) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="luxury-card overflow-hidden transition-colors border border-white/10"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-[#C8A04A]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif-title text-lg font-medium text-[#F5F5F5]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C8A04A] transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed border-t border-white/5 pt-4 animate-fade-in">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 6: CALL TO ACTION
            ========================================================= */}
        <section className="py-20 bg-[#151515] border-t border-white/5 text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 relative z-10">
            <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-[#F5F5F5] mb-6">
              {t.cta.title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-light mb-8 max-w-xl mx-auto">
              {t.cta.subtitle}
            </p>
            <a
              href="#contact-form"
              className="btn-gold text-xs px-8 py-3.5 inline-flex items-center gap-2"
            >
              <span>{data?.form?.submitBtn || "Send Message"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

      </main>

      {/* =========================================================
          MODAL DE CONFIRMACIÓN DE ÉXITO (CSS-only Animation)
          ========================================================= */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#151515] border border-[#C8A04A]/40 rounded-xl p-8 sm:p-10 max-w-lg w-full text-center relative shadow-2xl animate-modal-in">
            
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-[#C8A04A] p-2 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#C8A04A]/20 border border-[#C8A04A] flex items-center justify-center text-[#C8A04A] mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif-title text-2xl sm:text-3xl font-medium text-[#F5F5F5] mb-4">
              {data?.modal?.title || "Thank You for Contacting Us"}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-8">
              {data?.modal?.message || "We have successfully received your inquiry. One of our legal advisors will review your message and contact you as soon as possible."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="btn-gold w-full sm:w-auto text-xs px-6 py-3"
              >
                {data?.modal?.btnHome || "Back to Home"}
              </Link>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="btn-glass w-full sm:w-auto text-xs px-6 py-3"
              >
                {data?.modal?.btnClose || "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
