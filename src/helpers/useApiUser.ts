import { gql, useQuery } from '@apollo/client';
import { usePrivy } from '@privy-io/react-auth';

const QUERY = gql`
  query ApiClient($privyId: String!) {
    apiClient(privyId: $privyId) {
      apiV1PointsRemaining
      apiV2PointsRemaining
      apiKey
      payments {
        amount
        creditsPurchased
        createdAt
        status
      }
    }
  }
`;

export function useApiUser() {
  const { user } = usePrivy();

  const result = useQuery(QUERY, {
    variables: { privyId: user.id },
    skip: !user,
  });

  return result;
}
