'use client';

import { useEffect, useRef } from 'react';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // 0 = fixed, 1 = scrolls with page, 0.3 = moves 30% of scroll
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ParallaxLayer — applies a scroll-speed multiplier to a hero element.
 * speed=0.3 means the layer moves 30% as fast as the page scroll = stays "behind"
 * Use on hero elements to create multi-layer depth that proves it's code, not video.
 */
export default function ParallaxLayer({
  children,
  speed = 0.4,
  className = '',
  style,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const currentY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const target = window.scrollY * speed;
      // Smooth interpolation for extra buttery feel
      currentY.current += (target - currentY.current) * 0.08;
      el.style.transform = `translateY(${currentY.current.toFixed(2)}px)`;
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', ...style }}>
      {children}
    </div>
  );
}
