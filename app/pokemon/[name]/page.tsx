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
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">{pokemon.name}</h1>
      {pokemon.sprites.front_default ? (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto mb-8" />
      ) : (
        <div className="text-center mb-8">No Image Available</div>
      )}
      <div className="text-center mb-8">
        <p className="text-xl mb-4">Base Experience: {pokemon.base_experience}</p>
        <p className="text-xl mb-4">Height: {pokemon.height}</p>
        <p className="text-xl mb-4">Weight: {pokemon.weight}</p>
        <p className="text-xl">
          Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
        </p>
      </div>

      {/* 前のポケモンと次のポケモンへのリンク */}
      <div className="flex justify-between mt-8">
        <Link href={`/pokemon/${previousPokemon.name}`} className="text-blue-500 hover:underline">
          Previous: {previousPokemon.name}
        </Link>
        <Link href={`/pokemon/${nextPokemon.name}`} className="text-blue-500 hover:underline">
          Next: {nextPokemon.name}
        </Link>
      </div>
    </div>
  );
}
