import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCouponStateById } from '../../api/firebase';

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
