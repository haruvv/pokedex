import { getPokemonList, MAX_POKEMON_ID } from '@/lib/pokeapi';
import PokemonCard from '@/components/PokemonCard';
import Pagination from '@/components/Pagination';

const ITEMS_PER_PAGE = 20;

export const revalidate = 3600; // 1時間ごとに再生成

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const { pokemonList, totalCount } = await getPokemonList(page, ITEMS_PER_PAGE);
  const totalPages = Math.ceil(MAX_POKEMON_ID / ITEMS_PER_PAGE);
  const currentPage = Math.min(page, totalPages);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
        Pokémon Directory
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            japaneseName={pokemon.japaneseName}
            image={pokemon.image}
            types={pokemon.types || []}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
