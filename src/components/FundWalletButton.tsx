import React, { useState } from 'react';
import { usePrivy, useFundWallet } from '@privy-io/react-auth';
import { mainnet } from 'viem/chains'; // Import the correct chain object

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

    setError(''); // Clear any previous errors
    setLoading(true); // Set loading state

    try {
      // Trigger the funding flow using fundWallet hook
      await fundWallet(user.wallet.address, {
        chain: mainnet,  // Use the chain object imported from 'viem/chains'
        asset: 'native-currency',  // Fund with the chain's native currency (e.g., ETH)
        amount: '0.01',  // Specify the amount to fund
      });
      setLoading(false); // Reset loading state
    } catch (error) {
      console.error("Funding error:", error);
      setError('Failed to fund wallet');
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      {user?.wallet?.address && (
        <button
          className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white transition-colors"
          onClick={handleFundWallet}
          disabled={loading} // Disable button when loading
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
