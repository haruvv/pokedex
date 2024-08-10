import Link from 'next/link';
import Image from 'next/image';
import { getTypeColor } from '@/lib/typeColors';

type PokemonCardProps = {
  id: number;
  name: string;
  japaneseName: string;
  image: string;
  types?: string[];
};

export default function PokemonCard({
  id,
  name,
  japaneseName,
  image,
  types = [],
}: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col items-center">
        <Image
          src={image}
          alt={japaneseName || name}
          width={120}
          height={120}
          className="mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
          priority={id <= 20}
          loading={id > 20 ? 'lazy' : undefined}
        />
        <h2 className="mt-2 text-base sm:text-lg font-semibold text-gray-800">
          {japaneseName || name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">#{id.toString().padStart(3, '0')}</p>
        <div className="flex mt-2 space-x-1 flex-wrap justify-center">
          {types.map((type) => {
            const { background, text } = getTypeColor(type);
            return (
              <span
                key={type}
                className="px-2 py-1 text-xs rounded-full m-1"
                style={{ backgroundColor: background, color: text }}
              >
                {type}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
