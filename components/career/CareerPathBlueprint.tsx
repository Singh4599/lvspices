'use client';

import { useState } from 'react';

const CR     = '#AC033B';
const INK    = '#1A1818';
const INK_L  = '#4A4545';
const INK_LL = 'rgba(26,24,24,0.12)';
const BROWN  = '#8B4000';
const NAVY   = '#1A3F6B';
const TEAL   = '#1A6B5A';
const GOLD   = '#C8860C';
const PURPLE = '#5E2D79';

interface Stage {
  id: number;
  gate: string;
  name: string;
  accent: string;
  stat: string;
  statLabel: string;
  desc: string;
}

const STAGES: Stage[] = [
  {
    id: 0, gate: 'STAGE 01', name: 'Join the Team', accent: TEAL,
    stat: '2 Weeks', statLabel: 'Onboarding',
    desc: 'Every LV Spices journey starts with a 2-week immersive onboarding — from farm visits to facility walkthroughs. You meet your team, understand our culture, and get your hands on actual product.',
  },
  {
    id: 1, gate: 'STAGE 02', name: 'Learn the Craft', accent: BROWN,
    stat: '6 Months', statLabel: 'Skill ramp',
    desc: 'Hands-on training inside our production lines, QC labs, or export floor. Mentors are assigned from Day 1. Certifications like HACCP, FSSAI, and GMP are funded by us.',
  },
  {
    id: 2, gate: 'STAGE 03', name: 'Own Your Role', accent: NAVY,
    stat: 'Year 1+', statLabel: 'Independence',
    desc: 'After your ramp-up, you take full ownership of your function — running shifts, managing client documentation, leading QC batches, or heading R&D formulation projects.',
  },
  {
    id: 3, gate: 'STAGE 04', name: 'Global Exposure', accent: CR,
    stat: '40+ Markets', statLabel: 'World access',
    desc: 'Top performers get assigned to international accounts in the UK, UAE, USA, and EU. You\'ll attend trade shows, review client specs, and collaborate with buyers across continents.',
  },
  {
    id: 4, gate: 'STAGE 05', name: 'Lead a Team', accent: GOLD,
    stat: '10–50', statLabel: 'Team size',
    desc: 'Grow into a team lead or department head role. LV promotes from within — 80% of our current managers started as floor staff or junior analysts. Leadership training is fully sponsored.',
  },
  {
    id: 5, gate: 'STAGE 06', name: 'Shape the Future', accent: PURPLE,
    stat: 'C-Suite', statLabel: 'Destination',
    desc: 'Senior leaders at LV Spices help define product strategy, open new markets, and build the next generation of talent. This is where your legacy in India\'s spice industry begins.',
  },
];

const CSS = `
  @keyframes cpb-dash   { to { stroke-dashoffset: -100; } }
  @keyframes cpb-pulse  { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes cpb-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes cpb-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes cpb-blink  { 0%,100%{opacity:1} 50%{opacity:0.2} }
  @keyframes cpb-grow   { from{stroke-dashoffset:260} to{stroke-dashoffset:0} }
  @keyframes cpb-up     { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cpb-shimmer{ 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }

  .cpb-dash   { stroke-dasharray:8 6; animation:cpb-dash 2.5s linear infinite; }
  .cpb-pulse  { animation:cpb-pulse 2.2s ease-in-out infinite; transform-origin:center; transform-box:fill-box; }
  .cpb-float  { animation:cpb-float 3s ease-in-out infinite; transform-origin:center; transform-box:fill-box; }
  .cpb-spin   { animation:cpb-spin 8s linear infinite; transform-origin:center; transform-box:fill-box; }
  .cpb-blink  { animation:cpb-blink 2s ease-in-out infinite; }
  .cpb-up     { animation:cpb-up 0.38s cubic-bezier(.22,.68,0,1.2) forwards; }

  .cpb-card:hover { transform:translateY(-3px); box-shadow:0 20px 48px rgba(0,0,0,0.1); }
  .cpb-card { transition:transform 0.25s ease, box-shadow 0.25s ease; }

  /* Mobile card grid replaces SVG on small screens */
  .cpb-svg-wrap { display:block; }
  .cpb-mobile-grid { display:none; }
  @media(max-width:900px){
    .cpb-svg-wrap { display:none; }
    .cpb-mobile-grid { display:flex; flex-direction:column; gap:16px; padding:16px; }
    .cpb-detail { flex-direction:column !important; gap:16px !important; }
    .cpb-detail-left { width:100% !important; border-right:none !important; border-bottom:1px solid rgba(0,0,0,0.07) !important; padding-right:0 !important; padding-bottom:16px !important; }
  }
`;

/* --- Layout maths -------------------------------------------- */
const GW = 260, GH = 240, GAP = 160;
const COLS = 3;
/* Snake path: 0→1→2 right, drop to row 2, 5→4→3 right-to-left */
const posGrid = [
  {c:0,r:0},{c:1,r:0},{c:2,r:0},
  {c:2,r:1},{c:1,r:1},{c:0,r:1},
];
const positions = posGrid.map(p => ({
  x: 60 + p.c * (GW + GAP),
  y: 60 + p.r * (GH + GAP),
}));

const CONNS = [
  // row 0: 0→1→2
  { x1: positions[0].x+GW, y1: positions[0].y+GH/2, x2: positions[1].x,   y2: positions[1].y+GH/2 },
  { x1: positions[1].x+GW, y1: positions[1].y+GH/2, x2: positions[2].x,   y2: positions[2].y+GH/2 },
  // drop col 2: 2→3
  { x1: positions[2].x+GW/2, y1: positions[2].y+GH, x2: positions[3].x+GW/2, y2: positions[3].y },
  // row 1 right-to-left: 3→4→5
  { x1: positions[3].x,   y1: positions[3].y+GH/2, x2: positions[4].x+GW, y2: positions[4].y+GH/2 },
  { x1: positions[4].x,   y1: positions[4].y+GH/2, x2: positions[5].x+GW, y2: positions[5].y+GH/2 },
];

const SVG_W = 60 + COLS*(GW+GAP) - GAP + 60;
const SVG_H = 60 + 2*(GH+GAP) - GAP + 60;

/* ---- SVG illustrations per stage ---------------------------- */
function StageIllu({ i, accent }: { i: number; accent: string }) {
  switch(i) {
    case 0: return ( // Onboarding — handshake + door
      <g stroke={INK} strokeWidth="1.5" fill="none">
        {/* Door */}
        <rect x="20" y="30" width="50" height="75" rx="3" fill={`${accent}15`}/>
        <circle cx="62" cy="68" r="3" fill={accent} stroke="none"/>
        {/* Handshake */}
        <path d="M 90,55 Q 105,48 118,55" strokeWidth="2"/>
        <path d="M 90,70 Q 105,78 118,70" strokeWidth="2"/>
        <path d="M 90,55 L 90,70 M 118,55 L 118,70" strokeWidth="2"/>
        <circle cx="90" cy="62" r="6" fill={`${accent}40`} className="cpb-pulse"/>
        <circle cx="118" cy="62" r="6" fill={`${accent}40`} className="cpb-pulse"/>
        {/* Star sparkles */}
        {[[140,28],[148,42],[155,22]].map(([x,y],k)=>(
          <line key={k} x1={x-4} y1={y} x2={x+4} y2={y} strokeWidth="2" stroke={accent} className="cpb-blink"/>
        ))}
      </g>
    );
    case 1: return ( // Learn — open book + beaker
      <g stroke={INK} strokeWidth="1.5" fill="none">
        {/* Book */}
        <rect x="15" y="40" width="55" height="42" rx="3" fill={`${accent}15`}/>
        <line x1="42" y1="40" x2="42" y2="82"/>
        <line x1="20" y1="52" x2="38" y2="52"/>
        <line x1="20" y1="61" x2="38" y2="61"/>
        <line x1="46" y1="52" x2="64" y2="52"/>
        <line x1="46" y1="61" x2="64" y2="61"/>
        {/* Beaker */}
        <path d="M 100,25 L 100,55 L 115,80 L 85,80 L 100,55" fill={`${accent}20`}/>
        <ellipse cx="100" cy="25" rx="12" ry="6" fill={`${accent}30`}/>
        {/* Bubbles */}
        <circle cx="98" cy="64" r="3" fill={accent} stroke="none" className="cpb-float" style={{animationDelay:'0s'}}/>
        <circle cx="107" cy="57" r="2" fill={accent} stroke="none" opacity="0.5" className="cpb-float" style={{animationDelay:'0.6s'}}/>
        {/* Certificate strip */}
        <rect x="115" y="65" width="45" height="28" rx="4" fill={`${accent}20`}/>
        <text x="137" y="79" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={accent} fontWeight="700">HACCP</text>
        <circle cx="155" cy="71" r="4" fill={accent} stroke="none" opacity="0.8"/>
      </g>
    );
    case 2: return ( // Own your role — clipboard + tick
      <g stroke={INK} strokeWidth="1.5" fill="none">
        {/* Clipboard */}
        <rect x="30" y="22" width="70" height="85" rx="5" fill={`${accent}12`}/>
        <rect x="46" y="16" width="38" height="16" rx="4" fill={`${accent}30`}/>
        {/* Rows with checkmarks */}
        {[38,52,66,80].map((y,k) => (
          <g key={k}>
            <line x1="43" y1={y} x2="90" y2={y} strokeWidth="1"/>
            {k < 3 && <path d={`M 38,${y-4} l 4,4 6,-7`} stroke={accent} strokeWidth="2" fill="none"/>}
          </g>
        ))}
        {/* Animated circle at bottom row */}
        <circle cx="41" cy="80" r="5" fill={`${accent}30`} className="cpb-pulse"/>
        {/* Rising arrow */}
        <path d="M 115,90 L 115,30 M 107,38 L 115,30 L 123,38" strokeWidth="2" stroke={accent} className="cpb-dash"/>
      </g>
    );
    case 3: return ( // Global — plane + globe
      <g stroke={INK} strokeWidth="1.5" fill="none">
        <circle cx="75" cy="55" r="42" fill="none"/>
        <ellipse cx="75" cy="55" rx="22" ry="42" fill="none"/>
        <line x1="33" y1="55" x2="117" y2="55"/>
        <line x1="40" y1="28" x2="110" y2="28"/>
        <line x1="40" y1="82" x2="110" y2="82"/>
        <circle cx="75" cy="55" r="5" fill={CR} stroke="none" className="cpb-pulse"/>
        {/* Plane */}
        <path d="M 28,22 L 44,28 L 36,18 Z" fill={accent} stroke="none"/>
        <path d="M 44,28 L 55,20" stroke={accent} strokeWidth="2"/>
        <path d="M 42,30 L 50,36" stroke={accent} strokeWidth="1.5"/>
        <path d="M 28,22 Q 60,10 110,30" stroke={accent} strokeWidth="1.5" strokeDasharray="4 3" className="cpb-dash"/>
        {/* Pin */}
        <circle cx="112" cy="30" r="5" fill={accent} stroke="none" className="cpb-pulse"/>
      </g>
    );
    case 4: return ( // Lead — org chart
      <g stroke={INK} strokeWidth="1.5" fill="none">
        {/* Top node */}
        <rect x="55" y="12" width="48" height="30" rx="5" fill={`${accent}25`}/>
        <circle cx="79" cy="22" r="6" fill={accent} stroke="none"/>
        <line x1="64" y1="36" x2="74" y2="36" strokeWidth="0.8"/>
        <line x1="64" y1="42" x2="72" y2="42" strokeWidth="0.8"/>
        {/* Connector down */}
        <line x1="79" y1="42" x2="79" y2="56"/>
        <line x1="79" y1="56" x2="40" y2="56"/>
        <line x1="79" y1="56" x2="118" y2="56"/>
        <line x1="40" y1="56" x2="40" y2="65"/>
        <line x1="79" y1="56" x2="79" y2="65"/>
        <line x1="118" y1="56" x2="118" y2="65"/>
        {/* 3 sub nodes */}
        {[20,60,98].map((x,k)=>(
          <g key={k}>
            <rect x={x} y={65} width="38" height="24" rx="4" fill={`${accent}20`}/>
            <circle cx={x+10} cy={75} r="4" fill={accent} stroke="none" className="cpb-pulse" style={{animationDelay:`${k*0.4}s`}}/>
          </g>
        ))}
        {/* Star */}
        <path d="M 145,20 L 148,28 L 155,28 L 149,33 L 151,41 L 145,36 L 139,41 L 141,33 L 135,28 L 142,28 Z" fill={`${accent}50`} stroke={accent} strokeWidth="1"/>
      </g>
    );
    case 5: return ( // Shape future — rocket + stars
      <g stroke={INK} strokeWidth="1.5" fill="none">
        {/* Rocket body */}
        <path d="M 80,15 Q 95,15 100,35 L 100,75 Q 100,80 80,80 Q 60,80 60,75 L 60,35 Q 65,15 80,15 Z" fill={`${accent}20`}/>
        <ellipse cx="80" cy="15" rx="12" ry="8" fill={`${accent}40`}/>
        {/* Windows */}
        <circle cx="80" cy="50" r="8" fill={`${accent}30`}/>
        <circle cx="80" cy="50" r="4" fill={accent} stroke="none" className="cpb-pulse"/>
        {/* Fins */}
        <path d="M 60,65 L 45,80 L 60,80 Z" fill={`${accent}30`}/>
        <path d="M 100,65 L 115,80 L 100,80 Z" fill={`${accent}30`}/>
        {/* Flames */}
        <path d="M 68,80 Q 72,95 80,90 Q 88,95 92,80" fill={GOLD} stroke="none" className="cpb-float"/>
        {/* Stars */}
        {[[22,20],[155,18],[145,55],[30,65]].map(([x,y],k)=>(
          <circle key={k} cx={x} cy={y} r="3" fill={GOLD} stroke="none" className="cpb-blink" style={{animationDelay:`${k*0.5}s`}}/>
        ))}
      </g>
    );
    default: return null;
  }
}

export default function CareerPathBlueprint() {
  const [active, setActive] = useState<number | null>(null);
  const [hov,    setHov]    = useState<number | null>(null);
  const toggle = (i: number) => setActive(p => p === i ? null : i);

  const AZ = active !== null ? STAGES[active] : null;

  return (
    <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,56px)', background: '#F8F6F1' }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
            Your Journey Here
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 14px', lineHeight: 1 }}>
            From Day One to <em style={{ fontStyle: 'italic', color: CR }}>Day Landmark</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: INK_L, maxWidth: 460, margin: '0 auto' }}>
            Click any stage to see what your career looks like inside LV Spices.
          </p>
        </div>

        {/* Blueprint Card */}
        <div style={{ background: '#FDFCF9', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: 20, overflow: 'hidden' }}>

          {/* SVG Blueprint — hidden on mobile */}
          <div className="cpb-svg-wrap" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', cursor: 'grab' }}>
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              width={SVG_W} height={SVG_H}
              style={{ display: 'block', maxWidth: '100%' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="cpb-shadow">
                  <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity="0.07"/>
                </filter>
                {/* Subtle grid bg */}
                <pattern id="cpb-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5"/>
                </pattern>
                {/* Per-card clipPaths to contain scaled illustrations */}
                {STAGES.map((_, idx) => {
                  const p = positions[idx];
                  return (
                    <clipPath key={idx} id={`cpb-illu-clip-${idx}`}>
                      <rect x={p.x + 2} y={p.y + 26} width={GW - 4} height={GH - 64}/>
                    </clipPath>
                  );
                })}
              </defs>

              {/* Grid background */}
              <rect width={SVG_W} height={SVG_H} fill="url(#cpb-grid)"/>

              {/* Connection arrows */}
              {CONNS.map((c, ci) => (
                <g key={ci}>
                  <line
                    x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                    stroke={INK_LL} strokeWidth="1.5"
                  />
                  <line
                    x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                    stroke={CR} strokeWidth="2" strokeDasharray="8 6" opacity="0.6"
                    className="cpb-dash"
                    style={{ animationDelay: `${ci * 0.4}s` }}
                  />
                </g>
              ))}

              {/* Stage rooms */}
              {STAGES.map((stage, i) => {
                const pos = positions[i];
                const isActive = active === i;
                const isHov = hov === i;

                return (
                  <g
                    key={stage.id}
                    onClick={() => toggle(i)}
                    onMouseEnter={() => setHov(i)}
                    onMouseLeave={() => setHov(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Room shadow */}
                    <rect
                      x={pos.x + 4} y={pos.y + 6}
                      width={GW} height={GH} rx={12}
                      fill="rgba(0,0,0,0.05)"
                    />
                    {/* Room body */}
                    <rect
                      x={pos.x} y={pos.y}
                      width={GW} height={GH} rx={12}
                      fill={isActive ? `${stage.accent}10` : isHov ? `${stage.accent}06` : '#fff'}
                      stroke={isActive ? stage.accent : isHov ? `${stage.accent}60` : 'rgba(0,0,0,0.08)'}
                      strokeWidth={isActive ? 2 : 1}
                      filter="url(#cpb-shadow)"
                    />

                    {/* Gate badge */}
                    <text
                      x={pos.x + 16} y={pos.y + 24}
                      fontFamily="monospace" fontSize="9" fontWeight="700"
                      fill={stage.accent} letterSpacing="0.1em"
                    >
                      {stage.gate}
                    </text>

                    {/* Stage number circle (top right) */}
                    <circle cx={pos.x + GW - 24} cy={pos.y + 24} r={14} fill={`${stage.accent}15`}/>
                    <text
                      x={pos.x + GW - 24} y={pos.y + 29}
                      textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="700"
                      fill={stage.accent}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </text>

                    {/* Illustration — SVG-native scale+clipPath (no CSS overflow issues) */}
                    <g clipPath={`url(#cpb-illu-clip-${i})`}>
                      {/*
                        Transform breakdown:
                        1. translate to center of card's illustration area
                        2. scale(1.7) to enlarge
                        3. translate back by half of original 165x100 illu space
                      */}
                      <g transform={`translate(${pos.x + GW/2}, ${pos.y + 26 + (GH - 64)/2}) scale(1.7) translate(-82.5, -50)`}>
                        <StageIllu i={i} accent={stage.accent}/>
                      </g>
                    </g>

                    {/* Stage name */}
                    <text
                      x={pos.x + GW / 2} y={pos.y + GH - 40}
                      textAnchor="middle" fontFamily="var(--font-display,Georgia,serif)"
                      fontSize="16" fontWeight="800" fill={INK} letterSpacing="-0.02em"
                    >
                      {stage.name}
                    </text>

                    {/* Stat badge (on hover) */}
                    {(isHov || isActive) && (
                      <g style={{ animation: 'cpb-up 0.3s ease forwards' }}>
                        <rect
                          x={pos.x + GW / 2 - 46} y={pos.y + GH - 30}
                          width={92} height={22} rx={11}
                          fill={stage.accent}
                        />
                        <text
                          x={pos.x + GW / 2} y={pos.y + GH - 15}
                          textAnchor="middle" fontFamily="monospace" fontSize="8.5" fontWeight="700"
                          fill="#fff"
                        >
                          {stage.stat} · {stage.statLabel}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Mobile card grid — shown only on small screens */}
          <div className="cpb-mobile-grid">
            {STAGES.map((stage, i) => {
              const isActive = active === i;
              return (
                <div
                  key={stage.id}
                  onClick={() => toggle(i)}
                  style={{
                    background: isActive ? `${stage.accent}0f` : '#fff',
                    border: `1.5px solid ${isActive ? stage.accent : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: 16,
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 8, fontWeight: 700, color: stage.accent, letterSpacing: '0.1em' }}>{stage.gate}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: stage.accent }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <svg width="100%" viewBox="0 0 165 100" style={{ overflow: 'hidden', maxHeight: 90, display: 'block' }}>
                      <StageIllu i={i} accent={stage.accent}/>
                    </svg>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 13, fontWeight: 800, color: INK, letterSpacing: '-0.02em', textAlign: 'center' }}>{stage.name}</div>
                  {isActive && (
                    <div style={{ marginTop: 8, background: stage.accent, color: '#fff', fontFamily: 'monospace', fontSize: 9, fontWeight: 700, padding: '4px 10px', borderRadius: 999, textAlign: 'center' }}>
                      {stage.stat} · {stage.statLabel}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Detail Panel */}
          {AZ !== null && (
            <div
              className="cpb-up"
              style={{
                borderTop: `2px solid ${AZ.accent}`,
                background: '#fff',
                padding: 'clamp(24px,4vw,40px)',
              }}
            >
              <div className="cpb-detail" style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>

                {/* Left: stat + badge */}
                <div className="cpb-detail-left" style={{
                  width: 200, flexShrink: 0, borderRight: `1px solid ${INK_LL}`,
                  paddingRight: 32,
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: AZ.accent, marginBottom: 6,
                  }}>{AZ.gate}</div>
                  <div style={{
                    fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(32px,4vw,48px)',
                    fontWeight: 900, color: AZ.accent, lineHeight: 1,
                  }}>{AZ.stat}</div>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: 12, color: INK_L,
                    marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>{AZ.statLabel}</div>
                </div>

                {/* Right: name + desc + CTA */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display,Georgia,serif)',
                    fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 800, color: INK,
                    letterSpacing: '-0.02em', margin: '0 0 14px',
                  }}>{AZ.name}</h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1vw,15px)',
                    color: INK_L, lineHeight: 1.8, margin: '0 0 24px', maxWidth: 600,
                  }}>{AZ.desc}</p>
                  <a
                    href="#apply"
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                      color: AZ.accent, border: `1.5px solid ${AZ.accent}`,
                      padding: '10px 24px', borderRadius: 999, textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = AZ.accent;
                      (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      (e.currentTarget as HTMLAnchorElement).style.color = AZ.accent;
                    }}
                  >
                    Apply for This Stage →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
