import { usePrivy } from '@privy-io/react-auth';
import { Button } from '../../components/Button';

export function SignOutButton() {
	const { logout } = usePrivy();

	return (
		<Button type="button" className="button--primary" onClick={() => logout()}>
			Logout
		</Button>
	);
}
