'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ScrollProgressProps {
  color?: string;
  height?: number;
}

export default function ScrollProgress({
  color = '#AC033B',
  height = 2,
}: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[90] origin-left"
      style={{
        height: `${height}px`,
        background: color,
        transform: 'scaleX(0)',
        willChange: 'transform',
      }}
    />
  );
}
