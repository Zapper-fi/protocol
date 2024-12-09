import { gql } from '@apollo/client';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { Button } from '@site/src/components/Button';
import { Copy } from 'lucide-react';
import { useState, useEffect } from 'react';

const Toast = ({ message }) => (
  <div
    className="absolute rounded-md bg-gray-800 px-2 py-1 text-xs text-white"
    style={{
      top: '100%', // Position below the parent
      left: '50%', // Center horizontally
      transform: 'translateX(-50%)', // Center adjust
      marginTop: '8px', // Add some space between toast and button
      whiteSpace: 'nowrap',
      zIndex: 50,
    }}
  >
    {message}
  </div>
);

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
      <h4>Your API Key</h4>

      <div>
        <div className="flex items-center gap-2">
          <code
            className="flex flex-1 items-center rounded px-2 py-1 font-mono text-base"
            style={{ fontSize: '14px', minHeight: '40px' }}
          >
            {apiKey}
          </code>
          <div className="relative">
            <Button type="button" onClick={handleCopyApiKey} className="grid h-10 w-10 place-content-center">
              <Copy size={18} />
            </Button>
            {showToast && <Toast message="Copied!" />}
          </div>
        </div>
      </div>
    </div>
  );
}
