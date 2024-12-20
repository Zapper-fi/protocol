import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import { useModalStatus } from '@privy-io/react-auth';
import { useSignIn } from '@site/src/helpers/useSignIn';

function LoginPage() {
  const history = useHistory();
  const { isOpen } = useModalStatus();

  const redirectToDashboard = () => {
    history.push('/dashboard');
  };

  const { authenticated, ready, login } = useSignIn({
    onComplete: redirectToDashboard,
  });

  useEffect(() => {
    if (!ready || authenticated || isOpen) return;

    login();
  }, [ready, authenticated, isOpen, login]);

  return null;
}

export default LoginPage;
