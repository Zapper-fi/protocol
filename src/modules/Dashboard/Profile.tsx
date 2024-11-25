import { gql } from '@apollo/client';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { Button } from '@site/src/components/Button';
import { Copy } from 'lucide-react';
import { useState, useEffect } from 'react';

const Toast = ({ message }) => <div className="popup">{message}</div>;

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
  const [showToast, setShowToast] = useState(false);

  const { apiKey } = data?.apiClientById || {};

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleCopyApiKey = async () => {
    if (apiKey) {
      try {
        await navigator.clipboard.writeText(apiKey);
        setShowToast(true);
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
          <code className="flex-1 text-base font-mono py-2 px-4 rounded">{apiKey}</code>
          <div className="relative">
            <Button type="button" onClick={handleCopyApiKey} className="w-10 grid place-content-center">
              <Copy size={18} />
            </Button>
            {showToast && <Toast message="Copied!" />}
          </div>
        </div>
      </div>
    </div>
  );
}
