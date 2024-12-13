import React, { useState } from 'react';
import { RiDonutChartFill, RiListCheck2, RiCoinsLine } from 'react-icons/ri';


// Helper functions since we can't import them
const formatNumber = (num) => {
  return new Intl.NumberFormat().format(Math.round(num));
};

const formatUSD = (num) => {
  return Number(num).toFixed(3);
};

const USAGE_PRESETS = {
  basic: {
    name: 'Basic',
    description: 'Occasional portfolio checks and basic price tracking',
    portfolioChecks: .5,
    priceCharts: .5,
    txHistory: .5,
  },
  standard: {
    name: 'Active',
    description: 'Regular portfolio monitoring and price analysis',
    portfolioChecks: 2,
    priceCharts: 4,
    txHistory: 2,
  },
  power: {
    name: 'Power User',
    description: 'Frequent trading and detailed analysis',
    portfolioChecks: 6,
    priceCharts: 8,
    txHistory: 6,
  },
};

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
  const [mode, setMode] = useState('basic');
  const [numUsers, setNumUsers] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('standard');
  const [features, setFeatures] = useState({
    portfolio: false,
    prices: false,
    transactions: false,
  });
  
  const [queries, setQueries] = useState({
    onchainPrices: '',
    portfolioQueries: '',
    otherQueries: '',
  });

  const calculateBasicModeCredits = () => {
    const users = Number(numUsers) || 0;
    const preset = USAGE_PRESETS[selectedPreset];
    let totalCredits = 0;

    if (features.portfolio) {
      totalCredits += users * preset.portfolioChecks * ENDPOINT_CREDITS.portfolioQueries * 30;
    }
    if (features.prices) {
      totalCredits += users * preset.priceCharts * ENDPOINT_CREDITS.onchainPrices * 30;
    }
    if (features.transactions) {
      totalCredits += users * preset.txHistory * ENDPOINT_CREDITS.otherQueries * 30;
    }

    return totalCredits;
  };

  const calculateAdvancedModeCredits = () => {
    return (
      (Number(queries.onchainPrices) || 0) * ENDPOINT_CREDITS.onchainPrices +
      (Number(queries.portfolioQueries) || 0) * ENDPOINT_CREDITS.portfolioQueries +
      (Number(queries.otherQueries) || 0) * ENDPOINT_CREDITS.otherQueries
    );
  };

  const calculatePrice = (totalCredits) => {
    let remaining = totalCredits;
    let cost = 0;
    let standardCost = totalCredits * 1.0;

    PRICING_TIERS.forEach(({ threshold, price }, index) => {
      const tierCredits = Math.min(
        remaining,
        threshold - (index === 0 ? 0 : PRICING_TIERS[index - 1].threshold)
      );
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

  const totalCredits = mode === 'basic' ? calculateBasicModeCredits() : calculateAdvancedModeCredits();
  const pricing = calculatePrice(totalCredits);

  const FeatureToggle = ({ icon: Icon, label, checked, onChange }) => (
    <div className="flex items-center justify-between rounded-lg border border-border p-4">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-alt-color" />
        <span className="font-medium">{label}</span>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="peer h-6 w-11 rounded-full bg-input after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#784ffe] peer-checked:after:translate-x-full peer-checked:after:border-white" />
      </label>
    </div>
  );


  return (
    <div className="w-full rounded-lg border border-border bg-card">
      <div className="border-b border-border p-6">
        <h2 className="text-xl font-semibold">Estimate Your API Usage</h2>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setMode('basic')}
            className={`relative pb-2 text-sm font-medium transition-colors ${
              mode === 'basic' 
                ? 'text-primary-default after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#784ffe]' 
                : 'text-alt-color hover:text-primary-default'
            }`}
          >
            Basic Mode
          </button>
          <button
            onClick={() => setMode('advanced')}
            className={`relative pb-2 text-sm font-medium transition-colors ${
              mode === 'advanced'
                ? 'text-primary-default after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#784ffe]'
                : 'text-alt-color hover:text-primary-default'
            }`}
          >
            Advanced Mode
          </button>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {mode === 'basic' ? (
          <>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-alt-color">
                  Number of Monthly Active Users
                </label>
                <input
                  type="number"
                  min="0"
                  value={numUsers}
                  onChange={(e) => setNumUsers(e.target.value)}
                  placeholder="Enter number of users"
                  className="h-10 w-full rounded-lg border border-border bg-input px-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-alt-color">Features</label>
                <div className="space-y-2">
                  <FeatureToggle
                    icon={RiDonutChartFill}
                    label="Portfolio Tracking"
                    checked={features.portfolio}
                    onChange={(checked) => setFeatures(prev => ({ ...prev, portfolio: checked }))}
                  />
                  <FeatureToggle
                    icon={RiCoinsLine}
                    label="Token Price Charts"
                    checked={features.prices}
                    onChange={(checked) => setFeatures(prev => ({ ...prev, prices: checked }))}
                  />
                  <FeatureToggle
                    icon={RiListCheck2}
                    label="Transaction History"
                    checked={features.transactions}
                    onChange={(checked) => setFeatures(prev => ({ ...prev, transactions: checked }))}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-alt-color">
                  User Activity Level
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {Object.entries(USAGE_PRESETS).map(([key, preset]) => (
                    <div
                      key={key}
                      onClick={() => setSelectedPreset(key)}
                      className={`cursor-pointer rounded-lg border border-border p-4 transition-colors ${
                        selectedPreset === key ? 'border-[#784ffe] bg-input' : ''
                      }`}
                    >
                      <h3 className="font-semibold">{preset.name}</h3>
                      <p className="mt-1 text-sm text-alt-color">{preset.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-alt-color">
                Onchain Prices Queries
              </label>
              <input
                type="number"
                min="0"
                value={queries.onchainPrices}
                onChange={(e) => setQueries(prev => ({ ...prev, onchainPrices: e.target.value }))}
                placeholder="Enter number of queries"
                className="h-10 w-full rounded-lg border border-border bg-input px-2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-alt-color">
                Portfolio Queries
              </label>
              <input
                type="number"
                min="0"
                value={queries.portfolioQueries}
                onChange={(e) => setQueries(prev => ({ ...prev, portfolioQueries: e.target.value }))}
                placeholder="Enter number of queries"
                className="h-10 w-full rounded-lg border border-border bg-input px-2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-alt-color">
                Other Queries (NFTs, Transactions, Accounts)
              </label>
              <input
                type="number"
                min="0"
                value={queries.otherQueries}
                onChange={(e) => setQueries(prev => ({ ...prev, otherQueries: e.target.value }))}
                placeholder="Enter number of queries"
                className="h-10 w-full rounded-lg border border-border bg-input px-2"
              />
            </div>
          </div>
        )}

        <div className="space-y-3 rounded-lg bg-input p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-alt-color">Monthly Credits</span>
            <span className="font-medium">{formatNumber(totalCredits)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-alt-color">Cost per 1k credits</span>
            <div className="flex items-center gap-2">
              {pricing.savingsPercent && (
                <span className="text-sm font-semibold text-[#00D897]">
                  {pricing.savingsPercent}
                </span>
              )}
              <span className="font-medium">
                ${totalCredits === 0 ? '0.000' : formatUSD(pricing.costPer1000)}
              </span>
            </div>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Monthly Total</span>
              <span className="text-2xl font-semibold">${formatUSD(pricing.total)}</span>
            </div>
            {pricing.savings > 0 && (
              <div className="mt-1 flex items-center justify-between">
                <span className="text-sm text-alt-color">Volume discount savings</span>
                <span className="text-sm font-semibold text-[#00D897]">
                  -${formatUSD(pricing.savings)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}