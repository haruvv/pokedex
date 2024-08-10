// app/components/Pagination.tsx
import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 mx-1">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
