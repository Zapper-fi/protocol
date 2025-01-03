import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@site/src/components/Button';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { formatPercentage, formatUSD } from '@site/src/helpers/formatters';
import { openPopup } from '@site/src/helpers/openPopup';
import { Info } from 'lucide-react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';

const GRACE_PERIOD = 5000;
const MIN_POINTS = 5000;

const QUERY = gql`
  query BuyCredits {
    apiClientById {
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

const isMobileDevice = () => {
  return /Android|iPhone/i.test(navigator.userAgent);
};

const handleCheckoutNavigation = (url: string) => {
  if (isMobileDevice()) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    openPopup({ url });
  }
};

const Toast = ({ message, position }) => {
  return ReactDOM.createPortal(
    <div
      className="absolute max-w-[200px] rounded-md bg-gray-800 p-2 text-xs text-white"
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
        className="flex cursor-pointer items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowToast(false)}
      >
        <Info className="h-3 w-3" />
      </div>
      {showToast && <Toast message={message} position={position} />}
    </div>
  );
};

const discountOffers = [
  { amount: 15000, rate: 0.2 },
  { amount: 50000, rate: 0.3 },
];

export function BuyCredits() {
  const { user } = usePrivy();
  const { data } = useAuthQuery(QUERY);
  const [points, setPoints] = useState(MIN_POINTS);
  const [displayPoints, setDisplayPoints] = useState(MIN_POINTS.toString());
  const [price, setPrice] = useState(0);
  const [breakdown, setBreakdown] = useState([]);
  const [savings, setSavings] = useState<number>(0);

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
        handleCheckoutNavigation(url);
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

  const { apiV2PointsRemaining = 0 } = data?.apiClientById || {};
  const shouldShowWarning = apiV2PointsRemaining === null || apiV2PointsRemaining < 0;
  const displayV2Points = shouldShowWarning ? GRACE_PERIOD + (apiV2PointsRemaining || 0) : apiV2PointsRemaining;
  const disabled = loading || !user;
  const subtotal = price + savings;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex flex-col" style={{ flexGrow: 1 }}>
          <span className="flex items-center justify-start gap-1" style={{ fontSize: '14px' }}>
            Credit balance
            {shouldShowWarning && <InfoIcon message="You are now consuming the 5,000 credit free tier" />}
          </span>
          <span
            className={`font-bold ${shouldShowWarning ? 'text-yellow-500' : 'text--success'}`}
            style={{ fontSize: '18px' }}
          >
            {displayV2Points}
          </span>
        </div>
      </div>
      <hr style={{ margin: 0 }} />

      <div>
        <h4 className="mt-1">Buy Credits</h4>
        <div className="banner mt-1 flex flex-col gap-2" style={{ fontSize: '14px' }}>
          {discountOffers.map(({ amount, rate }) => (
            <div key={amount} className="py-2">
              <h6 className="mb-1">Spend {formatUSD(amount)} or more</h6>
              <p className="m-0">
                <span className="text-alt-color line-through">{formatUSD(amount)}</span>{' '}
                <span className="font-bold text-success-default">{formatUSD(amount - amount * rate)}</span>{' '}
                <span className="alert--success rounded-md px-2 py-1 font-bold text-success-default">
                  {formatPercentage(rate)} off
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="my-2 flex flex-col gap-2">
            <label htmlFor="points-input" className="font-medium">
              Credit Amount
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDecrement}
                className="zapper-btn grid size-10 cursor-pointer place-content-center py-0 text-2xl font-normal"
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
                className={clsx('zapper-input', 'h-10 min-w-28 flex-grow text-center field-sizing-content')}
                placeholder="Enter credits amount"
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="zapper-btn grid size-10 cursor-pointer place-content-center py-0 text-2xl font-normal"
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-6 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatUSD(subtotal)}</span>
            </div>

            {savings > 0 && (
              <div className="flex justify-between text-sm">
                <span>Discount</span>
                <span>
                  <span className="alert--success rounded-md px-2 py-1 text-success-default">
                    {formatPercentage(savings / subtotal)} off
                  </span>{' '}
                  <span className="font-semibold text-success-default">-{formatUSD(savings)}</span>
                </span>
              </div>
            )}
            <hr style={{ margin: 0 }} />
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-bold">{formatUSD(price)}</span>
            </div>
          </div>
        </div>

        <Button type="submit" variant="primary" disabled={disabled} className="w-full">
          <span className="font-extrabold">Buy for {formatUSD(price)}</span>
        </Button>
      </form>
    </div>
  );
}

export default BuyCredits;
