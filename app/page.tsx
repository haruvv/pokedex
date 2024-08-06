// src/app/page.tsx
import Link from 'next/link';
import Pokedex, { Pokemon } from 'pokedex-promise-v2';

async function fetchPokemons(): Promise<Pokemon[]> {
  const P = new Pokedex();
  // ここでは最初の10件を取得する例
  const pokemons = await P.getPokemonsList({ limit: 1000 });
  const pokemonDetails = await Promise.all(
    pokemons.results.map((pokemon) => P.getPokemonByName(pokemon.name))
  );
  return pokemonDetails;
}

export default async function HomePage() {
  const pokemons = await fetchPokemons();

  return (
    <div>
      <h1>Pokemon List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', width: '150px' }}
          >
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <Link href={`/pokemon/${pokemon.name}`}>See Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
