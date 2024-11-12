import { gql, useMutation } from '@apollo/client';
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { Button } from '@site/src/components/Button';

const UPSERT_USER = gql`
  mutation UpsertApiClient($email: String!) {
    upsertApiClient(email: $email) {
      id
      name
    }
  }
`;

export function SignInButton() {
  const [upsertUser] = useMutation(UPSERT_USER);

  const { authenticated } = usePrivy();
  const { logout } = useLogout();
  const { login } = useLogin({
    onComplete: async (user) => {
      if (user.email) {
        const { data } = await upsertUser({
          variables: {
            email: user.email.address
          },
        });

        const clientId = data?.upsertApiClient?.id || '';
        if (clientId) {
          localStorage.setItem('zapper.clientId', clientId);
        }
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
