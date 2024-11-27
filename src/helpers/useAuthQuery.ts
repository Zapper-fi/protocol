import { useQuery } from '@apollo/client';
import { usePrivy } from '@privy-io/react-auth';

/** useQuery that is enabled only if authenticated */
export function useAuthQuery(query, options = {}) {
  const { ready, user } = usePrivy();

  return useQuery(query, {
    ...options,
    skip: !ready || !user,
  });
}
