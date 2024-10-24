import React, { useState } from 'react';
import { usePrivy, useFundWallet } from '@privy-io/react-auth';
import { mainnet } from 'viem/chains';

const FundWalletButton = () => {
  const { user } = usePrivy();
  const { fundWallet } = useFundWallet();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFundWallet = async () => {
    if (!user?.wallet?.address) {
      setError('No wallet found to fund');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await fundWallet(user.wallet.address, {
        chain: mainnet,
        asset: 'native-currency',
        amount: '0.01',
      });
      setLoading(false);
    } catch (error) {
      console.error("Funding error:", error);
      setError('Failed to fund wallet');
      setLoading(false);
    }
  };

  return (
    <>
      {user?.wallet?.address && (
        <button
          className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white transition-colors"
          onClick={handleFundWallet}
          disabled={loading}
        >
          {loading ? 'Funding...' : 'Fund Wallet'}
        </button>
      )}
      {error && (
        <p className="mt-2 text-red-500">
          {error}
        </p>
      )}
    </>
  );
};

export default FundWalletButton;
