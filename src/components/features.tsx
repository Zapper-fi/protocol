import React from 'react';
import { CircleDollarSign, FileText, User, PieChart, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

interface FeatureCardProps extends Feature {}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, href }) => (
  <a 
    href={href}
    className="block p-6 rounded-lg bg-neutral-900 hover:bg-neutral-800 transition-colors duration-200 group"
  >
    <div className="flex flex-col gap-4">
      <div className="w-8 h-8">
        <Icon className="w-full h-full text-white opacity-80" />
      </div>
      <h3 className="text-xl font-semibold text-white group-hover:text-white/90">
        {title}
      </h3>
      <p className="text-neutral-400 group-hover:text-neutral-300">
        {description}
      </p>
    </div>
  </a>
);

const features: Feature[] = [
  {
    icon: FileText,
    title: "Human-Readable Transactions",
    description: "Simplify onchain transactions with human-friendly descriptions.",
    href: "/docs/api/endpoints/human-readable-transactions/timeline-event"
  },
  {
    icon: User,
    title: "Onchain Identity",
    description: "Surface identity primitives such as avatars, ENS, Farcaster, Lens and more.",
    href: "/docs/api/endpoints/onchain-identity"
  },
  {
    icon: PieChart,
    title: "Portfolio Data",
    description: "A set of portfolio queries to fetch Tokens, NFTs, App Balances, Portfolio Totals, and Claimables.",
    href: "/docs/api/endpoints/portfolio/claimables"
  },
  {
    icon: CircleDollarSign,
    title: "Onchain Prices",
    description: "A price for every token that has an onchain market, including historical data.",
    href: "/docs/api/endpoints/onchain-prices"
  }
];

export default function Features() {
  return (
    <div className="py-12">
      <h2 className="text-4xl font-bold text-white mb-12">What can I get?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}