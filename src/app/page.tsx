'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesBar from '../components/ServicesBar';
import AboutSection from '../components/AboutSection';
import ProcessSection from '../components/ProcessSection';
import NewsSection from '../components/NewsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ConsultationModal from '../components/ConsultationModal';

export default function Page() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const openConsultation = () => setIsConsultationOpen(true);

  return (
    <>
      <Navbar />

      <main>
        <Hero onOpenConsultation={openConsultation} />
        <ServicesBar />
        <AboutSection onOpenConsultation={openConsultation} />
        <ProcessSection />
        <NewsSection />
        <TestimonialsSection />
        {/* Sección #contact: es el CTA que abre el formulario de consulta. */}
        <CtaSection onOpenConsultation={openConsultation} />
      </main>

      <Footer />
      <WhatsAppButton />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </>
  );
}
