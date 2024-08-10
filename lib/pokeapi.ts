import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();
export const MAX_POKEMON_ID = 1025;

interface PokemonBasicInfo {
  id: number;
  name: string;
  japaneseName: string;
  image: string;
  types: string[];
}

export async function getPokemonList(
  page: number,
  limit: number = 20
): Promise<{ pokemonList: PokemonBasicInfo[]; totalCount: number }> {
  const offset = (page - 1) * limit;
  try {
    let results: { name: string }[];
    let count;

    if (offset < MAX_POKEMON_ID) {
      const response = await P.getPokemonsList({
        limit: Math.min(limit, MAX_POKEMON_ID - offset),
        offset,
      });
      results = response.results;
      count = response.count;
    } else {
      results = [];
      count = MAX_POKEMON_ID;
    }

    const pokemonPromises = results.map(getPokemonBasicInfo);
    const pokemonList = await Promise.all(pokemonPromises);
    return { pokemonList, totalCount: Math.min(count, MAX_POKEMON_ID) };
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    return { pokemonList: [], totalCount: 0 };
  }
}

async function getPokemonBasicInfo(result: { name: string }): Promise<PokemonBasicInfo> {
  try {
    const pokemon = await P.getPokemonByName(result.name);
    const japaneseName = await getPokemonJapaneseName(result.name);

    return {
      id: pokemon.id,
      name: pokemon.name,
      japaneseName,
      image: pokemon.sprites.front_default || '/path/to/fallback-image.png',
      types: pokemon.types.map((type: any) => type.type.name),
    };
  } catch (error) {
    console.error(`Error fetching info for Pokemon ${result.name}:`, error);
    return {
      id: 0,
      name: result.name,
      japaneseName: '日本語名が見つかりません。',
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

    return {
      id: pokemon.id,
      name: pokemon.name,
      japaneseName,
      image: pokemon.sprites.front_default || '/path/to/fallback-image.png',
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((type: any) => type.type.name),
      abilities: abilities,
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
