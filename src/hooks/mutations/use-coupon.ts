import { useMutation, useQueryClient } from '@tanstack/react-query';
import { campaignService } from '@/services/campaigns';
import { CouponStatesType } from '@/lib/types';

interface UpdateCouponParams {
  couponId: string;
  state: CouponStatesType;
}

export const useCouponMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ couponId, state }: UpdateCouponParams) =>
      campaignService.patchCouponState(couponId, state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error) => {
      console.error('Failed to update coupon state:', error);
    },
  });
};
