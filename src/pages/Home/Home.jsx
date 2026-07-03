import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import { productsAPI } from "../../api/api.js";
import HeroScene from "../../components/HeroScene/HeroScene.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import "./Home.css";

export default function Home() {
  const { t } = useLang();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsAPI.list({ limit: 4 })
      .then(({ data }) => setProducts(data.products?.slice(0, 4) || []))
      .catch(() => {});
  }, []);

  return (
    <main className="home">
      {/* ── HERO ── */}
      <section className="home__hero">
        {/* 3D scene */}
        <div className="home__hero-scene">
          <HeroScene />
        </div>
        {/* Dark overlay */}
        <div className="home__hero-overlay" />
        {/* Text */}
        <div className="home__hero-content container">
          <p className="eyebrow home__hero-eyebrow">{t("home.heroEyebrow")}</p>
          <h1 className="home__hero-title">
            {t("home.heroTitle").split("\n").map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h1>
          <p className="home__hero-sub">{t("home.heroSub")}</p>
          <div className="home__hero-ctas">
            <Link to="/boutique" className="btn btn-white btn-lg">{t("home.ctaDiscover")}</Link>
            <Link to="/sur-mesure" className="btn btn-outline home__cta-outline btn-lg">{t("home.ctaBespoke")}</Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="home__scroll-hint">
          <span />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="home__stats">
        <div className="container home__stats-inner">
          {[
            { value: "15", label: t("home.statsLabel1") },
            { value: "15", label: t("home.statsLabel2") },
            { value: "10+", label: t("home.statsLabel3") },
            { value: "100%", label: t("home.statsLabel4") },
          ].map((s, i) => (
            <div key={i} className="home__stat">
              <span className="home__stat-value">{s.value}</span>
              <span className="home__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="hairline" />

      {/* ── COLLECTION PREVIEW ── */}
      <section className="home__collection container">
        <div className="home__section-head">
          <p className="eyebrow">{t("home.collectionTitle")}</p>
          <h2 className="section-title">{t("home.collectionSub")}</h2>
          <div className="gold-line" style={{ margin: "20px 0 0" }} />
        </div>

        {products.length > 0 ? (
          <div className="home__grid">
            {products.map(p => <ProductCard key={p.productId} product={p} />)}
          </div>
        ) : (
          <div className="home__grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="home__card-skeleton">
                <div className="skeleton home__card-skeleton-img" />
                <div className="skeleton home__card-skeleton-text" />
                <div className="skeleton home__card-skeleton-price" />
              </div>
            ))}
          </div>
        )}

        <div className="home__collection-cta">
          <Link to="/boutique" className="btn btn-outline">{t("home.ctaCollection")}</Link>
        </div>
      </section>

      <hr className="hairline" />

      {/* ── WHY AZARATTI ── */}
      <section className="home__why container">
        <div className="home__section-head">
          <p className="eyebrow">{t("home.whyTitle")}</p>
          <div className="gold-line" style={{ margin: "16px 0 0" }} />
        </div>
        <div className="home__why-grid">
          {[
            { icon: "01", title: t("home.why1Title"), text: t("home.why1Text") },
            { icon: "02", title: t("home.why2Title"), text: t("home.why2Text") },
            { icon: "03", title: t("home.why3Title"), text: t("home.why3Text") },
          ].map((item, i) => (
            <div key={i} className="home__why-card">
              <span className="home__why-num">{item.icon}</span>
              <h3 className="home__why-title">{item.title}</h3>
              <p className="home__why-text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BAG BANNER ── */}
      <section className="home__bag-banner">
        <div className="container home__bag-inner">
          <div className="home__bag-img-wrap">
            <img src="/images/logo/azaratti-bag.jpg" alt="AzaRatti luxury bag" />
          </div>
          <div className="home__bag-text">
            <p className="eyebrow" style={{ color: "var(--gold-light)" }}>AzaRatti 1 of 1</p>
            <h2 className="home__bag-title">Une marque.<br />Une pièce.<br />Une histoire.</h2>
            <Link to="/maison" className="btn" style={{ background: "var(--gold)", borderColor: "var(--gold)", color: "#fff" }}>
              Découvrir la Maison
            </Link>
          </div>
        </div>
      </section>

      {/* ── BESPOKE CTA ── */}
      <section className="home__bespoke container">
        <div className="home__bespoke-inner">
          <p className="eyebrow">{t("nav.surMesure")}</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>{t("home.ctaBespoke")}</h2>
          <p className="home__bespoke-text">{t("home.why3Text")}</p>
          <Link to="/sur-mesure" className="btn btn-dark btn-lg">{t("home.ctaBespoke")}</Link>
        </div>
      </section>
    </main>
  );
}
