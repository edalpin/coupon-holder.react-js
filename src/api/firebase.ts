import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { CAMPAIGNS, COUPON } from '../lib/constants';
import { Campaign, Coupon, CouponStatesType } from '../lib/types';

const campaignCollectionRef = collection(db, CAMPAIGNS);
const couponCollectionRef = collection(db, COUPON);

export const getCampaigns = async () => {
  try {
    const data = await getDocs(campaignCollectionRef);

    return data.docs.map((doc) => {
      const campaign: Campaign = {
        id: doc.id,
        title: doc.data().title,
        reward: doc.data().reward,
        createdAt: doc.data().createdAt,
        redeemedAt: doc.data().redeemedAt,
        expiredDate: doc.data().expiredDate,
        progress: doc.data().progress,
        state: doc.data().state,
      };

      return campaign;
    });
  } catch (error) {
    // TODO: Handle errors
    console.log(error);
  }
};

export const getCouponsByCampaign = async (campaignId: string | undefined) => {
  if (!campaignId) return [];

  const conditionsRef = where('campaignId', '==', campaignId);
  const queryRef = query(couponCollectionRef, conditionsRef);
  const data = await getDocs(queryRef);

  return data.docs.map((doc) => {
    const coupon: Coupon = {
      id: doc.id,
      title: doc.data().title,
      state: doc.data().state,
      campaignId: doc.data().campaignId,
    };

    return coupon;
  });
};

export const updateCouponStateById = (
  couponId: string,
  state: CouponStatesType
) => {
  const couponRef = doc(db, COUPON, couponId);
  return updateDoc(couponRef, { state: state });
};
