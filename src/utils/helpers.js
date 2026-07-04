// helpers.js — Fonctions utilitaires globales

// Formate un prix en USD
export function formatPrice(amount, currency = "USD") {
  return `$${Number(amount).toLocaleString("en-US")} ${currency}`;
}

// Tronque un texte à une longueur max
export function truncate(text, maxLength = 80) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
}

// Capitalise la première lettre
export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Génère un ID unique simple
export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// Retarde une fonction (debounce) — utile pour la recherche live
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Vérifie si une URL d'image est valide (pour les placeholders)
export function isValidImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  return url.startsWith("/") || url.startsWith("http");
}

// Obtient le chemin d'image d'un produit
export function getProductImagePath(productId, index = "main") {
  const num = productId?.replace("veste-", "") || "01";
  const filename = index === "main" ? "main.jpg" : `${index}.jpg`;
  return `/images/produits/veste-${num}/${filename}`;
}

// Formate une date
export function formatDate(dateStr, locale = "fr-FR") {
  try {
    return new Date(dateStr).toLocaleDateString(locale, {
      year: "numeric", month: "long", day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// Scroll vers le haut de la page
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Lit le consentement cookies
export function getCookieConsent() {
  return localStorage.getItem("azaratti_cookie_consent");
}

// Récupère la langue stockée
export function getStoredLang() {
  return localStorage.getItem("azaratti_lang") || "fr";
}
