import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { COLLECTIONS } from '@/lib/constants';
import { Campaign, Coupon, CouponStatesType } from '@/lib/types';

class CampaignService {
  private readonly campaignCollection = collection(db, COLLECTIONS.CAMPAIGNS);
  private readonly couponCollection = collection(db, COLLECTIONS.COUPONS);

  private mapCampaignData = (doc: DocumentData): Campaign => {
    return {
      id: doc.id,
      title: doc.data().title,
      reward: doc.data().reward,
      createdAt: doc.data().createdAt,
      redeemedAt: doc.data().redeemedAt,
      expiredDate: doc.data().expiredDate,
      progress: doc.data().progress,
      state: doc.data().state,
    };
  };

  private mapCouponData = (doc: DocumentData): Coupon => {
    return {
      id: doc.id,
      title: doc.data().title,
      state: doc.data().state,
      campaignId: doc.data().campaignId,
    };
  };

  getCampaigns = async (): Promise<Campaign[]> => {
    try {
      const snapshot = await getDocs(this.campaignCollection);
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
      const conditionsRef = where('campaignId', '==', campaignId);
      const queryRef = query(this.couponCollection, conditionsRef);
      const snapshot = await getDocs(queryRef);

      return snapshot.docs.map((doc) => this.mapCouponData(doc));
    } catch (error) {
      console.error('Error fetching coupons:', error);
      throw new Error('Failed to fetch coupons');
    }
  };

  updateCouponState = async (
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
