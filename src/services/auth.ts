import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/firebase/firebase';

class AuthService {
  private readonly provider = new GoogleAuthProvider();

  async signInWithGoogle(): Promise<UserCredential> {
    try {
      return await signInWithPopup(auth, this.provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw new Error('Failed to sign in with Google');
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw new Error('Failed to sign out');
    }
  }
}

export const authService = new AuthService();
