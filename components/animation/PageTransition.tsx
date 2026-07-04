'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * PageTransition — wraps page content in a crimson curtain wipe.
 * Mount it once in layout.tsx. Uses GSAP to animate a full-screen
 * overlay that slides away on load, revealing content beneath.
 */
export default function PageTransition({ children }: { children?: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain || prefersReduced) return;

    // Slide the curtain off to the right
    const ctx = gsap.context(() => {
      gsap.fromTo(
        curtain,
        { scaleX: 1, transformOrigin: 'left center' },
        {
          scaleX: 0,
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.05,
          onComplete: () => {
            curtain.style.display = 'none';
          },
        }
      );
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <>
      {/* Crimson curtain overlay */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#AC033B',
          transformOrigin: 'left center',
          pointerEvents: 'none',
        }}
      />
      {children}
    </>
  );
}
