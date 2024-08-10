import Image from 'next/image';
import { getTypeColor } from '@/lib/typeColors';

type PokemonInfoProps = {
  pokemon: {
    id: number;
    name: string;
    japaneseName: string;
    image: string;
    types: string[];
    height: number;
    weight: number;
    abilities: Array<{
      name: string;
      japaneseName: string;
      isHidden: boolean;
    }>;
  };
};

export default function PokemonInfo({ pokemon }: PokemonInfoProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <Image
        src={pokemon.image}
        alt={pokemon.japaneseName || pokemon.name}
        width={300}
        height={300}
        className="mx-auto md:mx-0"
        priority
      />
      <div className="md:ml-8 mt-4 md:mt-0">
        <h1 className="text-4xl font-bold text-gray-800">{pokemon.japaneseName || pokemon.name}</h1>
        <p className="text-xl text-gray-600 mb-4">({pokemon.name})</p>
        <div className="flex space-x-2 mb-4">
          {pokemon.types.map((type) => {
            const { background, text } = getTypeColor(type);
            return (
              <span
                key={type}
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: background, color: text }}
              >
                {type}
              </span>
            );
          })}
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">高さ:</span> {pokemon.height / 10}m
          </p>
          <p>
            <span className="font-semibold">重さ:</span> {pokemon.weight / 10}kg
          </p>
          <p>
            <span className="font-semibold">特性:</span>
            {pokemon.abilities.map((ability, index) => (
              <span key={ability.name}>
                {index > 0 && ', '}
                {ability.japaneseName}
                {ability.isHidden && ' (隠れ特性)'}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
