// components/Pagination.tsx
import Link from 'next/link';
import { useMemo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pageNumbers = useMemo(() => {
    const range = 2;
    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    if (currentPage <= range) {
      end = Math.min(totalPages, end + (range - currentPage + 1));
    }
    if (currentPage + range >= totalPages) {
      start = Math.max(1, start - (currentPage + range - totalPages));
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center justify-center space-x-4">
      {currentPage > 1 && (
        <Link href={`/?page=1`} className="pagination-link">
          &laquo;&laquo;
        </Link>
      )}
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="pagination-link">
          &laquo;
        </Link>
      )}

      {pageNumbers.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={`/?page=${pageNumber}`}
          className={`pagination-link ${pageNumber === currentPage ? 'active' : ''}`}
        >
          {pageNumber}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={`/?page=${currentPage + 1}`} className="pagination-link">
          &raquo;
        </Link>
      )}
      {currentPage < totalPages && (
        <Link href={`/?page=${totalPages}`} className="pagination-link">
          &raquo;&raquo;
        </Link>
      )}
    </div>
  );
}
