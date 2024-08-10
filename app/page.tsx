import { getPokemonList, MAX_POKEMON_ID } from '@/lib/pokeapi';
import PokemonCard from '@/components/PokemonCard';
import Pagination from '@/components/Pagination';

const ITEMS_PER_PAGE = 20;

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const { pokemonList, totalCount } = await getPokemonList(page, ITEMS_PER_PAGE);

  // MAX_POKEMON_IDに基づいて総ページ数を計算
  const totalPages = Math.ceil(MAX_POKEMON_ID / ITEMS_PER_PAGE);

  // 現在のページが総ページ数を超えている場合、最後のページを表示
  const currentPage = Math.min(page, totalPages);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
