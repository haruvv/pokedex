// types/pokedex.d.ts
declare module 'pokedex-promise-v2' {
  export interface Pokemon {
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    // 他の必要なフィールドをここに追加
  }

  class Pokedex {
    getPokemonByName(name: string): Promise<Pokemon>;
    // 他のメソッドをここに追加
  }

  export default Pokedex;
}
