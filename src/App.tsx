import { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NewsSection } from './components/NewsSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

export function App() {
  // Default language originally set to English ('EN') as requested
  const [lang, setLang] = useState<Language>('EN');
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F4F4F4] font-sans antialiased selection:bg-[#C6A45D] selection:text-[#0D0D0D]">
      {/* Sticky / Scroll Glass Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Home Content Sections */}
      <main>
        {/* Section 1: Hero with Client Video Reserved Container */}
        <HeroSection
          lang={lang}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Section 2: Latest Legal Insights (3 AI Daily News) */}
        <NewsSection lang={lang} />

        {/* Section 3: About Us (Preview with trustworthy legends) */}
        <AboutSection
          lang={lang}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Section 4: Services (6 Practice Area Cards) */}
        <ServicesSection
          lang={lang}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Section 5: Testimonials (3 Client Endorsements) */}
        <TestimonialsSection lang={lang} />

        {/* Section 6: Call to Action */}
        <CtaSection
          lang={lang}
          onOpenContact={() => setIsContactOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Contact Modal Popup */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default App;
