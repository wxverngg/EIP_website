import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "app.trysoro.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      // Redirecciones permanentes (301) de rutas comunes de WordPress a la nueva web
      { source: "/es", destination: "/", permanent: true },
      { source: "/es/about", destination: "/about", permanent: true },
      { source: "/es/nosotros", destination: "/about", permanent: true },
      { source: "/es/contact", destination: "/contact", permanent: true },
      { source: "/es/contacto", destination: "/contact", permanent: true },
      { source: "/es/testimonials", destination: "/testimonials", permanent: true },
      { source: "/es/testimonios", destination: "/testimonials", permanent: true },
      { source: "/es/news", destination: "/news", permanent: true },
      { source: "/es/noticias", destination: "/news", permanent: true },
      { source: "/es/:path*", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/nosotros", destination: "/about", permanent: true },
      { source: "/quienes-somos", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contacto", destination: "/contact", permanent: true },
      { source: "/servicios", destination: "/", permanent: true },
      { source: "/services", destination: "/", permanent: true },
      { source: "/testimonios", destination: "/testimonials", permanent: true },
      { source: "/noticias", destination: "/news", permanent: true },
      { source: "/politica-de-privacidad", destination: "/privacy", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terminos-y-condiciones", destination: "/terms", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
    ];
  },
  async headers() {
    return [
      // Nota: Las cabeceras de seguridad (CSP, HSTS, X-Frame-Options, etc.)
      // se manejan exclusivamente en src/middleware.ts para evitar duplicación.
      // Aquí solo se definen cabeceras de caché para assets estáticos.

      // Cabeceras de caché agresivas para assets estáticos
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
