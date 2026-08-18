"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { Article } from "@/lib/news";
import {
  ArrowLeft,
  Clock,
  User,
  Share2,
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  BookOpen,
  MessageSquare,
  PhoneCall,
  Linkedin,
  Twitter,
  Copy,
  List,
} from "lucide-react";

interface ArticleViewProps {
  article: Article;
  relatedArticles: Article[];
  prevArticle: Article | null;
  nextArticle: Article | null;
}

function ArticleViewContent({
  article,
  relatedArticles,
  prevArticle,
  nextArticle,
}: ArticleViewProps) {
  const { language } = useLanguage();
  const [feedbackGiven, setFeedbackGiven] = useState<"yes" | "no" | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const siteUrl = "https://eippanamalawyers.net";
  const shareUrl = typeof window !== "undefined" ? window.location.href : `${siteUrl}/news/${article.slug}`;

  // Manejo de compartir
  const handleCopyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} - ${shareUrl}`)}`,
      "_blank"
    );
  };

  // JSON-LD para Google Structured Data (Article & BreadcrumbList)
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    image: [article.imageUrl],
    datePublished: article.isoDate,
    author: {
      "@type": "Organization",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "EIP & Associates",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo/eip-white.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/news/${article.slug}`,
    },
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: language === "ES" ? "Inicio" : "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: language === "ES" ? "Noticias" : "News",
        item: `${siteUrl}/news`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${siteUrl}/news/${article.slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] relative flex flex-col justify-between">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Navbar />

      {/* CONTENIDO PRINCIPAL DE LA NOTICIA */}
      <article className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* BREADCRUMBS */}
        <nav aria-label="Breadcrumb" className="mb-6 animate-fade-up">
          <ol className="flex items-center flex-wrap gap-2 text-xs text-zinc-400 font-light">
            <li>
              <Link href="/" className="hover:text-[#C8A04A] transition-colors">
                {language === "ES" ? "Inicio" : "Home"}
              </Link>
            </li>
            <li>
              <span className="text-zinc-600">/</span>
            </li>
            <li>
              <Link href="/news" className="hover:text-[#C8A04A] transition-colors">
                {language === "ES" ? "Noticias" : "News"}
              </Link>
            </li>
            <li>
              <span className="text-zinc-600">/</span>
            </li>
            <li className="text-[#C8A04A] font-medium truncate max-w-xs sm:max-w-md">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* BOTÓN VOLVER ← Back to News */}
        <div className="mb-10 animate-fade-up">
          <Link
            href="/news"
            aria-label={language === "ES" ? "Regresar al listado de noticias" : "Back to news list"}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-md bg-transparent border border-[#C8A04A]/30 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-[#C8A04A] hover:bg-[#C8A04A]/10 transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 text-[#C8A04A] transition-transform duration-300 group-hover:-translate-x-1" />
            <span>{language === "ES" ? "Volver a Noticias" : "Back to News"}</span>
          </Link>
        </div>

        {/* METADATOS Y ENCABEZADO DEL ARTÍCULO */}
        <header className="mb-10 animate-fade-up">
          {/* Categoría */}
          <div className="inline-block px-3 py-1 rounded bg-[#C8A04A]/10 border border-[#C8A04A]/20 text-xs uppercase tracking-widest font-semibold text-[#C8A04A] mb-4">
            {article.category}
          </div>

          {/* Título Principal */}
          <h1 className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-normal text-[#F5F5F5] leading-tight mb-6">
            {article.title}
          </h1>

          {/* Subtítulo / Excerpt */}
          <p className="font-sans-body text-zinc-300 text-base sm:text-lg font-light leading-relaxed mb-6">
            {article.subtitle}
          </p>

          {/* Fila de Autor, Fecha y Tiempo de Lectura */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 border-y border-white/10 py-4 font-light">
            <div className="flex items-center gap-2 text-zinc-200 font-medium">
              <div className="w-7 h-7 rounded-full bg-[#C8A04A]/20 border border-[#C8A04A]/40 flex items-center justify-center text-[#C8A04A]">
                <User className="w-3.5 h-3.5" />
              </div>
              <span>{article.author.name}</span>
            </div>

            <span className="text-zinc-600">•</span>
            <span>{article.date}</span>

            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-[#C8A04A]" />
              {article.readTime}
            </span>
          </div>
        </header>

        {/* IMAGEN PRINCIPAL */}
        <div className="relative h-72 sm:h-96 md:h-[420px] w-full rounded-xl overflow-hidden mb-12 border border-white/10 shadow-2xl animate-fade-up">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60" />
        </div>

        {/* TABLA DE CONTENIDOS (ÍNDICE AUTOMÁTICO) */}
        {article.toc && article.toc.length > 0 && (
          <div className="mb-12 p-6 rounded-lg bg-[#1A1A1A] border border-white/10 animate-fade-up">
            <div className="flex items-center gap-2 text-[#C8A04A] font-serif-title text-xl font-medium mb-4 pb-2 border-b border-white/5">
              <List className="w-5 h-5" />
              <span>{language === "ES" ? "Índice del Artículo" : "Table of Contents"}</span>
            </div>
            <ul className="space-y-2.5 text-sm font-light text-zinc-300">
              {article.toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="hover:text-[#C8A04A] transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#C8A04A] shrink-0" />
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CUERPO DEL ARTÍCULO */}
        <div className="space-y-8 font-sans-body text-zinc-300 text-base sm:text-lg font-light leading-relaxed mb-16 animate-fade-up">
          {article.content.map((block, idx) => {
            if (block.type === "paragraph") {
              return <p key={idx}>{block.content}</p>;
            }

            if (block.type === "heading2") {
              // Generar ID para navegación de índice
              const sectionId = article.toc?.find((item) =>
                block.content?.includes(item.title.split(".")[0])
              )?.id || `section-${idx}`;

              return (
                <h2
                  key={idx}
                  id={sectionId}
                  className="font-serif-title text-2xl sm:text-4xl font-normal text-[#F5F5F5] pt-4 border-t border-white/5 text-balance"
                >
                  {block.content}
                </h2>
              );
            }

            if (block.type === "callout") {
              return (
                <div
                  key={idx}
                  className="p-6 rounded-r-lg bg-[#1A1A1A] border-l-4 border-[#C8A04A] text-sm sm:text-base text-zinc-200 my-6 shadow-md"
                >
                  <p className="font-medium text-[#C8A04A] mb-1">
                    {language === "ES" ? "Información Clave" : "Key Insight"}
                  </p>
                  <p>{block.content}</p>
                </div>
              );
            }

            if (block.type === "quote") {
              return (
                <blockquote
                  key={idx}
                  className="font-serif-title text-xl sm:text-2xl italic text-[#C8A04A] border-l-2 border-[#C8A04A] pl-6 my-8 leading-snug"
                >
                  {block.content}
                </blockquote>
              );
            }

            if (block.type === "list" && block.items) {
              return (
                <ul key={idx} className="space-y-3 my-4 pl-2">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A04A] shrink-0 mt-2.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            return null;
          })}
        </div>

        {/* BARRAS DE COMPARTIR EN REDES SOCIALES */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-[#1A1A1A] border border-white/10 mb-16 animate-fade-up">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">
            <Share2 className="w-4 h-4 text-[#C8A04A]" />
            <span>{language === "ES" ? "Compartir este artículo" : "Share this article"}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={shareLinkedIn}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C8A04A] hover:text-[#C8A04A] transition-all"
              title="LinkedIn"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </button>
            <button
              onClick={shareTwitter}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C8A04A] hover:text-[#C8A04A] transition-all"
              title="Twitter / X"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={shareWhatsApp}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C8A04A] hover:text-[#C8A04A] transition-all"
              title="WhatsApp"
              aria-label="Share on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#C8A04A] text-xs font-medium text-zinc-300 transition-all"
              title="Copy Link"
            >
              {copiedLink ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">
                    {language === "ES" ? "¡Copiado!" : "Copied!"}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#C8A04A]" />
                  <span>{language === "ES" ? "Copiar Enlace" : "Copy Link"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* NAVEGACIÓN ANTERIOR Y SIGUIENTE ARTÍCULO */}
        {(prevArticle || nextArticle) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16 pt-8 border-t border-white/10">
            {prevArticle ? (
              <Link
                href={`/news/${prevArticle.slug}`}
                className="p-5 rounded-lg bg-[#1A1A1A] border border-white/10 hover:border-[#C8A04A]/50 transition-all group flex flex-col justify-between"
              >
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2 flex items-center gap-1">
                  ← {language === "ES" ? "Artículo Anterior" : "Previous Article"}
                </span>
                <span className="font-serif-title text-lg text-zinc-200 group-hover:text-[#C8A04A] transition-colors line-clamp-2">
                  {prevArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link
                href={`/news/${nextArticle.slug}`}
                className="p-5 rounded-lg bg-[#1A1A1A] border border-white/10 hover:border-[#C8A04A]/50 transition-all group flex flex-col justify-between text-right"
              >
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2 flex items-center gap-1 justify-end">
                  {language === "ES" ? "Siguiente Artículo" : "Next Article"} →
                </span>
                <span className="font-serif-title text-lg text-zinc-200 group-hover:text-[#C8A04A] transition-colors line-clamp-2">
                  {nextArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        )}

        {/* SECCIÓN DE ENGAGEMENT & FEEDBACK (ANTES DEL FOOTER) */}
        <section className="mb-20 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#1A1A1A] via-[#151515] to-[#0D0D0D] border border-white/10 shadow-2xl text-center">
          <h3 className="font-serif-title text-2xl sm:text-3xl font-medium text-[#F5F5F5] mb-3">
            {language === "ES" ? "¿Te resultó útil este artículo?" : "Was this article helpful?"}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6">
            {language === "ES"
              ? "Tu opinión ayuda a nuestro equipo de análisis legal a brindar publicaciones más valiosas."
              : "Your feedback helps our legal research team create more valuable insights."}
          </p>

          {/* Botones de Feedback Yes / No */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setFeedbackGiven("yes")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                feedbackGiven === "yes"
                  ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400"
                  : "bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:text-emerald-400 text-zinc-300"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{language === "ES" ? "Sí, útil" : "Yes, helpful"}</span>
            </button>

            <button
              onClick={() => setFeedbackGiven("no")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                feedbackGiven === "no"
                  ? "bg-rose-500/20 border border-rose-500 text-rose-400"
                  : "bg-white/5 border border-white/10 hover:border-rose-500/50 hover:text-rose-400 text-zinc-300"
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{language === "ES" ? "No del todo" : "Not quite"}</span>
            </button>
          </div>

          {feedbackGiven && (
            <p className="text-xs text-[#C8A04A] font-medium mb-8 animate-fade-in">
              {language === "ES"
                ? "¡Muchas gracias por tus comentarios!"
                : "Thank you very much for your feedback!"}
            </p>
          )}

          {/* Botones de Acción / Contacto con la Firma */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/10">
            <button
              onClick={handleCopyLink}
              className="btn-glass text-xs py-2.5 px-5"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C8A04A]" />
              <span>{language === "ES" ? "Compartir Artículo" : "Share this Article"}</span>
            </button>

            <Link href="/#cta" className="btn-gold text-xs py-2.5 px-5">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{language === "ES" ? "Contactar a un Abogado" : "Contact an Attorney"}</span>
            </Link>

            <Link href="/#cta" className="btn-glass text-xs py-2.5 px-5">
              <BookOpen className="w-3.5 h-3.5 text-[#C8A04A]" />
              <span>{language === "ES" ? "Agendar Consulta Privada" : "Schedule a Consultation"}</span>
            </Link>
          </div>
        </section>

        {/* SECCIÓN CONTINUE READING (3 ARTÍCULOS RELACIONADOS) */}
        {relatedArticles.length > 0 && (
          <section className="pt-12 border-t border-white/10">
            <div className="mb-10 text-center sm:text-left">
              <h3 className="font-serif-title text-3xl sm:text-4xl font-normal text-[#F5F5F5] mb-2">
                {language === "ES" ? "Continuar Leyendo" : "Continue Reading"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light">
                {language === "ES"
                  ? "Otras publicaciones legales relevantes seleccionadas para usted."
                  : "Other relevant legal publications handpicked for you."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.slug}`}
                  className="luxury-card overflow-hidden flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Imagen */}
                    <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={rel.imageUrl}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />

                      <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded bg-black/80 text-[9px] uppercase tracking-wider font-semibold text-[#C8A04A]">
                        {rel.category}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-2 font-light">
                        <span>{rel.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#C8A04A]" />
                          {rel.readTime}
                        </span>
                      </div>

                      <h4 className="font-serif-title text-lg font-medium text-[#F5F5F5] group-hover:text-[#C8A04A] transition-colors line-clamp-2 mb-2">
                        {rel.title}
                      </h4>

                      <p className="text-xs text-zinc-400 font-light line-clamp-2 mb-4">
                        {rel.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <div className="btn-glass w-full py-2 text-[11px] justify-between group-hover:border-[#C8A04A]">
                      <span>{language === "ES" ? "Leer Artículo" : "Read Article"}</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  );
}

export function ArticleView(props: ArticleViewProps) {
  return (
    <LanguageProvider>
      <ArticleViewContent {...props} />
    </LanguageProvider>
  );
}
