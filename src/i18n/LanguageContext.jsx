import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem("heredame-lang");
  if (stored === "es" || stored === "en") return stored;
  // Default to Spanish always — do NOT auto-switch off navigator.language,
  // per the brief: Spanish by default, English only if the visitor chooses it.
  return "es";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem("heredame-lang", lang);
    } catch {
      // localStorage can be unavailable (private mode, blocked storage) — non-fatal
    }
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  const value = {
    lang,
    setLang,
    toggleLang,
    t: translations[lang],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
