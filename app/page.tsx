import Link from 'next/link';
import Pokedex, { Pokemon, NamedAPIResourceList, PokemonSpecies } from 'pokedex-promise-v2';
import PokemonList from '../components/PokemonList';

const ITEMS_PER_PAGE = 20;

async function fetchPokemonSpecies(url: string): Promise<PokemonSpecies> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon species data');
  }
  const species: PokemonSpecies = await response.json();
  return species;
}

async function fetchPokemons(page: number): Promise<(Pokemon & { japaneseName: string })[]> {
  const P = new Pokedex();
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const allPokemons: NamedAPIResourceList = await P.getPokemonsList({
    limit: ITEMS_PER_PAGE,
    offset,
  });

  const pokemonDetails = await Promise.all(
    allPokemons.results.map(async (pokemon) => {
      const pokemonData = await P.getPokemonByName(pokemon.name);
      const species = await fetchPokemonSpecies(pokemonData.species.url);
      const japaneseName =
        species.names.find((name) => name.language.name === 'ja-Hrkt')?.name || pokemon.name;
      return {
        ...pokemonData,
        japaneseName,
      };
    })
  );

  return pokemonDetails;
}

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const pokemons = await fetchPokemons(page);

  return (
    <div className="relative">
      <PokemonList pokemons={pokemons} page={page} />
    </div>
  );
}
