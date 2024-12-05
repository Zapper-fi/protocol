import CodeBlock from '@theme/CodeBlock';

export function CodeImage({ src, alt, children }) {
  return (
    <div className="relative">
      <div className="h-[400px] rounded-3xl grid overflow-y-auto">
        <CodeBlock language="graphql" className="!mb-0">
          {children}
        </CodeBlock>
      </div>
      <img src={src} alt={alt} className="absolute top-8 right-8 h-[calc(100%-2rem)]" />
    </div>
  );
}
