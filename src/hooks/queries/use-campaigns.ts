import { useQuery } from '@tanstack/react-query';
import { campaignService } from '@/services/campaigns';

export const useCampaignsQuery = () => {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: campaignService.getCampaigns,
  });
};
