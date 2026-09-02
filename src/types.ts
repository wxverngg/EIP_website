/**
 * EIP & ASSOCIATES - Definiciones de Tipos de Datos
 * Idiomas soportados y estructuras de datos principales para la aplicación.
 */

/** Idiomas soportados para la internacionalización del sitio web */
export type Language = 'ES' | 'EN';

/** Estructura de datos para las noticias jurídicas publicadas por la IA */
export interface NewsItem {
  id: string;
  category: string;
  title: string;
  date: string;
  summary: string;
  readTime: string;
}

/** Estructura de datos para las áreas de práctica legal de la firma */
export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  details: string[];
}

/** Estructura de datos para los testimonios y respaldos de clientes */
export interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  location: string;
}
