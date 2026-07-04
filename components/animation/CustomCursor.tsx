'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 });
    };

    // Ring follows with lag
    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX - 20, y: ringY - 20 });
    };
    gsap.ticker.add(tick);

    // Hover expand on interactive elements
    const expand = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const shrink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    document.addEventListener('mousemove', onMove);

    const targets = document.querySelectorAll('a, button, [data-cursor="expand"]');
    targets.forEach(el => {
      el.addEventListener('mouseenter', expand);
      el.addEventListener('mouseleave', shrink);
    });

    // Also watch for dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a:not([data-cursor-bound]), button:not([data-cursor-bound])').forEach(el => {
        el.setAttribute('data-cursor-bound', '1');
        el.addEventListener('mouseenter', expand);
        el.addEventListener('mouseleave', shrink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#AC033B',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'screen',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(172,3,59,0.6)',
          pointerEvents: 'none',
          zIndex: 99998,
          backdropFilter: 'none',
        }}
      />
    </>
  );
}
