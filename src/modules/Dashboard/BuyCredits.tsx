import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { usePrivy } from '@privy-io/react-auth';
import { Card } from '@site/src/components/Card';
import { Button } from '@site/src/components/Button';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { openPopup } from '@site/src/helpers/openPopup';
import { Info, Plus, Minus } from 'lucide-react';
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
    getCreditsPriceBreakdown(creditAmount: $creditAmount) {
      breakdown {
        creditAmount
        creditRate
      }
      totalCost
      savings
    }
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
  const [displayPoints, setDisplayPoints] = useState(MIN_POINTS.toString());
  const [price, setPrice] = useState(0);
  const [breakdown, setBreakdown] = useState([]);
  const [savings, setSavings] = useState(0);

  const [getPrice] = useLazyQuery(GET_CREDITS_PRICE);

  useEffect(() => {
    getPrice({
      variables: { creditAmount: MIN_POINTS },
    }).then(({ data }) => {
      if (data?.getCreditsPriceBreakdown) {
        setPrice(data.getCreditsPriceBreakdown.totalCost);
        setBreakdown(data.getCreditsPriceBreakdown.breakdown);
        setSavings(data.getCreditsPriceBreakdown.savings);
      }
    });
  }, [getPrice]);

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
    if (data?.getCreditsPriceBreakdown) {
      setPrice(data.getCreditsPriceBreakdown.totalCost);
      setBreakdown(data.getCreditsPriceBreakdown.breakdown);
      setSavings(data.getCreditsPriceBreakdown.savings);
    }
  };

  const normalizePoints = (value) => {
    const numValue = Number.parseInt(value) || 0;
    if (numValue < MIN_POINTS) {
      return MIN_POINTS;
    }
    return Math.floor(numValue / MIN_POINTS) * MIN_POINTS;
  };

  const handleIncrement = () => {
    const newPoints = Number(displayPoints) + MIN_POINTS;
    setDisplayPoints(newPoints.toString());
    setPoints(newPoints);
    updatePrice(newPoints);
  };

  const handleDecrement = () => {
    const newPoints = Math.max(Number(displayPoints) - MIN_POINTS, MIN_POINTS);
    setDisplayPoints(newPoints.toString());
    setPoints(newPoints);
    updatePrice(newPoints);
  };

  const debouncedUpdatePrice = useCallback(
    debounce(async (points) => {
      const normalizedPoints = normalizePoints(points);
      updatePrice(normalizedPoints);
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
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex flex-col" style={{ flexGrow: 1 }}>
          <span className="flex items-center justify-start gap-1" style={{ fontSize: '14px' }}>
            Credit balance
            {isNegativeBalance && <InfoIcon message="You are now consuming the 5,000 credit free tier" />}
          </span>
          <span
            className={`font-bold ${isNegativeBalance ? 'text-yellow-500' : 'text--success'}`}
            style={{ fontSize: '18px' }}
          >
            {displayV2Points}
          </span>
        </div>
        {Number(apiV1PointsRemaining) > 0 && (
          <div className="flex flex-col" style={{ flexGrow: 1 }}>
            <span className="flex items-center justify-start gap-1" style={{ fontSize: '14px' }}>
              Legacy Credits
              <InfoIcon message="These credits are currently available for use with the legacy REST API. To migrate previously purchased credits to the new GraphQL API, please contact us at api@zapper.xyz." />
            </span>
            <span className="font-bold" style={{ fontSize: '18px' }}>
              {apiV1PointsRemaining}
            </span>
          </div>
        )}
      </div>
      <hr style={{ margin: 0 }} />

      <div>
        <h4 className="mt-1">Buy Credits</h4>
        <div className="flex flex-col gap-2 mt-1 banner" style={{ fontSize: '14px' }}>
          <span>
            <span className="text--success font-bold alert--success px-2 py-1 rounded-md">20% off</span> for all credits
            over 15M
          </span>
          <span>
            <span className="text--success font-bold alert--success px-2 py-1 rounded-md">30% off</span> for all credits
            over 50M
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="my-2 flex flex-col gap-2">
            <label htmlFor="points-input" className=" font-medium">
              Credit Amount
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDecrement}
                className="zapper-btn text-2xl py-0 font-normal cursor-pointer"
                style={{
                  width: '40px',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                -
              </button>
              <input
                id="points-input"
                type="text"
                value={displayPoints}
                onChange={handlePointsChange}
                onBlur={handleBlur}
                min={MIN_POINTS}
                className=" text-center  field-sizing-content min-w-28 flex-grow"
                placeholder="Enter credits amount"
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="zapper-btn text-2xl py-0 font-normal cursor-pointer"
                style={{
                  width: '40px',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                +
              </button>
            </div>
          </div>
          {/* 
Temporary, to put back once the design is updated
          <div className="space-y-2">
            {breakdown.map((tier) => {
              const discountPercent = (1 - tier.creditRate) * 100;
              const tierKey = `tier-${tier.creditAmount}-${tier.creditRate}`;
              return (
                <div key={tierKey} className="text-sm flex justify-between">
                  <span>{tier.creditAmount.toLocaleString()}</span>
                  <span>
                    <span>${(tier.creditRate * 0.001).toFixed(4)}</span>
                    {discountPercent > 0 && (
                      <span className="text-confirmed-default font-bold ml-2">({discountPercent.toFixed(2)}% off)</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div> */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between">
              <span className="text-sm">Subtotal</span>
              <span className="text-sm ">${formatPrice(price)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between">
                <span className="text-sm">Total Savings</span>
                <span className="text-sm text--success font-bold">-${formatPrice(savings)}</span>
              </div>
            )}
            <hr style={{ margin: 0 }} />
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-bold">USD ${formatPrice(price)}</span>
            </div>
          </div>
        </div>

        <Button type="submit" variant="primary" disabled={disabled} className="w-full">
          <span className="font-extrabold">Buy for USD ${formatPrice(price)}</span>
        </Button>
      </form>
    </div>
  );
}

export default BuyCredits;
