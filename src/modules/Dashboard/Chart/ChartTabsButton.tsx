import type { TimeFrame } from '../types';

export function ChartTabsButton({
  timeFrame,
  handleTimeFrameChange,
  isActive,
}: {
  timeFrame: TimeFrame;
  handleTimeFrameChange: (tf: TimeFrame) => void;
  isActive: boolean;
}) {
  return (
    <div className="min-w-[60px]">
      <button
        type="button"
        onClick={() => handleTimeFrameChange(timeFrame)}
        className={`chart__tabs__button w-full cursor-pointer border-none px-4 py-2 ${isActive ? 'active' : ''}`}
      >
        {timeFrame.charAt(0) + timeFrame.slice(1).toLowerCase()}
      </button>
    </div>
  );
}
