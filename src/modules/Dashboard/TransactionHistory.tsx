import { formatDate } from '../../helpers/formatDate';
import { useApiUser } from '../../helpers/useApiUser';

export function TransactionHistory() {
  const { data, loading, error } = useApiUser();

  const { apiKey, payments } = data?.apiClient || {};

  return (
    <div className="mb-8">
      <h2>Transaction History</h2>

      {apiKey && <p>Recent purchases for API key: {apiKey}</p>}

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-400">Error: {error.message}</p>}

      {!loading && !error && !payments ? (
        <p>No data found</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Credits Purchased</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments?.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No purchases found
                </td>
              </tr>
            ) : (
              payments?.map((payment) => (
                <tr key={payment.createdAt}>
                  <td>{formatDate(payment.createdAt)}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.creditsPurchased}</td>
                  <td>{payment.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}