// lib/utils.ts

export function calculateListPage(pokemonId: number, itemsPerPage: number = 20): number {
  return Math.ceil(pokemonId / itemsPerPage);
}
