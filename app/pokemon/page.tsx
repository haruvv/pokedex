// src/app/pokemon/page.tsx
import Pokedex, { Pokemon } from 'pokedex-promise-v2';

async function fetchPokemon(): Promise<Pokemon> {
  const P = new Pokedex();
  const pokemon = await P.getPokemonByName('bulbasaur');
  return pokemon;
}

export default async function PokemonPage() {
  const pokemon = await fetchPokemon();

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <p>Base Experience: {pokemon.base_experience}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
}
