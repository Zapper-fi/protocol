import { gql, useMutation } from '@apollo/client';
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { Button } from '../../components/Button';

const UPSERT_USER = gql`
  mutation UpsertApiClient($email: String!, $privyId: String!) {
    upsertApiClient(email: $email, privyId: $privyId) {
      name
      privyId
    }
  }
`;

export function SignInButton() {
  const [upsertUser] = useMutation(UPSERT_USER);

  const { authenticated } = usePrivy();
  const { logout } = useLogout();
  const { login } = useLogin({
    onComplete: (user) => {
      if (user.email) {
        upsertUser({
          variables: {
            email: user.email.address,
            privyId: user.id,
          },
        });
      }
      // TODO: If wallet login is enabled, we need to capture email separately
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
