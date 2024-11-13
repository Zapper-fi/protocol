import { gql } from '@apollo/client';
import { formatDate } from '@site/src/helpers/formatDate';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { Card } from '@site/src/components/Card';
import { Info } from 'lucide-react';
import { useState } from 'react';
import styles from '@site/src/pages/index.module.scss';
import ReactDOM from 'react-dom';

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

const statusInfo = {
  confirmed: 'The payment has been completed, and your points have been added.',
  pending: "We've received the payment and it's now being processed. You'll receive your points in a few minutes.",
  failed: 'The payment has failed. Please contact us if the issue persists.',
};

const mapStatus = {
  confirmed: 'text-green-400',
  pending: 'text-yellow-400',
  failed: 'text-red-400',
};

const Toast = ({ message, position }) => {
  return ReactDOM.createPortal(
    <div
      className={styles.popup}
      style={{
        top: position.top,
        left: position.left + 10,
        maxWidth: '200px',
        whiteSpace: 'normal',
        fontSize: '12px',
      }}
    >
      {message}
    </div>,
    document.body,
  );
};

const InfoIcon = ({ message }) => {
  const [showToast, setShowToast] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY + rect.height,
      left: rect.left + window.scrollX,
    });
    setShowToast(true);
  };

  const handleMouseLeave = () => {
    setShowToast(false);
  };

  return (
    <div className="relative inline-flex items-center">
      <div className="cursor-pointer flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Info className="h-3 w-3 text-gray-400" />
      </div>
      {showToast && <Toast message={message} position={position} />}
    </div>
  );
};

export function PaymentHistory() {
  const { data, loading, error } = useAuthQuery(QUERY);

  const { payments = [] } = data?.apiClientById || {};

  const sortedPayments = [...payments].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-2">
      <h3>Payment History</h3>
      <Card>
        {loading && <p>Loading...</p>}

        {error && <p className="text-red-400">Error: {error.message}</p>}

        {!loading && !error && payments.length === 0 ? (
          <p>No purchases found</p>
        ) : (
          <table className="table w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Date</th>
                <th className="text-left">Credits</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedPayments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No purchases found
                  </td>
                </tr>
              ) : (
                sortedPayments.map((payment) => (
                  <tr key={payment.createdAt}>
                    <td className="text-left">{formatDate(payment.createdAt)}</td>
                    <td className="text-left">{payment.creditsPurchased}</td>
                    <td className="text-left">{payment.amount}</td>
                    <td className="text-left">
                      <div className="flex items-center gap-1">
                        <span className={mapStatus[payment.status]}>{payment.status}</span>
                        <InfoIcon message={statusInfo[payment.status]} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
