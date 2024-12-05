import type React from 'react';
import { Section } from '../components/Section';

export const Metrics: React.FC = () => {
  return (
    <Section className="no-padding-mobile" style={{ padding: '64px 32px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        <h2
          style={{
            fontWeight: '600',
          }}
        >
          Our Metrics
        </h2>
        <div
          style={{
            display: 'flex',
            gap: '32px',
            flexGrow: 1,
            minWidth: 'fit-content',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              flex: '1',
              borderLeft: 'solid 2px #a387ff',
              padding: '0px 16px',
              flexDirection: 'column',
              display: 'flex',
              gap: '0px',
              justifyContent: 'center',
            }}
          >
            <h3 style={{ marginBottom: '0px' }}>22.91 Billion</h3>
            <p style={{ marginBottom: '0px', whiteSpace: 'nowrap' }}>Human-Readable Transactions</p>
          </div>
          <div
            style={{
              flex: '1',
              borderLeft: 'solid 2px #a387ff',
              padding: '0px 16px',
              flexDirection: 'column',
              display: 'flex',
              gap: '0px',
              justifyContent: 'center',
            }}
          >
            <h3 style={{ marginBottom: '0px' }}>4,400</h3>
            <p style={{ marginBottom: '0px', whiteSpace: 'nowrap' }}>Position Interpreters</p>
          </div>
          <div
            style={{
              flex: '1',
              borderLeft: 'solid 2px #a387ff',
              padding: '0px 16px',
              flexDirection: 'column',
              display: 'flex',
              gap: '0px',
              justifyContent: 'center',
            }}
          >
            <h3 style={{ marginBottom: '0px' }}>12,000</h3>
            <p style={{ marginBottom: '0px', whiteSpace: 'nowrap' }}>Transaction Interpreters</p>
          </div>
          <div
            style={{
              flex: '1',
              borderLeft: 'solid 2px #a387ff',
              padding: '0px 16px',
              flexDirection: 'column',
              display: 'flex',
              gap: '0px',
              justifyContent: 'center',
            }}
          >
            <h3 style={{ marginBottom: '0px' }}>
              <a href="/docs/api-intro/supported-chains">33</a>
            </h3>
            <p style={{ marginBottom: '0px', whiteSpace: 'nowrap' }}>Chains Supported</p>
          </div>
        </div>
      </div>
    </Section>
  );
};
