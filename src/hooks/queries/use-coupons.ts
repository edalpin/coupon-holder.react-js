import { useQuery } from '@tanstack/react-query';
import { couponService } from '@/services/coupon';

export const useCouponsQuery = (campaignId: string | undefined) => {
  return useQuery({
    queryKey: ['coupons', campaignId],
    queryFn: () => couponService.getCouponsByCampaign(campaignId),
  });
};
