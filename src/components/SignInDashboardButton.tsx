import { useCallback } from 'react';
import { Button } from '@site/src/components/Button';
import { useSignIn } from '@site/src/helpers/useSignIn';

export function SignInDashboardButton() {
  const redirectToDashboard = useCallback(() => {
    window.location.href = '/dashboard';
  }, []);

  const { ready, authenticated, login } = useSignIn({ onComplete: redirectToDashboard });

  const handleClick = () => {
    if (ready && authenticated) {
      // redirectToDashboard();
      return;
    }

    login();
  };

  return (
    <Button height="h-12" textSize="text-[14px]" type="button" variant="primary" onClick={handleClick}>
      Get Your API Key
    </Button>
  );
}
