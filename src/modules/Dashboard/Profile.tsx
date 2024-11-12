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
        <div className="flex items-center gap-2">
          <code className="text-xl font-mono bg-gray-800 p-3 rounded flex-1 overflow-x-auto">{apiKey}</code>
          <Button type="button" onClick={handleCopyApiKey}>
            <Copy size={24} />
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
