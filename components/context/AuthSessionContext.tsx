'use client';

import { GetMe } from '@/actions/auth/GetMe';
import { AuthSafeUser } from '@/types/auth';
import { createContext, ReactNode, useState, useEffect, useContext } from 'react';

type AuthSessionContextType = {
  user?: AuthSafeUser;
  loading: boolean;
}

export const AuthSessionContext = createContext<AuthSessionContextType | undefined>(undefined);

export const AuthSessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthSafeUser | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {

      const user: AuthSafeUser = await GetMe();

      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthSessionContext.Provider value={{ user, loading }}>
      {children}
    </AuthSessionContext.Provider>
  );
};

export const useAuthSession = () => {
  const context = useContext(AuthSessionContext);

  if (context === undefined) {
    throw new Error('useAuthSession must be used within a AuthSessionProvider');
  }

  return context;
};