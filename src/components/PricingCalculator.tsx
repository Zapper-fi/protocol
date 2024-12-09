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

const formatUSD = (value: number) => {
  const decimalPlaces = value < 0.01 ? 4 : value < 1 ? 3 : 2;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

export function PricingCalculator() {
  const [queries, setQueries] = useState({
    onchainPrices: '',
    portfolioQueries: '',
    otherQueries: ''
  });

  const calculateTotalCredits = () => {
    return (
      (Number(queries.onchainPrices) || 0) * ENDPOINT_CREDITS.onchainPrices +
      (Number(queries.portfolioQueries) || 0) * ENDPOINT_CREDITS.portfolioQueries +
      (Number(queries.otherQueries) || 0) * ENDPOINT_CREDITS.otherQueries
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

    const savingsPercent = ((standardCost - cost) / standardCost) * 100;
    const costPer1000 = totalCredits > 0 ? (cost / totalCredits) * 1000 : 0;

    return {
      total: cost / 1000,
      savings: (standardCost - cost) / 1000,
      creditsUsed: totalCredits,
      savingsPercent: savingsPercent > 0 ? `-${savingsPercent.toFixed(0)}%` : null,
      costPer1000: costPer1000 / 1000,
    };
  };

  const totalCredits = calculateTotalCredits();
  const pricing = calculatePrice(totalCredits);

  return (
      <div className="space-y-6 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-alt-color mb-2">
              Onchain Prices Queries
            </label>
            <input
              type="number"
              min="0"
              value={queries.onchainPrices}
              onChange={(e) => setQueries((prev) => ({ ...prev, onchainPrices: e.target.value }))}
              placeholder="Enter number of queries"
              className="w-full px-3 py-2 rounded-md border border-border bg-[var(--ifm-input-background)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-alt-color mb-2">
              Portfolio Queries
            </label>
            <input
              type="number"
              min="0"
              value={queries.portfolioQueries}
              onChange={(e) => setQueries((prev) => ({ ...prev, portfolioQueries: e.target.value }))}
              placeholder="Enter number of queries"
              className="w-full px-3 py-2 rounded-md border border-border bg-[var(--ifm-input-background)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-alt-color mb-2">
              Other Queries
            </label>
            <input
              type="number"
              min="0"
              value={queries.otherQueries}
              onChange={(e) => setQueries((prev) => ({ ...prev, otherQueries: e.target.value }))}
              placeholder="Enter number of queries"
              className="w-full px-3 py-2 rounded-md border border-border bg-[var(--ifm-input-background)]"
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-alt-color">Credits Needed</span>
            <span className="font-medium">{formatNumber(totalCredits)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-alt-color">Cost per 1k credit</span>
            <div className="flex items-center gap-2">
              {pricing.savingsPercent && (
                <span className="text-[#00D897]">{pricing.savingsPercent}</span>
              )}
              <span className="font-medium">
                ${totalCredits === 0 ? '0.000' : formatUSD(pricing.costPer1000)}
              </span>
            </div>
          </div>
          <div className="pt-3 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-alt-color font-semibold">Total</span>
              <span className="text-2xl font-semibold">${formatUSD(pricing.total)}</span>
            </div>
            {pricing.savings > 0 && (
              <div className="flex justify-between items-center mt-1">
                <span className="text-alt-color text-sm">Total savings</span>
                <span className="text-[#00D897] text-sm">-${formatUSD(pricing.savings)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}