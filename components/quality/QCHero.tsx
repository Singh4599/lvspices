'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import Image from 'next/image';

const CR = '#AC033B';

const STATS = [
  { val: '169',     label: 'Pesticide Residues Tested' },
  { val: 'ISO 17025', label: 'NABL Accredited' },
  { val: 'BRC Tier 2', label: 'Certified' },
];

export default function QCHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });

      tl.fromTo('.qc-reveal',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 }
      );

      tl.fromTo(imgRef.current,
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out' },
        0.1
      );

      // Scroll parallax exit
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (contentRef.current) gsap.set(contentRef.current, { y: -p * 90, opacity: 1 - p * 1.5 });
          if (imgRef.current)     gsap.set(imgRef.current,     { y: p * 45, scale: 1 + p * 0.06, opacity: 1 - p * 1.4 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="qc-hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: '#fff',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(96px,11vw,148px) clamp(24px,5vw,80px) clamp(60px,7vw,100px)',
      }}
    >
      {/* Background Engineering Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Subtle crimson glow bottom-right */}
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '45%', aspectRatio: '1/1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(172,3,59,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Right image */}
      <div
        ref={imgRef}
        style={{
          position: 'absolute',
          right: 'clamp(24px,5vw,80px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(280px,38vw,580px)',
          aspectRatio: '4/5',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.1)',
          opacity: 0,
        }}
        className="qc-hero-img"
      >
        <style>{`
          @media (max-width: 767px) {
            .qc-hero-img {
              display: none !important;
            }
          }
        `}</style>
        <Image src="/images/lab.png" alt="LV Spices QC Laboratory" fill style={{ objectFit: 'cover' }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(255,255,255,0.15), transparent)', pointerEvents: 'none' }} />
      </div>

      {/* Left content */}
      <div ref={contentRef} style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>

          {/* Badge */}
          <div className="qc-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 28, padding: '8px 18px', background: 'rgba(172,3,59,0.05)', border: '1px solid rgba(172,3,59,0.15)', borderRadius: 999 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: CR, boxShadow: `0 0 10px ${CR}` }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: CR, fontWeight: 700 }}>NABL Accredited · Grade A</span>
          </div>

          {/* H1 */}
          <h1 className="qc-reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px,6.5vw,96px)', fontWeight: 800, color: '#111', lineHeight: 1.02, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
            Quality Control<br />
            <span style={{ color: CR, fontStyle: 'italic' }}>&amp; Training.</span>
          </h1>

          {/* Sub */}
          <p className="qc-reveal" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.15vw,18px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, maxWidth: 480, margin: '0 0 52px' }}>
            Our QC team works collectively with Quality Assurance, Hygiene and Food Safety teams — ensuring every product meets the highest global standards before it leaves our facility.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 'clamp(20px,4vw,60px)', flexWrap: 'wrap' }}>
            {STATS.map((s, i) => (
              <div key={i} className="qc-reveal">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.5vw,34px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="qc-reveal" style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 1, background: CR }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase' }}>Explore our lab</span>
          </div>
        </div>
      </div>
    </section>
  );
}
