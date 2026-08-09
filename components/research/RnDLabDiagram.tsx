'use client';

import { useState } from 'react';

const CR    = '#111111';
const BLUE  = '#333333';
const GREEN = '#111111';
const INK   = '#1A1818';
const INK_L = 'rgba(26,24,24,0.3)';
const INK_LL = 'rgba(26,24,24,0.08)';

interface Station {
  id: number;
  icon: string;
  name: string;
  stat: string;
  desc: string;
  accent: string;
}

const STATIONS: Station[] = [
  { id:1, icon:'🌶️', name:'Formulation Desk',      stat:'425+ Blends',      accent:'#8B4000', desc:'Strategic formulation design for bespoke B2B spice blends. Every prototype begins with a detailed sensory brief, specifying target ASTA colour values, precise Scoville Heat Units (SHU), and maximum moisture thresholds for prolonged shelf life.' },
  { id:2, icon:'🔬', name:'GC-MS Flavour Lab',      stat:'100s of Volatiles', accent:BLUE,     desc:'Advanced Gas Chromatography–Mass Spectrometry (GC-MS) profiling. We identify and quantify hundreds of critical volatile flavour compounds (e.g., piperine, capsaicin, cuminaldehyde) to achieve absolute batch-to-batch flavour matching.' },
  { id:3, icon:'⚗️', name:'Process Optimisation',   stat:'0 SHU Loss',       accent:'#6B2D00', desc:'Iterative refinement of cryogenic and water-cooled milling parameters. We optimise rotor speeds and cooling deltas to ensure negligible degradation of essential oils, preserving maximum ASTA colour and intrinsic heat (SHU).' },
  { id:4, icon:'🌿', name:'Functional Ingredients',  stat:'Bioavailability+', accent:GREEN,    desc:'Cutting-edge research into bioactive extraction and bioavailability enhancement (e.g., Curcumin complexes). Developed in strategic partnership with premier institutions like CFTRI and IIT Food Tech Division for the nutraceutical sector.' },
  { id:5, icon:'📊', name:'Sensory Panel Room',      stat:'QDA Driven',       accent:'#5E2D79', desc:'Quantitative Descriptive Analysis (QDA) conducted by certified sensory panellists. Objective scoring of aroma intensity, colour vibrancy, pungency, mouthfeel, and aftertaste using statistically robust spider chart mapping.' },
  { id:6, icon:'✅', name:'Consumer Validation',     stat:'Market Ready',     accent:'#444444', desc:'Pre-commercialisation consumer acceptability trials for major FMCG and Private Label NPDs (New Product Developments). Protocols include blind triangle testing, preference mapping, and purchase intent scaling before final FSMA sign-off.' },
];

/* ── CSS ───────────────────────────────────────────────── */
const CSS = `
  @keyframes rndBeaker { 0%{transform:translateY(0);opacity:.9} 100%{transform:translateY(-16px);opacity:0} }
  @keyframes rndSpin   { to{transform:rotate(360deg)} }
  @keyframes rndSpinR  { to{transform:rotate(-360deg)} }
  @keyframes rndScope  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
  @keyframes rndPulse  { 0%,100%{opacity:.3} 50%{opacity:1} }
  @keyframes rndDash   { to{stroke-dashoffset:-48} }
  @keyframes rndBlink  { 0%,100%{opacity:1} 50%{opacity:.1} }
  @keyframes rndScan   { 0%{transform:translateX(-40px)} 50%{transform:translateX(40px)} 100%{transform:translateX(-40px)} }
  @keyframes rndWave   { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.5)} }
  @keyframes slideUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes rndBelt   { to{stroke-dashoffset:-40} }

  .rnd-bub   { animation: rndBeaker 1.8s ease-in-out infinite; }
  .rnd-bub2  { animation: rndBeaker 1.8s ease-in-out .7s infinite; opacity:0; }
  .rnd-cw    { animation: rndSpin  6s linear infinite; transform-box:fill-box; transform-origin:center; }
  .rnd-ccw   { animation: rndSpinR 6s linear infinite; transform-box:fill-box; transform-origin:center; }
  .rnd-scope { animation: rndScope 2s ease-in-out infinite; transform-box:fill-box; transform-origin:top center; }
  .rnd-pulse { animation: rndPulse 1.5s ease-in-out infinite; }
  .rnd-dash  { stroke-dasharray:10 8; animation: rndDash 2.5s linear infinite; }
  .rnd-belt  { stroke-dasharray:8 6; animation: rndBelt 1s linear infinite; }
  .rnd-blink { animation: rndBlink 1.3s ease-in-out infinite; }
  .rnd-scan  { animation: rndScan  3s ease-in-out infinite; }
  .rnd-wave  { animation: rndWave  .7s ease-in-out infinite alternate; transform-box:fill-box; transform-origin:bottom; }
  .rnd-slide { animation: slideUp  .35s ease both; }
  .rnd-st    { cursor:pointer; }
  
  /* Mobile: horizontal scroll */
  @media (max-width:699px) { .rnd-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; } }
`;

/* ── Station Illustrations (160×160 space) ──────────────── */
function StationIllus({ id, accent }: { id:number; accent:string }) {
  switch (id) {
    case 1: return ( /* Formulation Desk — balance + beakers */
      <g>
        {/* bench */}
        <rect x="10" y="100" width="140" height="8" rx="2" fill={INK} fillOpacity=".3"/>
        {/* balance scale */}
        <line x1="80" y1="40" x2="80" y2="100" stroke={INK} strokeWidth="2"/>
        <line x1="40" y1="60" x2="120" y2="60" stroke={INK} strokeWidth="2"/>
        <circle cx="80" cy="40" r="5" fill={INK} fillOpacity=".4"/>
        {/* left pan */}
        <path d="M40,60 Q30,80 20,80 Q30,80 40,80" fill="none" stroke={INK} strokeWidth="1.5"/>
        <ellipse cx="30" cy="80" rx="16" ry="4" fill={accent} fillOpacity=".18" stroke={accent} strokeWidth="1.5"/>
        {/* right pan */}
        <path d="M120,60 Q130,80 140,80 Q130,80 120,80" fill="none" stroke={INK} strokeWidth="1.5"/>
        <ellipse cx="130" cy="80" rx="16" ry="4" fill={accent} fillOpacity=".18" stroke={accent} strokeWidth="1.5"/>
        {/* beakers on bench */}
        <rect x="18" y="74" width="18" height="24" rx="3" fill="none" stroke={INK} strokeWidth="1.5"/>
        <rect x="20" y="84" width="14" height="12" rx="2" fill={accent} fillOpacity=".5" stroke="none"/>
        <circle cx="27" cy="85" r="2" fill="#fff" className="rnd-bub"/>
        <rect x="58" y="70" width="20" height="28" rx="3" fill="none" stroke={INK} strokeWidth="1.5"/>
        <rect x="60" y="82" width="16" height="14" rx="2" fill={BLUE} fillOpacity=".5" stroke="none"/>
        <circle cx="68" cy="83" r="2" fill="#fff" className="rnd-bub2"/>
        {/* notebook */}
        <rect x="90" y="72" width="44" height="32" rx="3" fill="#fff" stroke={INK_L} strokeWidth="1.5"/>
        <line x1="96" y1="82" x2="128" y2="82" stroke={INK_L} strokeWidth="1"/>
        <line x1="96" y1="90" x2="128" y2="90" stroke={INK_L} strokeWidth="1"/>
        <line x1="96" y1="98" x2="118" y2="98" stroke={INK_L} strokeWidth="1"/>
      </g>
    );

    case 2: return ( /* GC-MS Flavour Lab */
      <g>
        {/* GC-MS tower */}
        <rect x="8"  y="30" width="44" height="90" rx="4" fill="#fff" stroke={INK} strokeWidth="1.5"/>
        <rect x="12" y="34" width="36" height="20" rx="2" fill={accent} fillOpacity=".18"/>
        <line x1="12" y1="60" x2="48" y2="60" stroke={INK_L} strokeWidth="1"/>
        <line x1="12" y1="70" x2="48" y2="70" stroke={INK_L} strokeWidth="1"/>
        <line x1="12" y1="80" x2="36" y2="80" stroke={INK_L} strokeWidth="1"/>
        {/* Column tube */}
        <line x1="52" y1="50" x2="80" y2="50" stroke={INK} strokeWidth="2" strokeDasharray="4 3"/>
        <line x1="80" y1="50" x2="80" y2="90" stroke={INK} strokeWidth="2"/>
        {/* Detector */}
        <rect x="76" y="88" width="16" height="20" rx="3" fill={accent} fillOpacity=".25" stroke={accent} strokeWidth="1.5"/>
        <circle cx="84" cy="96" r="4" fill={accent} className="rnd-pulse"/>
        {/* Graph readout */}
        <rect x="96" y="40" width="56" height="60" rx="3" fill="#fff" stroke={INK} strokeWidth="1.5"/>
        {/* Chromatogram peaks */}
        <polyline points="100,90 108,88 112,65 116,88 124,85 128,55 132,82 136,78 140,40 144,78 148,86" fill="none" stroke={accent} strokeWidth="2" className="rnd-dash"/>
        <line x1="100" y1="92" x2="150" y2="92" stroke={INK_L} strokeWidth="1"/>
        <line x1="100" y1="44" x2="100" y2="92" stroke={INK_L} strokeWidth="1"/>
        {/* PASS badge */}
        <circle cx="146" cy="46" r="6" fill="#22c55e" className="rnd-blink"/>
      </g>
    );

    case 3: return ( /* Process Optimisation — milling + gauges */
      <g>
        {/* mill drum */}
        <circle cx="55" cy="75" r="42" fill="none" stroke={INK} strokeWidth="2"/>
        <circle cx="55" cy="75" r="30" fill="none" stroke={INK_L} strokeWidth="1" strokeDasharray="8 4" className="rnd-cw"/>
        <circle cx="55" cy="75" r="16" fill={accent} fillOpacity=".12"/>
        <line x1="55" y1="45" x2="55" y2="105" stroke={INK} strokeWidth="2.5" className="rnd-cw"/>
        <line x1="25" y1="75" x2="85"  y2="75"  stroke={INK} strokeWidth="2.5" className="rnd-cw"/>
        {/* temperature gauge */}
        <circle cx="120" cy="60" r="26" fill="#fff" stroke={INK} strokeWidth="1.5"/>
        <circle cx="120" cy="60" r="18" fill="none" stroke={INK_L} strokeWidth=".8"/>
        {/* gauge needle */}
        <line x1="120" y1="60" x2="106" y2="46" stroke={CR} strokeWidth="2" strokeLinecap="round" className="rnd-scope"/>
        <circle cx="120" cy="60" r="3" fill={INK}/>
        <text x="120" y="90" textAnchor="middle" fontSize="8" fontFamily="monospace" fill={INK_L}>TEMP</text>
        {/* particles coming out */}
        {[[45,28],[55,22],[65,28]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill={accent} fillOpacity=".7" className="rnd-bub" style={{animationDelay:`${i*.4}s`}}/>
        ))}
      </g>
    );

    case 4: return ( /* Functional Ingredients — extract + molecule */
      <g>
        {/* extraction flask */}
        <path d="M65,20 L65,70 L30,120 L110,120 L75,70 L75,20 Z" fill="none" stroke={INK} strokeWidth="1.5"/>
        <path d="M40,100 L100,100 L90,120 L30,120 Z" fill={GREEN} fillOpacity=".3" stroke="none"/>
        <path d="M56,65 L84,65" stroke={INK_L} strokeWidth="1"/>
        {/* bubbles in flask */}
        {[[55,90],[65,80],[75,95]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="3" fill={GREEN} fillOpacity=".6" className="rnd-bub" style={{animationDelay:`${i*.35}s`}}/>
        ))}
        {/* molecule diagram right */}
        <circle cx="118" cy="50"  r="8"  fill={accent} fillOpacity=".18" stroke={accent} strokeWidth="1.5"/>
        <circle cx="140" cy="30"  r="6"  fill={BLUE}   fillOpacity=".18" stroke={BLUE}   strokeWidth="1.5"/>
        <circle cx="146" cy="70"  r="6"  fill={GREEN}  fillOpacity=".18" stroke={GREEN}  strokeWidth="1.5"/>
        <circle cx="118" cy="88"  r="5"  fill={accent} fillOpacity=".18" stroke={accent} strokeWidth="1.5"/>
        <line x1="118" y1="58" x2="140" y2="30"  stroke={INK_L} strokeWidth="1.5"/>
        <line x1="118" y1="58" x2="146" y2="70"  stroke={INK_L} strokeWidth="1.5"/>
        <line x1="118" y1="58" x2="118" y2="83"  stroke={INK_L} strokeWidth="1.5"/>
        <circle cx="118" cy="50" r="3" fill={accent} className="rnd-pulse"/>
      </g>
    );

    case 5: return ( /* Sensory Panel Room — spiderchart + people */
      <g>
        {/* spider/radar chart */}
        {[0,1,2,3,4,5].map(i=>{
          const a = (i*60-90)*Math.PI/180;
          return <line key={i} x1="70" y1="70" x2={70+Math.cos(a)*50} y2={70+Math.sin(a)*50} stroke={INK_LL} strokeWidth="1"/>;
        })}
        {/* radar rings */}
        {[16,32,48].map(r=>(
          <polygon key={r} points={[0,1,2,3,4,5].map(i=>{const a=(i*60-90)*Math.PI/180; return `${70+Math.cos(a)*r},${70+Math.sin(a)*r}`;}).join(' ')} fill="none" stroke={INK_LL} strokeWidth=".8"/>
        ))}
        {/* data polygon */}
        <polygon points={[0,1,2,3,4,5].map((i,_,__)=>{
          const a=(i*60-90)*Math.PI/180;
          const vals=[46,38,44,40,50,36];
          return `${70+Math.cos(a)*vals[i]},${70+Math.sin(a)*vals[i]}`;
        }).join(' ')} fill={accent} fillOpacity=".18" stroke={accent} strokeWidth="2"/>
        {/* axis labels */}
        <text x="70"  y="16"  textAnchor="middle" fontSize="7" fontFamily="monospace" fill={INK_L}>AROMA</text>
        <text x="128" y="38"  textAnchor="start"  fontSize="7" fontFamily="monospace" fill={INK_L}>HEAT</text>
        <text x="128" y="110" textAnchor="start"  fontSize="7" fontFamily="monospace" fill={INK_L}>TASTE</text>
        <text x="70"  y="132" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={INK_L}>COLOUR</text>
        <text x="14"  y="110" textAnchor="end"    fontSize="7" fontFamily="monospace" fill={INK_L}>MOUTH</text>
        <text x="14"  y="38"  textAnchor="end"    fontSize="7" fontFamily="monospace" fill={INK_L}>FEEL</text>
        {/* centre dot */}
        <circle cx="70" cy="70" r="4" fill={accent} className="rnd-pulse"/>
        {/* panel members */}
        {[108,124,140].map(x=>(
          <g key={x}>
            <circle cx={x} cy="56" r="8" fill={INK_L}/>
            <rect x={x-10} y="65" width="20" height="14" rx="4" fill={INK_L}/>
          </g>
        ))}
        <text x="124" y="88" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={INK_L}>PANEL</text>
      </g>
    );

    case 6: return ( /* Consumer Validation — clipboard + checkboxes */
      <g>
        {/* big clipboard */}
        <rect x="20" y="20" width="96" height="120" rx="5" fill="#fff" stroke={INK} strokeWidth="1.5"/>
        <rect x="52" y="14" width="32" height="12" rx="3" fill={INK_L}/>
        {/* rows */}
        {[48,64,80,96,112].map((y,i)=>(
          <g key={y}>
            <rect x="30" y={y} width="14" height="12" rx="2" fill="none" stroke={INK_L} strokeWidth="1.2"/>
            {i<3 && <path d={`M33,${y+6} L37,${y+10} L43,${y+3}`} fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round"/>}
            <line x1="52" y1={y+6} x2="108" y2={y+6} stroke={INK_L} strokeWidth="1"/>
          </g>
        ))}
        {/* score badge */}
        <circle cx="138" cy="54" r="22" fill={accent} fillOpacity=".12" stroke={accent} strokeWidth="1.5"/>
        <text x="138" y="50" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={accent} fontWeight="700">87%</text>
        <text x="138" y="64" textAnchor="middle" fontSize="7"  fontFamily="monospace" fill={accent}>ACCEPT</text>
        {/* star rating */}
        <text x="116" y="90" fontSize="12" className="rnd-pulse">⭐</text>
        <text x="132" y="90" fontSize="12" className="rnd-pulse" style={{animationDelay:'.2s'}}>⭐</text>
        <text x="148" y="90" fontSize="12" className="rnd-pulse" style={{animationDelay:'.4s'}}>⭐</text>
      </g>
    );

    default: return null;
  }
}

/* ── Layout ────────────────────────────────────────────── */
const GW = 180, GH = 180, GAP = 80;
const POSITIONS = [
  { x:80,           y:80           },
  { x:80+(GW+GAP),  y:80           },
  { x:80+(GW+GAP)*2,y:80           },
  { x:80+(GW+GAP)*2,y:80+GH+GAP   },
  { x:80+(GW+GAP),  y:80+GH+GAP   },
  { x:80,           y:80+GH+GAP   },
];
const CONNECTIONS = [
  { x1:260, y1:170, x2:340, y2:170 },
  { x1:520, y1:170, x2:600, y2:170 },
  { x1:770, y1:260, x2:770, y2:340 },
  { x1:600, y1:430, x2:520, y2:430 },
  { x1:340, y1:430, x2:260, y2:430 },
];

export default function RnDLabDiagram() {
  const [active, setActive] = useState<number|null>(null);
  const [hov,    setHov]    = useState<number|null>(null);

  const toggle = (id:number) => setActive(p => p===id ? null : id);
  const aS = active !== null ? STATIONS[active-1] : null;

  return (
    <div style={{ width:'100%' }}>
      <style>{CSS}</style>

      {/* ── DESKTOP SVG ──────────────────────────────────── */}
      <div style={{ background:'#F8F6F1', border:'1.5px solid #D6CFC8', borderRadius:20, overflow:'hidden' }}>

        {/* header */}
        <div style={{ padding:'14px 28px', borderBottom:'1.5px solid #D6CFC8', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:CR }} className="rnd-pulse"/>
            <span style={{ fontFamily:'monospace', fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:INK_L }}>R&D Lab — Interactive Diagram</span>
          </div>
          <span style={{ fontFamily:'monospace', fontSize:10, color:INK_L }}>
            {active!==null ? `Station ${active} / 06` : 'Click any station to explore'}
          </span>
        </div>

        {/* SVG */}
        <div className="rnd-scroll" style={{ padding:'20px 24px 0', overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
          <svg viewBox="40 40 820 540" style={{ width:'100%', height:'auto', minWidth:680 }}>
            <defs>
              <pattern id="rndGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={INK_LL} strokeWidth=".5"/>
                <path d="M 20 0 L 20 40 M 0 20 L 40 20" fill="none" stroke={INK_LL} strokeWidth=".2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rndGrid)"/>

            {/* connections */}
            <g fill="none">
              {CONNECTIONS.map((c,i)=>(
                <g key={i}>
                  <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="rgba(0,0,0,0.04)" strokeWidth="12" strokeLinecap="round"/>
                  <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke={CR} strokeWidth="2.5" strokeLinecap="round" className="rnd-dash"/>
                </g>
              ))}
            </g>

            {/* stations */}
            {STATIONS.map((st,i)=>{
              const pos  = POSITIONS[i];
              const isAct = active === st.id;
              const isHov = hov    === st.id;
              const dim   = active !== null && !isAct;

              return (
                <g key={st.id} className="rnd-st"
                  transform={`translate(${pos.x},${pos.y})`}
                  style={{ opacity: dim ? 0.3 : 1, transition:'opacity .25s' }}
                  onClick={()=>toggle(st.id)}
                  onMouseEnter={()=>setHov(st.id)}
                  onMouseLeave={()=>setHov(null)}
                >
                  {/* shadow */}
                  <rect x="2" y="4" width={GW} height={GH} rx="8" fill="rgba(0,0,0,0.05)"/>
                  {/* body */}
                  <rect x="0" y="0" width={GW} height={GH} rx="8"
                    fill={isAct ? '#fff' : 'rgba(255,255,255,0.82)'}
                    stroke={isAct ? st.accent : isHov ? st.accent : '#D6CFC8'}
                    strokeWidth={isAct ? 2.5 : 1.5}/>
                  {/* top label strip */}
                  <rect x="0" y="0" width={GW} height="28" rx="8"
                    fill={isAct ? st.accent : 'rgba(0,0,0,0.04)'}/>
                  <rect x="0" y="20" width={GW} height="8"
                    fill={isAct ? st.accent : 'rgba(0,0,0,0.04)'}/>
                  <text x="10" y="18"
                    fontFamily="'Courier New',monospace" fontSize="9" fontWeight="700"
                    fill={isAct ? '#fff' : INK_L} letterSpacing=".12em">
                    STATION {st.id < 10 ? `0${st.id}` : st.id}
                  </text>
                  {isAct && <circle cx={GW-12} cy="14" r="5" fill="#fff" fillOpacity=".65" className="rnd-blink"/>}

                  {/* illustration — nested SVG for clipping */}
                  <svg x="0" y="28" width={GW} height={GH-28-44} overflow="hidden"
                    viewBox={`0 0 160 108`} preserveAspectRatio="xMidYMid meet"
                    opacity={isAct ? 1 : 0.72}
                  >
                    <StationIllus id={st.id} accent={st.accent}/>
                  </svg>

                  {/* bottom text */}
                  <text x={GW/2} y={GH-28}
                    textAnchor="middle" fontFamily="Georgia,serif"
                    fontSize="12" fontWeight="700" fill={isAct ? st.accent : INK}>
                    {st.name}
                  </text>
                  <text x={GW/2} y={GH-14}
                    textAnchor="middle" fontFamily="'Courier New',monospace"
                    fontSize="9" fontWeight="700" fill={st.accent}>
                    {st.stat}
                  </text>

                  {/* step badge */}
                  <circle cx="0" cy="0" r="14" fill={CR}/>
                  <text x="0" y="4" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fontWeight="700" fill="#fff">{st.id}</text>
                </g>
              );
            })}
          </svg>
        </div>

      </div>
      
      {/* Unified Global Floating Modal */}
      {aS && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24, animation: 'fadeIn 0.3s cubic-bezier(0.16,1,0.3,1)'
        }} onClick={() => setActive(null)}>
          <div style={{
            background:'#fff', borderRadius:0, border:`2px solid ${INK}`,
            padding:'clamp(32px,5vw,48px)', maxWidth:540, width:'100%',
            boxShadow:`8px 8px 0px ${aS.accent}`,
            animation:'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
            position:'relative',
          }} onClick={e => e.stopPropagation()}>
            <button onClick={()=>setActive(null)} style={{
              position:'absolute', top:20, right:20, background:INK, border:'none',
              fontSize:24, color:'#fff', cursor:'pointer', width:40, height:40,
              display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s',
            }}
              onMouseEnter={e=>(e.currentTarget.style.background=aS.accent)}
              onMouseLeave={e=>(e.currentTarget.style.background=INK)}
            >×</button>
            <div style={{ display:'flex', gap:20, alignItems:'center', marginBottom:24 }}>
              <div style={{
                flexShrink:0, width:60, height:60, background:'#fff', border:`2px solid ${INK}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:26, color: aS.accent, fontFamily:"'Courier New',monospace", fontWeight:800,
                boxShadow:`4px 4px 0px ${aS.accent}`
              }}>
                {aS.icon}
              </div>
              <div>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:aS.accent, marginBottom:6, fontWeight:700 }}>
                  STATION 0{aS.id} | {aS.stat}
                </div>
                <div style={{ fontFamily:'var(--font-display), ui-sans-serif, system-ui, sans-serif', fontSize:'clamp(22px,3vw,28px)', fontWeight:400, color:INK, lineHeight:1.1, textTransform: 'uppercase' }}>
                  {aS.name}
                </div>
              </div>
            </div>
            <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:15, color:'rgba(0,0,0,0.7)', lineHeight:1.8, margin:'0 0 24px' }}>
              {aS.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
