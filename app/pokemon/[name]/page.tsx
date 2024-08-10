import Pokedex, { Pokemon, PokemonSpecies } from 'pokedex-promise-v2';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '../../../components/Header';
import BackToListLink from '../../../components/BackToListLink';
import PokemonStats from '../../../components/PokemonStats';
import NavigationLinks from '../../../components/NavigationLinks';
import Footer from '../../../components/Footer';

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

const P = new Pokedex();

interface PokemonDetailPageProps {
  params: { name: string };
  searchParams: { page?: string };
}

export default async function PokemonDetailPage({ params, searchParams }: PokemonDetailPageProps) {
  try {
    const currentPage = parseInt(searchParams.page || '1', 10);

    // 全てのポケモンリストを取得（フォルムチェンジも含む）
    const allPokemonList = await P.getPokemonsList({ limit: 100000, offset: 0 });
    const totalPokemonCount = allPokemonList.count;

    // 現在のポケモンを取得
    const pokemon = await P.getPokemonByName(params.name);
    const speciesUrl = pokemon.species.url;

    const speciesResponse = await fetch(speciesUrl);
    if (!speciesResponse.ok) {
      throw new Error('Failed to fetch species data');
    }
    const species: PokemonSpecies = await speciesResponse.json();

    const japaneseName =
      species.names.find((name) => name.language.name === 'ja-Hrkt')?.name || pokemon.name;

    const types = pokemon.types.map((typeInfo) => {
      const typeName = typeInfo.type.name;
      const color = typeColors[typeName] || '#D0D0D0'; // デフォルト色
      return { name: typeName, color };
    });

    // 前後のポケモンを取得
    const previousPokemonId = pokemon.id > 1 ? String(pokemon.id - 1) : String(totalPokemonCount);
    const nextPokemonId = pokemon.id < totalPokemonCount ? String(pokemon.id + 1) : '1';

    const previousPokemon = await P.getPokemonByName(previousPokemonId);
    const nextPokemon = await P.getPokemonByName(nextPokemonId);

    const previousJapaneseName = previousPokemon
      ? (
          (await fetch(previousPokemon.species.url).then((res) => res.json())) as PokemonSpecies
        ).names.find((name) => name.language.name === 'ja-Hrkt')?.name || previousPokemon.name
      : null;

    const nextJapaneseName = nextPokemon
      ? (
          (await fetch(nextPokemon.species.url).then((res) => res.json())) as PokemonSpecies
        ).names.find((name) => name.language.name === 'ja-Hrkt')?.name || nextPokemon.name
      : null;

    return (
      <>
        <Header />
        <div className="container mx-auto p-8 relative">
          <BackToListLink currentPage={currentPage.toString()} />
          <div className="mt-16">
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
              <div className="text-center mb-8 text-gray-500">No Image Available</div>
            )}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {types.map((type) => (
                <span
                  key={type.name}
                  className="px-4 py-2 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: type.color }}
                >
                  {type.name}
                </span>
              ))}
            </div>
            <PokemonStats pokemon={pokemon} />
            <NavigationLinks
              previousPokemon={previousPokemon}
              nextPokemon={nextPokemon}
              previousJapaneseName={previousJapaneseName}
              nextJapaneseName={nextJapaneseName}
              currentPage={currentPage.toString()}
            />
          </div>
        </div>
        <Footer currentPage={currentPage} totalPages={Math.ceil(totalPokemonCount / 20)} />
      </>
    );
  } catch (error) {
    notFound();
  }
}
