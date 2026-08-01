'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function ContactHero() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ch-elem',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} style={{ 
      padding: 'clamp(120px, 15vw, 180px) clamp(24px, 5vw, 80px) clamp(60px, 10vw, 100px)', 
      background: '#fff',
      borderBottom: '1.5px solid rgba(0,0,0,0.06)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Engineering Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        zIndex: 0
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div className="ch-elem" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#AC033B' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#AC033B', fontWeight: 700 }}>
            Global Export & Partnerships
          </span>
        </div>
        
        <h1 className="ch-elem" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 8vw, 96px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0 0 24px' }}>
          Let's build<br />
          <em style={{ color: '#AC033B' }}>together.</em>
        </h1>
        
        <p className="ch-elem" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px, 1.5vw, 20px)', color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto 48px' }}>
          Bulk spice orders, OEM manufacturing, private label partnerships, or custom blend formulations — our export team responds within 24 hours. Serving importers in 40+ countries.
        </p>

        <div className="ch-elem" style={{ display: 'flex', gap: 'clamp(24px, 4vw, 48px)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#111' }}>24hr</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>Response Time</div>
          </div>
          <div style={{ width: 1, background: 'rgba(0,0,0,0.1)' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#111' }}>50+</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>Countries Served</div>
          </div>
          <div style={{ width: 1, background: 'rgba(0,0,0,0.1)' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: '#111' }}>B2B</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>Specialist</div>
          </div>
        </div>
      </div>
    </section>
  );
}
