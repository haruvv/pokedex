'use client'; // クライアントコンポーネントとして指定

import { Pokemon } from 'pokedex-promise-v2';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.jsの登録
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface PokemonStatsProps {
  pokemon: Pokemon;
}

export default function PokemonStats({ pokemon }: PokemonStatsProps) {
  // グラフデータの準備
  const data = {
    labels: pokemon.stats.map((stat) => stat.stat.name),
    datasets: [
      {
        label: 'Base Stats',
        data: pokemon.stats.map((stat) => stat.base_stat),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  // オプションの設定
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0, // 最小値を0に固定
        max: 255, // 最大値を255に固定
        ticks: {
          display: false, // 数字を表示しない
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // グリッドラインの色を薄く設定
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.2)', // 軸のラインの色を設定
        },
      },
    },
  };

  return (
    <div className="text-center mb-8">
      <p className="text-xl mb-4">Base Experience: {pokemon.base_experience}</p>
      <p className="text-xl mb-4">Height: {pokemon.height}</p>
      <p className="text-xl mb-4">Weight: {pokemon.weight}</p>
      <p className="text-xl mb-4">
        Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Stats</h2>
        <div className="relative w-full h-64">
          <Radar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
