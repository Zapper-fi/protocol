import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { BadgeDollarSign } from 'lucide-react';

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

const MetricCard: React.FC<MetricCardProps> = ({ label, value, color, decimals }) => (
  <div className="flex flex-col p-4 rounded-2xl bg-card border border-border shadow-lg shadow-black/10">
    <div className={`text-sm text-neutral-400`}>{label}</div>
    <div className="text-2xl font-semibold">
      ${value.toFixed(decimals)}
    </div>
  </div>
);

interface TierRowProps {
  range: string;
  price: string;
}

const TierRow: React.FC<TierRowProps> = ({ range, price }) => (
  <div className="flex justify-between text-neutral-400">
    <span>{range}</span>
    <span>{price}</span>
  </div>
);

const PricingCalculator: React.FC = () => {
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
      total: cost / 1000, // Convert to cost per 1k credits
      savings: (standardCost - cost) / 1000,
      perUnit: cost / credits
    };
  };

  const pricing = calculatePrice(credits);
  const metrics = [
    { label: "Total Cost", value: pricing.total, color: "purple", decimals: 2 },
    { label: "Your Savings", value: pricing.savings, color: "green", decimals: 2 },
    { label: "Cost per 1k", value: pricing.perUnit, color: 3 }
  ];

  const tiers = [
    { range: "0 - 15M credits", price: "$1.00 per 1k" },
    { range: "15M - 50M credits", price: "$0.80 per 1k" },
    { range: "50M+ credits", price: "$0.70 per 1k" }
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BadgeDollarSign className="w-6 h-6" />
          Volume Pricing Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-base text-neutral-400 mb-2">
            Credits: {formatNumber(credits)}
          </label>
          <Slider
            value={[credits]}
            min={1_000_000}
            max={100_000_000}
            step={1_000_000}
            onValueChange={(value: number[]) => setCredits(value[0])}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Volume Discount Tiers</h3>
          <div className="grid grid-cols-1 gap-2">
            {tiers.map((tier) => (
              <TierRow key={tier.range} {...tier} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCalculator;