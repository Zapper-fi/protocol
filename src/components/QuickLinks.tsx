import React from 'react';
import { BookOpen, Beaker, CreditCard } from 'lucide-react';

interface QuickLinkProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

function QuickLink({ title, description, href, icon: Icon }: QuickLinkProps) {
  return (
    <a
      href={href}
      className="flex flex-col rounded-lg border border-neutral-400 hover:opacity-90 transition-opacity duration-200 mb-2 text-inherit hover:no-underline"
    >
      <div className="flex items-start gap-3">
        <div className="pt-1">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-semibold mb-1">{title}</h3>
          <p className="text-sm text-neutral-400 leading-normal">{description}</p>
        </div>
      </div>
    </a>
  );
}

function QuickLinks() {
  const links = [
    {
      title: 'Documentation',
      description: 'Explore step-by-step guides and references',
      href: '/docs/api',
      icon: BookOpen,
    },
    {
      title: 'Sandbox',
      description: 'Test your queries and explore ',
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
}

export default QuickLinks;