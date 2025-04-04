import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  DocumentData,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { COLLECTIONS } from '@/lib/constants';
import { Campaign, Coupon, CouponStatesType } from '@/lib/types';
import { authService } from './auth';

class CampaignService {
  private readonly campaignCollection = collection(db, COLLECTIONS.CAMPAIGNS);
  private readonly couponCollection = collection(db, COLLECTIONS.COUPONS);

  private mapCampaignData = (doc: DocumentData): Campaign => {
    return {
      id: doc.id,
      title: doc.data().title,
      reward: doc.data().reward,
      activeAt: doc.data().activeAt.toDate(),
      state: doc.data().state,
    };
  };

  private mapCouponData = (doc: DocumentData): Coupon => {
    return {
      id: doc.id,
      title: doc.data().title,
      state: doc.data().state,
    };
  };

  getCampaigns = async (): Promise<Campaign[]> => {
    try {
      const uid = await authService.getCurrentUserId();
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

  getCouponsByCampaign = async (
    campaignId: string | undefined
  ): Promise<Coupon[]> => {
    if (!campaignId) {
      return [];
    }

    try {
      const whereRef = where('campaignId', '==', campaignId);
      const queryRef = query(this.couponCollection, whereRef);
      const snapshot = await getDocs(queryRef);

      return snapshot.docs.map((doc) => this.mapCouponData(doc));
    } catch (error) {
      console.error('Error fetching coupons:', error);
      throw new Error('Failed to fetch coupons');
    }
  };

  patchCouponState = async (
    couponId: string,
    state: CouponStatesType
  ): Promise<void> => {
    try {
      const couponRef = doc(this.couponCollection, couponId);
      await updateDoc(couponRef, { state });
    } catch (error) {
      console.error('Error updating coupon state:', error);
      throw new Error('Failed to update coupon state');
    }
  };
}

export const campaignService = new CampaignService();
