// app/pokemon/[name]/page.tsx
import Pokedex, { Pokemon, PokemonSpecies } from 'pokedex-promise-v2';
import Image from 'next/image';
import BackToListLink from '../../../components/BackToListLink';
import PokemonStats from '../../../components/PokemonStats';
import NavigationLinks from '../../../components/NavigationLinks';

// タイプごとの色を定義
const typeColors: { [key: string]: string } = {
  fire: '#F08030', // ほのお
  water: '#6890F0', // みず
  grass: '#78C850', // くさ
  electric: '#F8D030', // でんき
  ice: '#98D8D8', // こおり
  fighting: '#C03028', // かくとう
  poison: '#A040A0', // どく
  ground: '#E0C068', // じめん
  flying: '#A890F0', // ひこう
  psychic: '#F85888', // エスパー
  bug: '#A8B820', // むし
  rock: '#B8A038', // いわ
  ghost: '#705898', // ゴースト
  dragon: '#7038F8', // ドラゴン
  dark: '#705848', // あく
  steel: '#B8B8D0', // はがね
  fairy: '#F0B6BC', // フェアリー
};

async function fetchTotalPokemonCount(): Promise<number> {
  const P = new Pokedex();
  const allPokemons = await P.getPokemonsList({ limit: 1 });
  return allPokemons.count;
}

async function fetchPokemonById(id: number): Promise<(Pokemon & { japaneseName: string }) | null> {
  const P = new Pokedex();
  try {
    const pokemon = await P.getPokemonByName(id.toString());
    const species = await fetchPokemonSpecies(pokemon.species.url);
    const japaneseName =
      species.names.find((name) => name.language.name === 'ja-Hrkt')?.name || pokemon.name;

    return { ...pokemon, japaneseName };
  } catch (error) {
    return null;
  }
}

async function fetchPokemonSpecies(url: string): Promise<PokemonSpecies> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon species data');
  }
  const species: PokemonSpecies = await response.json();
  return species;
}

export default async function PokemonDetailPage({ params }: { params: { name: string } }) {
  const P = new Pokedex();
  const pokemon = await P.getPokemonByName(params.name);
  const species = await fetchPokemonSpecies(pokemon.species.url);
  const japaneseName =
    species.names.find((name) => name.language.name === 'ja-Hrkt')?.name || pokemon.name;

  const totalPokemonCount = await fetchTotalPokemonCount();

  const pokemonId = pokemon.id;

  const previousPokemonId = pokemonId > 1 ? pokemonId - 1 : totalPokemonCount;
  const nextPokemonId = pokemonId < totalPokemonCount ? pokemonId + 1 : 1;

  const previousPokemon = await fetchPokemonById(previousPokemonId);
  const nextPokemon = await fetchPokemonById(nextPokemonId);

  const types = pokemon.types.map((typeInfo) => {
    const typeName = typeInfo.type.name;
    const color = typeColors[typeName] || '#D0D0D0'; // デフォルト色
    return { name: typeName, color };
  });

  return (
    <div className="container mx-auto p-8 relative">
      {/* 一覧に戻るボタンはそのまま */}
      <BackToListLink />

      <div className="mt-16">
        {' '}
        {/* 上部の余白を増やす */}
        <h1 className="text-4xl font-bold text-center mb-8">{japaneseName}</h1>
        {pokemon.sprites.front_default ? (
          <Image
            src={pokemon.sprites.front_default}
            alt={japaneseName}
            width={192}
            height={192}
            className="mx-auto mb-8"
          />
        ) : (
          <div className="text-center mb-8">No Image Available</div>
        )}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {types.map((type) => (
            <span
              key={type.name}
              className="px-3 py-1 rounded-lg"
              style={{ backgroundColor: type.color, color: '#FFFFFF' }} // 文字色は白に設定
            >
              {type.name}
            </span>
          ))}
        </div>
        <PokemonStats pokemon={pokemon} />
        <NavigationLinks previousPokemon={previousPokemon} nextPokemon={nextPokemon} />
      </div>
    </div>
  );
}
