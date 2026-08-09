'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

const CR = '#111111';

export default function CareerMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 15%',
          scrub: 0.7,
        },
      });

      // Background text reveals via clip-path
      tl.fromTo(bigTextRef.current,
        { clipPath: 'inset(100% 0 0 0)', y: 24 },
        { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1 }, 0
      );

      // Image expands from narrow strip → full frame
      tl.fromTo(imgWrapRef.current,
        { clipPath: 'inset(0 42% 0 42%)' },
        { clipPath: 'inset(0 0% 0 0%)', duration: 1.3, ease: 'power2.out' }, 0
      );

      // Inner image subtle scale
      tl.fromTo(imgInnerRef.current,
        { scale: 1.06 },
        { scale: 1, duration: 1.3, ease: 'power2.out' }, 0
      );

      // Text block fades after image
      tl.fromTo(textRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.55
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: '#F8F6F1', padding: 'clamp(60px,10vw,120px) 0', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(64px,8vw,140px)' }}>

        {/* Large background decorative text */}
        <div style={{ overflow: 'hidden', marginBottom: -16, userSelect: 'none' }}>
          <div
            ref={bigTextRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(80px,12vw,180px)',
              fontWeight: 800,
              color: 'transparent',
              WebkitTextStroke: `1px rgba(17,17,17,0.18)`,
              lineHeight: 1,
              letterSpacing: '-0.05em',
              clipPath: 'inset(100% 0 0 0)',
              whiteSpace: 'nowrap'
            }}
          >
            PURPOSE
          </div>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }}
          className="mission-grid"
        >
          <style>{`
            @media (max-width: 767px) {
              .mission-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left — text block */}
          <div ref={textRef} style={{ opacity: 0 }}>
            {/* Tag badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: CR }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>Why Join Us</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 800, color: '#111', marginBottom: 16, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              More Than<br />A Job.
            </h2>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.1vw,16px)', color: '#6D6962', lineHeight: 1.8, maxWidth: 260 }}>
              A relentless mission to deliver absolute purity to the world.
            </p>
          </div>

          {/* Right — cinematic image */}
          <div
            ref={imgWrapRef}
            style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 2, overflow: 'hidden', clipPath: 'inset(0 42% 0 42%)' }}
          >
            <div ref={imgInnerRef} style={{ position: 'absolute', inset: 0 }}>
              <Image
                src="/images/farm.png"
                alt="Working at LV Spices"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width:768px) 100vw, 66vw"
              />
            </div>

            {/* Gradient overlay for depth */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(248,246,241,0.15) 0%, transparent 25%, transparent 75%, rgba(17,17,17,0.2) 100%)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
