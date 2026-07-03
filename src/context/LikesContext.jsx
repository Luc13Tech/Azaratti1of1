import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { likesAPI } from "../api/api.js";
import { useAccount } from "./AccountContext.jsx";

export const LikesContext = createContext(null);
const KEY = "azaratti_likes";

export function LikesProvider({ children }) {
  const { user } = useAccount();
  const [liked, setLiked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  });

  // Sync depuis le backend quand l'utilisateur se connecte
  useEffect(() => {
    if (user) {
      likesAPI.getAll()
        .then(({ data }) => {
          const merged = Array.from(new Set([...liked, ...data.likedProducts]));
          setLiked(merged);
        })
        .catch(() => {});
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(liked));
  }, [liked]);

  const toggleLike = useCallback(async (productId) => {
    setLiked(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
    if (user) {
      try { await likesAPI.toggle(productId); } catch {}
    }
  }, [user]);

  const isLiked = useCallback((productId) => liked.includes(productId), [liked]);

  return (
    <LikesContext.Provider value={{ liked, toggleLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() { return useContext(LikesContext); }
