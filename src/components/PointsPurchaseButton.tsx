import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useZapperApiFetcher } from '../hooks/useZapperApiFetcher';

const PointsPurchaseButton = () => {
  const { authenticated, user } = usePrivy();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fetcher = useZapperApiFetcher();

  const handleError = (message) => {
    console.error(message);
    setError(message);
    setLoading(false);
  };

  const createCharge = async (pointsAmount) => {
    if (!fetcher) throw new Error('API fetcher is not available');
    
    const mutation = `
      mutation CreateCharge($pointsAmount: Int!, $userId: String!, $userEmail: String!) {
        createCharge(pointsAmount: $pointsAmount, userId: $userId, userEmail: $userEmail) {
          hostedUrl
        }
      }
    `;

    try {
      const result = await fetcher(mutation, {
        pointsAmount,
        userId: user.id,
        userEmail: user.email.address,
      });

      const { hostedUrl } = result.data.createCharge;
      if (!hostedUrl) throw new Error('No checkout URL received from the backend');
      
      return hostedUrl;
    } catch (error) {
      handleError(`Failed to create payment charge: ${error.message}`);
      throw error;
    }
  };

  const handlePurchase = async (pointsAmount) => {
    if (!authenticated) return setError('Please login first');

    setLoading(true);
    setError('');

    try {
      const hostedUrl = await createCharge(pointsAmount);
      const checkoutWindow = window.open(hostedUrl, '_blank');

      if (!checkoutWindow) throw new Error('Popup was blocked. Please allow popups for this site.');

      setLoading(false);
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg shadow-sm bg-white p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Purchase API Points</h2>

      {!authenticated ? (
        <p className="text-red-500">Please login to purchase points</p>
      ) : (
        <div className="space-y-4">
          <button
            className={`w-full px-4 py-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
            onClick={() => handlePurchase(50)}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Buy 100 Points - $10'}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default PointsPurchaseButton;
