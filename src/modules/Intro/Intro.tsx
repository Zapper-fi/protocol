import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type React from 'react';
import { ButtonGroup } from '../../components/ButtonGroup';
import { LinkButton } from '../../components/LinkButton';
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
            <h1 className={styles.title}>{siteConfig.tagline}</h1>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <h4 style={{ color: 'white' }} className={styles.subtitle}>
                {siteConfig.title}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
