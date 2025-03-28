import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCouponStateById } from '../../services/campaigns';

export const useCouponMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (couponId: string) =>
      updateCouponStateById(couponId, 'redeemed'),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
    },
  });
};
