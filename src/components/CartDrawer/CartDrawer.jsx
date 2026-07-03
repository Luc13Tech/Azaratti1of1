import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { sendCartToWhatsApp } from "../../utils/whatsapp.js";
import { ordersAPI } from "../../api/api.js";
import "./CartDrawer.css";

export default function CartDrawer() {
  const { t, tF, lang } = useLang();
  const { items, removeItem, updateQty, clearCart, totalUSD, totalCount, open, setOpen } = useCart();

  async function handleCheckout() {
    try {
      await ordersAPI.create({ items, totalUSD });
    } catch {}
    sendCartToWhatsApp(items, totalUSD, lang, t, tF);
  }

  return (
    <>
      {/* Backdrop */}
      {open && <div className="cart-backdrop" onClick={() => setOpen(false)} />}

      {/* Drawer */}
      <div className={`cart-drawer ${open ? "cart-drawer--open" : ""}`}>
        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            {t("cart.title")}
            {totalCount > 0 && <span className="cart-drawer__count">({totalCount})</span>}
          </h2>
          <button className="cart-drawer__close" onClick={() => setOpen(false)} aria-label={t("common.close")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <hr className="hairline" />

        {/* Body */}
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                  <path d="M6 7h12l-1.2 12H7.2L6 7z"/><path d="M9.5 7a2.5 2.5 0 0 1 5 0"/>
                </svg>
              </div>
              <p className="cart-drawer__empty-text">{t("cart.empty")}</p>
              <p className="cart-drawer__empty-sub">{t("cart.emptySub")}</p>
              <Link to="/boutique" className="btn btn-dark btn-sm" onClick={() => setOpen(false)}>
                {t("cart.emptyCta")}
              </Link>
            </div>
          ) : (
            <ul className="cart-drawer__list">
              {items.map(item => {
                const name = tF ? tF(item.name) : (item.name?.[lang] || item.name?.fr || "Article");
                return (
                  <li key={item.key} className="cart-item">
                    {/* Image */}
                    <div className="cart-item__img">
                      {item.image ? (
                        <img src={item.image} alt={name} />
                      ) : (
                        <div className="cart-item__img-placeholder">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="cart-item__info">
                      <p className="cart-item__name">{name}</p>
                      <p className="cart-item__meta">
                        {t("cart.size")} : {item.size} · {t("cart.color")} : {item.color}
                      </p>
                      <p className="cart-item__edition">{item.edition}</p>

                      {/* Qty + remove */}
                      <div className="cart-item__actions">
                        <div className="cart-item__qty">
                          <button onClick={() => updateQty(item.key, item.qty - 1)} disabled={item.qty <= 1}>−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                        </div>
                        <button className="cart-item__remove" onClick={() => removeItem(item.key)}>
                          {t("cart.remove")}
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="cart-item__price">
                      ${(item.priceUSD * item.qty).toLocaleString()}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <hr className="hairline" />
            <div className="cart-drawer__total">
              <span>{t("cart.total")}</span>
              <span className="cart-drawer__total-amount">${totalUSD.toLocaleString()} USD</span>
            </div>
            <p className="cart-drawer__note">{t("cart.checkoutNote")}</p>
            <button className="btn btn-dark w-full cart-drawer__checkout" onClick={handleCheckout}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
              {t("cart.checkout")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
