'use client';

import { useState, useEffect } from 'react';

const GREEN  = '#1A6B3E';
const INK    = '#1A2010';
const INK_L  = '#4A4A4A';
const LINE   = '#E5E5E5';
const ACCENT = '#AC033B';

interface Station {
  id: number;
  name: string;
  stat: string;
  desc: string;
}

const STATIONS: Station[] = [
  { id:1,  name:'Farmer Registration',    stat:'100+ Farmers',       desc:'Every IPM journey begins with education. We select farmers based on past compliance and train them on sustainable, chemical-free agriculture. Each farm is geocoded and assigned a unique ID in our traceability system, ensuring complete accountability from day one.' },
  { id:2,  name:'Regular Farm Visits',    stat:'Weekly Inspections', desc:'Our agronomists conduct weekly on-ground inspections to monitor crop health. Instead of chemical sprays, we guide farmers on manual weeding, bio-pesticide application, and early pest detection, ensuring crops grow robustly without toxic dependencies.' },
  { id:3,  name:'Residue Mapping',        stat:'Zero Tolerance',     desc:'We maintain strict "Zero Tolerance" for unauthorized chemicals. We actively cross-check local pesticide dispensaries and map farm surroundings to prevent cross-contamination. Any farm found using banned substances is immediately removed from the IPM programme.' },
  { id:4,  name:'Agronomist Support',     stat:'Expert Guided',      desc:'When natural pests threaten the crop, our expert agronomists intervene. We use scientifically proven bio-controls — like pheromone traps and neem-based solutions — tailored to the specific micro-climate of the farm, protecting the yield naturally.' },
  { id:5,  name:'Premium Incentive',      stat:'Better Pricing',     desc:'Sustainable farming requires financial backing. We pay a guaranteed premium above the market rate to our IPM farmers. This directly incentivizes strict adherence to our chemical-free protocols and elevates the standard of living in our farming communities.' },
  { id:6,  name:'Compliance Literature',  stat:'Lab Verified',       desc:'Knowledge is power. We distribute continuous updates on global MRL (Maximum Residue Limit) standards in local languages. Soil and water samples are regularly sent to NABL-accredited labs to ensure the farming environment remains pristine.' },
  { id:7,  name:'Contamination Check',    stat:'100% Screened',      desc:'Harvesting is a critical contamination risk point. Our field teams oversee the cutting and drying process, using dedicated clean tarpaulins and sterile equipment to ensure zero cross-contamination before the crop even reaches our processing facility.' },
  { id:8,  name:'Direct Container',       stat:'IPM-Only Loading',   desc:'IPM spices never touch conventional lots. They are processed on dedicated, sterilized machinery lines. We handle everything from cleaning to grading and packing under strict physical segregation to guarantee 100% pesticide-free purity.' },
  { id:9,  name:'SGS Pre-Shipment',       stat:'SGS Certified',      desc:'Trust but verify. Before any IPM lot is cleared for export, it undergoes rigorous third-party testing by agencies like SGS or Eurofins. Only when a lot clears 400+ pesticide residue parameters (compliant with strict EU and USFDA limits) is it approved for dispatch.' },
  { id:10, name:'Farm Traceability',      stat:'100% Traceable',     desc:'Total transparency is our promise. Buyers receive a complete digital chain of custody with every shipment. Scan the QR code to trace your spices back to the exact farm, complete with lab reports and harvest dates, satisfying major retail compliance standards.' },
];

const CSS = `
  @keyframes trackMove { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
  @keyframes gearSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes pulseLight { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  @keyframes ipm-slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ipm-popupReveal { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
  @keyframes scanRadar { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes floatVat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

  .track-anim { animation: trackMove 1.5s linear infinite; }
  .ipm-track-anim { animation: trackMove 1.5s linear infinite; }
  .gear-anim { animation: gearSpin 5s linear infinite; transform-box: fill-box; transform-origin: center; }
  .ipm-gear-anim { animation: gearSpin 5s linear infinite; transform-box: fill-box; transform-origin: center; }
  .light-pulse { animation: pulseLight 1.5s ease-in-out infinite; }
  .radar-spin { animation: scanRadar 3s linear infinite; transform-box: fill-box; transform-origin: center; }
  .vat-float { animation: floatVat 3s ease-in-out infinite; }

  @media (min-width: 800px) { .ipm-mobile { display:none !important; } }
  @media (max-width: 799px)  { .ipm-desktop { display:none !important; } }

  .ipm-modal-overlay {
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: ipm-slideUp 0.3s cubic-bezier(0.16,1,0.3,1);
  }
`;

function MachineFactory({ i, x, y, s, isActive, isHov, toggle, setHov }: { i:number, x:number, y:number, s:Station, isActive:boolean, isHov:boolean, toggle:()=>void, setHov:(n:number|null)=>void }) {
  const isFocus = isActive || isHov;
  const strokeColor = isFocus ? GREEN : INK;
  const strokeW = isFocus ? "2.5" : "1.5";
  const glow = isFocus ? "url(#ipm-glow)" : "none";

  return (
    <g onClick={toggle} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{cursor:'pointer'}} filter={glow}>
      
      {/* ── Base Connectors (Pipes to main track) ── */}
      <path d={`M${x-15},${y+40} L${x-15},${y+70} M${x+15},${y+40} L${x+15},${y+70}`} stroke={INK_L} strokeWidth="3" fill="none" strokeDasharray="5 5"/>
      <rect x={x-20} y={y+65} width="40" height="5" fill={INK}/>
      
      {/* ── Unique Machine Drawing per Step ── */}
      <g transform={`translate(${x}, ${y})`}>
        {i === 0 && ( /* Reg Kiosk */
          <g>
            <path d="M-30,40 L30,40 L20,-10 L-20,-10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-15" y="-30" width="30" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-15" y1="-20" x2="15" y2="-20" stroke={GREEN} strokeWidth="2" className="light-pulse"/>
            <path d="M-5,40 L-5,15 M5,40 L5,15" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="0" r="4" fill={strokeColor}/>
          </g>
        )}
        {i === 1 && ( /* Farm Drone / Radar */
          <g>
            <path d="M-20,40 L20,40 L10,10 L-10,10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M0,10 L0,-15" stroke={strokeColor} strokeWidth="4"/>
            <path d="M-20,-15 Q0,-35 20,-15" fill="none" stroke={strokeColor} strokeWidth="3"/>
            <circle cx="0" cy="-15" r="4" fill={GREEN} className="light-pulse"/>
            <line x1="-25" y1="-30" x2="25" y2="-30" stroke={strokeColor} strokeWidth="2" className="radar-spin" strokeDasharray="10 10"/>
          </g>
        )}
        {i === 2 && ( /* Mapping Table */
          <g>
            <path d="M-40,40 L40,40 L40,10 L-40,10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-40,10 L-30,-20 L30,-20 L40,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-25" y="-15" width="50" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-25,-5 Q0,-15 25,-5" fill="none" stroke={GREEN} strokeWidth="2"/>
            <circle cx="-10" cy="-10" r="2" fill={strokeColor}/>
            <circle cx="15" cy="-8" r="2" fill={strokeColor}/>
            <line x1="-20" y1="-15" x2="-20" y2="5" stroke={GREEN} strokeWidth="2" className="track-anim"/>
          </g>
        )}
        {i === 3 && ( /* Agronomist Microscope/Lab */
          <g>
            <path d="M-25,40 L25,40 L25,-10 L-25,-10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-15,-10 L-15,-25 Q0,-30 15,-15 L5,-5" fill="none" stroke={strokeColor} strokeWidth="4" strokeLinejoin="round"/>
            <circle cx="-15" cy="-25" r="4" fill={strokeColor}/>
            <rect x="-10" y="5" width="20" height="5" fill={strokeColor}/>
            <circle cx="15" cy="25" r="5" fill="none" stroke={GREEN} strokeWidth="2"/>
          </g>
        )}
        {i === 4 && ( /* Vault/Premium */
          <g>
            <circle cx="0" cy="5" r="35" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="5" r="25" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <g className="gear-anim">
              <path d="M-15,5 L15,5 M0,-10 L0,20 M-10,-5 L10,15 M10,-5 L-10,15" stroke={strokeColor} strokeWidth="3"/>
              <circle cx="0" cy="5" r="8" fill="#fff" stroke={strokeColor} strokeWidth="2"/>
            </g>
            <circle cx="0" cy="-30" r="5" fill={GREEN} className="light-pulse"/>
          </g>
        )}
        {i === 5 && ( /* Literature Press */
          <g>
            <path d="M-30,40 L30,40 L40,-10 L-40,-10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-20" y="-30" width="40" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-20" y1="-20" x2="20" y2="-20" stroke={strokeColor} strokeWidth="2" strokeDasharray="4 2"/>
            <path d="M-10,-10 L-10,20 M10,-10 L10,20" stroke={strokeColor} strokeWidth="2"/>
            <rect x="-15" y="5" width="30" height="15" fill="none" stroke={GREEN} strokeWidth="2"/>
            <line x1="-10" y1="10" x2="10" y2="10" stroke={GREEN} strokeWidth="1"/>
          </g>
        )}
        {i === 6 && ( /* Contamination Filter */
          <g className="vat-float">
            <path d="M-30,-20 L30,-20 L20,40 L-20,40 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-30,-20 Q0,-35 30,-20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-25" y1="0" x2="25" y2="0" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
            <line x1="-20" y1="20" x2="20" y2="20" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
            <path d="M0,40 L0,55" stroke={strokeColor} strokeWidth="4"/>
            <circle cx="0" cy="20" r="8" fill="none" stroke={GREEN} strokeWidth="2" className="radar-spin"/>
          </g>
        )}
        {i === 7 && ( /* Container Loader */
          <g>
            <path d="M-45,40 L-25,40 L-25,-30 L-35,-30 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-25,-20 L35,-20" fill="none" stroke={strokeColor} strokeWidth="6"/>
            <path d="M0,-20 L0,5" fill="none" stroke={strokeColor} strokeWidth="2" strokeDasharray="2 2"/>
            <rect x="-15" y="5" width="30" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-15" y1="15" x2="15" y2="15" stroke={strokeColor} strokeWidth="1"/>
            <circle cx="35" cy="-20" r="4" fill={GREEN} className="light-pulse"/>
          </g>
        )}
        {i === 8 && ( /* SGS Stamper */
          <g>
            <path d="M-35,40 L35,40 L35,10 L-35,10 Z" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-15,10 L-15,-20 L15,-20 L15,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-10" y="-10" width="20" height="15" fill={GREEN} stroke={strokeColor} strokeWidth="2"/>
            <path d="M0,-20 L0,-35 M-10,-35 L10,-35" stroke={strokeColor} strokeWidth="3"/>
            <circle cx="0" cy="25" r="5" fill="#fff" stroke={strokeColor} strokeWidth="2"/>
            <text x="0" y="28" textAnchor="middle" fill={GREEN} fontSize="7" fontFamily="monospace" fontWeight="bold">SGS</text>
          </g>
        )}
        {i === 9 && ( /* Traceability Antenna */
          <g>
            <rect x="-20" y="-10" width="40" height="50" rx="3" fill="#F4F8F4" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M0,-10 L0,-30 M-10,-20 L10,-40 M-15,-30 Q0,-45 15,-30" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="-30" r="3" fill={GREEN} className="light-pulse"/>
            <path d="M-10,10 L10,10 M-10,20 L10,20" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="35" r="4" fill={strokeColor}/>
          </g>
        )}
      </g>

      {/* Title block */}
      <rect x={x-50} y={y+85} width="100" height="20" rx="10" fill={isActive ? GREEN : '#f0f0f0'} />
      <text x={x} y={y+98} textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {s.name.toUpperCase()}
      </text>
      
      {/* Step Number Tag */}
      <circle cx={x-35} cy={y-45} r="10" fill={isActive ? GREEN : '#fff'} stroke={strokeColor} strokeWidth="1.5" />
      <text x={x-35} y={y-42} textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {String(s.id).padStart(2, '0')}
      </text>
    </g>
  );
}

export default function IPMProcessFlow() {
  const [active, setActive] = useState<number | null>(null);
  const [hov,    setHov]    = useState<number | null>(null);
  const station = active !== null ? STATIONS[active] : null;
  const toggle  = (i: number) => setActive(v => v === i ? null : i);

  const count = STATIONS.length; // 10

  /* ── Desktop Horizontal Zigzag ── */
  const dSX = [140, 320, 500, 680, 860, 1040, 1220, 1400, 1580, 1760];
  const dSY = Array.from({length: count}, (_, i) => i % 2 === 0 ? 120 : 250);
  const dTrackY = dSY.map(y => y + 70); // machine feet / track intersection
  const dSnakePath = `M${dSX[0]},${dTrackY[0]} ` + Array.from({length: count - 1}, (_, i) => {
    const x1 = dSX[i], y1 = dTrackY[i], x2 = dSX[i+1], y2 = dTrackY[i+1];
    const cp = (x2 - x1) / 2;
    return `C${x1+cp},${y1} ${x2-cp},${y2} ${x2},${y2}`;
  }).join(' ');
  const dRelayX = dSX.slice(0, count-1).map((x, i) => Math.round((x + dSX[i+1]) / 2));
  const dRelayY = dTrackY.slice(0, count-1).map((y, i) => Math.round((y + dTrackY[i+1]) / 2));

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
    return i % 2 === 0
      ? `C90,${y2} 260,${y2} 260,${y3}`
      : `C260,${y2} 90,${y2} 90,${y3}`;
  }).join(' ');

  return (
    <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,5vw,80px)', background:'#FAF9F6' }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 1600, margin:'0 auto' }}>

        <div style={{ textAlign:'center', marginBottom:50 }}>
          <div style={{ fontFamily:"'Courier New',monospace", fontSize:11, letterSpacing:'0.3em', textTransform:'uppercase', color:GREEN, marginBottom:16, fontWeight:700 }}>
            Mechanical IPM Engine
          </div>
          <h2 style={{ fontFamily:'var(--font-display),Georgia,serif', fontSize:'clamp(32px,4vw,56px)', fontWeight:800, color:INK, margin:'0 0 16px', letterSpacing:'-0.03em' }}>
            Automated Field Tracking
          </h2>
          <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:15, color:'rgba(0,0,0,0.5)', margin:0, maxWidth:600, marginLeft:'auto', marginRight:'auto' }}>
            Tap any module on our IPM control line to see how we guarantee absolute compliance.
          </p>
        </div>

        {/* DESKTOP — Horizontal Zigzag Assembly Line */}
        <div className="ipm-desktop">
          <div style={{ borderRadius:8, background:'#F0EEE5', border:'1px solid rgba(0,0,0,0.1)', overflow:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)',
              backgroundSize:'40px 40px' }}/>
            <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch', scrollbarWidth:'none', msOverflowStyle:'none', cursor:'grab' }}>
              <svg viewBox="0 0 1900 450" style={{ display:'block', minWidth:1900, width:'100%' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="ipm-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={GREEN} floodOpacity="0.3"/>
                  </filter>
                </defs>
                <path d={dSnakePath} fill="none" stroke="#E5E3D8" strokeWidth="18" strokeLinecap="round"/>
                <path d={dSnakePath} fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round"/>
                <path d={dSnakePath} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" className="ipm-track-anim"/>
                {dRelayX.map((cx, k) => (
                  <g key={k} transform={`translate(${cx}, ${dRelayY[k]})`} className="ipm-gear-anim">
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

        {/* MOBILE — Vertical Zigzag Assembly Line */}
        <div className="ipm-mobile">
          <div style={{ borderRadius:8, background:'#F0EEE5', border:'1px solid rgba(0,0,0,0.1)', overflow:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)',
              backgroundSize:'30px 30px' }}/>
            <svg viewBox={`0 0 360 ${160 + count * 220}`} style={{ display:'block', width:'100%', position:'relative', zIndex:2 }} xmlns="http://www.w3.org/2000/svg">
              <path d={mSnakePath} fill="none" stroke="#E5E3D8" strokeWidth="18" strokeLinecap="round"/>
              <path d={mSnakePath} fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round"/>
              <path d={mSnakePath} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" className="ipm-track-anim"/>
              {mRelayWheels.map(([cx,cy],k) => (
                <g key={k} transform={`translate(${cx}, ${cy})`} className="ipm-gear-anim">
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
                  isActive={active===i} isHov={hov===i}
                  toggle={() => toggle(i)} setHov={setHov}/>
              ))}
            </svg>
          </div>
        </div>

      </div>

      {station && (
        <div className="ipm-modal-overlay" onClick={()=>setActive(null)}>
          <div style={{
            background:'#fff', borderRadius:0, border:`2px solid ${INK}`,
            padding:'clamp(32px,5vw,48px)', maxWidth:540, width:'100%',
            boxShadow:`8px 8px 0px ${GREEN}`,
            animation:'ipm-popupReveal 0.3s cubic-bezier(0.16,1,0.3,1)',
            position:'relative',
          }} onClick={e => e.stopPropagation()}>
            <button onClick={()=>setActive(null)} style={{
              position:'absolute', top:20, right:20, background:INK, border:'none',
              fontSize:24, color:'#fff', cursor:'pointer', width:40, height:40,
              display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s',
            }}
              onMouseEnter={e=>(e.currentTarget.style.background=GREEN)}
              onMouseLeave={e=>(e.currentTarget.style.background=INK)}
            >×</button>
            <div style={{ display:'flex', gap:20, alignItems:'center', marginBottom:24 }}>
              <div style={{
                flexShrink:0, width:60, height:60, background:'#fff', border:`2px solid ${INK}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'monospace', fontSize:22, fontWeight:800, color:INK,
                boxShadow:`4px 4px 0px ${GREEN}`
              }}>
                {String(station.id).padStart(2,'0')}
              </div>
              <div>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:GREEN, marginBottom:6, fontWeight:700 }}>
                  {station.stat}
                </div>
                <div style={{ fontFamily:'Georgia,serif', fontSize:'clamp(22px,3vw,28px)', fontWeight:800, color:INK, lineHeight:1.1 }}>
                  {station.name}
                </div>
              </div>
            </div>
            <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:15, color:'rgba(0,0,0,0.7)', lineHeight:1.8, margin:0 }}>
              {station.desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
