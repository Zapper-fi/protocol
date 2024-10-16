import React, { useState, useEffect } from 'react';
import { PrivyProvider, useLogin, usePrivy } from '@privy-io/react-auth';
import axios, { AxiosRequestConfig } from 'axios'; // You might need to install axios: npm install axios
import { useZapperApiFetcher } from '../hooks/useZapperApiFetcher';

const PRIVY_APP_ID = 'cm2ateeqj0531q8pbixyb92qu';
const API_BASE_URL = 'https://api.zapper.xyz'; // Replace with your actual API URL

// Define a type for the fetcher function
type FetcherFunction = (endpoint: string, options?: AxiosRequestConfig) => Promise<any>;

export const AuthButton = () => {
  console.log("env var : " + process.env.NEXT_PUBLIC_ZAPPER_API);
  const { ready, authenticated } = usePrivy();
  const [error, setError] = useState('');

  const fetcher = useZapperApiFetcher();
  const disableLogin = !ready || (ready && authenticated);

  const { login } = useLogin({
    onError: (error) => {
      console.error("Login error:", error);
      setError(String(error));
    },
    onComplete: async (user, isNewUser) => {
      console.log("Login complete:", user, isNewUser);

      if (fetcher) {
        try {
          const result = await fetcher('/v1/users', {
            method: 'POST',
            body: JSON.stringify({ privyDid: user.id }),
          });
          console.log('User created/updated:', result);
        } catch (error) {
          setError('Failed to create/update user');
        }
      }
    },
  });

  const handleLogin = async () => {
    setError('');
    await login();
  };

  return (
    <div>
      <button disabled={disableLogin} onClick={handleLogin}>
        Log in
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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