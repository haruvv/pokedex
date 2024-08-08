import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
}

export default function Pagination({ currentPage }: PaginationProps) {
  return (
    <div className="flex justify-center space-x-4 mt-8">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="text-blue-500 hover:underline">
          Previous Page
        </Link>
      )}
      <Link href={`/?page=${currentPage + 1}`} className="text-blue-500 hover:underline">
        Next Page
      </Link>
    </div>
  );
}
