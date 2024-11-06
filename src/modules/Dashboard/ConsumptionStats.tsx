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

  const handleTimeFrameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFrame(event.target.value as 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR');
  };

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
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#8884d8',
        tension: 0.1,
      },
      {
        label: 'Total Cost',
        data: totalCostData,
        fill: false,
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: '#82ca9d',
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
        <label htmlFor="timeFrame" className="mr-2">
          Select Time Frame:
        </label>
        <select id="timeFrame" value={timeFrame} onChange={handleTimeFrameChange}>
          <option value="HOUR">Hour</option>
          <option value="DAY">Day</option>
          <option value="WEEK">Week</option>
          <option value="MONTH">Month</option>
          <option value="YEAR">Year</option>
        </select>
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
