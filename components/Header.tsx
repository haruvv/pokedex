// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md border-b border-gray-700">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Pokédex
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-300 hover:text-gray-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-300 hover:text-gray-200 transition-colors">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
