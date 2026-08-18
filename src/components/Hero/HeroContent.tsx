"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { getPanamaTime, PanamaTimeState } from "@/lib/panama-time";

export function HeroContent() {
  const { t, language } = useLanguage();
  const [timeState, setTimeState] = useState<PanamaTimeState | null>(null);
  const panamaRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!panamaRef.current) return;
    const rect = panamaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    panamaRef.current.style.setProperty("--cursor-x", `${x.toFixed(2)}%`);
    panamaRef.current.style.setProperty("--cursor-y", `${y.toFixed(2)}%`);
  };

  useEffect(() => {
    setTimeState(getPanamaTime());
    const interval = setInterval(() => {
      setTimeState(getPanamaTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format time for display (e.g., "10:05 AM")
  const displayTime = timeState
    ? new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Panama",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  // Format date for display (e.g., "05 DE JULIO DE 2026")
  const displayDate = timeState
    ? (() => {
        const now = new Date();
        const day = now
          .toLocaleDateString("es-PA", {
            timeZone: "America/Panama",
            day: "2-digit",
          })
          .padStart(2, "0");
        const monthNames: Record<string, string[]> = {
          ES: [
            "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
            "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
          ],
          EN: [
            "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
            "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
          ],
        };
        const monthIdx = parseInt(
          now.toLocaleDateString("en-US", {
            timeZone: "America/Panama",
            month: "numeric",
          }),
          10
        ) - 1;
        const year = now.toLocaleDateString("en-US", {
          timeZone: "America/Panama",
          year: "numeric",
        });
        const lang = language === "ES" ? "ES" : "EN";
        const month = monthNames[lang][monthIdx];
        return language === "ES"
          ? `${day} DE ${month} DE ${year}`
          : `${month} ${day}, ${year}`;
      })()
    : "";

  return (
    <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between my-auto py-4">
      {/* LEFT SIDE — Hero Text */}
      <div className="flex flex-col items-start max-w-3xl animate-fade-up">
        {/* "SU FUTURO COMIENZA EN" */}
        <h1 className="hero-title-light leading-[1.05] mb-0">
          <span className="block">
            {language === "ES" ? "SU FUTURO" : "YOUR FUTURE"}
          </span>
          <span className="block">
            {language === "ES" ? "COMIENZA EN" : "STARTS IN"}
          </span>
          {/* "PANAMÁ" with gold gradient & interactive cursor shimmer */}
          <span
            ref={panamaRef}
            onMouseMove={handleMouseMove}
            data-text="PANAMÁ"
            className="hero-title-panama gold-shimmer-text block"
          >
            PANAMÁ
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-5 sm:mt-6 max-w-2xl">
          {language === "ES"
            ? "Residencias, inversión, contratos de compraventa, permisos de trabajo, servicios fiscales y contables, y asesoría legal personalizada para personas, familias y empresas."
            : "Residency, investment, purchase and sales agreements, work permits, tax and accounting services, and personalized legal advisory for individuals, families, and businesses."}
        </p>
      </div>

      {/* RIGHT SIDE — Panama Clock Widget */}
      {timeState && (
        <div className="hidden lg:flex flex-col items-center hero-clock-widget animate-fade-up">
          <div className="flex items-start gap-3">
            {/* Time display */}
            <div className="flex flex-col items-center">
              <span className="hero-clock-time">{displayTime}</span>
              <div className="hero-clock-divider" />
              <span className="hero-clock-location">
                {language === "ES"
                  ? "CIUDAD DE PANAMÁ, PANAMÁ"
                  : "PANAMA CITY, PANAMA"}
              </span>
              <div className="hero-clock-divider mt-1.5" />
              <span className="hero-clock-date">{displayDate}</span>
            </div>
            {/* Analog clock face */}
            <AnalogClock timeState={timeState} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Analog Clock mini-component ---------- */
function AnalogClock({ timeState }: { timeState: PanamaTimeState }) {
  const now = new Date();
  const panamaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Panama" })
  );
  const seconds = panamaTime.getSeconds();
  const minutes = panamaTime.getMinutes();
  const hours = panamaTime.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="relative w-14 h-14 flex-shrink-0">
      <svg
        viewBox="0 0 56 56"
        className="w-full h-full"
        aria-label="Analog clock"
      >
        {/* Tick marks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const isMajor = i % 3 === 0;
          const outerR = 25;
          const innerR = isMajor ? 21 : 23;
          return (
            <line
              key={i}
              x1={28 + innerR * Math.sin(angle)}
              y1={28 - innerR * Math.cos(angle)}
              x2={28 + outerR * Math.sin(angle)}
              y2={28 - outerR * Math.cos(angle)}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={isMajor ? 1.5 : 0.8}
              strokeLinecap="round"
            />
          );
        })}
        {/* Hour hand */}
        <line
          x1="28"
          y1="28"
          x2={28 + 13 * Math.sin((hourDeg * Math.PI) / 180)}
          y2={28 - 13 * Math.cos((hourDeg * Math.PI) / 180)}
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Minute hand */}
        <line
          x1="28"
          y1="28"
          x2={28 + 18 * Math.sin((minuteDeg * Math.PI) / 180)}
          y2={28 - 18 * Math.cos((minuteDeg * Math.PI) / 180)}
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Second hand */}
        <line
          x1="28"
          y1="28"
          x2={28 + 20 * Math.sin((secondDeg * Math.PI) / 180)}
          y2={28 - 20 * Math.cos((secondDeg * Math.PI) / 180)}
          stroke="#C8A04A"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Center dot */}
        <circle cx="28" cy="28" r="1.5" fill="white" />
      </svg>
    </div>
  );
}
