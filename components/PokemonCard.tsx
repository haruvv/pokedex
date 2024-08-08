'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Pokemon } from 'pokedex-promise-v2';

// タイプごとの色を定義
const typeColors: { [key: string]: string } = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#F0B6BC',
};

interface PokemonCardProps {
  pokemon: Pokemon & { japaneseName: string };
  currentPage: number; // page パラメータを追加
}

export default function PokemonCard({ pokemon, currentPage }: PokemonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${pokemon.name}?page=${currentPage}`); // URL に page パラメータを追加
  };

  const types = pokemon.types.map((typeInfo) => {
    const typeName = typeInfo.type.name;
    const color = typeColors[typeName] || '#D0D0D0'; // デフォルト色
    return { name: typeName, color };
  });

  return (
    <div
      className="p-4 border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95 active:shadow-sm cursor-pointer
                 sm:w-32 sm:h-48 md:w-40 md:h-56 lg:w-40 lg:h-56"
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
      <h2 className="text-lg font-light text-center mb-2 font-sans text-gray-800">
        {pokemon.japaneseName}
      </h2>
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
