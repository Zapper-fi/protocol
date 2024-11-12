import { gql } from '@apollo/client';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { Card } from '@site/src/components/Card';

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
