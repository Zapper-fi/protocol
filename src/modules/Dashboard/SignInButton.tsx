import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@site/src/components/Button';
import { useSignIn } from '@site/src/helpers/useSignIn';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import { LogOut } from 'lucide-react';
import { RiAccountCircleLine } from 'react-icons/ri';

function MobileMenuItems({ logout, user }) {
  return (
    <div className="menu__list">
      <div className="menu__list-item hidden max-[996px]:flex">
        <div className="flex flex-row gap-1 items-center mr-4">
          <a
            href="/dashboard"
            className="p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            title="Dashboard"
          >
            <RiAccountCircleLine size={20} className="text-white" />
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
    <>
      <div className="hidden min-[997px]:block">
        <Button height="h-8" textSize="text-[14px]" type="button" variant="primary" onClick={login}>
          Sign in
        </Button>
      </div>

      <div className="hidden max-[996px]:block">
        <div className="flex pr-[24px]">
          <Button height="h-8" textSize="text-[14px]" type="button" variant="primary" onClick={login}>
            Sign in
          </Button>
        </div>
      </div>
    </>
  );
}
