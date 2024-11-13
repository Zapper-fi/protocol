import { type PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth';

const privyAppId = process.env.PRIVY_APP_ID || '';

const privyConfig: PrivyClientConfig = {
  appearance: {
    theme: 'dark',
  },
};

export function AuthProvider({ children }) {
  return (
    <PrivyProvider appId={privyAppId} config={privyConfig}>
      {children}
    </PrivyProvider>
  );
}
