import { useQuery } from '@tanstack/react-query';
import { campaignService } from '@/services/campaigns';

export const useCouponsQuery = (campaignId: string | undefined) => {
  return useQuery({
    queryKey: ['coupons', campaignId],
    queryFn: () => campaignService.getCouponsByCampaign(campaignId),
  });
};
