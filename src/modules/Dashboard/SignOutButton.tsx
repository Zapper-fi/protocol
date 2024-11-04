import { usePrivy } from '@privy-io/react-auth';
import { Button } from '../../components/Button';

export function SignOutButton() {
	const { logout } = usePrivy();

	return (
		<Button type="button" variant="primary" onClick={() => logout()}>
			Logout
		</Button>
	);
}
