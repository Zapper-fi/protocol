import React from 'react';

interface Feature {
  title: string;
  description: string;
  href: string;
}

interface FeatureCardProps extends Feature {}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, href }) => (
  <a 
    href={href}
    className="flex flex-col gap-4 p-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 transition-colors duration-200 h-full"
  >
    <h3 className="text-xl font-semibold text-white">
      {title}
    </h3>
    <p className="text-neutral-400">
      {description}
    </p>
  </a>
);

const features: Feature[] = [
  {
    title: "Human-Readable Transactions",
    description: "Simplify onchain transactions with human-friendly descriptions.",
    href: "/docs/api/endpoints/human-readable-transactions/timeline-event"
  },
  {
    title: "Onchain Identity",
    description: "Surface identity primitives such as avatars, ENS, Farcaster, Lens and more.",
    href: "/docs/api/endpoints/onchain-identity"
  },
  {
    title: "Portfolio Data",
    description: "A set of portfolio queries to fetch Tokens, NFTs, App Balances, Portfolio Totals, and Claimables.",
    href: "/docs/api/endpoints/portfolio/claimables"
  },
  {
    title: "Onchain Prices",
    description: "A price for every token that has an onchain market, including historical data.",
    href: "/docs/api/endpoints/onchain-prices"
  }
];

export function Features() {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-bold text-white mb-12">
        What can I get?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}