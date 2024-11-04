import { usePrivy } from '@privy-io/react-auth';

export function SignedIn({ children }) {
  const { ready, authenticated } = usePrivy();

  if (!ready) return null;

  return authenticated ? children : null;
}
