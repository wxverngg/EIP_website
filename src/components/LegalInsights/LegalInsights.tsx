"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { getHomeNewsFromSupabase, Article } from "@/lib/news";
import { FileText, Clock, BookOpen } from "lucide-react";

export function LegalInsights() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Cargar las 4 noticias más recientes desde Supabase (ORDER BY published_at DESC LIMIT 4)
    let isMounted = true;
    getHomeNewsFromSupabase().then((data) => {
      if (isMounted && data && data.length > 0) {
        setArticles(data.slice(0, 4));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="legal-insights"
      className="relative py-28 md:py-36 bg-[#0D0D0D] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ENCABEZADO DE SECCIÓN LEGAL INSIGHTS */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-normal text-[#F5F5F5] leading-tight mb-4">
            {t.legalInsights.title}
          </h2>

          <p className="font-sans-body text-zinc-400 text-base font-light">
            {t.legalInsights.subtitle}
          </p>
        </div>

        {/* GRID DE NOTICIAS (2 COLUMNAS 2x2 EN DESKTOP / TABLET, 1 COLUMNA EN MOBILE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="luxury-card overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Imagen del Artículo con Zoom Suave */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />

                  {/* Badge de Categoría */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider font-semibold text-[#C8A04A]">
                    {article.category}
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-8">
                  {/* Fecha y Tiempo de Lectura */}
                  <div className="flex items-center gap-4 text-xs text-zinc-400 mb-4 font-light">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-[#C8A04A]" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Título del Artículo */}
                  <h3 className="font-serif-title text-2xl sm:text-3xl font-medium text-[#F5F5F5] group-hover:text-[#C8A04A] transition-colors duration-300 leading-snug mb-4">
                    {article.title}
                  </h3>

                  {/* Resumen */}
                  <p className="font-sans-body text-zinc-400 text-sm font-light leading-relaxed mb-6">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Botón Read Article / Leer Artículo */}
              <div className="px-8 pb-8">
                <div className="btn-glass w-full py-3 text-xs justify-between group-hover:border-[#C8A04A]">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#C8A04A]" />
                    {t.legalInsights.readArticle}
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* BOTÓN VER TODAS LAS PUBLICACIONES */}
        <div className="mt-14 text-center">
          <Link
            href="/news"
            className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider"
          >
            <span>{t.legalInsights.title} — Ver Todas</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
