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
        <Link href={`/pokemon/${previousPokemon.name}`} className="text-blue-500 hover:underline">
          Previous: {previousPokemon.name}
        </Link>
      )}
      {nextPokemon && (
        <Link href={`/pokemon/${nextPokemon.name}`} className="text-blue-500 hover:underline">
          Next: {nextPokemon.name}
        </Link>
      )}
    </div>
  );
}
