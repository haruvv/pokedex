'use client';

import { useEffect } from 'react';
import { Pokemon } from 'pokedex-promise-v2';
import PokemonCard from './PokemonCard';
import Pagination from './Pagination';

interface PokemonListProps {
  pokemons: (Pokemon & { japaneseName: string })[];
  page: number;
}

export default function PokemonList({ pokemons, page }: PokemonListProps) {
  // プリフェッチ用のuseEffect
  useEffect(() => {
    pokemons.forEach((pokemon) => {
      const img = new Image();
      img.src = pokemon.sprites.front_default || '';
    });
  }, [pokemons]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Pokemon List</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      <Pagination currentPage={page} />
    </div>
  );
}
