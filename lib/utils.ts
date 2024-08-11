import { getPokemonRangeForGeneration } from './pokeapi';

export function calculateListPage(id: number, generation: number | null = null): number {
  const itemsPerPage = 24; // 1ページあたりのポケモン数

  if (generation) {
    const range = getPokemonRangeForGeneration(generation);
    const indexInGeneration = id - range.start;
    return Math.floor(indexInGeneration / itemsPerPage) + 1;
  }

  return Math.ceil(id / itemsPerPage);
}
