'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import WorldGlobe from '@/components/globe/WorldGlobe';

const CR = '#111111';

const EXPORT_REGIONS = [
  { flag: '🇬🇧', name: 'UK' },
  { flag: '🇺🇸', name: 'USA' },
  { flag: '🇦🇪', name: 'UAE' },
  { flag: '🇩🇪', name: 'Germany' },
  { flag: '🇦🇺', name: 'Australia' },
  { flag: '🇯🇵', name: 'Japan' },
  { flag: '🇸🇬', name: 'Singapore' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇧🇷', name: 'Brazil' },
  { flag: '🇳🇱', name: 'Netherlands' },
];

export default function GlobalReach() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const flagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      if (counterRef.current) counterRef.current.textContent = '40';
      return;
    }

    const ctx = gsap.context(() => {
      // Text slides in
      gsap.fromTo(textRef.current,
        { x: -36, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );

      // Globe fades in with scale
      gsap.fromTo(globeRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );

      // Flags stagger in
      gsap.fromTo(flagsRef.current ? Array.from(flagsRef.current.children) : [],
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );

      // Counter
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 68%',
        once: true,
        onEnter: () => {
          gsap.fromTo({ val: 0 }, { val: 40 }, {
            val: 40, duration: 1.6, ease: 'power2.out',
            onUpdate: function () {
              if (counterRef.current) counterRef.current.textContent = String(Math.round(this.targets()[0].val));
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="global" style={{ background: '#F8F6F1', padding: 'clamp(60px,10vw,120px) 0', position: 'relative', overflow: 'hidden' }}>

      {/* Section number */}
      <div style={{ position: 'absolute', left: 'clamp(16px,3vw,40px)', top: 'clamp(60px,10vw,120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 2 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(17,17,17,0.28)', letterSpacing: '0.14em', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>06</span>
        <div style={{ width: 1, height: 56, background: 'rgba(17,17,17,0.12)' }} />
      </div>

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(64px,8vw,140px)' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }}
          className="global-grid">
          <style>{`
            @media (max-width: 900px) {
              .global-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left — text */}
          <div ref={textRef} style={{ opacity: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: CR }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>Worldwide</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 800, color: '#111', lineHeight: 1.03, letterSpacing: '-0.04em', marginBottom: 20 }}>
              Trusted<br />Worldwide
            </h2>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.1vw,16px)', color: '#6D6962', lineHeight: 1.8, marginBottom: 12 }}>
              From India to{' '}
              <strong style={{ color: '#111', fontFamily: 'var(--font-display)', fontSize: '1.15em' }}>
                <span ref={counterRef}>0</span>+ countries
              </strong>
              ,<br />LV Spices is a symbol of quality and trust.
            </p>

            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,1.3vw,18px)', fontStyle: 'italic', color: CR, marginBottom: 36 }}>
              Spices Beyond Borders.
            </p>

            {/* Flag grid */}
            <div ref={flagsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 10px' }}>
              {EXPORT_REGIONS.map((r) => (
                <div key={r.name} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '5px 12px', borderRadius: 40,
                  border: '1px solid rgba(17,17,17,0.1)',
                  background: '#fff',
                  fontFamily: 'var(--font-sans)', fontSize: 12, color: '#6D6962',
                }}>
                  <span style={{ fontSize: 14 }}>{r.flag}</span>
                  {r.name}
                </div>
              ))}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 40,
                border: `1px solid ${CR}`,
                background: 'rgba(17,17,17,0.04)',
                fontFamily: 'var(--font-mono)', fontSize: 10, color: CR, fontWeight: 700, letterSpacing: '0.1em',
              }}>
                +30 MORE
              </div>
            </div>
          </div>

          {/* Right — 3D Globe */}
          <div ref={globeRef} style={{ opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 480, aspectRatio: '1/1', position: 'relative' }}>
              <WorldGlobe />
              {/* Subtle glow under globe */}
              <div style={{ position: 'absolute', bottom: -20, left: '10%', right: '10%', height: 60, background: 'radial-gradient(ellipse, rgba(17,17,17,0.12) 0%, transparent 70%)', filter: 'blur(16px)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
