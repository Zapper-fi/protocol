import { PrivyProvider } from '@privy-io/react-auth';

// TODO: Replace with env variable for development and production
const privyAppId = 'cls53js9a00lfjw0npsb82scb';

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
