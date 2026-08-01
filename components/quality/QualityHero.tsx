'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CR = '#AC033B';

export default function QualityHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

      // Intro animation
      tl.fromTo('.stagger-reveal',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
      )
      .fromTo('.scan-ring', 
        { scale: 0.5, opacity: 0, rotation: -90 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.5, stagger: 0.1, ease: 'back.out(1.2)' },
        "-=0.8"
      )
      .fromTo('.floating-card',
        { y: 20, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.5)' },
        "-=1"
      );

      // Continuous scanner spin
      gsap.to('.spin-slow', { rotation: 360, duration: 20, repeat: -1, ease: 'none', transformOrigin: 'center' });
      gsap.to('.spin-fast-reverse', { rotation: -360, duration: 12, repeat: -1, ease: 'none', transformOrigin: 'center' });
      
      // Floating animation for cards
      gsap.to('.floating-card', {
        y: '-=15',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.5
      });

      // Scroll exit parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (contentRef.current) gsap.set(contentRef.current, { y: -p * 150, opacity: 1 - p * 1.5 });
          if (scannerRef.current) gsap.set(scannerRef.current, { y: p * 100, scale: 1 + p * 0.1, opacity: 1 - p * 1.5 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="quality-hero"
      style={{
        position: 'relative',
        background: '#F8F6F1',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <style>{`
        .quality-hero {
          min-height: 100svh;
          padding: clamp(100px,12vw,160px) clamp(24px,5vw,80px);
        }
        .quality-visual-wrapper {
          flex: 1 1 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .minimal-glass-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(172,3,59,0.1);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1);
          overflow: hidden;
        }
        @keyframes movingDash {
          to { stroke-dashoffset: -8; }
        }
        .moving-dash {
          animation: movingDash 1s linear infinite;
        }
        @keyframes pulseDot {
          0% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(172,3,59,0.4); }
          70% { opacity: 0.8; transform: scale(1.1); box-shadow: 0 0 0 10px rgba(172,3,59,0); }
          100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(172,3,59,0); }
        }
        .pulse-dot {
          animation: pulseDot 2s infinite;
        }

        @media (max-width: 768px) {
          .quality-hero {
            min-height: auto;
            padding-top: 130px;
            padding-bottom: 60px;
          }
          .quality-visual-wrapper {
            margin-top: 20px;
          }
          .minimal-glass-card {
            padding: 30px 24px;
          }
          .hero-stats {
            display: none !important;
          }
        }
      `}</style>

      {/* Background Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(172,3,59,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(172,3,59,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        backgroundPosition: 'center center',
        pointerEvents: 'none',
      }} />
      
      {/* Ambient Glow */}
      <div style={{
        position: 'absolute', right: '10%', top: '40%', width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(172,3,59,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', transform: 'translate(50%, -50%)'
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', width: '100%', display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px, 8vw, 80px)', alignItems: 'center' }}>
        
        {/* TEXT CONTENT */}
        <div ref={contentRef} style={{ flex: '1 1 500px', maxWidth: 700 }}>
          <div className="stagger-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24, padding: '8px 16px', background: 'rgba(172,3,59,0.05)', border: '1px solid rgba(172,3,59,0.15)', borderRadius: 999 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: CR, boxShadow: `0 0 10px rgba(172,3,59,0.5)` }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CR, fontWeight: 700 }}>Purity Analysis</span>
          </div>

          <h1 className="stagger-reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,7vw,110px)', fontWeight: 800, color: '#111', lineHeight: 1.05, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
            Data-Driven<br />
            <span style={{ color: CR, fontStyle: 'italic' }}>Perfection.</span>
          </h1>

          <p className="stagger-reveal" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.2vw,18px)', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, maxWidth: 500, margin: '0 0 32px' }}>
            Our NABL accredited laboratory utilizes LC-MS/MS and GC-MS/MS technology to scan over 500 parameters, ensuring every single lot meets the strictest global food safety standards.
          </p>

          <div className="hero-stats" style={{ display: 'flex', gap: 'clamp(24px,4vw,60px)', flexWrap: 'wrap' }}>
            {[
              { val: '500+', label: 'Parameters Tested' },
              { val: '100%', label: 'Lots Verified' },
              { val: 'ZERO', label: 'Compromises' },
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

        {/* LIGHTWEIGHT MINIMAL VISUAL */}
        <div ref={scannerRef} className="quality-visual-wrapper">
          
          <div className="minimal-glass-card">
            {/* Top header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: CR }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase' }}>Live Status</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: CR, fontWeight: 600 }}>Active</div>
            </div>

            {/* Main Metric */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(0,0,0,0.6)', marginBottom: 8 }}>Overall Quality Index</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.03em' }}>
                100<span style={{ color: CR }}>%</span>
              </div>
            </div>

            {/* Sub Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, paddingTop: 20, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.05em', marginBottom: 4 }}>AFLATOXIN</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: '#111' }}>Not Detected</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.05em', marginBottom: 4 }}>MOISTURE</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: '#111' }}>&lt; 9.0%</div>
              </div>
            </div>

            {/* Decorative background graph line */}
            <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 100, pointerEvents: 'none', opacity: 0.5 }} viewBox="0 0 400 100" preserveAspectRatio="none">
              <path d="M0,100 L0,50 Q100,80 200,40 T400,20 L400,100 Z" fill="url(#minimalGradient)" opacity="0.1" />
              <path d="M0,50 Q100,80 200,40 T400,20" fill="none" stroke={CR} strokeWidth="2" strokeDasharray="4 4" className="moving-dash" />
              <defs>
                <linearGradient id="minimalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CR} />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
