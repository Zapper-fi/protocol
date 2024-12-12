import React, { useState } from 'react';
import { formatNumber, formatUSD } from '@site/src/helpers/formatters';

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
    onchainPrices: '',
    portfolioQueries: '',
    otherQueries: '',
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
    <div className="w-full rounded-lg border border-border bg-card">
      <div className="border-b border-border px-6 pb-4 pt-6">
        <p className="mt-2 text-sm text-alt-color">
          Enter the number of API queries you expect to make for each endpoint type. Consider choosing a specific
          timeframe (e.g., monthly or annually) to help with cost forecasting.
        </p>
      </div>

      <div className="space-y-6 px-6 pb-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="onchainQueries" className="mb-2 block text-sm font-medium text-alt-color">
              Onchain Price Queries
            </label>
            <input
              id="onchainQueries"
              type="number"
              min="0"
              value={queries.onchainPrices}
              onChange={(e) => setQueries((prev) => ({ ...prev, onchainPrices: e.target.value }))}
              placeholder="Enter number of queries"
              className="zapper-input h-10 w-full px-2"
            />
          </div>

          <div>
            <label htmlFor="portfolioQueries" className="mb-2 block text-sm font-medium text-alt-color">
              Portfolio Queries
            </label>
            <input
              id="portfolioQueries"
              type="number"
              min="0"
              value={queries.portfolioQueries}
              onChange={(e) => setQueries((prev) => ({ ...prev, portfolioQueries: e.target.value }))}
              placeholder="Enter number of queries"
              className="zapper-input h-10 w-full px-2"
            />
          </div>

          <div>
            <label htmlFor="otherQueries" className="mb-2 block text-sm font-medium text-alt-color">
              Other Queries
            </label>
            <input
              id="otherQueries"
              type="number"
              min="0"
              value={queries.otherQueries}
              onChange={(e) => setQueries((prev) => ({ ...prev, otherQueries: e.target.value }))}
              placeholder="Enter number of queries"
              className="zapper-input h-10 w-full px-2"
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-alt-color">Credits Needed</span>
            <span className="font-medium">{formatNumber(totalCredits)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-alt-color">Cost per 1k credit</span>
            <div className="flex items-center gap-2">
              {pricing.savingsPercent && (
                <span className="text-sm font-semibold text-[#00D897]">{pricing.savingsPercent}</span>
              )}
              <span className="font-medium">${totalCredits === 0 ? '0.000' : formatUSD(pricing.costPer1000)}</span>
            </div>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-semibold">${formatUSD(pricing.total)}</span>
            </div>
            {pricing.savings > 0 && (
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm text-alt-color">Total savings</span>
                <span className="text-sm font-semibold text-[#00D897]">-${formatUSD(pricing.savings)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
