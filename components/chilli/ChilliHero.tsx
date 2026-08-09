'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CR = '#111111'; // Matching the bright red from the screenshot

export default function ChilliHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const bowlRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

      // Headline line 1
      tl.fromTo(line1Ref.current,
        { clipPath: 'inset(0 0 100% 0)', y: 12 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.75 }, 0.15
      );

      // Headline line 2
      tl.fromTo(line2Ref.current,
        { clipPath: 'inset(0 0 100% 0)', y: 12 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.75 }, 0.28
      );

      // Supporting copy
      tl.fromTo(subRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.5
      );

      // Image scales in
      tl.fromTo(bowlRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out' }, 0.08
      );

      // Scroll hint
      tl.fromTo(scrollHintRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.95
      );

      // ── Scroll exit transition ────────────────────────────────────
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=80%',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          if (line1Ref.current) gsap.set(line1Ref.current, { y: -p * 70, opacity: 1 - p * 1.5 });
          if (line2Ref.current) gsap.set(line2Ref.current, { y: -p * 50, opacity: 1 - p * 1.3 });
          if (subRef.current) gsap.set(subRef.current, { y: -p * 35, opacity: 1 - p * 2.2 });
          if (bowlRef.current) gsap.set(bowlRef.current, { scale: 1 + p * 0.06, x: p * -24 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100svh',
        background: '#fff',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'clamp(90px,10vw,120px)',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          padding: '0 clamp(40px,5vw,100px) clamp(60px,8vw,100px)',
          gap: 'clamp(32px,5vw,80px)',
          maxWidth: 1440,
          margin: '0 auto',
          width: '100%',
        }}
        className="hero-grid"
      >
        <style>{`
          @media (max-width: 900px) {
            .hero-grid {
              display: flex !important;
              flex-direction: column;
              padding: 0 24px clamp(60px,12vw,100px) !important;
              gap: 20px !important;
            }
            .hero-left {
              display: contents !important;
            }
            .hero-heading { order: 1; }
            .hero-sub { order: 2; margin-bottom: 20px !important; }
            .hero-right { order: 3; width: 100%; margin-bottom: 24px; }
            .hero-stats { order: 4; }
          }
        `}</style>

        {/* ── Left — Text ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative', zIndex: 2 }} className="hero-left">

          {/* Headline 1 */}
          <div style={{ overflow: 'hidden', marginBottom: 2 }} className="hero-heading">
            <div
              ref={line1Ref}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(42px, 5vw, 86px)',
                fontWeight: 800,
                color: '#111',
                lineHeight: 1.02,
                letterSpacing: '-0.04em',
                clipPath: 'inset(0 0 100% 0)',
              }}
            >
              Chilli Products,
            </div>
          </div>

          {/* Headline 2 */}
          <div style={{ overflow: 'hidden', marginBottom: 28 }} className="hero-heading">
            <div
              ref={line2Ref}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 4.8vw, 80px)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: CR,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                clipPath: 'inset(0 0 100% 0)',
              }}
            >
              Spiced With Passion.
            </div>
          </div>

          {/* Sub copy */}
          <p
            ref={subRef}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px, 1.15vw, 16px)',
              color: 'rgba(0,0,0,0.55)',
              lineHeight: 1.75,
              maxWidth: 400,
              opacity: 0,
              marginBottom: 40,
            }}
            className="hero-sub"
          >
            We boast of more than 50 Products in different form of chillies. From Raw to Stemless to Crushed to Ground, for both domestic and international market.
          </p>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: 'clamp(24px,3vw,48px)', flexWrap: 'wrap' }} className="hero-stats">
            {[
              { value: '50+', label: 'Varieties' },
              { value: 'Whole', label: 'to Ground' },
              { value: 'IPM', label: 'Certified' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: '#6D6962', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Image ── */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hero-right">
          {/* Background decorative blob */}
          <div style={{ position: 'absolute', width: '90%', aspectRatio: '1/1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(17,17,17,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          
          <div
            ref={bowlRef}
            style={{ position: 'relative', width: '100%', maxWidth: 640, aspectRatio: '4/3', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', opacity: 0 }}
          >
            <Image
              src="/images/chilli-hero-new.png"
              alt="Chilli Products"
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width:900px) 90vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        ref={scrollHintRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(20px,3vw,36px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: 0,
        }}
      >
        <div style={{ width: 1, height: 40, background: 'rgba(17,17,17,0.2)' }}>
          <div style={{ width: 1, height: '40%', background: CR, animation: 'scrollDrop 1.6s ease-in-out infinite' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', color: '#6D6962', textTransform: 'uppercase' }}>Scroll to explore</span>
      </div>
    </section>
  );
}
