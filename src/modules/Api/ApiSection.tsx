import React from 'react';
import { LinkButton } from '../../components/LinkButton';
import { Section } from '../../components/Section';
import { AccountTimelines } from './AccountTimelines';
import { Labelling } from './Labelling';
import { PortfolioTracking } from './PortfolioTracking';

enum TabEnum {
  Portfolio = 'portfolio',
  Timeline = 'timeline',
  Labels = 'labels',
}

export const ApiSection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(TabEnum.Portfolio);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              borderStyle: 'solid',
              borderWidth: '1px',
              padding: '8px 24px',
              borderRadius: '16px',
              width: 'fit-content',
              fontWeight: '600',
            }}
            className="border text-alt-color"
          >
            Powered by an open interpretation layer
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <h1
              style={{
                flex: 1,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              The Complete Onchain API
            </h1>
            <p
              className="text-alt-color"
              style={{
                fontWeight: '300',
                textAlign: 'center',
                maxWidth: '720px',
              }}
            >
              A single API to access all DeFi positions, tokens, apps, NFT collections, and human-readable transaction histories across 30+ chains 一 all available with a few lines of code.
            </p>
          </div>
          <LinkButton href="docs/api-intro" type="primary" buttonCopy="Learn More" />
        </div>
      </div>
      <Section
        className="border mobile-padding hide-mobile"
        style={{
          margin: '32px 0px',
          alignItems: 'center',
        }}
      >
        <div
          className="full-width-mobile"
          style={{
            display: 'flex',
            gap: '16px',
            width: '100%',
            maxWidth: '600px',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="opacity-hover"
            onClick={() => setActiveTab(TabEnum.Portfolio)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '120px',
              maxWidth: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
            }}
          >
            <div className="card" style={{ padding: '16px' }}>
              <img width="48px" height="48px" src="./img/react-icons/RiDonutChartFill.svg" alt="DeFi" />
            </div>

            <p
              style={{
                marginBottom: '0px',
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              Portfolio Tracking
            </p>
            <div
              className={activeTab === TabEnum.Portfolio ? 'bg-accent-color' : ''}
              style={{ height: '2px', display: 'block', width: '48px' }}
            />
          </div>
          <div
            className="opacity-hover"
            onClick={() => setActiveTab(TabEnum.Timeline)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '120px',
              maxWidth: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
            }}
          >
            <div className="card" style={{ padding: '16px' }}>
              <img width="48px" height="48px" src="./img/react-icons/FaTimeline.svg" alt="DeFi" />
            </div>

            <p
              style={{
                marginBottom: '0px',
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              Account Timelines
            </p>
            <div
              className={activeTab === TabEnum.Timeline ? 'bg-accent-color' : ''}
              style={{ height: '2px', display: 'block', width: '48px' }}
            />
          </div>
          <div
            className="opacity-hover"
            onClick={() => setActiveTab(TabEnum.Labels)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '120px',
              maxWidth: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer',
            }}
          >
            <div className="card" style={{ padding: '16px' }}>
              <img width="48px" height="48px" src="./img/react-icons/RiDraftFill.svg" alt="DeFi" />
            </div>

            <p
              style={{
                marginBottom: '0px',
                textAlign: 'center',
                fontWeight: '500',
              }}
            >
              Contract Labelling
            </p>
            <div
              className={activeTab === TabEnum.Labels ? 'bg-accent-color' : ''}
              style={{ height: '2px', display: 'block', width: '48px' }}
            />
          </div>
        </div>
      </Section>
      {activeTab === TabEnum.Portfolio && <PortfolioTracking />}
      {activeTab === TabEnum.Timeline && <AccountTimelines />}
      {activeTab === TabEnum.Labels && <Labelling />}
    </div>
  );
};
