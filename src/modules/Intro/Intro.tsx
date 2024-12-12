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
              <h4 className="mb-4 font-normal text-white">{siteConfig.title}</h4>

              <p className="mb-4">
                <SignInDashboard type="button" />
              </p>

              <p className="text-sm text-white">
                Want to contribute to our interpretation protocol?{' '}
                <Link to="/docs/interpretation/contribute" className="font-semibold hover:opacity-80">
                  Start Here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
