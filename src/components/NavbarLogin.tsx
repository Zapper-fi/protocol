import BrowserOnly from '@docusaurus/BrowserOnly';
import { SignInButton } from '@site/src/modules/Dashboard/SignInButton';

export function NavbarLogin() {
  return (
    <div className="px-4">
      <SignInButton />
    </div>
  );
}

export default function ClientNavbarLogin() {
  return <BrowserOnly>{() => <NavbarLogin />}</BrowserOnly>;
}
