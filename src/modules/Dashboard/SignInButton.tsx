import { usePrivy } from '@privy-io/react-auth';
import { Button } from '../../components/Button';

export function SignInButton() {
	const { login } = usePrivy();

	return (
		<Button type="button" variant="primary" onClick={() => login()}>
			Login
		</Button>
	);
}
