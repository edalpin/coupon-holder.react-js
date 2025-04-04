import { useMutation, useQueryClient } from '@tanstack/react-query';
import { couponService } from '@/services/coupon';
import { CouponStatesType } from '@/types/domain';

type UpdateCouponParams = {
  couponId: string;
  state: CouponStatesType;
};

export type CreateCouponParams = {
  title: string;
  state: CouponStatesType;
  campaignId: string;
};

export const useCouponCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, state, campaignId }: CreateCouponParams) =>
      couponService.createCoupon({ title, state, campaignId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error) => {
      console.error('Failed to create coupon:', error);
    },
  });
};

export const useCouponUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ couponId, state }: UpdateCouponParams) =>
      couponService.patchCouponState(couponId, state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
    onError: (error) => {
      console.error('Failed to update coupon state:', error);
    },
  });
};
