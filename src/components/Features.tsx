import React from 'react';
import { RiDonutChartFill, RiListCheck2, RiPassportLine, RiCoinsLine } from 'react-icons/ri';
import Link from '@docusaurus/Link';

interface Feature {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

interface FeatureCardProps extends Feature {}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, href, icon: Icon }) => (
  <Link
    href={href}
    className="flex flex-col p-4 rounded-2xl bg-card border border-border hover:opacity-90 transition-opacity duration-200 h-full text-inherit hover:no-underline shadow-lg shadow-black/10"
  >
    <div className="mb-3">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold mb-1">{title}</h3>
    <p className="text-base text-neutral-400 leading-normal">{description}</p>
  </Link>
);

const features: Feature[] = [
  {
    title: 'Portfolio Data',
    description: 'A set of portfolio queries to fetch Tokens, NFTs, App Balances, Portfolio Totals, and Claimables.',
    href: '/docs/api/endpoints/portfolio',
    icon: RiDonutChartFill,
  },
  {
    title: 'Human-Readable Transactions',
    description: 'Simplify onchain transactions with human-friendly descriptions.',
    href: '/docs/api/endpoints/human-readable-transactions/timeline-event',
    icon: RiListCheck2,
  },
  {
    title: 'Onchain Identity',
    description: 'Surface identity primitives such as avatars, ENS, Farcaster, Lens and more.',
    href: '/docs/api/endpoints/onchain-identity',
    icon: RiPassportLine,
  },
  {
    title: 'Onchain Prices',
    description: 'A price for every token that has an onchain market, including historical data.',
    href: '/docs/api/endpoints/onchain-prices',
    icon: RiCoinsLine,
  },
];

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}
