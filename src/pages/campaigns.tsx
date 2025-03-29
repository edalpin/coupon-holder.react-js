import { useNavigate } from 'react-router-dom';
import icon from '@/assets/logo.svg';
import type { CampaignStatesType } from '@/lib/types';
import { useCampaignsQuery } from '@/hooks/queries/use-campaigns';
import { Card } from '@/components/ui/card';

type CampaignCardProps = {
  id: string;
  title: string;
  state: CampaignStatesType;
  reward: string;
  onClick: () => void;
};

const CampaignCard = ({ title, state, reward, onClick }: CampaignCardProps) => {
  const getContent = () => {
    if (state === 'redeemed') {
      return (
        <img
          src={reward}
          alt={`Reward for ${title}`}
          className="w-full h-full object-contain"
        />
      );
    }
    return (
      <img
        src={icon}
        className="w-full h-full grayscale object-contain"
        alt={`Locked reward for ${title}`}
      />
    );
  };

  const getFooter = () => {
    if (state === 'redeemed') {
      return <p className="font-medium">{title}</p>;
    }
    return <p className="text-gray-500">--------</p>;
  };

  return (
    <Card
      content={getContent}
      footer={getFooter}
      onClick={onClick}
      title={title}
      description={`Campaign status: ${state}`}
    />
  );
};

const LoadingState = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <p className="text-lg">Loading campaigns...</p>
  </div>
);

const ErrorState = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <p className="text-lg text-red-500">Failed to load campaigns</p>
  </div>
);

const EmptyState = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <p className="text-lg">No campaigns available</p>
  </div>
);

export const Campaigns = () => {
  const navigate = useNavigate();
  const { data: campaigns, isLoading, isError } = useCampaignsQuery();

  const navigateToCampaignDetail = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!campaigns?.length) return <EmptyState />;

  return (
    <section className="flex flex-col gap-10">
      <header className="font-mono font-bold text-4xl text-center">
        Campaigns
      </header>
      <article
        className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade"
        role="grid"
        aria-label="Campaign list"
      >
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            title={campaign.title}
            state={campaign.state}
            reward={campaign.reward}
            onClick={() => navigateToCampaignDetail(campaign.id)}
          />
        ))}
      </article>
    </section>
  );
};
