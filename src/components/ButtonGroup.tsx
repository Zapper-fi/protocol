import type React from 'react';

export const ButtonGroup: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div style={{ display: 'flex', gap: '16px' }}>{children}</div>;
};
