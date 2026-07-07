import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import "./HeroSlider.css";

// Images du slider — dossier SÉPARÉ /public/images/slider/
// Ces images sont UNIQUEMENT pour le hero, jamais dans la boutique
// Place tes 7 photos dans : public/images/slider/slide-1.jpg ... slide-7.jpg
const SLIDES = [
  { id: 1, img: "/images/slider/slide-1.jpg" },
  { id: 2, img: "/images/slider/slide-2.jpg" },
  { id: 3, img: "/images/slider/slide-3.jpg" },
  { id: 4, img: "/images/slider/slide-4.jpg" },
  { id: 5, img: "/images/slider/slide-5.jpg" },
  { id: 6, img: "/images/slider/slide-6.jpg" },
  { id: 7, img: "/images/slider/slide-7.jpg" },
];

export default function HeroSlider() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState({});

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="hero-slider">
      {SLIDES.map((slide, idx) => (
        <div key={slide.id}
          className={`hero-slider__slide ${idx === current ? "hero-slider__slide--active" : ""}`}>
          {loaded[idx] !== "error" ? (
            <img
              src={slide.img}
              alt=""
              className="hero-slider__img"
              onLoad={() => setLoaded(p => ({...p, [idx]: true}))}
              onError={() => setLoaded(p => ({...p, [idx]: "error"}))}
              style={{ opacity: loaded[idx] === true ? 1 : 0 }}
            />
          ) : null}
          {/* Fond élégant si pas encore d'image */}
          {loaded[idx] !== true && (
            <div className="hero-slider__brand-bg">
              <div className="hero-slider__brand-pattern" />
            </div>
          )}
        </div>
      ))}

      <div className="hero-slider__overlay" />

      <div className="hero-slider__content container">
        <p className="hero-slider__eyebrow eyebrow">{t("home.heroEyebrow")}</p>
        <h1 className="hero-slider__title">
          {t("home.heroTitle").split("\n").map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h1>
        <p className="hero-slider__sub">{t("home.heroSub")}</p>
        <div className="hero-slider__ctas">
          <Link to="/boutique" className="btn btn-white btn-lg">{t("home.ctaDiscover")}</Link>
          <Link to="/sur-mesure" className="btn hero-slider__cta-outline btn-lg">{t("home.ctaBespoke")}</Link>
        </div>
      </div>

      <div className="hero-slider__dots">
        {SLIDES.map((_, idx) => (
          <button key={idx}
            className={`hero-slider__dot ${idx === current ? "hero-slider__dot--active" : ""}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

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

      <div className="hero-slider__counter">
        <span>{String(current + 1).padStart(2, "0")}</span>
        <span className="hero-slider__counter-sep" />
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
