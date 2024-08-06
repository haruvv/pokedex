// src/app/pokemon/[name]/page.tsx
import Pokedex, { Pokemon } from 'pokedex-promise-v2';

async function fetchPokemonByName(name: string): Promise<Pokemon> {
  const P = new Pokedex();
  return P.getPokemonByName(name);
}

export default async function PokemonDetailPage({ params }: { params: { name: string } }) {
  const pokemon = await fetchPokemonByName(params.name);

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Base Experience: {pokemon.base_experience}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
      {/* その他の詳細情報をここに追加 */}
    </div>
  );
}
