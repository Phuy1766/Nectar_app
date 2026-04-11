import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CartItem, getCart, saveCart, clearCart as clearCartStorage } from '@/services/storageService';

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  total: number;
  addItem: (product: Omit<CartItem, 'qty'>, qty?: number) => Promise<void>;
  updateQty: (id: string, delta: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await getCart();
        setItems(stored);
      } catch (err) {
        console.error('Failed to load cart:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Persist whenever items change (but not on initial load)
  useEffect(() => {
    if (loading) return;
    saveCart(items).catch((err) => console.error('Failed to save cart:', err));
  }, [items, loading]);

  const addItem = useCallback(async (product: Omit<CartItem, 'qty'>, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { ...product, qty }];
    });
  }, []);

  const updateQty = useCallback(async (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
    );
  }, []);

  const removeItem = useCallback(async (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(async () => {
    setItems([]);
    await clearCartStorage();
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ items, loading, total, addItem, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
