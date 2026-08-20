/**
 * Constantes y Datos Oficiales de la Firma EIP & Associates (Panamá)
 * Este archivo centraliza la información corporativa, navegación, redes y enlaces en Español.
 */

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const FIRM_INFO = {
  name: "EIP & Associates",
  location: "Ciudad de Panamá, República de Panamá",
  tagline: "Su Puerta de Entrada para Vivir, Invertir y Hacer Negocios en Panamá",
  trustBadge: "Derecho Migratorio • Residencias • Derecho Corporativo",
  heroSubtitle:
    "Guiamos a personas, familias y empresas internacionales en programas de residencia, trámites de inmigración, permisos de trabajo y servicios legales corporativos con apoyo legal personalizado.",
  email: "info@eippanamalawyers.net",
  phone: "+507 6725-6030",
  whatsapp: "+507 6725-6030",
  address: "Century Tower, Calle 65 Oeste, Panamá, Provincia de Panamá",
  googleMapsUrl: "https://maps.app.goo.gl/SjJ4UyKnN6GHNE1q8",
  businessHours: "Lunes a Viernes: 9:00 AM - 4:00 PM (Hora Oficial de Panamá)",
  // NOTA: El año se calcula en tiempo de importación del módulo. En Next.js con ISR
  // o builds de larga vida, esto podría quedar desactualizado. Los componentes que
  // necesiten precisión deben usar new Date().getFullYear() directamente en el render.
  copyright: `© ${new Date().getFullYear()} EIP & Associates. Todos los derechos reservados.`,
};

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "#hero" },
];

export const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/eip_attorneys_panama/", icon: "Instagram" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61565610636051", icon: "Facebook" },
  { name: "WhatsApp Business", href: "https://wa.me/50767256030", icon: "WhatsApp" },
];

export const COLOR_TOKENS = {
  bgPrimary: "#0D0D0D",
  bgSecondary: "#151515",
  cardBg: "#1A1A1A",
  textPrimary: "#F5F5F5",
  textSecondary: "#A1A1AA",
  gold: "#C8A04A",
  goldHover: "#D8B86C",
  border: "rgba(255, 255, 255, 0.08)",
  separator: "rgba(255, 255, 255, 0.05)",
};
