// app/page.tsx
'use client'; // クライアントコンポーネントとして扱う

import { useState, useEffect } from 'react';
import { fetchPokemons } from './api/fetchPokemons';
import PokemonList from './pokemon/components/PokemonList';
import Pagination from './components/Pagination';

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20; // 1ページに表示するポケモンの数

  useEffect(() => {
    async function loadPokemons() {
      const data = await fetchPokemons(currentPage, limit);
      setPokemons(data.results);
      setTotalPages(Math.ceil(data.count / limit));
    }

    loadPokemons();
  }, [currentPage]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pokémon List</h1>
      <PokemonList pokemons={pokemons} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
