import React from 'react';
import { PrivyProvider, useLogin, usePrivy } from '@privy-io/react-auth';

const PRIVY_APP_ID = 'cm2ateeqj0531q8pbixyb92qu'; // Your Privy App ID

export const AuthButton: React.FC = () => {
  const { ready, authenticated } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);

  const { login } = useLogin({
    onError: (error) => {
      console.error("Login error:", error);
    },
    onComplete: (user, isNewUser) => {
      console.log("Login complete:");
      console.log("User info:", user);
      console.log("Is new user:", isNewUser);

      if (isNewUser) {
        //Update client with privyDid if it exists (returns the client)

        //If !apiClient {
          // No client currently associated with this email. Go to zendesk to request access.
        
      } else {
        console.log("Existing user account, please proceed");
      }
    },
  });

  return (
    <button disabled={disableLogin} onClick={login}>
      Log in
    </button>
  );
};

export const AuthButtonWrapper: React.FC = () => {
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
