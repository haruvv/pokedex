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
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // 背景色を薄い灰色に
        borderColor: 'rgba(169, 169, 169, 0.9)', // 線の色を灰色に
        borderWidth: 2,
        pointRadius: 0, // プロットを非表示
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
          color: 'rgba(169, 169, 169, 0.3)', // グリッドラインの色を灰色に
          lineWidth: 1, // グリッドラインの幅を細く設定
        },
        angleLines: {
          color: 'rgba(169, 169, 169, 0.5)', // 軸のラインの色を灰色に
          lineWidth: 1, // 軸のラインの幅を細く設定
        },
      },
    },
    elements: {
      line: {
        tension: 0, // 線の曲線を直線に設定
        borderWidth: 2, // 線の幅を設定
        borderColor: 'rgba(169, 169, 169, 0.9)', // 線の色を灰色に
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(0, 0, 0, 0.7)', // 凡例のテキスト色
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // ツールチップの背景色
        titleColor: '#fff', // ツールチップのタイトル色
        bodyColor: '#fff', // ツールチップの本文色
        borderColor: 'rgba(169, 169, 169, 0.5)', // ツールチップの枠線色
        borderWidth: 1, // ツールチップの枠線の幅
      },
    },
  };

  return (
    <div className="text-center mb-8">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Stats</h2>
        <div className="relative w-full h-[500px]">
          {' '}
          {/* サイズを大きくする */}
          <Radar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
