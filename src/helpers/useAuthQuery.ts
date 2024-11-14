import { useQuery } from '@apollo/client';
import { usePrivy } from '@privy-io/react-auth';

/** useQuery that is enabled only if authenticated */
export function useAuthQuery(query, options = {}) {
  const { user } = usePrivy();

  return useQuery(query, {
    ...options,
    skip: !user,
  });
}
