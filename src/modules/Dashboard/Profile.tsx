import { gql } from '@apollo/client';
import { useAuthQuery } from '../../helpers/useAuthQuery';
import { usePrivy } from '@privy-io/react-auth';
import { Card } from '../../components/Card';

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

  const { apiKey, name } = data?.apiClientById || {};

  return (
    <Card>
      <h3>Profile</h3>
      <p>Account Name: {name}</p>
      <p>API Key: {apiKey}</p>
    </Card>
  );
}
