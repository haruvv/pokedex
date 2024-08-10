// app/pokemon/components/PokemonList.tsx
import PokemonCard from './PokemonCard';

type PokemonListProps = {
  pokemons: { name: string; url: string }[];
};

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  const extractIdFromUrl = (url: string) => {
    const segments = url.split('/');
    return segments[segments.length - 2]; // URLの最後から2番目の部分がID
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
      {pokemons.map((pokemon) => {
        const id = extractIdFromUrl(pokemon.url);
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return <PokemonCard key={id} name={pokemon.name} image={imageUrl} />;
      })}
    </div>
  );
};

export default PokemonList;
