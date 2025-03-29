// Campaign related types and enums
export const CampaignStates = {
  inProgress: 'In Progress',
  pendingToRedeem: 'Pending To Redeem',
  redeemed: 'Redeemed',
} as const;

export type CampaignStatesType = keyof typeof CampaignStates;

export interface Campaign {
  id: string;
  title: string;
  reward: string;
  createdAt: Date;
  redeemedAt: Date | undefined;
  expiredDate: Date;
  progress: number;
  state: CampaignStatesType;
}

// Coupon related types and enums
export const CouponStates = {
  blocked: 'Blocked',
  active: 'Active',
  redeemed: 'Redeemed',
} as const;

export type CouponStatesType = keyof typeof CouponStates;

export interface Coupon {
  id: string;
  title: string;
  state: CouponStatesType;
  campaignId: string;
}
