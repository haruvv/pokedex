// src/app/page.tsx
import Link from 'next/link';
import Pokedex, { Pokemon, NamedAPIResourceList } from 'pokedex-promise-v2';

const ITEMS_PER_PAGE = 20; // 1ページあたりのアイテム数

async function fetchPokemons(page: number): Promise<Pokemon[]> {
  const P = new Pokedex();
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const allPokemons: NamedAPIResourceList = await P.getPokemonsList({
    limit: ITEMS_PER_PAGE,
    offset,
  });
  const pokemonDetails = await Promise.all(
    allPokemons.results.map((pokemon) => P.getPokemonByName(pokemon.name))
  );
  return pokemonDetails;
}

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const pokemons = await fetchPokemons(page);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Pokemon List</h1>
      <div className="flex flex-wrap justify-center">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} className="m-4 p-4 border border-gray-300 rounded-lg w-40">
            <h2 className="text-xl font-semibold text-center">{pokemon.name}</h2>
            {pokemon.sprites.front_default ? (
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto my-2"
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
        ))}
      </div>

      {/* ページネーション */}
      <div className="flex justify-center space-x-4 mt-8">
        {page > 1 && (
          <Link href={`/?page=${page - 1}`} className="text-blue-500 hover:underline">
            Previous Page
          </Link>
        )}
        <Link href={`/?page=${page + 1}`} className="text-blue-500 hover:underline">
          Next Page
        </Link>
      </div>
    </div>
  );
}
