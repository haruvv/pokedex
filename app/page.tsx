import Pokedex, { Pokemon } from 'pokedex-promise-v2';

async function fetchAllPokemons(): Promise<Pokemon[]> {
  const P = new Pokedex();
  const allPokemonsList = await P.getPokemonsList({ limit: 10000 }); // 大きなlimit値で全てを取得

  const allPokemons = await Promise.all(
    allPokemonsList.results.map((pokemon) => P.getPokemonByName(pokemon.name))
  );

  return allPokemons;
}

export default async function AllPokemonPage() {
  const pokemons = await fetchAllPokemons();

  return (
    <div>
      <h1>All Pokémon</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', width: '150px' }}
          >
            <h2>{pokemon.name}</h2>
            {pokemon.sprites.front_default ? (
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
