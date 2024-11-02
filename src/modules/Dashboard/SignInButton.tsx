import { usePrivy } from '@privy-io/react-auth';
import { Button } from '../../components/Button';

export function SignInButton() {
	const { login } = usePrivy();

	return (
		<Button type="button" className="button--primary" onClick={() => login()}>
			Login
		</Button>
	);
}
