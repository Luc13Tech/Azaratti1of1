import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { sendCartToWhatsApp } from "../../utils/whatsapp.js";
import { ordersAPI } from "../../api/api.js";
import "./Panier.css";

export default function Panier() {
  const { t, tF, lang } = useLang();
  const { items, removeItem, updateQty, totalUSD, totalCount } = useCart();

  async function handleCheckout() {
    try { await ordersAPI.create({ items, totalUSD }); } catch {}
    sendCartToWhatsApp(items, totalUSD, lang, t, tF);
  }

  return (
    <main className="page panier">
      <div className="container panier__inner">
        <div className="panier__header">
          <p className="eyebrow">{t("nav.cart")}</p>
          <h1 className="display-2">{t("cart.title")}</h1>
        </div>

        {items.length === 0 ? (
          <div className="panier__empty">
            <div className="panier__empty-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                <path d="M6 7h12l-1.2 12H7.2L6 7z"/><path d="M9.5 7a2.5 2.5 0 0 1 5 0"/>
              </svg>
            </div>
            <h2>{t("cart.empty")}</h2>
            <p>{t("cart.emptySub")}</p>
            <Link to="/boutique" className="btn btn-dark btn-lg">{t("cart.emptyCta")}</Link>
          </div>
        ) : (
          <div className="panier__layout">
            {/* Items list */}
            <div className="panier__items">
              {items.map(item => {
                const name = tF ? tF(item.name) : (item.name?.[lang] || "Article");
                return (
                  <div key={item.key} className="panier-item">
                    <div className="panier-item__img">
                      {item.image ? (
                        <img src={item.image} alt={name} />
                      ) : (
                        <div className="panier-item__img-ph">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                        </div>
                      )}
                    </div>
                    <div className="panier-item__info">
                      <Link to={`/produit/${item.productId}`} className="panier-item__name">{name}</Link>
                      <p className="panier-item__edition">{item.edition}</p>
                      <p className="panier-item__meta">{t("cart.color")} : {item.color} · {t("cart.size")} : {item.size}</p>
                      <div className="panier-item__actions">
                        <div className="panier-item__qty">
                          <button onClick={() => updateQty(item.key, item.qty - 1)} disabled={item.qty <= 1}>−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                        </div>
                        <button className="panier-item__remove" onClick={() => removeItem(item.key)}>{t("cart.remove")}</button>
                      </div>
                    </div>
                    <div className="panier-item__price">
                      <span>${(item.priceUSD * item.qty).toLocaleString()}</span>
                      <span className="panier-item__unit">USD</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="panier__summary">
              <div className="panier__summary-inner">
                <h2 className="panier__summary-title">Récapitulatif</h2>
                <div className="panier__summary-rows">
                  <div className="panier__summary-row">
                    <span>{t("cart.subtotal")} ({totalCount} article{totalCount > 1 ? "s" : ""})</span>
                    <span>${totalUSD.toLocaleString()} USD</span>
                  </div>
                  <div className="panier__summary-row panier__summary-row--shipping">
                    <span>Livraison</span>
                    <span style={{color:"var(--gold)"}}>À confirmer</span>
                  </div>
                </div>
                <div className="panier__summary-total">
                  <span>{t("cart.total")}</span>
                  <span>${totalUSD.toLocaleString()} USD</span>
                </div>
                <button className="btn panier__checkout-btn" onClick={handleCheckout}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                  </svg>
                  {t("cart.checkout")}
                </button>
                <p className="panier__checkout-note">{t("cart.checkoutNote")}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
