import { useLogin } from '@privy-io/react-auth';
import { Button } from '../../components/Button';
import { gql, useMutation } from '@apollo/client';

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

	const { login } = useLogin({
		onComplete: (user, isNewUser) => {
			if (isNewUser) {
				updateUser({
					variables: {
						privyId: user.id,
						apiClientName: user.email.address,
					},
				});
			}
		},
	});

	return (
		<Button type="button" variant="primary" onClick={login}>
			Login
		</Button>
	);
}
