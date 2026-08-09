'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { benefits } from '@/data/benefits';

const CR = '#111111';

// Premium SVG icons
const ICONS: Record<string, React.ReactNode> = {
  farm: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
      <path d="M9 22V12h6v10"/>
    </svg>
  ),
  lab: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M9 3h6m-3 0v7l4.5 7.5A2 2 0 0114.8 21H9.2a2 2 0 01-1.7-3L12 10V3"/>
    </svg>
  ),
  globe: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
    </svg>
  ),
  cryo: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 2v20M17 7l-5 5-5-5M17 17l-5-5-5 5M2 12h20M7 7l5 5 5-5M7 17l5-5 5 5"/>
    </svg>
  ),
  steam: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 2c0 0-2 2.5-2 5s2 5 2 5-2 2.5-2 5 2 5 2 5"/>
      <path d="M18 4c0 0-2 2-2 4s2 4 2 4"/>
      <path d="M6 4c0 0-2 2-2 4s2 4 2 4"/>
    </svg>
  ),
  label: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
      <circle cx="7" cy="7" r="1.5"/>
    </svg>
  ),
  brc: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  trace: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M9 17l-4-4 4-4M15 7l4 4-4 4"/>
      <path d="M12 3v18"/>
    </svg>
  ),
};

export default function BenefitsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { clipPath: 'inset(0 0 100% 0)', y: 16 },
        {
          clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.75,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        }
      );

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.55, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
            delay: Math.floor(i / 2) * 0.07 + (i % 2) * 0.04,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="benefits" style={{ background: '#111', padding: 'clamp(60px,10vw,120px) 0', position: 'relative' }}>

      {/* Section number */}
      <div style={{ position: 'absolute', left: 'clamp(16px,3vw,40px)', top: 'clamp(60px,10vw,120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.14em', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>07</span>
        <div style={{ width: 1, height: 56, background: 'rgba(255,255,255,0.1)' }} />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(64px,8vw,140px)' }}>

        {/* Header */}
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(40px,6vw,72px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div ref={headRef} style={{ clipPath: 'inset(0 0 100% 0)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 24, height: 1, background: CR }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>Our Edge</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 800, color: '#F8F6F1', lineHeight: 1.03, letterSpacing: '-0.04em' }}>
              What Sets<br />Us Apart
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.1vw,16px)', color: 'rgba(248,246,241,0.45)', lineHeight: 1.75, maxWidth: 300 }}>
            Why global importers, OEM manufacturers, and private label brands trust LV Spices as their certified spice manufacturer &amp; exporter from India.
          </p>
        </div>

        {/* Premium grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}
          className="benefits-grid"
        >
          <style>{`
            @media (max-width: 900px) { .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 480px) { .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          `}</style>

          {benefits.map((b, i) => (
            <div
              key={b.label}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="benefit-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                padding: 'clamp(22px,2.5vw,36px) clamp(18px,2vw,28px)',
                borderRight: i % 4 !== 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                cursor: 'default',
                transition: 'background 0.25s',
                opacity: 0,
                position: 'relative',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(255,255,255,0.04)';
                const icon = el.querySelector('.b-icon') as HTMLElement;
                if (icon) { icon.style.transform = 'rotate(5deg) scale(1.1)'; icon.style.color = CR; }
                const line = el.querySelector('.b-line') as HTMLElement;
                if (line) line.style.width = '40px';
                const num = el.querySelector('.b-num') as HTMLElement;
                if (num) num.style.color = CR;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'transparent';
                const icon = el.querySelector('.b-icon') as HTMLElement;
                if (icon) { icon.style.transform = 'rotate(0) scale(1)'; icon.style.color = 'rgba(248,246,241,0.5)'; }
                const line = el.querySelector('.b-line') as HTMLElement;
                if (line) line.style.width = '20px';
                const num = el.querySelector('.b-num') as HTMLElement;
                if (num) num.style.color = 'rgba(255,255,255,0.15)';
              }}
            >
              {/* Top row: number + icon */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="b-num" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.16em', transition: 'color 0.25s' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="b-icon" style={{ color: 'rgba(248,246,241,0.5)', transition: 'transform 0.3s, color 0.3s' }}>
                  {ICONS[b.icon]}
                </div>
              </div>

              {/* Red line */}
              <div className="b-line" style={{ width: 20, height: 1.5, background: CR, transition: 'width 0.3s', borderRadius: 1 }} />

              {/* Label */}
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,1.5vw,22px)', fontWeight: 700, color: '#F8F6F1', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                {b.label}
              </div>

              {/* Detail */}
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(11px,0.9vw,13px)', color: 'rgba(248,246,241,0.4)', lineHeight: 1.6 }}>
                {b.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
