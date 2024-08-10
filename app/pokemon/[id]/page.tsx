import { getPokemonDetails, getAdjacentPokemonNames } from '@/lib/pokeapi';
import { getTypeColor } from '@/lib/typeColors';
import { calculateListPage } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const MAX_POKEMON_ID = 1025;

export default async function PokemonDetail({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const pokemon = await getPokemonDetails(id);
  const { prev, next } = await getAdjacentPokemonNames(id);
  const listPage = calculateListPage(id);

  return (
    <div className="container mx-auto p-4 relative">
      <Link
        href={`/?page=${listPage}`}
        className="absolute top-0 left-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        一覧に戻る
      </Link>
      <div className="bg-white rounded-lg shadow-md p-6 mt-12">
        <Image
          src={pokemon.image}
          alt={pokemon.japaneseName || pokemon.name}
          width={200}
          height={200}
          className="mx-auto"
        />
        <h1 className="text-2xl font-bold text-center mt-4">
          {pokemon.japaneseName || pokemon.name}
        </h1>
        <p className="text-center text-gray-500">({pokemon.name})</p>
        <div className="flex justify-center mt-2 space-x-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-2 py-1 rounded-full text-white text-sm"
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <p>高さ: {pokemon.height / 10}m</p>
          <p>重さ: {pokemon.weight / 10}kg</p>
          <p>特性: {pokemon.abilities.join(', ')}</p>
        </div>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <div>
          {prev && (
            <Link
              href={`/pokemon/${id - 1}`}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <span className="mr-2">&lt;</span>
              <span>{prev}</span>
            </Link>
          )}
        </div>
        <div>
          {next && id < MAX_POKEMON_ID && (
            <Link
              href={`/pokemon/${id + 1}`}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <span>{next}</span>
              <span className="ml-2">&gt;</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
