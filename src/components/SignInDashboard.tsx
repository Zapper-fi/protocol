import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import { Button } from '@site/src/components/Button';
import { useSignIn } from '@site/src/helpers/useSignIn';

export function SignInDashboard({ type = 'link' }: { type: 'link' | 'button' }) {
  const history = useHistory();

  const redirectToDashboard = () => {
    history.push('/dashboard');
  };

  const { authenticated, login } = useSignIn({
    onComplete: redirectToDashboard,
  });

  const handleClick = (e) => {
    e.preventDefault();

    if (authenticated) {
      redirectToDashboard();
    } else {
      login();
    }
  };

  if (type === 'button') {
    return (
      <Button height="h-12" textSize="text-[14px]" type="button" variant="primary" onClick={handleClick}>
        Get Your API Key
      </Button>
    );
  }

  return (
    <Link className="text-primary" href="/dashboard" onClick={handleClick}>
      Dashboard
    </Link>
  );
}
