import type { Metadata } from "next";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { LanguageProvider } from "@/lib/i18n";
import { getGoogleReviews } from "@/lib/google-reviews";
import { TestimonialsHero } from "@/components/Testimonials/TestimonialsHero";
import { GoogleRating } from "@/components/Testimonials/GoogleRating";
import { ReviewsGrid } from "@/components/Testimonials/ReviewsGrid";
import { TrustSection } from "@/components/Testimonials/TrustSection";
import { TestimonialsCTA } from "@/components/Testimonials/TestimonialsCTA";
import { FIRM_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Client Testimonials | EIP & Associates",
  description:
    "Read real client reviews and testimonials about EIP & Associates and our legal services in Panama.",
  alternates: {
    canonical: "https://eippanamalawyers.net/testimonials",
  },
  openGraph: {
    title: "Client Testimonials | EIP & Associates",
    description:
      "Read real client reviews and testimonials about EIP & Associates and our legal services in Panama.",
    url: "https://eippanamalawyers.net/testimonials",
    siteName: "EIP & Associates",
    locale: "es_PA",
    type: "website",
  },
};

export default async function TestimonialsPage() {
  const googleData = await getGoogleReviews();

  // JSON-LD Breadcrumb Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://eippanamalawyers.net",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Testimonials",
        item: "https://eippanamalawyers.net/testimonials",
      },
    ],
  };

  // JSON-LD LegalService Schema (only include AggregateRating when valid real data exists)
  const legalServiceJsonLd: any = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": "https://eippanamalawyers.net/#legalservice",
    name: FIRM_INFO.name,
    url: "https://eippanamalawyers.net/testimonials",
    telephone: FIRM_INFO.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Century Tower, Calle 65 Oeste",
      addressLocality: "Ciudad de Panamá",
      addressRegion: "Panamá",
      addressCountry: "PA",
    },
  };

  if (googleData.isAvailable && googleData.rating > 0 && googleData.userRatingCount > 0) {
    legalServiceJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: googleData.rating.toString(),
      reviewCount: googleData.userRatingCount.toString(),
      bestRating: "5",
      worstRating: "1",
    };
  }

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-[#0D0D0D] text-[#F5F5F5] relative overflow-hidden flex flex-col justify-between selection:bg-[#C8A04A] selection:text-[#0D0D0D]">
        {/* Structured Data / JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd) }}
        />

        <Navbar />

        {/* 1. Hero */}
        <TestimonialsHero />

        {/* 2. Rating Summary Bar */}
        <GoogleRating
          rating={googleData.rating}
          userRatingCount={googleData.userRatingCount}
          googleMapsUri={googleData.googleMapsUri}
          isAvailable={googleData.isAvailable}
        />

        {/* 3. Google Reviews Grid */}
        <ReviewsGrid
          reviews={googleData.reviews}
          isAvailable={googleData.isAvailable}
          googleMapsUri={googleData.googleMapsUri}
        />

        {/* 4. Trust Section */}
        <TrustSection />

        {/* 5. CTA Section */}
        <TestimonialsCTA googleMapsUri={googleData.googleMapsUri} />

        <Footer />
      </main>
    </LanguageProvider>
  );
}
