import { CouponStates, CouponStatesType } from '@/types/domain';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';
import { Button } from '@/components/ui/button';
import { useCouponCreateMutation } from '@/hooks/mutations/use-coupon';
import { ArrowLeftIcon } from 'lucide-react';
const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  state: z.enum(Object.keys(CouponStates) as [string, ...string[]], {
    required_error: 'State is required',
  }),
});

type CouponCreationFields = z.infer<typeof schema>;

export const CouponCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isPending, mutate: createCoupon } = useCouponCreateMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CouponCreationFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: CouponCreationFields) => {
    try {
      createCoupon({
        title: data.title,
        state: data.state as CouponStatesType,
        campaignId: id as string,
      });

      navigate(`/campaigns/${id}`);
    } catch (error) {
      console.error('Error creating coupon:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/campaigns/${id}`);
  };

  const stateOptions = Object.entries(CouponStates).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="flex items-center mb-6 gap-4">
        <Button variant="secondary" onClick={handleCancel} disabled={isPending}>
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create New Coupon</h1>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <FormInput
              id="title"
              label="Coupon Title"
              placeholder="Enter coupon title"
              error={errors.title?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <FormSelect
              id="state"
              label="Coupon State"
              options={stateOptions}
              {...field}
            />
          )}
        />

        <div className="flex justify-end space-x-4 pt-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            type="button"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isPending}>
            Create Coupon
          </Button>
        </div>
      </form>
    </div>
  );
};
