// components/Footer.tsx
import Pagination from './Pagination';

interface FooterProps {
  currentPage: number;
  totalPages: number;
}

export default function Footer({ currentPage, totalPages }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8 border-t border-gray-700">
      <div className="container mx-auto flex flex-col items-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
        <div className="text-gray-400 text-sm mt-4">© 2024 Pokédex. All rights reserved.</div>
      </div>
    </footer>
  );
}
