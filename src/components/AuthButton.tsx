import React, { useState } from 'react';
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { useZapperApiFetcher } from '../hooks/useZapperApiFetcher';

const AuthButton = () => {
  const { ready, authenticated, user } = usePrivy();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [message, setMessage] = useState('');
  const fetcher = useZapperApiFetcher();

  const handleError = (error) => {
    console.error("Error:", error);
    setError(String(error));
    setLoading(false);
  };

  const handleClientData = async (email) => {
    const query = `
      query GetClient($name: String!) {
        clientByName(name: $name) {
          id
          name
        }
      }
    `;
    const result = await fetcher(query, { name: email });
    return result.data?.client;
  };

  const updatePrivyId = async (privyId, apiClientName) => {
    const mutation = `
      mutation UpdatePrivyId($privyId: String!, $apiClientName: String!) {
        updatePrivyId(privyId: $privyId, apiClientName: $apiClientName) {
          name
          privyId
        }
      }
    `;
    await fetcher(mutation, { privyId, apiClientName });
  };

  const { login } = useLogin({
    onError: handleError,
    onComplete: async (user, isNewUser) => {
      try {
        if (!fetcher) throw new Error('API configuration is missing');
        setLoading(true);

        const client = await handleClientData(user.email.address);
        setClientData(client);

        if (isNewUser && client) {
          await updatePrivyId(user.id, user.email.address);
          setMessage("Privy ID updated successfully!");
        } else if (isNewUser) {
          setMessage("Check Zendesk for further instructions.");
        } else {
          setMessage("You're signed in!");
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
  });

  const { logout } = useLogout({
    onSuccess: () => {
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
      handleError(error);
    }
  };

  const handleLogout = async () => {
    setError('');
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="p-4">
      {authenticated ? (
        <button
          className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      ) : (
        <button
          className={`px-4 py-2 rounded ${
            loading || !ready || authenticated ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
          disabled={loading || !ready || authenticated}
          onClick={handleLogin}
        >
          {loading ? 'Loading...' : 'Log in'}
        </button>
      )}

      {error && <p className="mt-2 text-red-500">{error}</p>}
      {message && <p className="mt-2 text-blue-500">{message}</p>}

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
