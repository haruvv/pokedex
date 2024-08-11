'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PokemonCard from '@/components/PokemonCard';
import Pagination from '@/components/Pagination';
import GenerationFilter from '@/components/GenerationFilter';
import { getPokemonList, PokemonBasicInfo } from '@/lib/pokeapi';

interface PokemonListProps {
  initialPokemonList: PokemonBasicInfo[];
  initialTotalCount: number;
  generations: { id: number; name: string }[];
  initialPage: number;
  itemsPerPage: number;
}

export default function PokemonList({
  initialPokemonList,
  initialTotalCount,
  generations,
  initialPage,
  itemsPerPage,
}: PokemonListProps) {
  const searchParams = useSearchParams();
  const initialGeneration = searchParams.get('generation');

  const [pokemonList, setPokemonList] = useState<PokemonBasicInfo[]>(initialPokemonList);
  const [totalCount, setTotalCount] = useState<number>(initialTotalCount);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(
    initialGeneration ? Number(initialGeneration) : null
  );

  const router = useRouter();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const { pokemonList, totalCount } = await getPokemonList(
          currentPage,
          itemsPerPage,
          selectedGeneration
        );
        setPokemonList(pokemonList);
        setTotalCount(totalCount);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setPokemonList([]);
        setTotalCount(0);
      }
    };

    fetchPokemon();
  }, [currentPage, selectedGeneration, itemsPerPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleGenerationChange = (genId: number | null) => {
    setSelectedGeneration(genId);
    setCurrentPage(1);
    router.push(`/?page=1${genId ? `&generation=${genId}` : ''}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/?page=${page}${selectedGeneration ? `&generation=${selectedGeneration}` : ''}`);
  };

  return (
    <>
      <div className="mb-8 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-2">Filter by Generation</h2>
        <GenerationFilter
          generations={generations}
          selectedGeneration={selectedGeneration}
          onGenerationChange={handleGenerationChange}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            japaneseName={pokemon.japaneseName}
            image={pokemon.image}
            types={pokemon.types || []}
            generation={selectedGeneration}
            currentPage={currentPage}
          />
        ))}
      </div>
      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
