// app/api/fetchPokemonDetails.ts
export async function fetchPokemonDetails(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon details');
  }
  return response.json();
}
