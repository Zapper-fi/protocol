import { gql, useMutation } from '@apollo/client';
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';

const UPSERT_USER = gql`
  mutation UpsertApiClient($email: String!) {
    upsertApiClient(email: $email) {
      id
      name
    }
  }
`;

export function useSignIn() {
  const [upsertUser] = useMutation(UPSERT_USER);
  const { authenticated, ready } = usePrivy();
  const { logout } = useLogout();

  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      if (user.email) {
        const { data } = await upsertUser({
          variables: {
            email: user.email.address,
          },
        });

        const clientId = data?.upsertApiClient?.id || '';
        if (clientId) {
          localStorage.setItem('zapper.clientId', clientId);
        }
      }

      if (isNewUser && window.location.pathname === '/dashboard') {
        window.location.reload();
      }
    },
  });

  return {
    ready,
    authenticated,
    login,
    logout,
  };
}
