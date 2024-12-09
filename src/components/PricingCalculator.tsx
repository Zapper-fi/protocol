import { useState } from 'react';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

const CustomSlider = ({ value, min, max, step, onChange }: SliderProps) => (
  <input
    type="range"
    value={value}
    min={min}
    max={max}
    step={step}
    onChange={(e) => onChange(Number(e.target.value))}
    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-neutral-800 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-purple-600 [&::-moz-range-thumb]:cursor-pointer"
  />
);

interface PricingTier {
  threshold: number;
  price: number;
}

interface PricingResult {
  total: number;
  savings: number;
  perUnit: number;
}

interface MetricCardProps {
  label: string;
  value: number;
  color: string;
  decimals: number;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toLocaleString() + 'M';
  }
  return num.toLocaleString();
};

const MetricCard = ({ label, value, color, decimals }: MetricCardProps) => (
  <div className="flex flex-col p-4 xs:p-3 sm:p-4 min-h-[80px] rounded-2xl bg-card border border-border shadow-lg shadow-black/10">
    <div className="text-sm xs:text-xs sm:text-sm text-neutral-400">{label}</div>
    <div className="text-xl xs:text-lg sm:text-2xl font-semibold truncate mt-1">
      ${value.toFixed(decimals)}
    </div>
  </div>
);

interface TierRowProps {
  range: string;
  price: string;
}

const TierRow = ({ range, price }: TierRowProps) => (
  <div className="flex justify-between text-base xs:text-sm sm:text-base text-neutral-400 py-1">
    <span>{range}</span>
    <span className="ml-2">{price}</span>
  </div>
);

const PricingCalculator = () => {
  const [credits, setCredits] = useState<number>(15_000_000);
  
  const calculatePrice = (credits: number): PricingResult => {
    const tiers: PricingTier[] = [
      { threshold: 15_000_000, price: 1.00 },
      { threshold: 50_000_000, price: 0.80 },
      { threshold: Infinity, price: 0.70 }
    ];
    
    let remaining = credits;
    let cost = 0;
    let standardCost = credits * 1.0;
    
    tiers.forEach(({ threshold, price }, index) => {
      const tierCredits = Math.min(
        remaining,
        threshold - (index === 0 ? 0 : tiers[index - 1].threshold)
      );
      if (tierCredits > 0) {
        cost += (tierCredits * price);
        remaining -= tierCredits;
      }
    });
    
    return {
      total: cost / 1000,
      savings: (standardCost - cost) / 1000,
      perUnit: cost / credits
    };
  };

  const pricing = calculatePrice(credits);
  const metrics = [
    { label: "Total Cost", value: pricing.total, color: "purple", decimals: 2 },
    { label: "Your Savings", value: pricing.savings, color: "green", decimals: 2 },
    { label: "Cost per 1k", value: pricing.perUnit, color: "blue", decimals: 3 }
  ];

  const tiers = [
    { range: "0 - 15M credits", price: "$1.00 per 1k" },
    { range: "15M - 50M credits", price: "$0.80 per 1k" },
    { range: "50M+ credits", price: "$0.70 per 1k" }
  ];

  return (
    <div className="w-full max-w-2xl rounded-lg border border-border bg-card shadow-xl">
      <div className="p-6 xs:p-4 sm:p-6 border-b border-border">
        <div className="text-xl xs:text-lg sm:text-2xl font-semibold">
          Volume Pricing Calculator
        </div>
      </div>
      <div className="space-y-6 xs:space-y-4 sm:space-y-6 p-6 xs:p-4 sm:p-6">
        <div>
          <label className="block text-base xs:text-sm sm:text-base text-neutral-400 mb-3">
            Credits: {formatNumber(credits)}
          </label>
          <CustomSlider
            value={credits}
            min={1_000_000}
            max={100_000_000}
            step={1_000_000}
            onChange={setCredits}
          />
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-2 sm:gap-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="space-y-3 xs:space-y-2 sm:space-y-3">
          <h3 className="text-xl xs:text-base sm:text-xl font-semibold">Volume Discount Tiers</h3>
          <div className="grid grid-cols-1 gap-1">
            {tiers.map((tier) => (
              <TierRow key={tier.range} {...tier} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;