'use client';

import { useState } from 'react';

const RED   = '#AC033B';
const INK   = '#1A1915';
const INK_L = '#4A4A4A';

interface ProcessStep {
  n: number;
  label: string;
  emoji: string;
  color: string;
  tag: string;
  desc: string;
  extraLabel1?: string;
  extraValue1?: string;
}

const GROUND_SPICE_STEPS: ProcessStep[] = [
  { n: 1, label: 'Raw Material Receipt', emoji: '📦', color: '#1A6B3E', tag: 'Sourcing', desc: 'We purchase raw material from the local mandis or APMCs as well as outstation mandis. Material is sourced from producing centres during peak harvest to advantage freshness and colour.', extraLabel1: 'Note', extraValue1: 'Sourced directly from APMCs' },
  { n: 2, label: 'Inspection', emoji: '🔬', color: '#C0392B', tag: 'Quality', desc: 'All incoming raw material undergoes rigorous quality inspection. Samples are tested in our in-house lab. Material not conforming to standards is immediately returned to the supplier.', extraLabel1: 'Decision', extraValue1: 'YES/NO' },
  { n: 3, label: 'Unloading', emoji: '🏗️', color: '#2980B9', tag: 'Logistics', desc: 'Post-inspection approval, raw material is unloaded. Based on moisture content and product type, it is directed to either dry storage or cold storage.', extraLabel1: 'Destinations', extraValue1: 'Dry / Cold Storage' },
  { n: 4, label: 'Issue to Production', emoji: '📋', color: '#F39C12', tag: 'Planning', desc: 'Approved stored material is formally issued to the production floor with documented work orders, ensuring full traceability at every production stage.' },
  { n: 5, label: 'Weighing', emoji: '⚖️', color: '#8E44AD', tag: 'Process', desc: 'Every batch is precisely weighed before processing begins. Our digital weighing systems ensure exact quantities, eliminating variance in formulations.' },
  { n: 6, label: 'Mixing', emoji: '🔄', color: '#27AE60', tag: 'Process', desc: 'Where required, ingredients are pre-mixed as per recipe specifications before entering the grinding line.', extraLabel1: 'Type', extraValue1: 'Optional' },
  { n: 7, label: 'Feeding', emoji: '⚙️', color: '#D35400', tag: 'Process', desc: 'The spice material is fed into the grinding line via automated bucket conveyors — ensuring consistent, contamination-free material flow.', extraLabel1: 'Machine', extraValue1: 'Bucket Conveyor' },
  { n: 8, label: '1st Grinding', emoji: '🌪️', color: '#C0392B', tag: 'Grinding', desc: 'First pass through our high-speed grinding mills. Particle size is monitored in real time to meet the target distribution.', extraLabel1: 'Machine', extraValue1: 'Screw Conveyor' },
  { n: 9, label: '2nd Grinding', emoji: '🌪️', color: '#C0392B', tag: 'Grinding', desc: 'For premium fine powders, a second grinding pass achieves sub-500 micron particle size consistency.', extraLabel1: 'Type', extraValue1: 'Optional' },
  { n: 10, label: '3rd Grinding', emoji: '🌪️', color: '#C0392B', tag: 'Grinding', desc: 'Ultra-fine applications may require a third grinding cycle for maximum powder fineness and homogeneity.', extraLabel1: 'Type', extraValue1: 'Optional' },
  { n: 11, label: 'Blending', emoji: '🧪', color: '#2980B9', tag: 'Process', desc: 'All components are blended in stainless steel blenders. For spice blends, whole ingredients are incorporated as per the exact recipe. Essential oils added where required.', extraLabel1: 'Additives', extraValue1: 'Oil (if blended)' },
  { n: 12, label: 'Vibroseiving', emoji: '🎛️', color: '#8E44AD', tag: 'Filtration', desc: 'Product passes through vibro-sieve machines to remove coarse particles, lumps, and any foreign material, ensuring uniformity.' },
  { n: 13, label: 'Final Inspection', emoji: '🔬', color: '#C0392B', tag: 'Quality', desc: 'Final product inspection against physical, chemical, and microbiological specifications. Packing material is simultaneously received and inspected.', extraLabel1: 'Decision', extraValue1: 'YES/NO' },
  { n: 14, label: 'Weighing', emoji: '⚖️', color: '#8E44AD', tag: 'Packing', desc: 'Approved product is weighed for packing. Packing materials undergo parallel inspection, storage, and printing as needed.' },
  { n: 15, label: 'Bulk Packing', emoji: '🛍️', color: '#27AE60', tag: 'Packing', desc: 'Product is packed in bulk bags (25kg / 50kg) or primary packs as per customer specification. Automated filling ensures exact fill weights.' },
  { n: 16, label: 'Tying', emoji: '🎗️', color: '#D35400', tag: 'Packing', desc: 'All bags are securely tied and sealed — multiple closure points ensure product integrity during transit.' },
  { n: 17, label: 'Stitching', emoji: '🧵', color: '#F39C12', tag: 'Packing', desc: 'Jute/PP bags are machine-stitched for extra strength. Product is simultaneously prepared for dispatch scheduling.' },
  { n: 18, label: 'Storage', emoji: '🏭', color: '#1A6B3E', tag: 'Logistics', desc: 'Finished goods are stored in our controlled warehouse. Containers are pre-fumigated with approved fumigants before loading.', extraLabel1: 'Note', extraValue1: 'Container Fumigation' },
  { n: 19, label: 'Vehicle Inspection', emoji: '🚚', color: '#C0392B', tag: 'Quality', desc: 'Each vehicle undergoes inspection for cleanliness, structural integrity, and temperature conditions before loading begins.', extraLabel1: 'Decision', extraValue1: 'YES/NO' },
  { n: 20, label: 'Loading / Stuffing', emoji: '🚢', color: '#2980B9', tag: 'Dispatch', desc: 'Products are loaded into containers with polysheet and craft paper lining on all walls. Dispatch from Mumbai Nhava Sheva / JNPT / Mundra for sailing.', extraLabel1: 'Ports', extraValue1: 'JNPT / Mundra' },
];

const WHOLE_SEEDS_STEPS: ProcessStep[] = [
  { n: 1, label: 'Natural Whole Seeds', emoji: '🌱', color: '#1A6B3E', tag: 'Sourcing', desc: 'Premium natural whole seeds sourced from farms following Integrated Pest Management practices.' },
  { n: 2, label: 'Seed Cleaning', emoji: '🧹', color: '#2980B9', tag: 'Process', desc: 'Initial cleaning removes dust, chaff, and gross impurities. Out-sorted material goes to the domestic immediate market.', extraLabel1: 'Note', extraValue1: 'Out Sort → Domestic' },
  { n: 3, label: 'Seed Grading/Magnet', emoji: '🧲', color: '#8E44AD', tag: 'Process', desc: 'Three-stage grading with magnet application removes dead, immature seeds and ferrous metal contaminants ensuring only premium seeds proceed.' },
  { n: 4, label: 'Drying', emoji: '☀️', color: '#F39C12', tag: 'Process', desc: 'Controlled sun drying or industrial drying to reduce moisture content to export-acceptable levels while preserving colour and volatile oil content.' },
  { n: 5, label: 'Wet Hulling', emoji: '💦', color: '#3498DB', tag: 'Process', desc: 'Outer hull removed where required. Rejected material is redirected to the domestic market.', extraLabel1: 'Note', extraValue1: 'Reject → Domestic' },
  { n: 6, label: 'Cleaning & Grading', emoji: '🎛️', color: '#27AE60', tag: 'Process', desc: 'Post-hulling second pass of cleaning and size grading on vibro-separators and gravity tables for export-quality selection.' },
  { n: 7, label: 'Colour Sorting', emoji: '🌈', color: '#E74C3C', tag: 'Quality', desc: 'Advanced Z-series colour sorting machines with pre-packing magnets in place remove any colour-defective seeds and residual metal.', extraLabel1: 'Machine', extraValue1: 'Z-Series Sortex' },
  { n: 8, label: 'Packing for Export', emoji: '🛍️', color: '#D35400', tag: 'Packing', desc: 'Sorted, graded product is packed in new jute bags / PP bags / vacuum packs per buyer specification. Each bag is labelled with lot/batch traceability codes.' },
  { n: 9, label: 'SGS Sampling', emoji: '🔬', color: '#C0392B', tag: 'Quality', desc: 'Final random sampling by our quality team following SGS-equivalent methodology. Reports prepared for each consignment before shipment.', extraLabel1: 'Report', extraValue1: 'Before Shipment' },
  { n: 10, label: 'Container Prep', emoji: '🚢', color: '#2980B9', tag: 'Dispatch', desc: 'Cleaning, fumigation & factory stuffing of containers. Polysheet & craft paper lined walls for all shipments. Dispatch from Mumbai Nhava Sheva / JNPT / Mundra.', extraLabel1: 'Ports', extraValue1: 'JNPT / Mundra' },
];

const CSS = `
  @keyframes pc-trackMove { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
  @keyframes pc-gearSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes pc-pulseLight { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  @keyframes pc-slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pc-radarSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes pc-floatVat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

  .pc-track-anim { animation: pc-trackMove 1.5s linear infinite; }
  @media (min-width: 800px) { .pc-mobile { display:none !important; } }
  @media (max-width: 799px)  { .pc-desktop { display:none !important; } }
  .pc-gear-anim { animation: pc-gearSpin 5s linear infinite; transform-box: fill-box; transform-origin: center; }
  .pc-light-pulse { animation: pc-pulseLight 1.5s ease-in-out infinite; }
  .pc-radar-spin { animation: pc-radarSpin 3s linear infinite; transform-box: fill-box; transform-origin: center; }
  .pc-vat-float { animation: pc-floatVat 3s ease-in-out infinite; }



  .pc-modal-overlay {
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: pc-slideUp 0.3s cubic-bezier(0.16,1,0.3,1);
  }

  .pc-tab {
    padding: 12px 32px;
    border-radius: 999px;
    border: 1.5px solid rgba(0,0,0,0.12);
    background: none; cursor: pointer;
    transition: all 0.2s;
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(0,0,0,0.5);
  }
  .pc-tab:hover { border-color: #AC033B; color: #AC033B; }
  .pc-tab.active { background: #AC033B; border-color: #AC033B; color: #fff; }
`;

function MachineFactory({ index, x, y, step, isActive, isHov, toggle, setHov }: {
  index: number; x: number; y: number; step: ProcessStep;
  isActive: boolean; isHov: boolean;
  toggle: () => void; setHov: (n: number | null) => void;
}) {
  const isFocus = isActive || isHov;
  const color = step.color;
  const strokeColor = isFocus ? color : INK;
  const strokeW = isFocus ? '2.5' : '1.5';
  
  const i = index % 10;

  return (
    <g onClick={toggle} onMouseEnter={() => setHov(index)} onMouseLeave={() => setHov(null)} style={{ cursor: 'pointer' }}>
      <path d={`M${x-15},${y+40} L${x-15},${y+70} M${x+15},${y+40} L${x+15},${y+70}`} stroke={INK_L} strokeWidth="3" fill="none" strokeDasharray="5 5"/>
      <rect x={x-20} y={y+65} width="40" height="5" fill={INK}/>

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
            <g className="pc-gear-anim">
              <circle cx="0" cy="-18" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="0" cy="-18" r="3" fill={color}/>
              <line x1="-12" y1="-18" x2="12" y2="-18" stroke={strokeColor} strokeWidth="2"/>
              <line x1="0" y1="-6" x2="0" y2="-30" stroke={strokeColor} strokeWidth="2"/>
            </g>
            <circle cx="0" cy="-15" r="4" fill={color} className="pc-light-pulse"/>
          </g>
        )}
        {i === 2 && (
          <g>
            <path d="M-25,40 L25,40 L25,-10 L-25,-10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-25,-10 L0,-30 L25,-10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-10" y="-10" width="20" height="25" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="2" r="4" fill={color} className="pc-light-pulse"/>
            <line x1="-20" y1="20" x2="20" y2="20" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
          </g>
        )}
        {i === 3 && (
          <g>
            <path d="M-30,40 L30,40 L30,10 L-30,10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-30,10 L-20,-20 L20,-20 L30,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="-5" r="12" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="-5" r="6" fill={color} className="pc-light-pulse"/>
            <path d="M0,-17 C-4,-28 4,-34 0,-40" fill="none" stroke={color} strokeWidth="2.5"/>
          </g>
        )}
        {i === 4 && (
          <g>
            <path d="M-40,40 L40,40 L40,10 L-40,10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-40,10 L-30,-20 L30,-20 L40,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-25" y="-15" width="50" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-40" y1="-5" x2="40" y2="-5" stroke={color} strokeWidth="2" className="pc-track-anim"/>
            <g className="pc-gear-anim">
              <circle cx="-25" cy="25" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="-25" cy="25" r="3" fill={INK}/>
            </g>
            <g className="pc-gear-anim">
              <circle cx="25" cy="25" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="25" cy="25" r="3" fill={INK}/>
            </g>
          </g>
        )}
        {i === 5 && (
          <g className="pc-vat-float">
            <path d="M-30,-20 L30,-20 L20,40 L-20,40 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-30,-20 Q0,-35 30,-20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-25" y1="0" x2="25" y2="0" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
            <line x1="-20" y1="20" x2="20" y2="20" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
            <path d="M0,40 L0,55" stroke={strokeColor} strokeWidth="4"/>
            <circle cx="0" cy="20" r="8" fill="none" stroke={color} strokeWidth="2" className="pc-radar-spin"/>
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
            <line x1="-20" y1="-15" x2="-20" y2="5" stroke={color} strokeWidth="2" className="pc-track-anim"/>
          </g>
        )}
        {i === 7 && (
          <g>
            <path d="M-45,40 L-25,40 L-25,-30 L-35,-30 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="-25,-20 L35,-20" fill="none" stroke={strokeColor} strokeWidth="6"/>
            <path d="M0,-20 L0,5" fill="none" stroke={strokeColor} strokeWidth="2" strokeDasharray="2 2"/>
            <rect x="-15" y="5" width="30" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-15" y1="15" x2="15" y2="15" stroke={strokeColor} strokeWidth="1"/>
            <circle cx="35" cy="-20" r="4" fill={color} className="pc-light-pulse"/>
          </g>
        )}
        {i === 8 && (
          <g>
            <circle cx="0" cy="5" r="35" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="5" r="25" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <g className="pc-gear-anim">
              <path d="-15,5 L15,5 M0,-10 L0,20 M-10,-5 L10,15 M10,-5 L-10,15" stroke={strokeColor} strokeWidth="3"/>
              <circle cx="0" cy="5" r="8" fill="#fff" stroke={strokeColor} strokeWidth="2"/>
            </g>
            <circle cx="0" cy="-30" r="5" fill={color} className="pc-light-pulse"/>
          </g>
        )}
        {i === 9 && (
          <g>
            <rect x="-20" y="-10" width="40" height="50" rx="3" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M0,-10 L0,-30 M-10,-20 L10,-40 M-15,-30 Q0,-45 15,-30" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="-30" r="3" fill={color} className="pc-light-pulse"/>
            <path d="-10,10 L10,10 M-10,20 L10,20" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="35" r="4" fill={strokeColor}/>
          </g>
        )}
      </g>

      <circle cx={x} cy={y-8} r="14" fill="#fff" stroke={strokeColor} strokeWidth="1.5" />
      <text x={x} y={y-4} textAnchor="middle" fontSize="14" dominantBaseline="middle">{step.emoji}</text>

      <rect x={x-65} y={y+85} width="130" height="20" rx="10" fill={isActive ? color : '#fff'} stroke={isActive ? 'none' : strokeColor} strokeWidth={isActive ? '0' : '1.5'} />
      <text x={x} y={y+98} textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {step.label.toUpperCase().substring(0, 18)}
      </text>

      <circle cx={x-35} cy={y-45} r="10" fill={isActive ? color : '#fff'} stroke={strokeColor} strokeWidth="1.5"/>
      <text x={x-35} y={y-42} textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {String(step.n).padStart(2, '0')}
      </text>
    </g>
  );
}

export default function ProcessChartFlow() {
  const [activeTab, setActiveTab] = useState<'ground' | 'seeds'>('ground');
  const [active, setActive] = useState<number | null>(null);
  const [hov,    setHov]    = useState<number | null>(null);
  
  const currentSteps = activeTab === 'ground' ? GROUND_SPICE_STEPS : WHOLE_SEEDS_STEPS;
  const activeStep = active !== null ? currentSteps.find(x => x.n === active) : null;
  
  const toggle  = (n: number) => setActive(v => v === n ? null : n);
  const handleTab = (tab: 'ground' | 'seeds') => {
    setActiveTab(tab);
    setActive(null);
  };

  const count = currentSteps.length;

  /* Desktop Horizontal Zigzag */
  const dSX = Array.from({length: count}, (_, i) => 140 + i * 180);
  const dSY = Array.from({length: count}, (_, i) => i % 2 === 0 ? 120 : 250);
  const dTrackY = dSY.map(y => y + 70);
  const dSnakePath = `M${dSX[0]},${dTrackY[0]} ` + Array.from({length: count - 1}, (_, i) => {
    const x1 = dSX[i], y1 = dTrackY[i], x2 = dSX[i+1], y2 = dTrackY[i+1];
    const cp = (x2 - x1) / 2;
    return `C${x1+cp},${y1} ${x2-cp},${y2} ${x2},${y2}`;
  }).join(' ');
  const dRelayX = dSX.slice(0, count-1).map((x, i) => Math.round((x + dSX[i+1]) / 2));
  const dRelayY = dTrackY.slice(0, count-1).map((y, i) => Math.round((y + dTrackY[i+1]) / 2));
  const dViewW = dSX[dSX.length - 1] + 140;

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

  return (
    <>
      <style>{CSS}</style>
      
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 48 }}>
        <button className={`pc-tab ${activeTab === 'ground' ? 'active' : ''}`} onClick={() => handleTab('ground')}>
          Ground Spices / Powder
        </button>
        <button className={`pc-tab ${activeTab === 'seeds' ? 'active' : ''}`} onClick={() => handleTab('seeds')}>
          Natural Whole Seeds
        </button>
      </div>

      {/* DESKTOP — Horizontal Zigzag Assembly Line */}
      <div className="pc-desktop" key={`desktop-${activeTab}`}>
        <div style={{ borderRadius:8, background:'#F0EEE5', border:'1px solid rgba(0,0,0,0.1)', overflow:'hidden', position:'relative' }}>
          <div style={{ position:'absolute', inset:0, pointerEvents:'none',
            backgroundImage:'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)',
            backgroundSize:'40px 40px' }}/>
          <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch', scrollbarWidth:'none', msOverflowStyle:'none', cursor:'grab' }}>
            <svg viewBox={`0 0 ${dViewW} 450`} style={{ display:'block', minWidth:dViewW, width:'100%' }} xmlns="http://www.w3.org/2000/svg">
              <defs><filter id="pc-glow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={RED} floodOpacity="0.3"/></filter></defs>
              <path d={dSnakePath} fill="none" stroke="#E5E3D8" strokeWidth="18" strokeLinecap="round"/>
              <path d={dSnakePath} fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round"/>
              <path d={dSnakePath} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" className="pc-track-anim"/>
              {dRelayX.map((cx, k) => (
                <g key={k} transform={`translate(${cx}, ${dRelayY[k]})`} className="pc-gear-anim">
                  <circle cx="0" cy="0" r="10" fill="#F0EEE5" stroke={INK} strokeWidth="2"/>
                  <circle cx="0" cy="0" r="3" fill={INK}/>
                  <circle cx="6" cy="0" r="1.5" fill={INK}/>
                  <circle cx="-6" cy="0" r="1.5" fill={INK}/>
                  <circle cx="0" cy="6" r="1.5" fill={INK}/>
                  <circle cx="0" cy="-6" r="1.5" fill={INK}/>
                </g>
              ))}
              {currentSteps.map((s, i) => (
                <MachineFactory key={s.n} index={i} x={dSX[i]} y={dSY[i]} step={s}
                  isActive={active===s.n} isHov={hov===i} toggle={()=>toggle(s.n)} setHov={setHov}/>
              ))}
            </svg>
          </div>
          <div style={{ textAlign:'center', padding:'12px 16px 18px', fontFamily:"'Courier New',monospace", fontSize:10, color:INK_L, letterSpacing:'0.16em', fontWeight:700 }}>
            {active===null ? '\u2190 DRAG TO EXPLORE \u2022 CLICK ANY STAGE TO LEARN MORE \u2192' : 'CLICK AGAIN OR USE CROSS TO CLOSE'}
          </div>
        </div>
      </div>

      {/* MOBILE — Vertical Zigzag Assembly Line */}
      <div className="pc-mobile" key={`mobile-${activeTab}`}>
        <div style={{ borderRadius:8, background:'#F0EEE5', border:'1px solid rgba(0,0,0,0.1)', overflow:'hidden', position:'relative' }}>
          <div style={{ position:'absolute', inset:0, pointerEvents:'none',
            backgroundImage:'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)',
            backgroundSize:'30px 30px' }}/>
          <svg viewBox={`0 0 360 ${160 + count * 220}`} style={{ display:'block', width:'100%', position:'relative', zIndex:2 }} xmlns="http://www.w3.org/2000/svg">
            <path d={mSnakePath} fill="none" stroke="#E5E3D8" strokeWidth="18" strokeLinecap="round"/>
            <path d={mSnakePath} fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round"/>
            <path d={mSnakePath} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" className="pc-track-anim"/>
            {mRelayWheels.map(([cx,cy],k) => (
              <g key={k} transform={`translate(${cx}, ${cy})`} className="pc-gear-anim">
                <circle cx="0" cy="0" r="9" fill="#F0EEE5" stroke={INK} strokeWidth="1.5"/>
                <circle cx="0" cy="0" r="3" fill={INK}/>
                <circle cx="5" cy="0" r="1.5" fill={INK}/>
                <circle cx="-5" cy="0" r="1.5" fill={INK}/>
                <circle cx="0" cy="5" r="1.5" fill={INK}/>
                <circle cx="0" cy="-5" r="1.5" fill={INK}/>
              </g>
            ))}
            {currentSteps.map((s, i) => (
              <MachineFactory key={s.n} index={i} x={mSX[i]} y={mSY[i]} step={s}
                isActive={active === s.n} isHov={hov === i}
                toggle={() => toggle(s.n)} setHov={setHov}/>
            ))}
          </svg>
        </div>
      </div>

      {activeStep && (
        <div className="pc-modal-overlay" onClick={() => setActive(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#fff', width: '100%', maxWidth: 460,
            border: `2px solid ${INK}`,
            boxShadow: `8px 8px 0px ${activeStep.color}`,
            padding: 'clamp(24px, 4vw, 32px)',
            position: 'relative'
          }}>
            <button onClick={() => setActive(null)} style={{
              position: 'absolute', top: 16, right: 16,
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: 24, color: INK, padding: 8, lineHeight: 1
            }}>×</button>

            <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
              <div style={{
                flexShrink: 0, width: 60, height: 60,
                background: '#fff', border: `2px solid ${INK}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, boxShadow: `4px 4px 0px ${activeStep.color}`
              }}>
                {activeStep.emoji}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: activeStep.color, marginBottom: 4, fontWeight: 700 }}>
                  STAGE {String(activeStep.n).padStart(2, '0')} — {activeStep.tag}
                </div>
                <div style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 24, fontWeight: 800, color: INK, lineHeight: 1.1 }}>
                  {activeStep.label}
                </div>
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(0,0,0,0.7)', lineHeight: 1.7, margin: '0 0 24px' }}>
              {activeStep.desc}
            </p>

            {activeStep.extraLabel1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f5f5f5', border: `1px solid ${INK_L}`, padding: '12px 16px', boxShadow: `2px 2px 0px ${INK_L}` }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: INK_L, fontWeight: 700 }}>{activeStep.extraLabel1}:</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: activeStep.color }}>{activeStep.extraValue1}</span>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
