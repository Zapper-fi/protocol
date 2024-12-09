import type React from 'react';
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
    className="group flex flex-col rounded-lg border border-neutral-400 text-inherit transition-opacity duration-75 hover:no-underline hover:opacity-90"
  >
    <div className="flex items-start gap-4">
      <div className="mt-1">
        <Icon className="h-6 w-6 flex-shrink-0 text-neutral-600 transition-colors duration-75 group-hover:text-current" />
      </div>
      <div className="flex-1">
        <h3 className="mb-1 text-base font-semibold leading-tight">{title}</h3>
        <p className="m-0 text-sm leading-normal text-neutral-400">{description}</p>
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
      description: 'View query prices and credit discounts',
      href: '/docs/api/pricing',
      icon: CreditCard,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
      {links.map((link) => (
        <QuickLink key={link.title} {...link} />
      ))}
    </div>
  );
};
