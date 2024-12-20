import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export function RedirectToLogin() {
  const history = useHistory();

  useEffect(() => {
    history.replace('/login');
  }, [history]);

  return null;
}
