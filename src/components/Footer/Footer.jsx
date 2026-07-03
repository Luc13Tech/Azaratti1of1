import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import "./Footer.css";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top section — bag image + brand message */}
      <div className="footer__brand-bar">
        <div className="container footer__brand-inner">
          <div className="footer__bag-wrap">
            <img src="/images/logo/azaratti-bag.jpg" alt="AzaRatti 1 of 1 — Luxury Bag" className="footer__bag" />
          </div>
          <div className="footer__brand-text">
            <span className="eyebrow">AzaRatti 1 of 1</span>
            <h3 className="footer__brand-title">{t("footer.tagline")}</h3>
            <p className="footer__brand-sub">{t("footer.madeWith")}</p>
          </div>
        </div>
      </div>

      <hr className="hairline" />

      {/* Main links */}
      <div className="footer__main container">
        {/* Col 1 */}
        <div className="footer__col">
          <Link to="/" className="footer__logo-link">
            <img src="/images/logo/azaratti-logo.jpg" alt="AzaRatti" className="footer__logo" />
          </Link>
          <p className="footer__desc">
            Chaque pièce AzaRatti est une édition unique, façonnée à la main, numérotée, et ne sera jamais reproduite.
          </p>
        </div>

        {/* Col 2 — Navigation */}
        <div className="footer__col">
          <p className="footer__col-title">{t("footer.col1")}</p>
          <nav className="footer__nav">
            <Link to="/boutique" className="footer__link">{t("nav.boutique")}</Link>
            <Link to="/sur-mesure" className="footer__link">{t("nav.surMesure")}</Link>
            <Link to="/maison" className="footer__link">{t("nav.maison")}</Link>
            <Link to="/contact" className="footer__link">{t("nav.contact")}</Link>
            <Link to="/compte" className="footer__link">{t("nav.account")}</Link>
          </nav>
        </div>

        {/* Col 3 — Legal */}
        <div className="footer__col">
          <p className="footer__col-title">{t("footer.col2")}</p>
          <nav className="footer__nav">
            <Link to="/confidentialite" className="footer__link">{t("footer.privacy")}</Link>
            <Link to="/confidentialite#cookies" className="footer__link">{t("footer.cookies")}</Link>
            <Link to="/confidentialite#terms" className="footer__link">{t("footer.terms")}</Link>
          </nav>
        </div>

        {/* Col 4 — Contact */}
        <div className="footer__col">
          <p className="footer__col-title">{t("footer.col3")}</p>
          <div className="footer__contact">
            <a href="mailto:azarattiof@gmail.com" className="footer__contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m2 7 10 7 10-7"/>
              </svg>
              azarattiof@gmail.com
            </a>
            <a href="https://wa.me/229779398484" target="_blank" rel="noopener noreferrer" className="footer__contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
              +229 779 398 484
            </a>
            <span className="footer__contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Bénin, Afrique de l'Ouest
            </span>
          </div>
        </div>
      </div>

      <hr className="hairline" />

      {/* Bottom bar */}
      <div className="footer__bottom container">
        <p className="footer__copy">© {year} AzaRatti 1 of 1. {t("footer.rights")}</p>
        <div className="footer__gold-line">
          <span />
        </div>
      </div>
    </footer>
  );
}
