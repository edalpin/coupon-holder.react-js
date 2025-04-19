import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';
import { useCampaignCreateMutation } from '@/hooks/mutations/use-campaign';
import { useUsersQuery } from '@/hooks/queries/use-users';
import { CampaignStates, CampaignStatesType } from '@/types/domain';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  reward: z
    .string()
    .min(1, { message: 'Reward URL is required' })
    .url({ message: 'Please enter a valid URL' }),
  activeAt: z.string().min(1, { message: 'Activation date is required' }),
  state: z.enum(Object.keys(CampaignStates) as [string, ...string[]], {
    required_error: 'State is required',
  }),
  targets: z
    .array(z.string())
    .min(1, { message: 'At least one target is required' }),
});

type CampaignCreationFields = z.infer<typeof schema>;

export const CampaignCreate = () => {
  const navigate = useNavigate();
  const { data: users, isLoading: isUsersLoading } = useUsersQuery();
  const { isPending, mutate: createCampaign } = useCampaignCreateMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CampaignCreationFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: CampaignCreationFields) => {
    try {
      createCampaign({
        ...data,
        targets: data.targets,
        activeAt: new Date(data.activeAt),
        state: data.state as CampaignStatesType,
      });

      navigate('/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleCancel = () => {
    navigate('/campaigns');
  };

  const stateOptions = Object.entries(CampaignStates).map(([value, label]) => ({
    value,
    label,
  }));

  const userOptions = users
    ? users.map((user) => ({
        value: user.id,
        label: user.email,
      }))
    : [];

  if (isUsersLoading) {
    return (
      <section className="flex justify-center items-center">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="flex items-center mb-6 gap-4">
        <Button variant="secondary" onClick={handleCancel} disabled={isPending}>
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create New Campaign</h1>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <Controller
          name="title"
          control={control}
          disabled={isPending}
          render={({ field }) => (
            <FormInput
              id="title"
              label="Campaign Title"
              placeholder="Enter campaign title"
              error={errors.title?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="reward"
          control={control}
          disabled={isPending}
          render={({ field }) => (
            <FormInput
              id="reward"
              label="Reward URL"
              type="url"
              placeholder="Enter reward URL"
              error={errors.reward?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="activeAt"
          control={control}
          disabled={isPending}
          render={({ field }) => (
            <FormInput
              id="activeAt"
              label="Activation Date"
              type="datetime-local"
              error={errors.activeAt?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="state"
          control={control}
          disabled={isPending}
          defaultValue={CampaignStates.inactive}
          render={({ field }) => (
            <FormSelect
              id="state"
              label="Campaign State"
              options={stateOptions}
              error={errors.state?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="targets"
          control={control}
          disabled={isPending}
          defaultValue={[]}
          render={({ field: { value, onChange, ...rest } }) => (
            <FormSelect
              id="targets"
              label="Target Users"
              options={userOptions}
              multiple={true}
              error={errors.targets?.message}
              value={value}
              onChange={(e) => {
                const selectedValues = Array.from(e.target.selectedOptions).map(
                  (option) => option.value
                );
                onChange(selectedValues);
              }}
              {...rest}
            />
          )}
        />

        <div className="flex justify-end space-x-4 pt-6">
          <Button
            variant="secondary"
            onClick={handleCancel}
            type="button"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isPending}>
            Create Campaign
          </Button>
        </div>
      </form>
    </div>
  );
};
