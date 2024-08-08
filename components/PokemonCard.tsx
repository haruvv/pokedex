import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from 'pokedex-promise-v2';

interface PokemonCardProps {
  pokemon: Pokemon & { japaneseName: string };
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg w-40 shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-xl font-semibold text-center">{pokemon.japaneseName}</h2>
      {pokemon.sprites.front_default ? (
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.japaneseName}
          width={96}
          height={96}
          className="mx-auto my-2"
          priority // 画像を優先して読み込む
        />
      ) : (
        <div className="text-center">No Image Available</div>
      )}
      <Link
        href={`/pokemon/${pokemon.name}`}
        className="text-blue-500 hover:underline text-center block mt-4"
      >
        See Details
      </Link>
    </div>
  );
}
