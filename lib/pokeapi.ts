import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();
export const MAX_POKEMON_ID = 1025;

interface EvolutionDetail {
  name: string;
  image: string;
  id: number;
}

interface EvolutionChain {
  base: EvolutionDetail;
  evolutions: EvolutionDetail[];
}

interface Generation {
  id: number;
  name: string;
  pokemonSpecies: { name: string; url: string }[];
}

export async function getGenerations(): Promise<Generation[]> {
  try {
    const response = await P.getGenerationsList();
    const generations = await Promise.all(
      response.results.map(async (gen: any) => {
        const genData = await P.getGenerationByName(gen.name);
        return {
          id: genData.id,
          name: genData.names.find((name: any) => name.language.name === 'en')?.name || gen.name,
          pokemonSpecies: genData.pokemon_species,
        };
      })
    );
    return generations;
  } catch (error) {
    console.error('Error fetching generations:', error);
    return [];
  }
}

export async function getPokemonListByGeneration(
  generationId: number,
  page: number,
  limit: number = 20
): Promise<{ pokemonList: PokemonBasicInfo[]; totalCount: number }> {
  try {
    const pokemonRange = getPokemonRangeForGeneration(generationId);
    const start = (page - 1) * limit + pokemonRange.start;
    const end = Math.min(start + limit, pokemonRange.end + 1); // +1 を追加

    const pokemonPromises = [];
    for (let i = start; i < end; i++) {
      pokemonPromises.push(getPokemonBasicInfo(i));
    }

    const pokemonList = await Promise.all(pokemonPromises);
    return { pokemonList, totalCount: pokemonRange.end - pokemonRange.start + 1 };
  } catch (error) {
    console.error('Error fetching Pokemon list by generation:', error);
    return { pokemonList: [], totalCount: 0 };
  }
}

export function getPokemonRangeForGeneration(generationId: number): { start: number; end: number } {
  switch (generationId) {
    case 1:
      return { start: 1, end: 151 };
    case 2:
      return { start: 152, end: 251 };
    case 3:
      return { start: 252, end: 386 };
    case 4:
      return { start: 387, end: 493 };
    case 5:
      return { start: 494, end: 649 };
    case 6:
      return { start: 650, end: 721 };
    case 7:
      return { start: 722, end: 809 };
    case 8:
      return { start: 810, end: 905 };
    case 9:
      return { start: 906, end: MAX_POKEMON_ID };
    default:
      return { start: 1, end: MAX_POKEMON_ID };
  }
}

export async function getPokemonList(
  page: number,
  limit: number = 20,
  generationId: number | null = null
): Promise<{ pokemonList: PokemonBasicInfo[]; totalCount: number }> {
  try {
    if (generationId) {
      return getPokemonListByGeneration(generationId, page, limit);
    }

    const offset = (page - 1) * limit;
    const { results, count } = await P.getPokemonsList({ limit, offset });
    const pokemonPromises = results
      .filter((_, index) => offset + index < MAX_POKEMON_ID)
      .map((result) => getPokemonBasicInfo(result.name));
    const pokemonList = await Promise.all(pokemonPromises);
    return { pokemonList, totalCount: Math.min(count, MAX_POKEMON_ID) };
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    return { pokemonList: [], totalCount: 0 };
  }
}

async function getPokemonBasicInfo(nameOrId: string | number): Promise<PokemonBasicInfo> {
  try {
    const pokemon = await P.getPokemonByName(nameOrId);
    const species = await P.getPokemonSpeciesByName(pokemon.id);

    return {
      id: pokemon.id,
      name: pokemon.name,
      japaneseName:
        species.names.find((name: any) => name.language.name === 'ja')?.name || pokemon.name,
      image: pokemon.sprites.front_default || '/path/to/fallback-image.png',
      types: pokemon.types.map((type: any) => type.type.name),
    };
  } catch (error) {
    console.error(`Error fetching info for Pokemon ${nameOrId}:`, error);
    return {
      id: 0,
      name: typeof nameOrId === 'string' ? nameOrId : '',
      japaneseName: '',
      image: '/path/to/fallback-image.png',
      types: [],
    };
  }
}

async function getPokemonJapaneseName(englishName: string): Promise<string> {
  try {
    const speciesInfo = await P.getPokemonSpeciesByName(englishName.toLowerCase());
    const japaneseNameObj = speciesInfo.names.find((name: any) => name.language.name === 'ja-Hrkt');
    return japaneseNameObj ? japaneseNameObj.name : '日本語名が見つかりません。';
  } catch (error) {
    console.error(`Error fetching Japanese name for ${englishName}:`, error);
    return 'ポケモンの情報を取得できませんでした。';
  }
}

async function getAbilityJapaneseName(abilityName: string): Promise<string> {
  try {
    const ability = await P.getAbilityByName(abilityName);
    const japaneseName = ability.names.find((name: any) => name.language.name === 'ja')?.name;
    return japaneseName || abilityName;
  } catch (error) {
    console.error(`Error fetching Japanese name for ability ${abilityName}:`, error);
    return abilityName;
  }
}

async function getEvolutionChain(id: number): Promise<EvolutionChain> {
  try {
    const pokemon = await P.getPokemonSpeciesByName(id);
    const evolutionChainResponse = await fetch(pokemon.evolution_chain.url);
    const evolutionChain = await evolutionChainResponse.json();

    const baseSpecies = await P.getPokemonSpeciesByName(evolutionChain.chain.species.name);
    const basePokemon = await P.getPokemonByName(baseSpecies.id);

    const base: EvolutionDetail = {
      name:
        baseSpecies.names.find((name: any) => name.language.name === 'ja')?.name ||
        baseSpecies.name,
      image: basePokemon.sprites.front_default || '/path/to/fallback-image.png', // フォールバック画像を追加
      id: baseSpecies.id,
    };

    const evolutions: EvolutionDetail[] = [];

    const traverseEvolutionChain = async (chain: any): Promise<void> => {
      for (const evolution of chain.evolves_to) {
        const species = await P.getPokemonSpeciesByName(evolution.species.name);
        const pokemon = await P.getPokemonByName(species.id);
        evolutions.push({
          name:
            species.names.find((name: any) => name.language.name === 'ja')?.name || species.name,
          image: pokemon.sprites.front_default || '/path/to/fallback-image.png', // フォールバック画像を追加
          id: species.id,
        });
        await traverseEvolutionChain(evolution);
      }
    };

    await traverseEvolutionChain(evolutionChain.chain);

    return { base, evolutions };
  } catch (error) {
    console.error('Error fetching evolution chain:', error);
    throw error;
  }
}

export async function getPokemonDetails(id: number) {
  if (id > MAX_POKEMON_ID) {
    throw new Error('Invalid Pokemon ID');
  }

  try {
    const pokemon = await P.getPokemonByName(id);
    let japaneseName = pokemon.name;

    try {
      const speciesInfo = await P.getPokemonSpeciesByName(id);
      const japaneseNameObj = speciesInfo.names.find((name: any) => name.language.name === 'ja');
      if (japaneseNameObj) {
        japaneseName = japaneseNameObj.name;
      }
    } catch (speciesError) {
      console.warn(`Could not fetch species info for Pokemon ${id}:`, speciesError);
    }

    const abilitiesPromises = pokemon.abilities.map(async (ability: any) => {
      const japaneseName = await getAbilityJapaneseName(ability.ability.name);
      return {
        name: ability.ability.name,
        japaneseName: japaneseName,
        isHidden: ability.is_hidden,
      };
    });

    const abilities = await Promise.all(abilitiesPromises);
    const evolutionChain = await getEvolutionChain(id);

    return {
      id: pokemon.id,
      name: pokemon.name,
      japaneseName,
      image: pokemon.sprites.front_default || '/path/to/fallback-image.png',
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((type: any) => type.type.name),
      abilities: abilities,
      evolutionChain,
      stats: {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        specialAttack: pokemon.stats[3].base_stat,
        specialDefense: pokemon.stats[4].base_stat,
        speed: pokemon.stats[5].base_stat,
      },
    };
  } catch (error) {
    console.error(`Error fetching details for Pokemon ${id}:`, error);
    throw error;
  }
}

export async function getAdjacentPokemonNames(
  id: number
): Promise<{ prev: string | null; next: string | null }> {
  const prevId = id > 1 ? id - 1 : null;
  const nextId = id < MAX_POKEMON_ID ? id + 1 : null;

  const [prevName, nextName] = await Promise.all([
    prevId ? getPokemonJapaneseName(prevId.toString()) : Promise.resolve(null),
    nextId ? getPokemonJapaneseName(nextId.toString()) : Promise.resolve(null),
  ]);

  return { prev: prevName, next: nextName };
}

export interface PokemonBasicInfo {
  id: number;
  name: string;
  japaneseName: string;
  image: string;
  types: string[];
}
