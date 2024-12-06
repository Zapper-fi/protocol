import CodeBlock from '@theme/CodeBlock';

export function CodeImage({ src, alt, children }) {
  return (
    <div className="relative hidden md:block">
      <div className="h-[400px] rounded-3xl grid overflow-y-auto">
        <CodeBlock language="graphql" className="!mb-0">
          {children}
        </CodeBlock>
      </div>
      <img src={src} alt={alt} className="absolute bottom-0 right-0 md:top-8 md:right-8 h-1/2 md:h-[calc(100%-2rem)]" />
    </div>
  );
}
