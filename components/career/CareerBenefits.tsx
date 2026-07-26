'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const CR = '#AC033B';

const perks = [
  { icon: '🌱', title: 'Career Growth', desc: 'Rapid career progression with structured mentorship from industry leaders and clear promotion pathways.' },
  { icon: '🌍', title: 'Global Exposure', desc: 'Work directly with buyers, partners, and clients across 40+ countries. International travel opportunities available.' },
  { icon: '🏆', title: 'Excellence Culture', desc: 'A quality-first environment that rewards precision, innovation, and the relentless pursuit of improvement.' },
  { icon: '🔬', title: 'Innovation-Led', desc: 'Join R&D, QA, and tech teams pushing the boundaries of what Indian spice exports can achieve globally.' },
  { icon: '🤝', title: 'Collaborative Team', desc: 'Work alongside 500+ passionate professionals in a culture of mutual respect, inclusion, and shared ambition.' },
  { icon: '💰', title: 'Competitive Pay', desc: 'Industry-leading compensation packages, performance bonuses, health insurance, and ESOP for senior roles.' },
];

export default function CareerBenefits() {
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
            delay: Math.floor(i / 3) * 0.07 + (i % 3) * 0.04,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#111', padding: 'clamp(60px,10vw,120px) 0', position: 'relative' }}>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(64px,8vw,140px)' }}>

        {/* Header */}
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(40px,6vw,72px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div ref={headRef} style={{ clipPath: 'inset(0 0 100% 0)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 24, height: 1, background: CR }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>The Perks</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 800, color: '#F8F6F1', lineHeight: 1.03, letterSpacing: '-0.04em' }}>
              Why Choose<br />LV Spices
            </h2>
          </div>
        </div>

        {/* Premium grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}
          className="perks-grid"
        >
          <style>{`
            @media (max-width: 900px) { .perks-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 480px) { .perks-grid { grid-template-columns: 1fr !important; } }
          `}</style>

          {perks.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                padding: 'clamp(22px,2.5vw,36px) clamp(18px,2vw,28px)',
                borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                cursor: 'default',
                transition: 'background 0.25s',
                opacity: 0,
                position: 'relative',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(255,255,255,0.04)';
                const icon = el.querySelector('.p-icon') as HTMLElement;
                if (icon) { icon.style.transform = 'scale(1.1)'; }
                const line = el.querySelector('.p-line') as HTMLElement;
                if (line) line.style.width = '40px';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'transparent';
                const icon = el.querySelector('.p-icon') as HTMLElement;
                if (icon) { icon.style.transform = 'scale(1)'; }
                const line = el.querySelector('.p-line') as HTMLElement;
                if (line) line.style.width = '20px';
              }}
            >
              {/* Icon */}
              <div className="p-icon" style={{ fontSize: 28, transition: 'transform 0.3s' }}>
                {p.icon}
              </div>

              {/* Red line */}
              <div className="p-line" style={{ width: 20, height: 1.5, background: CR, transition: 'width 0.3s', borderRadius: 1 }} />

              {/* Label */}
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(16px,1.5vw,22px)', fontWeight: 700, color: '#F8F6F1', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                {p.title}
              </div>

              {/* Detail */}
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,1vw,14px)', color: 'rgba(248,246,241,0.4)', lineHeight: 1.6 }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
