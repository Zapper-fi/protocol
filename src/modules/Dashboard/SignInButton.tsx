import { gql, useMutation } from '@apollo/client';
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { Button } from '@site/src/components/Button';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';

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
  const { authenticated, ready, user } = usePrivy();
  const { logout } = useLogout();

  const { login } = useLogin({
    onComplete: async (user) => {
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
    },
  });

  if (!ready) {
    return null;
  }

  return authenticated ? (
    <DropdownNavbarItem
      label={<span className="text-sm">{user.email.address}</span>}
      items={[
        {
          label: 'Dashboard',
          to: 'dashboard',
        },
        {
          label: 'Contact Support',
          href: 'https://help.zapper.xyz/hc/en-us',
        },
        {
          label: 'Sign Out',
          href: '/',
          onClick: logout,
        },
      ]}
    />
  ) : (
    <Button height="h-8" textSize="text-[14px]" type="button" variant="primary" onClick={login}>
      Sign in
    </Button>
  );
}
