import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  StoredUser,
  getUser,
  saveUser as saveUserStorage,
  clearAuth,
} from '@/services/storageService';

interface AuthContextType {
  user: StoredUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<StoredUser>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Try to restore user from storage
  useEffect(() => {
    (async () => {
      try {
        const stored = await getUser();
        if (stored) setUser(stored);
      } catch (err) {
        console.error('Failed to restore user:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    const newUser: StoredUser = {
      id: 'u1',
      name: 'Afsar Hossen',
      email,
      loginAt: Date.now(),
    };
    const fakeToken = `tok_${Date.now()}`;
    await saveUserStorage(newUser, fakeToken);
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    await clearAuth();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
