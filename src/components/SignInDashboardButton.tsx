import { Button } from '@site/src/components/Button';
import { useSignIn } from '@site/src/helpers/useSignIn';

export function SignInDashboardButton() {
  const { ready, authenticated, login } = useSignIn();

  const handleClick = () => {
    if (ready && authenticated) {
      window.location.href = '/dashboard';
    } else {
      login();
    }
  };

  return (
    <Button height="h-12" textSize="text-[14px]" type="button" variant="primary" onClick={handleClick}>
      Get Your API Key
    </Button>
  );
}
