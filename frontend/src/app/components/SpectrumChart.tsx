"use client";

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  ChartOptions,
} from 'chart.js';

ChartJS.register(BarElement, LinearScale, Title, Tooltip);

interface SpectrumChartProps {
  peakData: { mz: number; intensity: number }[];
}

export default function SpectrumChart({ peakData }: SpectrumChartProps) {
  const fgColor = 'black';
  const chartData = {
    datasets: [
      {
        label: 'Mass Spectrum',
        data: peakData.map((point) => ({ x: point.mz, y: point.intensity })),
        borderColor: fgColor,
        backgroundColor: fgColor,
        borderWidth: 1,
        barThickness: 2,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'm/z',
          color: 'black',
        },
        ticks: {
          color: 'black',
          font: {
            size: 10,
          },
          major: {
            enabled: true,
          },
        },
        grid: {
          display: false,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Intensity',
          color: 'black',
        },
        ticks: {
          color: 'black',
          font: {
            size: 10,
          },
          callback: (value) => Number(value).toExponential().toUpperCase(),
        },
        grid: {
          display: false,
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const raw = context.raw as { x: number; y: number };
            return `Intensity: ${raw.y}`;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
