'use client';

import { useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false),
    });

    tl.to('.loader-line', {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
    })
      .to(
        '.loader-text',
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to('.loader-container', {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        delay: 0.3,
      })
      .set('.loader-container', { display: 'none' });

    return () => {
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loader-container fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black">
      {/* Animated line */}
      <div className="relative w-48 h-[1px] bg-black/10 mb-8">
        <div
          className="loader-line absolute top-0 left-0 h-full bg-[#AC033B]"
          style={{ width: '0%' }}
        />
      </div>

      {/* Brand text */}
      <div
        className="loader-text font-mono text-[11px] tracking-[0.3em] uppercase text-white/60"
        style={{ opacity: 0, transform: 'translateY(10px)' }}
      >
        LV Spices
      </div>
    </div>
  );
}
