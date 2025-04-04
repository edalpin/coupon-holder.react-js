import { useNavigate, useParams } from 'react-router-dom';
import cat from '@/assets/cat.svg';
import type { Coupon } from '@/types/domain';
import { useCouponUpdateMutation } from '@/hooks/mutations/use-coupon';
import { useCouponsQuery } from '@/hooks/queries/use-coupons';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Roles } from '@/types/user';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

type CouponCardProps = {
  coupon: Coupon;
  onRedeem: () => void;
};

const CouponCard = ({ coupon, onRedeem }: CouponCardProps) => {
  const getContent = () => {
    switch (coupon.state) {
      case 'active': {
        return (
          <img
            src={cat}
            className="w-full h-full object-contain animate-bounce"
            alt={`Active coupon: ${coupon.title}`}
            onClick={onRedeem}
          />
        );
      }

      case 'inactive': {
        return (
          <img
            src={cat}
            className="w-full h-full grayscale object-contain"
            alt={`Inactive coupon: ${coupon.title}`}
            onClick={onRedeem}
          />
        );
      }
      case 'redeemed': {
        return <span>{coupon.title}</span>;
      }
    }
  };

  return (
    <Card
      className={`w-full ${coupon.state === 'active' ? 'cursor-pointer' : ''}`}
      content={getContent}
      onClick={() => {}}
      title={coupon.title}
      description={`Coupon status: ${coupon.state}`}
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

export const CampaignDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: coupons, isLoading, isError } = useCouponsQuery(id);
  const { mutate: redeemCoupon } = useCouponUpdateMutation();
  const { role } = useAuth();

  const onRedeemCoupon = (coupon: Coupon) => {
    if (coupon.state === 'active') {
      redeemCoupon({ couponId: coupon.id, state: 'redeemed' });
    }
  };

  const navigateToCampaignList = () => {
    navigate('/campaigns');
  };

  return (
    <section className="flex flex-col gap-10">
      <header className="flex justify-between items-center">
        <section className="flex items-center gap-4">
          <Button variant="secondary" onClick={navigateToCampaignList}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h1 className="font-mono font-bold text-4xl">Coupons</h1>
        </section>

        {role === Roles.admin && (
          <Button
            variant="primary"
            onClick={() => navigate(`/campaigns/${id}/coupons/create`)}
          >
            Create Coupon
          </Button>
        )}
      </header>

      {isLoading && <LoadingState />}
      {isError && <ErrorState />}
      {coupons?.length === 0 && <EmptyState />}
      {coupons && (
        <article
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-5"
          role="grid"
          aria-label="Coupon list"
        >
          {coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onRedeem={() => onRedeemCoupon(coupon)}
            />
          ))}
        </article>
      )}
    </section>
  );
};
