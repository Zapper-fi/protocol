import { useState } from 'react';
import type { TimeFrame } from '../types';
import { ChartTabsButton } from './ChartTabsButton';

export function ChartTabs({
  timeFrames,
  handleTimeFrameChange,
  timeFrame,
}: { timeFrames: TimeFrame[]; handleTimeFrameChange: (tf: TimeFrame) => void; timeFrame: TimeFrame }) {
  return (
    <div className="chart__tabs  flex gap-1 py-1 px-1">
      {timeFrames.map((tf) => (
        <ChartTabsButton
          key={tf}
          timeFrame={tf}
          handleTimeFrameChange={handleTimeFrameChange}
          isActive={timeFrame === tf}
        />
      ))}
    </div>
  );
}
