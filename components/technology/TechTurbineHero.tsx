'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const CR = '#AC033B';

const CSS = `
  @keyframes th-marquee-fwd {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes th-marquee-rev {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  @keyframes th-in {
    from { opacity:0; transform:translateY(32px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes th-scroll-line {
    0%   { transform: scaleY(0); transform-origin: top; }
    50%  { transform: scaleY(1); transform-origin: top; }
    51%  { transform: scaleY(1); transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }
  @keyframes th-iframe-reveal {
    from { opacity: 0; filter: blur(10px); transform: scale(0.95); }
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes th-container-in {
    0% { opacity: 0; transform: scale(0.9) translateY(40px); filter: blur(10px); }
    100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
  }
  .th-marq-fwd { animation: th-marquee-fwd 40s linear infinite; display: inline-block; }
  .th-marq-rev { animation: th-marquee-rev 40s linear infinite; display: inline-block; }
  .th-in { animation: th-in 0.8s cubic-bezier(0.16,1,0.3,1) both; }
  .th-3d-wrapper { height: 70vh; }
  .th-3d-inner { position: absolute; top: -60px; bottom: -60px; left: 0px; right: 0px; }
  .th-hero-section { min-height: 100svh; }
  @media (max-width: 768px) {
    .th-hero-section { min-height: 85svh !important; }
    .th-3d-wrapper { height: 280px !important; width: 95% !important; margin: 0 auto; }
    .th-3d-inner { top: -42px !important; bottom: -42px !important; left: 0px !important; right: 0px !important; }
  }
`;

export default function TechTurbineHero({
  badgeText = "Our Technology",
  marqueeText = "TECHNOLOGY"
}: {
  badgeText?: string;
  marqueeText?: string;
}) {
  const [scrollY, setScrollY] = useState(0);
  const ModelViewer = 'model-viewer' as any;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const marqueeItems = Array.from({ length: 8 }, (_, i) => (
    <span key={i} style={{
      fontFamily: 'var(--font-display,Georgia,serif)',
      fontSize: 'clamp(110px,16vw,200px)',
      fontWeight: 900,
      letterSpacing: '-0.04em',
      lineHeight: 0.88,
      color: 'rgba(0,0,0,0.2)', /* Even darker text for white BG */
      userSelect: 'none',
      whiteSpace: 'nowrap',
      paddingRight: '0.25em',
    }}>
      {marqueeText}
    </span>
  ));

  return (
    <section className="th-hero-section" style={{ position: 'relative', background: '#ffffff', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{CSS}</style>

      {/* ── BG SCROLLING TEXT ─────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', pointerEvents: 'none', zIndex: 0, gap: 0, transform: `translateY(${scrollY * 0.15}px)` }}>
        <div style={{ overflow: 'hidden' }}>
          <div className="th-marq-fwd" style={{ whiteSpace: 'nowrap' }}>
            {marqueeItems}
            {marqueeItems}
          </div>
        </div>
        <div style={{ overflow: 'hidden', marginTop: -8 }}>
          <div className="th-marq-rev" style={{ whiteSpace: 'nowrap' }}>
            {marqueeItems}
            {marqueeItems}
          </div>
        </div>
      </div>

      {/* ── AMBIENT RADIAL GLOW ───────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 45% at 50% 52%, rgba(172,3,59,0.04) 0%, transparent 70%)',
      }} />

      {/* ── CONTENT ──────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', height: '100%', gap: '24px' }}>

        {/* Badge */}
        <div className="th-in" style={{ animationDelay: '0.05s', display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid rgba(172,3,59,0.2)`, borderRadius: 999, padding: '7px 20px', background: 'rgba(172,3,59,0.05)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: CR, boxShadow: `0 0 10px ${CR}` }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR }}>{badgeText}</span>
        </div>

        {/* Intro Animation Wrapper */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', animation: 'th-container-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards', animationDelay: '0.1s' }}>
          {/* ── 3D SKETCHFAB EMBED (Cropped UI) ─────────────────────────────── */}
          <div 
            className="th-iframe-container th-3d-wrapper"
            style={{ 
              width: '100%', 
              maxWidth: '1400px', /* Increased for desktop */
              position: 'relative',
              overflow: 'hidden',
              background: 'transparent',
              cursor: 'grab',
              filter: `brightness(1.15) saturate(1.2) blur(${Math.min(25, scrollY * 0.08)}px)`, /* Dynamic Blur */
              /* SCROLL EFFECT: fade out and move up */
              opacity: Math.max(0, 1 - scrollY / 600),
              transform: `translateY(${scrollY * 0.3}px) scale(${Math.max(0.8, 1 - scrollY / 1500)})`
            }}
          >
            {/* Live 3D Model Render */}
            <div className="th-3d-inner" style={{ pointerEvents: 'auto', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" strategy="lazyOnload" />
              <ModelViewer
                src="/truck-model.glb"
                alt="3D Delivery Truck"
                camera-controls
                disable-zoom
                auto-rotate
                rotation-per-second="3deg"
                camera-orbit="-30deg 80deg auto"
                shadow-intensity="1"
                environment-image="neutral"
                style={{
                  width: '100%',
                  height: '500px',
                  maxWidth: '800px',
                  filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.15))',
                  transform: 'scale(1.5)'
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
