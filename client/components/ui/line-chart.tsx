import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components to make them available
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface LineChartProps {
  labels: string[];
  data: number[];
  borderColor: string;
}

const LineChart: React.FC<LineChartProps> = ({ labels, data, borderColor }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sample Data',
        data,
        fill: true,
        borderColor: borderColor,
        tension: 0.,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'X-axis',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y-axis',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
