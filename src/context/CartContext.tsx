"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { CartLineItem } from "@/types/catalog";
import {
  trackAddToCart,
  trackRemoveFromCart,
  mapProductToAnalyticsItem,
} from "@/lib/analytics/events";

interface CartContextValue {
  items: CartLineItem[];
  addItem: (item: CartLineItem) => { ok: boolean; error?: string };
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "drywell-cart-v2";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      setItems([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((item: CartLineItem) => {
    if (item.productType !== "online_purchase") {
      return { ok: false, error: "This product requires a quote instead of checkout." };
    }

    setItems((prev) => {
      const found = prev.find((i) => i.productId === item.productId);
      const next = found
        ? prev.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prev, item];

      trackAddToCart(
        mapProductToAnalyticsItem(
          { id: item.productId, name: item.name, categorySlug: item.categorySlug, price: item.price },
          item.quantity
        ),
        item.price * item.quantity
      );

      return next;
    });

    return { ok: true };
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.productId === productId);
      if (item) {
        trackRemoveFromCart(
          mapProductToAnalyticsItem(
            { id: item.productId, name: item.name, categorySlug: item.categorySlug, price: item.price },
            item.quantity
          ),
          item.price * item.quantity
        );
      }
      return prev.filter((i) => i.productId !== productId);
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, [removeItem]);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 149;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, setQuantity, clear, count, subtotal, shipping, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
