import type React from 'react';

export const Section: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}> = ({ children, style, className }) => {
  return (
    <div
      className={className}
      style={{
        padding: '32px 0px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        borderRadius: '16px',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
