import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import { Button } from '@site/src/components/Button';
import { useSignIn } from '@site/src/helpers/useSignIn';

interface SignInDashboardProps {
  type?: 'link' | 'button';
  buttonText?: string;
}

export function SignInDashboard({ 
  type = 'link',
  buttonText = 'Get Your API Key'
}: SignInDashboardProps) {
  const history = useHistory();

  const redirectToDashboard = () => {
    history.push('/dashboard');
  };

  const { authenticated, login } = useSignIn({
    onComplete: redirectToDashboard,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (authenticated) {
      redirectToDashboard();
    } else {
      login();
    }
  };

  if (type === 'button') {
    return (
      <Button 
        height="h-12" 
        textSize="text-[14px]" 
        type="button" 
        variant="primary" 
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    );
  }

  return (
    <Link 
      className="text-primary" 
      href="/dashboard" 
      onClick={handleClick}
    >
      Dashboard
    </Link>
  );
}