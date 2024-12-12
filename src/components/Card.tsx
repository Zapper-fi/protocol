import clsx from 'clsx';
import type React from 'react';

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  style: React.CSSProperties;
}> = ({ children, className, style }) => {
  return (
    <div
      className={clsx('bg-card', className)}
      style={{
        ...style,
        padding: '16px',
        borderRadius: '16px',
      }}
    >
      {children}
    </div>
  );
};
