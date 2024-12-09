import { Button } from '@site/src/components/Button';
import { useSignIn } from '@site/src/helpers/useSignIn';

export function SignInDashboardButton() {
  const redirectToDashboard = () => {
    location.href = '/dashboard';
  };

  const { authenticated, login } = useSignIn({
    onComplete: redirectToDashboard,
  });

  const handleClick = () => {
    if (authenticated) {
      redirectToDashboard();
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
