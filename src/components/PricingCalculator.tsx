import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BadgeDollarSign } from 'lucide-react';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 sm:h-1.5 w-full grow overflow-hidden rounded-full bg-neutral-800">
      <SliderPrimitive.Range className="absolute h-full bg-purple-600" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 sm:h-4 sm:w-4 rounded-full border border-purple-600 bg-purple-600 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

interface PricingTier {
  threshold: number;
  price: number;
}

interface PricingResult {
  total: number;
  savings: number;
  perUnit: number;
}

interface MetricCardProps {
  label: string;
  value: number;
  color: string;
  decimals: number;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toLocaleString() + 'M';
  }
  return num.toLocaleString();
};

const MetricCard: React.FC<MetricCardProps> = ({ label, value, color, decimals }) => (
  <div className="flex flex-col p-4 xs:p-3 sm:p-4 min-h-[80px] rounded-2xl bg-card border border-border shadow-lg shadow-black/10">
    <div className="text-sm xs:text-xs sm:text-sm text-neutral-400">{label}</div>
    <div className="text-xl xs:text-lg sm:text-2xl font-semibold truncate mt-1">
      ${value.toFixed(decimals)}
    </div>
  </div>
);

interface TierRowProps {
  range: string;
  price: string;
}

const TierRow: React.FC<TierRowProps> = ({ range, price }) => (
  <div className="flex justify-between text-base xs:text-sm sm:text-base text-neutral-400 py-1">
    <span>{range}</span>
    <span className="ml-2">{price}</span>
  </div>
);

const PricingCalculator: React.FC = () => {
  const [credits, setCredits] = useState<number>(15_000_000);
  
  const calculatePrice = (credits: number): PricingResult => {
    const tiers: PricingTier[] = [
      { threshold: 15_000_000, price: 1.00 },
      { threshold: 50_000_000, price: 0.80 },
      { threshold: Infinity, price: 0.70 }
    ];
    
    let remaining = credits;
    let cost = 0;
    let standardCost = credits * 1.0;
    
    tiers.forEach(({ threshold, price }, index) => {
      const tierCredits = Math.min(
        remaining,
        threshold - (index === 0 ? 0 : tiers[index - 1].threshold)
      );
      if (tierCredits > 0) {
        cost += (tierCredits * price);
        remaining -= tierCredits;
      }
    });
    
    return {
      total: cost / 1000,
      savings: (standardCost - cost) / 1000,
      perUnit: cost / credits
    };
  };

  const pricing = calculatePrice(credits);
  const metrics = [
    { label: "Total Cost", value: pricing.total, color: "purple", decimals: 2 },
    { label: "Your Savings", value: pricing.savings, color: "green", decimals: 2 },
    { label: "Cost per 1k", value: pricing.perUnit, color: "blue", decimals: 3 }
  ];

  const tiers = [
    { range: "0 - 15M credits", price: "$1.00 per 1k" },
    { range: "15M - 50M credits", price: "$0.80 per 1k" },
    { range: "50M+ credits", price: "$0.70 per 1k" }
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="p-6 xs:p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-xl xs:text-lg sm:text-2xl">
          <BadgeDollarSign className="w-6 h-6 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
          Volume Pricing Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 xs:space-y-4 sm:space-y-6 p-6 xs:p-4 sm:p-6">
        <div>
          <label className="block text-base xs:text-sm sm:text-base text-neutral-400 mb-3">
            Credits: {formatNumber(credits)}
          </label>
          <Slider
            value={[credits]}
            min={1_000_000}
            max={100_000_000}
            step={1_000_000}
            onValueChange={(value: number[]) => setCredits(value[0])}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-2 sm:gap-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="space-y-3 xs:space-y-2 sm:space-y-3">
          <h3 className="text-xl xs:text-base sm:text-xl font-semibold">Volume Discount Tiers</h3>
          <div className="grid grid-cols-1 gap-1">
            {tiers.map((tier) => (
              <TierRow key={tier.range} {...tier} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCalculator;