import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import type React from 'react';
import { SignInDashboard } from '@site/src/components/SignInDashboard';

export const Intro: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="intro">
      <div className="container" style={{ height: '100%', position: 'absolute', zIndex: -1 }}>
        <img
          loading="lazy"
          alt="illuminating the onchain world"
          src="./img/background.png"
          className="intro__background"
        />
      </div>
      <div className="container" style={{ height: '100%' }}>
        <div className="intro__content">
          <div className="intro__content__child">
            <h1>{siteConfig.tagline}</h1>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <h4 className="text-white font-normal mb-4">{siteConfig.title}</h4>

              <p className="mb-4">
                <SignInDashboard type="button" />
              </p>

              <p className="text-white text-sm">
                Want to contribute to our interpretation protocol?{' '}
                <Link to="/docs/interpretation/contribute" className="hover:opacity-80">
                  Start Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
