// components/NavigationLinks.tsx
import Link from 'next/link';
import { Pokemon } from 'pokedex-promise-v2';

interface NavigationLinksProps {
  previousPokemon: Pokemon | null;
  nextPokemon: Pokemon | null;
}

export default function NavigationLinks({ previousPokemon, nextPokemon }: NavigationLinksProps) {
  return (
    <div className="flex justify-between mt-8">
      {previousPokemon && (
        <Link
          href={`/pokemon/${previousPokemon.name}`}
          className="relative px-4 py-2 text-gray-800 group"
        >
          <span className="relative z-10">{`< ${previousPokemon.japaneseName}`}</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-600 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
        </Link>
      )}
      {nextPokemon && (
        <Link
          href={`/pokemon/${nextPokemon.name}`}
          className="relative px-4 py-2 text-gray-800 group"
        >
          <span className="relative z-10">{`${nextPokemon.japaneseName} >`}</span>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-600 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
        </Link>
      )}
    </div>
  );
}
