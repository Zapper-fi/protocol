export function CodeImage({ src, alt, children }) {
  return (
    <div className="relative">
      <div className="h-[400px] rounded-3xl grid overflow-y-auto ">{children}</div>
      <img src={src} alt={alt} className="absolute bottom-0 right-4 h-full" />
    </div>
  );
}
