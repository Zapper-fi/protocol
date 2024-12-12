export function Button(props) {
  const { children, className, height = 'h-10', textSize = 'text-[16px]', ...rest } = props;

  return (
    <button
      className={`button--primary display-flex align-items-center cursor-pointer rounded-lg border-none px-4 ${height} ${textSize} font-semibold opacity-100 transition-all hover:opacity-80 ${className || ''}`}
      {...rest}
    >
      {children}
    </button>
  );
}
