import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Ce composant fait défiler automatiquement vers le haut
// à chaque changement de page.
// Il doit être placé DANS le <BrowserRouter> dans App.jsx
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantané vers le haut à chaque changement de route
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null; // Ce composant ne rend rien visuellement
}
