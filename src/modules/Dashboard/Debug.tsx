import { usePrivy } from '@privy-io/react-auth';

export function Debug() {
  const { authenticated, user } = usePrivy();

  return (
    <details className="mb-8">
      <summary>Debug</summary>

      <textarea rows={10} className="w-full" defaultValue={JSON.stringify(user, null, 2)} />
    </details>
  );
}
