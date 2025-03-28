import { useNavigate } from 'react-router-dom';
import icon from '../../assets/logo.svg';
import { CampaignStatesType } from '../../lib/types';
import { useCampaignsQuery } from '../../hooks/queries/use-campaigns';
import { Card } from '../../components/ui/card';

const getCampaignContent = (state: CampaignStatesType, image: string) => {
  if (state === 'redeemed') return <img src={image} alt="Reward" />;
  return <img src={icon} className="w-full grayscale" alt="Reward" />;
};

const getCampaignFooter = (state: CampaignStatesType, title: string) => {
  if (state === 'redeemed') return <p>{title}</p>;
  return <p>--------</p>;
};

export const Campaigns = () => {
  const navigate = useNavigate();
  const { data: campaigns, isLoading } = useCampaignsQuery();

  const navigateToCampaignDetail = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  if (isLoading) return 'Is loading ...';

  if (!campaigns) return 'there is no data';

  return (
    <section className="flex flex-col gap-10">
      <header className="font-mono font-bold text-4xl text-center">
        Campaigns
      </header>
      <article className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade">
        {campaigns.map((campaign) => (
          <Card
            key={campaign.id}
            content={() => getCampaignContent(campaign.state, campaign.reward)}
            footer={() => getCampaignFooter(campaign.state, campaign.title)}
            onClick={() => navigateToCampaignDetail(campaign.id)}
          />
        ))}
      </article>
    </section>
  );
};
