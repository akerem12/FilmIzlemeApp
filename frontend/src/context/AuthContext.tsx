import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthUser } from "../types";

const STORAGE_KEY = "filmapp_user";

interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUserInfo: (partial: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = (u: AuthUser) => setUser(u);
  const logout = () => setUser(null);
  const updateUserInfo = (partial: Partial<AuthUser>) =>
    setUser((prev) => (prev ? { ...prev, ...partial } : prev));

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
