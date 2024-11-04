import { PrivyProvider } from '@privy-io/react-auth';

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
