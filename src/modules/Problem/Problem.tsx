import type React from 'react';
import { Card } from '../../components/Card';
import { Section } from '../../components/Section';

export const Problem: React.FC = () => {
  return (
    <Section>
      <div className="border problem__section">
        <div style={{ flex: 1 }}>
          <h2
            style={{
              flex: 1,
              fontFamily: 'monospace',
              fontSize: '38px',
              fontWeight: '600',
              minWidth: '400px',
            }}
          >
            Build onchain applications with the deepest data source.
          </h2>
        </div>
        <div className="problem__section__description">
          <h5 color="" style={{ fontWeight: 'normal', lineHeight: '28px' }}>
            The quantity of onchain data is increasing exponentially - no centralized entity can
            organize everything.
          </h5>
          <h5 style={{ fontWeight: 'normal', lineHeight: '28px' }}>
            The Zapper API uses a distributed community of curators to make onchain data human-readable and cover the long-tail of onchain applications.
          </h5>
        </div>
      </div>
    </Section>
  );
};
