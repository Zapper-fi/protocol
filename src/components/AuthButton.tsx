import React, { useState } from 'react';
import { PrivyProvider, useLogin, usePrivy } from '@privy-io/react-auth';
import { useZapperApiFetcher } from '../hooks/useZapperApiFetcher';

const PRIVY_APP_ID = 'cm2ateeqj0531q8pbixyb92qu';

export const AuthButton = () => {
  const { ready, authenticated } = usePrivy();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState(null);
  const fetcher = useZapperApiFetcher();
  const disableLogin = !ready || (ready && authenticated) || loading;

  const { login } = useLogin({
    onError: (error) => {
      console.error("Login error:", error);
      setError(String(error));
      setLoading(false);
    },
    onComplete: async (user, isNewUser) => {
      console.log("Login complete:", user, isNewUser);
      
      if (!fetcher) {
        setError('API configuration is missing');
        return;
      }

      setLoading(true);
      try {
        const query = `
          query GetClient($name: String!) {
            client(name: $name) {
              id
              name
            }
          }
        `;
        
        const result = await fetcher(query, { name: 'zapper-admin' });
        
        console.log("Client data:", result);
        if (!result.data?.client) {
          throw new Error('No client data received');
        }
        
        setClientData(result.data.client);
      } catch (error) {
        console.error('Failed to fetch client data:', error);
        setError(error.message || 'Failed to fetch client data');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await login();
    } catch (error) {
      setError(String(error));
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        className={`px-4 py-2 rounded ${
          disableLogin ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
        disabled={disableLogin}
        onClick={handleLogin}
      >
        {loading ? 'Loading...' : 'Log in'}
      </button>
      
      {error && (
        <p className="mt-2 text-red-500">
          {error}
        </p>
      )}
      
      {clientData && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">Client Info</h3>
          <p>Client ID: {clientData.id}</p>
          <p>Client Name: {clientData.name}</p>
        </div>
      )}
    </div>
  );
};

export const AuthButtonWrapper = () => {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://protocol.zapper.xyz/img/logo.png',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <AuthButton />
    </PrivyProvider>
  );
};