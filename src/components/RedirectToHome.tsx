import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export function RedirectToHome() {
  const history = useHistory();

  useEffect(() => {
    history.replace('/');
  }, [history]);

  return null;
}
