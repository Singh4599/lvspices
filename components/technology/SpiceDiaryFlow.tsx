'use client';

import { useState, useEffect } from 'react';

const RED   = '#111111';
const INK   = '#1A1915';
const INK_L = '#666666';

interface Station {
  id: number;
  name: string;
  stat: string;
  desc: string;
  image: string;
}

const STATIONS: Station[] = [
  { id:1,  name:'Bay Leaves',    stat:'Tejpatta',        image:'/images/spice_farm.png', desc:'Sustainably sourced from the high-altitude laurel forests of India, our Tejpatta (Indian Bay Leaf) offers a distinctively robust cinnamon-clove aroma profile. Ideal for bulk B2B sourcing, these leaves are essential for commercial curries, biryani formulations, and premium spice extractions.' },
  { id:2,  name:'Black Pepper',  stat:'Kali Mirch',      image:'/images/products/blackkpepper.png', desc:'Harvested from the acclaimed Malabar coast of Kerala, our Black Pepper guarantees high piperine content for maximum pungency and bioavailability enhancement. We supply ASTA-grade whole and cracked pepper for global culinary manufacturing and nutraceutical applications.' },
  { id:3,  name:'Cardamom',      stat:'Elaichi',         image:'/images/products/spices-hero.png', desc:'Sourced directly from the misty Western Ghats of Idukki, Kerala, our green cardamom (Queen of Spices) boasts exceptional volatile oil content. It delivers a complex floral-citrus aroma indispensable for commercial chai blends, premium bakery products, and Middle Eastern culinary formulations.' },
  { id:4,  name:'Chilli',        stat:'Lal Mirch',       image:'/images/products/chilli-v4.png', desc:'India\'s fiery crown jewel. We process premium Guntur and Byadgi chillies, strictly monitored for deep ASTA colour values and explosive Scoville Heat Units (SHU). Fully traceable and aflatoxin-tested for global food service and industrial sauce manufacturing.' },
  { id:5,  name:'Cinnamon',      stat:'Dalchini',        image:'/images/products/spices-grid.png', desc:'Our authentic Ceylon-type cinnamon provides delicate, sweet warmth and is meticulously graded for volatile oil concentration. Widely utilized in commercial baking, artisanal beverage blends, and Ayurvedic nutraceuticals for its proven metabolic benefits.' },
  { id:6,  name:'Cloves',        stat:'Laung',           image:'/images/products/masala.png', desc:'Our premium dried clove buds are selected for their intense eugenol concentration and structural integrity. A critical component for industrial spice blends (garam masala), meat processing, and dental/pharmaceutical applications worldwide.' },
  { id:7,  name:'Coriander',     stat:'Dhania',          image:'/images/products/coriander-v4.png', desc:'Harvested in the arid regions of Rajasthan, our coriander seeds are prized for their high linalool content, delivering a bright, citrusy warmth. A high-volume staple for global curry powder manufacturing, sausage seasoning, and complex culinary bases.' },
  { id:8,  name:'Ginger',        stat:'Adrak',           image:'/images/products/curry-hero.png', desc:'Cultivated for peak gingerol potency, our ginger rhizomes offer maximum anti-inflammatory properties and robust flavor. We provide meticulously dried and milled ginger for the global wellness market, commercial beverage production, and Asian culinary pastes.' },
  { id:9,  name:'Turmeric',      stat:'Haldi',           image:'/images/products/turmeric-v4.png', desc:'Sourced from Erode, our Haldi consistently achieves >3.5% curcumin content, exceeding global B2B standards. It delivers an iconic golden hue and potent anti-inflammatory properties, making it essential for functional foods, supplements, and commercial spice blends.' },
  { id:10, name:'Cumin',         stat:'Jeera',           image:'/images/products/cumin-v4.png', desc:'Our drought-resilient Rajasthan jeera is harvested at peak maturity to lock in its earthy, warm aromatic profile. Processed through advanced sorting technology, we ensure 99.9% purity for high-end culinary tempering, taco seasonings, and global ethnic food manufacturing.' },
];

const CSS = `
  @keyframes trackMove { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
  @keyframes gearSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes pulseLight { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  @keyframes spice-slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes popup-reveal { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
  @keyframes scanRadar { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes floatVat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

  .spice-track-anim { animation: trackMove 1.5s linear infinite; }
  @media (min-width: 800px) { .spice-mobile { display:none !important; } }
  @media (max-width: 799px)  { .spice-desktop { display:none !important; } }
  .spice-gear-anim { animation: gearSpin 5s linear infinite; transform-box: fill-box; transform-origin: center; }
  .spice-light-pulse { animation: pulseLight 1.5s ease-in-out infinite; }
  .spice-radar-spin { animation: scanRadar 3s linear infinite; transform-box: fill-box; transform-origin: center; }
  .spice-vat-float { animation: floatVat 3s ease-in-out infinite; }

  .spice-modal-overlay {
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: spice-slideUp 0.3s cubic-bezier(0.16,1,0.3,1);
  }
`;

function MachineFactory({ i, x, y, s, isActive, isHov, toggle, setHov }: {
  i: number; x: number; y: number; s: Station;
  isActive: boolean; isHov: boolean;
  toggle: () => void; setHov: (n: number | null) => void;
}) {
  const isFocus = isActive || isHov;
  const strokeColor = isFocus ? RED : INK;
  const strokeW = isFocus ? '2.5' : '1.5';
  const glow = isFocus ? 'url(#spice-glow)' : 'none';

  return (
    <g onClick={toggle} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ cursor: 'pointer' }} filter={glow}>

      {/* ── Base Connectors (Pipes to main track) ── */}
      <path d={`M${x-15},${y+40} L${x-15},${y+70} M${x+15},${y+40} L${x+15},${y+70}`} stroke={INK_L} strokeWidth="3" fill="none" strokeDasharray="5 5"/>
      <rect x={x-20} y={y+65} width="40" height="5" fill={INK}/>

      {/* ── Unique Machine Drawing per Step ── */}
      <g transform={`translate(${x}, ${y})`}>
        {i === 0 && ( /* Bay Leaves — Herbarium Press */
          <g>
            <path d="M-30,40 L30,40 L20,-10 L-20,-10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-15" y="-30" width="30" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M0,-20 C-8,-10 -10,5 -6,18 C-2,32 6,32 10,18 C14,5 12,-10 0,-20 Z" fill="none" stroke={RED} strokeWidth="2"/>
            <line x1="-5" y1="40" x2="-5" y2="15" stroke={strokeColor} strokeWidth="2"/>
            <line x1="5" y1="40" x2="5" y2="15" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="0" r="4" fill={strokeColor}/>
          </g>
        )}
        {i === 1 && ( /* Black Pepper — Grinder Mill */
          <g>
            <path d="M-20,40 L20,40 L10,10 L-10,10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M0,10 L0,-15" stroke={strokeColor} strokeWidth="4"/>
            <path d="M-25,-15 Q0,-38 25,-15" fill="none" stroke={strokeColor} strokeWidth="3"/>
            <g className="spice-gear-anim">
              <circle cx="0" cy="-18" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="0" cy="-18" r="3" fill={RED}/>
              <line x1="-12" y1="-18" x2="12" y2="-18" stroke={strokeColor} strokeWidth="2"/>
              <line x1="0" y1="-6" x2="0" y2="-30" stroke={strokeColor} strokeWidth="2"/>
            </g>
            <circle cx="0" cy="-15" r="4" fill={RED} className="spice-light-pulse"/>
          </g>
        )}
        {i === 2 && ( /* Cardamom — Silo Tank */
          <g>
            <path d="M-25,40 L25,40 L25,-10 L-25,-10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-25,-10 L0,-30 L25,-10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-10" y="-10" width="20" height="25" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="2" r="4" fill={RED} className="spice-light-pulse"/>
            <line x1="-20" y1="20" x2="20" y2="20" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
          </g>
        )}
        {i === 3 && ( /* Chilli — Flame Reactor */
          <g>
            <path d="M-30,40 L30,40 L30,10 L-30,10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-30,10 L-20,-20 L20,-20 L30,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="-5" r="12" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="-5" r="6" fill={RED} className="spice-light-pulse"/>
            <path d="M0,-17 C-4,-28 4,-34 0,-40" fill="none" stroke={RED} strokeWidth="2.5"/>
            <path d="M-6,-15 C-10,-25 -2,-30 -6,-37" fill="none" stroke={RED} strokeWidth="1.5" opacity="0.6"/>
            <path d="M6,-15 C10,-25 2,-30 6,-37" fill="none" stroke={RED} strokeWidth="1.5" opacity="0.6"/>
          </g>
        )}
        {i === 4 && ( /* Cinnamon — Rolling Press */
          <g>
            <path d="M-40,40 L40,40 L40,10 L-40,10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-40,10 L-30,-20 L30,-20 L40,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-25" y="-15" width="50" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-40" y1="-5" x2="40" y2="-5" stroke={RED} strokeWidth="2" className="spice-track-anim"/>
            <g className="spice-gear-anim">
              <circle cx="-25" cy="25" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="-25" cy="25" r="3" fill={INK}/>
            </g>
            <g className="spice-gear-anim">
              <circle cx="25" cy="25" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="25" cy="25" r="3" fill={INK}/>
            </g>
          </g>
        )}
        {i === 5 && ( /* Cloves — Steam Distiller */
          <g className="spice-vat-float">
            <path d="M-30,-20 L30,-20 L20,40 L-20,40 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-30,-20 Q0,-35 30,-20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-25" y1="0" x2="25" y2="0" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
            <line x1="-20" y1="20" x2="20" y2="20" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
            <path d="M0,40 L0,55" stroke={strokeColor} strokeWidth="4"/>
            <circle cx="0" cy="20" r="8" fill="none" stroke={RED} strokeWidth="2" className="spice-radar-spin"/>
          </g>
        )}
        {i === 6 && ( /* Coriander — Mapping Table */
          <g>
            <path d="M-40,40 L40,40 L40,10 L-40,10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-40,10 L-30,-20 L30,-20 L40,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-25" y="-15" width="50" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="-25,-5 Q0,-15 25,-5" fill="none" stroke={RED} strokeWidth="2"/>
            <circle cx="-10" cy="-10" r="2" fill={strokeColor}/>
            <circle cx="15" cy="-8" r="2" fill={strokeColor}/>
            <line x1="-20" y1="-15" x2="-20" y2="5" stroke={RED} strokeWidth="2" className="spice-track-anim"/>
          </g>
        )}
        {i === 7 && ( /* Ginger — Conveyor Loader */
          <g>
            <path d="M-45,40 L-25,40 L-25,-30 L-35,-30 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="-25,-20 L35,-20" fill="none" stroke={strokeColor} strokeWidth="6"/>
            <path d="M-25,-20 L35,-20" fill="none" stroke={strokeColor} strokeWidth="6"/>
            <path d="M0,-20 L0,5" fill="none" stroke={strokeColor} strokeWidth="2" strokeDasharray="2 2"/>
            <rect x="-15" y="5" width="30" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-15" y1="15" x2="15" y2="15" stroke={strokeColor} strokeWidth="1"/>
            <circle cx="35" cy="-20" r="4" fill={RED} className="spice-light-pulse"/>
          </g>
        )}
        {i === 8 && ( /* Turmeric — Gold Extractor Dial */
          <g>
            <circle cx="0" cy="5" r="35" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="5" r="25" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <g className="spice-gear-anim">
              <path d="-15,5 L15,5 M0,-10 L0,20 M-10,-5 L10,15 M10,-5 L-10,15" stroke={strokeColor} strokeWidth="3"/>
              <circle cx="0" cy="5" r="8" fill="#fff" stroke={strokeColor} strokeWidth="2"/>
            </g>
            <circle cx="0" cy="-30" r="5" fill={RED} className="spice-light-pulse"/>
          </g>
        )}
        {i === 9 && ( /* Cumin — Traceability Antenna */
          <g>
            <rect x="-20" y="-10" width="40" height="50" rx="3" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M0,-10 L0,-30 M-10,-20 L10,-40 M-15,-30 Q0,-45 15,-30" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="-30" r="3" fill={RED} className="spice-light-pulse"/>
            <path d="-10,10 L10,10 M-10,20 L10,20" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="35" r="4" fill={strokeColor}/>
          </g>
        )}
      </g>

      {/* Title block */}
      <rect x={x-50} y={y+85} width="100" height="20" rx="10" fill={isActive ? RED : '#f0f0f0'}/>
      <text x={x} y={y+98} textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {s.name.toUpperCase()}
      </text>

      {/* Step Number Tag */}
      <circle cx={x-35} cy={y-45} r="10" fill={isActive ? RED : '#fff'} stroke={strokeColor} strokeWidth="1.5"/>
      <text x={x-35} y={y-42} textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {String(s.id).padStart(2, '0')}
      </text>
    </g>
  );
}

export default function SpiceDiaryFlow() {
  const [active, setActive] = useState<number | null>(null);
  const [hov,    setHov]    = useState<number | null>(null);
  const station = active !== null ? STATIONS[active] : null;
  const toggle  = (i: number) => setActive(v => v === i ? null : i);

  const count = STATIONS.length; // 10

  /* Desktop Horizontal Zigzag */
  const dSX = [140, 320, 500, 680, 860, 1040, 1220, 1400, 1580, 1760];
  const dSY = Array.from({length: count}, (_, i) => i % 2 === 0 ? 120 : 250);
  const dTrackY = dSY.map(y => y + 70);
  const dSnakePath = `M${dSX[0]},${dTrackY[0]} ` + Array.from({length: count - 1}, (_, i) => {
    const x1 = dSX[i], y1 = dTrackY[i], x2 = dSX[i+1], y2 = dTrackY[i+1];
    const cp = (x2 - x1) / 2;
    return `C${x1+cp},${y1} ${x2-cp},${y2} ${x2},${y2}`;
  }).join(' ');
  const dRelayX = dSX.slice(0, count-1).map((x, i) => Math.round((x + dSX[i+1]) / 2));
  const dRelayY = dTrackY.slice(0, count-1).map((y, i) => Math.round((y + dTrackY[i+1]) / 2));
  const dViewW = 1900;

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
    <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,5vw,80px)', background:'#FAF9F6' }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 1600, margin:'0 auto' }}>

        {/* DESKTOP — Horizontal Zigzag */}
        <div className="spice-desktop">
          <div style={{ borderRadius:8, background:'#F0EEE5', border:'1px solid rgba(0,0,0,0.1)', overflow:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)',
              backgroundSize:'40px 40px' }}/>
            <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch', scrollbarWidth:'none', msOverflowStyle:'none', cursor:'grab' }}>
              <svg viewBox={`0 0 ${dViewW} 450`} style={{ display:'block', minWidth:dViewW, width:'100%' }} xmlns="http://www.w3.org/2000/svg">
                <defs><filter id="spice-glow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={RED} floodOpacity="0.3"/></filter></defs>
                <path d={dSnakePath} fill="none" stroke="#E5E3D8" strokeWidth="18" strokeLinecap="round"/>
                <path d={dSnakePath} fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round"/>
                <path d={dSnakePath} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" className="spice-track-anim"/>
                {dRelayX.map((cx, k) => (
                  <g key={k} transform={`translate(${cx}, ${dRelayY[k]})`} className="spice-gear-anim">
                    <circle cx="0" cy="0" r="10" fill="#F0EEE5" stroke={INK} strokeWidth="2"/>
                    <circle cx="0" cy="0" r="3" fill={INK}/>
                    <circle cx="6" cy="0" r="1.5" fill={INK}/>
                    <circle cx="-6" cy="0" r="1.5" fill={INK}/>
                    <circle cx="0" cy="6" r="1.5" fill={INK}/>
                    <circle cx="0" cy="-6" r="1.5" fill={INK}/>
                  </g>
                ))}
                {STATIONS.map((s, i) => (
                  <MachineFactory key={s.id} i={i} x={dSX[i]} y={dSY[i]} s={s}
                    isActive={active===i} isHov={hov===i} toggle={()=>toggle(i)} setHov={setHov}/>
                ))}
              </svg>
            </div>
            <div style={{ textAlign:'center', padding:'12px 16px 18px', fontFamily:"'Courier New',monospace", fontSize:10, color:INK_L, letterSpacing:'0.16em', fontWeight:700 }}>
              {active===null ? '\u2190 DRAG TO EXPLORE \u2022 CLICK ANY MODULE TO LEARN MORE \u2192' : 'CLICK AGAIN OR USE CROSS TO CLOSE'}
            </div>
          </div>
        </div>

        {/* MOBILE — Vertical Zigzag */}
        <div className="spice-mobile">
          <div style={{ borderRadius:8, background:'#F0EEE5', border:'1px solid rgba(0,0,0,0.1)', overflow:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)',
              backgroundSize:'30px 30px' }}/>
            <svg viewBox={`0 0 360 ${160 + count * 220}`} style={{ display:'block', width:'100%', position:'relative', zIndex:2 }} xmlns="http://www.w3.org/2000/svg">
              <path d={mSnakePath} fill="none" stroke="#E5E3D8" strokeWidth="18" strokeLinecap="round"/>
              <path d={mSnakePath} fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round"/>
              <path d={mSnakePath} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" className="spice-track-anim"/>
              {mRelayWheels.map(([cx,cy],k) => (
                <g key={k} transform={`translate(${cx}, ${cy})`} className="spice-gear-anim">
                  <circle cx="0" cy="0" r="9" fill="#F0EEE5" stroke={INK} strokeWidth="1.5"/>
                  <circle cx="0" cy="0" r="3" fill={INK}/>
                  <circle cx="5" cy="0" r="1.5" fill={INK}/>
                  <circle cx="-5" cy="0" r="1.5" fill={INK}/>
                  <circle cx="0" cy="5" r="1.5" fill={INK}/>
                  <circle cx="0" cy="-5" r="1.5" fill={INK}/>
                </g>
              ))}
              {STATIONS.map((s, i) => (
                <MachineFactory key={s.id} i={i} x={mSX[i]} y={mSY[i]} s={s}
                  isActive={active===i} isHov={hov===i} toggle={()=>toggle(i)} setHov={setHov}/>
              ))}
            </svg>
          </div>
        </div>

      </div>

      {station && (
        <div className="spice-modal-overlay" onClick={()=>setActive(null)}>
          <div style={{
            background:'#fff', borderRadius:0, border:`2px solid ${INK}`,
            padding:'clamp(32px,5vw,48px)', maxWidth:540, width:'100%',
            boxShadow:`8px 8px 0px ${RED}`,
            animation:'spice-popup-reveal 0.3s cubic-bezier(0.16,1,0.3,1)',
            position:'relative',
          }} onClick={e => e.stopPropagation()}>
            <button onClick={()=>setActive(null)} style={{
              position:'absolute', top:20, right:20, background:INK, border:'none',
              fontSize:24, color:'#fff', cursor:'pointer', width:40, height:40,
              display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s',
            }}
              onMouseEnter={e=>(e.currentTarget.style.background=RED)}
              onMouseLeave={e=>(e.currentTarget.style.background=INK)}
            >×</button>
            <div style={{ display:'flex', gap:20, alignItems:'center', marginBottom:24 }}>
              <div style={{
                flexShrink:0, width:60, height:60, background:'#fff', border:`2px solid ${INK}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'monospace', fontSize:22, fontWeight:800, color:INK,
                boxShadow:`4px 4px 0px ${RED}`
              }}>
                {String(station.id).padStart(2,'0')}
              </div>
              <div>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:RED, marginBottom:6, fontWeight:700 }}>
                  {station.stat}
                </div>
                <div style={{ fontFamily:'Georgia,serif', fontSize:'clamp(22px,3vw,28px)', fontWeight:800, color:INK, lineHeight:1.1 }}>
                  {station.name}
                </div>
              </div>
            </div>
            
            {station.image && (
              <div style={{ marginBottom: 24, border: `2px solid ${INK}`, boxShadow: `4px 4px 0px ${RED}`, background: '#f5f5f5' }}>
                <img src={station.image} alt={station.name} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
              </div>
            )}
            
            <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:15, color:'rgba(0,0,0,0.7)', lineHeight:1.8, margin:0 }}>
              {station.desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
