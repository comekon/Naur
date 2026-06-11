"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode, useCallback } from "react";

/* ── Types ── */

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "LOAD"; payload: User | null };

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

/* ── Mock Users ── */

const STORAGE_KEY = "naur-auth";

const mockUsers: (User & { password: string })[] = [
  { id: "u1", name: "User Demo", email: "user@naur.id", role: "user", password: "user123" },
  { id: "u2", name: "Admin Naur", email: "admin@naur.id", role: "admin", password: "admin123" },
];

/* ── Reducer ── */

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, loading: false };
    case "LOGOUT":
      return { user: null, loading: false };
    case "LOAD":
      return { user: action.payload, loading: false };
    default:
      return state;
  }
}

/* ── Context ── */

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { user: null, loading: true });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "LOAD", payload: JSON.parse(raw) });
    } catch { /* ignore */ }
    dispatch({ type: "LOAD", payload: null });
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const found = mockUsers.find((u) => u.email === email && u.password === password);
    if (!found) return false;
    const { password: _, ...user } = found;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: user });
    return true;
  }, []);

  const register = useCallback((name: string, email: string, password: string): boolean => {
    if (mockUsers.some((u) => u.email === email)) return false;
    const newUser: User & { password: string } = { id: `u${Date.now()}`, name, email, role: "user", password };
    mockUsers.push(newUser);
    const { password: _, ...user } = newUser;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: user });
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
