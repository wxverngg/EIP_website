"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, TRANSLATIONS } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof TRANSLATIONS.EN;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const existingContext = useContext(LanguageContext);

  // If a parent LanguageProvider already exists, reuse it without creating a new nested state
  if (existingContext) {
    return <>{children}</>;
  }

  return <RootLanguageProvider>{children}</RootLanguageProvider>;
}

function RootLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("EN");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      // Use versioned key so existing visitors whose browser saved old "ES" default get reset to "EN"
      const savedLanguage = (localStorage.getItem("eip_language_v2") || localStorage.getItem("eip_language_preference")) as Language;
      if (savedLanguage && (savedLanguage === "ES" || savedLanguage === "EN")) {
        setLanguageState(savedLanguage);
      } else {
        localStorage.removeItem("eip_language");
        setLanguageState("EN");
      }
    } catch (e) {
      // LocalStorage fallback
    }
  }, []);

  const activeLanguage = mounted ? language : "EN";

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("eip_language_v2", lang);
      localStorage.setItem("eip_language_preference", lang);
      sessionStorage.setItem("eip_language_v2", lang);
    } catch (e) {
      // LocalStorage fallback
    }
  };

  const toggleLanguage = () => {
    const nextLang = activeLanguage === "EN" ? "ES" : "EN";
    setLanguage(nextLang);
  };

  const value: LanguageContextType = {
    language: activeLanguage,
    setLanguage,
    toggleLanguage,
    t: TRANSLATIONS[activeLanguage],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe ser utilizado dentro de un LanguageProvider");
  }
  return context;
}

