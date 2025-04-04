import { campaignService } from '@/services/campaigns';
import { CampaignStatesType } from '@/types/domain';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type CreateCampaignParams = {
  title: string;
  reward: string;
  activeAt: Date;
  state: CampaignStatesType;
  targets: string[];
};

export const useCampaignCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateCampaignParams) =>
      campaignService.createCampaign(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
    onError: (error) => {
      console.error('Failed to create campaign:', error);
    },
  });
};
