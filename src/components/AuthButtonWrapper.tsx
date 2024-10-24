import React, { useState } from 'react';
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import { useZapperApiFetcher } from '../hooks/useZapperApiFetcher';
import PointsPurchaseButton from './PointsPurchaseButton';
import FundWalletButton from './FundWalletButton'; 
import AuthButton from './AuthButton';

const PRIVY_APP_ID = 'cm2ateeqj0531q8pbixyb92qu';

export const AuthSection = () => {
  const { authenticated } = usePrivy();

  return (
    <div className="p-4">
      <AuthButton />

      {authenticated && (
        <div className="mt-4">
          <FundWalletButton />
          <PointsPurchaseButton />
        </div>
      )}
    </div>
  );
};

export const AuthButtonWrapper = () => {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://protocol.zapper.xyz/img/logo.png',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        fundingMethodConfig: { 
          moonpay: { 
            paymentMethod: 'credit_debit_card',
            uiConfig: { accentColor: '#696FFD', theme: 'light' },
          }, 
        },
      }}
    >
      <AuthSection />
    </PrivyProvider>
  );
};

