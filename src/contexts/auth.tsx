import { onAuthStateChanged, type User } from 'firebase/auth';
import { createContext, type ReactNode, useEffect, useState } from 'react';
import { auth } from '@/firebase/firebase';
import { RolesType } from '@/lib/types';
import { authService } from '@/services/auth';

type AuthState = {
  user: User | null;
  role: RolesType | null;
  isLoading: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
  role: null,
};

export const AuthContext = createContext<AuthState>(initialState);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let role: RolesType | null = null;

      if (user) {
        try {
          role = await authService.getCurrentUserRole();
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
      setState({
        user,
        isLoading: false,
        role,
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
