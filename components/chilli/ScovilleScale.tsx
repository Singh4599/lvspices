'use client';

import { useEffect, useRef, useState } from 'react';

const CR = '#AC033B';
const ORANGE = '#E85D04';
const YELLOW = '#F4A261';

const VARIETIES = [
  { name: 'Kashmiri', shu: 2000, maxShu: 2000, color: '#8B0000', asta: '120–160', origin: 'Kashmir, India', heat: 1 },
  { name: 'Byadgi', shu: 15000, maxShu: 15000, color: '#A52A2A', asta: '100–140', origin: 'Karnataka, India', heat: 2 },
  { name: 'S9 Mundu', shu: 30000, maxShu: 30000, color: '#C0392B', asta: '50–60', origin: 'South India', heat: 3 },
  { name: 'S4 Sannam', shu: 35000, maxShu: 35000, color: '#D73027', asta: '60–80', origin: 'Guntur, AP', heat: 4 },
  { name: 'S17 Teja', shu: 100000, maxShu: 100000, color: '#E53E0D', asta: '40–60', origin: 'Andhra Pradesh', heat: 5 },
  { name: 'Ghost Pepper', shu: 1000000, maxShu: 1000000, color: '#FF0000', asta: 'Variable', origin: 'Northeast India', heat: 6 },
];

const CSS = `
  @keyframes sc-fill { from { height: 0; opacity: 0 } to { opacity: 1 } }
  @keyframes sc-glow { 0%,100% { box-shadow: 0 0 8px var(--c); } 50% { box-shadow: 0 0 28px var(--c), 0 0 60px var(--c)40; } }
  @keyframes sc-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
  @keyframes sc-spark { 0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(-60px) scale(0); opacity: 0; } }
  @keyframes sc-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-4px)} 40%{transform:translateX(4px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }
  .sc-bar-fill { animation: sc-fill 1.2s cubic-bezier(.22,.68,0,1.2) forwards; }
  .sc-glow-bar { animation: sc-glow 2s ease-in-out infinite; }
  .sc-float { animation: sc-float 3s ease-in-out infinite; }
  .sc-chilli { animation: sc-float 2.5s ease-in-out infinite; transform-origin: bottom center; }
  .sc-spark { animation: sc-spark 0.8s ease-out forwards; }
  .sc-shake { animation: sc-shake 0.4s ease; }

  .sc-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .sc-card:hover { transform: translateY(-4px) scale(1.02); }

  @media(max-width:700px){
    .sc-grid { flex-direction: column !important; }
    .sc-bars { flex-direction: row !important; gap: 8px !important; }
  }
`;

function ChilliSVG({ color, size = 48 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className="sc-chilli" style={{ display: 'block' }}>
      {/* Stem */}
      <path d="M24,4 Q20,8 22,14" stroke="#2E7D32" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M24,4 Q28,6 26,12" stroke="#388E3C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Body */}
      <path d="M22,14 Q14,18 12,28 Q11,36 16,42 Q20,46 24,44 Q28,46 32,42 Q37,36 36,28 Q34,18 26,14 Z"
        fill={color} />
      {/* Highlight */}
      <ellipse cx="19" cy="22" rx="3" ry="6" fill="rgba(255,255,255,0.25)" />
      {/* Tip */}
      <path d="M24,44 Q23,47 24,48 Q25,47 24,44" fill={color} stroke="none"/>
    </svg>
  );
}

function HeatFlames({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} style={{ fontSize: 14, opacity: i < count ? 1 : 0.15, transition: 'opacity 0.3s' }}>🔥</span>
      ))}
    </div>
  );
}

export default function ScovilleScale() {
  const [active, setActive] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sparkId = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealed(true); }, { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const addSparks = (e: React.MouseEvent, color: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const newSparks = Array.from({ length: 5 }).map((_, i) => ({
      id: sparkId.current++,
      x: e.clientX - rect.left + (Math.random() - 0.5) * 40,
      y: e.clientY - rect.top + (Math.random() - 0.5) * 20,
    }));
    setSparks(p => [...p, ...newSparks]);
    setTimeout(() => setSparks(p => p.filter(s => !newSparks.find(n => n.id === s.id))), 900);
  };

  const V = active !== null ? VARIETIES[active] : null;
  const maxLog = Math.log10(1000000);

  return (
    <section ref={sectionRef} style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,56px)', background: '#0d0d0d', position: 'relative', overflow: 'hidden' }}>
      <style>{CSS}</style>

      {/* BG radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(172,3,59,0.08), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
            Scoville Heat Units
          </div>
          <h2 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(32px,5vw,64px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 16px', lineHeight: 1 }}>
            The Heat <em style={{ color: CR, fontStyle: 'italic' }}>Spectrum</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(255,255,255,0.4)', maxWidth: 480, margin: '0 auto' }}>
            Click any chilli to explore its heat profile, color reading, and culinary applications.
          </p>
        </div>

        {/* Main layout */}
        <div className="sc-grid" style={{ display: 'flex', gap: 'clamp(24px,4vw,48px)', alignItems: 'flex-end' }}>

          {/* Left: Vertical heat bars */}
          <div className="sc-bars" style={{ display: 'flex', gap: 'clamp(8px,1.5vw,20px)', alignItems: 'flex-end', height: 360, flexShrink: 0 }}>
            {VARIETIES.map((v, i) => {
              const logVal = Math.log10(v.shu || 1);
              const pct = revealed ? ((logVal / maxLog) * 100).toFixed(1) : '0';
              const isActive = active === i;
              return (
                <div
                  key={i}
                  onClick={(e) => { setActive(i); addSparks(e, v.color); }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                >
                  {/* Chilli icon */}
                  <div style={{ marginBottom: 4, animationDelay: `${i * 0.2}s` }}>
                    <ChilliSVG color={v.color} size={isActive ? 44 : 32} />
                  </div>

                  {/* Bar container */}
                  <div style={{ position: 'relative', width: isActive ? 44 : 32, height: 280, transition: 'all 0.3s ease' }}>
                    {/* Track */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)', borderRadius: 999 }} />
                    {/* Fill */}
                    <div
                      className="sc-bar-fill"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: `${pct}%`,
                        background: `linear-gradient(to top, ${v.color}, ${v.color}80)`,
                        borderRadius: 999,
                        '--c': v.color,
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: `${0.8 + i * 0.1}s`,
                        ...(isActive ? { boxShadow: `0 0 24px ${v.color}80` } : {}),
                      } as React.CSSProperties}
                    />
                    {/* Active glow overlay */}
                    {isActive && (
                      <div
                        className="sc-glow-bar"
                        style={{ position: 'absolute', inset: 0, borderRadius: 999, border: `2px solid ${v.color}`, '--c': v.color } as React.CSSProperties}
                      />
                    )}
                  </div>

                  {/* Name */}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.05em', textTransform: 'uppercase', color: isActive ? v.color : 'rgba(255,255,255,0.35)', textAlign: 'center', maxWidth: 44, lineHeight: 1.3, transition: 'color 0.2s' }}>
                    {v.name.split(' ')[0]}
                  </div>

                  {/* Sparks */}
                  <div style={{ position: 'absolute', pointerEvents: 'none' }}>
                    {sparks.map(s => (
                      <div key={s.id} className="sc-spark" style={{ position: 'absolute', left: s.x, top: s.y, fontSize: 12, userSelect: 'none' }}>🔥</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detail panel */}
          <div style={{ flex: 1, minHeight: 360, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {V === null ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, opacity: 0.4 }}>
                <div className="sc-float" style={{ fontSize: 80 }}>🌶️</div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                  Click a bar to explore the variety
                </p>
              </div>
            ) : (
              <div key={active} style={{ animation: 'sc-fill 0.4s ease forwards' }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
                  <ChilliSVG color={V.color} size={72} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: V.color, marginBottom: 8 }}>
                      {V.origin}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                      {V.name}
                    </h3>
                    <HeatFlames count={V.heat} />
                  </div>
                </div>

                {/* SHU big number */}
                <div style={{ marginBottom: 24, padding: '20px 28px', background: `${V.color}12`, border: `1px solid ${V.color}30`, borderRadius: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>
                    Scoville Heat Units
                  </div>
                  <div style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, color: V.color, lineHeight: 1, letterSpacing: '-0.03em' }}>
                    {V.shu.toLocaleString()}
                    <span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.3)', marginLeft: 8 }}>SHU</span>
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 120, padding: '14px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>ASTA Color</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: '#fff' }}>{V.asta}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 120, padding: '14px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Heat Level</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: V.color }}>{['Mild', 'Low', 'Medium', 'Medium-Hot', 'Hot', 'Extreme'][V.heat - 1]}</div>
                  </div>
                </div>

                <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: '#fff', background: V.color, padding: '12px 24px', borderRadius: 999, textDecoration: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Request Sample →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* SHU scale legend */}
        <div style={{ marginTop: 40, padding: '16px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scale</span>
            <div style={{ flex: 1, height: 6, borderRadius: 999, background: `linear-gradient(to right, #8B0000, #C0392B, #E53E0D, #FF0000)`, minWidth: 120 }} />
            <div style={{ display: 'flex', gap: 16 }}>
              {['1K', '10K', '100K', '1M'].map(l => (
                <span key={l} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{l} SHU</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
