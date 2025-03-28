import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from '../../services/campaigns';

export const useCampaignsQuery = () => {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
  });
};
