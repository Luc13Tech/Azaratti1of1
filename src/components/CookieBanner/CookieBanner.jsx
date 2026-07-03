import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import "./CookieBanner.css";

export default function CookieBanner() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("azaratti_cookie_consent");
    if (!consent) setTimeout(() => setVisible(true), 1500);
  }, []);

  function accept() {
    localStorage.setItem("azaratti_cookie_consent", "accepted");
    setVisible(false);
  }
  function decline() {
    localStorage.setItem("azaratti_cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__inner">
        <div className="cookie-banner__content">
          <p className="cookie-banner__title">{t("cookies.title")}</p>
          <p className="cookie-banner__text">
            {t("cookies.text")}{" "}
            <Link to="/confidentialite" className="cookie-banner__link">
              {t("footer.privacy")}
            </Link>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button className="btn btn-outline btn-sm" onClick={decline}>
            {t("cookies.decline")}
          </button>
          <button className="btn btn-dark btn-sm" onClick={accept}>
            {t("cookies.acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
