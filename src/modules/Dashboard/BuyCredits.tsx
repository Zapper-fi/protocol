import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { usePrivy } from '@privy-io/react-auth';
import { Card } from '@site/src/components/Card';
import { Button } from '@site/src/components/Button';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { openPopup } from '@site/src/helpers/openPopup';

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

  const { apiV2PointsRemaining = 0 } = data?.apiClientById || {};
  const disabled = loading || !user;

  return (
    <div className="space-y-2">
      <h3>Buy Credits</h3>
      <p>Current balance: {Number(apiV2PointsRemaining)}</p>

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
                  className="font-extrabold text-purple-400 bg-transparent"
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
