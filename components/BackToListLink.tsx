'use client';

import { useRouter } from 'next/navigation';

interface BackToListLinkProps {
  currentPage: string;
}

export default function BackToListLink({ currentPage }: BackToListLinkProps) {
  const router = useRouter();

  const handleBackClick = () => {
    // 現在のページ番号を保持して一覧ページに遷移
    router.push(`/?page=${currentPage}`);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleBackClick}
        className="relative px-6 py-2 text-gray-800 border border-gray-600 rounded transition-colors duration-200 ease-in-out overflow-hidden group"
      >
        <span className="relative z-10 group-hover:text-gray-300">一覧に戻る</span>
        <span className="absolute inset-0 bg-gray-800 transform scale-x-0 transition-transform duration-600 ease-in-out group-hover:scale-x-100"></span>
      </button>
    </div>
  );
}
