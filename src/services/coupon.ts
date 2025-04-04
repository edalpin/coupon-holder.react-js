import { db } from '@/firebase/firebase';
import { CreateCouponParams } from '@/hooks/mutations/use-coupon';
import { COLLECTIONS } from '@/lib/constants';
import { Coupon, CouponStatesType } from '@/types/domain';
import {
  collection,
  doc,
  DocumentData,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

class CouponService {
  private readonly couponCollection = collection(db, COLLECTIONS.COUPONS);

  private mapCouponData = (doc: DocumentData): Coupon => {
    return {
      id: doc.id,
      title: doc.data().title,
      state: doc.data().state,
    };
  };

  createCoupon = async (params: CreateCouponParams): Promise<void> => {
    try {
      const couponRef = doc(this.couponCollection);
      await setDoc(couponRef, params);
    } catch (error) {
      console.error('Error creating coupon:', error);
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

export const couponService = new CouponService();
