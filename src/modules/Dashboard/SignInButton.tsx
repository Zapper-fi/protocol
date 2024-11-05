import { gql, useMutation } from '@apollo/client';
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { Button } from '../../components/Button';

const UPDATE_USER = gql`
  mutation UpdateUser($privyId: String!, $apiClientName: String!) {
    updatePrivyId(privyId: $privyId, apiClientName: $apiClientName) {
      name
      privyId
    }
  }
`;

export function SignInButton() {
	const [updateUser, { loading, error }] = useMutation(UPDATE_USER);

	const { authenticated } = usePrivy();
	const { logout } = useLogout();
	const { login } = useLogin({
		onComplete: (user, isNewUser) => {
			if (user) {
				updateUser({
					variables: {
						privyId: user.id,
						apiClientName: user.email.address,
					},
				});
			}
		},
	});

	const handleClick = () => {
		authenticated ? logout() : login();
	};

	return (
		<Button type="button" variant="primary" onClick={handleClick}>
			{authenticated ? 'Logout' : 'Login'}
		</Button>
	);
}
