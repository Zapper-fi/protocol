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
      <div>
        <strong>Email</strong>
        <p>{name}</p>
      </div>
      <div>
        <strong>Wallet</strong>
        <p>Wallet: {user?.wallet?.address || <Button onClick={linkWallet}>Link wallet</Button>}</p>
      </div>
      <div>
        <strong>API Key</strong>
        <p>This API key is used to query the Zapper GraphQL endpoint</p>
        <p>
          <input type="text" className="w-full p-2 text-base bg-none border-none" readOnly value={apiKey} />
        </p>
      </div>
    </Card>
  );
}
