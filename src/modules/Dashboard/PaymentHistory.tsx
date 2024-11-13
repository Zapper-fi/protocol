import { gql } from '@apollo/client';
import { Card } from '@site/src/components/Card';
import { formatDate } from '@site/src/helpers/formatDate';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { Info } from 'lucide-react';
import { useState } from 'react';
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
  confirmed: 'The payment has been completed, and your credits have been added.',
  pending: "We've received the payment and it's now being processed. You'll receive your credits in a few minutes.",
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
      className="absolute bg-gray-800 text-white p-2 rounded-md text-xs max-w-[200px] whitespace-normal"
      style={{
        top: position.top,
        left: position.left + 10,
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

  return (
    <div className="relative inline-flex items-center">
      <div
        className="cursor-pointer flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowToast(false)}
      >
        <Info className="h-3 w-3 text-gray-400" />
      </div>
      {showToast && <Toast message={message} position={position} />}
    </div>
  );
};

export function PaymentHistory() {
  const { data, loading, error } = useAuthQuery(QUERY);
  const { payments = [] } = data?.apiClientById || {};

  const sortedPayments = [...payments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment History</h3>

      <table className="table w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-right">Credits</th>
            <th className="text-right">Amount</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedPayments.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-gray-500">
                No purchases found
              </td>
            </tr>
          ) : (
            sortedPayments.map((payment) => (
              <tr key={payment.createdAt}>
                <td>{formatDate(payment.createdAt)}</td>
                <td className="text-right">{payment.creditsPurchased}</td>
                <td className="text-right">{payment.amount}</td>
                <td>
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
    </div>
  );
}

export default PaymentHistory;
