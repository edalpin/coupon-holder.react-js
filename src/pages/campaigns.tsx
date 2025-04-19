import { CampaignList } from '@/components/campaign-list';
import { Button } from '@/components/ui/button';
import { useCampaignsQuery } from '@/hooks/queries/use-campaigns';
import { useAuth } from '@/hooks/use-auth';
import { Roles } from '@/types/user';
import { useNavigate } from 'react-router-dom';

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
  const { role } = useAuth();

  const navigateToCampaignCreate = () => {
    navigate('/campaigns/create');
  };

  return (
    <section className="flex flex-col">
      <header className="flex justify-between items-center mb-10">
        <h1 className="font-mono font-bold text-4xl">Campaigns</h1>
        {role === Roles.admin && (
          <Button
            variant="primary"
            onClick={navigateToCampaignCreate}
            aria-label="Create new campaign"
          >
            Create Campaign
          </Button>
        )}
      </header>

      {isLoading && <LoadingState />}
      {isError && <ErrorState />}
      {campaigns?.length === 0 && <EmptyState />}

      {campaigns && <CampaignList campaigns={campaigns} />}
    </section>
  );
};
