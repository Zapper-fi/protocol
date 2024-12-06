import { gql, useMutation } from '@apollo/client';
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { Button } from '@site/src/components/Button';
import { useSignIn } from '@site/src/helpers/useSignIn';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';

export function SignInButton() {
  const { authenticated, ready, user } = usePrivy();
  const { login, logout } = useSignIn();

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
          href: 'mailto:api@zapper.xyz?subject=Customer%20Support',
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
