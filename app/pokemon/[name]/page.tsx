import Pokedex, { Pokemon, PokemonSpecies } from 'pokedex-promise-v2';
import Image from 'next/image';
import BackToListLink from '../../../components/BackToListLink';
import PokemonStats from '../../../components/PokemonStats';
import NavigationLinks from '../../../components/NavigationLinks';

async function fetchTotalPokemonCount(): Promise<number> {
  const P = new Pokedex();
  const allPokemons = await P.getPokemonsList({ limit: 1 });
  return allPokemons.count;
}

async function fetchPokemonById(id: number): Promise<(Pokemon & { japaneseName: string }) | null> {
  const P = new Pokedex();
  try {
    const pokemon = await P.getPokemonByName(id.toString());
    const species = await fetchPokemonSpecies(pokemon.species.url);
    const japaneseName =
      species.names.find((name) => name.language.name === 'ja-Hrkt')?.name || pokemon.name;

    return { ...pokemon, japaneseName };
  } catch (error) {
    return null;
  }
}

async function fetchPokemonSpecies(url: string): Promise<PokemonSpecies> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon species data');
  }
  const species: PokemonSpecies = await response.json();
  return species;
}

export default async function PokemonDetailPage({ params }: { params: { name: string } }) {
  const P = new Pokedex();
  const pokemon = await P.getPokemonByName(params.name);
  const species = await fetchPokemonSpecies(pokemon.species.url);
  const japaneseName =
    species.names.find((name) => name.language.name === 'ja-Hrkt')?.name || pokemon.name;

  const totalPokemonCount = await fetchTotalPokemonCount();

  const pokemonId = pokemon.id;

  const previousPokemonId = pokemonId > 1 ? pokemonId - 1 : totalPokemonCount;
  const nextPokemonId = pokemonId < totalPokemonCount ? pokemonId + 1 : 1;

  const previousPokemon = await fetchPokemonById(previousPokemonId);
  const nextPokemon = await fetchPokemonById(nextPokemonId);

  return (
    <div className="container mx-auto p-8 relative">
      <BackToListLink />

      <h1 className="text-4xl font-bold text-center mb-8">{japaneseName}</h1>
      {pokemon.sprites.front_default ? (
        <Image
          src={pokemon.sprites.front_default}
          alt={japaneseName}
          width={256}
          height={256}
          className="mx-auto mb-8"
        />
      ) : (
        <div className="text-center mb-8">No Image Available</div>
      )}

      <PokemonStats pokemon={pokemon} />
      <NavigationLinks previousPokemon={previousPokemon} nextPokemon={nextPokemon} />
    </div>
  );
}
