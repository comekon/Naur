"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode, useCallback } from "react";

/* ── Types ── */

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
  category: string;
  quantity: number;
  options: {
    sugar?: string;
    temperature?: string;
    size?: string;
  };
}

interface CartState {
  items: CartItem[];
  voucherCode: string;
  discount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "UPDATE_QTY"; payload: { productId: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_VOUCHER"; payload: { code: string; discount: number } }
  | { type: "LOAD_STATE"; payload: CartState };

interface CartContextValue {
  items: CartItem[];
  voucherCode: string;
  discount: number;
  subtotal: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQty: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  applyVoucher: (code: string) => void;
}

/* ── Helpers ── */

const STORAGE_KEY = "naur-cart";

function loadState(): CartState {
  if (typeof window === "undefined") return { items: [], voucherCode: "", discount: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { items: [], voucherCode: "", discount: 0 };
}

function saveState(state: CartState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}

/* ── Reducer ── */

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { quantity = 1, ...item } = action.payload;
      const existing = state.items.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...item, quantity }] };
    }
    case "UPDATE_QTY":
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.productId !== action.payload.productId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.payload.productId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.productId !== action.payload.productId) };
    case "CLEAR_CART":
      return { items: [], voucherCode: "", discount: 0 };
    case "APPLY_VOUCHER":
      return { ...state, voucherCode: action.payload.code, discount: action.payload.discount };
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}

/* ── Context ── */

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], voucherCode: "", discount: 0 });

  useEffect(() => {
    dispatch({ type: "LOAD_STATE", payload: loadState() });
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = Math.max(0, subtotal - state.discount);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) =>
      dispatch({ type: "ADD_ITEM", payload: item }),
    []
  );
  const updateQty = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { productId, quantity } }),
    []
  );
  const removeItem = useCallback(
    (productId: string) =>
      dispatch({ type: "REMOVE_ITEM", payload: { productId } }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const applyVoucher = useCallback(
    (code: string) => {
      if (code.toUpperCase() === "NAUR10") {
        dispatch({ type: "APPLY_VOUCHER", payload: { code, discount: subtotal * 0.1 } });
      }
    },
    [subtotal]
  );

  return (
    <CartContext.Provider
      value={{ items: state.items, voucherCode: state.voucherCode, discount: state.discount, subtotal, total, addItem, updateQty, removeItem, clearCart, applyVoucher }}
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
