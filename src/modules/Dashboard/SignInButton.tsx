import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@site/src/components/Button';
import { useSignIn } from '@site/src/helpers/useSignIn';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import { LogIn, LogOut } from 'lucide-react';
import { RiAccountCircleLine } from 'react-icons/ri';

function MobileUserMenu({ logout, user }) {
  return (
    <div className="mr-8 flex flex-row items-center gap-1">
      <a
        href="/dashboard"
        className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200"
        title="Dashboard"
      >
        <RiAccountCircleLine size={20} className="text-gray-900 dark:text-white" />
      </a>
      <a
        href="/"
        className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-200"
        title="Sign Out"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        <LogOut size={20} className="text-gray-900 dark:text-white" />
      </a>
    </div>
  );
}

function DesktopUserMenu({ user, logout }) {
  return (
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
        <div className="hidden min-[997px]:block">
          <DesktopUserMenu user={user} logout={logout} />
        </div>
        <div className="menu__list hidden max-[996px]:block">
          <div className="menu__list-item">
            <MobileUserMenu user={user} logout={logout} />
          </div>
        </div>
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
          <button
            onClick={login}
            className="flex cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-2 outline-none focus:outline-none focus:ring-0"
            title="Sign In"
            type="button"
          >
            <LogIn size={20} className="text-gray-900 dark:text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
