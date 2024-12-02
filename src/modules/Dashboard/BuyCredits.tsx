import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { usePrivy } from '@privy-io/react-auth';
import { Card } from '@site/src/components/Card';
import { Button } from '@site/src/components/Button';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { openPopup } from '@site/src/helpers/openPopup';
import { Info } from 'lucide-react';
import ReactDOM from 'react-dom';

const GRACE_PERIOD = 5000;
const MIN_POINTS = 5000;

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

const GET_CREDITS_PRICE = gql`
  query GetCreditsPrice($creditAmount: Float!) {
    getCreditsPrice(creditAmount: $creditAmount)
  }
`;

const Toast = ({ message, position }) => {
  return ReactDOM.createPortal(
    <div
      className="absolute bg-gray-800 text-white p-2 rounded-md text-xs max-w-[200px]"
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
        <Info className="h-3 w-3" />
      </div>
      {showToast && <Toast message={message} position={position} />}
    </div>
  );
};

export function BuyCredits() {
  const { user } = usePrivy();
  const { data } = useAuthQuery(QUERY);
  const [points, setPoints] = useState(MIN_POINTS);
  const [displayPoints, setDisplayPoints] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [price, setPrice] = useState(0);

  const [getPrice] = useLazyQuery(GET_CREDITS_PRICE);

  const [createCharge, { loading }] = useMutation(CREATE_CHARGE, {
    onCompleted: (data) => {
      if (data?.createCharge.hostedUrl) {
        const url = data.createCharge.hostedUrl;
        openPopup({ url });
      }
    },
  });

  const updatePrice = async (points) => {
    const { data } = await getPrice({
      variables: { creditAmount: Number(points) },
    });
    setPrice(data?.getCreditsPrice || 0);
  };

  const normalizePoints = (value) => {
    const numValue = Number.parseInt(value) || 0;
    if (numValue < MIN_POINTS) {
      setErrorMessage(`Minimum credit amount is ${MIN_POINTS}`);
      return MIN_POINTS;
    }
    setErrorMessage('');
    return Math.floor(numValue / MIN_POINTS) * MIN_POINTS;
  };

  const debouncedUpdatePrice = useCallback(
    debounce(async (points) => {
      const { data } = await getPrice({
        variables: { creditAmount: Number(points) },
      });
      setPrice(data?.getCreditsPrice || 0);
    }, 300),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedUpdatePrice.cancel();
    };
  }, [debouncedUpdatePrice]);

  const handlePointsChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setDisplayPoints(rawValue);
    debouncedUpdatePrice(rawValue);
  };

  const handleBlur = () => {
    const normalizedPoints = normalizePoints(displayPoints);
    setPoints(normalizedPoints);
    setDisplayPoints(normalizedPoints.toString());
    updatePrice(normalizedPoints);
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
        userEmail: user.email.address,
      },
    });
  };

  const { apiV2PointsRemaining = 0, apiV1PointsRemaining } = data?.apiClientById || {};
  const displayV2Points = apiV2PointsRemaining <= 0 ? GRACE_PERIOD + apiV2PointsRemaining : apiV2PointsRemaining;
  const isNegativeBalance = apiV2PointsRemaining < 0;
  const disabled = loading || !user;
  const formatPrice = (price) => price.toFixed(2);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3>Buy Credits</h3>
          <div className="text-left">
            <a href="/docs/api-intro/pricing" className="text-primary-default hover:underline">
              See how credit costs are calculated
            </a>
          </div>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end gap-1">
            Credit balance:
            <span className={`font-bold ${isNegativeBalance ? 'text-yellow-500' : 'text-green-500'}`}>
              {displayV2Points}
            </span>
            {isNegativeBalance && <InfoIcon message="You are now consuming the 5,000 credit free tier" />}
          </p>
          {Number(apiV1PointsRemaining) > 0 && (
            <p className="flex items-center justify-end gap-1">
              Legacy REST API credits: <span className="font-bold">{apiV1PointsRemaining}</span>
              <InfoIcon message="These credits are available for use with the legacy REST API. After the alpha, you will be able to convert these into new credits to use on the GraphQL queries." />
            </p>
          )}
        </div>
      </div>

      <Card>
        {errorMessage && <p className="text-red-400">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 ">
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
                  placeholder="Enter credits amount"
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
                  className="font-extrabold text-primary-default bg-transparent"
                  aria-label={`Cost: $${formatPrice(price)}`}
                >
                  USD ${formatPrice(price)}
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" variant="primary" disabled={disabled} className="w-full">
            <span className="font-extrabold">Buy for USD ${formatPrice(price)}</span>
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default BuyCredits;
