import React, { useState } from 'react';
import { PrivyProvider, useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { useZapperApiFetcher } from '../hooks/useZapperApiFetcher';

const PRIVY_APP_ID = 'cm2ateeqj0531q8pbixyb92qu';

export const AuthButton = () => {
  const { ready, authenticated, user } = usePrivy();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [message, setMessage] = useState('');
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

        const result = await fetcher(query, { name: user.email.address });
        const client = result.data?.client;
        setClientData(client);

        if (isNewUser) {
          if (client) {
            const mutation = `
              mutation UpdatePrivyId($privyId: String!, $apiClientName: String!) {
                updatePrivyId(privyId: $privyId, apiClientName: $apiClientName) {
                  name
                  privyId
                }
              }
            `;
            await fetcher(mutation, { privyId: user.id, apiClientName: user.email.address });
            setMessage("Privy ID updated successfully!");
          } else {
            setMessage("Check Zendesk for further instructions.");
          }
        } else {
          setMessage("You're signed in!");
        }
      } catch (error) {
        console.error('Failed to fetch client data or update privyId:', error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
  });

  const { logout } = useLogout({
    onSuccess: () => {
      console.log('User logged out');
      setClientData(null);
      setMessage('You have logged out');
      setLoading(false);
    }
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

  const handleLogout = async () => {
    setError('');
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      setError(String(error));
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {authenticated ? (
        <>
          <button
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
            onClick={handleLogout}
            disabled={loading} 
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </>
      ) : (
        <button
          className={`px-4 py-2 rounded ${
            disableLogin ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
          disabled={disableLogin}
          onClick={handleLogin}
        >
          {loading ? 'Loading...' : 'Log in'}
        </button>
      )}
      
      {error && (
        <p className="mt-2 text-red-500">{error}</p>
      )}
      
      {message && (
        <p className="mt-2 text-blue-500">{message}</p>
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

export default AuthButton;
