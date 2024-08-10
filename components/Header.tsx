import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wider hover:text-gray-300 transition-colors"
        >
          POKÉDEX
        </Link>
        <nav>
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
