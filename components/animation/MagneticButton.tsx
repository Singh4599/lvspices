'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  radius = 80,
  strength = 0.3,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < radius) {
        xTo(distX * strength);
        yTo(distY * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [radius, strength]);

  return (
    <div ref={btnRef} className={`magnetic-wrap ${className}`}>
      {children}
    </div>
  );
}
