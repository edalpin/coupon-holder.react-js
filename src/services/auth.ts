import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
import { COLLECTIONS } from '@/lib/constants';
import { User, Roles, RolesType } from '@/lib/types';

class AuthService {
  private readonly userCollection = collection(db, COLLECTIONS.USERS);
  private readonly provider = new GoogleAuthProvider();

  private mapUserData = (doc: DocumentData): User => {
    return {
      id: doc.id,
      email: doc.email,
      displayName: doc.displayName,
      role: doc.role,
    };
  };

  private async createUser(userCredential: UserCredential): Promise<void> {
    try {
      const { uid, email, displayName } = userCredential.user;

      const userRef = doc(this.userCollection, uid);
      const userData = {
        id: uid,
        email,
        displayName,
        role: Roles.user,
      };

      await setDoc(userRef, userData);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async getCurrentUserId(): Promise<string> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be authenticated to access campaigns');
    }
    return user.uid;
  }

  async signInWithGoogle(): Promise<UserCredential> {
    try {
      const userCredential = await signInWithPopup(auth, this.provider);
      const additionalUserInfo = getAdditionalUserInfo(userCredential);

      if (additionalUserInfo?.isNewUser) {
        await this.createUser(userCredential);
      }

      return userCredential;
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

  async getCurrentUserRole(): Promise<RolesType> {
    try {
      const uid = await this.getCurrentUserId();
      const userRef = doc(this.userCollection, uid);
      const snapshot = await getDoc(userRef);

      if (!snapshot.exists()) {
        throw new Error('User not found');
      }

      return this.mapUserData(snapshot.data()).role;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to fetch user data');
    }
  }
}

export const authService = new AuthService();
