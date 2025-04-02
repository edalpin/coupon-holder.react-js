import { useNavigate } from 'react-router-dom';
import icon from '@/assets/logo.svg';
import type { Campaign } from '@/lib/types';
import { useCampaignsQuery } from '@/hooks/queries/use-campaigns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
type CampaignCardProps = {
  campaign: Campaign;
  onClick: () => void;
};

const getDaysUntilCampaignStart = (activeAt: Date) => {
  const now = new Date();
  const activationDate = new Date(activeAt);
  const diffTime = Math.abs(activationDate.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const CampaignCard = ({ campaign, onClick }: CampaignCardProps) => {
  const getContent = () => {
    switch (campaign.state) {
      case 'redeemed':
        return (
          <img
            src={campaign.reward}
            alt={`Reward for ${campaign.title}`}
            className="w-full h-full object-contain"
          />
        );

      case 'completed':
        return (
          <img
            src={icon}
            className="w-full h-full object-contain animate-pulse"
            alt={`Locked reward for ${campaign.title}`}
          />
        );

      case 'inactive':
      case 'active':
      default:
        return (
          <img
            src={icon}
            className="w-full h-full grayscale object-contain"
            alt={`Locked reward for ${campaign.title}`}
          />
        );
    }
  };

  const getFooter = () => {
    switch (campaign.state) {
      case 'redeemed':
        return <p>Reward redeemed</p>;

      case 'completed':
        return (
          <Button variant="primary" onClick={() => {}}>
            Redeem
          </Button>
        );

      case 'active':
        return <p>--------</p>;

      case 'inactive':
        return (
          <p>{`${getDaysUntilCampaignStart(campaign.activeAt)} days left`}</p>
        );
      default:
        return <p>--------</p>;
    }
  };

  return (
    <Card
      content={getContent}
      footer={getFooter}
      onClick={onClick}
      title={campaign.title}
      description={`Campaign status: ${campaign.state}`}
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10"
        role="grid"
        aria-label="Campaign list"
      >
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onClick={() => navigateToCampaignDetail(campaign.id)}
          />
        ))}
      </article>
    </section>
  );
};
