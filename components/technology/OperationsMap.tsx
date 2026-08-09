'use client';

import { useState } from 'react';

const INK    = '#111111';
const INK_L  = '#6B3A1F';
const INK_LL = 'rgba(44,18,0,0.28)';
const CRIMSON = '#111111';
const GREEN   = '#111111';
const BLUE    = '#333333';

/* ─── Data for 8 operations ──────────────────────────────────────── */
interface NodeData {
  id: number;
  icon: string;
  name: string;
  stat: string;
  desc: string;
  accent: string;
}

const NODES: NodeData[] = [
  { id:1, icon:'🌾', name:'Farm Sourcing',         stat:'6 States',         accent: GREEN,   desc:'We source raw materials directly from 10,000+ partnered farmers across 6 major Indian states. Our strict "Farm to Shelf" procurement policy ensures 100% GPS-tagged traceability, ethical agricultural practices, and pesticide-free cultivation.' },
  { id:2, icon:'🚚', name:'Inbound Logistics',     stat:'48 Hr Turnaround', accent:'#555555', desc:'Quality begins in transit. We utilize a dedicated fleet of temperature-controlled vehicles to prevent moisture or fungal development. Every shipment is secured with tamper-evident seals and tracked via real-time telematics.' },
  { id:3, icon:'🔬', name:'360° QC Intake',        stat:'200+ Tests',       accent: BLUE,    desc:'Uncompromising quality control. Every batch undergoes rigorous screening at our NABL-accredited laboratory for 200+ parameters, including pesticide residues, heavy metals, aflatoxins, and ASTA colour values before entering our facility.' },
  { id:4, icon:'🧹', name:'Automated Cleaning',    stat:'99.9% Purity',     accent:'#5E4A00', desc:'We guarantee 99.9% physical purity using a multi-stage European automated line. Vibro Sifters, De-Stoners, Gravity Tables, and advanced Multivision Sortex machines eliminate all foreign matter and impurities with surgical precision.' },
  { id:5, icon:'❄️', name:'Cryogenic Grinding',   stat:'−196 °C',          accent:'#444444', desc:'Unlike conventional ambient grinding that burns off flavor, our proprietary liquid-nitrogen cryogenic grinding at −196°C preserves 40% more natural essential oils, volatile aromatics, and vibrant ASTA color in every spice.' },
  { id:6, icon:'♨️', name:'Steam Sterilization',  stat:'5-Log Reduction',  accent:'#5E0A0A', desc:'Ensuring absolute microbial safety. Our indirect high-temperature steam sterilization delivers a validated 5-log pathogen reduction. The entire process is certified to FDA 21 CFR 117, FSSC 22000, and strict EU compliance standards.' },
  { id:7, icon:'📦', name:'Hygienic Packaging',    stat:'50g to 25 kg',     accent:'#1B4A2E', desc:'Spices are packed in Class 100,000 HEPA-filtered clean rooms using automated nitrogen flushing to extend shelf life. We offer flexible B2B packaging solutions ranging from retail-ready 50g sachets to 25kg bulk export sacks.' },
  { id:8, icon:'🚢', name:'Global Export',         stat:'40+ Countries',    accent: CRIMSON, desc:'Seamless international distribution. Our in-house export team handles comprehensive documentation including COA, FSSAI, Phytosanitary, and Halal/Kosher certificates, enabling fast, compliant FCL/LCL shipping to 40+ countries globally.' },
];

/* ─── CSS Keyframes ──────────────────────────────────────────────── */
const CSS = `
  @keyframes beltRoll   { to { stroke-dashoffset: -48; } }
  @keyframes gearCW     { to { transform: rotate(360deg);  } }
  @keyframes gearCCW    { to { transform: rotate(-360deg); } }
  @keyframes steamUp    { 0%{opacity:.65;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-40px) scale(1.4)} }
  @keyframes snowSpin   { to { transform: rotate(360deg); } }
  @keyframes scanBlink  { 0%,100%{opacity:.8} 50%{opacity:.1} }
  @keyframes pulseDot   { 0%,100%{r:4; opacity:.9} 50%{r:7; opacity:.4} }
  @keyframes routeLine  { to { stroke-dashoffset: 0; } }
  @keyframes truckMove  { 0%{transform:translateX(0)} 100%{transform:translateX(60px)} }
  @keyframes slideUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scrollHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
  @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
  @keyframes shipBob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  @keyframes flameDance { 0%,100%{transform:scaleX(1) scaleY(1)} 30%{transform:scaleX(.85) scaleY(1.18)} 60%{transform:scaleX(1.1) scaleY(.92)} }

  .belt-roll   { animation: beltRoll   1.1s linear infinite; }
  .gear-cw     { animation: gearCW     4s   linear infinite; transform-box:fill-box; transform-origin:center; }
  .gear-ccw    { animation: gearCCW    4s   linear infinite; transform-box:fill-box; transform-origin:center; }
  .gear-fast   { animation: gearCW     2s   linear infinite; transform-box:fill-box; transform-origin:center; }
  .gear-fast2  { animation: gearCCW    2s   linear infinite; transform-box:fill-box; transform-origin:center; }
  .steam-a     { animation: steamUp    2s   ease-out infinite; }
  .steam-b     { animation: steamUp    2s   ease-out .7s infinite; }
  .steam-c     { animation: steamUp    2s   ease-out 1.4s infinite; }
  .snow-spin   { animation: snowSpin   7s   linear infinite; transform-box:fill-box; transform-origin:center; }
  .scan-line   { animation: scanBlink  1.3s ease-in-out infinite; }
  .pulse-dot   { animation: pulseDot   1.8s ease-in-out infinite; }
  .route-line  { stroke-dasharray: 600; stroke-dashoffset: 600; animation: routeLine 2.5s ease forwards; }
  .truck-anim  { animation: shipBob    2s   ease-in-out infinite; transform-box:fill-box; transform-origin:center; }
  .ship-anim   { animation: shipBob    3s   ease-in-out infinite; }
  .flame-a     { animation: flameDance .7s  ease-in-out infinite alternate; transform-box:fill-box; transform-origin:bottom center; }
  .scroll-hint { animation: scrollHint 1.5s ease-in-out infinite; }

  /* Breakpoints */
  @media (min-width: 700px) { .om-mobile { display:none !important; } }
  @media (max-width: 699px) { .om-desktop { display:none !important; } }
`;

/* ─── SVG Helpers ────────────────────────────────────────────────── */
function Gear({ cx, cy, r=16, cls='gear-cw' }: { cx:number; cy:number; r?:number; cls?:string }) {
  return (
    <g className={cls}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth="2"
        strokeDasharray={`${Math.PI*r/5.5} ${Math.PI*r/11}`} />
      <circle cx={cx} cy={cy} r={r*.5} fill={INK} fillOpacity=".08" stroke={INK} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r*.22} fill={INK} fillOpacity=".3" />
    </g>
  );
}

function Snowflake({ cx, cy, r=14 }: { cx:number; cy:number; r?:number }) {
  return (
    <g className="snow-spin" style={{ transformOrigin:`${cx}px ${cy}px` }}>
      {[0,1,2,3,4,5].map(i => {
        const a = i*60*Math.PI/180;
        const x2=cx+r*Math.cos(a), y2=cy+r*Math.sin(a);
        return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="#A8CCE8" strokeWidth="1.5" />;
      })}
      <circle cx={cx} cy={cy} r="4" fill="none" stroke="#A8CCE8" strokeWidth="1.5" />
    </g>
  );
}

function Flame({ x, y }: { x:number; y:number }) {
  return (
    <g className="flame-a">
      <path d={`M${x},${y} C${x-3},${y-8} ${x+3},${y-14} ${x},${y-20}`}
        fill="none" stroke='#111111' strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/* ─── Route lines (animated dashes connecting stations) ─────────── */
function RouteLines() {
  const routes = [
    'M 162,245 Q 240,200 318,175',   // farm → truck
    'M 380,195 Q 430,195 468,195',   // truck → lab
    'M 568,195 Q 620,195 658,195',   // lab → cleaner
    'M 760,215 Q 810,235 848,255',   // cleaner → cryo
    'M 912,330 Q 940,360 968,390',   // cryo → steam
    'M 1040,395 Q 1080,380 1120,355',// steam → packing
    'M 1180,295 Q 1200,250 1210,215',// packing → ship
  ];
  return (
    <>
      {routes.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={INK_L} strokeWidth="1.5"
          strokeDasharray="8 5" markerEnd="url(#arr)" />
      ))}
    </>
  );
}

/* ─── Station 1: Farm ────────────────────────────────────────────── */
function FarmSVG({ active, hov }: { active:boolean; hov:boolean }) {
  return (
    <g>
      {/* Ground */}
      <rect x="60" y="250" width="200" height="60" rx="4" fill="#C8E6A0" fillOpacity=".4" stroke={INK_L} strokeWidth="1" />
      {/* Field rows */}
      {[275,282,289,296,303].map(y => (
        <line key={y} x1="68" y1={y} x2="252" y2={y} stroke={GREEN} strokeWidth="1" strokeOpacity=".5" strokeDasharray="6 4" />
      ))}
      {/* Silo */}
      <rect x="82" y="190" width="50" height="60" rx="4" fill="#F5EDD8" stroke={INK} strokeWidth="2" />
      <ellipse cx="107" cy="190" rx="26" ry="9" fill="#EDE0C4" stroke={INK} strokeWidth="1.8" />
      <line x1="82" y1="210" x2="132" y2="210" stroke={INK_L} strokeWidth="1" strokeDasharray="5 4" />
      <line x1="82" y1="225" x2="132" y2="225" stroke={INK_L} strokeWidth="1" strokeDasharray="5 4" />
      <text x="107" y="238" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7" fill={INK_L} letterSpacing=".08em">STORAGE</text>
      {/* Tree group */}
      <g>
        <line x1="180" y1="250" x2="180" y2="210" stroke={INK} strokeWidth="3" />
        <ellipse cx="180" cy="200" rx="18" ry="22" fill={GREEN} fillOpacity=".55" stroke={INK_L} strokeWidth="1" />
      </g>
      <g>
        <line x1="220" y1="250" x2="220" y2="218" stroke={INK} strokeWidth="2.5" />
        <ellipse cx="220" cy="210" rx="14" ry="18" fill={GREEN} fillOpacity=".45" stroke={INK_L} strokeWidth="1" />
      </g>
      {/* Pulse dot */}
      <circle cx="107" cy="225" className="pulse-dot" fill={GREEN} />
    </g>
  );
}

/* ─── Station 2: Truck ───────────────────────────────────────────── */
function TruckSVG({ active, hov }: { active:boolean; hov:boolean }) {
  return (
    <g className="truck-anim" style={{ transformOrigin: '349px 195px' }}>
      {/* Cabin */}
      <rect x="310" y="165" width="36" height="40" rx="4" fill="#F5EDD8" stroke={INK} strokeWidth="2" />
      <rect x="314" y="170" width="28" height="20" rx="2" fill="rgba(168,204,232,0.4)" stroke={INK_L} strokeWidth="1" />
      {/* Cargo */}
      <rect x="346" y="158" width="62" height="47" rx="3" fill="#F5EDD8" stroke={INK} strokeWidth="2" />
      <text x="377" y="180" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7" fill={INK} letterSpacing=".06em">COLD</text>
      <text x="377" y="191" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7" fill={INK} letterSpacing=".06em">CHAIN</text>
      {/* Road */}
      <line x1="305" y1="207" x2="415" y2="207" stroke={INK} strokeWidth="3" />
      {/* Wheels */}
      <circle cx="330" cy="207" r="9" fill="none" stroke={INK} strokeWidth="2.5" />
      <circle cx="330" cy="207" r="4" fill={INK} fillOpacity=".25" />
      <circle cx="378" cy="207" r="9" fill="none" stroke={INK} strokeWidth="2.5" />
      <circle cx="378" cy="207" r="4" fill={INK} fillOpacity=".25" />
      {/* Exhaust */}
      <g className="steam-a" style={{ transformOrigin: '310px 168px' }}>
        <ellipse cx="310" cy="165" rx="4" ry="3" fill={INK} fillOpacity=".18" />
      </g>
    </g>
  );
}

/* ─── Station 3: Lab ─────────────────────────────────────────────── */
function LabSVG({ active, hov }: { active:boolean; hov:boolean }) {
  return (
    <g>
      {/* Microscope base */}
      <rect x="476" y="210" width="84" height="12" rx="4" fill={INK} fillOpacity=".15" stroke={INK} strokeWidth="1.5" />
      {/* Column */}
      <rect x="505" y="155" width="12" height="55" rx="3" fill="#F5EDD8" stroke={INK} strokeWidth="1.5" />
      {/* Arm */}
      <path d="M 511,160 Q 540,155 548,165" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      {/* Lens */}
      <ellipse cx="549" cy="170" rx="10" ry="14" fill="#EDE0C4" stroke={INK} strokeWidth="2" />
      <ellipse cx="549" cy="172" rx="6" ry="9" fill="rgba(168,204,232,0.3)" stroke={INK_L} strokeWidth="1" />
      {/* Stage */}
      <rect x="492" y="210" width="52" height="5" rx="2" fill={INK} fillOpacity=".18" stroke={INK} strokeWidth="1" />
      <rect x="500" y="205" width="36" height="5" rx="2" fill="#F5EDD8" stroke={INK} strokeWidth="1.5" />
      {/* Scan beam */}
      <line x1="507" y1="185" x2="549" y2="185" stroke={CRIMSON} strokeWidth="1.5" strokeOpacity=".7" className="scan-line" />
      {/* Test tube */}
      <path d="M 565,165 L 565,202 Q 565,210 572,210 Q 579,210 579,202 L 579,165 Z"
        fill="rgba(200,228,255,0.4)" stroke={INK} strokeWidth="1.5" />
      <rect x="562" y="160" width="20" height="7" rx="2" fill={INK} fillOpacity=".15" stroke={INK} strokeWidth="1" />
      {/* Liquid */}
      <rect x="566" y="192" width="12" height="10" rx="1"
        fill={`${BLUE}40`} stroke="none" />
    </g>
  );
}

/* ─── Station 4: Cleaner (compact vibroscreen) ───────────────────── */
function CleanerSVG({ active, hov }: { active:boolean; hov:boolean }) {
  return (
    <g>
      {/* Machine box */}
      <rect x="666" y="170" width="86" height="80" rx="6" fill="#F5EDD8" stroke={INK} strokeWidth="2.2" />
      {/* Screen lines */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1="673" y1={183+i*12} x2="745" y2={183+i*12}
          stroke={INK_L} strokeWidth=".9" strokeDasharray="5 3" />
      ))}
      {/* Funnel top */}
      <path d="M 676,162 L 668,172 L 750,172 L 742,162 Z" fill="none" stroke={INK} strokeWidth="1.8" />
      {/* Gear */}
      <Gear cx={754} cy={210} r={14} cls="gear-cw" />
      {/* Output pipe */}
      <path d="M 666,230 Q 655,240 655,260" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      {/* Labels */}
      <text x="709" y="240" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7" fill={INK} letterSpacing=".07em">SORTEX</text>
    </g>
  );
}

/* ─── Station 5: Cryo grinder ────────────────────────────────────── */
function CryoSVG({ active, hov }: { active:boolean; hov:boolean }) {
  return (
    <g>
      {/* Cryo chamber */}
      <rect x="848" y="255" width="100" height="95" rx="10" fill="#E8F4FB" stroke={INK} strokeWidth="2.2" />
      <rect x="856" y="263" width="84" height="79" rx="7" fill="none" stroke="#A8CCE8" strokeWidth="1.5" />
      <rect x="860" y="268" width="76" height="69" rx="5" fill="rgba(200,228,255,0.18)" />
      <text x="898" y="293" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="14" fontWeight="700" fill={BLUE}>−196°C</text>
      <text x="898" y="308" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6.5" fill={BLUE} letterSpacing=".05em">CRYO GRIND</text>
      <Snowflake cx={898} cy={328} r={16} />
      {/* LN2 pipe */}
      <path d="M 848,278 Q 832,278 832,295 Q 832,312 848,312"
        fill="none" stroke="#A8CCE8" strokeWidth="3" strokeLinecap="round" />
      <text x="817" y="278" fontFamily="'Courier New',monospace" fontSize="7" fill={BLUE}>LN₂</text>
      {/* Ice crystals */}
      {[0,1,2,3].map(i => (
        <text key={i} x={862+i*18} y="345" fontSize="8" fill="#A8CCE8" opacity=".6">✦</text>
      ))}
    </g>
  );
}

/* ─── Station 6: Steam sterilizer ────────────────────────────────── */
function SteamSVG({ active, hov }: { active:boolean; hov:boolean }) {
  return (
    <g>
      {/* Chamber */}
      <rect x="968" y="360" width="110" height="95" rx="8" fill="#F5EDD8" stroke={INK} strokeWidth="2.2" />
      <rect x="976" y="368" width="94" height="79" rx="5" fill="none" stroke={INK_L} strokeWidth="1" strokeDasharray="3 3" />
      {/* Pressure valves */}
      {[0,1,2].map(i => (
        <rect key={i} x={980+i*30} y="352" width="14" height="10" rx="3"
          fill={INK} fillOpacity=".2" stroke={INK} strokeWidth="1.5" />
      ))}
      {/* Steam puffs */}
      {[0,1,2].map(i => (
        <g key={i} className={['steam-a','steam-b','steam-c'][i]}
          style={{ transformOrigin:`${987+i*30}px 345px` }}>
          <ellipse cx={987+i*30} cy="342" rx="5" ry="4" fill={INK} fillOpacity=".2" />
        </g>
      ))}
      {/* Pressure gauge */}
      <circle cx="1023" cy="412" r="22" fill="none" stroke={INK} strokeWidth="1.5" />
      <path d="M 1006,412 A 17,17 0 0,1 1040,412" fill="none" stroke={INK_L} strokeWidth="1" />
      <line x1="1023" y1="412"
        x2={1023+15*Math.cos(-25*Math.PI/180)}
        y2={412+15*Math.sin(-25*Math.PI/180)}
        stroke={CRIMSON} strokeWidth="2" strokeLinecap="round" />
      <circle cx="1023" cy="412" r="3" fill={INK} />
      <text x="1023" y="429" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6.5" fill={INK_L}>PSI</text>
      <text x="1023" y="350" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6.5" fill={INK_L} letterSpacing=".07em">5-LOG REDUCTION</text>
    </g>
  );
}

/* ─── Station 7: Packing ─────────────────────────────────────────── */
function PackingSVG({ active, hov }: { active:boolean; hov:boolean }) {
  return (
    <g>
      {/* Machine frame */}
      <rect x="1092" y="270" width="96" height="95" rx="7" fill="#F5EDD8" stroke={INK} strokeWidth="2.2" />
      {/* Hopper */}
      <path d="M 1108,256 L 1100,272 L 1180,272 L 1172,256 Z" fill="none" stroke={INK} strokeWidth="1.8" />
      {/* Belt */}
      <rect x="1092" y="364" width="96" height="10" rx="5" fill="none" stroke={INK} strokeWidth="1.8" />
      <line x1="1098" y1="369" x2="1182" y2="369" stroke={INK_L} strokeWidth="5" strokeDasharray="14 8" className="belt-roll" />
      {/* Boxes on belt */}
      {[0,1,2].map(i => (
        <rect key={i} x={1100+i*25} y="357" width="18" height="12" rx="2"
          fill="#EDE0C4" stroke={INK} strokeWidth="1" />
      ))}
      {/* Gears */}
      <Gear cx={1096} cy={338} r={13} cls="gear-cw" />
      <Gear cx={1184} cy={338} r={13} cls="gear-ccw" />
      {/* N2 label */}
      <text x="1140" y="320" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7" fill={INK} letterSpacing=".1em">N₂ FLUSH</text>
    </g>
  );
}

/* ─── Station 8: Ship ────────────────────────────────────────────── */
function ShipSVG({ active, hov }: { active:boolean; hov:boolean }) {
  return (
    <g className="ship-anim">
      {/* Hull */}
      <path d="M 1165,165 Q 1150,165 1148,180 L 1148,215 Q 1150,225 1165,228 L 1265,228 Q 1280,225 1282,215 L 1282,180 Q 1280,165 1265,165 Z"
        fill="#F5EDD8" stroke={INK} strokeWidth="2.2" />
      {/* Deck */}
      <rect x="1155" y="155" width="120" height="13" rx="3" fill="#EDE0C4" stroke={INK} strokeWidth="1.5" />
      {/* Containers */}
      <rect x="1160" y="178" width="28" height="22" rx="3" fill="rgba(17,17,17,0.15)" stroke={CRIMSON} strokeWidth="1.5" />
      <rect x="1195" y="178" width="28" height="22" rx="3" fill="rgba(26,95,171,0.15)" stroke={BLUE} strokeWidth="1.5" />
      <rect x="1230" y="178" width="28" height="22" rx="3" fill="rgba(46,107,62,0.15)" stroke={GREEN} strokeWidth="1.5" />
      {/* Chimney */}
      <rect x="1200" y="132" width="14" height="24" rx="3" fill={INK} fillOpacity=".2" stroke={INK} strokeWidth="1.5" />
      <g className="steam-a" style={{ transformOrigin: '1207px 130px' }}>
        <ellipse cx="1207" cy="127" rx="5" ry="4" fill={INK} fillOpacity=".2" />
      </g>
      {/* Waves */}
      {[0,1,2,3].map(i => (
        <path key={i}
          d={`M ${1148+i*36},232 Q ${1166+i*36},238 ${1184+i*36},232`}
          fill="none" stroke="#A8CCE8" strokeWidth="1.5" opacity=".6" />
      ))}
      {/* Flag */}
      <line x1="1215" y1="128" x2="1215" y2="108" stroke={INK} strokeWidth="1.5" />
      <path d="M 1215,108 L 1235,115 L 1215,122 Z" fill={CRIMSON} />
      {/* LV on hull */}
      <text x="1215" y="212" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fill={CRIMSON} fontWeight="800">LV</text>
      <text x="1215" y="224" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="6.5" fill={INK_L}>SPICES</text>
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════════════ */
export default function OperationsMap() {
  const [active, setActive] = useState<number | null>(null);
  const [hov, setHov]       = useState<number | null>(null);
  const node = active !== null ? NODES[active] : null;

  const toggle = (i: number) => setActive(v => v === i ? null : i);

  /* Shared hit-box style */
  const hit = (i: number) => ({
    cursor: 'pointer',
    onClick:      () => toggle(i),
    onMouseEnter: () => setHov(i),
    onMouseLeave: () => setHov(null),
  } as React.SVGProps<SVGGElement>);

  /* Highlight rect helper */
  const hl = (i: number, x:number, y:number, w:number, h:number, rx=8) =>
    (hov===i || active===i) && (
      <rect x={x} y={y} width={w} height={h} rx={rx}
        fill={NODES[i].accent} fillOpacity={active===i ? '.09' : '.05'}
        stroke={active===i ? NODES[i].accent : 'none'} strokeWidth="2" />
    );

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
            Seed to Shelf
          </h2>
          <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:13.5, color:'rgba(0,0,0,0.42)', margin:0 }}>
            Tap any station to explore how it works
          </p>
        </div>

        {/* ═══════════ DESKTOP — Full SVG Map ═══════════════════ */}
        <div className="om-desktop">
          <div style={{
            borderRadius: 24,
            background: 'radial-gradient(ellipse at 30% 20%, #fdf8ec 0%, #f5edda 55%, #ede0c4 100%)',
            border: '1px solid rgba(160,130,80,0.2)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04) inset, 0 24px 60px -20px rgba(0,0,0,0.11)',
            overflow: 'hidden', position: 'relative',
          }}>
            {/* Grid texture */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:`linear-gradient(rgba(100,80,40,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(100,80,40,0.055) 1px,transparent 1px)`,
              backgroundSize:'28px 28px' }} />
            {/* Vignette */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              background:'radial-gradient(ellipse at center,transparent 55%,rgba(160,120,60,0.09) 100%)' }} />

            {/* Horizontal scroll */}
            <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch', scrollbarWidth:'none' }}>
              <svg viewBox="0 0 1340 520" style={{ display:'block', minWidth:1100, width:'100%' }}
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="msh" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor={INK} floodOpacity="0.1" />
                  </filter>
                  <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill={INK_L} />
                  </marker>
                </defs>

                {/* Title */}
                <text x="670" y="42" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="10" letterSpacing="4" fill={INK_L}>
                  FARM TO SHELF — LV SPICES OPERATIONS MAP
                </text>

                {/* Animated Route Lines */}
                <RouteLines />

                {/* ══ STATION 1 — FARM ══ */}
                <g {...hit(0)} filter="url(#msh)">
                  {hl(0, 62, 162, 200, 158, 10)}
                  <FarmSVG active={active===0} hov={hov===0} />
                  {/* Badge above top-left of box */}
                  <circle cx="76" cy="152" r="11" fill={CRIMSON} />
                  <text x="76" y="156" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#fff" fontWeight="700">1</text>
                  <text x="162" y="334" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9" fill={active===0?NODES[0].accent:INK} fontWeight="800" letterSpacing=".07em">FARM SOURCING</text>
                  <text x="162" y="348" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7.5" fill={INK_L} fontWeight="600" letterSpacing=".1em">CLICK TO EXPLORE ↗</text>
                </g>

                {/* ══ STATION 2 — TRUCK ══ */}
                <g {...hit(1)} filter="url(#msh)">
                  {hl(1, 302, 152, 120, 70, 8)}
                  <TruckSVG active={active===1} hov={hov===1} />
                  <circle cx="316" cy="141" r="11" fill={CRIMSON} />
                  <text x="316" y="145" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#fff" fontWeight="700">2</text>
                  <text x="362" y="234" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9" fill={active===1?NODES[1].accent:INK} fontWeight="800" letterSpacing=".07em">INBOUND LOGISTICS</text>
                  <text x="362" y="248" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7.5" fill={INK_L} fontWeight="600" letterSpacing=".1em">CLICK TO EXPLORE ↗</text>
                </g>

                {/* ══ STATION 3 — LAB ══ */}
                <g {...hit(2)} filter="url(#msh)">
                  {hl(2, 470, 152, 120, 76, 8)}
                  <LabSVG active={active===2} hov={hov===2} />
                  <circle cx="484" cy="141" r="11" fill={CRIMSON} />
                  <text x="484" y="145" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#fff" fontWeight="700">3</text>
                  <text x="530" y="242" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9" fill={active===2?NODES[2].accent:INK} fontWeight="800" letterSpacing=".07em">360° QC INTAKE</text>
                  <text x="530" y="256" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7.5" fill={INK_L} fontWeight="600" letterSpacing=".1em">CLICK TO EXPLORE ↗</text>
                </g>

                {/* ══ STATION 4 — CLEANER ══ */}
                <g {...hit(3)} filter="url(#msh)">
                  {hl(3, 658, 158, 110, 98, 8)}
                  <CleanerSVG active={active===3} hov={hov===3} />
                  <circle cx="672" cy="147" r="11" fill={CRIMSON} />
                  <text x="672" y="151" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#fff" fontWeight="700">4</text>
                  <text x="709" y="284" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9" fill={active===3?NODES[3].accent:INK} fontWeight="800" letterSpacing=".07em">AUTO CLEANING</text>
                  <text x="709" y="298" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7.5" fill={INK_L} fontWeight="600" letterSpacing=".1em">CLICK TO EXPLORE ↗</text>
                </g>

                {/* ══ STATION 5 — CRYO ══ */}
                <g {...hit(4)} filter="url(#msh)">
                  {hl(4, 826, 248, 112, 114, 12)}
                  <CryoSVG active={active===4} hov={hov===4} />
                  <circle cx="840" cy="237" r="11" fill={CRIMSON} />
                  <text x="840" y="241" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#fff" fontWeight="700">5</text>
                  <text x="898" y="390" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9" fill={active===4?NODES[4].accent:INK} fontWeight="800" letterSpacing=".05em">CRYO GRINDING</text>
                  <text x="898" y="406" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7.5" fill={INK_L} fontWeight="600" letterSpacing=".1em">CLICK TO EXPLORE ↗</text>
                </g>

                {/* ══ STATION 6 — STEAM ══ */}
                <g {...hit(5)} filter="url(#msh)">
                  {hl(5, 960, 348, 126, 160, 10)}
                  <SteamSVG active={active===5} hov={hov===5} />
                  <circle cx="974" cy="337" r="11" fill={CRIMSON} />
                  <text x="974" y="341" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#fff" fontWeight="700">6</text>
                  <text x="1023" y="478" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9" fill={active===5?NODES[5].accent:INK} fontWeight="800" letterSpacing=".05em">STEAM STERILIZATION</text>
                  <text x="1023" y="494" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7.5" fill={INK_L} fontWeight="600" letterSpacing=".1em">CLICK TO EXPLORE ↗</text>
                </g>

                {/* ══ STATION 7 — PACKING ══ */}
                <g {...hit(6)} filter="url(#msh)">
                  {hl(6, 1086, 248, 110, 132, 9)}
                  <PackingSVG active={active===6} hov={hov===6} />
                  <circle cx="1100" cy="237" r="11" fill={CRIMSON} />
                  <text x="1100" y="241" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#fff" fontWeight="700">7</text>
                  <text x="1140" y="390" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9" fill={active===6?NODES[6].accent:INK} fontWeight="800" letterSpacing=".05em">HYGIENIC PACKING</text>
                  <text x="1140" y="406" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7.5" fill={INK_L} fontWeight="600" letterSpacing=".1em">CLICK TO EXPLORE ↗</text>
                </g>

                {/* ══ STATION 8 — SHIP ══ */}
                <g {...hit(7)} filter="url(#msh)">
                  {hl(7, 1144, 100, 144, 144, 12)}
                  <ShipSVG active={active===7} hov={hov===7} />
                  <circle cx="1158" cy="89" r="11" fill={CRIMSON} />
                  <text x="1158" y="93" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fill="#fff" fontWeight="700">8</text>
                  <text x="1215" y="262" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9" fill={active===7?NODES[7].accent:INK} fontWeight="800" letterSpacing=".05em">GLOBAL EXPORT</text>
                  <text x="1215" y="278" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="7.5" fill={INK_L} fontWeight="600" letterSpacing=".1em">CLICK TO EXPLORE ↗</text>
                </g>

              </svg>
            </div>

            {/* Hint */}
            <div style={{ textAlign:'center', padding:'8px 0 14px', fontFamily:"'Courier New',monospace", fontSize:9, color:INK_L, letterSpacing:'0.14em', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
              <span className="scroll-hint">›</span>
              {active === null ? 'CLICK ANY STATION TO LEARN MORE' : 'CLICK AGAIN TO DESELECT'}
              <span className="scroll-hint" style={{ transform:'scaleX(-1)', display:'inline-block' }}>›</span>
            </div>
          </div>
        </div>

        {/* ═══════════ MOBILE — Snake Flowchart ═════════════════ */}
        <div className="om-mobile">
          <div style={{
            borderRadius: 20,
            background: 'radial-gradient(ellipse at 30% 20%, #fdf8ec 0%, #f5edda 55%, #ede0c4 100%)',
            border: '1px solid rgba(160,130,80,0.2)',
            boxShadow: '0 12px 40px -12px rgba(0,0,0,0.12)',
            overflow: 'hidden', position: 'relative',
          }}>
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:`linear-gradient(rgba(100,80,40,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(100,80,40,0.055) 1px,transparent 1px)`,
              backgroundSize:'20px 20px' }} />

            <div style={{ padding: '24px 0', position: 'relative', zIndex: 1 }}>
              <svg viewBox={`0 0 320 ${180 + NODES.length * 160}`} style={{ display: 'block', width: '100%', height: 'auto' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="m-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={CRIMSON} floodOpacity="0.3"/>
                  </filter>
                </defs>

                {/* Draw the track */}
                {(() => {
                  const mSX = Array.from({length: 8}, (_, i) => i % 2 === 0 ? 80 : 240);
                  const mSY = Array.from({length: 8}, (_, i) => 120 + i * 160);
                  const mRelay: [number, number][] = [];
                  for (let i = 0; i < 7; i++) {
                    const y2 = 200 + i * 160;
                    mRelay.push([80, y2], [240, y2]);
                  }
                  const pathD = `M80,40 L80,120 ` + Array.from({length: 7}, (_, i) => {
                    const y2 = 200 + i * 160;
                    const y3 = 280 + i * 160;
                    return i % 2 === 0 ? `C80,${y2} 240,${y2} 240,${y3}` : `C240,${y2} 80,${y2} 80,${y3}`;
                  }).join(' ');
                  
                  return (
                    <>
                      <path d={pathD} fill="none" stroke="#E5E3D8" strokeWidth="18" strokeLinecap="round" />
                      <path d={pathD} fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round" />
                      <path d={pathD} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" className="belt-roll" />

                      {/* Render each node on the path */}
                      {NODES.map((n, i) => {
                        const x = mSX[i];
                        const y = mSY[i];
                        const isAct = active === i;
                        const BOX_W = 100;
                        const BOX_H = 80;
                        
                        return (
                          <g key={n.id} onClick={() => toggle(i)} style={{ cursor: 'pointer' }}>
                            {/* Hitbox */}
                            <rect x={x - 70} y={y - 60} width="140" height="140" fill="transparent" />
                            
                            {/* Station Badge Background */}
                            <rect x={x - BOX_W/2} y={y - BOX_H/2} width={BOX_W} height={BOX_H} rx="16" 
                              fill={isAct ? '#fdf8ec' : '#fff'} 
                              stroke={isAct ? CRIMSON : 'rgba(160,130,80,0.5)'} 
                              strokeWidth={isAct ? "2" : "1.5"} 
                              style={{ transition: 'all 0.3s' }}
                            />
                            
                            {/* Step Tag (Floating on top left) */}
                            <circle cx={x - BOX_W/2} cy={y - BOX_H/2 + 10} r="14" fill={isAct ? CRIMSON : '#fff'} stroke={INK} strokeWidth="1.5" />
                            <text x={x - BOX_W/2} y={y - BOX_H/2 + 14} textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="10" fontWeight="800" fill={isAct ? '#fff' : INK}>
                              0{n.id}
                            </text>
                            
                            {/* Title text below */}
                            <rect x={x - 60} y={y + BOX_H/2 + 10} width="120" height="26" rx="13" fill={isAct ? CRIMSON : '#F5EDD8'} />
                            <text x={x} y={y + BOX_H/2 + 27} textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9" fontWeight="800" fill={isAct ? '#fff' : INK}>
                              {n.name.toUpperCase()}
                            </text>
                            
                            {/* Mini Machine SVG */}
                            <svg x={x - 45} y={y - 36} width="90" height="72" viewBox="0 0 80 64">
                              {/* Station 1: Farm */}
                              {n.id===1 && (<>
                                <rect x="4" y="24" width="22" height="30" rx="2" fill="#F5EDD8" stroke={INK} strokeWidth="1.5" />
                                <ellipse cx="15" cy="24" rx="12" ry="5" fill="#EDE0C4" stroke={INK} strokeWidth="1.2" />
                                <line x1="4" y1="34" x2="26" y2="34" stroke={INK_L} strokeWidth=".7" strokeDasharray="3 2" />
                                <line x1="4" y1="43" x2="26" y2="43" stroke={INK_L} strokeWidth=".7" strokeDasharray="3 2" />
                                <line x1="52" y1="54" x2="52" y2="32" stroke={INK} strokeWidth="1.8" />
                                <ellipse cx="52" cy="27" rx="10" ry="12" fill={GREEN} fillOpacity=".5" />
                                <line x1="66" y1="54" x2="66" y2="38" stroke={INK} strokeWidth="1.4" />
                                <ellipse cx="66" cy="34" rx="8" ry="10" fill={GREEN} fillOpacity=".4" />
                                <rect x="8" y="54" width="64" height="8" rx="2" fill="#C8E6A0" fillOpacity=".4" />
                                <circle cx="15" cy="50" r="2.5" fill={GREEN} className="pulse-dot" />
                              </>)}
                              {/* Station 2: Truck */}
                              {n.id===2 && (<>
                                <g className="truck-anim" style={{ transformOrigin:'40px 40px' }}>
                                  <rect x="8" y="26" width="22" height="22" rx="2.5" fill="#F5EDD8" stroke={INK} strokeWidth="1.4" />
                                  <rect x="10" y="28" width="18" height="13" rx="1.5" fill="rgba(168,204,232,0.4)" stroke={INK_L} strokeWidth=".8" />
                                  <rect x="30" y="21" width="38" height="27" rx="2" fill="#F5EDD8" stroke={INK} strokeWidth="1.4" />
                                  <text x="49" y="32" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="5" fill={INK}>COLD</text>
                                  <text x="49" y="40" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="5" fill={INK}>CHAIN</text>
                                  <line x1="5" y1="49" x2="72" y2="49" stroke={INK} strokeWidth="2.5" />
                                  <circle cx="20" cy="49" r="6" fill="none" stroke={INK} strokeWidth="2" />
                                  <circle cx="20" cy="49" r="2.5" fill={INK} fillOpacity=".2" />
                                  <circle cx="55" cy="49" r="6" fill="none" stroke={INK} strokeWidth="2" />
                                  <circle cx="55" cy="49" r="2.5" fill={INK} fillOpacity=".2" />
                                </g>
                                <g className="steam-a" style={{ transformOrigin:'10px 24px' }}>
                                  <ellipse cx="10" cy="22" rx="3" ry="2.5" fill={INK} fillOpacity=".18" />
                                </g>
                              </>)}
                              {/* Station 3: Lab */}
                              {n.id===3 && (<>
                                <rect x="16" y="52" width="40" height="6" rx="2.5" fill={INK} fillOpacity=".13" stroke={INK} strokeWidth="1.2" />
                                <rect x="24" y="20" width="6" height="32" rx="2" fill="#F5EDD8" stroke={INK} strokeWidth="1.2" />
                                <path d="M 27,22 Q 42,18 46,26" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
                                <ellipse cx="47" cy="30" rx="6" ry="8" fill="#EDE0C4" stroke={INK} strokeWidth="1.4" />
                                <ellipse cx="47" cy="32" rx="3.5" ry="5.5" fill="rgba(168,204,232,0.3)" />
                                <line x1="20" y1="42" x2="47" y2="42" stroke={CRIMSON} strokeWidth="1.2" strokeOpacity=".7" className="scan-line" />
                                <path d="M 58,18 L 58,48 Q 58,54 63,54 Q 68,54 68,48 L 68,18 Z" fill="rgba(200,228,255,0.35)" stroke={INK} strokeWidth="1.2" />
                                <rect x="55" y="13" width="16" height="6" rx="1.5" fill={INK} fillOpacity=".13" stroke={INK} strokeWidth="1" />
                                <rect x="59" y="44" width="8" height="6" rx="1" fill={`${BLUE}35`} />
                              </>)}
                              {/* Station 4: Cleaner */}
                              {n.id===4 && (<>
                                <rect x="18" y="20" width="48" height="36" rx="4" fill="#F5EDD8" stroke={INK} strokeWidth="1.6" />
                                {[0,1,2].map(j => <line key={j} x1="24" y1={29+j*9} x2="60" y2={29+j*9} stroke={INK_L} strokeWidth=".8" strokeDasharray="4 2" />)}
                                <path d="M 21,12 L 15,20 L 67,20 L 61,12 Z" fill="none" stroke={INK} strokeWidth="1.4" />
                                <Gear cx={66} cy={38} r={9} cls="gear-cw" />
                              </>)}
                              {/* Station 5: Cryo */}
                              {n.id===5 && (<>
                                <rect x="8" y="10" width="64" height="50" rx="7" fill="#E8F4FB" stroke={INK} strokeWidth="1.5" />
                                <rect x="14" y="16" width="52" height="38" rx="5" fill="none" stroke="#A8CCE8" strokeWidth="1.2" />
                                <text x="40" y="34" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="11" fontWeight="700" fill={BLUE}>−196°C</text>
                                <text x="40" y="45" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="5.5" fill={BLUE} letterSpacing=".04em">CRYO</text>
                                <Snowflake cx={40} cy={56} r={10} />
                              </>)}
                              {/* Station 6: Steam */}
                              {n.id===6 && (<>
                                <rect x="14" y="26" width="52" height="34" rx="5" fill="#F5EDD8" stroke={INK} strokeWidth="1.6" />
                                {[0,1].map(j => <rect key={j} x={20+j*26} y="18" width="10" height="9" rx="2" fill={INK} fillOpacity=".18" stroke={INK} strokeWidth="1.2" />)}
                                {[0,1].map(j => (
                                  <g key={j} className={['steam-a','steam-b'][j]} style={{ transformOrigin:`${25+j*26}px 16px` }}>
                                    <ellipse cx={25+j*26} cy={15} rx="3.5" ry="3" fill={INK} fillOpacity=".18" />
                                  </g>
                                ))}
                                <circle cx="40" cy="43" r="14" fill="none" stroke={INK} strokeWidth="1.2" />
                                <line x1="40" y1="43" x2={40+11*Math.cos(-20*Math.PI/180)} y2={43+11*Math.sin(-20*Math.PI/180)} stroke={CRIMSON} strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="40" cy="43" r="2.5" fill={INK} />
                              </>)}
                              {/* Station 7: Packing */}
                              {n.id===7 && (<>
                                <rect x="16" y="18" width="48" height="36" rx="4" fill="#F5EDD8" stroke={INK} strokeWidth="1.6" />
                                <path d="M 22,11 L 16,18 L 64,18 L 58,11 Z" fill="none" stroke={INK} strokeWidth="1.4" />
                                <rect x="16" y="54" width="48" height="6" rx="3" fill="none" stroke={INK} strokeWidth="1.4" />
                                <line x1="19" y1="57" x2="61" y2="57" stroke={INK_L} strokeWidth="3.5" strokeDasharray="9 5" className="belt-roll" />
                                {[0,1,2].map(j => <rect key={j} x={20+j*14} y="48" width="11" height="7" rx="1.5" fill="#EDE0C4" stroke={INK} strokeWidth=".7" />)}
                                <Gear cx={14} cy={36} r={8} cls="gear-cw" />
                                <Gear cx={66} cy={36} r={8} cls="gear-ccw" />
                                <text x="40" y="36" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="5" fill={INK} letterSpacing=".07em">N₂ FLUSH</text>
                              </>)}
                              {/* Station 8: Ship */}
                              {n.id===8 && (<>
                                <g className="ship-anim">
                                  <path d="M 8,36 Q 5,36 4,42 L 4,54 Q 5,58 10,59 L 70,59 Q 75,58 76,54 L 76,42 Q 75,36 72,36 Z" fill="#F5EDD8" stroke={INK} strokeWidth="1.6" />
                                  <rect x="6" y="31" width="68" height="7" rx="2" fill="#EDE0C4" stroke={INK} strokeWidth="1.2" />
                                  <rect x="12" y="40" width="14" height="11" rx="1.5" fill="rgba(17,17,17,0.15)" stroke={CRIMSON} strokeWidth="1" />
                                  <rect x="32" y="40" width="14" height="11" rx="1.5" fill="rgba(26,95,171,0.15)" stroke={BLUE} strokeWidth="1" />
                                  <rect x="52" y="40" width="14" height="11" rx="1.5" fill="rgba(46,107,62,0.15)" stroke={GREEN} strokeWidth="1" />
                                  <rect x="36" y="14" width="8" height="18" rx="2" fill={INK} fillOpacity=".18" stroke={INK} strokeWidth="1" />
                                  <g className="steam-a" style={{ transformOrigin:'40px 12px' }}><ellipse cx="40" cy="11" rx="3.5" ry="3" fill={INK} fillOpacity=".18" /></g>
                                  {[0,1,2].map(j => <path key={j} d={`M ${4+j*24},63 Q ${16+j*24},67 ${28+j*24},63`} fill="none" stroke="#A8CCE8" strokeWidth="1.2" opacity=".6" />)}
                                  <line x1="40" y1="14" x2="40" y2="5" stroke={INK} strokeWidth="1.2" />
                                  <path d="M 40,5 L 52,9 L 40,13 Z" fill={CRIMSON} />
                                </g>
                              </>)}
                            </svg>
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
            
            <div style={{ textAlign:'center', padding:'12px 16px 18px', fontFamily:"'Courier New',monospace", fontSize:10, color:INK_L, letterSpacing:'0.16em', fontWeight:700 }}>
              {active===null ? 'TAP ANY STATION TO EXPLORE' : 'TAP AGAIN TO CLOSE'}
            </div>
          </div>
        </div>

      </div>

      {/* Unified Global Floating Modal */}
      {node && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24, animation: 'fadeIn 0.3s cubic-bezier(0.16,1,0.3,1)'
        }} onClick={() => setActive(null)}>
          <div style={{
            background:'#fff', borderRadius:0, border:`2px solid ${INK}`,
            padding:'clamp(32px,5vw,48px)', maxWidth:540, width:'100%',
            boxShadow:`8px 8px 0px ${node.accent}`,
            animation:'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
            position:'relative',
          }} onClick={e => e.stopPropagation()}>
            <button onClick={()=>setActive(null)} style={{
              position:'absolute', top:20, right:20, background:INK, border:'none',
              fontSize:24, color:'#fff', cursor:'pointer', width:40, height:40,
              display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s',
            }}
              onMouseEnter={e=>(e.currentTarget.style.background=node.accent)}
              onMouseLeave={e=>(e.currentTarget.style.background=INK)}
            >×</button>
            <div style={{ display:'flex', gap:20, alignItems:'center', marginBottom:24 }}>
              <div style={{
                flexShrink:0, width:60, height:60, background:'#fff', border:`2px solid ${INK}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:26,
                boxShadow:`4px 4px 0px ${node.accent}`
              }}>
                {node.icon}
              </div>
              <div>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:node.accent, marginBottom:6, fontWeight:700 }}>
                  STEP 0{node.id} · {node.stat}
                </div>
                <div style={{ fontFamily:'var(--font-display), ui-sans-serif, system-ui, sans-serif', fontSize:'clamp(22px,3vw,28px)', fontWeight:400, color:INK, lineHeight:1.1, textTransform: 'uppercase' }}>
                  {node.name}
                </div>
              </div>
            </div>
            <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:15, color:'rgba(0,0,0,0.7)', lineHeight:1.8, margin:0 }}>
              {node.desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
