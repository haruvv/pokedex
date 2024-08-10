// app/components/Header.tsx
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <nav>
        <Link href="/" className="text-lg font-bold">
          Pokémon Home
        </Link>
      </nav>
    </header>
  );
};

export default Header;
