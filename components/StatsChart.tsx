'use client';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type StatsChartProps = {
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
};

export default function StatsChart({ stats }: StatsChartProps) {
  const data = {
    labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
    datasets: [
      {
        label: 'Base Stats',
        data: [
          stats.hp,
          stats.attack,
          stats.defense,
          stats.specialAttack,
          stats.specialDefense,
          stats.speed,
        ],
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(0, 0, 0, 0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(0, 0, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 0, 0, 1)',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: 'rgba(0, 0, 0, 0.7)',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
        suggestedMin: 0,
        suggestedMax: 255,
        ticks: {
          stepSize: 51,
          color: 'rgba(0, 0, 0, 0.5)',
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '500px', height: '500px' }}>
      <Radar data={data} options={options} />
    </div>
  );
}
