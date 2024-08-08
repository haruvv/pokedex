'use client'; // クライアントコンポーネントとして指定

import { useRouter } from 'next/navigation';

export default function BackToListLink() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); // 前のページに戻る
  };

  return (
    <div className="absolute top-4 left-4">
      <button onClick={handleBackClick} className="text-blue-500 hover:underline">
        一覧に戻る
      </button>
    </div>
  );
}
