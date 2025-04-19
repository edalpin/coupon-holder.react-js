import { CouponCard } from '@/components/coupon-card';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useCouponsQuery } from '@/hooks/queries/use-coupons';
import { CampaignStatesType } from '@/types/domain';
import { useState } from 'react';

type CampaignContentProps = {
  id: string;
  description: string;
  state: CampaignStatesType;
  reward: string;
};

const buttonLabels: Record<CampaignStatesType, string> = {
  active: 'Claim Reward',
  inactive: 'Claim Reward',
  redeemed: 'See Reward',
  completed: 'Claim Reward',
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

export const CampaignContent = (props: CampaignContentProps) => {
  const { id, description, state, reward } = props;
  const { data: coupons, isLoading, isError } = useCouponsQuery(id);
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!coupons || coupons.length === 0) return <EmptyState />;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="flex flex-col gap-2">
      <p>{description}</p>

      <Button
        variant="secondary"
        disabled={state === 'active'}
        onClick={toggleModal}
      >
        {buttonLabels[state]}
      </Button>

      <section className="grid grid-cols-2 gap-3">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </section>

      {isOpen && (
        <Modal
          title="Reward"
          onClose={toggleModal}
          isOpen
          renderContent={() => (
            <>
              <img className="border-2 border-black rounded-2xl" src={reward} />
              <p className="font-bold">{description}</p>
            </>
          )}
        />
      )}
    </section>
  );
};
