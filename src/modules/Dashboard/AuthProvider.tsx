import { PrivyProvider } from '@privy-io/react-auth';

const privyAppId = 'cm2ateeqj0531q8pbixyb92qu';

export function AuthProvider({ children }) {
	return <PrivyProvider appId={privyAppId}>{children}</PrivyProvider>;
}
