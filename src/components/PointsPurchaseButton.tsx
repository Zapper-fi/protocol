import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useZapperApiFetcher } from '../hooks/useZapperApiFetcher';

const PointsPurchaseButton = () => {
  const { authenticated, user } = usePrivy();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pointsPurchased, setPointsPurchased] = useState(0);
  const fetcher = useZapperApiFetcher();

  const createCharge = async (pointsAmount) => {
    if (!fetcher) {
      throw new Error('API fetcher is not available');
    }

    try {
      // Use GraphQL mutation to create the charge via backend
      const mutation = `
        mutation CreateCharge($pointsAmount: Int!, $userId: String!, $userEmail: String!) {
          createCharge(pointsAmount: $pointsAmount, userId: $userId, userEmail: $userEmail) {
            hostedUrl
            chargeId
          }
        }
      `;

      // Send the mutation request to the backend
      const result = await fetcher(mutation, {
        pointsAmount,
        userId: user.id,
        userEmail: user.email.address,
      });

      const { hostedUrl } = result.data.createCharge;

      if (!hostedUrl) {
        throw new Error('No checkout URL received from the backend');
      }

      return hostedUrl;
    } catch (error) {
      console.error('Error creating charge:', error);
      throw new Error(`Failed to create payment charge: ${error.message}`);
    }
  };

  const handlePurchase = async (pointsAmount) => {
    if (!authenticated) {
      setError('Please login first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Starting purchase process...');

      // Get hosted URL from backend
      const hostedUrl = await createCharge(pointsAmount);
      
      if (!hostedUrl) {
        throw new Error('No checkout URL received from backend');
      }

      console.log('Opening checkout URL:', hostedUrl);
      const checkoutWindow = window.open(hostedUrl, '_blank');
      
      if (!checkoutWindow) {
        throw new Error('Popup was blocked. Please allow popups for this site.');
      }

      setLoading(false);

    } catch (error) {
      console.error('Purchase error:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg shadow-sm bg-white p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Purchase API Points</h2>
      </div>
      
      <div className="space-y-4">
        {!authenticated ? (
          <p className="text-red-500">Please login to purchase points</p>
        ) : (
          <div className="space-y-4">
            {pointsPurchased > 0 ? (
              <div className="text-center">
                <p className="text-green-500 font-bold mb-2">Purchase Complete!</p>
                <p>You have purchased {pointsPurchased} points</p>
              </div>
            ) : (
              <button
                className={`w-full px-4 py-2 rounded ${
                  loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors`}
                onClick={() => handlePurchase(50)}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Buy 100 Points - $10'}
              </button>
            )}
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsPurchaseButton;
