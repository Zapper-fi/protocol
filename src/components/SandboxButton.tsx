import { LinkButton } from '@site/src/components/LinkButton';
import useBaseUrl from '@docusaurus/useBaseUrl';

export const SandboxButton = () => {
  const sandboxUrl = useBaseUrl('/docs/api/sandbox');
  return <LinkButton href={sandboxUrl} type="primary" buttonCopy="Try in sandbox" />;
};
