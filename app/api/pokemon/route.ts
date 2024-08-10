import { NextResponse } from 'next/server';
import { getPokemonList } from '@/lib/pokeapi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { pokemonList, totalCount } = await getPokemonList(page);
  return NextResponse.json({ pokemonList, totalCount });
}
