import {
  collection,
  doc,
  DocumentData,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { COLLECTIONS } from '@/lib/constants';
import { Roles, RolesType, User } from '@/types/user';
import { getDocs } from 'firebase/firestore';
import { UserCredential } from 'firebase/auth';
import { authService } from './auth';

class UserService {
  private readonly userCollection = collection(db, COLLECTIONS.USERS);

  private mapUserData = (doc: DocumentData): User => {
    return {
      id: doc.id,
      email: doc.data().email,
      displayName: doc.data().displayName,
      role: doc.data().role,
    };
  };

  getLoggedUserRole = async (): Promise<RolesType> => {
    try {
      const uid = await authService.getLoggedUserUid();
      const userRef = doc(this.userCollection, uid);
      const snapshot = await getDoc(userRef);

      if (!snapshot.exists()) {
        throw new Error('User not found');
      }

      return this.mapUserData(snapshot).role;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to fetch user data');
    }
  };

  getUsers = async (): Promise<User[]> => {
    try {
      const snapshot = await getDocs(this.userCollection);
      return snapshot.docs.map((doc) => this.mapUserData(doc));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  };

  createUser = async (userCredential: UserCredential): Promise<void> => {
    try {
      const { uid, email, displayName } = userCredential.user;

      const userRef = doc(this.userCollection, uid);
      const userData: Omit<User, 'id'> = {
        email: email!,
        displayName: displayName!,
        role: Roles.user,
      };

      await setDoc(userRef, userData);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  };
}

export const userService = new UserService();
