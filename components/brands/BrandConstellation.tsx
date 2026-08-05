'use client';

import { useEffect, useRef, useState } from 'react';

const CR = '#AC033B';
const CATEGORY_COLORS: Record<string, string> = {
  'Retail': '#1a6b3c',
  'Export': '#1a4d8c',
  'Food Service': '#7d2b00',
  'Health': '#5c1a6b',
};

interface Brand { name: string; category: string; }

const CSS = `
  @keyframes bc-pulse { 0%,100%{opacity:0.6;r:5} 50%{opacity:1;r:7} }
  @keyframes bc-line { from{stroke-dashoffset:200} to{stroke-dashoffset:0} }
  @keyframes bc-in { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
  @keyframes bc-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  .bc-node { cursor:pointer; transition:all 0.2s; }
  .bc-node:hover circle { stroke-width:2.5; }
  .bc-edge { animation: bc-line 1.5s ease forwards; }
  .bc-label { pointer-events:none; font-family:var(--font-mono,monospace); }
  .bc-tooltip { animation: bc-in 0.25s cubic-bezier(.22,.68,0,1.2) forwards; }
`;

function seededRand(seed: number) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

export default function BrandConstellation({ brands }: { brands: Brand[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [revealed, setRevealed] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const W = 900, H = 520;
  const CATEGORIES = ['All', 'Retail', 'Export', 'Food Service', 'Health'];

  // Cluster brands by category into quadrants
  const quadrants: Record<string, [number, number, number]> = {
    'Retail':       [W * 0.25, H * 0.35, 140],
    'Export':       [W * 0.72, H * 0.30, 110],
    'Food Service': [W * 0.28, H * 0.72, 100],
    'Health':       [W * 0.70, H * 0.72, 110],
  };

  // Place each brand node within its cluster
  const nodes = brands.map((b, i) => {
    const rand = seededRand(i * 31337 + 7);
    const [cx, cy, r] = quadrants[b.category] || [W / 2, H / 2, 80];
    const angle = rand() * Math.PI * 2;
    const dist = rand() * r;
    return {
      ...b,
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      color: CATEGORY_COLORS[b.category] || CR,
      r: 4 + rand() * 4,
    };
  });

  // Edges: connect nodes in same category that are close enough
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => {
    nodes.forEach((b, j) => {
      if (j <= i) return;
      if (a.category !== b.category) return;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 90) edges.push([i, j]);
    });
  });

  // Cross-category hub lines (center to each cluster center)
  const CENTER = { x: W / 2, y: H / 2 };

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealed(true); }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filteredIndices = new Set(
    nodes.map((n, i) => (activeFilter === 'All' || n.category === activeFilter) ? i : -1).filter(i => i !== -1)
  );

  const hov = hovered !== null ? nodes[hovered] : null;

  return (
    <section ref={sectionRef} style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,56px)', background: '#0a0a12', position: 'relative', overflow: 'hidden' }}>
      <style>{CSS}</style>

      {/* BG grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(172,3,59,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(26,77,140,0.08), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 12 }}>
            Brand Network
          </div>
          <h2 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            The <em style={{ color: CR, fontStyle: 'italic' }}>Constellation</em> of Trust
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.35)', maxWidth: 440, margin: '0 auto 28px' }}>
            Each star represents a brand we supply. Hover to identify. Filter by segment.
          </p>
          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '8px 18px', borderRadius: 999, border: `1px solid ${activeFilter === cat ? (CATEGORY_COLORS[cat] || CR) : 'rgba(255,255,255,0.12)'}`,
                background: activeFilter === cat ? `${CATEGORY_COLORS[cat] || CR}20` : 'transparent',
                color: activeFilter === cat ? (CATEGORY_COLORS[cat] || CR) : 'rgba(255,255,255,0.4)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Constellation */}
        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            style={{ display: 'block', maxHeight: 520 }}
          >
            {/* Cluster label zones */}
            {Object.entries(quadrants).map(([cat, [cx, cy]]) => {
              const col = CATEGORY_COLORS[cat] || CR;
              const isActive = activeFilter === 'All' || activeFilter === cat;
              return (
                <g key={cat} opacity={isActive ? 1 : 0.15} style={{ transition: 'opacity 0.4s' }}>
                  <circle cx={cx} cy={cy} r={quadrants[cat][2]} fill={`${col}06`} stroke={`${col}20`} strokeWidth={1} strokeDasharray="4 4" />
                  <text x={cx} y={cy - quadrants[cat][2] - 12} textAnchor="middle" fontFamily="monospace" fontSize={9} letterSpacing="0.15em" fill={col} style={{ textTransform: 'uppercase' }} fillOpacity={0.7}>
                    {cat.toUpperCase()}
                  </text>
                </g>
              );
            })}

            {/* Hub cross-lines from center */}
            {Object.entries(quadrants).map(([cat, [cx, cy]]) => {
              const col = CATEGORY_COLORS[cat] || CR;
              const isActive = activeFilter === 'All' || activeFilter === cat;
              return (
                <line key={cat}
                  x1={CENTER.x} y1={CENTER.y} x2={cx} y2={cy}
                  stroke={col} strokeWidth={0.8} strokeDasharray="6 4" opacity={isActive ? 0.25 : 0.05}
                  style={{ transition: 'opacity 0.4s' }}
                />
              );
            })}

            {/* Center LV node */}
            <g>
              <circle cx={CENTER.x} cy={CENTER.y} r={22} fill={`${CR}20`} stroke={CR} strokeWidth={1.5} />
              <text x={CENTER.x} y={CENTER.y - 5} textAnchor="middle" fontFamily="serif" fontSize={11} fontWeight={700} fill={CR}>LV</text>
              <text x={CENTER.x} y={CENTER.y + 8} textAnchor="middle" fontFamily="monospace" fontSize={7} fill="rgba(255,255,255,0.5)">SPICES</text>
            </g>

            {/* Edges */}
            {revealed && edges.map(([i, j], ei) => {
              const a = nodes[i], b = nodes[j];
              const bothVisible = filteredIndices.has(i) && filteredIndices.has(j);
              return (
                <line key={ei}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={a.color} strokeWidth={0.6} opacity={bothVisible ? 0.25 : 0.04}
                  style={{ transition: 'opacity 0.4s' }}
                />
              );
            })}

            {/* Brand nodes */}
            {revealed && nodes.map((node, i) => {
              const isVisible = filteredIndices.has(i);
              const isHov = hovered === i;
              return (
                <g
                  key={i}
                  className="bc-node"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  opacity={isVisible ? 1 : 0.08}
                  style={{ transition: 'opacity 0.4s' }}
                >
                  {isHov && <circle cx={node.x} cy={node.y} r={node.r + 8} fill={`${node.color}20`} />}
                  <circle
                    cx={node.x} cy={node.y} r={isHov ? node.r + 3 : node.r}
                    fill={node.color}
                    stroke={isHov ? '#fff' : 'transparent'}
                    strokeWidth={isHov ? 1.5 : 0}
                    style={{ transition: 'r 0.2s, stroke 0.2s' }}
                    filter={isHov ? `drop-shadow(0 0 6px ${node.color})` : undefined}
                  />
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hov && (
            <div className="bc-tooltip" style={{
              position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(10,10,18,0.95)', border: `1px solid ${hov.color}50`,
              borderRadius: 12, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 14,
              backdropFilter: 'blur(16px)', pointerEvents: 'none', whiteSpace: 'nowrap',
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: hov.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: '#fff' }}>{hov.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: hov.color, marginTop: 2 }}>{hov.category}</div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {Object.entries(CATEGORY_COLORS).map(([cat, col]) => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: col }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 'clamp(16px,3vw,40px)', justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
          {Object.entries(CATEGORY_COLORS).map(([cat, col]) => {
            const count = brands.filter(b => b.category === cat).length;
            return (
              <div key={cat} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: col, lineHeight: 1 }}>{count}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{cat}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
