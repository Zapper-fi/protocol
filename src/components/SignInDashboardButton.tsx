import { Button } from '@site/src/components/Button';
import { useSignIn } from '@site/src/helpers/useSignIn';

export function SignInDashboardButton() {
  const onComplete = () => {
    window.location.href = '/dashboard';
  };

  const { login } = useSignIn({ onComplete });
  return (
    <Button height="h-8" textSize="text-[14px]" type="button" variant="primary" onClick={login}>
      Get Your API Key
    </Button>
  );
}
