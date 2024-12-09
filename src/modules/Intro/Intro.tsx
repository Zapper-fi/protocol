import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import type React from 'react';
import { SignInDashboard } from '@site/src/components/SignInDashboard';
import styles from '../../pages/index.module.scss';

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
              <h4 style={{ color: 'white' }} className={styles.subtitle}>
                <span style={{ marginBottom: '16px', display: 'block' }}>{siteConfig.title}</span>
                <SignInDashboard type="button" />
              </h4>

              <Link
                to="/docs/interpretation/contribute"
                className="text-sm hover:opacity-80 mt-2"
                style={{ color: 'white' }}
              >
                Want to contribute to our interpretation protocol? Learn how
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
