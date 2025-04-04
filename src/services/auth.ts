import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { userService } from './users';

class AuthService {
  private readonly provider = new GoogleAuthProvider();

  getLoggedUserUid = async (): Promise<string> => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be authenticated to access campaigns');
    }
    return user.uid;
  };

  signInWithGoogle = async (): Promise<UserCredential> => {
    try {
      const userCredential = await signInWithPopup(auth, this.provider);
      const additionalUserInfo = getAdditionalUserInfo(userCredential);

      if (additionalUserInfo?.isNewUser) {
        await userService.createUser(userCredential);
      }

      return userCredential;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw new Error('Failed to sign in with Google');
    }
  };

  signOut = async (): Promise<void> => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw new Error('Failed to sign out');
    }
  };
}

export const authService = new AuthService();
