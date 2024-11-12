import { gql } from '@apollo/client';
import { formatDate } from '@site/src/helpers/formatDate';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { Card } from '@site/src/components/Card';

const QUERY = gql`
  query PaymentHistory {
    apiClientById {
      payments {
        amount
        creditsPurchased
        createdAt
        status
      }
    }
  }
`;

export function PaymentHistory() {
  const { data, loading, error } = useAuthQuery(QUERY);

  const { payments = [] } = data?.apiClientById || {};

  return (
    <Card>
      <h3>Payment History</h3>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-400">Error: {error.message}</p>}

      {!loading && !error && !payments ? (
        <p>No data found</p>
      ) : (
        <table className="table w-full text-sm">
          <thead>
            <tr>
              <th className="text-start">Date</th>
              <th className="text-center">Credits</th>
              <th className="text-end">Amount</th>
              <th className="text-start">Status</th>
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
                  <td className="text-center">{payment.creditsPurchased}</td>
                  <td className="text-end">{payment.amount}</td>
                  <td className="text-start">
                    <span className={mapStatus[payment.status]}>{payment.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </Card>
  );
}

const mapStatus = {
  confirmed: 'text-green-400',
  pending: 'text-yellow-400',
  failed: 'text-red-400',
};
