import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useLikes } from "../../context/LikesContext.jsx";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { t, tF } = useLang();
  const { addItem } = useCart();
  const { isLiked, toggleLike } = useLikes();
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  const liked = isLiked(product.productId);
  const name   = tF(product.name);
  const img    = product.images?.[0];

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.colors?.[0]?.id || "default", "M");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleLike(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(product.productId);
  }

  return (
    <Link to={`/produit/${product.productId}`} className="product-card">
      {/* Image */}
      <div className="product-card__img-wrap">
        {img && !imgError ? (
          <img
            src={img}
            alt={name}
            className="product-card__img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="product-card__placeholder">
            <div className="product-card__placeholder-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span className="product-card__placeholder-text">{name}</span>
          </div>
        )}

        {/* Edition badge */}
        <span className="product-card__edition">{product.edition}</span>

        {/* Like button */}
        <button
          className={`product-card__like ${liked ? "product-card__like--active" : ""}`}
          aria-label={liked ? t("product.unlike") : t("product.like")}
          onClick={handleLike}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Hover overlay */}
        <div className="product-card__overlay">
          <button
            className={`product-card__add ${added ? "product-card__add--done" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? t("product.addedToCart") : t("product.addToCart")}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <p className="product-card__name">{name}</p>
        <p className="product-card__price">${product.priceUSD?.toLocaleString()} USD</p>

        {/* Color dots */}
        {product.colors?.length > 0 && (
          <div className="product-card__colors">
            {product.colors.slice(0, 4).map(c => (
              <span
                key={c.id}
                className="product-card__color-dot"
                style={{ background: c.hex }}
                title={tF(c.label)}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
