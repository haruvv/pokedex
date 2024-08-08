// components/PokemonCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Pokemon } from 'pokedex-promise-v2';

// タイプごとの色を定義
const typeColors: { [key: string]: string } = {
  fire: '#F08030', // ほのお
  water: '#6890F0', // みず
  grass: '#78C850', // くさ
  electric: '#F8D030', // でんき
  ice: '#98D8D8', // こおり
  fighting: '#C03028', // かくとう
  poison: '#A040A0', // どく
  ground: '#E0C068', // じめん
  flying: '#A890F0', // ひこう
  psychic: '#F85888', // エスパー
  bug: '#A8B820', // むし
  rock: '#B8A038', // いわ
  ghost: '#705898', // ゴースト
  dragon: '#7038F8', // ドラゴン
  dark: '#705848', // あく
  steel: '#B8B8D0', // はがね
  fairy: '#F0B6BC', // フェアリー
};

interface PokemonCardProps {
  pokemon: Pokemon & { japaneseName: string };
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${pokemon.name}`);
  };

  const types = pokemon.types.map((typeInfo) => {
    const typeName = typeInfo.type.name;
    const color = typeColors[typeName] || '#D0D0D0'; // デフォルト色
    return { name: typeName, color };
  });

  return (
    <div
      className="p-4 border border-gray-300 rounded-lg w-40 shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      {pokemon.sprites.front_default ? (
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.japaneseName}
          width={96}
          height={96}
          className="mx-auto my-2"
          priority
        />
      ) : (
        <div className="text-center mb-2">No Image Available</div>
      )}
      <h2 className="text-xl font-semibold text-center mb-2">{pokemon.japaneseName}</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {types.map((type) => (
          <span
            key={type.name}
            className="px-4 py-1 rounded-lg"
            style={{ backgroundColor: type.color }}
          >
            {/* 文字を削除して背景色のみ表示 */}
          </span>
        ))}
      </div>
    </div>
  );
}
