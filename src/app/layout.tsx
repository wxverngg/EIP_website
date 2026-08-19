import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Raleway, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EIP & Associates | Corporate & Immigration Law Firm in Panama",
  description:
    "Premier corporate law firm in Panama specializing in residency programs, immigration procedures, work permits, investment advisory, and corporate legal services.",
  keywords: [
    "Panama Law Firm",
    "Lawyers in Panama",
    "Panama Immigration Lawyers",
    "Panama Residency",
    "Qualified Investor Visa Panama",
    "Panama Corporate Law",
    "Panama Work Permits",
    "Friendly Nations Visa Panama",
    "Panama Real Estate Law",
    "Firma de Abogados Panamá",
    "Abogados en Panamá",
    "Residencia en Panamá",
  ],
  authors: [{ name: "EIP & Associates" }],
  creator: "EIP & Associates",
  metadataBase: new URL("https://eippanamalawyers.net"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EIP & Associates | Premier Corporate Law Firm Panama",
    description:
      "Your gateway to living, investing and doing business in Panama. Personalized legal support for international families and corporations.",
    url: "https://eippanamalawyers.net",
    siteName: "EIP & Associates",
    images: [
      {
        url: "/images/logo/eip-white.png",
        width: 1200,
        height: 630,
        alt: "EIP & Associates Law Firm Panama",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EIP & Associates | Panama Law Firm",
    description:
      "Residency programs, immigration, work permits and corporate legal services in Panama.",
    images: ["/images/logo/eip-white.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { LanguageProvider } from "@/lib/i18n";
import { WhatsAppBubble } from "@/components/WhatsAppBubble";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Esquema LegalService para Google Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "EIP & Associates",
    image: "https://eippanamalawyers.net/images/logo/eip-white.png",
    url: "https://eippanamalawyers.net",
    telephone: "+507 6725-6030",
    email: "info@eippanamalawyers.net",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Torre Financial Park, Piso 24, Costa del Este",
      addressLocality: "Ciudad de Panamá",
      addressRegion: "Panamá",
      addressCountry: "PA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "9.0066",
      longitude: "-79.4678",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    knowsLanguage: ["English", "Spanish"],
    areaServed: "Panamá",
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${raleway.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/images/logo/eip-white.png" />
      </head>
      <body className="antialiased bg-[#0D0D0D] text-[#F5F5F5] selection:bg-[#C8A04A] selection:text-[#0D0D0D]">
        <LanguageProvider>
          {children}
          <WhatsAppBubble />
        </LanguageProvider>
      </body>
    </html>
  );
}
