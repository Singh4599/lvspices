'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CR = '#111111';

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const bowlRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const yearLabelRef = useRef<HTMLDivElement>(null);
  const sectionNumRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      if (counterRef.current) counterRef.current.textContent = '50';
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

      // Tag line
      tl.fromTo(tagRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0
      );

      // Headline line 1
      tl.fromTo(line1Ref.current,
        { clipPath: 'inset(0 0 100% 0)', y: 12 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.75 }, 0.15
      );

      // Headline line 2 (red italic)
      tl.fromTo(line2Ref.current,
        { clipPath: 'inset(0 0 100% 0)', y: 12 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.75 }, 0.28
      );

      // Supporting copy
      tl.fromTo(subRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 0.5
      );

      // Section number
      tl.fromTo(sectionNumRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }, 0.4
      );

      // Bowl scales in
      tl.fromTo(bowlRef.current,
        { scale: 1.07, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out' }, 0.08
      );

      // 50 counter
      tl.fromTo({ val: 0 }, { val: 50 }, {
        val: 50,
        duration: 1.3,
        ease: 'power2.out',
        onUpdate: function () {
          if (counterRef.current) counterRef.current.textContent = String(Math.round(this.targets()[0].val));
        },
      }, 0.35);

      // Year label
      tl.fromTo(yearLabelRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 0.75
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
          if (tagRef.current) gsap.set(tagRef.current, { y: -p * 30, opacity: 1 - p * 3 });
          if (bowlRef.current) gsap.set(bowlRef.current, { scale: 1 + p * 0.06, x: p * -24 });
          if (yearLabelRef.current) gsap.set(yearLabelRef.current, { y: -p * 50, opacity: 1 - p * 2 });
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
        background: '#F8F6F1',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        /* Room for the global floating navbar at top */
        paddingTop: 'clamp(90px,10vw,120px)',
      }}
    >
      {/* ── Section number spine ── */}
      <div ref={sectionNumRef} style={{ position: 'absolute', left: 'clamp(16px,3vw,40px)', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 0 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(17,17,17,0.28)', letterSpacing: '0.14em', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>01</span>
        <div style={{ width: 1, height: 56, background: CR, opacity: 0.5 }} />
      </div>

      {/* ── Main content grid ── */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          padding: '0 clamp(64px,8vw,140px) clamp(60px,8vw,100px)',
          gap: 'clamp(32px,5vw,80px)',
          maxWidth: 1440,
          margin: '0 auto',
          width: '100%',
        }}
        className="hero-grid"
      >
        <style>{`
          @media (max-width: 767px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              padding: 0 24px clamp(60px,12vw,100px) !important;
              gap: 32px !important;
            }
          }
        `}</style>

        {/* ── Left — Text ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Tag pill */}
          <div ref={tagRef} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, opacity: 0 }}>
            <div style={{ width: 24, height: 1, background: CR }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>Our Story</span>
          </div>

          {/* Headline 1 */}
          <div style={{ overflow: 'hidden', marginBottom: 2 }}>
            <div
              ref={line1Ref}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 6.5vw, 96px)',
                fontWeight: 800,
                color: '#111',
                lineHeight: 1.02,
                letterSpacing: '-0.04em',
                clipPath: 'inset(0 0 100% 0)',
              }}
            >
              Our Story,
            </div>
          </div>

          {/* Headline 2 red italic */}
          <div style={{ overflow: 'hidden', marginBottom: 28 }}>
            <div
              ref={line2Ref}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 6vw, 90px)',
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
              fontSize: 'clamp(14px, 1.15vw, 17px)',
              color: '#6D6962',
              lineHeight: 1.75,
              maxWidth: 340,
              opacity: 0,
              marginBottom: 40,
            }}
          >
            Five decades of dedication,<br />from our roots to the world.
          </p>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: 'clamp(24px,3vw,48px)', flexWrap: 'wrap' }}>
            {[
              { value: '50+', label: 'Years' },
              { value: '40+', label: 'Countries' },
              { value: '500+', label: 'Products' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', color: '#6D6962', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Spice bowl ── */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Background decorative circle */}
          <div style={{ position: 'absolute', width: '80%', aspectRatio: '1/1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(17,17,17,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Bowl image */}
          <div
            ref={bowlRef}
            style={{ position: 'relative', width: '100%', maxWidth: 560, aspectRatio: '1/1', opacity: 0 }}
          >
            <Image
              src="/images/hero-bowl.png"
              alt="Premium wooden bowl with red chillies, turmeric, black pepper, coriander and whole spices"
              fill
              priority
              style={{ objectFit: 'contain' }}
              sizes="(max-width:768px) 90vw, 50vw"
            />
          </div>

          {/* 50 Years badge */}
          <div
            ref={yearLabelRef}
            style={{
              position: 'absolute',
              bottom: '2%',
              right: 0,
              textAlign: 'right',
              opacity: 0,
              padding: '16px 20px',
              borderLeft: `2px solid ${CR}`,
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,5.5vw,78px)', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.06em' }}>
              <span ref={counterRef}>0</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: '#6D6962', textTransform: 'uppercase', marginTop: 4 }}>Years of Excellence</div>
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
        <style>{`
          @keyframes scrollDrop {
            0%   { height: 0%; opacity: 1; }
            80%  { height: 100%; opacity: 1; }
            100% { height: 100%; opacity: 0; }
          }
        `}</style>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', color: '#6D6962', textTransform: 'uppercase' }}>Scroll to explore</span>
      </div>
    </section>
  );
}
