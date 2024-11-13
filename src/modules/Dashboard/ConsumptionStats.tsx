import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { Button } from '@site/src/components/Button';

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
import { Card } from '@site/src/components/Card';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

interface EndpointStat {
  intervalStart: number;
  operationName: string;
  requestCount: number;
}

interface ConsumptionStat {
  intervalStart: number;
  requestCount: number;
  totalCost: number;
}

const CONSUMPTION_QUERY = gql`
  query GetConsumptionStats($timeFrame: ApiRoundtripStatsTimeFrame!) {
    apiConsumptionStats(timeFrame: $timeFrame) {
      intervalStart
      requestCount
      totalCost
    }
  }
`;

const ENDPOINT_QUERY = gql`
  query GetEndpointStats($timeFrame: ApiRoundtripStatsTimeFrame!) {
    apiConsumptionStatsPerEndpoint(timeFrame: $timeFrame) {
      intervalStart
      operationName
      requestCount
    }
  }
`;

export function ConsumptionStats() {
  const [timeFrame, setTimeFrame] = useState<'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'>('MONTH');

  const {
    data: consumptionData,
    loading: consumptionLoading,
    error: consumptionError,
  } = useAuthQuery(CONSUMPTION_QUERY, {
    variables: { timeFrame },
  });

  const {
    data: endpointData,
    loading: endpointLoading,
    error: endpointError,
  } = useAuthQuery(ENDPOINT_QUERY, {
    variables: { timeFrame },
  });

  const consumptionStats = (consumptionData?.apiConsumptionStats || []) as ConsumptionStat[];
  const endpointStats = (endpointData?.apiConsumptionStatsPerEndpoint || []) as EndpointStat[];

  const handleTimeFrameChange = (newTimeFrame: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR') => {
    setTimeFrame(newTimeFrame);
  };

  const timeFrames = ['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR'] as const;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category' as const,
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        min: 0,
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 6,
          boxHeight: 6,
          padding: 15,
        },
      },
    },
  };

  const consumptionChartData = {
    labels: consumptionStats.map((item) => new Date(item.intervalStart).toLocaleDateString()),
    datasets: [
      {
        label: 'Request Count',
        data: consumptionStats.map((item) => item.requestCount),
        fill: false,
        backgroundColor: 'rgba(120,79,254,255)',
        borderColor: 'rgb(193,172,252)',
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.1,
      },
      {
        label: 'Total Cost',
        data: consumptionStats.map((item) => item.totalCost),
        fill: false,
        backgroundColor: 'rgb(118,181,197)',
        borderColor: '#8dd8e3',
        borderWidth: 1,
        pointRadius: 1,
        tension: 0.1,
      },
    ],
  };

  // Data preparation for the second chart (Endpoints over time)
  const uniqueDates = Array.from(new Set(endpointStats.map((item) => item.intervalStart))).sort();
  const uniqueEndpoints = Array.from(new Set(endpointStats.map((item) => item.operationName)));

  const colors = [
    { bg: 'rgba(120,79,254,0.7)', border: 'rgb(193,172,252)' },
    { bg: 'rgba(118,181,197,0.7)', border: '#8dd8e3' },
    { bg: 'rgba(255,99,132,0.7)', border: 'rgb(255,99,132)' },
    { bg: 'rgba(75,192,192,0.7)', border: 'rgb(75,192,192)' },
    { bg: 'rgba(255,159,64,0.7)', border: 'rgb(255,159,64)' },
    { bg: 'rgba(153,102,255,0.7)', border: 'rgb(153,102,255)' },
  ];

  const endpointChartData = {
    labels: uniqueDates.map((date) => new Date(date).toLocaleDateString()),
    datasets: uniqueEndpoints.map((endpoint, index) => {
      const colorIndex = index % colors.length;
      const data = uniqueDates.map((date) => {
        const dataPoint = endpointStats.find((stat) => stat.intervalStart === date && stat.operationName === endpoint);
        return dataPoint ? dataPoint.requestCount : 0;
      });

      return {
        label: endpoint,
        data: data,
        fill: false,
        backgroundColor: colors[colorIndex].bg,
        borderColor: colors[colorIndex].border,
        borderWidth: 1,
        pointRadius: 1,
        tension: 0.1,
      };
    }),
  };

  return (
    <div className="space-y-4">
      <h3>API Consumption Stats</h3>

      <div className="timeframe-selector flex">
        {timeFrames.map((tf) => (
          <div key={tf} className="mr-2 min-w-[60px]">
            <button
              type="button"
              onClick={() => handleTimeFrameChange(tf)}
              className={`w-full border-none cursor-pointer ${
                timeFrame === tf
                  ? 'font-extrabold text-purple-400 bg-transparent'
                  : 'font-medium text-purple-400 bg-transparent'
              }`}
            >
              {tf.charAt(0) + tf.slice(1).toLowerCase()}
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="mb-4">Consumption Amount & Cost</h3>
          <Card>
            {consumptionLoading ? (
              <p>Loading...</p>
            ) : consumptionError ? (
              <p className="text-red-400">Error: {consumptionError.message}</p>
            ) : consumptionStats.length === 0 ? (
              <p>No consumption data available for this time period</p>
            ) : (
              <Line data={consumptionChartData} options={chartOptions} />
            )}
          </Card>
        </div>

        <div>
          <h3 className="mb-4">Endpoints Queried</h3>
          <Card>
            {endpointLoading ? (
              <p>Loading...</p>
            ) : endpointError ? (
              <p className="text-red-400">Error: {endpointError.message}</p>
            ) : endpointStats.length === 0 ? (
              <p>No endpoints queried in this time period</p>
            ) : (
              <Line data={endpointChartData} options={chartOptions} />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
