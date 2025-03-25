export type CampaignStatesType = keyof typeof CampaignStates;
export const CampaignStates = {
  inProgress: 'In Progress',
  pendingToRedeem: 'Pending To Redeem',
  redeemed: 'Redeemed',
};

export type Campaign = {
  id: string;
  title: string;
  reward: string;
  createdAt: Date;
  redeemedAt: Date | undefined;
  expiredDate: Date;
  progress: number;
  state: CampaignStatesType;
};

export type CouponStatesType = keyof typeof CouponStates;
export const CouponStates = {
  blocked: 'Blocked',
  active: 'Active',
  redeemed: 'Redeemed',
};

export type Coupon = {
  id: string;
  title: string;
  state: CouponStatesType;
  campaignId: string;
};
