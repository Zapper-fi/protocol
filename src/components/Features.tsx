import type React from 'react';
import { RiDonutChartFill, RiListCheck2, RiPassportLine, RiCoinsLine, RiNftFill } from 'react-icons/ri';
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
    className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 text-inherit shadow-lg shadow-black/10 transition-opacity duration-200 hover:no-underline hover:opacity-90"
  >
    <div className="mb-3">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mb-1 text-xl font-semibold">{title}</h3>
    <p className="text-base leading-normal text-neutral-400">{description}</p>
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
  {
    title: 'NFTs',
    description: 'Rich NFT metadata with media, traits, holders, valuations and more.',
    href: '/docs/api/endpoints/nft-queries/nft-collections',
    icon: RiNftFill,
  },
];

export function Features() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}
