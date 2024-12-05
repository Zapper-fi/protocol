export function CodeImage({ src, alt, children }) {
  return (
    <div className="relative">
      <div className="h-[400px] grid overflow-y-auto">{children}</div>
      <img src={src} alt={alt} className="opacity-90 absolute bottom-0 right-4 w-64" />
    </div>
  );
}
