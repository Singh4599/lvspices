'use client';

import { useState, useEffect } from 'react';

const RED   = '#AC033B';
const INK   = '#1A1915';
const INK_L = '#4A4A4A';
const GOLD  = '#7B4E1B';

interface Lesson {
  n: number;
  name: string;
  emoji: string;
  color: string;
  tag: string;
  desc: string;
}

export const LESSONS: Lesson[] = [
  { n: 1, name: 'Black Pepper', emoji: '⚫', color: '#2C3E50', tag: 'Pepper', desc: 'Peppers are actually a tiny fruit that has the shape of a flowering climbing vine known as a spice pepper. A source of capsaicin native to its natural environment and is abundant in South and Southeast Asia.' },
  { n: 2, name: 'Paprika', emoji: '🫑', color: '#C0392B', tag: 'Pepper', desc: 'Paprika is a ground spice made from dried and fresh of the pepper and comes from the fruit of the sweet Capsicum annuum, called bell pepper or sweet pepper.' },
  { n: 3, name: 'Cardamom', emoji: '🫙', color: '#1A6B3E', tag: 'Seed', desc: 'Cardamom is a spice that comes from the seeds of various plants in the ginger family. This spice is native to Southern India, and is also grown across the Tropics.' },
  { n: 4, name: 'Garlic', emoji: '🧄', color: '#8B4513', tag: 'Allium', desc: 'Garlic is a species in the onion genus Allium and is native to Central Asia. It has been used throughout its history in both cook, both food and also shows.' },
  { n: 5, name: 'Turmeric', emoji: '💛', color: '#F9A825', tag: 'Root', desc: 'Turmeric is a rhizomatous herbaceous perennial plant and member of the ginger family, native to Southeast Asia and found in great amounts of South Asia.' },
  { n: 6, name: 'Onion', emoji: '🧅', color: '#A0522D', tag: 'Allium', desc: 'Many consider this, unknown and bad between bad between ones more — what Parisians taste inspired to collect their flavour from their deep-sea water farm which their city has very recently been known for.' },
  { n: 7, name: 'Chili Pepper', emoji: '🌶', color: '#C0392B', tag: 'Pepper', desc: 'Chili pepper is a perennial and a piece of flowering plants in the nightshade family, Solanaceae, which is native to tropical Americas.' },
  { n: 8, name: 'Cumin', emoji: '🌾', color: '#795548', tag: 'Seed', desc: 'Cumin is a member in the East origins of Asia. It is a small, flowering herb belonging to the Apiaceae family of the genus Cuminum.' },
  { n: 9, name: 'Ginger', emoji: '🫚', color: '#F57F17', tag: 'Root', desc: 'Ginger is a flowering plant that traces proper back to Southeast Asia. It belongs to the Zingiberaceae family and is closely related to turmeric, cardamom, and galangal.' },
  { n: 10, name: 'Nutmeg', emoji: '🫀', color: '#6D4C41', tag: 'Seed', desc: 'Nutmeg is the seed or ground spice of several species of the genus Myristica. It is the most common species in the flavour, a type of spice of Malabar.' },
  { n: 11, name: 'Red Pepper', emoji: '🔴', color: '#E53935', tag: 'Pepper', desc: 'Red pepper belongs to the family Solanaceae and is made from the dried harvest of plants from the family Capsicum annuum.' },
  { n: 12, name: 'Cinnamon', emoji: '🌰', color: '#8B4513', tag: 'Bark', desc: 'Cinnamon comes from the inner bark of several tree species from the family called Cinnamomum.' },
  { n: 13, name: 'White Pepper', emoji: '⚪', color: '#9E9E9E', tag: 'Pepper', desc: 'White pepper is native to Southeast Asia and is made from the same source as black pepper — fully ripened berries with the outer skin removed.' },
  { n: 14, name: 'Ancho Pepper', emoji: '🫑', color: '#4E342E', tag: 'Pepper', desc: 'Ancho pepper is native to Puebla, Mexico and ancestors of the sweet pepper Capsicum.' },
  { n: 15, name: 'Coriander', emoji: '🌿', color: '#388E3C', tag: 'Seed', desc: 'Coriander comes from the parsley-set software plant and is native to the Mediterranean and Middle East areas.' },
  { n: 16, name: 'Oregano', emoji: '🌱', color: '#2E7D32', tag: 'Herb', desc: 'Oregano is a perennial herb that belongs to the mint family, Lamiaceae.' },
  { n: 17, name: 'Guajillo', emoji: '🫑', color: '#B71C1C', tag: 'Pepper', desc: 'Guajillo is the dried form of the mirasol pepper, a chilli variety of the species Capsicum annuum shrub.' },
  { n: 18, name: 'Cassia', emoji: '🌰', color: '#6D4C41', tag: 'Bark', desc: 'Cassia originates from Southern China and is a member of the cinnamon family.' },
  { n: 19, name: 'Chili Powder', emoji: '🌶', color: '#D32F2F', tag: 'Blend', desc: 'Chili powder is a blend of dried chilies from a usually combined chili fruits seeds and spices, such as oregano, cumin, and curries used.' },
  { n: 20, name: 'Curry Powder', emoji: '🫙', color: '#F57F17', tag: 'Blend', desc: 'Curry powder is a complex spice blend that belongs to the flavour in India. The blend has its bright golden colour which comes from turmeric.' },
  { n: 21, name: 'Cayenne', emoji: '🔥', color: '#E53935', tag: 'Pepper', desc: 'Cayenne peppers belong to the nightshade family Solanaceae. It is a cultivar of Capsicum annuum and is related to bell peppers, jalapeños, paprika.' },
  { n: 22, name: 'Marjoram', emoji: '🌿', color: '#388E3C', tag: 'Herb', desc: 'Marjoram is a fragrant, aromatic perennial herb that looking to the mint family Lamiaceae. It is related to both oregano and is native to temperate French Grains.' },
];

const CSS = `
  @keyframes school-trackMove { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
  @keyframes school-gearSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes school-pulseLight { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  @keyframes school-slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes school-popup-reveal { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
  @keyframes school-scanRadar { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes school-floatVat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

  .school-track-anim { animation: school-trackMove 1.5s linear infinite; }
  .school-gear-anim { animation: school-gearSpin 5s linear infinite; transform-box: fill-box; transform-origin: center; }
  .school-light-pulse { animation: school-pulseLight 1.5s ease-in-out infinite; }
  .school-radar-spin { animation: school-scanRadar 3s linear infinite; transform-box: fill-box; transform-origin: center; }
  .school-vat-float { animation: school-floatVat 3s ease-in-out infinite; }



    @media (min-width: 800px) { .school-mobile { display:none !important; } }
  @media (max-width: 799px)  { .school-desktop { display:none !important; } }

  .school-modal-overlay {
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: school-slideUp 0.3s cubic-bezier(0.16,1,0.3,1);
  }
`;

function MachineFactory({ index, x, y, l, isActive, isHov, toggle, setHov }: {
  index: number; x: number; y: number; l: Lesson;
  isActive: boolean; isHov: boolean;
  toggle: () => void; setHov: (n: number | null) => void;
}) {
  const isFocus = isActive || isHov;
  const color = l.color;
  const strokeColor = isFocus ? color : INK;
  const strokeW = isFocus ? '2.5' : '1.5';
  
  // Reusing the 10 machine designs by modulo
  const i = index % 10;

  return (
    <g onClick={toggle} onMouseEnter={() => setHov(index)} onMouseLeave={() => setHov(null)} style={{ cursor: 'pointer' }}>

      {/* ── Base Connectors (Pipes to main track) ── */}
      <path d={`M${x-15},${y+40} L${x-15},${y+70} M${x+15},${y+40} L${x+15},${y+70}`} stroke={INK_L} strokeWidth="3" fill="none" strokeDasharray="5 5"/>
      <rect x={x-20} y={y+65} width="40" height="5" fill={INK}/>

      {/* ── Unique Machine Drawing per Step ── */}
      <g transform={`translate(${x}, ${y})`}>
        {i === 0 && (
          <g>
            <path d="M-30,40 L30,40 L20,-10 L-20,-10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-15" y="-30" width="30" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M0,-20 C-8,-10 -10,5 -6,18 C-2,32 6,32 10,18 C14,5 12,-10 0,-20 Z" fill="none" stroke={color} strokeWidth="2"/>
            <line x1="-5" y1="40" x2="-5" y2="15" stroke={strokeColor} strokeWidth="2"/>
            <line x1="5" y1="40" x2="5" y2="15" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="0" r="4" fill={strokeColor}/>
          </g>
        )}
        {i === 1 && (
          <g>
            <path d="M-20,40 L20,40 L10,10 L-10,10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M0,10 L0,-15" stroke={strokeColor} strokeWidth="4"/>
            <path d="M-25,-15 Q0,-38 25,-15" fill="none" stroke={strokeColor} strokeWidth="3"/>
            <g className="school-gear-anim">
              <circle cx="0" cy="-18" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="0" cy="-18" r="3" fill={color}/>
              <line x1="-12" y1="-18" x2="12" y2="-18" stroke={strokeColor} strokeWidth="2"/>
              <line x1="0" y1="-6" x2="0" y2="-30" stroke={strokeColor} strokeWidth="2"/>
            </g>
            <circle cx="0" cy="-15" r="4" fill={color} className="school-light-pulse"/>
          </g>
        )}
        {i === 2 && (
          <g>
            <path d="M-25,40 L25,40 L25,-10 L-25,-10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-25,-10 L0,-30 L25,-10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-10" y="-10" width="20" height="25" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="2" r="4" fill={color} className="school-light-pulse"/>
            <line x1="-20" y1="20" x2="20" y2="20" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
          </g>
        )}
        {i === 3 && (
          <g>
            <path d="M-30,40 L30,40 L30,10 L-30,10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-30,10 L-20,-20 L20,-20 L30,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="-5" r="12" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="-5" r="6" fill={color} className="school-light-pulse"/>
            <path d="M0,-17 C-4,-28 4,-34 0,-40" fill="none" stroke={color} strokeWidth="2.5"/>
          </g>
        )}
        {i === 4 && (
          <g>
            <path d="M-40,40 L40,40 L40,10 L-40,10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-40,10 L-30,-20 L30,-20 L40,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-25" y="-15" width="50" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-40" y1="-5" x2="40" y2="-5" stroke={color} strokeWidth="2" className="school-track-anim"/>
            <g className="school-gear-anim">
              <circle cx="-25" cy="25" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="-25" cy="25" r="3" fill={INK}/>
            </g>
            <g className="school-gear-anim">
              <circle cx="25" cy="25" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="25" cy="25" r="3" fill={INK}/>
            </g>
          </g>
        )}
        {i === 5 && (
          <g className="school-vat-float">
            <path d="M-30,-20 L30,-20 L20,40 L-20,40 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-30,-20 Q0,-35 30,-20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-25" y1="0" x2="25" y2="0" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
            <line x1="-20" y1="20" x2="20" y2="20" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
            <path d="M0,40 L0,55" stroke={strokeColor} strokeWidth="4"/>
            <circle cx="0" cy="20" r="8" fill="none" stroke={color} strokeWidth="2" className="school-radar-spin"/>
          </g>
        )}
        {i === 6 && (
          <g>
            <path d="M-40,40 L40,40 L40,10 L-40,10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-40,10 L-30,-20 L30,-20 L40,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-25" y="-15" width="50" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="-25,-5 Q0,-15 25,-5" fill="none" stroke={color} strokeWidth="2"/>
            <circle cx="-10" cy="-10" r="2" fill={strokeColor}/>
            <circle cx="15" cy="-8" r="2" fill={strokeColor}/>
            <line x1="-20" y1="-15" x2="-20" y2="5" stroke={color} strokeWidth="2" className="school-track-anim"/>
          </g>
        )}
        {i === 7 && (
          <g>
            <path d="M-45,40 L-25,40 L-25,-30 L-35,-30 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="-25,-20 L35,-20" fill="none" stroke={strokeColor} strokeWidth="6"/>
            <path d="M0,-20 L0,5" fill="none" stroke={strokeColor} strokeWidth="2" strokeDasharray="2 2"/>
            <rect x="-15" y="5" width="30" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-15" y1="15" x2="15" y2="15" stroke={strokeColor} strokeWidth="1"/>
            <circle cx="35" cy="-20" r="4" fill={color} className="school-light-pulse"/>
          </g>
        )}
        {i === 8 && (
          <g>
            <circle cx="0" cy="5" r="35" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="5" r="25" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <g className="school-gear-anim">
              <path d="-15,5 L15,5 M0,-10 L0,20 M-10,-5 L10,15 M10,-5 L-10,15" stroke={strokeColor} strokeWidth="3"/>
              <circle cx="0" cy="5" r="8" fill="#fff" stroke={strokeColor} strokeWidth="2"/>
            </g>
            <circle cx="0" cy="-30" r="5" fill={color} className="school-light-pulse"/>
          </g>
        )}
        {i === 9 && (
          <g>
            <rect x="-20" y="-10" width="40" height="50" rx="3" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M0,-10 L0,-30 M-10,-20 L10,-40 M-15,-30 Q0,-45 15,-30" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="-30" r="3" fill={color} className="school-light-pulse"/>
            <path d="-10,10 L10,10 M-10,20 L10,20" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="35" r="4" fill={strokeColor}/>
          </g>
        )}
      </g>

      {/* Emoji Overlay */}
      <circle cx={x} cy={y-8} r="14" fill="#fff" stroke={strokeColor} strokeWidth="1.5" />
      <text x={x} y={y-4} textAnchor="middle" fontSize="14" dominantBaseline="middle">{l.emoji}</text>

      {/* Title block */}
      <rect x={x-50} y={y+85} width="100" height="20" rx="10" fill={isActive ? color : '#fff'} stroke={isActive ? 'none' : strokeColor} strokeWidth={isActive ? '0' : '1.5'} />
      <text x={x} y={y+98} textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {l.name.toUpperCase().substring(0, 14)}
      </text>

      {/* Step Number Tag */}
      <circle cx={x-35} cy={y-45} r="10" fill={isActive ? color : '#fff'} stroke={strokeColor} strokeWidth="1.5"/>
      <text x={x-35} y={y-42} textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {String(l.n).padStart(2, '0')}
      </text>
    </g>
  );
}

export default function SpiceSchoolFlow() {
  const [active, setActive] = useState<number | null>(null);
  const [hov,    setHov]    = useState<number | null>(null);
  const lesson = active !== null ? LESSONS.find(x => x.n === active) : null;
  const toggle  = (n: number) => setActive(v => v === n ? null : n);

  const count = LESSONS.length; // 22

  /* Desktop Horizontal Zigzag */
  const dSX = [140, 320, 500, 680, 860, 1040, 1220, 1400, 1580, 1760, 1940, 2120, 2300, 2480, 2660, 2840, 3020, 3200, 3380, 3560, 3740, 3920];
  const dSY = Array.from({length: count}, (_, i) => i % 2 === 0 ? 120 : 250);
  const dTrackY = dSY.map(y => y + 70);
  const dSnakePath = `M${dSX[0]},${dTrackY[0]} ` + Array.from({length: count - 1}, (_, i) => {
    const x1 = dSX[i], y1 = dTrackY[i], x2 = dSX[i+1], y2 = dTrackY[i+1];
    const cp = (x2 - x1) / 2;
    return `C${x1+cp},${y1} ${x2-cp},${y2} ${x2},${y2}`;
  }).join(' ');
  const dRelayX = dSX.slice(0, count-1).map((x, i) => Math.round((x + dSX[i+1]) / 2));
  const dRelayY = dTrackY.slice(0, count-1).map((y, i) => Math.round((y + dTrackY[i+1]) / 2));
  const dViewW = 4060;

  /* Mobile Vertical Zigzag */
  const mSX = Array.from({length: count}, (_, i) => i % 2 === 0 ? 90 : 260);
  const mSY = Array.from({length: count}, (_, i) => 160 + i * 220);
  const mRelayWheels: [number, number][] = [];
  for (let i = 0; i < count - 1; i++) {
    const y2 = 270 + i * 220;
    mRelayWheels.push([90, y2]);
    mRelayWheels.push([260, y2]);
  }
  const mSnakePath = `M90,30 L90,160 ` + Array.from({length: count - 1}, (_, i) => {
    const y2 = 270 + i * 220;
    const y3 = 380 + i * 220;
    return i % 2 === 0 ? `C90,${y2} 260,${y2} 260,${y3}` : `C260,${y2} 90,${y2} 90,${y3}`;
  }).join(' ');

  useEffect(() => {
    document.body.style.overflow = active !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  return (
    <section style={{ padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,80px)', background: '#FAF9F6' }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>

        {/* DESKTOP — Horizontal Zigzag Assembly Line */}
        <div className="school-desktop">
          <div style={{ borderRadius:8, background:'#F0EEE5', border:'1px solid rgba(0,0,0,0.1)', overflow:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)',
              backgroundSize:'40px 40px' }}/>
            <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch', scrollbarWidth:'none', msOverflowStyle:'none', cursor:'grab' }}>
              <svg viewBox={`0 0 ${dViewW} 450`} style={{ display:'block', minWidth:dViewW, width:'100%' }} xmlns="http://www.w3.org/2000/svg">
                <defs><filter id="school-glow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={GOLD} floodOpacity="0.4"/></filter></defs>
                <path d={dSnakePath} fill="none" stroke="#E5E3D8" strokeWidth="18" strokeLinecap="round"/>
                <path d={dSnakePath} fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round"/>
                <path d={dSnakePath} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" className="school-track-anim"/>
                {dRelayX.map((cx, k) => (
                  <g key={k} transform={`translate(${cx}, ${dRelayY[k]})`} className="school-gear-anim">
                    <circle cx="0" cy="0" r="10" fill="#F0EEE5" stroke={INK} strokeWidth="2"/>
                    <circle cx="0" cy="0" r="3" fill={INK}/>
                    <circle cx="6" cy="0" r="1.5" fill={INK}/>
                    <circle cx="-6" cy="0" r="1.5" fill={INK}/>
                    <circle cx="0" cy="6" r="1.5" fill={INK}/>
                    <circle cx="0" cy="-6" r="1.5" fill={INK}/>
                  </g>
                ))}
                {LESSONS.map((l, i) => (
                  <MachineFactory key={l.n} index={i} x={dSX[i]} y={dSY[i]} l={l}
                    isActive={active===l.n} isHov={hov===i} toggle={()=>toggle(l.n)} setHov={setHov}/>
                ))}
              </svg>
            </div>
            <div style={{ textAlign:'center', padding:'12px 16px 18px', fontFamily:"'Courier New',monospace", fontSize:10, color:INK_L, letterSpacing:'0.16em', fontWeight:700 }}>
              {active===null ? '\u2190 DRAG TO EXPLORE \u2022 CLICK ANY LESSON TO LEARN MORE \u2192' : 'CLICK AGAIN OR USE CROSS TO CLOSE'}
            </div>
          </div>
        </div>

        {/* MOBILE — Vertical Zigzag Assembly Line */}
        <div className="school-mobile">
          <div style={{ borderRadius:8, background:'#F0EEE5', border:'1px solid rgba(0,0,0,0.1)', overflow:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)',
              backgroundSize:'30px 30px' }}/>
            <svg viewBox={`0 0 360 ${160 + count * 220}`} style={{ display:'block', width:'100%', position:'relative', zIndex:2 }} xmlns="http://www.w3.org/2000/svg">
              <path d={mSnakePath} fill="none" stroke="#E5E3D8" strokeWidth="18" strokeLinecap="round"/>
              <path d={mSnakePath} fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round"/>
              <path d={mSnakePath} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" className="school-track-anim"/>
              {mRelayWheels.map(([cx,cy],k) => (
                <g key={k} transform={`translate(${cx}, ${cy})`} className="school-gear-anim">
                  <circle cx="0" cy="0" r="9" fill="#F0EEE5" stroke={INK} strokeWidth="1.5"/>
                  <circle cx="0" cy="0" r="3" fill={INK}/>
                  <circle cx="5" cy="0" r="1.5" fill={INK}/>
                  <circle cx="-5" cy="0" r="1.5" fill={INK}/>
                  <circle cx="0" cy="5" r="1.5" fill={INK}/>
                  <circle cx="0" cy="-5" r="1.5" fill={INK}/>
                </g>
              ))}
              {LESSONS.map((l, i) => (
                <MachineFactory key={l.n} index={i} x={mSX[i]} y={mSY[i]} l={l}
                  isActive={active===l.n} isHov={hov===i} toggle={()=>toggle(l.n)} setHov={setHov}/>
              ))}
            </svg>
          </div>
        </div>

      </div>

      {lesson && (
        <div className="school-modal-overlay" onClick={() => setActive(null)}>
          <div style={{
            background: '#fff',
            borderRadius: 0,
            border: `2px solid ${INK}`,
            padding: 'clamp(32px,5vw,48px)',
            maxWidth: 540, width: '100%',
            boxShadow: `8px 8px 0px ${lesson.color}`,
            animation: 'school-popup-reveal 0.3s cubic-bezier(0.16,1,0.3,1)',
            position: 'relative',
          }} onClick={e => e.stopPropagation()}>

            <button onClick={() => setActive(null)} style={{
              position: 'absolute', top: 20, right: 20, background: INK, border: 'none',
              fontSize: 24, color: '#fff', cursor: 'pointer', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = lesson.color)}
              onMouseLeave={e => (e.currentTarget.style.background = INK)}
            >×</button>

            <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
              <div style={{
                flexShrink: 0, width: 60, height: 60,
                background: '#fff', border: `2px solid ${INK}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'monospace', fontSize: 22, fontWeight: 800, color: INK,
                boxShadow: `4px 4px 0px ${lesson.color}`
              }}>
                {String(lesson.n).padStart(2, '00')}
              </div>
              <div>
                <div style={{ fontFamily: "'Courier New',monospace", fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: lesson.color, marginBottom: 6, fontWeight: 700 }}>
                  {lesson.tag} CLASS
                </div>
                <div style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(22px,3vw,28px)', fontWeight: 800, color: INK, lineHeight: 1.1 }}>
                  {lesson.name}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 24, border: `2px solid ${INK}`, boxShadow: `4px 4px 0px ${lesson.color}`, background: `${lesson.color}15`, aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 'clamp(64px,12vw,96px)' }}>{lesson.emoji}</span>
            </div>

            <p style={{ fontFamily: 'var(--font-sans),system-ui', fontSize: 15, color: 'rgba(0,0,0,0.7)', lineHeight: 1.8, margin: 0 }}>
              {lesson.desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
