// app/pokemon/[name]/page.tsx
import Image from 'next/image';
import { fetchPokemonDetails } from '../../api/fetchPokemonDetails';

type PokemonDetailsProps = {
  params: { name: string };
};

export default async function PokemonDetailsPage({ params }: PokemonDetailsProps) {
  const pokemon = await fetchPokemonDetails(params.name);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize">{pokemon.name}</h1>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={200}
        height={200}
        priority={true} // 画像の事前読み込みを有効化
      />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      {/* その他のポケモン情報を表示 */}
    </div>
  );
}
