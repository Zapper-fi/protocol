import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useZapperApiFetcher } from '../hooks/useZapperApiFetcher';

const COINBASE_COMMERCE_API_KEY = process.env.NEXT_PUBLIC_COINBASE_COMMERCE_API_KEY;
const COINBASE_COMMERCE_CHECKOUT_URL = 'https://api.commerce.coinbase.com/charges';

const PointsPurchaseButton = () => {
  const { authenticated, user } = usePrivy();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pointsPurchased, setPointsPurchased] = useState(0);
  const fetcher = useZapperApiFetcher();

  const createCharge = async (pointsAmount) => {
    try {
      console.log('Creating charge with Coinbase Commerce...');
      const response = await fetch(COINBASE_COMMERCE_CHECKOUT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': COINBASE_COMMERCE_API_KEY,
          'X-CC-Version': '2018-03-22'
        },
        body: JSON.stringify({
          name: 'API Points Purchase',
          description: `Purchase ${pointsAmount} API Points`,
          pricing_type: 'fixed_price',
          local_price: {
            amount: '5.00',
            currency: 'USD'
          },
          metadata: {
            customer_id: user?.id,
            customer_email: user?.email?.address,
            points_amount: pointsAmount
          }
        })
      });

      const data = await response.json();
      console.log('Coinbase Commerce response:', data);

      if (!data || !data.data || !data.data.hosted_url) {
        throw new Error('Invalid response from Coinbase Commerce');
      }

      return data.data;
    } catch (error) {
      console.error('Error creating charge:', error);
      throw new Error(`Failed to create payment charge: ${error.message}`);
    }
  };

  const checkChargeStatus = async (chargeId) => {
    try {
      const response = await fetch(`${COINBASE_COMMERCE_CHECKOUT_URL}/${chargeId}`, {
        headers: {
          'X-CC-Api-Key': COINBASE_COMMERCE_API_KEY,
          'X-CC-Version': '2018-03-22'
        }
      });

      const data = await response.json();
      console.log('Charge status response:', data);
      return data.data;
    } catch (error) {
      console.error('Error checking charge status:', error);
      throw new Error('Failed to check payment status');
    }
  };

  const handlePurchase = async (pointsAmount) => {
    if (!authenticated) {
      setError('Please login first');
      return;
    }

    if (!COINBASE_COMMERCE_API_KEY) {
      setError('Coinbase Commerce API key is not configured');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Starting purchase process...');
      const charge = await createCharge(pointsAmount);
      
      if (!charge.hosted_url) {
        throw new Error('No checkout URL received from Coinbase Commerce');
      }

      console.log('Opening checkout URL:', charge.hosted_url);
      const checkoutWindow = window.open(charge.hosted_url, '_blank');
      
      if (!checkoutWindow) {
        throw new Error('Popup was blocked. Please allow popups for this site.');
      }

      // Poll for payment status every 3 seconds
      const pollInterval = setInterval(async () => {
        const chargeStatus = await checkChargeStatus(charge.id);
        
        if (chargeStatus.timeline[chargeStatus.timeline.length - 1].status === 'COMPLETED') {
          clearInterval(pollInterval);
          setPointsPurchased(pointsAmount);
          
          // Here you would typically call your backend to update the user's points
          if (fetcher) {
            try {
              const mutation = `
                mutation UpdateUserPoints($userId: String!, $points: Int!) {
                  updateUserPoints(userId: $userId, points: $points) {
                    points
                  }
                }
              `;
              
              await fetcher(mutation, {
                userId: user.id,
                points: pointsAmount
              });
            } catch (error) {
              console.error('Failed to update points:', error);
              setError('Points purchased but failed to update balance');
            }
          }
          
          setLoading(false);
        }
      }, 3000);

      // Clear interval after 10 minutes (timeout)
      setTimeout(() => {
        clearInterval(pollInterval);
        if (loading) {
          setLoading(false);
          setError('Payment timeout. Please check your email for confirmation.');
        }
      }, 600000);

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
                onClick={() => handlePurchase(100)}
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