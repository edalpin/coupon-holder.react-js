import { onAuthStateChanged, type User } from 'firebase/auth';
import { createContext, type ReactNode, useEffect, useState } from 'react';
import { auth } from '@/firebase/firebase';

type AuthState = {
  user: User | null;
  isLoading: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

export const AuthContext = createContext<AuthState>(initialState);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState({
        user,
        isLoading: false,
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {!state.isLoading && children}
    </AuthContext.Provider>
  );
};
