"use client";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

interface SpectrumChartProps {
  peakData: { mz: number; intensity: number }[];
}

export default function SpectrumChart({ peakData }: SpectrumChartProps) {
  const chartData = {
    labels: peakData.map((point) => point.mz.toFixed(2)),
    datasets: [
      {
        label: 'Mass Spectrum',
        data: peakData.map((point) => point.intensity),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category', // Explicit type for the x-axis scale
        title: { display: true, text: 'm/z' },
      },
      y: {
        title: { display: true, text: 'Intensity' },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
