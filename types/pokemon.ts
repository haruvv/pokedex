import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

export async function getPokemonList(page: number, limit: number = 20) {
  const offset = (page - 1) * limit;
  const { results, count } = await P.getPokemonsList({ limit, offset });
  const pokemonPromises = results.map(async (result: any) => {
    const pokemon = await P.getPokemonByName(result.name);
    const species = await P.getPokemonSpeciesByName(result.name);
    return {
      id: pokemon.id,
      name: species.names.find((name: any) => name.language.name === 'ja')?.name || pokemon.name,
      image: pokemon.sprites.front_default,
    };
  });
  const pokemonList = await Promise.all(pokemonPromises);
  return { pokemonList, totalCount: count };
}

export async function getPokemonDetails(id: number) {
  const pokemon = await P.getPokemonByName(id);
  const species = await P.getPokemonSpeciesByName(id);
  return {
    id: pokemon.id,
    name: species.names.find((name: any) => name.language.name === 'ja')?.name || pokemon.name,
    image: pokemon.sprites.front_default,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((type: any) => type.type.name),
    abilities: pokemon.abilities.map((ability: any) => ability.ability.name),
  };
}
