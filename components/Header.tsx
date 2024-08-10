import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-red-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">ポケモン図鑑</h1>
        <nav>
          <Link href="/" className="hover:underline">
            ホーム
          </Link>
        </nav>
      </div>
    </header>
  );
}
