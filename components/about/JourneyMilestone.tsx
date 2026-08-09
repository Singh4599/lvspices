'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import type { Milestone } from '@/data/journey';

const CR = '#111111';

interface Props {
  milestone: Milestone;
  index: number;
}

export default function JourneyMilestone({ milestone, index }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isEven = index % 2 === 0;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Use gsap.context scoped to wrapperRef.
    // This allows us to select by class (.gsap-year, etc.) and animate
    // both desktop and mobile DOM nodes simultaneously, so the effect 
    // works on whichever layout is currently visible via CSS display.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 0.65,
        },
      });

      tl.fromTo('.gsap-year',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0
      );
      tl.fromTo('.gsap-img',
        { clipPath: 'inset(10% 10% 10% 10%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power2.out' }, 0.05
      );
      tl.fromTo('.gsap-img-inner',
        { scale: 1.1 },
        { scale: 1, duration: 1.1, ease: 'power2.out' }, 0.05
      );
      tl.fromTo('.gsap-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.35
      );
      tl.fromTo('.gsap-dot',
        { scale: 0, backgroundColor: 'transparent' },
        { scale: 1, backgroundColor: CR, duration: 0.4, ease: 'back.out(1.5)' }, 0.15
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', marginBottom: 'clamp(32px,7vw,100px)' }}>
      {/* ══════════════════════════════════════════════════
          DESKTOP LAYOUT — alternating left/right
      ══════════════════════════════════════════════════ */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 48px 1fr',
          alignItems: 'start',
        }}
        className="milestone-desktop"
      >
        <style>{`
          /* Hide desktop row on mobile */
          @media (max-width: 767px) {
            .milestone-desktop { display: none !important; }
            .milestone-mobile  { display: flex !important; }
          }
        `}</style>

        {/* Left slot */}
        <div style={{ paddingRight: 'clamp(16px,2.5vw,36px)', paddingTop: 4 }}>
          {isEven ? (
            /* Image left */
            <div className="gsap-img" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 2, clipPath: 'inset(10% 10% 10% 10%)' }}>
              <div className="gsap-img-inner" style={{ position: 'absolute', inset: 0 }}>
                <Image src={milestone.img} alt={milestone.alt} fill style={{ objectFit: 'cover' }} sizes="40vw" />
              </div>
              <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px rgba(17,17,17,0.15)' }} />
            </div>
          ) : (
            /* Text left */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
              <div className="gsap-year" style={{ opacity: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 800, color: CR, lineHeight: 1, letterSpacing: '-0.04em' }}>
                {milestone.year}
              </div>
              <div className="gsap-text" style={{ opacity: 0 }}>
                <Pill label={milestone.pill} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,28px)', fontWeight: 700, color: '#111', lineHeight: 1.15, marginTop: 10, marginBottom: 10 }}>
                  {milestone.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,0.95vw,14px)', color: '#6D6962', lineHeight: 1.7, maxWidth: 240 }}>
                  {milestone.tagline}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Spine dot */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="gsap-dot" style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${CR}`, backgroundColor: 'transparent', flexShrink: 0, marginTop: 18, zIndex: 2, position: 'relative', boxShadow: `0 0 0 3px rgba(17,17,17,0.1)` }} />
        </div>

        {/* Right slot */}
        <div style={{ paddingLeft: 'clamp(16px,2.5vw,36px)', paddingTop: 4 }}>
          {isEven ? (
            /* Text right */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="gsap-year" style={{ opacity: 0, fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 800, color: CR, lineHeight: 1, letterSpacing: '-0.04em' }}>
                {milestone.year}
              </div>
              <div className="gsap-text" style={{ opacity: 0 }}>
                <Pill label={milestone.pill} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,28px)', fontWeight: 700, color: '#111', lineHeight: 1.15, marginTop: 10, marginBottom: 10 }}>
                  {milestone.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,0.95vw,14px)', color: '#6D6962', lineHeight: 1.7, maxWidth: 240 }}>
                  {milestone.tagline}
                </p>
              </div>
            </div>
          ) : (
            /* Image right */
            <div className="gsap-img" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 2, clipPath: 'inset(10% 10% 10% 10%)' }}>
              <div className="gsap-img-inner" style={{ position: 'absolute', inset: 0 }}>
                <Image src={milestone.img} alt={milestone.alt} fill style={{ objectFit: 'cover' }} sizes="40vw" />
              </div>
              <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 40px rgba(17,17,17,0.15)' }} />
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MOBILE LAYOUT — always: dot | year → image → text
      ══════════════════════════════════════════════════ */}
      <div
        className="milestone-mobile"
        style={{
          display: 'none',            /* shown via media query above */
          alignItems: 'flex-start',
          gap: 0,
          position: 'relative',
        }}
      >
        {/* Left spine */}
        <div style={{ flexShrink: 0, width: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4, height: '100%', minHeight: 200 }}>
          <div className="gsap-dot" style={{ width: 10, height: 10, borderRadius: '50%', border: `2px solid ${CR}`, background: 'transparent', flexShrink: 0, zIndex: 2, boxShadow: `0 0 0 3px rgba(17,17,17,0.08)` }} />
          <div style={{ width: 1, height: 'calc(100% + 40px)', background: 'rgba(17,17,17,0.1)', marginTop: 6, position: 'absolute', top: 14 }} />
        </div>

        {/* Right content: year → image → text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, paddingLeft: 12, paddingBottom: 10 }}>

          {/* Year — always first */}
          <div className="gsap-year" style={{ opacity: 0, fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800, color: CR, lineHeight: 1, letterSpacing: '-0.04em' }}>
            {milestone.year}
          </div>

          {/* Image — always second */}
          <div className="gsap-img" style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', borderRadius: 2, clipPath: 'inset(10% 10% 10% 10%)' }}>
            <div className="gsap-img-inner" style={{ position: 'absolute', inset: 0 }}>
              <Image
                src={milestone.img}
                alt={milestone.alt}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width:767px) 85vw, 40vw"
              />
            </div>
          </div>

          {/* Pill + title + tagline — always third */}
          <div className="gsap-text" style={{ opacity: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Pill label={milestone.pill} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: '#111', lineHeight: 1.2 }}>
              {milestone.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#6D6962', lineHeight: 1.65 }}>
              {milestone.tagline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <div style={{ display: 'inline-flex', width: 'fit-content', alignItems: 'center', gap: 6, padding: '4px 12px', border: `1px solid rgba(17,17,17,0.22)`, borderRadius: 40 }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#111111' }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', color: '#111111', fontWeight: 700 }}>{label}</span>
    </div>
  );
}
