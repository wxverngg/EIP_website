/**
 * Utilidades para procesamiento de contenido RSS, slugs, SEO y calculo de lectura.
 */

const CORPORATE_PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
];

/**
 * Calcula el tiempo estimado de lectura en minutos basado en 200 palabras por minuto.
 */
export function calculateReadingTime(text: string): string {
  if (!text) return "3 min read";
  const plainText = text.replace(/<[^>]*>/g, " ");
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / 200);
  const minText = Math.max(1, minutes);
  return `${minText} min read`;
}

/**
 * Genera un slug SEO amigable a partir del título.
 */
export function generateSlug(title: string): string {
  if (!title) return `article-${Date.now()}`;
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, "") // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, "-") // Reemplazar espacios por guiones
    .replace(/-+/g, "-"); // Eliminar guiones duplicados
}

/**
 * Limpia HTML y extrae un resumen limpio (Excerpt) de máximo maxChars caracteres.
 */
export function extractExcerpt(htmlOrText: string, maxChars: number = 220): string {
  if (!htmlOrText) return "";
  const plainText = htmlOrText.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (plainText.length <= maxChars) return plainText;
  return plainText.slice(0, maxChars).trim() + "...";
}

/**
 * Genera un título SEO optimizado para motores de búsqueda.
 */
export function generateSeoTitle(title: string): string {
  const cleanTitle = title ? title.trim() : "Noticias Legales";
  if (cleanTitle.includes("EIP & Associates")) return cleanTitle;
  return `${cleanTitle} | EIP & Associates Panamá`;
}

/**
 * Genera una metadescripción SEO limpia.
 */
export function generateSeoDescription(contentOrExcerpt: string): string {
  return extractExcerpt(contentOrExcerpt, 160);
}

/**
 * Retorna una imagen corporativa de respaldo si la imagen del RSS no existe o no es válida.
 */
export function getFallbackImage(indexOrSeed?: number | string): string {
  if (typeof indexOrSeed === "number") {
    return CORPORATE_PLACEHOLDER_IMAGES[Math.abs(indexOrSeed) % CORPORATE_PLACEHOLDER_IMAGES.length];
  }
  return CORPORATE_PLACEHOLDER_IMAGES[0];
}
