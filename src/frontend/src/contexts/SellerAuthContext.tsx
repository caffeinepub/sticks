import { createContext, useState, useEffect, ReactNode } from 'react';

interface SellerAuthContextType {
  email: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const SellerAuthContext = createContext<SellerAuthContextType | undefined>(undefined);

const STORAGE_KEY = 'sticksmart_seller_auth';

interface StoredAuth {
  email: string;
  passwordHash: string;
}

export function SellerAuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const auth: StoredAuth = JSON.parse(stored);
        setEmail(auth.email);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  const login = async (loginEmail: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const allAccounts = getAllAccounts();
      const passwordHash = await hashPassword(password);
      const account = allAccounts.find(
        (acc) => acc.email === loginEmail && acc.passwordHash === passwordHash
      );

      if (account) {
        setEmail(loginEmail);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (signupEmail: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const allAccounts = getAllAccounts();
      if (allAccounts.some((acc) => acc.email === signupEmail)) {
        return false;
      }

      const passwordHash = await hashPassword(password);
      const newAccount: StoredAuth = { email: signupEmail, passwordHash };

      allAccounts.push(newAccount);
      localStorage.setItem('sticksmart_all_sellers', JSON.stringify(allAccounts));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAccount));

      setEmail(signupEmail);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getAllAccounts = (): StoredAuth[] => {
    const stored = localStorage.getItem('sticksmart_all_sellers');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  return (
    <SellerAuthContext.Provider
      value={{
        email,
        isAuthenticated: !!email,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </SellerAuthContext.Provider>
  );
}
