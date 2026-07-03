import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import { productsAPI } from "../../api/api.js";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import "./Boutique.css";

export default function Boutique() {
  const { t } = useLang();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const q = searchParams.get("q") || "";

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory !== "all") params.category = activeCategory;
    if (q) params.q = q;
    productsAPI.list(params)
      .then(({ data }) => {
        let list = data.products || [];
        if (sort === "asc") list = [...list].sort((a, b) => a.priceUSD - b.priceUSD);
        if (sort === "desc") list = [...list].sort((a, b) => b.priceUSD - a.priceUSD);
        setProducts(list);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [activeCategory, q, sort]);

  const cats = ["all","vestes","smoking","tweed"];

  return (
    <main className="page boutique">
      <div className="boutique__header">
        <div className="container boutique__header-inner">
          <p className="eyebrow">{t("boutique.title")}</p>
          <h1 className="display-2">{t("boutique.sub")}</h1>
        </div>
      </div>
      <div className="container boutique__body">
        <div className="boutique__toolbar">
          <div className="boutique__cats">
            {cats.map(c => (
              <button key={c} className={`boutique__cat-btn ${activeCategory===c?"boutique__cat-btn--active":""}`}
                onClick={() => { setActiveCategory(c); if(q) setSearchParams({}); }}>
                {t(`boutique.${c}`)}
              </button>
            ))}
          </div>
          <select className="boutique__sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">{t("boutique.sortDefault")}</option>
            <option value="asc">{t("boutique.sortPriceAsc")}</option>
            <option value="desc">{t("boutique.sortPriceDesc")}</option>
          </select>
        </div>
        {q && (
          <p className="boutique__search-info">
            Résultats : <strong>"{q}"</strong> — {products.length} pièce(s)
            <button onClick={() => setSearchParams({})} className="boutique__clear-search">✕</button>
          </p>
        )}
        {loading ? (
          <div className="boutique__grid">
            {Array.from({length:8}).map((_,i)=>(
              <div key={i}>
                <div className="skeleton" style={{aspectRatio:"3/4"}}/>
                <div className="skeleton" style={{height:18,margin:"14px 0 8px"}}/>
                <div className="skeleton" style={{height:14,width:"50%"}}/>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="boutique__empty">
            <p>{t("boutique.noResults")}</p>
          </div>
        ) : (
          <div className="boutique__grid">
            {products.map(p => <ProductCard key={p.productId} product={p} />)}
          </div>
        )}
      </div>
    </main>
  );
}
