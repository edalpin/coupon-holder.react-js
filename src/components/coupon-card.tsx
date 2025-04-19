import { cn } from '@/lib/utils';
import { Coupon } from '@/types/domain';
import cat from '@/assets/cat.svg';
import glassClock from '@/assets/glass-clock.svg';

type CouponProps = {
  coupon: Coupon;
};

export const CouponCard = (props: CouponProps) => {
  const { coupon } = props;
  const { title, state } = coupon;

  const isInactive = state === 'inactive';
  const icon = isInactive ? glassClock : cat;

  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center',
        'gap-2 p-4 border-2 rounded-lg shadow-md',
        'w-full aspect-square',
        'bg-primary/30 border-black',
        isInactive && 'bg-secondary/30 cursor-not-allowed'
      )}
    >
      <section
        className={cn(
          'flex justify-center items-center',
          'rounded-full w-2/5 aspect-square border-2 p-2 overflow-hidden',
          'bg-secondary border-black',
          isInactive && 'bg-secondary/50'
        )}
      >
        <img className="object-cover h-3/5" src={icon} />
      </section>

      <p className="w-full overflow-hidden text-ellipsis text-center line-clamp-3">
        {isInactive ? 'Blocked' : title}
      </p>
    </section>
  );
};
