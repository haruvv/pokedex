// components/PokemonCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
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
  const [imgSrc, setImgSrc] = useState(image);

  const content = (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white h-full flex flex-col items-center justify-center">
      <Image
        src={imgSrc}
        alt={japaneseName || name}
        width={120}
        height={120}
        className="mx-auto"
        onError={() => setImgSrc('/path/to/fallback-image.png')}
      />
      <h2 className="text-center mt-2 text-sm sm:text-base font-semibold">
        {japaneseName || name}
      </h2>
      <p className="text-center text-gray-500 text-xs sm:text-sm">No.{id}</p>
      <div className="flex mt-2 space-x-1">
        {types.map((type) => (
          <span
            key={type}
            className="w-10 h-1 rounded-full"
            style={{ backgroundColor: getTypeColor(type) }}
          />
        ))}
      </div>
    </div>
  );

  if (id >= 10000) {
    return content;
  }

  return (
    <Link href={`/pokemon/${id}`} className="block">
      {content}
    </Link>
  );
}
