'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Prevent scroll during load
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
      }
    });

    // Entry — letters fade in staggered
    tl.fromTo(
      line1Ref.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.3
    )
    .fromTo(
      line2Ref.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      0.55
    )
    // Bar fills
    .fromTo(
      barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.1, ease: 'power2.inOut', transformOrigin: 'left center' },
      0.6
    )
    // Hold
    .to({}, { duration: 0.2 })
    // Panel wipes up — two panels
    .to(
      line1Ref.current,
      { y: -40, opacity: 0, duration: 0.5, ease: 'power2.in' },
      '+=0.1'
    )
    .to(
      line2Ref.current,
      { y: -30, opacity: 0, duration: 0.4, ease: 'power2.in' },
      '<0.05'
    )
    .to(
      wrap,
      { yPercent: -100, duration: 0.9, ease: 'power4.inOut' },
      '-=0.2'
    )
    .set(wrap, { display: 'none' });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      {/* LV logo mark */}
      <div
        ref={line1Ref}
        style={{
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: 'clamp(40px, 8vw, 96px)',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          opacity: 0,
        }}
      >
        LV <span style={{ color: '#AC033B' }}>SPICES</span>
      </div>

      <div
        ref={line2Ref}
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 'clamp(9px, 1.2vw, 12px)',
          letterSpacing: '0.4em',
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
          opacity: 0,
        }}
      >
        Est. 1975 · Mumbai, India
      </div>

      {/* Progress bar */}
      <div
        style={{
          marginTop: 32,
          width: 'clamp(160px, 30vw, 280px)',
          height: 1,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
          borderRadius: 1,
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            background: '#AC033B',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </div>
  );
}
