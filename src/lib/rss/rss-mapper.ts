import { ParsedRssItem } from "./rss-parser";
import {
  generateSlug,
  extractExcerpt,
  calculateReadingTime,
  generateSeoTitle,
  generateSeoDescription,
  getFallbackImage,
} from "./rss-utils";

export interface SupabaseNewsInsert {
  guid: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  author: string;
  reading_time: string;
  status: string;
  published_at: string;
  seo_title: string;
  seo_description: string;
  rss_link: string;
  source: string;
}

/**
 * Mapea un elemento parseado del RSS a la estructura exacta de la tabla 'news' en Supabase.
 */
export function mapRssItemToNewsRow(
  item: ParsedRssItem,
  index: number = 0
): SupabaseNewsInsert {
  const title = item.title ? item.title.trim() : "Publicación Legal";
  const slug = generateSlug(title);
  const rawContent = item.content || item.summary || item.contentSnippet || "";
  const excerpt = item.summary ? extractExcerpt(item.summary, 240) : extractExcerpt(rawContent, 240);
  const readingTime = calculateReadingTime(rawContent);
  const featuredImage = item.imageUrl || getFallbackImage(index);
  const category = item.category || "Noticias Legales";
  const author = item.author || item.creator || "Soro AI / EIP & Associates";
  const publishedAt = item.isoDate || (item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString());

  return {
    guid: item.guid,
    slug,
    title,
    excerpt,
    content: rawContent,
    featured_image: featuredImage,
    category,
    author,
    reading_time: readingTime,
    status: "published",
    published_at: publishedAt,
    seo_title: generateSeoTitle(title),
    seo_description: generateSeoDescription(excerpt || title),
    rss_link: item.link || "",
    source: "Soro AI",
  };
}
