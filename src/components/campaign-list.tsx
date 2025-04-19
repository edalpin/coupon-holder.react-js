import { CampaignContent } from '@/components/campaign-content';
import { Accordion } from '@/components/ui/accordion';
import { AccordionItem } from '@/components/ui/accordion-item';
import { Campaign } from '@/types/domain';

type CampaignListProps = {
  campaigns: Campaign[];
};

export const CampaignList = (props: CampaignListProps) => {
  const { campaigns } = props;
  return (
    <Accordion>
      {campaigns.map((campaign) => (
        <AccordionItem
          key={campaign.id}
          id={campaign.id}
          title={campaign.title}
          disabled={campaign.state === 'inactive'}
          renderContent={() => (
            <CampaignContent
              id={campaign.id}
              description={campaign.title}
              state={campaign.state}
              reward={campaign.reward}
            />
          )}
        />
      ))}
    </Accordion>
  );
};
