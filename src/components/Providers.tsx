import { AuthProvider } from './AuthProvider';
import { GqlProvider } from './GqlProvider';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <GqlProvider>{children}</GqlProvider>
    </AuthProvider>
  );
}
