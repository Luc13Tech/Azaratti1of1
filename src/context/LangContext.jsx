import React, { createContext, useContext, useState, useCallback } from "react";
import fr from "../i18n/fr.json";
import en from "../i18n/en.json";
import es from "../i18n/es.json";
import de from "../i18n/de.json";

const dicts = { fr, en, es, de };

export const LangContext = createContext(null);

function get(obj, path) {
  return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

export function LangProvider({ children }) {
  const stored = localStorage.getItem("azaratti_lang");
  const [lang, setLangState] = useState(stored || "fr");

  const setLang = useCallback((l) => {
    setLangState(l);
    localStorage.setItem("azaratti_lang", l);
    document.documentElement.lang = l;
  }, []);

  // t("nav.boutique") → string traduit
  const t = useCallback((key) => {
    const val = get(dicts[lang] || dicts.fr, key);
    return val !== undefined ? val : key;
  }, [lang]);

  // tF(product.name) → lit le champ multilingue d'un objet siteData/API
  const tF = useCallback((field) => {
    if (!field) return "";
    return field[lang] || field.fr || Object.values(field)[0] || "";
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t, tF, langs: Object.keys(dicts) }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be inside LangProvider");
  return ctx;
}
