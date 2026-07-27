'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CR = '#AC033B';

export default function OriginStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);

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

      // Year reveals via clip-path
      tl.fromTo(yearRef.current,
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
      id="origin"
      style={{ background: '#F8F6F1', padding: 'clamp(60px,10vw,120px) 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Section number */}
      <div style={{ position: 'absolute', left: 'clamp(16px,3vw,40px)', top: 'clamp(60px,10vw,120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(17,17,17,0.28)', letterSpacing: '0.14em', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>02</span>
        <div style={{ width: 1, height: 56, background: 'rgba(17,17,17,0.15)' }} />
      </div>

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(64px,8vw,140px)' }}>

        {/* Large background year — decorative */}
        <div style={{ overflow: 'hidden', marginBottom: -16, userSelect: 'none' }}>
          <div
            ref={yearRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(80px,14vw,200px)',
              fontWeight: 800,
              color: 'transparent',
              WebkitTextStroke: `1px rgba(172,3,59,0.18)`,
              lineHeight: 1,
              letterSpacing: '-0.05em',
              clipPath: 'inset(100% 0 0 0)',
            }}
          >
            1975
          </div>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }}
          className="origin-grid"
        >
          <style>{`
            @media (max-width: 767px) {
              .origin-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left — text block */}
          <div ref={textRef} style={{ opacity: 0 }}>
            {/* Red year badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: CR }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>Origin</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 800, color: '#111', marginBottom: 16, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              It All<br />Began
            </h2>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.1vw,16px)', color: '#6D6962', lineHeight: 1.8, maxWidth: 260, marginBottom: 32 }}>
              Founded in 1975, LV Spices grew from a small family-run operation into India&apos;s trusted spice manufacturer, supplier &amp; exporter — serving bulk buyers, OEM clients, and private label brands across 40+ countries.
            </p>

            {/* Watch Journey pill */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'none',
                border: `1.5px solid rgba(172,3,59,0.35)`,
                borderRadius: 40,
                padding: '10px 20px 10px 14px',
                cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = CR; (e.currentTarget as HTMLElement).style.background = 'rgba(172,3,59,0.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(172,3,59,0.35)'; (e.currentTarget as HTMLElement).style.background = 'none'; }}
              aria-label="Watch journey video"
            >
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: CR, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                  <path d="M1 1L8 5.5L1 10V1Z" fill="white" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.1em', color: CR, fontWeight: 600, textTransform: 'uppercase' }}>Watch Journey</span>
            </button>
          </div>

          {/* Right — cinematic image */}
          <div
            ref={imgWrapRef}
            style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 2, overflow: 'hidden', clipPath: 'inset(0 42% 0 42%)' }}
          >
            <div ref={imgInnerRef} style={{ position: 'absolute', inset: 0 }}>
              <Image
                src="/images/story_1975.png"
                alt="Elderly Indian man grinding spices by hand in 1975"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width:768px) 100vw, 66vw"
              />
            </div>

            {/* Gradient overlay for depth */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(248,246,241,0.15) 0%, transparent 25%, transparent 75%, rgba(17,17,17,0.2) 100%)' }} />

            {/* Caption overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 20px', background: 'linear-gradient(to top, rgba(17,17,17,0.65) 0%, transparent 100%)' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>
                From a home kitchen to India&apos;s trusted spice exporter.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
