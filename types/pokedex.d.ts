// src/types/pokedex.d.ts
declare module 'pokedex-promise-v2' {
  export interface NamedAPIResourceList {
    results: { name: string }[];
  }

  export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    sprites: { front_default: string | null };
  }

  class Pokedex {
    getPokemonByName(name: string): Promise<Pokemon>;
    getPokemonsList(options?: { limit?: number; offset?: number }): Promise<NamedAPIResourceList>;
  }

  export default Pokedex;
}
