import { getPokemonDetails, getAdjacentPokemonNames, MAX_POKEMON_ID } from '@/lib/pokeapi';
import { calculateListPage } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PokemonInfo from '@/components/PokemonInfo';
import StatsChart from '@/components/StatsChart';
import EvolutionChain from '@/components/EvolutionChain';

export const dynamicParams = true;

export async function generateStaticParams() {
  const params = [];
  for (let i = 1; i <= MAX_POKEMON_ID; i++) {
    params.push({ id: i.toString() });
  }
  return params;
}

export default async function PokemonDetail({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { generation?: string; page?: string };
}) {
  const id = parseInt(params.id, 10);
  const generation = searchParams.generation;
  const page = searchParams.page || '1'; // デフォルトを1ページ目にします

  if (isNaN(id) || id < 1 || id > MAX_POKEMON_ID) {
    notFound();
  }

  try {
    const pokemon = await getPokemonDetails(id);
    const { prev, next } = await getAdjacentPokemonNames(id);

    return (
      <div className="container mx-auto p-4 relative">
        <Link
          href={`/?page=${page}${generation ? `&generation=${generation}` : ''}`}
          className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Back to List
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8 mt-16">
          <PokemonInfo pokemon={pokemon} />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Base Stats</h2>
            <div className="flex justify-center">
              <StatsChart stats={pokemon.stats} />
            </div>
          </div>
          <div className="mt-8">
            <div className="overflow-x-auto sm:overflow-x-visible -mx-4 px-4 sm:mx-0 sm:px-0">
              <EvolutionChain
                base={pokemon.evolutionChain.base}
                evolutions={pokemon.evolutionChain.evolutions}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div className="w-1/3">
            {prev && (
              <Link href={`/pokemon/${id - 1}`} className="flex items-center group">
                <span className="mr-2 text-3xl group-hover:transform group-hover:-translate-x-1 transition-transform">
                  &larr;
                </span>
                <span className="text-gray-800 group-hover:underline">{prev}</span>
              </Link>
            )}
          </div>
          <div className="w-1/3 text-center">
            <span className="text-2xl font-bold text-gray-800">
              #{id.toString().padStart(3, '0')}
            </span>
          </div>
          <div className="w-1/3 text-right">
            {next && id < MAX_POKEMON_ID && (
              <Link href={`/pokemon/${id + 1}`} className="flex items-center justify-end group">
                <span className="text-gray-800 group-hover:underline">{next}</span>
                <span className="ml-2 text-3xl group-hover:transform group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch Pokemon details:', error);
    notFound();
  }
}
