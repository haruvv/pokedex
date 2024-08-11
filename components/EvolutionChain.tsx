'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import TouchRipple from './TouchRipple';
import { Fragment } from 'react';

interface EvolutionDetail {
  name: string;
  image: string;
  id: number;
}

interface EvolutionChainProps {
  base: EvolutionDetail;
  evolutions: EvolutionDetail[];
}

export default function EvolutionChain({ base, evolutions }: EvolutionChainProps) {
  const searchParams = useSearchParams();
  const generation = searchParams.get('generation');
  const page = searchParams.get('page') || '1';

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Evolution</h2>
      <div className="flex flex-col sm:flex-row items-center justify-start overflow-x-auto pb-4">
        <PokemonEvolutionCard pokemon={base} generation={generation} page={page} />
        {evolutions.map((evolution, index) => (
          <Fragment key={index}>
            <div className="my-2 sm:my-0 sm:mx-4 text-2xl transform sm:rotate-0 rotate-90">→</div>
            <PokemonEvolutionCard pokemon={evolution} generation={generation} page={page} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function PokemonEvolutionCard({
  pokemon,
  generation,
  page,
}: {
  pokemon: EvolutionDetail;
  generation: string | null;
  page: string;
}) {
  return (
    <TouchRipple
      href={`/pokemon/${pokemon.id}?page=${page}${generation ? `&generation=${generation}` : ''}`}
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 flex flex-col items-center justify-between w-28 h-40 sm:w-32 sm:h-44">
        <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
          <Image src={pokemon.image} alt={pokemon.name} layout="fill" objectFit="contain" />
        </div>
        <div className="text-center mt-2">
          <h3 className="text-sm font-semibold text-gray-800 truncate w-full">{pokemon.name}</h3>
          <p className="text-xs text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
        </div>
      </div>
    </TouchRipple>
  );
}
