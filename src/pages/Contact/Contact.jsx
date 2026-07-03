import React, { useState } from "react";
import { useLang } from "../../context/LangContext.jsx";
import { contactAPI } from "../../api/api.js";
import { openWhatsApp } from "../../utils/whatsapp.js";
import "./Contact.css";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState("idle");

  function onChange(e) { setForm(f => ({...f, [e.target.name]: e.target.value})); }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      await contactAPI.send(form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="page contact">
      <div className="contact__header">
        <div className="container">
          <p className="eyebrow">{t("nav.contact")}</p>
          <h1 className="display-2">{t("contact.title")}</h1>
          <p className="contact__sub">{t("contact.sub")}</p>
        </div>
      </div>

      <div className="container contact__inner">
        {/* Form */}
        <div className="contact__form-wrap">
          {status === "success" ? (
            <div className="contact__success">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              <h2>{t("contact.successTitle")}</h2>
              <p>{t("contact.successText")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__form-row">
                <div className="field">
                  <label>{t("contact.name")}</label>
                  <input name="name" value={form.name} onChange={onChange} required placeholder="Votre nom" />
                </div>
                <div className="field">
                  <label>{t("contact.email")}</label>
                  <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="votre@email.com" />
                </div>
              </div>
              <div className="field">
                <label>{t("contact.subject")}</label>
                <input name="subject" value={form.subject} onChange={onChange} placeholder="Objet de votre message" />
              </div>
              <div className="field">
                <label>{t("contact.message")}</label>
                <textarea name="message" value={form.message} onChange={onChange} required rows={6} placeholder="Votre message..." />
              </div>
              {status === "error" && <p className="contact__error">{t("contact.error")}</p>}
              <button type="submit" className="btn btn-dark btn-lg" disabled={status==="loading"}>
                {status === "loading" ? t("contact.sending") : t("contact.send")}
              </button>
            </form>
          )}
        </div>

        {/* Info sidebar */}
        <div className="contact__info">
          {/* Bag image */}
          <div className="contact__bag">
            <img src="/images/logo/azaratti-bag.jpg" alt="AzaRatti 1 of 1" />
          </div>

          {/* Contact cards */}
          <div className="contact__cards">
            {/* WhatsApp */}
            <div className="contact__card">
              <div className="contact__card-icon" style={{background:"#25D366"}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              </div>
              <div>
                <p className="contact__card-title">{t("contact.whatsappTitle")}</p>
                <p className="contact__card-value">+221 779 398 484</p>
                <p className="contact__card-value">+221 770 720 202</p>
                <button className="btn btn-outline btn-sm contact__wa-btn" onClick={() => openWhatsApp("Bonjour AzaRatti, j'aimerais en savoir plus sur vos créations.")}>
                  {t("contact.whatsappBtn")}
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="contact__card">
              <div className="contact__card-icon" style={{background:"var(--gold)"}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
              </div>
              <div>
                <p className="contact__card-title">{t("contact.emailTitle")}</p>
                <a href="mailto:Contact@azaratti.com" className="contact__card-value contact__card-link">Contact@azaratti.com</a>
                <a href="https://www.azaratti.com" target="_blank" rel="noopener noreferrer" className="contact__card-value contact__card-link">www.azaratti.com</a>
              </div>
            </div>

            {/* Location */}
            <div className="contact__card">
              <div className="contact__card-icon" style={{background:"var(--ink)"}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p className="contact__card-title">{t("contact.addressTitle")}</p>
                <p className="contact__card-value">{t("contact.addressText")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
