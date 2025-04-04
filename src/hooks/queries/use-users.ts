import { userService } from '@/services/users';
import { useQuery } from '@tanstack/react-query';

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });
};
