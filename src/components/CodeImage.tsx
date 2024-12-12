import CodeBlock from '@theme/CodeBlock';

export function CodeImage({ src, alt, children }) {
  return (
    <div className="relative hidden md:block">
      <div className="grid h-[400px] overflow-y-auto rounded-3xl">
        <CodeBlock language="graphql" className="!mb-0">
          {children}
        </CodeBlock>
      </div>
      <img src={src} alt={alt} className="absolute bottom-0 right-0 h-1/2 md:right-8 md:top-8 md:h-[calc(100%-2rem)]" />
    </div>
  );
}
