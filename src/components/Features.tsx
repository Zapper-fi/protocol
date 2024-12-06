import React from 'react';
import { ListChecks, UserCircle, PieChart, Coins } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

interface FeatureCardProps extends Feature {}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, href, icon: Icon }) => (
  <a 
    href={href}
    className="flex flex-col p-4 rounded-2xl bg-[#181C1F] border border-[#32383D] hover:opacity-90 transition-opacity duration-200 h-full no-underline shadow-lg shadow-black/10"
  >
    <div className="text-white mb-3">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-1">
      {title}
    </h3>
    <p className="text-base text-neutral-400 leading-normal">
      {description}
    </p>
  </a>
);

const features: Feature[] = [
  {
    title: "Human-Readable Transactions",
    description: "Simplify onchain transactions with human-friendly descriptions.",
    href: "/docs/api/endpoints/human-readable-transactions/timeline-event",
    icon: ListChecks
  },
  {
    title: "Onchain Identity",
    description: "Surface identity primitives such as avatars, ENS, Farcaster, Lens and more.",
    href: "/docs/api/endpoints/onchain-identity",
    icon: UserCircle
  },
  {
    title: "Portfolio Data",
    description: "A set of portfolio queries to fetch Tokens, NFTs, App Balances, Portfolio Totals, and Claimables.",
    href: "/docs/api/endpoints/portfolio/claimables",
    icon: PieChart
  },
  {
    title: "Onchain Prices",
    description: "A price for every token that has an onchain market, including historical data.",
    href: "/docs/api/endpoints/onchain-prices",
    icon: Coins
  }
];

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
}