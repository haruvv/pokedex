'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TouchRippleProps {
  children: React.ReactNode;
  href: string;
}

function TouchRipple({ children, href }: TouchRippleProps) {
  const [ripple, setRipple] = useState({ x: 0, y: 0, show: false });

  useEffect(() => {
    if (ripple.show) {
      const timer = setTimeout(() => setRipple({ ...ripple, show: false }), 500);
      return () => clearTimeout(timer);
    }
  }, [ripple]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
      show: true,
    });
  };

  return (
    <Link href={href} className="block relative overflow-hidden" onTouchStart={handleTouchStart}>
      {children}
      {ripple.show && (
        <span
          className="absolute bg-white opacity-30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            opacity: 0.3,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </Link>
  );
}

export default TouchRipple;
