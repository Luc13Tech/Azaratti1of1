import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import "./HeroSlider.css";

// Images du slider — seront affichées dès que tu ajoutes tes photos dans /public/images/produits/
const SLIDES = [
  { id: "veste-01", img: "/images/produits/veste-01/main.jpg" },
  { id: "veste-02", img: "/images/produits/veste-02/main.jpg" },
  { id: "veste-03", img: "/images/produits/veste-03/main.jpg" },
  { id: "veste-05", img: "/images/produits/veste-05/main.jpg" },
  { id: "veste-09", img: "/images/produits/veste-09/main.jpg" },
  { id: "veste-13", img: "/images/produits/veste-13/main.jpg" },
  { id: "veste-15", img: "/images/produits/veste-15/main.jpg" },
];

export default function HeroSlider() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [hasAnyImage, setHasAnyImage] = useState(false);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  function handleLoad(idx) {
    setLoaded(prev => ({ ...prev, [idx]: true }));
    setHasAnyImage(true);
  }

  function handleError(idx) {
    setLoaded(prev => ({ ...prev, [idx]: "error" }));
  }

  return (
    <section className="hero-slider">
      {/* Images en arrière-plan */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`hero-slider__slide ${idx === current ? "hero-slider__slide--active" : ""}`}
        >
          <img
            src={slide.img}
            alt=""
            className="hero-slider__img"
            onLoad={() => handleLoad(idx)}
            onError={() => handleError(idx)}
            style={{ opacity: loaded[idx] === true ? 1 : 0 }}
          />
          {/* Fond de marque élégant si pas d'image */}
          {loaded[idx] !== true && (
            <div className="hero-slider__brand-bg">
              <div className="hero-slider__brand-pattern" />
            </div>
          )}
        </div>
      ))}

      {/* Overlay dégradé */}
      <div className="hero-slider__overlay" />

      {/* Contenu texte */}
      <div className="hero-slider__content container">
        <p className="hero-slider__eyebrow eyebrow">{t("home.heroEyebrow")}</p>
        <h1 className="hero-slider__title">
          {t("home.heroTitle").split("\n").map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h1>
        <p className="hero-slider__sub">{t("home.heroSub")}</p>
        <div className="hero-slider__ctas">
          <Link to="/boutique" className="btn btn-white btn-lg">
            {t("home.ctaDiscover")}
          </Link>
          <Link to="/sur-mesure" className="btn hero-slider__cta-outline btn-lg">
            {t("home.ctaBespoke")}
          </Link>
        </div>
      </div>

      {/* Indicateurs (dots) */}
      <div className="hero-slider__dots">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            className={`hero-slider__dot ${idx === current ? "hero-slider__dot--active" : ""}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Flèches navigation */}
      <button className="hero-slider__arrow hero-slider__arrow--prev" onClick={prev} aria-label="Précédent">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button className="hero-slider__arrow hero-slider__arrow--next" onClick={next} aria-label="Suivant">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Indicateur de slide (numéro) */}
      <div className="hero-slider__counter">
        <span>{String(current + 1).padStart(2, "0")}</span>
        <span className="hero-slider__counter-sep" />
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      {/* Scroll indicator */}
      <div className="hero-slider__scroll">
        <span />
      </div>
    </section>
  );
}
