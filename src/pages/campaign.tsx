import { useParams } from 'react-router-dom';
import icon from '@/assets/logo.svg';
import type { CouponStatesType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCouponMutation } from '@/hooks/mutations/use-coupon';
import { useCouponsQuery } from '@/hooks/queries/use-coupons';
import { Card } from '@/components/ui/card';

type CouponCardProps = {
  title: string;
  state: CouponStatesType;
  onRedeem: () => void;
};

const CouponCard = ({ title, state, onRedeem }: CouponCardProps) => {
  const getContent = () => {
    switch (state) {
      case 'active': {
        return (
          <section className="animate-bounce">
            <Button onClick={onRedeem}>
              <span>Redeem</span>
            </Button>
          </section>
        );
      }
      case 'inactive': {
        return (
          <img
            src={icon}
            className="w-full grayscale cursor-not-allowed"
            alt={`Inactive coupon: ${title}`}
          />
        );
      }
      case 'redeemed': {
        return <span>{title}</span>;
      }
    }
  };

  return (
    <Card
      className="w-full"
      content={getContent}
      onClick={() => {}}
      title={title}
      description={`Coupon status: ${state}`}
    />
  );
};

const LoadingState = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <p className="text-lg">Loading coupons...</p>
  </div>
);

const ErrorState = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <p className="text-lg text-red-500">Failed to load coupons</p>
  </div>
);

const EmptyState = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <p className="text-lg">No coupons available</p>
  </div>
);

export const Campaign = () => {
  const { id } = useParams();
  const { data: coupons, isLoading, isError } = useCouponsQuery(id);
  const { mutate: redeemCoupon } = useCouponMutation();

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!coupons?.length) return <EmptyState />;

  return (
    <section className="flex flex-col gap-10">
      <header className="font-mono font-bold text-4xl text-center">
        Coupons
      </header>
      <article
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        role="grid"
        aria-label="Coupon list"
      >
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon.id}
            title={coupon.title}
            state={coupon.state}
            onRedeem={() =>
              redeemCoupon({ couponId: coupon.id, state: 'redeemed' })
            }
          />
        ))}
      </article>
    </section>
  );
};
