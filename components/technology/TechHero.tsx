'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import Image from 'next/image';

const CR = '#AC033B';

export default function TechHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

      tl.fromTo('.stagger-reveal',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
      );

      // Scroll exit parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (contentRef.current) gsap.set(contentRef.current, { y: -p * 100, opacity: 1 - p * 1.5 });
          if (orbitsRef.current) gsap.set(orbitsRef.current, { y: p * 50, scale: 1 + p * 0.1, opacity: 1 - p * 1.5 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: '#fff',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
      }}
    >
      {/* Background Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundPosition: 'center center',
        pointerEvents: 'none',
      }} />

      {/* Hero Image */}
      <div 
        ref={orbitsRef} 
        style={{ 
          position: 'absolute', 
          right: '5vw', 
          top: '50%', 
          transform: 'translateY(-50%)',
          width: 'clamp(300px, 40vw, 600px)',
          aspectRatio: '4/5',
          pointerEvents: 'none',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.1)'
        }}
      >
        <Image src="/images/fac_hero.png" alt="LV Spices Facility" fill style={{ objectFit: 'cover' }} />
        {/* Subtle Gradient Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)', pointerEvents: 'none' }} />
      </div>

      {/* Content Grid */}
      <div ref={contentRef} style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', width: '100%', display: 'flex' }}>
        <div style={{ maxWidth: 700 }}>
          <div className="stagger-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24, padding: '8px 16px', background: 'rgba(172,3,59,0.05)', border: '1px solid rgba(172,3,59,0.15)', borderRadius: 999 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: CR, boxShadow: `0 0 10px ${CR}` }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: CR, fontWeight: 700 }}>System Active</span>
          </div>

          <h1 className="stagger-reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,7vw,100px)', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
            Precision<br />
            <span style={{ color: CR, fontStyle: 'italic' }}>Technology.</span>
          </h1>

          <p className="stagger-reveal" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.2vw,18px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, maxWidth: 500, margin: '0 0 48px' }}>
            LV Spices was among the first Indian exporters to adopt fully automated seed cleaning and cryogenic grinding. Innovation is in our DNA.
          </p>

          <div style={{ display: 'flex', gap: 'clamp(24px,4vw,60px)', flexWrap: 'wrap' }}>
            {[
              { val: '7+', label: 'Plants' },
              { val: '80k mts', label: 'Annual Capacity' },
              { val: '100k sqft', label: 'Built-up Area' },
            ].map((stat, i) => (
              <div key={i} className="stagger-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,40px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {stat.val}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
