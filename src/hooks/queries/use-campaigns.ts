import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from '../../api/firebase';

export const useCampaignsQuery = () => {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
  });
};
