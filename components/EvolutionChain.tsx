import Image from 'next/image';
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
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Evolution</h2>
      <div className="flex flex-wrap items-center justify-center">
        <PokemonEvolutionCard pokemon={base} />
        {evolutions.map((evolution, index) => (
          <Fragment key={index}>
            <div className="mx-2 text-2xl">→</div>
            <PokemonEvolutionCard pokemon={evolution} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function PokemonEvolutionCard({ pokemon }: { pokemon: EvolutionDetail }) {
  return (
    <TouchRipple href={`/pokemon/${pokemon.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 flex flex-col items-center justify-between w-32 h-40">
        <div className="w-24 h-24 relative">
          <Image src={pokemon.image} alt={pokemon.name} layout="fill" objectFit="contain" />
        </div>
        <div className="text-center mt-2">
          <h3 className="text-sm font-semibold text-gray-800">{pokemon.name}</h3>
          <p className="text-xs text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</p>
        </div>
      </div>
    </TouchRipple>
  );
}
