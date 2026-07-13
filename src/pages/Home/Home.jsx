import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import { productsAPI } from "../../api/api.js";
import { products as staticProducts } from "../../data/siteData.js";
import HeroSlider from "../../components/HeroSlider/HeroSlider.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import "./Home.css";

// ✅ Fonction pour normaliser les produits statiques
function normalizeStatic(p) {
  // S'assurer que les images existent
  let images = p.images || [];
  if (!images || images.length === 0) {
    const productId = p.id || '';
    const num = productId.split('-')[1] || productId;
    images = [`/images/produits/main-${num}.jpg`];
  }
  
  return { 
    ...p, 
    productId: p.id,
    images: images
  };
}

// ✅ Fonction pour normaliser les produits de l'API
function normalizeApiProduct(p) {
  let images = p.images || [];
  if (!images || images.length === 0) {
    const productId = p.productId || p.id || '';
    const num = productId.split('-')[1] || productId;
    images = [`/images/produits/main-${num}.jpg`];
  }
  
  return {
    ...p,
    images: images,
    productId: p.productId || p.id || `product-${p.id || ''}`
  };
}

export default function Home() {
  const { t } = useLang();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[Home] Récupération des produits pour la page d'accueil...");
    
    productsAPI.list()
      .then(({ data }) => {
        const list = data.products || [];
        console.log(`[Home] ${list.length} produits reçus de l'API`);
        
        if (list.length > 0) {
          // ✅ Normaliser les données de l'API et prendre les 4 premiers
          const normalized = list.map(normalizeApiProduct);
          setProducts(normalized.slice(0, 4));
          console.log(`[Home] ${products.length} produits affichés sur la page d'accueil`);
        } else {
          // ✅ Fallback données statiques
          console.log("[Home] Utilisation des données statiques");
          const normalized = staticProducts.slice(0, 4).map(normalizeStatic);
          setProducts(normalized);
        }
      })
      .catch((err) => {
        console.error("[Home] Erreur API, utilisation des données statiques:", err);
        const normalized = staticProducts.slice(0, 4).map(normalizeStatic);
        setProducts(normalized);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="home">
      <HeroSlider />

      <section className="home__collection">
        <div className="container">
          <div className="home__section-head">
            <p className="eyebrow">{t("home.collectionTitle")}</p>
            <h2 className="section-title">{t("home.collectionSub")}</h2>
            <div className="gold-line" />
          </div>
          {loading ? (
            <div className="home__grid">
              {Array.from({length:4}).map((_,i)=>(
                <div key={i}>
                  <div className="skeleton home__skeleton-img" />
                  <div className="skeleton home__skeleton-title" />
                  <div className="skeleton home__skeleton-price" />
                </div>
              ))}
            </div>
          ) : (
            <div className="home__grid">
              {products.map(p => <ProductCard key={p.productId || p.id} product={p} />)}
            </div>
          )}
          <div className="home__collection-cta">
            <Link to="/boutique" className="btn btn-outline">{t("home.ctaCollection")}</Link>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      <section className="home__why">
        <div className="container">
          <div className="home__section-head">
            <p className="eyebrow">{t("home.whyTitle")}</p>
            <div className="gold-line" />
          </div>
          <div className="home__why-grid">
            {[
              { num:"01", title:t("home.why1Title"), text:t("home.why1Text") },
              { num:"02", title:t("home.why2Title"), text:t("home.why2Text") },
              { num:"03", title:t("home.why3Title"), text:t("home.why3Text") },
            ].map((item,i) => (
              <div key={i} className="home__why-card">
                <span className="home__why-num">{item.num}</span>
                <h3 className="home__why-title">{item.title}</h3>
                <p className="home__why-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home__bag-banner">
        <div className="container home__bag-inner">
          <div className="home__bag-img">
            <img src="/images/logo/azaratti-bag.jpg" alt="AzaRatti 1 of 1" />
          </div>
          <div className="home__bag-text">
            <p className="eyebrow" style={{color:"var(--gold-light)",display:"block",marginBottom:14}}>AzaRatti 1 of 1</p>
            <h2 className="home__bag-title">Une marque.<br/>Une pièce.<br/>Une histoire.</h2>
            <Link to="/maison" className="btn btn-gold">Découvrir la Maison</Link>
          </div>
        </div>
      </section>

      <section className="home__bespoke">
        <div className="container home__bespoke-inner">
          <p className="eyebrow">{t("nav.surMesure")}</p>
          <h2 className="section-title">{t("home.ctaBespoke")}</h2>
          <p className="home__bespoke-text">{t("home.why3Text")}</p>
          <Link to="/sur-mesure" className="btn btn-dark btn-lg">{t("home.ctaBespoke")}</Link>
        </div>
      </section>
    </main>
  );
    }
