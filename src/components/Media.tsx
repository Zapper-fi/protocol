import BrowserOnly from '@docusaurus/BrowserOnly';
import type React from 'react';

export const Media: React.FC<{
  src: string;
  darkSrc?: string;
  isVideo?: boolean;
}> = ({ ...props }) => {
  return (
    <BrowserOnly>
      {() => {
        return <MediaContent {...props} />;
      }}
    </BrowserOnly>
  );
};

const videoProps = {
  height: '100%',
  width: '100%',
  controls: false,
  autoPlay: true,
  loop: true,
  muted: true,
  playsInline: true,
};

const fallbackText = 'Your browser does not support the video tag.';

const MediaContent: React.FC<{
  src: string;
  darkSrc?: string;
  isVideo?: boolean;
}> = ({ src, darkSrc, isVideo }) => {
  if (isVideo) {
    return (
      <>
        <video {...videoProps} className="block object-cover dark:hidden">
          <source src={src} />
          {fallbackText}
        </video>
        <video {...videoProps} className="hidden object-cover mix-blend-lighten dark:block">
          <source src={darkSrc} />
          {fallbackText}
        </video>
      </>
    );
  }

  return (
    <>
      <img src={src} alt="media" className="block h-auto w-full dark:hidden" />
      <img src={darkSrc} alt="media" className="hidden h-auto w-full dark:block" />
    </>
  );
};
