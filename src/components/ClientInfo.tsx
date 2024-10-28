import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useZapperApiFetcher } from '../hooks/useZapperApiFetcher';

const ClientInfo = () => {
  const { user, authenticated } = usePrivy();
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState('');
  const fetcher = useZapperApiFetcher();

  useEffect(() => {
    const fetchClientData = async () => {
      if (!user || !fetcher) return;

      try {
        const query = `
          query GetClient($privyId: String!) {
            apiClient(privyId: $privyId) {
              totalPointsRemaining
              apiKey
              payments {
                amount
                creditsPurchased
                createdAt
                status
              }
            }
          }
        `;
        const variables = { privyId: user.id };

        const result = await fetcher(query, variables);
        const client = result.data?.apiClient;
        setClientData(client);
      } catch (err) {
        setError('Failed to fetch client data');
        console.error(err);
      }
    };

    if (authenticated) {
      fetchClientData();
    }
  }, [authenticated]);

  if (!authenticated) {
    return <p>Please login to see your information</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!clientData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full max-w-md mx-auto border rounded-lg shadow-sm bg-white p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Client Info</h2>
      
      <div className="mb-4">
        <p className="font-semibold">Total Points Remaining: {clientData.totalPointsRemaining}</p>
      </div>
  
      <div className="mb-4">
        <p className="font-semibold">API Key:</p>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{clientData.apiKey.join(', ')}</h3>
      </div>
  
      <div>
        <h3 className="font-semibold mb-2">Payments:</h3>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">Credits Purchased</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {clientData.payments
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((payment, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{payment.amount}</td>
                  <td className="border px-2 py-1">{payment.creditsPurchased}</td>
                  <td className="border px-2 py-1">{payment.status}</td>
                  <td className="border px-2 py-1">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default ClientInfo;
