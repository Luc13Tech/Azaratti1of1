import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import "./Maison.css";

export default function Maison() {
  const { t } = useLang();
  const values = [
    { key:"v1", icon:"◆" },
    { key:"v2", icon:"◈" },
    { key:"v3", icon:"◇" },
    { key:"v4", icon:"◉" },
  ];
  return (
    <main className="page maison">
      {/* Hero */}
      <section className="maison__hero">
        <div className="maison__hero-bg" />
        <div className="container maison__hero-content">
          <p className="eyebrow" style={{color:"var(--gold-light)"}}>{t("maison.title")}</p>
          <h1 className="display-1" style={{color:"#fff"}}>{t("maison.sub")}</h1>
        </div>
      </section>

      {/* Chapters */}
      <div className="container maison__chapters">
        {[
          { title: t("maison.chapter1Title"), text: t("maison.chapter1Text"), num: "01" },
          { title: t("maison.chapter2Title"), text: t("maison.chapter2Text"), num: "02" },
          { title: t("maison.chapter3Title"), text: t("maison.chapter3Text"), num: "03" },
        ].map((ch, i) => (
          <div key={i} className={`maison__chapter ${i%2===1?"maison__chapter--alt":""}`}>
            <div className="maison__chapter-num">{ch.num}</div>
            <div className="maison__chapter-body">
              <h2 className="maison__chapter-title">{ch.title}</h2>
              <div className="gold-line" style={{marginLeft:0,margin:"20px 0"}} />
              <p className="maison__chapter-text">{ch.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bag + Quote */}
      <section className="maison__quote-section">
        <div className="container maison__quote-inner">
          <div className="maison__quote-img">
            <img src="/images/logo/azaratti-bag.jpg" alt="AzaRatti 1 of 1" />
          </div>
          <div className="maison__quote-text">
            <span className="maison__quote-mark">"</span>
            <blockquote className="maison__quote">
              Une pièce. Un propriétaire. Une éternité.
            </blockquote>
            <cite className="maison__quote-cite">— AzaRatti 1 of 1</cite>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container maison__values">
        <div className="maison__values-head">
          <p className="eyebrow">{t("maison.valuesTitle")}</p>
          <div className="gold-line" style={{margin:"16px 0 56px"}} />
        </div>
        <div className="maison__values-grid">
          {values.map(v => (
            <div key={v.key} className="maison__value-card">
              <span className="maison__value-icon">{v.icon}</span>
              <h3 className="maison__value-title">{t(`maison.${v.key}Title`)}</h3>
              <p className="maison__value-text">{t(`maison.${v.key}Text`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="maison__cta-section">
        <div className="container maison__cta-inner">
          <h2 className="section-title" style={{color:"#fff"}}>Prêt à posséder votre pièce unique ?</h2>
          <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",marginTop:32}}>
            <Link to="/boutique" className="btn btn-white">{t("home.ctaDiscover")}</Link>
            <Link to="/sur-mesure" className="btn" style={{background:"var(--gold)",borderColor:"var(--gold)",color:"#fff"}}>{t("home.ctaBespoke")}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
