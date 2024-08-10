// app/api/fetchPokemons.ts
export async function fetchPokemons(page: number, limit: number) {
  const offset = (page - 1) * limit;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon data');
  }
  return response.json();
}
