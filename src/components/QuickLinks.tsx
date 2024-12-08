import React from 'react';
import { BookOpen, Beaker, CreditCard } from 'lucide-react';

interface QuickLinkProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const QuickLink: React.FC<QuickLinkProps> = ({ title, description, href, icon: Icon }) => (
  <a
    href={href}
    className="flex flex-col rounded-lg border border-neutral-400 hover:opacity-90 transition-opacity duration-200 mb-2 text-inherit hover:no-underline p-4"
  >
    <div className="flex items-start gap-4">
      <div className="mt-1">
        <Icon className="w-6 h-6 flex-shrink-0 text-neutral-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold mb-1 leading-tight">{title}</h3>
        <p className="text-sm text-neutral-400 leading-normal m-0">{description}</p>
      </div>
    </div>
  </a>
);

export const QuickLinks: React.FC = () => {
  const links = [
    {
      title: 'Documentation',
      description: 'Explore step-by-step guides and references',
      href: '/docs/api',
      icon: BookOpen,
    },
    {
      title: 'Sandbox',
      description: 'Test your queries and explore',
      href: '/docs/api/sandbox',
      icon: Beaker,
    },
    {
      title: 'Pricing',
      description: 'View pricing plans and credit discounts',
      href: '/docs/api/pricing',
      icon: CreditCard,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      {links.map((link) => (
        <QuickLink key={link.title} {...link} />
      ))}
    </div>
  );
};