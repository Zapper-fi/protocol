import React, { useState } from 'react';

const PRICING_TIERS = [
  { threshold: 15_000_000, price: 1.0 },
  { threshold: 50_000_000, price: 0.8 },
  { threshold: Infinity, price: 0.7 },
];

const ENDPOINT_CREDITS = {
  onchainPrices: 4,
  portfolioQueries: 3,
  otherQueries: 2,
};

export function PricingCalculator() {
  const [queries, setQueries] = useState({
    onchainPrices: 0,
    portfolioQueries: 0,
    otherQueries: 0,
  });

  const calculateTotalCredits = () => {
    return (
      queries.onchainPrices * ENDPOINT_CREDITS.onchainPrices +
      queries.portfolioQueries * ENDPOINT_CREDITS.portfolioQueries +
      queries.otherQueries * ENDPOINT_CREDITS.otherQueries
    );
  };

  const calculatePrice = (totalCredits: number) => {
    let remaining = totalCredits;
    let cost = 0;
    let standardCost = totalCredits * 1.0;

    PRICING_TIERS.forEach(({ threshold, price }, index) => {
      const tierCredits = Math.min(remaining, threshold - (index === 0 ? 0 : PRICING_TIERS[index - 1].threshold));
      if (tierCredits > 0) {
        cost += tierCredits * price;
        remaining -= tierCredits;
      }
    });

    return {
      total: cost / 1000,
      savings: (standardCost - cost) / 1000,
      creditsUsed: totalCredits,
    };
  };

  const totalCredits = calculateTotalCredits();
  const pricing = calculatePrice(totalCredits);
  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="w-full max-w-2xl rounded-lg border border-border bg-card shadow-xl">
      <div className="p-6 border-b border-border">
        <div className="text-xl font-semibold">API Query Calculator</div>
      </div>
      <div className="space-y-6 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Onchain Prices Queries (4 credits each)
            </label>
            <input
              type="number"
              min="0"
              value={queries.onchainPrices}
              onChange={(e) => setQueries((prev) => ({ ...prev, onchainPrices: parseInt(e.target.value) || 0 }))}
              className="w-full px-3 py-2 rounded-md border border-border bg-neutral-900 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Portfolio Queries (3 credits each)
            </label>
            <input
              type="number"
              min="0"
              value={queries.portfolioQueries}
              onChange={(e) => setQueries((prev) => ({ ...prev, portfolioQueries: parseInt(e.target.value) || 0 }))}
              className="w-full px-3 py-2 rounded-md border border-border bg-neutral-900 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Other Queries (2 credits each)</label>
            <input
              type="number"
              min="0"
              value={queries.otherQueries}
              onChange={(e) => setQueries((prev) => ({ ...prev, otherQueries: parseInt(e.target.value) || 0 }))}
              className="w-full px-3 py-2 rounded-md border border-border bg-neutral-900 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-card border border-border shadow-lg">
            <div className="text-sm text-neutral-400">Credits Needed</div>
            <div className="text-2xl font-semibold">{formatNumber(totalCredits)}</div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border shadow-lg">
            <div className="text-sm text-neutral-400">USD Cost</div>
            <div className="text-2xl font-semibold">${pricing.total.toFixed(2)}</div>
          </div>
          {totalCredits > 15_000_000 && (
            <div className="p-4 rounded-2xl bg-card border border-border shadow-lg">
              <div className="text-sm text-neutral-400">Volume Savings</div>
              <div className="text-2xl font-semibold text-green-500">${pricing.savings.toFixed(2)}</div>
            </div>
          )}
        </div>

        {totalCredits > 15_000_000 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Volume Discounts Applied</h3>
            <div className="space-y-1 text-neutral-400">
              {totalCredits > 50_000_000 && <div className="text-green-500">30% discount on credits above 50M</div>}
              {totalCredits > 15_000_000 && (
                <div className="text-green-500">20% discount on credits between 15M-50M</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
