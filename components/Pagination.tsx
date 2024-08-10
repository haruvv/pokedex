import Link from 'next/link';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center items-center space-x-2 mt-12">
      <Link
        href="/?page=1"
        className={`w-10 h-10 flex items-center justify-center rounded-full border ${
          currentPage === 1
            ? 'border-gray-300 text-gray-300 cursor-not-allowed'
            : 'border-black text-black hover:bg-black hover:text-white transition-colors'
        }`}
        aria-disabled={currentPage === 1}
      >
        &lt;&lt;
      </Link>
      <Link
        href={`/?page=${Math.max(1, currentPage - 1)}`}
        className={`w-10 h-10 flex items-center justify-center rounded-full border ${
          currentPage === 1
            ? 'border-gray-300 text-gray-300 cursor-not-allowed'
            : 'border-black text-black hover:bg-black hover:text-white transition-colors'
        }`}
        aria-disabled={currentPage === 1}
      >
        &lt;
      </Link>
      {pageNumbers.map((number) => (
        <Link
          key={number}
          href={`/?page=${number}`}
          className={`w-10 h-10 flex items-center justify-center rounded-full border ${
            currentPage === number
              ? 'bg-black text-white border-black'
              : 'border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors'
          }`}
        >
          {number}
        </Link>
      ))}
      <Link
        href={`/?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`w-10 h-10 flex items-center justify-center rounded-full border ${
          currentPage === totalPages
            ? 'border-gray-300 text-gray-300 cursor-not-allowed'
            : 'border-black text-black hover:bg-black hover:text-white transition-colors'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        &gt;
      </Link>
      <Link
        href={`/?page=${totalPages}`}
        className={`w-10 h-10 flex items-center justify-center rounded-full border ${
          currentPage === totalPages
            ? 'border-gray-300 text-gray-300 cursor-not-allowed'
            : 'border-black text-black hover:bg-black hover:text-white transition-colors'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </Link>
    </nav>
  );
}
