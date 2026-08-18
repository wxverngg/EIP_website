import { supabase } from "@/lib/supabase";
import { parseRssFeed } from "@/lib/rss/rss-parser";
import { mapRssItemToNewsRow } from "@/lib/rss/rss-mapper";

export interface ArticleContentBlock {
  type: "paragraph" | "heading2" | "heading3" | "quote" | "callout" | "list" | "image";
  content?: string;
  items?: string[];
  caption?: string;
  imageUrl?: string;
}

export interface TocItem {
  id: string;
  title: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: string;
  date: string;
  isoDate: string;
  readTime: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  featuredInHome: boolean;
  content: ArticleContentBlock[];
  toc: TocItem[];
}

let rssArticlesCache: { data: Article[]; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos en memoria

/**
 * Parsea el HTML raw del contenido y genera los bloques y tabla de contenidos (TOC).
 */
function parseHtmlContentToBlocks(rawContent: string): { contentBlocks: ArticleContentBlock[]; toc: TocItem[] } {
  const contentBlocks: ArticleContentBlock[] = [];
  const toc: TocItem[] = [];

  if (!rawContent) {
    return { contentBlocks, toc };
  }

  // Si contiene etiquetas HTML
  if (/<[a-z][\s\S]*>/i.test(rawContent)) {
    const elements = rawContent.match(/<(h[23]|p|ul|ol|blockquote)[^>]*>[\s\S]*?<\/\1>/gi) || [];

    elements.forEach((el) => {
      const h2Match = el.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
      const h3Match = el.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const pMatch = el.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      const ulMatch = el.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
      const bqMatch = el.match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i);

      if (h2Match || h3Match) {
        const rawTitle = h2Match ? h2Match[1] : h3Match![1];
        const titleText = rawTitle.replace(/<[^>]*>/g, "").trim();
        const sectionId = `sec-${toc.length + 1}`;
        toc.push({ id: sectionId, title: titleText });

        contentBlocks.push({
          type: "heading2",
          content: titleText,
        });
      } else if (ulMatch) {
        const liMatches = ulMatch[1].match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
        const items = liMatches.map((li) => li.replace(/<[^>]*>/g, "").trim()).filter(Boolean);
        if (items.length > 0) {
          contentBlocks.push({
            type: "list",
            items,
          });
        }
      } else if (bqMatch) {
        const text = bqMatch[1].replace(/<[^>]*>/g, "").trim();
        if (text) {
          contentBlocks.push({
            type: "quote",
            content: text,
          });
        }
      } else if (pMatch) {
        const text = pMatch[1].replace(/<[^>]*>/g, "").trim();
        if (text) {
          contentBlocks.push({
            type: "paragraph",
            content: text,
          });
        }
      }
    });

    if (contentBlocks.length === 0) {
      const cleanText = rawContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      if (cleanText) {
        contentBlocks.push({ type: "paragraph", content: cleanText });
      }
    }
  } else {
    const paragraphs = rawContent.split(/\n\n+/).filter(Boolean);
    paragraphs.forEach((p) => {
      if (p.startsWith("# ") || p.startsWith("## ")) {
        const titleText = p.replace(/^#+\s*/, "").trim();
        const sectionId = `sec-${toc.length + 1}`;
        toc.push({ id: sectionId, title: titleText });
        contentBlocks.push({ type: "heading2", content: titleText });
      } else {
        contentBlocks.push({ type: "paragraph", content: p.trim() });
      }
    });
  }

  return { contentBlocks, toc };
}

/**
 * Convierte una fila de la tabla 'news' de Supabase (o un objeto RSS mapeado) al tipo Article.
 */
function mapSupabaseRowToArticle(row: any): Article {
  const formattedDate = row.published_at
    ? new Date(row.published_at).toLocaleDateString("es-PA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Reciente";

  const rawContent = row.content || row.excerpt || "";
  const { contentBlocks, toc } = parseHtmlContentToBlocks(rawContent);

  if (contentBlocks.length === 0) {
    contentBlocks.push({
      type: "paragraph",
      content: rawContent || row.excerpt || row.title,
    });
  }

  return {
    id: row.id || row.slug,
    slug: row.slug,
    title: row.title,
    subtitle: row.excerpt || row.title,
    summary: row.excerpt || row.title,
    category: row.category || "Noticias Legales",
    date: formattedDate,
    isoDate: row.published_at || new Date().toISOString(),
    readTime: row.reading_time || "4 min read",
    imageUrl:
      row.featured_image ||
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: row.author || "Soro AI / EIP & Associates",
      role: "Inteligencia Legal & Análisis Corporativo",
    },
    featuredInHome: true,
    content: contentBlocks,
    toc,
  };
}

/**
 * Obtiene las publicaciones en vivo directamente del feed RSS de Soro AI.
 */
export async function getLiveRssArticles(): Promise<Article[]> {
  const now = Date.now();
  if (rssArticlesCache && now - rssArticlesCache.timestamp < CACHE_TTL) {
    return rssArticlesCache.data;
  }

  try {
    const rssUrl =
      process.env.RSS_FEED_URL ||
      "https://app.trysoro.com/api/rss/13edf2bf-1c48-406c-9b19-d09975ddafb3";
    const feed = await parseRssFeed(rssUrl);

    if (feed.items && feed.items.length > 0) {
      const articles = feed.items.map((item, idx) => {
        const row = mapRssItemToNewsRow(item, idx);
        return mapSupabaseRowToArticle(row);
      });
      rssArticlesCache = { data: articles, timestamp: now };
      return articles;
    }
  } catch (err) {
    console.warn("No se pudo obtener noticias del feed RSS de Soro AI:", err);
  }

  return getFallbackArticles();
}

/**
 * Consulta Supabase para obtener las 4 noticias más recientes (Home).
 */
export async function getHomeNewsFromSupabase(): Promise<Article[]> {
  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(4);

    if (!error && data && data.length > 0) {
      return data.map(mapSupabaseRowToArticle);
    }
  } catch (err) {
    console.warn("No se pudo conectar a Supabase, utilizando feed en vivo de Soro:", err);
  }

  const liveArticles = await getLiveRssArticles();
  return liveArticles.slice(0, 4);
}

/**
 * Consulta Supabase para obtener todas las noticias ordenadas por fecha.
 */
export async function getAllArticlesFromSupabase(): Promise<Article[]> {
  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map(mapSupabaseRowToArticle);
    }
  } catch (err) {
    console.warn("No se pudo conectar a Supabase, utilizando feed en vivo de Soro:", err);
  }

  return getLiveRssArticles();
}

/**
 * Busca un artículo por su slug en Supabase o en el feed RSS de Soro AI.
 */
export async function getArticleBySlugFromSupabase(slug: string): Promise<Article | undefined> {
  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!error && data) {
      return mapSupabaseRowToArticle(data);
    }
  } catch {
    // Continuar al feed en vivo de Soro
  }

  const liveArticles = await getLiveRssArticles();
  return liveArticles.find((a) => a.slug === slug);
}

/**
 * Obtiene artículos relacionados por categoría.
 */
export async function getRelatedArticlesFromSupabase(
  currentArticle: Article,
  limit: number = 3
): Promise<Article[]> {
  const allMapped = await getAllArticlesFromSupabase();
  const filtered = allMapped.filter((a) => a.slug !== currentArticle.slug);
  const sameCat = filtered.filter((a) => a.category === currentArticle.category);

  if (sameCat.length >= limit) return sameCat.slice(0, limit);

  const result = [...sameCat];
  for (const art of filtered) {
    if (!result.some((r) => r.slug === art.slug)) {
      result.push(art);
    }
    if (result.length >= limit) break;
  }
  return result.slice(0, limit);
}

/**
 * Obtiene artículo anterior y siguiente.
 */
export async function getPrevNextArticlesFromSupabase(currentArticle: Article): Promise<{
  prev: Article | null;
  next: Article | null;
}> {
  const all = await getAllArticlesFromSupabase();
  const index = all.findIndex((a) => a.slug === currentArticle.slug);
  if (index === -1) return { prev: null, next: null };

  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  return { prev, next };
}

/**
 * Obtiene las categorías únicas disponibles.
 */
export async function getNewsCategoriesFromSupabase(): Promise<string[]> {
  const all = await getAllArticlesFromSupabase();
  const categories = all.map((a) => a.category);
  return Array.from(new Set(categories));
}

/**
 * Exportaciones sincrónicas / auxiliares para componentes
 */
export function getAllArticles(): Article[] {
  if (rssArticlesCache) {
    return rssArticlesCache.data;
  }
  return getFallbackArticles();
}

export function getHomeNews(): Article[] {
  if (rssArticlesCache) {
    return rssArticlesCache.data.slice(0, 4);
  }
  return getFallbackArticles().slice(0, 4);
}

export function getArticleBySlug(slug: string): Article | undefined {
  if (rssArticlesCache) {
    return rssArticlesCache.data.find((art) => art.slug === slug);
  }
  return getFallbackArticles().find((art) => art.slug === slug);
}

export function getRelatedArticles(currentArticle: Article, limit: number = 3): Article[] {
  const all = getAllArticles();
  return all.filter((a) => a.slug !== currentArticle.slug).slice(0, limit);
}

export function getPrevNextArticles(currentArticle: Article): {
  prev: Article | null;
  next: Article | null;
} {
  const all = getAllArticles();
  const index = all.findIndex((a) => a.slug === currentArticle.slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

export function getNewsCategories(): string[] {
  return Array.from(new Set(getAllArticles().map((a) => a.category)));
}

/**
 * Semilla de Resguardo
 */
function getFallbackArticles(): Article[] {
  return [
    {
      id: "soro-1",
      slug: "panama-qualified-investor-residency-2026",
      title: "Panamá Actualiza el Esquema de Residencia para Inversionistas Calificados: Implicaciones Fiscales y Legales Clave",
      subtitle: "Analizamos los nuevos decretos ejecutivos que optimizan los umbrales de inversión inmobiliaria y bancaria para inversores internacionales.",
      summary: "Nuevos Decretos Ejecutivos perfeccionan los umbrales mínimos de inversión en bienes raíces y depósitos bancarios, ofreciendo rutas aceleradas de residencia permanente para inversionistas globales.",
      category: "Inmigración e Inversión",
      date: "4 de Agosto, 2026",
      isoDate: "2026-08-04T08:00:00Z",
      readTime: "Lectura de 4 min",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      author: {
        name: "Soro AI / EIP & Associates",
        role: "Equipo de Análisis Legal e Inversión Migratoria",
      },
      featuredInHome: true,
      toc: [
        { id: "marcos-regulatorios-2026", title: "1. Nuevos Marcos Regulatorios del Régimen de Inversionista Calificado" },
        { id: "opciones-inversion", title: "2. Modalidades de Inversión Elegibles" },
      ],
      content: [
        {
          type: "paragraph",
          content: "El gobierno de la República de Panamá ha promulgado recientes ajustes normativos a la Subcategoría de Residencia Permanente por Razones Económicas como Inversionista Calificado.",
        },
      ],
    },
  ];
}

