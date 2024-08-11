// app/page.tsx
import { Suspense } from 'react';
import { getGenerations, getPokemonList, MAX_POKEMON_ID } from '@/lib/pokeapi';
import PokemonList from '@/components/PokemonList';

const ITEMS_PER_PAGE = 24;

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; generation?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const generationId = searchParams.generation ? parseInt(searchParams.generation, 10) : null;

  const generations = await getGenerations();
  const { pokemonList, totalCount } = await getPokemonList(page, ITEMS_PER_PAGE, generationId);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800">
        Pokémon Directory
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonList
          initialPokemonList={pokemonList}
          initialTotalCount={totalCount}
          generations={generations}
          initialPage={page}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Suspense>
    </main>
  );
}
