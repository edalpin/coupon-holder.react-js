import {
  collection,
  doc,
  getDocs,
  query,
  where,
  DocumentData,
  orderBy,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { COLLECTIONS } from '@/lib/constants';
import { Campaign } from '@/types/domain';
import { authService } from './auth';
import { CreateCampaignParams } from '@/hooks/mutations/use-campaign';

class CampaignService {
  private readonly campaignCollection = collection(db, COLLECTIONS.CAMPAIGNS);

  private mapCampaignData = (doc: DocumentData): Campaign => {
    return {
      id: doc.id,
      title: doc.data().title,
      reward: doc.data().reward,
      activeAt: doc.data().activeAt.toDate(),
      state: doc.data().state,
    };
  };

  getCampaigns = async (): Promise<Campaign[]> => {
    try {
      const uid = await authService.getLoggedUserUid();
      const whereRef = where('targets', 'array-contains', uid);
      const orderByRef = orderBy('state', 'asc');
      const queryRef = query(this.campaignCollection, whereRef, orderByRef);
      const snapshot = await getDocs(queryRef);
      return snapshot.docs.map((doc) => this.mapCampaignData(doc));
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw new Error('Failed to fetch campaigns');
    }
  };

  createCampaign = async (params: CreateCampaignParams): Promise<void> => {
    try {
      const campaignRef = doc(this.campaignCollection);
      await setDoc(campaignRef, params);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };
}

export const campaignService = new CampaignService();
