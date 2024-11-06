import { gql } from '@apollo/client';
import { useAuthQuery } from '../../helpers/useAuthQuery';
import { usePrivy } from '@privy-io/react-auth';

const QUERY = gql`
  query Profile {
    apiClientById {
      name
      apiKey
    }
  }
`;

export function Profile() {
  const { data } = useAuthQuery(QUERY);

  const { apiKey, name } = data?.apiClient || {};

  return (
    <div>
      <h2>Profile</h2>
      <p>Account Name: {name}</p>
      <p>API Key: {apiKey}</p>
    </div>
  );
}
