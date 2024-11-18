export function Button(props) {
  const { children, className, height = 'h-10', textSize = 'text-[16px]', ...rest } = props;

  return (
    <button
      className={`button--primary cursor-pointer border-none rounded-lg px-4 display-flex align-items-center ${height} ${textSize} font-semibold opacity-100 hover:opacity-80 transition-all ${className || ''}`}
      {...rest}
    >
      {children}
    </button>
  );
}
