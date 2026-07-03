import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import { customAPI } from "../../api/api.js";
import "./SurMesure.css";

export default function SurMesure() {
  const { t, lang } = useLang();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref") || "";

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    size: "", color: "", fabric: "",
    instructions: "", relatedProductId: ref,
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function onChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      await customAPI.create({ ...form, lang });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="page sur-mesure">
        <div className="container sur-mesure__inner">
          <div className="sur-mesure__success">
            <div className="sur-mesure__success-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="12" r="10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <h2>{t("surMesure.successTitle")}</h2>
            <p>{t("surMesure.successText")}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page sur-mesure">
      <div className="sur-mesure__header">
        <div className="container">
          <p className="eyebrow">{t("nav.surMesure")}</p>
          <h1 className="display-2">{t("surMesure.title")}</h1>
          <p className="sur-mesure__sub">{t("surMesure.sub")}</p>
        </div>
      </div>

      <div className="container sur-mesure__inner">
        <form className="sur-mesure__form" onSubmit={handleSubmit}>
          {/* Step 1 */}
          <div className="sur-mesure__section">
            <p className="sur-mesure__step-title">01 — {t("surMesure.step1")}</p>
            <div className="sur-mesure__fields">
              <div className="field">
                <label>{t("surMesure.name")}</label>
                <input name="name" value={form.name} onChange={onChange} required placeholder="Jean Dupont" />
              </div>
              <div className="field">
                <label>{t("surMesure.email")}</label>
                <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="jean@email.com" />
              </div>
              <div className="field">
                <label>{t("surMesure.phone")}</label>
                <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+221 77 000 00 00" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="sur-mesure__section">
            <p className="sur-mesure__step-title">02 — {t("surMesure.step2")}</p>
            <div className="sur-mesure__fields">
              <div className="field">
                <label>{t("surMesure.size")}</label>
                <input name="size" value={form.size} onChange={onChange} placeholder="M / Tour de poitrine 98cm / ..." />
              </div>
              <div className="field">
                <label>{t("surMesure.color")}</label>
                <input name="color" value={form.color} onChange={onChange} placeholder="Noir profond, Bordeaux, Or antique..." />
              </div>
              <div className="field">
                <label>{t("surMesure.fabric")}</label>
                <input name="fabric" value={form.fabric} onChange={onChange} placeholder="Laine vierge, Tweed, Velours, Satin..." />
              </div>
              {ref && (
                <div className="field">
                  <label>{t("surMesure.reference")}</label>
                  <input name="relatedProductId" value={form.relatedProductId} readOnly style={{opacity:0.6}} />
                </div>
              )}
            </div>
          </div>

          {/* Step 3 */}
          <div className="sur-mesure__section">
            <p className="sur-mesure__step-title">03 — {t("surMesure.step3")}</p>
            <div className="field">
              <label>{t("surMesure.instructions")}</label>
              <textarea
                name="instructions"
                value={form.instructions}
                onChange={onChange}
                required
                placeholder={t("surMesure.instructionsPlaceholder")}
                rows={6}
              />
            </div>
          </div>

          {status === "error" && (
            <p className="sur-mesure__error">{t("surMesure.error")}</p>
          )}

          <div className="sur-mesure__submit-wrap">
            <p className="sur-mesure__required">{t("surMesure.required")}</p>
            <button type="submit" className="btn btn-dark btn-lg sur-mesure__submit" disabled={status === "loading"}>
              {status === "loading" ? t("surMesure.sending") : t("surMesure.submit")}
            </button>
          </div>
        </form>

        {/* Side info */}
        <div className="sur-mesure__aside">
          <div className="sur-mesure__aside-card">
            <img src="/images/logo/azaratti-bag.jpg" alt="AzaRatti" className="sur-mesure__aside-bag" />
            <div className="gold-line" style={{margin:"24px 0"}} />
            <p className="eyebrow" style={{marginBottom:12}}>AzaRatti 1 of 1</p>
            <p className="sur-mesure__aside-text">
              Chaque pièce sur mesure est unique. Notre équipe vous contactera sous 48h pour affiner chaque détail de votre création.
            </p>
            <div className="sur-mesure__contact-info">
              <a href="mailto:Contact@azaratti.com" className="sur-mesure__contact-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                Contact@azaratti.com
              </a>
              <a href="https://wa.me/221779398484" target="_blank" rel="noopener noreferrer" className="sur-mesure__contact-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                +221 779 398 484
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
