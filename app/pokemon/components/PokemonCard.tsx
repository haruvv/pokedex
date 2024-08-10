// app/pokemon/components/PokemonCard.tsx
import Image from 'next/image';
import Link from 'next/link';

type PokemonCardProps = {
  name: string;
  image: string;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image }) => {
  return (
    <Link href={`/pokemon/${name}`} className="block">
      <div className="border p-4 rounded-lg shadow-md hover:bg-gray-100 transition">
        <Image
          src={image}
          alt={name}
          width={96}
          height={96}
          priority={true} // 画像の事前読み込みを有効化
        />
        <h3 className="text-lg font-bold text-center capitalize">{name}</h3>
      </div>
    </Link>
  );
};

export default PokemonCard;
