import { AuthProvider } from './Dashboard/AuthProvider';
import { GqlProvider } from './Dashboard/GqlProvider';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <GqlProvider>{children}</GqlProvider>
    </AuthProvider>
  );
}
