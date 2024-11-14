import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { usePrivy } from '@privy-io/react-auth';
import { Card } from '@site/src/components/Card';
import { Button } from '@site/src/components/Button';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { openPopup } from '@site/src/helpers/openPopup';
import { Info } from 'lucide-react';
import ReactDOM from 'react-dom';

const QUERY = gql`
  query BuyCredits {
    apiClientById {
      apiV1PointsRemaining
      apiV2PointsRemaining
    }
  }
`;

const CREATE_CHARGE = gql`
  mutation CreateCharge($pointsAmount: Int!, $userEmail: String!) {
    createCharge(pointsAmount: $pointsAmount, userEmail: $userEmail) {
      hostedUrl
    }
  }
`;

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

const MIN_POINTS = 50;

export function BuyCredits() {
  const { user } = usePrivy();
  const { data } = useAuthQuery(QUERY);
  const [points, setPoints] = useState(MIN_POINTS);
  const [displayPoints, setDisplayPoints] = useState(MIN_POINTS.toString());
  const [errorMessage, setErrorMessage] = useState('');

  const [createCharge, { loading, error }] = useMutation(CREATE_CHARGE, {
    onCompleted: (data) => {
      if (data?.createCharge.hostedUrl) {
        const url = data.createCharge.hostedUrl;
        openPopup({ url });
      }
    },
  });

  const calculateCost = (points) => {
    return (points / 10).toFixed(2);
  };

  const normalizePoints = (value) => {
    const numValue = Number.parseInt(value) || 0;
    if (numValue < MIN_POINTS) {
      setErrorMessage(`Minimum points amount is ${MIN_POINTS}`);
      return MIN_POINTS;
    }
    setErrorMessage('');
    return Math.floor(numValue / 50) * 50;
  };

  const handlePointsChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setDisplayPoints(rawValue);
  };

  const handleBlur = () => {
    const normalizedPoints = normalizePoints(displayPoints);
    setPoints(normalizedPoints);
    setDisplayPoints(normalizedPoints.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    const normalizedPoints = normalizePoints(displayPoints);
    setPoints(normalizedPoints);
    setDisplayPoints(normalizedPoints.toString());

    createCharge({
      variables: {
        pointsAmount: normalizedPoints,
        userId: user.id,
        userEmail: user.email.address,
      },
    });
  };

  const { apiV2PointsRemaining = 0, apiV1PointsRemaining } = data?.apiClientById || {};
  const displayV2Points =
    apiV2PointsRemaining < 0
      ? 10000 + apiV2PointsRemaining // Convert negative points to remaining free credits
      : apiV2PointsRemaining;
  const isNegativeBalance = apiV2PointsRemaining < 0;
  const disabled = loading || !user;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <h3>Buy Credits</h3>
        <div className="text-right">
          <p className="flex items-center justify-end gap-1">
            Credit balance:{' '}
            <span className={`font-bold ${isNegativeBalance ? 'text-yellow-500' : 'text-green-500'}`}>
              {Number(displayV2Points)}
            </span>
            {isNegativeBalance && <InfoIcon message="You are now consuming the free 10 000 credit grant from Zapper" />}
          </p>
          {Number(apiV1PointsRemaining) > 0 && (
            <p className="flex items-center justify-end gap-1">
              Legacy REST API credits: <span className="font-bold">{Number(apiV1PointsRemaining)}</span>
              <InfoIcon message="These credits are still available for use with the legacy REST API" />
            </p>
          )}
        </div>
      </div>

      <Card>
        {errorMessage && <p className="text-red-400">{errorMessage}</p>}

        {error && <p className="text-red-400">Error: {error.message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="space-y-2">
              <label htmlFor="points-input" className="text-sm font-medium">
                Credit Amount
              </label>
              <div className="h-10 flex items-center">
                <input
                  id="points-input"
                  type="text"
                  value={displayPoints}
                  onChange={handlePointsChange}
                  onBlur={handleBlur}
                  style={{
                    border: '1px solid grey',
                    borderRadius: '8px',
                    padding: '8px 12px',
                  }}
                  placeholder="Enter points amount"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="cost-display" className="text-sm font-medium">
                Cost
              </label>
              <div className="h-10 flex items-center">
                <div
                  id="cost-display"
                  className="font-extrabold text-[#A387FF] bg-transparent"
                  aria-label={`Cost: $${calculateCost(displayPoints)}`}
                >
                  USD ${calculateCost(displayPoints)}
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" variant="primary" disabled={disabled} className="w-full">
            Buy for USD ${calculateCost(points)}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default BuyCredits;
