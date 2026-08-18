"use client";

import React from "react";
import { HeroVideo } from "./HeroVideo";
import { HeroOverlay } from "./HeroOverlay";
import { HeroContent } from "./HeroContent";
import { ScrollIndicator } from "./ScrollIndicator";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-[#0D0D0D] flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8"
    >
      {/* Reproductor de Video Dinámico (Día / Noche en Panamá) */}
      <HeroVideo />

      {/* Capa de Sombra Oscura 50% */}
      <HeroOverlay />

      {/* Contenido Editorial del Hero */}
      <HeroContent />

      {/* Indicador Animado de Scroll */}
      <ScrollIndicator />
    </section>
  );
}
