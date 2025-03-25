import { useQuery } from '@tanstack/react-query';
import { getCouponsByCampaign } from '../../api/firebase';

export const useCouponsQuery = (campaignId: string | undefined) => {
  return useQuery({
    queryKey: ['coupons', campaignId],
    queryFn: () => getCouponsByCampaign(campaignId),
  });
};
