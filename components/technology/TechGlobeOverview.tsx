'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const World = dynamic(() => import('@/components/ui/globe').then((m) => m.World), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', border: '3px solid rgba(172,3,59,0.2)', borderTopColor: '#AC033B', animation: 'spin 1s linear infinite' }} />
    </div>
  ),
});

const CR = '#AC033B';

// Spice export arcs from India (20.5°N, 78.9°E) to major markets
const ARCS = [
  { order: 1, startLat: 20.59, startLng: 78.96, endLat: 51.51,  endLng: -0.13,   arcAlt: 0.3,  color: CR },          // UK
  { order: 2, startLat: 20.59, startLng: 78.96, endLat: 40.71,  endLng: -74.01,  arcAlt: 0.35, color: CR },          // USA
  { order: 3, startLat: 20.59, startLng: 78.96, endLat: 25.20,  endLng: 55.27,   arcAlt: 0.1,  color: CR },          // UAE
  { order: 4, startLat: 20.59, startLng: 78.96, endLat: -33.87, endLng: 151.21,  arcAlt: 0.2,  color: CR },          // Australia
  { order: 5, startLat: 20.59, startLng: 78.96, endLat: 52.52,  endLng: 13.40,   arcAlt: 0.28, color: CR },          // Germany
  { order: 6, startLat: 20.59, startLng: 78.96, endLat: 35.68,  endLng: 139.69,  arcAlt: 0.22, color: CR },          // Japan
  { order: 7, startLat: 20.59, startLng: 78.96, endLat: -23.55, endLng: -46.63,  arcAlt: 0.3,  color: CR },          // Brazil
  { order: 8, startLat: 20.59, startLng: 78.96, endLat: 1.35,   endLng: 103.82,  arcAlt: 0.15, color: CR },          // Singapore
];

const GLOBE_CONFIG = {
  pointSize: 4,
  globeColor: '#f0ede8',
  showAtmosphere: true,
  atmosphereColor: '#AC033B',
  atmosphereAltitude: 0.12,
  emissive: '#f0ede8',
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: 'rgba(172,3,59,0.15)',
  ambientLight: '#ffffff',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.8,
};

const STATS = [
  { val: '7', suffix: '+', label: 'Manufacturing Plants' },
  { val: '80k', suffix: '+', label: 'Mts Annual Capacity' },
  { val: '100k', suffix: '+', label: 'Sq.Ft. Built-up Area' },
  { val: '40', suffix: '+', label: 'Export Countries' },
];

export default function TechGlobeOverview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gs-card',
        { y: 60, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8, stagger: 0.12, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
      gsap.fromTo('.gs-heading',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );
      gsap.fromTo('.gs-globe-wrap',
        { scale: 0.85, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.4, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background: '#fff',
      padding: 'clamp(48px,5vw,80px) clamp(20px,5vw,80px)',
      overflow: 'hidden',
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>

        {/* Heading */}
        <div className="gs-heading" style={{ textAlign: 'center', marginBottom: 'clamp(24px,3vw,40px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CR, marginBottom: 10 }}>Global Reach</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 10px', lineHeight: 1.1 }}>
            From India to <span style={{ color: CR, fontStyle: 'italic' }}>40+ Nations</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,0.9vw,14px)', color: 'rgba(0,0,0,0.45)', maxWidth: 420, margin: '0 auto', lineHeight: 1.6 }}>
            LV Spices exports premium processed spices to over 40 countries across 6 continents — each lot backed by our NABL-certified QA chain.
          </p>
        </div>

        {/* Main: Globe + Stats side by side */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,4vw,48px)',
          alignItems: 'center', justifyContent: 'center',
        }}>

          {/* Real 3D Globe */}
          <div className="gs-globe-wrap" style={{
            flex: '1 1 240px',
            maxWidth: 380,
            aspectRatio: '1',
            position: 'relative',
          }}>
            {/* Subtle crimson glow behind globe */}
            <div style={{
              position: 'absolute', inset: '-10%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(172,3,59,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <World globeConfig={GLOBE_CONFIG} data={ARCS} />
          </div>

          {/* Stats — vertical list, no emoji, premium typography */}
          <div style={{
            flex: '1 1 220px',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="gs-card"
                style={{
                  padding: 'clamp(16px,2vw,24px) 0',
                  borderBottom: i < STATS.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  transition: 'padding-left 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = '10px'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = '0'; }}
              >
                {/* Crimson accent bar */}
                <div style={{ width: 3, height: 40, background: CR, borderRadius: 2, flexShrink: 0 }} />
                {/* Value */}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 1, minWidth: 90 }}>
                  {s.val}<span style={{ color: CR }}>{s.suffix}</span>
                </div>
                {/* Label */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', lineHeight: 1.4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
