"use client";

import React, { useState, useEffect } from "react";
import { getPanamaTime } from "@/lib/panama-time";

export function HeroOverlay() {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    setIsDay(getPanamaTime().isDaytime);

    const interval = setInterval(() => {
      setIsDay(getPanamaTime().isDaytime);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-all duration-1000 ${
        isDay
          ? "bg-black/50 bg-gradient-to-t from-[#0D0D0D] via-black/40 to-black/60"
          : "bg-black/10 bg-gradient-to-t from-[#0D0D0D]/50 via-transparent to-black/10"
      }`}
      aria-hidden="true"
    />
  );
}

