import { useState } from 'react';

function PricingCalculator() {
  const [credits, setCredits] = useState(15_000_000);

  function calculatePrice(credits) {
    const tiers = [
      { threshold: 15_000_000, price: 1.00 },
      { threshold: 50_000_000, price: 0.80 },
      { threshold: Infinity, price: 0.70 }
    ];
    
    let remaining = credits;
    let cost = 0;
    let standardCost = credits * 1.0;
    
    tiers.forEach(({ threshold, price }, index) => {
      const tierCredits = Math.min(remaining, threshold - (index === 0 ? 0 : tiers[index - 1].threshold));
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
  }

  const formatNumber = (num) => num >= 1000000 ? (num / 1000000).toFixed(1) + 'M' : num.toLocaleString();
  const pricing = calculatePrice(credits);

  return (
    <div className="w-full max-w-2xl rounded-lg border border-border bg-card shadow-xl">
      <div className="p-6 border-b border-border">
        <div className="text-xl font-semibold">Volume Pricing Calculator</div>
      </div>
      <div className="space-y-6 p-6">
        <div>
          <label className="block text-neutral-400 mb-3">Credits: {formatNumber(credits)}</label>
          <input
            type="range"
            value={credits}
            min={1_000_000}
            max={100_000_000}
            step={1_000_000}
            onChange={(e) => setCredits(Number(e.target.value))}
            className="w-full h-2 rounded-lg bg-neutral-800 cursor-pointer"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Total Cost", value: pricing.total, decimals: 2 },
            { label: "Your Savings", value: pricing.savings, decimals: 2 },
            { label: "Cost per 1k", value: pricing.perUnit, decimals: 3 }
          ].map(({ label, value, decimals }) => (
            <div key={label} className="p-4 rounded-2xl bg-card border border-border shadow-lg">
              <div className="text-sm text-neutral-400">{label}</div>
              <div className="text-2xl font-semibold">${value.toFixed(decimals)}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Volume Discount Tiers</h3>
          {[
            ["0 - 15M credits", "$1.00 per 1k"],
            ["15M - 50M credits", "$0.80 per 1k"],
            ["50M+ credits", "$0.70 per 1k"]
          ].map(([range, price]) => (
            <div key={range} className="flex justify-between text-neutral-400 py-1">
              <span>{range}</span>
              <span>{price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingCalculator;