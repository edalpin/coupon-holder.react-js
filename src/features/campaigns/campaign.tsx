import { useParams } from 'react-router-dom';
import icon from '../../assets/logo.svg';
import { CouponStatesType } from '../../lib/types';
import { Button } from '../../components/ui/button';
import { useCouponMutation } from '../../hooks/mutations/use-coupon';
import { useCouponsQuery } from '../../hooks/queries/use-coupons';
import { Card } from '../../components/ui/card';

const getCouponContent = (
  title: string,
  state: CouponStatesType,
  onRedeemFn: () => void
) => {
  switch (state) {
    case 'active': {
      return (
        <section className="animate-bounce">
          <Button label="Redeem" onClick={onRedeemFn} />
        </section>
      );
    }
    case 'blocked': {
      return (
        <img
          src={icon}
          className="w-full grayscale cursor-not-allowed"
          alt="Message"
        />
      );
    }
    case 'redeemed': {
      return <>{title}</>;
    }
  }
};

export const Campaign = () => {
  const { campaignId } = useParams();
  const { data: coupons, isLoading } = useCouponsQuery(campaignId);
  const { mutate } = useCouponMutation();

  if (isLoading) return 'Is loading ...';

  if (!coupons) return 'there is no data';

  return (
    <section className="flex flex-col gap-10">
      <header className="font-mono font-bold text-4xl text-center">
        Coupons
      </header>
      <article className="grid grid-cold-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {coupons.map((coupon) => (
          <Card
            key={coupon.id}
            className="w-full"
            content={() =>
              getCouponContent(coupon.title, coupon.state, () =>
                mutate(coupon.id)
              )
            }
            onClick={() => {}}
          />
        ))}
      </article>
    </section>
  );
};
