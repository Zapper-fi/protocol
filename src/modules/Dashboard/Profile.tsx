import { gql } from '@apollo/client';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { Card } from '@site/src/components/Card';
import { Button } from '@site/src/components/Button';
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
  const { user, linkWallet } = usePrivy();

  const { apiKey, name } = data?.apiClientById || {};

  return (
    <Card>
      <h3>Profile</h3>
      <p>Account Name: {name}</p>
      <p>Wallet: {user?.wallet?.address || <Button onClick={linkWallet}>Link wallet</Button>}</p>
      <p>API Key: {apiKey}</p>
    </Card>
  );
}
