import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useAuthQuery } from '../../helpers/useAuthQuery';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const QUERY = gql`
  query GetConsumptionStats($timeFrame: ApiRoundtripStatsTimeFrame!) {
    apiConsumptionStats(timeFrame: $timeFrame) {
      intervalStart
      requestCount
      totalCost
    }
  }
`;

export function ConsumptionStats() {
  const [timeFrame, setTimeFrame] = useState<'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'>('MONTH');

  const { data, loading, error } = useAuthQuery(QUERY, {
    variables: { timeFrame },
  });

  const consumptionStats = data?.apiConsumptionStats || [];

  const handleTimeFrameChange = (newTimeFrame: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR') => {
    setTimeFrame(newTimeFrame);
  };

  const timeFrames = ['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR'] as const;

  const labels = consumptionStats.map((item: any) =>
    new Date(item.intervalStart).toLocaleDateString()
  );

  const requestCountData = consumptionStats.map((item: any) => item.requestCount);
  const totalCostData = consumptionStats.map((item: any) => item.totalCost);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Request Count',
        data: requestCountData,
        fill: false,
        backgroundColor: 'rgba(120,79,254,255)',
        borderColor: 'rgb(193,172,252)',
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.1,
      },
      {
        label: 'Total Cost',
        data: totalCostData,
        fill: false,
        backgroundColor: 'rgb(118,181,197)',
        borderColor: '#8dd8e3',
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Interval Start',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div className="mb-8">
      <h2>API Consumption Stats</h2>

      <div className="my-4">
        <div className="timeframe-selector">
          {timeFrames.map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeFrameChange(tf)}
              className={`timeframe-button ${timeFrame === tf ? 'selected' : ''}`}
            >
              {tf.charAt(0) + tf.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">Error: {error.message}</p>}

      {!loading && !error && consumptionStats.length === 0 ? (
        <p>No data found</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}
