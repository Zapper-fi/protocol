import { type PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth';

// TODO: Replace with env variable for development and production
const privyAppId = 'cm3dxd29q00lno9q68oqmiaj8';

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
