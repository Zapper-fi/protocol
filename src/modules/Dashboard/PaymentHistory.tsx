import { gql } from '@apollo/client';
import { formatDate } from '../../helpers/formatDate';
import { useAuthQuery } from '../../helpers/useAuthQuery';
import { Card } from '../../components/Card';
import { Pill } from '../../components/Pill';

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
        <table className="table w-full">
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
                    <Pill variant={mapStatus[payment.status]}>{payment.status}</Pill>
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
  confirmed: 'success',
  pending: 'warning',
  failed: 'error',
};
