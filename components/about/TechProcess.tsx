'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CR = '#AC033B';

const STAGES = [
  { id: 'cleaning',   label: 'Cleaning & Sorting',       detail: 'Raw spices enter. Impurities separate.', img: '/images/factory.png',        alt: 'Industrial cleaning and sorting machinery', number: '01' },
  { id: 'cryogenic',  label: 'Cryogenic Grinding',        detail: 'Temperature controlled. Aroma preserved.', img: '/images/cryogenic-bg.png',  alt: 'Cryogenic grinding chamber', number: '02' },
  { id: 'testing',    label: 'Quality Testing',            detail: 'NABL lab certified. Every batch tested.', img: '/images/lab.png',            alt: 'NABL quality control laboratory', number: '03' },
  { id: 'packaging',  label: 'Sterilization & Packaging',  detail: 'Steam sterilized. Sealed for freshness.', img: '/images/spice_facility.png', alt: 'Steam sterilization and packaging line', number: '04' },
];

export default function TechProcess() {
  const sectionRef   = useRef<HTMLElement>(null);
  const stagesRef    = useRef<(HTMLDivElement | null)[]>([]);
  const arrowsRef    = useRef<(SVGSVGElement | null)[]>([]);
  const progressRef  = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current, { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      stagesRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el, { y: 32, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          delay: i * 0.1,
        });
      });

      arrowsRef.current.forEach((svg, i) => {
        if (!svg) return;
        const path = svg.querySelector('path');
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0, duration: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 66%' },
          delay: 0.2 + i * 0.14,
        });
      });

      gsap.to(progressRef.current, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'bottom 65%', scrub: 0.6 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="technology" style={{ background: '#FFFFFF', padding: 'clamp(48px,9vw,110px) 0', position: 'relative' }}>

      {/* Section number */}
      <div style={{ position: 'absolute', left: 'clamp(16px,3vw,40px)', top: 'clamp(48px,9vw,110px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(17,17,17,0.28)', letterSpacing: '0.14em', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>05</span>
        <div style={{ width: 1, height: 40, background: 'rgba(17,17,17,0.12)' }} />
      </div>

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(48px,7vw,120px)' }}>

        {/* ── Header ── */}
        <div
          ref={textRef}
          style={{ opacity: 0, marginBottom: 'clamp(24px,4vw,56px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,4vw,60px)', alignItems: 'end' }}
          className="tech-header"
        >
          <style>{`
            @media (max-width: 600px) {
              .tech-header { grid-template-columns: 1fr !important; gap: 12px !important; }
            }
          `}</style>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 20, height: 1, background: CR }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>Process</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3.8vw,56px)', fontWeight: 800, color: '#111', lineHeight: 1.05, letterSpacing: '-0.04em' }}>
              Science Behind<br />The Spice
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,1vw,15px)', color: '#6D6962', lineHeight: 1.75, marginBottom: 8 }}>
              Cryogenic technology and strict quality control protect purity, aroma and nutrition.
            </p>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontStyle: 'italic', color: CR }}>Innovation Meets Tradition.</span>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div style={{ position: 'relative', height: 1, background: 'rgba(17,17,17,0.08)', marginBottom: 'clamp(24px,4vw,48px)', borderRadius: 1, overflow: 'hidden' }}>
          <div ref={progressRef} style={{ position: 'absolute', inset: '0 0 0 0', background: CR, transformOrigin: 'left center', transform: 'scaleX(0)' }} />
        </div>

        {/* ── Stages ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }} className="stages-grid">
          <style>{`
            @media (max-width: 640px) {
              /* 2-column on mobile, no stage arrows between columns */
              .stages-grid { grid-template-columns: 1fr 1fr !important; row-gap: 28px !important; }
              .stage-arrow-wrap { display: none !important; }
            }
          `}</style>

          {STAGES.map((stage, i) => (
            <div key={stage.id} style={{ display: 'flex', alignItems: 'flex-start' }}>

              {/* Card */}
              <div
                ref={(el) => { stagesRef.current[i] = el; }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(8px,1.5vw,22px) clamp(6px,1.2vw,16px)', opacity: 0 }}
              >
                {/* Circular image container */}
                <div style={{
                  position: 'relative',
                  width: 'clamp(70px,10vw,140px)',
                  aspectRatio: '1/1',
                  marginBottom: 'clamp(10px,1.5vw,18px)',
                  borderRadius: '50%',
                  background: '#F8F6F1',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <Image
                    src={stage.img}
                    alt={stage.alt}
                    fill
                    style={{ objectFit: 'contain', padding: 10 }}
                    sizes="(max-width:640px) 30vw, 12vw"
                  />
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', color: CR, marginBottom: 6, fontWeight: 600 }}>{stage.number}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,0.85vw,12px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6 }}>
                  {stage.label}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(10px,0.8vw,12px)', color: '#6D6962', textAlign: 'center', lineHeight: 1.5 }}>
                  {stage.detail}
                </div>
              </div>

              {/* Arrow (hidden on mobile via class) */}
              {i < STAGES.length - 1 && (
                <div className="stage-arrow-wrap" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', paddingTop: 'clamp(32px,5vw,56px)' }}>
                  <svg ref={(el) => { arrowsRef.current[i] = el; }} width="22" height="14" viewBox="0 0 22 14" fill="none">
                    <path d="M0 7H18M14 3L20 7L14 11" stroke={CR} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
