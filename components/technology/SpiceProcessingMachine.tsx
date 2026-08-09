'use client';

import { useState } from 'react';

const INK    = '#1A0800';
const INK_L  = '#1A0800';
const CRIMSON = '#111111';

interface StationData {
  id: number;
  icon: string;
  name: string;
  stat: string;
  desc: string;
  accent: string;
}

const STATIONS: StationData[] = [
  { id:1, icon:'🌾', name:'Seed Cleaning',        stat:'1–3 Tons / Hr',      accent:'#8B6914', desc:'Advanced multi-deck vibro sieves meticulously remove farm admixtures, allergens, and ferrous/non-ferrous contaminants. Our line utilizes gravity separators and A+ Multivision Sortex with inline Metal Detectors for absolute purity.' },
  { id:2, icon:'🔍', name:'Optical Sorting',       stat:'50,000 Seeds / Sec', accent:'#333333', desc:'High-speed Buhler Sortex camera arrays scan 50,000+ seeds per second. Discoloured, damaged, or foreign grains are rejected via precision air ejectors in real-time, ensuring 99.9% product purity.' },
  { id:3, icon:'🔥', name:'Drum Roasting',          stat:'4,000 Mts / Yr',    accent:'#C44B00', desc:'Precision temperature-controlled drum roasting at 4,000 MT/year capacity. This controlled thermal process develops complex, authentic flavor profiles while retaining maximum ASTA colour and essential volatile oils.' },
  { id:4, icon:'♨️', name:'Steam Sterilization',   stat:'5-Log Reduction',   accent:'#2E7D6E', desc:'FDA-compliant, validated 5-log microbial reduction via indirect high-temperature steam (HTST). No chemical treatments used, preserving full organoleptic properties. Packed directly in Class 100,000 HEPA-filtered clean rooms.' },
  { id:5, icon:'❄️', name:'Cryogenic Grinding',    stat:'−196 °C',            accent:'#333333', desc:'Milling at −196°C (liquid nitrogen temperature) preserves up to 40% more essential oils than conventional ambient grinding. This zero-oxidation process locks in color, peak aroma, and maximum pungency.' },
  { id:6, icon:'⚙️', name:'CFG Technology',        stat:'FDA 21 CFR',         accent:CRIMSON,   desc:"India's most advanced Continuous Flow Grinding (CFG) systems. Precision micron-level milling equipped with inline quality monitoring, real-time sensor feedback, and full FDA FSMA validation compliance." },
];

/* ═══════ CSS Keyframes ═══════════════════════════════════════════ */
const CSS = `
  @keyframes beltRoll   { to { stroke-dashoffset: -48; } }
  @keyframes gearCW     { to { transform: rotate(360deg);  } }
  @keyframes gearCCW    { to { transform: rotate(-360deg); } }
  @keyframes steamUp    { 0%{opacity:.65;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-42px) scale(1.5)} }
  @keyframes flameDance { 0%,100%{transform:scaleX(1) scaleY(1)} 30%{transform:scaleX(.85) scaleY(1.18)} 60%{transform:scaleX(1.1) scaleY(.92)} }
  @keyframes snowSpin   { to { transform: rotate(360deg); } }
  @keyframes scanBlink  { 0%,100%{opacity:.8} 50%{opacity:.15} }
  @keyframes drumLines  { to { stroke-dashoffset: -40; } }
  @keyframes slideUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes sackWobble { 0%,100%{transform:rotate(0deg)} 30%{transform:rotate(-1.5deg)} 70%{transform:rotate(1.5deg)} }
  @keyframes scrollHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }

  .belt-roll   { animation: beltRoll   1.1s linear infinite; }
  .drum-lines  { animation: drumLines  2s   linear infinite; }
  .gear-cw     { animation: gearCW     4s   linear infinite; transform-box:fill-box; transform-origin:center; }
  .gear-ccw    { animation: gearCCW    4s   linear infinite; transform-box:fill-box; transform-origin:center; }
  .gear-fast   { animation: gearCW     2s   linear infinite; transform-box:fill-box; transform-origin:center; }
  .gear-fast2  { animation: gearCCW    2s   linear infinite; transform-box:fill-box; transform-origin:center; }
  .steam-a     { animation: steamUp    2s   ease-out infinite; }
  .steam-b     { animation: steamUp    2s   ease-out .65s infinite; }
  .steam-c     { animation: steamUp    2s   ease-out 1.3s infinite; }
  .flame-a     { animation: flameDance .7s  ease-in-out infinite alternate; transform-box:fill-box; transform-origin:bottom center; }
  .flame-b     { animation: flameDance .55s ease-in-out infinite alternate-reverse; transform-box:fill-box; transform-origin:bottom center; }
  .snow-spin   { animation: snowSpin   7s   linear infinite; transform-box:fill-box; transform-origin:center; }
  .scan-line   { animation: scanBlink  1.3s ease-in-out infinite; }
  .sack-anim   { animation: sackWobble 3s   ease-in-out infinite; transform-box:fill-box; transform-origin:bottom center; }
  .scroll-hint { animation: scrollHint 1.5s ease-in-out infinite; }

  /* Desktop: show SVG, hide mobile cards */
  @media (min-width: 700px) { .pm-mobile { display:none !important; } }
  /* Mobile: hide SVG shell, show cards */
  @media (max-width: 699px) { .pm-desktop { display:none !important; } }
`;

/* ── Gear ─────────────────────────────────────────────────────── */
function Gear({ cx, cy, r=18, cls='gear-cw' }: { cx:number; cy:number; r?:number; cls?:string }) {
  return (
    <g className={cls}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth="2"
        strokeDasharray={`${Math.PI*r/5.5} ${Math.PI*r/11}`} />
      <circle cx={cx} cy={cy} r={r*.5} fill={INK} fillOpacity=".08" stroke={INK} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r*.22} fill={INK} fillOpacity=".3" />
    </g>
  );
}

/* ── Flame ────────────────────────────────────────────────────── */
function Flame({ x, y, alt=false }: { x:number; y:number; alt?:boolean }) {
  const c = alt ? 'flame-b' : 'flame-a';
  return (
    <g className={c}>
      <path d={`M${x},${y} C${x-4},${y-10} ${x+4},${y-18} ${x},${y-26}`}
        fill="none" stroke='#111111' strokeWidth="2.5" strokeLinecap="round" />
      <path d={`M${x},${y} C${x-2},${y-8} ${x+2},${y-14} ${x},${y-20}`}
        fill="none" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

/* ── Snowflake ────────────────────────────────────────────────── */
function Snowflake({ cx, cy, r=18 }: { cx:number; cy:number; r?:number }) {
  return (
    <g className="snow-spin" style={{ transformOrigin:`${cx}px ${cy}px` }}>
      {[0,1,2,3,4,5].map(i => {
        const a = i*60*Math.PI/180;
        const x2=cx+r*Math.cos(a), y2=cy+r*Math.sin(a);
        const bx1=cx+(r*.55)*Math.cos(a)+4*Math.cos(a+Math.PI/2), by1=cy+(r*.55)*Math.sin(a)+4*Math.sin(a+Math.PI/2);
        const bx2=cx+(r*.55)*Math.cos(a)-4*Math.cos(a+Math.PI/2), by2=cy+(r*.55)*Math.sin(a)-4*Math.sin(a+Math.PI/2);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#A8CCE8" strokeWidth="1.5" />
            <line x1={bx1} y1={by1} x2={bx2} y2={by2} stroke="#A8CCE8" strokeWidth="1.5" />
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="4" fill="none" stroke="#A8CCE8" strokeWidth="1.5" />
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════════════ */
export default function SpiceProcessingMachine() {
  const [active, setActive] = useState<number | null>(null);
  const [hov, setHov]       = useState<number | null>(null);
  const station = active !== null ? STATIONS[active] : null;

  const toggle = (i: number) => setActive(v => v === i ? null : i);

  return (
    <section style={{ padding: 'clamp(72px,9vw,120px) clamp(24px,5vw,80px)', background: '#F8F6F1' }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>

        {/* ── Heading ─────────────────────────────────────────── */}
        <div style={{ textAlign:'center', marginBottom: 40 }}>
          <div style={{ fontFamily:"'Courier New',monospace", fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:CRIMSON, marginBottom:12 }}>
            Interactive Diagram
          </div>
          <h2 style={{ fontFamily:'var(--font-display),Georgia,serif', fontSize:'clamp(28px,4vw,52px)', fontWeight:800, color:'#111', margin:'0 0 10px', letterSpacing:'-0.03em' }}>
            The Processing Line
          </h2>
          <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:13.5, color:'rgba(0,0,0,0.42)', margin:0 }}>
            Tap any machine to learn more
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════
            DESKTOP — Scrollable SVG diagram
        ═══════════════════════════════════════════════════════ */}
        <div className="pm-desktop">
          {/* Paper card wrapper */}
          <div style={{
            borderRadius: 24,
            background: 'radial-gradient(ellipse at 30% 20%, #fdf8ec 0%, #f5edda 55%, #ede0c4 100%)',
            border: '1px solid rgba(160,130,80,0.2)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04) inset, 0 24px 60px -20px rgba(0,0,0,0.11), 0 0 0 1px rgba(255,255,255,0.6) inset',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Grid overlay */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:`linear-gradient(rgba(100,80,40,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(100,80,40,0.06) 1px,transparent 1px)`,
              backgroundSize:'28px 28px' }} />
            {/* Vignette */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              background:'radial-gradient(ellipse at center,transparent 55%,rgba(160,120,60,0.1) 100%)' }} />

            {/* Horizontal scroll container */}
            <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch', scrollbarWidth:'none',
              msOverflowStyle:'none' }}>
              <svg
                viewBox="0 0 1260 490"
                style={{ display:'block', minWidth:1000, width:'100%' }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="msh" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor={INK} floodOpacity="0.1" />
                  </filter>
                  <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill={INK_L} />
                  </marker>
                </defs>

                {/* Sub-title */}
                <text x="630" y="42" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="10" letterSpacing="4" fill={INK_L}>
                  SEED TO SHELF — CONTINUOUS PROCESSING LINE
                </text>

                {/* ── BELT ── */}
                <rect x="80"  y="356" width="1100" height="7"  rx="3.5" fill={INK} fillOpacity=".07" stroke={INK} strokeWidth="1.5" />
                <rect x="80"  y="374" width="1100" height="20" rx="10"  fill="none" stroke={INK} strokeWidth="2.2" />
                <line x1="90" y1="384" x2="1170" y2="384" stroke={INK_L} strokeWidth="10" strokeDasharray="22 10" className="belt-roll" />
                <circle cx="90"   cy="384" r="14" fill="none" stroke={INK} strokeWidth="2" />
                <circle cx="90"   cy="384" r="5"  fill={INK}  fillOpacity=".2" />
                <circle cx="1170" cy="384" r="14" fill="none" stroke={INK} strokeWidth="2" />
                <circle cx="1170" cy="384" r="5"  fill={INK}  fillOpacity=".2" />
                {[210,420,632,842,1053].map(x => (
                  <g key={x}>
                    <line x1={x}    y1="394" x2={x-8}  y2="428" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                    <line x1={x+22} y1="394" x2={x+30} y2="428" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                    <line x1={x-12} y1="428" x2={x+34} y2="428" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                ))}

                {/* ── INPUT SACK ── */}
                <g className="sack-anim" style={{ transformOrigin:'38px 400px' }}>
                  <path d="M16,336 Q8,354 12,384 Q16,404 38,404 Q60,404 64,384 Q68,354 60,336 Q50,328 38,330 Q26,328 16,336 Z"
                    fill="#EDE0C4" stroke={INK} strokeWidth="2.2" />
                  <path d="M22,340 Q38,332 54,340" fill="none" stroke={INK} strokeWidth="2" />
                  {[358,374,390].map(y => (
                    <path key={y} d={`M22,${y} Q38,${y+6} 54,${y}`} fill="none" stroke={INK_L} strokeWidth="1" />
                  ))}
                </g>
                <text x="38" y="422" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7.5" fill={INK_L} letterSpacing=".08em">RAW SPICES</text>
                <path d="M60,374 Q76,362 88,352" fill="none" stroke={INK} strokeWidth="1.5" />

                {/* ── MACHINE 1 — SEED CLEANER ── */}
                <g onClick={()=>toggle(0)} onMouseEnter={()=>setHov(0)} onMouseLeave={()=>setHov(null)} style={{cursor:'pointer'}}>
                  <rect x="104" y="238" width="122" height="112" rx="7" fill="#F5EDD8" stroke={INK} strokeWidth="2.4" filter="url(#msh)" />
                  {hov===0&&<rect x="104" y="238" width="122" height="112" rx="7" fill={STATIONS[0].accent} fillOpacity=".06" />}
                  {active===0&&<rect x="104" y="238" width="122" height="112" rx="7" fill={STATIONS[0].accent} fillOpacity=".09" stroke={STATIONS[0].accent} strokeWidth="2.5" />}
                  {[0,1,2,3,4].map(i=>(
                    <line key={i} x1="112" y1={252+i*17} x2="218" y2={252+i*17} stroke={INK_L} strokeWidth="1" strokeDasharray="5 3" />
                  ))}
                  <path d="M97,265 Q93,272 97,279 Q101,286 97,293" fill="none" stroke={INK} strokeWidth="1.5" />
                  <path d="M233,265 Q237,272 233,279 Q229,286 233,293" fill="none" stroke={INK} strokeWidth="1.5" />
                  <path d="M134,224 L124,238 L202,238 L192,224 Z" fill="none" stroke={INK} strokeWidth="2" />
                  <path d="M124,350 L106,348" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
                  <text x="118" y="254" fontFamily="Georgia,serif" fontSize="11" fill={CRIMSON} fontWeight="700">01</text>
                  <text x="165" y="300" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="8" fill={INK} letterSpacing=".1em">VIBRO</text>
                  <text x="165" y="312" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="8" fill={INK} letterSpacing=".1em">CLEANER</text>
                  <Gear cx={232} cy={280} r={18} cls="gear-cw" />
                  <text x="165" y="455" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9.5" fontWeight="700" fill={active===0?STATIONS[0].accent:INK_L} letterSpacing=".07em">SEED CLEANING</text>
                </g>

                <path d="M232,290 L268,290" stroke={INK_L} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arr)" />

                {/* ── MACHINE 2 — OPTICAL SORTER ── */}
                <g onClick={()=>toggle(1)} onMouseEnter={()=>setHov(1)} onMouseLeave={()=>setHov(null)} style={{cursor:'pointer'}}>
                  <path d="M268,220 L396,220 L374,350 L290,350 Z" fill="#F5EDD8" stroke={INK} strokeWidth="2.4" filter="url(#msh)" />
                  {hov===1&&<path d="M268,220 L396,220 L374,350 L290,350 Z" fill={STATIONS[1].accent} fillOpacity=".06" />}
                  {active===1&&<path d="M268,220 L396,220 L374,350 L290,350 Z" fill={STATIONS[1].accent} fillOpacity=".09" stroke={STATIONS[1].accent} strokeWidth="2.5" />}
                  <circle cx="332" cy="270" r="30" fill="none" stroke={INK} strokeWidth="2" />
                  <circle cx="332" cy="270" r="21" fill="none" stroke={INK} strokeWidth="1.5" />
                  <circle cx="332" cy="270" r="13" fill={INK} fillOpacity=".1" stroke={INK} strokeWidth="1.5" />
                  <circle cx="332" cy="270" r="5.5" fill={INK} fillOpacity=".4" />
                  <circle cx="336" cy="266" r="2.5" fill="white" fillOpacity=".65" />
                  <line x1="276" y1="246" x2="388" y2="246" stroke={CRIMSON} strokeWidth="1.5" strokeOpacity=".75" className="scan-line" />
                  <line x1="280" y1="306" x2="381" y2="316" stroke={INK_L} strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="280" y1="320" x2="381" y2="328" stroke={INK_L} strokeWidth="1" strokeDasharray="3 3" />
                  {[0,1,2].map(i=>(<rect key={i} x="387" y={302+i*12} width="9" height="6" rx="2" fill={INK} fillOpacity=".2" stroke={INK} strokeWidth="1" />))}
                  <text x="274" y="238" fontFamily="Georgia,serif" fontSize="11" fill={CRIMSON} fontWeight="700">02</text>
                  <text x="332" y="455" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9.5" fontWeight="700" fill={active===1?STATIONS[1].accent:INK_L} letterSpacing=".07em">OPTICAL SORTER</text>
                </g>

                <path d="M395,290 L436,290" stroke={INK_L} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arr)" />

                {/* ── MACHINE 3 — DRUM ROASTER ── */}
                <g onClick={()=>toggle(2)} onMouseEnter={()=>setHov(2)} onMouseLeave={()=>setHov(null)} style={{cursor:'pointer'}}>
                  <ellipse cx="510" cy="248" rx="58" ry="17" fill="#F5EDD8" stroke={INK} strokeWidth="2.2" />
                  <rect x="452" y="248" width="116" height="90" fill="#F5EDD8" stroke={INK} strokeWidth="2.4" />
                  {hov===2&&<rect x="452" y="248" width="116" height="90" fill={STATIONS[2].accent} fillOpacity=".06" />}
                  {active===2&&<rect x="452" y="248" width="116" height="90" fill={STATIONS[2].accent} fillOpacity=".09" stroke={STATIONS[2].accent} strokeWidth="2.5" />}
                  {[510,476,544].map(x=>(
                    <line key={x} x1={x} y1="248" x2={x} y2="338" stroke={INK_L} strokeWidth="1.5" strokeDasharray="8 6" className="drum-lines" />
                  ))}
                  <ellipse cx="510" cy="338" rx="58" ry="17" fill="#EDE0C4" stroke={INK} strokeWidth="2" />
                  <line x1="466" y1="338" x2="459" y2="353" stroke={INK} strokeWidth="3" strokeLinecap="round" />
                  <line x1="554" y1="338" x2="561" y2="353" stroke={INK} strokeWidth="3" strokeLinecap="round" />
                  <rect x="462" y="353" width="96" height="9" rx="4" fill={INK} fillOpacity=".15" stroke={INK} strokeWidth="1.5" />
                  {[0,1,2,3,4,5].map(i=>(<Flame key={i} x={470+i*13} y={353} alt={i%2===0} />))}
                  <path d="M452,272 Q447,262 452,252" fill="none" stroke={INK_L} strokeWidth="1.5" markerEnd="url(#arr)" />
                  <text x="457" y="263" fontFamily="Georgia,serif" fontSize="11" fill={CRIMSON} fontWeight="700">03</text>
                  <text x="510" y="290" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7.5" fill={INK} letterSpacing=".1em">ROASTING</text>
                  <text x="510" y="455" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9.5" fontWeight="700" fill={active===2?STATIONS[2].accent:INK_L} letterSpacing=".07em">DRUM ROASTER</text>
                </g>

                <path d="M568,290 L608,290" stroke={INK_L} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arr)" />

                {/* ── MACHINE 4 — STEAM STERILIZER ── */}
                <g onClick={()=>toggle(3)} onMouseEnter={()=>setHov(3)} onMouseLeave={()=>setHov(null)} style={{cursor:'pointer'}}>
                  <rect x="612" y="230" width="122" height="118" rx="8" fill="#F5EDD8" stroke={INK} strokeWidth="2.4" filter="url(#msh)" />
                  {hov===3&&<rect x="612" y="230" width="122" height="118" rx="8" fill={STATIONS[3].accent} fillOpacity=".06" />}
                  {active===3&&<rect x="612" y="230" width="122" height="118" rx="8" fill={STATIONS[3].accent} fillOpacity=".09" stroke={STATIONS[3].accent} strokeWidth="2.5" />}
                  <rect x="620" y="238" width="106" height="102" rx="5" fill="none" stroke={INK_L} strokeWidth="1" strokeDasharray="3 3" />
                  {[0,1,2].map(i=>(<rect key={i} x={626+i*30} y="222" width="15" height="10" rx="3" fill={INK} fillOpacity=".2" stroke={INK} strokeWidth="1.5" />))}
                  {/* Steam puffs */}
                  {[0,1,2].map(i=>(
                    <g key={i} className={['steam-a','steam-b','steam-c'][i]} style={{ transformOrigin:`${633+i*30}px 214px` }}>
                      <ellipse cx={633+i*30} cy="210" rx="5" ry="4" fill={INK} fillOpacity=".22" />
                    </g>
                  ))}
                  {/* Pressure gauge */}
                  <circle cx="673" cy="292" r="25" fill="none" stroke={INK} strokeWidth="1.5" />
                  <path d="M654,292 A19,19 0 0,1 692,292" fill="none" stroke={INK_L} strokeWidth="1" />
                  {[-80,-40,0,40,80].map((deg,i)=>{
                    const r=(deg-90)*Math.PI/180;
                    return <line key={i} x1={673+17*Math.cos(r)} y1={292+17*Math.sin(r)} x2={673+22*Math.cos(r)} y2={292+22*Math.sin(r)} stroke={INK_L} strokeWidth="1" />;
                  })}
                  <line x1="673" y1="292" x2={673+17*Math.cos((-15)*Math.PI/180)} y2={292+17*Math.sin((-15)*Math.PI/180)} stroke={CRIMSON} strokeWidth="2" strokeLinecap="round" />
                  <circle cx="673" cy="292" r="3" fill={INK} />
                  <text x="673" y="312" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7" fill={INK_L}>PSI</text>
                  <text x="620" y="248" fontFamily="Georgia,serif" fontSize="11" fill={CRIMSON} fontWeight="700">04</text>
                  <text x="673" y="455" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9.5" fontWeight="700" fill={active===3?STATIONS[3].accent:INK_L} letterSpacing=".05em">STEAM STERILIZER</text>
                </g>

                <path d="M734,290 L774,290" stroke={INK_L} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arr)" />

                {/* ── MACHINE 5 — CRYO GRINDER ── */}
                <g onClick={()=>toggle(4)} onMouseEnter={()=>setHov(4)} onMouseLeave={()=>setHov(null)} style={{cursor:'pointer'}}>
                  <rect x="778" y="222" width="124" height="130" rx="10" fill="#E8F4FB" stroke={INK} strokeWidth="2.4" filter="url(#msh)" />
                  {hov===4&&<rect x="778" y="222" width="124" height="130" rx="10" fill={STATIONS[4].accent} fillOpacity=".06" />}
                  {active===4&&<rect x="778" y="222" width="124" height="130" rx="10" fill={STATIONS[4].accent} fillOpacity=".09" stroke={STATIONS[4].accent} strokeWidth="2.5" />}
                  <rect x="787" y="231" width="106" height="112" rx="7" fill="none" stroke="#A8CCE8" strokeWidth="1.5" />
                  <rect x="792" y="236" width="96" height="102" rx="5" fill="rgba(200,228,255,0.2)" />
                  <text x="840" y="266" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="16" fontWeight="700" fill="#333333">−196°C</text>
                  <text x="840" y="282" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7" fill="#333333" letterSpacing=".06em">CRYOGENIC GRINDING</text>
                  <Snowflake cx={840} cy={308} r={20} />
                  <path d="M778,246 Q762,246 762,260 Q762,274 778,274" fill="none" stroke="#A8CCE8" strokeWidth="3" strokeLinecap="round" />
                  <text x="748" y="244" fontFamily="'Courier New',monospace" fontSize="7.5" fill="#333333">LN₂</text>
                  {[0,1,2,3].map(i=>(<text key={i} x={795+i*22} y="336" fontSize="9" fill="#A8CCE8" opacity=".65">✦</text>))}
                  <text x="788" y="240" fontFamily="Georgia,serif" fontSize="11" fill={CRIMSON} fontWeight="700">05</text>
                  <text x="840" y="455" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9.5" fontWeight="700" fill={active===4?STATIONS[4].accent:INK_L} letterSpacing=".05em">CRYO GRINDER</text>
                </g>

                <path d="M902,290 L942,290" stroke={INK_L} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arr)" />

                {/* ── MACHINE 6 — CFG ── */}
                <g onClick={()=>toggle(5)} onMouseEnter={()=>setHov(5)} onMouseLeave={()=>setHov(null)} style={{cursor:'pointer'}}>
                  <rect x="946" y="218" width="152" height="134" rx="8" fill="#F5EDD8" stroke={INK} strokeWidth="2.4" filter="url(#msh)" />
                  {hov===5&&<rect x="946" y="218" width="152" height="134" rx="8" fill={STATIONS[5].accent} fillOpacity=".06" />}
                  {active===5&&<rect x="946" y="218" width="152" height="134" rx="8" fill={STATIONS[5].accent} fillOpacity=".09" stroke={STATIONS[5].accent} strokeWidth="2.5" />}
                  {[0,1,2].map(i=>(
                    <g key={i}>
                      <ellipse cx="1023" cy={240+i*35} rx="44" ry="11" fill="none" stroke={INK} strokeWidth="1.5" />
                      <line x1="979" y1={240+i*35} x2="1067" y2={240+i*35} stroke={INK_L} strokeWidth="1" strokeDasharray="6 4" className="drum-lines" />
                    </g>
                  ))}
                  <path d="M1098,298 L1130,288 L1136,312 L1104,318 Z" fill={INK} fillOpacity=".12" stroke={INK} strokeWidth="2" />
                  <Gear cx={1076} cy={230} r={14} cls="gear-fast" />
                  <Gear cx={1100} cy={230} r={10} cls="gear-fast2" />
                  <text x="990" y="346" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7" fill={INK_L} letterSpacing=".05em">CONTINUOUS FLOW GRINDING</text>
                  <text x="955" y="236" fontFamily="Georgia,serif" fontSize="11" fill={CRIMSON} fontWeight="700">06</text>
                  <text x="1022" y="455" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9.5" fontWeight="700" fill={active===5?STATIONS[5].accent:INK_L} letterSpacing=".05em">CFG TECHNOLOGY</text>
                </g>

                {/* ── OUTPUT JAR ── */}
                <path d="M1150,335 Q1142,332 1142,350 L1142,396 Q1142,409 1155,409 L1177,409 Q1190,409 1190,396 L1190,350 Q1190,332 1182,335 Z"
                  fill="none" stroke={INK} strokeWidth="2" />
                <ellipse cx="1166" cy="335" rx="18" ry="7" fill="none" stroke={INK} strokeWidth="2" />
                <rect x="1143" y="323" width="46" height="14" rx="4" fill={INK} fillOpacity=".15" stroke={INK} strokeWidth="1.5" />
                <rect x="1146" y="354" width="40" height="40" rx="4" fill="rgba(255,255,255,0.65)" stroke={INK_L} strokeWidth="1" />
                <text x="1166" y="369" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill={INK} fontWeight="700">LV</text>
                <text x="1166" y="381" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6.5" fill={INK_L}>SPICES</text>
                <text x="1166" y="424" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7.5" fill={INK_L}>FINISHED PRODUCT</text>
              </svg>
            </div>

            {/* Scroll hint for smaller desktop */}
            <div style={{ textAlign:'center', padding:'8px 16px 14px', fontFamily:"'Courier New',monospace", fontSize:9, color:INK_L, letterSpacing:'0.14em', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
              <span className="scroll-hint">›</span>
              {active === null ? 'CLICK ANY MACHINE TO LEARN MORE' : 'CLICK AGAIN TO DESELECT'}
              <span className="scroll-hint" style={{ transform:'scaleX(-1)', display:'inline-block' }}>›</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            MOBILE — Tappable step cards (< 700px)
        ═══════════════════════════════════════════════════════ */}
        <div className="pm-mobile">
          {/* Animated mini-machine cards */}
          <div style={{ display:'flex', gap:14, overflowX:'auto', scrollSnapType:'x mandatory', padding:'4px 2px 20px', scrollbarWidth:'none' }}>
            {STATIONS.map((s, i) => (
              <div key={s.id} onClick={() => toggle(i)} style={{
                minWidth: 170, borderRadius: 20,
                background: active===i ? `${s.accent}12` : 'radial-gradient(ellipse at 30% 20%,#fdf8ec 0%,#f5edda 55%,#ede0c4 100%)',
                border: `1.5px solid ${active===i ? s.accent : 'rgba(160,130,80,0.25)'}`,
                cursor:'pointer', flexShrink:0, scrollSnapAlign:'start',
                transition:'all 0.25s',
                boxShadow: active===i ? `0 6px 24px ${s.accent}35` : '0 2px 10px rgba(0,0,0,0.07)',
                overflow:'hidden',
              }}>
                {/* Animated mini SVG machine */}
                <div style={{ background:'radial-gradient(ellipse at 30% 20%,#fdf8ec 0%,#f5edda 55%,#ede0c4 100%)', borderBottom:'1px solid rgba(160,130,80,0.15)', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', inset:0, pointerEvents:'none',
                    backgroundImage:`linear-gradient(rgba(100,80,40,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(100,80,40,0.05) 1px,transparent 1px)`,
                    backgroundSize:'20px 20px' }} />
                  {/* Mini machine SVGs */}
                  {s.id===1 && (
                    <svg viewBox="0 0 170 130" style={{ width:'100%', display:'block' }}>
                      {/* Belt */}
                      <rect x="10" y="100" width="150" height="12" rx="6" fill="none" stroke={INK} strokeWidth="1.5" />
                      <line x1="16" y1="106" x2="154" y2="106" stroke={INK_L} strokeWidth="6" strokeDasharray="14 7" className="belt-roll" />
                      {/* Machine */}
                      <rect x="40" y="35" width="90" height="67" rx="5" fill="#F5EDD8" stroke={INK} strokeWidth="1.8" />
                      {[0,1,2,3].map(j=>(<line key={j} x1="48" y1={47+j*13} x2="122" y2={47+j*13} stroke={INK_L} strokeWidth=".8" strokeDasharray="4 3" />))}
                      <path d="M44,52 Q41,58 44,64 Q47,70 44,76" fill="none" stroke={INK} strokeWidth="1.2" />
                      <path d="M126,52 Q129,58 126,64 Q123,70 126,76" fill="none" stroke={INK} strokeWidth="1.2" />
                      <path d="M60,24 L52,35 L118,35 L110,24 Z" fill="none" stroke={INK} strokeWidth="1.5" />
                      <Gear cx={131} cy={70} r={13} cls="gear-cw" />
                      <text x="85" y="78" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6.5" fill={INK} letterSpacing=".1em">VIBRO CLEANER</text>
                      <text x="85" y="122" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6" fill={INK_L}>01</text>
                    </svg>
                  )}
                  {s.id===2 && (
                    <svg viewBox="0 0 170 130" style={{ width:'100%', display:'block' }}>
                      <rect x="10" y="100" width="150" height="12" rx="6" fill="none" stroke={INK} strokeWidth="1.5" />
                      <line x1="16" y1="106" x2="154" y2="106" stroke={INK_L} strokeWidth="6" strokeDasharray="14 7" className="belt-roll" />
                      <path d="M35,22 L135,22 L118,100 L52,100 Z" fill="#F5EDD8" stroke={INK} strokeWidth="1.8" />
                      <circle cx="85" cy="55" r="24" fill="none" stroke={INK} strokeWidth="1.5" />
                      <circle cx="85" cy="55" r="16" fill="none" stroke={INK} strokeWidth="1" />
                      <circle cx="85" cy="55" r="9" fill={INK} fillOpacity=".1" stroke={INK} strokeWidth="1" />
                      <circle cx="85" cy="55" r="4" fill={INK} fillOpacity=".35" />
                      <circle cx="88" cy="52" r="2" fill="white" fillOpacity=".65" />
                      <line x1="40" y1="36" x2="130" y2="36" stroke={CRIMSON} strokeWidth="1.2" strokeOpacity=".8" className="scan-line" />
                      <text x="85" y="122" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6" fill={INK_L}>02</text>
                    </svg>
                  )}
                  {s.id===3 && (
                    <svg viewBox="0 0 170 130" style={{ width:'100%', display:'block' }}>
                      <rect x="10" y="100" width="150" height="12" rx="6" fill="none" stroke={INK} strokeWidth="1.5" />
                      <line x1="16" y1="106" x2="154" y2="106" stroke={INK_L} strokeWidth="6" strokeDasharray="14 7" className="belt-roll" />
                      <ellipse cx="85" cy="30" rx="45" ry="12" fill="#F5EDD8" stroke={INK} strokeWidth="1.8" />
                      <rect x="40" y="30" width="90" height="58" fill="#F5EDD8" stroke={INK} strokeWidth="1.8" />
                      {[85,60,110].map(x=>(<line key={x} x1={x} y1="30" x2={x} y2="88" stroke={INK_L} strokeWidth="1" strokeDasharray="6 4" className="drum-lines" />))}
                      <ellipse cx="85" cy="88" rx="45" ry="12" fill="#EDE0C4" stroke={INK} strokeWidth="1.5" />
                      <rect x="43" y="88" width="84" height="7" rx="3" fill={INK} fillOpacity=".14" stroke={INK} strokeWidth="1.2" />
                      {[0,1,2,3,4].map(j=>(<Flame key={j} x={52+j*12} y={88} alt={j%2===0} />))}
                      <text x="85" y="122" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6" fill={INK_L}>03</text>
                    </svg>
                  )}
                  {s.id===4 && (
                    <svg viewBox="0 0 170 130" style={{ width:'100%', display:'block' }}>
                      <rect x="10" y="100" width="150" height="12" rx="6" fill="none" stroke={INK} strokeWidth="1.5" />
                      <line x1="16" y1="106" x2="154" y2="106" stroke={INK_L} strokeWidth="6" strokeDasharray="14 7" className="belt-roll" />
                      <rect x="38" y="35" width="94" height="66" rx="6" fill="#F5EDD8" stroke={INK} strokeWidth="1.8" />
                      <rect x="45" y="42" width="80" height="52" rx="4" fill="none" stroke={INK_L} strokeWidth="1" strokeDasharray="2 2" />
                      {[0,1,2].map(j=>(<rect key={j} x={50+j*22} y="26" width="12" height="10" rx="2" fill={INK} fillOpacity=".18" stroke={INK} strokeWidth="1.2" />))}
                      {[0,1,2].map(j=>(
                        <g key={j} className={['steam-a','steam-b','steam-c'][j]} style={{ transformOrigin:`${56+j*22}px 22px` }}>
                          <ellipse cx={56+j*22} cy="19" rx="4" ry="3" fill={INK} fillOpacity=".2" />
                        </g>
                      ))}
                      {/* mini gauge */}
                      <circle cx="85" cy="68" r="18" fill="none" stroke={INK} strokeWidth="1.2" />
                      <line x1="85" y1="68" x2="95" y2="60" stroke={CRIMSON} strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="85" cy="68" r="2.5" fill={INK} />
                      <text x="85" y="122" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6" fill={INK_L}>04</text>
                    </svg>
                  )}
                  {s.id===5 && (
                    <svg viewBox="0 0 170 130" style={{ width:'100%', display:'block' }}>
                      <rect x="10" y="100" width="150" height="12" rx="6" fill="none" stroke={INK} strokeWidth="1.5" />
                      <line x1="16" y1="106" x2="154" y2="106" stroke={INK_L} strokeWidth="6" strokeDasharray="14 7" className="belt-roll" />
                      <rect x="33" y="22" width="104" height="78" rx="8" fill="#E8F4FB" stroke={INK} strokeWidth="1.8" />
                      <rect x="40" y="29" width="90" height="64" rx="6" fill="none" stroke="#A8CCE8" strokeWidth="1.2" />
                      <text x="85" y="52" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="13" fontWeight="700" fill="#333333">−196°C</text>
                      <text x="85" y="64" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6" fill="#333333" letterSpacing=".04em">CRYO GRIND</text>
                      <Snowflake cx={85} cy={82} r={14} />
                      <text x="85" y="122" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6" fill="#333333">05</text>
                    </svg>
                  )}
                  {s.id===6 && (
                    <svg viewBox="0 0 170 130" style={{ width:'100%', display:'block' }}>
                      <rect x="10" y="100" width="150" height="12" rx="6" fill="none" stroke={INK} strokeWidth="1.5" />
                      <line x1="16" y1="106" x2="154" y2="106" stroke={INK_L} strokeWidth="6" strokeDasharray="14 7" className="belt-roll" />
                      <rect x="28" y="20" width="114" height="80" rx="7" fill="#F5EDD8" stroke={INK} strokeWidth="1.8" />
                      {[0,1,2].map(j=>(
                        <g key={j}>
                          <ellipse cx="85" cy={36+j*22} rx="36" ry="9" fill="none" stroke={INK} strokeWidth="1.2" />
                          <line x1="49" y1={36+j*22} x2="121" y2={36+j*22} stroke={INK_L} strokeWidth=".9" strokeDasharray="5 3" className="drum-lines" />
                        </g>
                      ))}
                      <Gear cx={130} cy={30} r={12} cls="gear-fast" />
                      <Gear cx={149} cy={30} r={8}  cls="gear-fast2" />
                      <text x="85" y="122" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6" fill={INK_L}>06</text>
                    </svg>
                  )}
                </div>
                {/* Card text */}
                <div style={{ padding:'14px 16px' }}>
                  <div style={{ fontFamily:"'Courier New',monospace", fontSize:8, letterSpacing:'0.2em', color:s.accent, marginBottom:5 }}>STEP 0{s.id}</div>
                  <div style={{ fontFamily:'Georgia,serif', fontSize:13, fontWeight:700, color:INK, marginBottom:3, lineHeight:1.2 }}>{s.name}</div>
                  <div style={{ fontFamily:"'Courier New',monospace", fontSize:8.5, color:s.accent, fontWeight:700 }}>{s.stat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Unified Global Floating Modal */}
        {station !== null && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, animation: 'fadeIn 0.3s cubic-bezier(0.16,1,0.3,1)'
          }} onClick={() => setActive(null)}>
            <div style={{
              background:'#fff', borderRadius:0, border:`2px solid ${INK}`,
              padding:'clamp(32px,5vw,48px)', maxWidth:540, width:'100%',
              boxShadow:`8px 8px 0px ${station.accent}`,
              animation:'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
              position:'relative',
            }} onClick={e => e.stopPropagation()}>
              <button onClick={()=>setActive(null)} style={{
                position:'absolute', top:20, right:20, background:INK, border:'none',
                fontSize:24, color:'#fff', cursor:'pointer', width:40, height:40,
                display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s',
              }}
                onMouseEnter={e=>(e.currentTarget.style.background=station.accent)}
                onMouseLeave={e=>(e.currentTarget.style.background=INK)}
              >×</button>
              <div style={{ display:'flex', gap:20, alignItems:'center', marginBottom:24 }}>
                <div style={{
                  flexShrink:0, width:60, height:60, background:'#fff', border:`2px solid ${INK}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:26, color: station.accent, fontFamily:"'Courier New',monospace", fontWeight:800,
                  boxShadow:`4px 4px 0px ${station.accent}`
                }}>
                  {String(station.id).padStart(2, '0')}
                </div>
                <div>
                  <div style={{ fontFamily:"'Courier New',monospace", fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:station.accent, marginBottom:6, fontWeight:700 }}>
                    {station.stat}
                  </div>
                  <div style={{ fontFamily:'var(--font-display), ui-sans-serif, system-ui, sans-serif', fontSize:'clamp(22px,3vw,28px)', fontWeight:400, color:INK, lineHeight:1.1, textTransform: 'uppercase' }}>
                    {station.name}
                  </div>
                </div>
              </div>
              <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:15, color:'rgba(0,0,0,0.7)', lineHeight:1.8, margin:'0 0 24px' }}>
                {station.desc}
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
