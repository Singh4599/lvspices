'use client';

import { useState } from 'react';

const INK    = '#1A1818';
const INK_L  = '#4A4545';
const INK_LL = 'rgba(26,24,24,0.15)';
const CRIMSON = '#AC033B';
const GOLD   = '#C8860C';
const TEAL   = '#1A6B5A';
const NAVY   = '#1A3F6B';
const PURPLE = '#4A0E8F';

interface Zone {
  id: number;
  gate: string;
  name: string;
  accent: string;
  stat: string;
  statLabel: string;
  desc: string;
}

const ZONES: Zone[] = [
  {
    id: 0, gate: 'SERVICE 01', name: 'In-House Design', accent: CRIMSON,
    stat: '7 Days', statLabel: 'First draft',
    desc: 'Our designers create your packaging artwork, labels, and brand identity — ready for print in any country. Multiple concept rounds included at no extra cost.',
  },
  {
    id: 1, gate: 'SERVICE 02', name: 'In-House Packing', accent: NAVY,
    stat: '100%', statLabel: 'Zero outsourcing',
    desc: 'Products are packed in our own facility under strict quality control — zero outsourcing, full traceability from farm to shelf.',
  },
  {
    id: 2, gate: 'SERVICE 03', name: 'All Pack Sizes', accent: TEAL,
    stat: '12+', statLabel: 'Pack formats',
    desc: '50g to 25kg bags, standup pouches, boxes, jars, and bulk — we handle every format for retail, HoReCa, and industrial use.',
  },
  {
    id: 3, gate: 'SERVICE 04', name: 'Flexible MOQ', accent: '#D95C14',
    stat: 'Low MOQ', statLabel: 'Easy launch',
    desc: 'We support low minimum order quantities so you can test new products in your market without tying up capital in excessive stock.',
  },
  {
    id: 4, gate: 'SERVICE 05', name: 'Certifications', accent: '#5A8F29',
    stat: 'FSSC 22000', statLabel: 'Global standard',
    desc: 'Our facility operates under rigorous international food safety standards including FDA, EU, FSSAI, and BRC guidelines.',
  },
  {
    id: 5, gate: 'SERVICE 06', name: 'FSSAI & Export Labels', accent: GOLD,
    stat: '40+', statLabel: 'Country formats',
    desc: 'All labels meet destination-country food labelling regulations — GCC, UK, USA, EU, Australia, Canada and more. Handled entirely by us.',
  },
  {
    id: 6, gate: 'SERVICE 07', name: 'Any Market', accent: PURPLE,
    stat: '40+', statLabel: 'Export markets',
    desc: 'We understand labelling requirements for 40+ markets. Your product, their regulations — fully handled by our documentation team.',
  },
  {
    id: 7, gate: 'SERVICE 08', name: 'IT & Tech Support', accent: '#2A6496',
    stat: '24hr', statLabel: 'Setup turnaround',
    desc: 'Our in-house IT team sets up product listings, barcode systems, EAN registration, and ordering workflows for your brand launch.',
  },
];

const CSS = `
  @keyframes plb2-dash   { to { stroke-dashoffset: -100; } }
  @keyframes plb2-pulse  { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.25)} }
  @keyframes plb2-scan   { 0%{transform:translateX(0)} 50%{transform:translateX(40px)} 100%{transform:translateX(0)} }
  @keyframes plb2-draw   { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
  @keyframes plb2-blink  { 0%,100%{opacity:1} 50%{opacity:0.2} }
  @keyframes plb2-bubble { 0%{transform:translateY(0);opacity:0.9} 100%{transform:translateY(-18px);opacity:0} }
  @keyframes plb2-up     { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

  .plb2-dash   { stroke-dasharray:8 6; animation:plb2-dash 2.5s linear infinite; }
  .plb2-pulse  { animation:plb2-pulse 2s ease-in-out infinite; transform-origin:center; transform-box:fill-box; }
  .plb2-scan   { animation:plb2-scan 3s ease-in-out infinite; }
  .plb2-blink  { animation:plb2-blink 1.8s ease-in-out infinite; }
  .plb2-bubble { animation:plb2-bubble 1.6s ease-in-out infinite; }
  .plb2-bubble2{ animation:plb2-bubble 1.6s ease-in-out 0.8s infinite; opacity:0; }
  .plb2-up     { animation:plb2-up 0.35s ease forwards; }

  .plb2-scroll::-webkit-scrollbar { display:none; }
  .plb2-scroll { -ms-overflow-style:none; scrollbar-width:none; }

  @media(max-width:700px){
    .plb2-detail { flex-direction:column !important; gap:16px !important; }
    .plb2-detail-left { width:100% !important; border-right:none !important;
      border-bottom:1px solid rgba(0,0,0,0.08) !important;
      padding-right:0 !important; padding-bottom:16px !important; }
  }
`;

/* Room dimensions */
const GW = 185, GH = 185, GAP = 70;
/* Grid: 4 columns × 2 rows in snake pattern */
const COLS = 4;
const posGrid = [
  {x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0},
  {x:3, y:1}, {x:2, y:1}, {x:1, y:1}, {x:0, y:1},
];
const positions = posGrid.map(p => ({
  x: 60 + p.x * (GW + GAP),
  y: 60 + p.y * (GH + GAP)
}));

/* Connections: left-to-right then down, then right-to-left */
const CONNS = [
  // row 0: 0→1→2→3
  { x1: positions[0].x+GW, y1: positions[0].y+GH/2, x2: positions[1].x, y2: positions[1].y+GH/2 },
  { x1: positions[1].x+GW, y1: positions[1].y+GH/2, x2: positions[2].x, y2: positions[2].y+GH/2 },
  { x1: positions[2].x+GW, y1: positions[2].y+GH/2, x2: positions[3].x, y2: positions[3].y+GH/2 },
  // down: 3→4 (col 3, row 0 → row 1)
  { x1: positions[3].x+GW/2, y1: positions[3].y+GH, x2: positions[4].x+GW/2, y2: positions[4].y },
  // row 1 right-to-left: 4→5→6→7
  { x1: positions[4].x, y1: positions[4].y+GH/2, x2: positions[5].x+GW, y2: positions[5].y+GH/2 },
  { x1: positions[5].x, y1: positions[5].y+GH/2, x2: positions[6].x+GW, y2: positions[6].y+GH/2 },
  { x1: positions[6].x, y1: positions[6].y+GH/2, x2: positions[7].x+GW, y2: positions[7].y+GH/2 },
];

const SVG_W = 60 + COLS*(GW+GAP) - GAP + 60;
const SVG_H = 60 + 2*(GH+GAP) - GAP + 60;

export default function PrivateLabelBlueprint() {
  const [active, setActive] = useState<number | null>(null);
  const [hov, setHov]       = useState<number | null>(null);
  const toggle = (i: number) => setActive(p => p === i ? null : i);

  return (
    <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#F8F6F1' }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>
            What We Offer
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 14px' }}>
            Everything Under <em style={{ fontStyle: 'italic', color: CRIMSON }}>One Roof</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: INK_L, maxWidth: 460, margin: '0 auto' }}>
            Click any service to learn how it works inside our facility.
          </p>
        </div>

        {/* Blueprint card */}
        <div style={{ background: '#FDFCF9', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: 20, overflow: 'hidden' }}>

          {/* SVG area */}
          <div className="plb2-scroll" style={{ width: '100%', padding: 'clamp(12px,3vw,24px)', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <svg
              viewBox={`20 20 ${SVG_W-40} ${SVG_H-40}`}
              style={{ width: '100%', minWidth: 660, height: 'auto', overflow: 'visible' }}
            >
              <defs>
                <pattern id="plb2-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={INK_LL} strokeWidth="0.5"/>
                  <path d="M 20 0 L 20 40 M 0 20 L 40 20" fill="none" stroke={INK_LL} strokeWidth="0.2"/>
                </pattern>
                <marker id="plb2-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill={CRIMSON} opacity="0.7"/>
                </marker>
              </defs>

              {/* Grid */}
              <rect width={SVG_W} height={SVG_H} fill="url(#plb2-grid)"/>

              {/* Corner brackets */}
              {[[30,30,1,1],[SVG_W-30,30,-1,1],[30,SVG_H-30,1,-1],[SVG_W-30,SVG_H-30,-1,-1]].map(([x,y,sx,sy],i)=>(
                <g key={i}>
                  <line x1={x} y1={Number(y)+Number(sy)*20} x2={x} y2={y} stroke={INK_LL} strokeWidth="1.5"/>
                  <line x1={x} y1={y} x2={Number(x)+Number(sx)*20} y2={y} stroke={INK_LL} strokeWidth="1.5"/>
                </g>
              ))}

              {/* Label */}
              <text x="40" y="48" fontFamily="'Courier New',monospace" fontSize="9" fill={INK_LL} letterSpacing="0.12em">
                PRIVATE LABEL SERVICES · LV SPICES
              </text>

              {/* Flow connections */}
              <g strokeWidth="6" fill="none">
                {CONNS.map((c,i)=>(
                  <g key={i}>
                    <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="rgba(0,0,0,0.05)" strokeWidth="12" strokeLinecap="round"/>
                    <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke={CRIMSON} strokeWidth="2.5" strokeLinecap="round" className="plb2-dash" markerEnd="url(#plb2-arrow)"/>
                  </g>
                ))}
              </g>

              {/* Rooms */}
              {ZONES.map((z,i)=>{
                const { x, y } = positions[i];
                const isAct = active === i;
                const isHov = hov === i;
                const dim   = active !== null && !isAct;
                return (
                  <g key={z.id}
                    transform={`translate(${x},${y})`}
                    onClick={()=>toggle(i)}
                    onMouseEnter={()=>setHov(i)}
                    onMouseLeave={()=>setHov(null)}
                    style={{ cursor:'pointer', transition:'opacity 0.3s', opacity: dim ? 0.3 : 1 }}
                  >
                    {/* Room base */}
                    <rect x="0" y="0" width={GW} height={GH} rx="6"
                      fill={isAct ? '#fff' : 'rgba(255,255,255,0.75)'}
                      stroke={isAct ? z.accent : isHov ? `${z.accent}60` : INK_LL}
                      strokeWidth={isAct ? 2.5 : 1.5}/>

                    {/* Header bar */}
                    <rect x="0" y="0" width={GW} height="30" fill={isAct ? z.accent : 'rgba(0,0,0,0.04)'} rx="6" style={{clipPath:'inset(0 0 -6px 0)'}}/>
                    <text x="12" y="20" fontFamily="'Courier New',monospace" fontSize="10" fontWeight="700" fill={isAct?'#fff':INK} letterSpacing="0.06em">{z.gate}</text>
                    <text x={GW-10} y="20" textAnchor="end" fontFamily="'Courier New',monospace" fontSize="8" fill={isAct?'rgba(255,255,255,0.7)':INK_L}>{z.name.toUpperCase()}</text>

                    {/* Step badge */}
                    <circle cx="0" cy="0" r="14" fill={CRIMSON}/>
                    <text x="0" y="4" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fontWeight="700" fill="#fff">{z.id+1}</text>

                    {/* Illustrations */}
                    <g transform="translate(10,38)" opacity={isAct?1:0.85}>

                      {/* 0: Design — palette + artboard */}
                      {i===0 && <g stroke={INK} strokeWidth="1.5">
                        <rect x="20" y="10" width="100" height="75" rx="4" fill="#fff"/>
                        <rect x="28" y="18" width="50" height="35" rx="2" fill={`${z.accent}20`}/>
                        <line x1="28" y1="62" x2="90" y2="62"/>
                        <line x1="28" y1="72" x2="70" y2="72"/>
                        <circle cx="130" cy="30" r="18" fill="none"/>
                        {[0,60,120,180,240,300].map(a=><circle key={a} cx={130+14*Math.cos(a*Math.PI/180)} cy={30+14*Math.sin(a*Math.PI/180)} r="4" fill={[CRIMSON,GOLD,TEAL,NAVY,PURPLE,'#888'][a/60]} stroke="none"/>)}
                        <circle cx="130" cy="30" r="5" fill="#fff" stroke={INK} strokeWidth="1.5"/>
                      </g>}

                      {/* 1: Packing — boxes on conveyor */}
                      {i===1 && <g stroke={INK} strokeWidth="1.5">
                        <line x1="0" y1="80" x2="150" y2="80" strokeWidth="3"/>
                        {[15,55,95].map((bx,bi)=>(
                          <g key={bi}>
                            <rect x={bx} y={40-bi*6} width="30" height="38" rx="2" fill={bi===0?`${NAVY}25`:'#fff'}/>
                            <line x1={bx} y1={40-bi*6} x2={bx+15} y2={35-bi*6}/>
                            <line x1={bx+30} y1={40-bi*6} x2={bx+15} y2={35-bi*6}/>
                          </g>
                        ))}
                        <circle cx="10" cy="80" r="6" fill={INK_L} stroke="none"/>
                        <circle cx="140" cy="80" r="6" fill={INK_L} stroke="none" className="plb2-pulse"/>
                      </g>}

                      {/* 2: Pack sizes — jars/pouches */}
                      {i===2 && <g stroke={INK} strokeWidth="1.5">
                        {/* small pouch */}
                        <path d="M 15,75 Q 15,35 30,30 Q 50,25 50,30 Q 65,35 65,75 Z" fill={`${TEAL}20`}/>
                        <line x1="30" y1="30" x2="50" y2="30"/>
                        {/* medium jar */}
                        <rect x="75" y="35" width="40" height="45" rx="6" fill="#fff"/>
                        <ellipse cx="95" cy="35" rx="20" ry="6" fill={`${TEAL}30`}/>
                        <rect x="82" y="28" width="26" height="9" rx="3" fill={INK_L}/>
                        {/* big sack */}
                        <path d="M 125,20 Q 120,75 140,75 L 155,75 Q 170,75 165,20 Z" fill={`${INK_LL}`}/>
                        <line x1="130" y1="40" x2="162" y2="40"/>
                        <line x1="128" y1="55" x2="163" y2="55"/>
                      </g>}

                      {/* 3: MOQ — flexible quantities */}
                      {i===3 && <g stroke={INK} strokeWidth="1.5">
                        <line x1="10" y1="90" x2="150" y2="90" strokeWidth="3"/>
                        <rect x="25" y="60" width="25" height="25" rx="2" fill={`${z.accent}20`}/>
                        <rect x="60" y="45" width="35" height="40" rx="2" fill={`${z.accent}40`}/>
                        <rect x="105" y="20" width="40" height="65" rx="2" fill={`${z.accent}60`}/>
                        {/* up arrow */}
                        <path d="M 25,30 L 140,30 M 130,20 L 140,30 L 130,40" fill="none" stroke={CRIMSON} strokeWidth="2" className="plb2-dash" />
                      </g>}

                      {/* 4: Certs */}
                      {i===4 && <g stroke={INK} strokeWidth="1.5">
                        <rect x="50" y="10" width="60" height="80" rx="4" fill="#fff" />
                        <line x1="60" y1="25" x2="100" y2="25" />
                        <line x1="60" y1="35" x2="90" y2="35" />
                        <line x1="60" y1="45" x2="100" y2="45" />
                        {/* Seal */}
                        <circle cx="80" cy="70" r="14" fill={`${z.accent}40`} />
                        <circle cx="80" cy="70" r="8" fill={z.accent} stroke="none" />
                        <path d="M 75,80 L 70,95 L 80,90 L 90,95 L 85,80" fill={`${z.accent}30`} stroke="none"/>
                      </g>}

                      {/* 5: Labels / Globe */}
                      {i===5 && <g stroke={INK} strokeWidth="1.5">
                        <circle cx="75" cy="55" r="42" fill="none"/>
                        <ellipse cx="75" cy="55" rx="22" ry="42" fill="none"/>
                        <line x1="33" y1="55" x2="117" y2="55"/>
                        <line x1="40" y1="30" x2="110" y2="30"/>
                        <line x1="40" y1="80" x2="110" y2="80"/>
                        <rect x="95" y="20" width="45" height="28" rx="4" fill={`${GOLD}30`}/>
                        <text x="117" y="37" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={GOLD} fontWeight="700">UK</text>
                        <rect x="100" y="60" width="40" height="22" rx="4" fill={`${CRIMSON}20`}/>
                        <text x="120" y="75" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={CRIMSON} fontWeight="700">EU</text>
                        <circle cx="75" cy="55" r="5" fill={GOLD} stroke="none" className="plb2-pulse"/>
                      </g>}

                      {/* 6: Markets — flag lines */}
                      {i===6 && <g stroke={INK} strokeWidth="1.5">
                        <line x1="20" y1="10" x2="20" y2="80" strokeWidth="3"/>
                        <rect x="20" y="10" width="55" height="25" fill={`${PURPLE}30`}/>
                        <text x="48" y="27" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={PURPLE} fontWeight="700">IN</text>
                        <line x1="80" y1="30" x2="80" y2="80" strokeWidth="3"/>
                        <rect x="80" y="30" width="40" height="20" fill={`${NAVY}30`}/>
                        <text x="100" y="44" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={NAVY} fontWeight="700">US</text>
                        <line x1="130" y1="20" x2="130" y2="80" strokeWidth="3"/>
                        <rect x="130" y="20" width="18" height="14" fill={`${TEAL}30`}/>
                        <text x="139" y="31" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={TEAL} fontWeight="700">AE</text>
                        <text x="75" y="94" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="8" fill={INK_L}>40+ Markets</text>
                      </g>}

                      {/* 7: IT — monitor+barcode */}
                      {i===7 && <g stroke={INK} strokeWidth="1.5">
                        <rect x="10" y="10" width="90" height="60" rx="4" fill="#fff"/>
                        <rect x="16" y="16" width="78" height="44" rx="2" fill="#f0f4f8"/>
                        <polyline points="22,45 35,32 48,40 60,22 72,35 82,28" fill="none" stroke="#2A6496" strokeWidth="2" className="plb2-dash"/>
                        <line x1="50" y1="70" x2="50" y2="80" strokeWidth="2"/>
                        <line x1="30" y1="80" x2="70" y2="80" strokeWidth="3"/>
                        {/* barcode */}
                        {[110,113,116,120,123,126,129,133,136].map((bx,bi)=>(
                          <rect key={bi} x={bx} y={bi%2===0?25:30} width={bi%3===0?3:1.5} height={bi%2===0?50:40} fill={INK} stroke="none"/>
                        ))}
                        <text x="127" y="85" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={INK_L}>EAN-13</text>
                      </g>}

                    </g>

                    {/* Active indicator dot */}
                    {isAct && <circle cx={GW-10} cy="10" r="5" fill="#fff" className="plb2-pulse"/>}

                    {/* Hover: show stat */}
                    {(isHov || isAct) && !dim && (
                      <g>
                        <rect x="4" y={GH-32} width={GW-8} height="26" rx="4" fill={`${z.accent}15`}/>
                        <text x={GW/2} y={GH-16} textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="10" fontWeight="700" fill={z.accent}>
                          {z.stat} · {z.statLabel}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detail panel */}
          <div style={{ minHeight: 110, borderTop: '1.5px solid rgba(0,0,0,0.08)', background: '#fff', padding: 'clamp(20px,3vw,32px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {active === null ? (
              <p style={{ fontFamily: 'Georgia,serif', fontSize: 15, color: INK_L, fontStyle: 'italic', textAlign: 'center', margin: 0 }}>
                Click any service room on the blueprint to view details.
              </p>
            ) : (
              <div className="plb2-detail plb2-up" style={{ display: 'flex', gap: 40, width: '100%', maxWidth: 900, margin: '0 auto' }}>
                <div className="plb2-detail-left" style={{ flexShrink: 0, width: 220, borderRight: `1px solid ${INK_LL}`, paddingRight: 28 }}>
                  <div style={{ fontFamily: "'Courier New',monospace", fontSize: 10, letterSpacing: '0.15em', color: ZONES[active].accent, marginBottom: 6, fontWeight: 700 }}>
                    {ZONES[active].gate}
                  </div>
                  <div style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 700, color: INK, lineHeight: 1.2, marginBottom: 14 }}>
                    {ZONES[active].name}
                  </div>
                  <div style={{ fontFamily: "'Courier New',monospace", fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 700, color: ZONES[active].accent, lineHeight: 1 }}>
                    {ZONES[active].stat}
                  </div>
                  <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: INK_L, marginTop: 4 }}>
                    {ZONES[active].statLabel}
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
                  <p style={{ fontFamily: 'var(--font-sans),system-ui', fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.65)', lineHeight: 1.75, margin: 0 }}>
                    {ZONES[active].desc}
                  </p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <a href="#contact-form" style={{
                      fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                      background: ZONES[active].accent, color: '#fff', padding: '9px 22px',
                      borderRadius: 999, textDecoration: 'none'
                    }}>Request This →</a>
                    <button onClick={()=>setActive(null)} style={{
                      fontFamily: 'var(--font-sans)', fontSize: 12, color: INK_L,
                      border: '1px solid rgba(0,0,0,0.1)', background: 'transparent',
                      padding: '9px 16px', borderRadius: 999, cursor: 'pointer'
                    }}>Close ×</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
