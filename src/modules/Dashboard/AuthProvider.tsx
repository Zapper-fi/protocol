import { PrivyProvider } from '@privy-io/react-auth';

const privyAppId = 'cm2ateeqj0531q8pbixyb92qu';

const privyConfig = {
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
