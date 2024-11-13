import { type PrivyClientConfig, PrivyProvider } from '@privy-io/react-auth';

// TODO: Replace with env variable for development and production
// prod
const privyAppId = 'cm3dxd29q00lno9q68oqmiaj8';
// dev
// const privyAppId = 'cls53js9a00lfjw0npsb82scb';

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
