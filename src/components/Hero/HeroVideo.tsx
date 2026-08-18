"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getPanamaTime, PanamaTimeState } from "@/lib/panama-time";

const DAY_IMAGES = [
  "/images/hero/day-1.jpg",
  "/images/hero/day-2.jpg",
  "/images/hero/day-3.jpg",
];

const NIGHT_IMAGES = [
  "/images/hero/night-1.jpg",
  "/images/hero/night-2.jpg",
  "/images/hero/night-3.jpg",
];

export function HeroVideo() {
  const [timeState, setTimeState] = useState<PanamaTimeState | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    // Determinar horario inicial oficial de Panamá
    setTimeState(getPanamaTime());

    // Actualizar horario cada 60 segundos
    const timeInterval = setInterval(() => {
      setTimeState(getPanamaTime());
    }, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  const isDay = timeState?.isDaytime ?? true;
  const currentImages = isDay ? DAY_IMAGES : NIGHT_IMAGES;

  // Cambiar imagen del slideshow cada 6 segundos
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
    }, 6000);

    return () => clearInterval(slideInterval);
  }, [currentImages.length]);

  if (!timeState) {
    return (
      <div className="absolute inset-0 bg-[#0D0D0D] z-0 animate-pulse flex items-center justify-center">
        <span className="text-xs uppercase tracking-widest text-zinc-600">Cargando horario de Panamá...</span>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none">
      <div className="relative w-full h-full">
        {/* Slideshow de Imágenes con Crossfade */}
        {currentImages.map((src, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="relative w-full h-full animate-slow-zoom">
                <Image
                  src={src}
                  alt={isDay ? `Panamá de Día ${index + 1}` : `Panamá de Noche ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

