"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { getAllArticlesFromSupabase, Article } from "@/lib/news";
import { FileText, Search, Clock, BookOpen, ArrowRight, Filter, RefreshCw } from "lucide-react";

function NewsListingContent() {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Cargar publicaciones desde Supabase al montar
  useEffect(() => {
    let isMounted = true;
    getAllArticlesFromSupabase().then((data) => {
      if (isMounted) {
        setAllArticles(data || []);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Categorías dinámicas derivadas de las noticias de Supabase
  const categories = useMemo(() => {
    const cats = allArticles.map((a) => a.category);
    return ["ALL", ...Array.from(new Set(cats))];
  }, [allArticles]);

  // Cargar estado guardado al montar
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("q");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      const savedCategory = sessionStorage.getItem("news_category");
      if (savedCategory) setSelectedCategory(savedCategory);
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      const savedSearch = sessionStorage.getItem("news_search");
      if (savedSearch) setSearchQuery(savedSearch);
    }

    // Restaurar posición del scroll si se guardó
    const savedScrollY = sessionStorage.getItem("news_scroll_position");
    if (savedScrollY) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedScrollY, 10), behavior: "smooth" });
      }, 150);
    }
  }, [searchParams]);

  // Guardar estado al cambiar
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    sessionStorage.setItem("news_category", cat);
    updateQueryParams(cat, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    sessionStorage.setItem("news_search", val);
    updateQueryParams(selectedCategory, val);
  };

  const updateQueryParams = (cat: string, q: string) => {
    const params = new URLSearchParams();
    if (cat && cat !== "ALL") params.set("category", cat);
    if (q) params.set("q", q);
    const queryString = params.toString();
    router.replace(queryString ? `/news?${queryString}` : "/news", { scroll: false });
  };

  const clearFilters = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    sessionStorage.removeItem("news_category");
    sessionStorage.removeItem("news_search");
    router.replace("/news", { scroll: false });
  };

  // Guardar posición de scroll antes de navegar a un artículo
  const handleCardClick = () => {
    sessionStorage.setItem("news_scroll_position", window.scrollY.toString());
  };

  // Filtrar artículos dinámicamente
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === "ALL" || article.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] relative flex flex-col justify-between">
      <Navbar />

      <section className="pt-32 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* ENCABEZADO DE SECCIÓN NOTICIAS */}
        <div className="max-w-3xl mb-12 animate-fade-up">
          <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-normal text-[#F5F5F5] leading-tight mb-4">
            {language === "ES" ? "Publicaciones & Actualizaciones" : "Insights & Publications"}
          </h1>

          <p className="font-sans-body text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
            {language === "ES"
              ? "Información legal estratégica, análisis de decretos e inteligencia migratoria para inversionistas internacionales y corporaciones en Panamá."
              : "Strategic legal updates, executive decree analysis, and immigration intelligence for international investors and corporations in Panama."}
          </p>
        </div>

        {/* BARRA DE BÚSQUEDA Y FILTROS DE CATEGORÍA */}
        <div className="mb-12 space-y-6 animate-fade-up">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Buscador de Texto */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={
                  language === "ES"
                    ? "Buscar por título, categoría o palabra clave..."
                    : "Search by title, category, or keyword..."
                }
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-md pl-11 pr-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#C8A04A] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange({ target: { value: "" } } as any)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 px-1.5 py-0.5 rounded bg-white/5"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Limpiar Filtros */}
            {(selectedCategory !== "ALL" || searchQuery) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 text-xs text-[#C8A04A] hover:text-[#D8B86C] transition-colors px-3 py-2 rounded bg-white/5 border border-[#C8A04A]/30 self-start sm:self-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{language === "ES" ? "Restablecer Filtros" : "Reset Filters"}</span>
              </button>
            )}
          </div>

          {/* Chips de Categorías */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-zinc-500 shrink-0 mr-1" />
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const label =
                cat === "ALL"
                  ? language === "ES"
                    ? "Todas las Categorías"
                    : "All Categories"
                  : cat;

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 shrink-0 ${
                    isActive
                      ? "bg-[#C8A04A] text-[#0D0D0D] font-semibold shadow-lg shadow-[#C8A04A]/20"
                      : "bg-[#1A1A1A] text-zinc-400 hover:text-zinc-200 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* GRID DE NOTICIAS PREMIUM */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="luxury-card h-96 animate-pulse bg-white/5 rounded-lg" />
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                onClick={handleCardClick}
                className="luxury-card overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Imagen Destacada */}
                  <div className="relative h-60 w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />

                    {/* Categoría */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider font-semibold text-[#C8A04A]">
                      {article.category}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    {/* Fecha y Tiempo de Lectura */}
                    <div className="flex items-center gap-3 text-xs text-zinc-400 mb-3 font-light">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-600" />
                      <span className="flex items-center gap-1 text-zinc-400">
                        <Clock className="w-3.5 h-3.5 text-[#C8A04A]" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Título */}
                    <h2 className="font-serif-title text-xl sm:text-2xl font-medium text-[#F5F5F5] group-hover:text-[#C8A04A] transition-colors duration-300 leading-snug mb-3 line-clamp-2">
                      {article.title}
                    </h2>

                    {/* Resumen Brief / Excerpt */}
                    <p className="font-sans-body text-zinc-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-4">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Botón Read Article */}
                <div className="px-6 pb-6 pt-2">
                  <div className="btn-glass w-full py-2.5 text-xs justify-between group-hover:border-[#C8A04A]">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#C8A04A]" />
                      {language === "ES" ? "Leer Artículo" : "Read Article"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C8A04A] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Estado Vacío cuando no hay resultados */
          <div className="text-center py-20 bg-[#1A1A1A]/40 rounded-xl border border-white/5 max-w-lg mx-auto">
            <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="font-serif-title text-2xl text-zinc-300 mb-2">
              {language === "ES" ? "No se encontraron publicaciones" : "No articles found"}
            </h3>
            <p className="text-sm text-zinc-400 max-w-xs mx-auto mb-6">
              {language === "ES"
                ? "Intenta modificar el término de búsqueda o selecciona otra categoría."
                : "Try adjusting your search query or choosing another category."}
            </p>
            <button onClick={clearFilters} className="btn-gold text-xs px-6 py-2.5">
              {language === "ES" ? "Ver todas las publicaciones" : "View all articles"}
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default function NewsPage() {
  return (
    <LanguageProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#0D0D0D]" />}>
        <NewsListingContent />
      </Suspense>
    </LanguageProvider>
  );
}
