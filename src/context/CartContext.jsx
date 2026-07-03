import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext(null);

const KEY = "azaratti_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const key = (pid, color, size) => `${pid}__${color}__${size}`;

  const addItem = useCallback((product, color, size, qty = 1) => {
    setItems(prev => {
      const k = key(product.productId || product.id, color, size);
      const ex = prev.find(i => i.key === k);
      if (ex) return prev.map(i => i.key === k ? { ...i, qty: i.qty + qty } : i);
      return [...prev, {
        key: k,
        productId: product.productId || product.id,
        name: product.name,
        priceUSD: product.priceUSD,
        image: Array.isArray(product.images) ? product.images[0] : "",
        edition: product.edition,
        color, size, qty,
      }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((k) => setItems(p => p.filter(i => i.key !== k)), []);
  const updateQty  = useCallback((k, qty) => setItems(p => p.map(i => i.key === k ? { ...i, qty: Math.max(1, qty) } : i)), []);
  const clearCart  = useCallback(() => setItems([]), []);

  const totalUSD   = items.reduce((s, i) => s + i.priceUSD * i.qty, 0);
  const totalCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalUSD, totalCount, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { return useContext(CartContext); }
