'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CR = '#111111';

export default function FarmToFactory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Text slides in from left
      gsap.fromTo(textRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', end: 'top 40%', scrub: 0.6 },
        }
      );

      // Image reveals L→R
      gsap.fromTo(imgWrapRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', end: 'top 18%', scrub: 0.7 },
        }
      );

      // Inner scale
      gsap.fromTo(imgInnerRef.current,
        { scale: 1.07 },
        {
          scale: 1, duration: 1.3, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', end: 'top 18%', scrub: 0.7 },
        }
      );

      // SVG route draws
      if (routeRef.current) {
        const len = routeRef.current.getTotalLength();
        gsap.set(routeRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(routeRef.current, {
          strokeDashoffset: 0, duration: 1.2, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', end: 'top 25%', scrub: 0.7 },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="farm" style={{ background: '#F8F6F1', overflow: 'hidden', position: 'relative' }}>

      {/* Section number */}
      <div style={{ position: 'absolute', left: 'clamp(16px,3vw,40px)', top: 'clamp(60px,10vw,120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 2 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(17,17,17,0.28)', letterSpacing: '0.14em', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>04</span>
        <div style={{ width: 1, height: 56, background: 'rgba(17,17,17,0.12)' }} />
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', minHeight: 'clamp(440px,55vw,680px)', alignItems: 'stretch' }}
        className="farm-grid"
      >
        <style>{`
          @media (max-width: 767px) {
            .farm-grid { grid-template-columns: 1fr !important; min-height: auto !important; }
          }
        `}</style>

        {/* Left — text */}
        <div
          ref={textRef}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(48px,6vw,80px) clamp(64px,7vw,100px)', opacity: 0 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: CR }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>Farm to Table</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,56px)', fontWeight: 800, color: '#111', lineHeight: 1.03, letterSpacing: '-0.04em', marginBottom: 20 }}>
            From The Farms<br />To Your Table
          </h2>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.1vw,16px)', color: '#6D6962', lineHeight: 1.8, maxWidth: 280, marginBottom: 36 }}>
            Direct sourcing. Careful processing.<br />Consistent quality.
          </p>

          {/* Route illustration */}
          <svg width="210" height="60" viewBox="0 0 210 60" fill="none" style={{ overflow: 'visible', marginBottom: 24 }}>
            <path
              ref={routeRef}
              d="M12,48 C50,48 70,12 105,12 C140,12 160,48 198,48"
              stroke={CR}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="12" cy="48" r="5" fill={CR} />
            <circle cx="198" cy="48" r="5" fill={CR} />
            <text x="2" y="60" style={{ fontFamily: 'monospace', fontSize: 9, fill: '#6D6962', letterSpacing: 1 }}>FARM</text>
            <text x="172" y="60" style={{ fontFamily: 'monospace', fontSize: 9, fill: '#6D6962', letterSpacing: 1 }}>FACTORY</text>
          </svg>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: CR, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C8 1 2 5.5 2 9.5C2 12.6 4.686 15 8 15C11.314 15 14 12.6 14 9.5C14 5.5 8 1 8 1Z" fill="white"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#6D6962', letterSpacing: '0.02em' }}>Pure. Natural. Honest.</span>
          </div>
        </div>

        {/* Right — farm image */}
        <div ref={imgWrapRef} style={{ position: 'relative', overflow: 'hidden', clipPath: 'inset(0 100% 0 0)', minHeight: 'clamp(280px,40vw,500px)' }}>
          <div ref={imgInnerRef} style={{ position: 'absolute', inset: 0 }}>
            <Image
              src="/images/spice_farm.png"
              alt="Indian spice farm at golden hour with farmers harvesting red chillies"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width:768px) 100vw, 65vw"
            />
          </div>
          {/* Gradient blends into left panel */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(248,246,241,0.25) 0%, transparent 18%)' }} />
        </div>
      </div>
    </section>
  );
}
