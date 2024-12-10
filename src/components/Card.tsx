import type React from 'react';

export const Card: React.FC<{
  children: React.ReactNode;
  style: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <div
      className="bg-card"
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
