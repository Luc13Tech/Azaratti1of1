import React from "react";
import "./Loader.css";

// Spinner pleine page (utilisé dans Suspense)
export function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader__logo">
        <img src="/images/logo/azaratti-logo.jpg" alt="AzaRatti" />
      </div>
      <div className="page-loader__spinner" />
    </div>
  );
}

// Spinner inline (utilisé dans les composants)
export function Spinner({ size = 24 }) {
  return (
    <span
      className="spinner"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Chargement..."
    />
  );
}

// Skeleton card (placeholder produit)
export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-card__img" />
      <div className="skeleton-card__body">
        <div className="skeleton skeleton-card__title" />
        <div className="skeleton skeleton-card__price" />
      </div>
    </div>
  );
}

// Skeleton grid (grille de produits en chargement)
export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default PageLoader;
