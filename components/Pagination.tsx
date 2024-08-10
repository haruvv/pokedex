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
    <nav className="flex justify-center items-center space-x-2 mt-8">
      <Link
        href="/?page=1"
        className={`px-3 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
      >
        &lt;&lt;
      </Link>
      <Link
        href={`/?page=${Math.max(1, currentPage - 1)}`}
        className={`px-3 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
      >
        &lt;
      </Link>
      {pageNumbers.map((number) => (
        <Link
          key={number}
          href={`/?page=${number}`}
          className={`px-3 py-2 rounded ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
        >
          {number}
        </Link>
      ))}
      <Link
        href={`/?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`px-3 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
      >
        &gt;
      </Link>
      <Link
        href={`/?page=${totalPages}`}
        className={`px-3 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
      >
        &gt;&gt;
      </Link>
    </nav>
  );
}
