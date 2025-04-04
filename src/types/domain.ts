// Campaign related types and enums
export const CampaignStates = {
  active: 'active',
  inactive: 'inactive',
  completed: 'completed',
  redeemed: 'redeemed',
} as const;

export type CampaignStatesType = keyof typeof CampaignStates;

export interface Campaign {
  id: string;
  title: string;
  reward: string;
  activeAt: Date;
  state: CampaignStatesType;
}

// Coupon related types and enums
export const CouponStates = {
  inactive: 'inactive',
  active: 'active',
  redeemed: 'redeemed',
} as const;

export type CouponStatesType = keyof typeof CouponStates;

export interface Coupon {
  id: string;
  title: string;
  state: CouponStatesType;
}
