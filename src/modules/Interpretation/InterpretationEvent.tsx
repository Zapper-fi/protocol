import type React from 'react';
import { ButtonGroup } from '../../components/ButtonGroup';
import { LinkButton } from '../../components/LinkButton';
import { Media } from '../../components/Media';
import { Section } from '../../components/Section';

export const InterpretationEvent: React.FC = () => {
  return (
    <Section className="no-padding-mobile" style={{ padding: '0px 32px' }}>
      <div
        style={{
          display: 'flex',
          gap: '64px',
          alignItems: 'center',
          flexWrap: 'wrap',
          position: 'relative',
          justifyContent: 'space-between',
        }}
      >
        <div
          className="full-width-mobile"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '500px',
            height: 'fit-content',
          }}
        >
          <h2
            className="mobile-wrap"
            style={{
              flex: 1,
              fontWeight: '600',
              whiteSpace: 'nowrap',
            }}
          >
            Event{' '}
            <span className="text-alt-color" style={{ fontWeight: 500 }}>
              Interpretation
            </span>
          </h2>
          <p className="text-alt-color">
            Event Interpreters are used on onchain transactions to translate them into human-readable output, and
            augment them with contextual, and often off-chain, information.
          </p>
          <ButtonGroup>
            <LinkButton
              href="/docs/interpretation/event-interpretation/guide/getting-started"
              buttonCopy="Get Started"
            />
            <LinkButton
              href="/docs/interpretation/event-interpretation/overview"
              buttonCopy="Learn More"
              type="secondary"
            />
          </ButtonGroup>
        </div>
        <div
          className="border"
          style={{
            textAlign: 'center',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
            minWidth: '50%',
            maxWidth: '800px',
          }}
        >
          <Media src="./videos/Event_Light.mp4" darkSrc="./videos/Event_Dark.mp4" isVideo />
        </div>
      </div>
    </Section>
  );
};
