import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CartDrawer from "./components/CartDrawer/CartDrawer.jsx";
import CookieBanner from "./components/CookieBanner/CookieBanner.jsx";
import { useLang } from "./context/LangContext.jsx";
import { useCart } from "./context/CartContext.jsx";
import { useLikes } from "./context/LikesContext.jsx";
import "./App.css";

const Home           = lazy(() => import("./pages/Home/Home.jsx"));
const Boutique       = lazy(() => import("./pages/Boutique/Boutique.jsx"));
const Produit        = lazy(() => import("./pages/Produit/Produit.jsx"));
const Panier         = lazy(() => import("./pages/Panier/Panier.jsx"));
const SurMesure      = lazy(() => import("./pages/SurMesure/SurMesure.jsx"));
const Compte         = lazy(() => import("./pages/Compte/Compte.jsx"));
const Maison         = lazy(() => import("./pages/Maison/Maison.jsx"));
const Contact        = lazy(() => import("./pages/Contact/Contact.jsx"));
const Confidentialite = lazy(() => import("./pages/Confidentialite/Confidentialite.jsx"));

function Loader() {
  return (
    <div className="app-loader">
      <div className="app-loader__dot" />
    </div>
  );
}

function MobileBottomNav() {
  const { t } = useLang();
  const { totalCount, setOpen } = useCart();
  const { liked } = useLikes();
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="mobile-bottom-nav">
      <Link to="/" className={`mbn-item ${path === "/" ? "mbn-item--active" : ""}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Accueil</span>
      </Link>

      <Link to="/boutique" className={`mbn-item ${path === "/boutique" ? "mbn-item--active" : ""}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
        </svg>
        <span>{t("nav.boutique")}</span>
      </Link>

      <button className="mbn-item" onClick={() => setOpen(true)}>
        <div className="mbn-cart-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 7h12l-1.2 12H7.2L6 7z"/><path d="M9.5 7a2.5 2.5 0 0 1 5 0"/>
          </svg>
          {totalCount > 0 && <span className="mbn-badge">{totalCount}</span>}
        </div>
        <span>{t("nav.cart")}</span>
      </button>

      <Link to="/compte" className={`mbn-item ${path.startsWith("/compte") ? "mbn-item--active" : ""}`}>
        <div style={{ position: "relative" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={liked.length > 0 ? "currentColor" : "none"}/>
          </svg>
          {liked.length > 0 && <span className="mbn-badge mbn-badge--heart">{liked.length}</span>}
        </div>
        <span>{t("nav.favorites")}</span>
      </Link>

      <Link to="/compte" className={`mbn-item ${path === "/compte" ? "mbn-item--active" : ""}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
        </svg>
        <span>{t("nav.account")}</span>
      </Link>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/boutique"        element={<Boutique />} />
          <Route path="/produit/:id"     element={<Produit />} />
          <Route path="/panier"          element={<Panier />} />
          <Route path="/sur-mesure"      element={<SurMesure />} />
          <Route path="/compte"          element={<Compte />} />
          <Route path="/maison"          element={<Maison />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="*"                element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <MobileBottomNav />
      <CookieBanner />
    </>
  );
}

function NotFound() {
  const { t } = useLang();
  return (
    <div className="not-found">
      <p className="eyebrow">404</p>
      <h1>Page introuvable</h1>
      <Link to="/" className="btn btn-dark">Retour à l'accueil</Link>
    </div>
  );
}

function useLang2() { return useLang(); }
