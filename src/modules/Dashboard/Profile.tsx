import { gql } from '@apollo/client';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { Card } from '@site/src/components/Card';
import { Button } from '@site/src/components/Button';
import { usePrivy } from '@privy-io/react-auth';
import { Copy } from 'lucide-react';

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

  const handleCopyApiKey = async () => {
    if (apiKey) {
      try {
        await navigator.clipboard.writeText(apiKey);
      } catch (err) {
        console.error('Failed to copy API key:', err);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3>API Key</h3>

      <div>
        <div className="flex gap-2">
          <code className="flex-1 text-base font-mono  py-2 px-4 rounded">{apiKey}</code>
          <Button type="button" onClick={handleCopyApiKey} className="w-10 grid place-content-center">
            <Copy size={18} />
          </Button>
        </div>
      </div>

      <Card>
        <div className="space-y-4">
          <div>
            <strong className="block mb-1">Email</strong>
            <p>{name}</p>
          </div>

          <div>
            <strong className="block mb-1">Wallet</strong>
            <p>{user?.wallet?.address || <Button onClick={linkWallet}>Link wallet</Button>}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
