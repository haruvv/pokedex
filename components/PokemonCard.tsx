'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getTypeColor } from '@/lib/typeColors';

type PokemonCardProps = {
  id: number;
  name: string;
  japaneseName: string;
  image: string;
  types?: string[];
  generation?: number | null;
  currentPage: number;
};

export default function PokemonCard({
  id,
  name,
  japaneseName,
  image,
  types = [],
  generation,
  currentPage,
}: PokemonCardProps) {
  if (!id) {
    return null;
  }

  return (
    <Link
      href={`/pokemon/${id}?page=${currentPage}${generation ? `&generation=${generation}` : ''}`}
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 flex flex-col items-center justify-between h-full">
        <div className="w-24 h-24 relative mb-2">
          <Image
            src={image || '/path/to/fallback-image.png'}
            alt={japaneseName || name}
            layout="fill"
            objectFit="contain"
            className="transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
        <div className="text-center">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">
            {japaneseName || name || 'Unknown'}
          </h2>
          <p className="text-xs text-gray-500 mb-1">#{id.toString().padStart(3, '0')}</p>
          <div className="flex flex-wrap justify-center gap-1">
            {types.map((type) => {
              const { background, text } = getTypeColor(type);
              return (
                <span
                  key={type}
                  className="px-1 py-0.5 text-xs rounded-full"
                  style={{ backgroundColor: background, color: text }}
                >
                  {type}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
