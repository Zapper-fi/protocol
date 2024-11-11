import clsx from 'clsx';

export function Pill({ variant, children }) {
  return (
    <span
      className={clsx('inline-block px-2 py-1 rounded-md text-xs font-medium', {
        'text-green-400 bg-green-900': variant === 'success',
        'text-red-400 bg-red-900': variant === 'error',
        'text-yellow-400 bg-yellow-900': variant === 'warning',
        'text-blue-400 bg-blue-900': variant === 'info',
      })}
    >
      {children}
    </span>
  );
}
