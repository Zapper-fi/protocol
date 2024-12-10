import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@site/src/components/Button';
import { useSignIn } from '@site/src/helpers/useSignIn';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import { Layout, LogOut } from 'lucide-react';

function MobileMenuItems({ user, logout }) {
  return (
    <div className="menu__list">
      <div className="menu__list-item hidden max-[996px]:flex">
        <div className="flex flex-row gap-1 items-center mr-6">
          <a
            href="/dashboard"
            className="p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            title="Dashboard"
          >
            <Layout size={20} className="text-white" />
          </a>
          <a
            href="/"
            className="p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            title="Sign Out"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <LogOut size={20} className="text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function SignInButton() {
  const { authenticated, ready, user } = usePrivy();
  const { login, logout } = useSignIn();

  if (!ready) {
    return null;
  }

  if (authenticated) {
    return (
      <>
        <DropdownNavbarItem
          label={<span className="text-sm">{user.email.address}</span>}
          items={[
            {
              label: 'Dashboard',
              to: 'dashboard',
            },
            {
              label: 'Support',
              href: '/support',
            },
            {
              label: 'Sign Out',
              href: '/',
              onClick: logout,
            },
          ]}
        />

        <MobileMenuItems user={user} logout={logout} />
      </>
    );
  }

  return (
    <Button height="h-8" textSize="text-[14px]" type="button" variant="primary" onClick={login}>
      Sign in
    </Button>
  );
}
