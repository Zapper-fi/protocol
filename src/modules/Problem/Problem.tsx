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
            Onchain information is disorganized and unreadable.
          </h2>
        </div>
        <div className="problem__section__description">
          <h5 color="" style={{ fontWeight: 'normal', lineHeight: '28px' }}>
            The amount of onchain applications is increasing exponentially - no centralized entity will be able to
            organize everything.
          </h5>
          <h5 style={{ fontWeight: 'normal', lineHeight: '28px' }}>
          The Zapper API uses a distributed community of curators to make onchain data human-readable and cover the exponential growth of onchain applications.
          </h5>
        </div>
      </div>
    </Section>
  );
};
