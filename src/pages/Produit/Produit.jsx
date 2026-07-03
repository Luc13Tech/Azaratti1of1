import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useLikes } from "../../context/LikesContext.jsx";
import { productsAPI } from "../../api/api.js";
import "./Produit.css";

export default function Produit() {
  const { id } = useParams();
  const { t, tF } = useLang();
  const { addItem } = useCart();
  const { isLiked, toggleLike } = useLikes();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    setLoading(true);
    setMainImg(0); setSelectedColor(null); setSelectedSize(null); setAdded(false); setError(""); setImgErrors({});
    productsAPI.getById(id)
      .then(({ data }) => { setProduct(data.product); setSelectedColor(data.product.colors?.[0]?.id || null); })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAddToCart() {
    if (!selectedSize) { setError(t("product.selectSizeFirst")); return; }
    setError("");
    addItem(product, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  if (loading) return (
    <main className="page produit-loading">
      <div className="container">
        <div className="produit-skeleton">
          <div className="skeleton produit-skeleton__img" />
          <div className="produit-skeleton__info">
            <div className="skeleton" style={{height:14,width:"30%",marginBottom:20}} />
            <div className="skeleton" style={{height:40,width:"80%",marginBottom:12}} />
            <div className="skeleton" style={{height:30,width:"25%",marginBottom:32}} />
            <div className="skeleton" style={{height:52,width:"100%",marginTop:32}} />
          </div>
        </div>
      </div>
    </main>
  );

  if (!product) return (
    <main className="page produit-notfound">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>{t("product.unavailable")}</h1>
        <Link to="/boutique" className="btn btn-dark" style={{marginTop:24}}>{t("product.back")}</Link>
      </div>
    </main>
  );

  const liked = isLiked(product.productId);
  const name = tF(product.name);
  const desc = tF(product.description);
  const selectedColorObj = product.colors?.find(c => c.id === selectedColor);

  return (
    <main className="page produit">
      <div className="container produit__inner">
        <nav className="produit__breadcrumb">
          <Link to="/boutique">{t("product.back")}</Link>
          <span>›</span>
          <span>{name}</span>
        </nav>

        <div className="produit__layout">
          {/* Gallery */}
          <div className="produit__gallery">
            <div className="produit__main-img">
              {product.images?.[mainImg] && !imgErrors[mainImg] ? (
                <img src={product.images[mainImg]} alt={name} onError={() => setImgErrors(p=>({...p,[mainImg]:true}))} />
              ) : (
                <div className="produit__img-placeholder">
                  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  <p>{name}</p>
                  <span className="eyebrow">{product.edition}</span>
                </div>
              )}
              <button className={`produit__like-btn ${liked?"active":""}`} onClick={() => toggleLike(product.productId)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill={liked?"currentColor":"none"} stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            {product.images?.length > 1 && (
              <div className="produit__thumbs">
                {product.images.map((img, i) => (
                  <button key={i} className={`produit__thumb ${mainImg===i?"active":""}`} onClick={() => setMainImg(i)}>
                    {img && !imgErrors[i] ? (
                      <img src={img} alt="" onError={() => setImgErrors(p=>({...p,[i]:true}))} />
                    ) : <div className="produit__thumb-placeholder" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="produit__info">
            <span className="eyebrow produit__edition">{product.edition}</span>
            <h1 className="produit__name">{name}</h1>
            <p className="produit__price">${product.priceUSD?.toLocaleString()}<span> USD</span></p>
            <div className="produit__divider" />

            {product.colors?.length > 0 && (
              <div className="produit__option">
                <p className="produit__option-label">{t("product.color")}{selectedColorObj && <strong> — {tF(selectedColorObj.label)}</strong>}</p>
                <div className="produit__colors">
                  {product.colors.map(c => (
                    <button key={c.id} className={`produit__color ${selectedColor===c.id?"active":""}`} style={{background:c.hex}} title={tF(c.label)} onClick={() => setSelectedColor(c.id)} />
                  ))}
                  <button className="produit__color-custom" title="Sur mesure" onClick={() => window.location.href=`/sur-mesure?ref=${product.productId}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>
              </div>
            )}

            <div className="produit__option">
              <p className="produit__option-label">{t("product.size")}</p>
              <div className="produit__sizes">
                {product.sizes?.map(s => (
                  <button key={s} className={`produit__size-btn ${selectedSize===s?"active":""}`} onClick={() => {setSelectedSize(s);setError("");}}>
                    {s}
                  </button>
                ))}
              </div>
              {error && <p className="produit__error">{error}</p>}
            </div>

            <button className={`btn produit__add-btn ${added?"produit__add-btn--done":"btn-dark"}`} onClick={handleAddToCart}>
              {added ? t("product.addedToCart") : t("product.addToCart")}
            </button>

            <div className="produit__desc">
              <h3>{t("product.description")}</h3>
              <p>{desc}</p>
            </div>

            <div className="produit__details">
              <div className="produit__detail-row"><span>SKU</span><span>{product.sku}</span></div>
              <div className="produit__detail-row"><span>{t("product.edition")}</span><span>{product.edition}</span></div>
              <div className="produit__detail-row"><span>Catégorie</span><span style={{textTransform:"capitalize"}}>{product.category}</span></div>
            </div>

            <div className="produit__custom-cta">
              <div>
                <p className="produit__custom-title">{t("product.customTitle")}</p>
                <p className="produit__custom-text">{t("product.customText")}</p>
              </div>
              <Link to={`/sur-mesure?ref=${product.productId}`} className="btn btn-outline btn-sm">{t("product.customCta")}</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
