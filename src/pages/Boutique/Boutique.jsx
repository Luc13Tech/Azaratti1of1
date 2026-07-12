import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLang } from "../../context/LangContext.jsx";
import { productsAPI } from "../../api/api.js";
import { products as staticProducts } from "../../data/siteData.js";
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

    // ✅ CORRECTION : Fonction pour normaliser les produits (s'assurer que les images sont correctes)
    const normalizeProducts = (list) => {
      return list.map(p => {
        // ✅ S'assurer que les images existent
        let images = p.images || [];
        
        // ✅ Si pas d'images, construire le chemin à partir de l'ID
        if (!images || images.length === 0) {
          const productId = p.productId || p.id || '';
          const num = productId.split('-')[1] || productId;
          images = [`/images/produits/main-${num}.jpg`];
        }
        
        // ✅ Retourner le produit avec les images corrigées
        return {
          ...p,
          images: images,
          // ✅ S'assurer que productId existe
          productId: p.productId || p.id || `product-${p.id || ''}`
        };
      });
    };

    const applyFiltersAndSort = (list) => {
      let result = [...list];
      if (activeCategory !== "all") {
        result = result.filter(p => p.category === activeCategory);
      }
      if (q) {
        const qLow = q.toLowerCase();
        result = result.filter(p => {
          const name = p.name?.fr || p.name?.en || "";
          return name.toLowerCase().includes(qLow);
        });
      }
      if (sort === "asc") result.sort((a,b) => a.priceUSD - b.priceUSD);
      if (sort === "desc") result.sort((a,b) => b.priceUSD - a.priceUSD);
      return result;
    };

    // ✅ AJOUT : Log pour déboguer
    console.log("[Boutique] Récupération des produits...");
    
    productsAPI.list({ category: activeCategory !== "all" ? activeCategory : undefined, q: q || undefined })
      .then(({ data }) => {
        console.log("[Boutique] Données reçues de l'API:", data);
        const apiList = data.products || [];
        
        if (apiList.length > 0) {
          // ✅ Normaliser les données de l'API
          const normalized = normalizeProducts(apiList);
          console.log("[Boutique] Produits normalisés:", normalized);
          setProducts(applyFiltersAndSort(normalized));
        } else {
          // Fallback données statiques
          console.log("[Boutique] Utilisation des données statiques");
          const normalized = normalizeProducts(staticProducts);
          setProducts(applyFiltersAndSort(normalized));
        }
      })
      .catch((err) => {
        console.error("[Boutique] Erreur API, utilisation des données statiques:", err);
        // ✅ Normaliser les données statiques
        const normalized = normalizeProducts(staticProducts);
        setProducts(applyFiltersAndSort(normalized));
      })
      .finally(() => setLoading(false));
  }, [activeCategory, q, sort]);

  const cats = ["all","vestes","smoking","tweed"];

  return (
    <main className="page boutique">
      <div className="boutique__header">
        <div className="container">
          <p className="eyebrow">{t("boutique.title")}</p>
          <h1 className="section-title">{t("boutique.sub")}</h1>
        </div>
      </div>

      <div className="container boutique__body">
        <div className="boutique__toolbar">
          <div className="boutique__cats">
            {cats.map(c => (
              <button key={c}
                className={`boutique__cat-btn ${activeCategory===c?"boutique__cat-btn--active":""}`}
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
                <div className="skeleton boutique__skeleton-img" />
                <div className="skeleton boutique__skeleton-title" />
                <div className="skeleton boutique__skeleton-price" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="boutique__empty"><p>{t("boutique.noResults")}</p></div>
        ) : (
          <div className="boutique__grid">
            {products.map(p => (
              <ProductCard key={p.productId || p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
            }
