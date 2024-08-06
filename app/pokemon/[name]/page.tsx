// src/app/pokemon/[name]/page.tsx
import Pokedex, { Pokemon } from 'pokedex-promise-v2';
import Link from 'next/link';

async function fetchPokemonByName(name: string): Promise<Pokemon> {
  const P = new Pokedex();
  return P.getPokemonByName(name);
}

export default async function PokemonDetailPage({ params }: { params: { name: string } }) {
  const pokemon = await fetchPokemonByName(params.name);

  // 名前からポケモンのIDを取得
  const pokemonId = pokemon.id;

  // 前のポケモンと次のポケモンのIDを計算（ループするように調整）
  const previousPokemonId = pokemonId > 1 ? pokemonId - 1 : 1010; // 最初のポケモンの場合は最後のポケモンへ
  const nextPokemonId = pokemonId < 1010 ? pokemonId + 1 : 1; // 最後のポケモンの場合は最初のポケモンへ

  // 前のポケモンと次のポケモンの名前を取得
  const previousPokemon = await fetchPokemonByName(previousPokemonId.toString());
  const nextPokemon = await fetchPokemonByName(nextPokemonId.toString());

  return (
    <div>
      <h1>{pokemon.name}</h1>
      {pokemon.sprites.front_default ? (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      ) : (
        <div>No Image Available</div>
      )}
      <p>Base Experience: {pokemon.base_experience}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>

      {/* 前のポケモンと次のポケモンへのリンク */}
      <div style={{ marginTop: '20px' }}>
        <Link href={`/pokemon/${previousPokemon.name}`}>Previous: {previousPokemon.name}</Link>
        <Link href={`/pokemon/${nextPokemon.name}`}>Next: {nextPokemon.name}</Link>
      </div>
    </div>
  );
}
