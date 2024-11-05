import React from 'react';
import { Section } from '../../components/Section';

enum AccountTimelineType {
  Timeline = 'App Holdings',
  Transaction = 'Transaction',
  Feeds = 'Feeds',
}

export const AccountTimelines: React.FC = () => {
  const [selectedType, setSelectedType] = React.useState<AccountTimelineType>(AccountTimelineType.Timeline);

  return (
    <Section className="border hide-mobile" style={{ borderWidth: '1px', borderStyle: 'solid', padding: '64px 32px' }}>
      <div
        style={{
          display: 'flex',
          gap: '64px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            flex: 1,
            height: 'fit-content',
            minWidth: '500px',
          }}
        >
          <div
            className="opacity-hover"
            style={{
              cursor: 'pointer',
              width: '100%',
              flexDirection: 'column',
            }}
            onClick={() => setSelectedType(AccountTimelineType.Timeline)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <h5>Account Timelines</h5>
              <span
                style={{
                  fontSize: '24px',
                  marginTop: '-24px',
                  transform: selectedType === AccountTimelineType.Timeline ? 'rotate(180deg)' : 'initial',
                }}
              >
                ⌄
              </span>
            </div>
            {selectedType === AccountTimelineType.Timeline && (
              <p className="text-alt-color">Track complete transaction histories for accounts.</p>
            )}
          </div>
          <hr />
          <div
            className="opacity-hover"
            style={{
              cursor: 'pointer',
              width: '100%',
              flexDirection: 'column',
            }}
            onClick={() => setSelectedType(AccountTimelineType.Transaction)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <h5>Transaction</h5>
              <span
                style={{
                  fontSize: '24px',
                  marginTop: '-24px',
                  transform: selectedType === AccountTimelineType.T ? 'rotate(180deg)' : 'initial',
                }}
              >
                ⌄
              </span>
            </div>
            {selectedType === AccountTimelineType.Transaction && (
              <p className="text-alt-color">Access contextual information about single transactions.</p>
            )}
          </div>
          <hr />
          <div
            className="opacity-hover"
            style={{
              cursor: 'pointer',
              width: '100%',
              flexDirection: 'column',
            }}
            onClick={() => setSelectedType(AccountTimelineType.Feeds)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <h5>Feeds</h5>
              <span
                style={{
                  fontSize: '24px',
                  marginTop: '-24px',
                  transform: selectedType === AccountTimelineType.Feeds ? 'rotate(180deg)' : 'initial',
                }}
              >
                ⌄
              </span>
            </div>
            {selectedType === AccountTimelineType.Feeds && (
              <p className="text-alt-color">Track activity happening in different onchain apps.</p>
            )}
          </div>
        </div>
        <div style={{ flex: 1, textAlign: 'center', height: '420px' }}>
          {selectedType === AccountTimelineType.Timeline && (
            <img
              height="100%"
              width="100%"
              src="./img/assets/User_Timeline.svg"
              alt="placeholder"
              style={{ objectFit: 'contain', minWidth: '500px' }}
            />
          )}
          {selectedType === AccountTimelineType.Transaction && (
            <img
              height="100%"
              width="100%"
              src="./img/assets/Transactions.svg"
              alt="placeholder"
              style={{ objectFit: 'contain', minWidth: '500px' }}
            />
          )}
          {selectedType === AccountTimelineType.Feeds && (
            <img
              height="100%"
              width="100%"
              src="./img/assets/App_Feeds.svg"
              alt="placeholder"
              style={{ objectFit: 'contain', minWidth: '500px' }}
            />
          )}
        </div>
      </div>
    </Section>
  );
};
