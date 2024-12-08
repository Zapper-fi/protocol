import React, { useState } from 'react';
import { 
  RiBookMarkLine, 
  RiBookMarkFill,
  RiTestTubeLine,
  RiTestTubeFill,
  RiBankCardLine,
  RiBankCardFill
} from 'react-icons/ri';

interface QuickLinkProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconHover: React.ComponentType<{ className?: string }>;
}

const QuickLink: React.FC<QuickLinkProps> = ({ title, description, href, icon: Icon, iconHover: IconHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="flex flex-col rounded-lg border border-neutral-400 hover:opacity-90 transition-opacity duration-200 mb-2 text-inherit hover:no-underline"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <div className="pt-1">
          {isHovered ? <IconHover className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
        </div>
        <div>
          <h3 className="text-base font-semibold mb-1">{title}</h3>
          <p className="text-sm text-neutral-400 leading-normal">{description}</p>
        </div>
      </div>
    </a>
  );
};

export const QuickLinks: React.FC = () => {
  const links = [
    {
      title: 'Documentation',
      description: 'Explore step-by-step guides and references',
      href: '/docs/api',
      icon: RiBookMarkLine,
      iconHover: RiBookMarkFill,
    },
    {
      title: 'Sandbox',
      description: 'Test your queries and explore ',
      href: '/docs/api/sandbox',
      icon: RiTestTubeLine,
      iconHover: RiTestTubeFill,
    },
    {
      title: 'Pricing',
      description: 'View pricing plans and credit discounts',
      href: '/docs/api/pricing',
      icon: RiBankCardLine,
      iconHover: RiBankCardFill,
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