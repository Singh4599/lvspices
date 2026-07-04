'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useBreakpoint } from '@/hooks/useMediaQuery';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Add custom cursor class to html
    document.documentElement.classList.add('custom-cursor-active');

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power2.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power2.out' });
    const rxTo = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
    const ryTo = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(e.clientX);
      ryTo(e.clientY);
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMove);

    // Track hover on interactive elements
    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    // MutationObserver for dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      newInteractives.forEach((el) => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.classList.remove('custom-cursor-active');
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[999] pointer-events-none mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#FFFFFF',
          transform: 'translate(-50%, -50%)',
          transition: isHovering ? 'width 0.3s, height 0.3s' : undefined,
          ...(isHovering && { width: 12, height: 12 }),
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[998] pointer-events-none"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: '50%',
          border: '1.5px solid #AC033B',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1), height 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s',
          opacity: isHovering ? 0.6 : 0.4,
        }}
      />
    </>
  );
}
