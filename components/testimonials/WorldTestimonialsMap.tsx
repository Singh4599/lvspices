'use client';

import { useEffect, useRef, useState } from 'react';

const CR = '#AC033B';

const CSS = `
  @keyframes wm-drop { 0%{transform:translateY(-40px);opacity:0} 70%{transform:translateY(4px);opacity:1} 100%{transform:translateY(0);opacity:1} }
  @keyframes wm-ping { 0%{transform:scale(1);opacity:0.8} 100%{transform:scale(2.8);opacity:0} }
  @keyframes wm-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes wm-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(172,3,59,0.4)} 50%{box-shadow:0 0 0 8px rgba(172,3,59,0)} }
  .wm-pin { animation: wm-drop 0.5s cubic-bezier(.22,.68,0,1.2) both; }
  .wm-ring { animation: wm-ping 1.5s ease-out infinite; }
  .wm-card { animation: wm-up 0.35s cubic-bezier(.22,.68,0,1.2) forwards; }
`;

interface Country {
  code: string;
  name: string;
  flag: string;
  x: number; // percent of SVG width
  y: number; // percent of SVG height
  quote: string;
  author: string;
  role: string;
}

const COUNTRIES: Country[] = [
  { code: 'us', name: 'USA', flag: '🇺🇸', x: 18, y: 38,
    quote: 'We are very pleased with the quality supplied by LV Spices. We look forward to doing business for years to come.',
    author: 'Grocery Distributor', role: 'United States' },
  { code: 'gb', name: 'UK', flag: '🇬🇧', x: 45, y: 27,
    quote: 'Their knowledge of UK regulatory requirements for labelling and pesticide limits is second to none among Indian exporters.',
    author: 'Retail Brand Owner', role: 'United Kingdom' },
  { code: 'de', name: 'Germany', flag: '🇩🇪', x: 48.5, y: 26,
    quote: 'We placed our annual contract within one month. LV Spices is now our exclusive spice supplier for the European market.',
    author: 'FMCG Distributor', role: 'Germany' },
  { code: 'ae', name: 'UAE', flag: '🇦🇪', x: 58, y: 40,
    quote: 'We appreciate their quality of goods delivered. Products are having good demand in the international market.',
    author: 'Spice Importer', role: 'UAE' },
  { code: 'au', name: 'Australia', flag: '🇦🇺', x: 82, y: 70,
    quote: 'LV stands out for their traceability systems. Every batch comes with a full COA and farm-level records.',
    author: 'Health Food Brand', role: 'Australia' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦', x: 15, y: 25,
    quote: 'We rely on dependable service from suppliers like LV Spices to help us keep our schedule and satisfy our customers.',
    author: 'Wholesale Distributor', role: 'Canada' },
  { code: 'nz', name: 'New Zealand', flag: '🇳🇿', x: 88, y: 76,
    quote: 'Their team is incredibly easy to work with. Fast response times and commitment to excellence have made our partnership seamless.',
    author: 'Purchase Director', role: 'New Zealand' },
  { code: 'sg', name: 'Singapore', flag: '🇸🇬', x: 76, y: 51,
    quote: 'Consistent quality, always on time. LV Spices has been our trusted source for premium spice blends for 3+ years.',
    author: 'F&B Procurement Manager', role: 'Singapore' },
  { code: 'jp', name: 'Japan', flag: '🇯🇵', x: 83, y: 31,
    quote: 'Their HACCP and microbiological safety documentation meets Japanese import standards perfectly.',
    author: 'Food Import Specialist', role: 'Japan' },
  { code: 'nl', name: 'Netherlands', flag: '🇳🇱', x: 47, y: 24,
    quote: 'LV Spices cleared every EU pesticide residue check with zero rejections across 12 shipments.',
    author: 'Organic Distributor', role: 'Netherlands' },
];

// Simplified SVG world map path (equirectangular projection, continents outline)
// These are approximate landmass paths
const LAND_PATHS = [
  // North America
  'M 80,100 Q 120,80 160,90 Q 200,95 220,120 Q 240,140 230,170 Q 220,200 190,210 Q 160,220 140,210 Q 110,200 90,180 Q 70,160 75,130 Z',
  // South America
  'M 170,210 Q 200,220 210,250 Q 220,290 200,330 Q 180,360 160,350 Q 140,340 135,310 Q 130,280 145,250 Q 155,230 170,210 Z',
  // Europe
  'M 420,70 Q 460,60 490,75 Q 510,85 505,105 Q 500,120 480,125 Q 460,130 445,120 Q 430,110 425,95 Q 420,82 420,70 Z',
  // Africa
  'M 440,130 Q 480,125 495,150 Q 510,175 505,210 Q 500,245 485,270 Q 465,295 445,285 Q 425,275 420,250 Q 415,220 420,190 Q 425,160 435,140 Z',
  // Asia
  'M 510,60 Q 560,50 620,65 Q 660,75 680,100 Q 695,120 685,145 Q 675,165 650,170 Q 620,175 600,160 Q 570,150 545,135 Q 520,120 510,100 Q 505,80 510,60 Z',
  // Australia
  'M 720,290 Q 760,280 790,295 Q 815,310 810,340 Q 805,365 780,375 Q 755,385 735,370 Q 710,355 712,330 Q 714,308 720,290 Z',
  // Greenland
  'M 280,30 Q 310,20 330,35 Q 345,48 335,65 Q 320,78 300,72 Q 282,65 278,48 Z',
];

export default function WorldTestimonialsMap() {
  const [active, setActive] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        COUNTRIES.forEach((_, i) => {
          setTimeout(() => setRevealed(prev => { const n = [...prev]; n[i] = true; return n; }), i * 180);
        });
      }
    }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const A = active !== null ? COUNTRIES[active] : null;

  return (
    <section ref={sectionRef} style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,56px)', background: '#0f0f1a', position: 'relative', overflow: 'hidden' }}>
      <style>{CSS}</style>

      {/* Stars background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 137.5) % 100;
          const y = (i * 97.3) % 100;
          return <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: i % 5 === 0 ? 2 : 1, height: i % 5 === 0 ? 2 : 1, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', opacity: 0.2 + (i % 5) * 0.1 }} />;
        })}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,4vw,48px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 12 }}>
            Client Voices
          </div>
          <h2 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(28px,4.5vw,56px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
            40+ Countries. <em style={{ color: CR, fontStyle: 'italic' }}>One Voice.</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.35)', maxWidth: 420, margin: '0 auto' }}>
            Click a pin to read what our international partners say about LV Spices.
          </p>
        </div>

        {/* Map + Panel layout */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* MAP */}
          <div style={{ flex: 2, minWidth: 280, position: 'relative', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <svg viewBox="0 0 900 480" width="100%" style={{ display: 'block' }}>
              {/* Ocean background */}
              <rect width={900} height={480} fill="#0d1b2a" rx={0} />
              {/* Grid lines (latitude/longitude) */}
              {[0.2, 0.4, 0.6, 0.8].map(f => (
                <g key={f}>
                  <line x1={0} y1={f * 480} x2={900} y2={f * 480} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
                  <line x1={f * 900} y1={0} x2={f * 900} y2={480} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
                </g>
              ))}
              {/* Continents */}
              {LAND_PATHS.map((d, i) => (
                <path key={i} d={d} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
              ))}

              {/* Country pins */}
              {COUNTRIES.map((c, i) => {
                const px = (c.x / 100) * 900;
                const py = (c.y / 100) * 480;
                const isActive = active === i;
                if (!revealed[i]) return null;
                return (
                  <g key={c.code} className="wm-pin" style={{ animationDelay: `${i * 0.18}s`, cursor: 'pointer' }}
                    onClick={() => setActive(p => p === i ? null : i)}>
                    {/* Ping ring */}
                    <circle cx={px} cy={py} r={10} fill="none" stroke={CR} strokeWidth={1.5} className="wm-ring" style={{ animationDelay: `${i * 0.3}s` }} />
                    {/* Pin dot */}
                    <circle cx={px} cy={py} r={isActive ? 7 : 5} fill={isActive ? CR : 'rgba(172,3,59,0.7)'}
                      stroke={isActive ? '#fff' : 'transparent'} strokeWidth={1.5}
                      style={{ transition: 'all 0.2s', filter: isActive ? `drop-shadow(0 0 8px ${CR})` : undefined }}
                    />
                    {/* Flag + label on active */}
                    {isActive && (
                      <g>
                        <rect x={px - 30} y={py - 48} width={60} height={22} rx={6} fill={CR} />
                        <text x={px} y={py - 32} textAnchor="middle" fontFamily="monospace" fontSize={9} fill="#fff" fontWeight={600}>
                          {c.flag} {c.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* REVIEW PANEL */}
          <div style={{ flex: 1, minWidth: 260 }}>
            {A === null ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '48px 24px', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <div style={{ fontSize: 48 }}>🌍</div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
                  Click a pin on the map to read the testimonial
                </p>
              </div>
            ) : (
              <div key={A.code} className="wm-card" style={{
                background: 'rgba(172,3,59,0.06)', border: `1px solid ${CR}30`,
                borderRadius: 16, padding: 'clamp(20px,3vw,32px)', position: 'relative', overflow: 'hidden',
              }}>
                {/* BG quote mark */}
                <div style={{ position: 'absolute', top: -8, left: 16, fontFamily: 'serif', fontSize: 120, color: `${CR}10`, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Country badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${CR}20`, border: `1px solid ${CR}40`, borderRadius: 999, padding: '6px 14px', marginBottom: 20 }}>
                    <span style={{ fontSize: 16 }}>{A.flag}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: CR }}>{A.name}</span>
                  </div>

                  {/* Quote */}
                  <blockquote style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(14px,1.4vw,17px)', color: '#fff', lineHeight: 1.75, margin: '0 0 24px', fontStyle: 'italic' }}>
                    &ldquo;{A.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${CR}25`, border: `1px solid ${CR}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                      {A.flag}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: '#fff' }}>{A.author}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{A.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mini country list */}
            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {COUNTRIES.map((c, i) => (
                <button key={c.code} onClick={() => setActive(p => p === i ? null : i)} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em',
                  padding: '5px 10px', borderRadius: 999, cursor: 'pointer', transition: 'all 0.18s',
                  background: active === i ? CR : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${active === i ? CR : 'rgba(255,255,255,0.1)'}`,
                  color: active === i ? '#fff' : 'rgba(255,255,255,0.4)',
                }}>
                  {c.flag} {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
