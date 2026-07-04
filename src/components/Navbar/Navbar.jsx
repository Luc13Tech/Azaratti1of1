import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useAccount } from "../../context/AccountContext.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { t, lang, setLang, langs } = useLang();
  const { totalCount, setOpen } = useCart();
  const { user } = useAccount();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  // Bloque le scroll quand menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/boutique?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setSearchOpen(false);
    }
  }

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${isHome && !scrolled ? "navbar--home" : ""}`}>
        <div className="navbar__inner container">

          {/* ── GAUCHE : liens desktop ── */}
          <nav className="navbar__left">
            <Link to="/boutique" className="navbar__link">{t("nav.boutique")}</Link>
            <Link to="/sur-mesure" className="navbar__link">{t("nav.surMesure")}</Link>
            <Link to="/maison" className="navbar__link">{t("nav.maison")}</Link>
          </nav>

          {/* ── CENTRE : logo ── */}
          <Link to="/" className="navbar__logo-wrap">
            <img src="/images/logo/azaratti-logo.jpg" alt="AzaRatti 1 of 1" className="navbar__logo" />
          </Link>

          {/* ── DROITE : actions ── */}
          <div className="navbar__right">
            {/* Recherche */}
            <button className="navbar__icon-btn" aria-label={t("nav.search")} onClick={() => setSearchOpen(o => !o)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
              </svg>
            </button>

            {/* Langue */}
            <div className="navbar__lang">
              <select value={lang} onChange={e => setLang(e.target.value)} aria-label="Langue">
                {langs.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
              </select>
            </div>

            {/* Compte */}
            <Link to="/compte" className="navbar__icon-btn" aria-label={t("nav.account")}>
              {user ? (
                <span className="navbar__user-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                  </svg>
                  <span className="navbar__user-dot" />
                </span>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                </svg>
              )}
            </Link>

            {/* Panier */}
            <button className="navbar__icon-btn navbar__cart-btn" aria-label={t("nav.cart")} onClick={() => setOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 7h12l-1.2 12H7.2L6 7z"/><path d="M9.5 7a2.5 2.5 0 0 1 5 0"/>
              </svg>
              {totalCount > 0 && <span className="navbar__cart-count">{totalCount}</span>}
            </button>

            {/* Burger mobile */}
            <button
              className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
              aria-label="Menu"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className={`navbar__search-bar ${searchOpen ? "navbar__search-bar--open" : ""}`}>
          <form onSubmit={handleSearch} className="container navbar__search-form">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t("nav.searchPlaceholder")}
            />
            <button type="submit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
              </svg>
            </button>
            <button type="button" onClick={() => setSearchOpen(false)} className="navbar__search-close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </form>
        </div>
      </header>

      {/* Menu mobile (drawer) */}
      <div className={`nav-mobile ${menuOpen ? "nav-mobile--open" : ""}`}>
        <div className="nav-mobile__header">
          <img src="/images/logo/azaratti-logo.jpg" alt="AzaRatti" className="nav-mobile__logo" />
          <button className="nav-mobile__close" onClick={() => setMenuOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <nav className="nav-mobile__links">
          <Link to="/"          className="nav-mobile__link">Accueil</Link>
          <Link to="/boutique"  className="nav-mobile__link">{t("nav.boutique")}</Link>
          <Link to="/sur-mesure" className="nav-mobile__link">{t("nav.surMesure")}</Link>
          <Link to="/maison"    className="nav-mobile__link">{t("nav.maison")}</Link>
          <Link to="/contact"   className="nav-mobile__link">{t("nav.contact")}</Link>
          <Link to="/compte"    className="nav-mobile__link">{t("nav.account")}</Link>
        </nav>
        <div className="nav-mobile__lang">
          {langs.map(l => (
            <button key={l} className={`nav-mobile__lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      {menuOpen && <div className="nav-mobile__backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
