import { useQuery } from '@apollo/client';
import { usePrivy } from '@privy-io/react-auth';

export function useAuthQuery(query, options = {}) {
  const { user } = usePrivy();

  return useQuery(query, {
    ...options,
    skip: !user,
  });
}
