import { usePrivy } from '@privy-io/react-auth';

export function Debug() {
  const { ready, user } = usePrivy();

  const value = ready ? JSON.stringify(user, null, 2) : '';

  return (
    <details className="mb-8">
      <summary>Debug</summary>

      <textarea rows={10} className="w-full" defaultValue={value} />
    </details>
  );
}
