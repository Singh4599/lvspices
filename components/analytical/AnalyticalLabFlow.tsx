'use client';

import { useState } from 'react';

const RED   = '#AC033B';
const INK   = '#1A1915';
const INK_L = '#4A4A4A';

interface LabTest {
  n: number;
  id: string;
  name: string;
  emoji: string;
  color: string;
  tag: string;
  desc: string;
  category: 'CHEMICAL' | 'MICROBIOLOGY' | 'PESTICIDE';
  extraLabel1?: string;
  extraValue1?: string;
  extraLabel2?: string;
  extraValue2?: string;
}

const TESTS: LabTest[] = [
  // CHEMICAL
  { n: 1, category: 'CHEMICAL', id: 'color', name: 'Colour in Chilli', emoji: '🌶', color: '#C0392B', tag: 'ASTA', desc: 'Precise spectrophotometric measurement of extractable colour (chlorophylls, carotenoids) in Capsicum species using globally recognized ASTA 20.1 methods to guarantee vibrant, consistent B2B product profiles.', extraLabel1: 'Method', extraValue1: 'ASTA 20.1', extraLabel2: 'Range', extraValue2: '80–200 ASTA' },
  { n: 2, category: 'CHEMICAL', id: 'capsaicin', name: 'Capsaicin (Heat)', emoji: '🔥', color: '#E67E22', tag: 'Pungency', desc: 'Quantitative High-Performance Liquid Chromatography (HPLC) profiling of capsaicinoids to precisely calibrate Scoville Heat Units (SHU), ensuring uniform pungency for demanding culinary formulations.', extraLabel1: 'Method', extraValue1: 'HPLC (ASTA 21.3)', extraLabel2: 'Range', extraValue2: '0.1–2.0%' },
  { n: 3, category: 'CHEMICAL', id: 'moisture', name: 'Moisture', emoji: '💧', color: '#2980B9', tag: 'Stability', desc: 'Accurate moisture and volatile matter determination via vacuum oven methods, critical for preventing microbial proliferation and maximizing shelf-life stability in bulk spice commodities.', extraLabel1: 'Method', extraValue1: 'Vacuum Oven', extraLabel2: 'Limit', extraValue2: '≤ 12% w/w' },
  { n: 4, category: 'CHEMICAL', id: 'totalash', name: 'Total Ash', emoji: '⚗️', color: '#7F8C8D', tag: 'Purity', desc: 'Gravimetric determination of total mineral ash following complete incineration. A critical quality index proving the absolute absence of inorganic adulterants or extraneous mineral matter.', extraLabel1: 'Method', extraValue1: 'Gravimetric', extraLabel2: 'Limit', extraValue2: '≤ 8% w/w' },
  { n: 5, category: 'CHEMICAL', id: 'curcuminoid', name: 'Curcuminoid', emoji: '🌿', color: '#F39C12', tag: 'Bioactive', desc: 'Spectrophotometric and chromatographic quantification of principal curcuminoids in turmeric, certifying the concentration of essential bioactive and antioxidant components for nutraceutical buyers.', extraLabel1: 'Method', extraValue1: 'Spectrophotometry', extraLabel2: 'Range', extraValue2: '2–5% w/w' },
  { n: 6, category: 'CHEMICAL', id: 'piperine', name: 'Piperine', emoji: '🫙', color: '#2C3E50', tag: 'Alkaloid', desc: 'Rigorous extraction and HPLC analysis of piperine alkaloid content in black pepper, verifying the authentic bite and characteristic heat profile demanded by premium global markets.', extraLabel1: 'Method', extraValue1: 'HPLC', extraLabel2: 'Range', extraValue2: '4–9% w/w' },
  { n: 7, category: 'CHEMICAL', id: 'volatile', name: 'Volatile Oil', emoji: '🧴', color: '#1ABC9C', tag: 'Aroma', desc: 'Hydrodistillation using Clevenger apparatus to precisely measure volatile (essential) oil content, guaranteeing the potent aroma and volatile flavor retention of our ground and whole spices.', extraLabel1: 'Method', extraValue1: 'Hydrodistillation', extraLabel2: 'Range', extraValue2: '1–4 ml/100g' },
  { n: 8, category: 'CHEMICAL', id: 'crudefiber', name: 'Crude Fiber', emoji: '🌾', color: '#8E44AD', tag: 'Fiber', desc: 'Quantitative analysis of insoluble cellulose and lignin residue post acid-alkali hydrolysis, an essential parameter for determining true spice purity and detecting exhausted matrix adulteration.', extraLabel1: 'Method', extraValue1: 'Hydrolysis', extraLabel2: 'Range', extraValue2: '15–30% w/w' },
  { n: 9, category: 'CHEMICAL', id: 'particle', name: 'Particle Size', emoji: '🔬', color: '#16A085', tag: 'Sieve', desc: 'Advanced Particle Size Distribution (PSD) analysis via mechanical sieve shakers to ensure precise granulation thresholds, enabling optimal dispersion and solubility in industrial food processing.', extraLabel1: 'Method', extraValue1: 'Ro-Tap Sieve', extraLabel2: 'Range', extraValue2: 'Micron Specific' },
  
  // MICROBIOLOGY
  { n: 10, category: 'MICROBIOLOGY', id: 'salmonella', name: 'Salmonella spp.', emoji: '🦠', color: '#C0392B', tag: 'Pathogen', desc: 'Stringent zero-tolerance detection of Salmonella using ISO 6579 / BAM methods. Represents a non-negotiable critical control point in preventing pathogenic adulteration in ready-to-eat supply chains.', extraLabel1: 'Standard', extraValue1: 'Absent / 25g', extraLabel2: 'Severity', extraValue2: 'Critical' },
  { n: 11, category: 'MICROBIOLOGY', id: 'moulds', name: 'Yeast & Mould', emoji: '🍄', color: '#E67E22', tag: 'Fungi', desc: 'Quantitative enumeration of viable yeast and mould colonies. Direct correlation to storage hygiene, raw material integrity, and long-term biodeterioration prevention.', extraLabel1: 'Standard', extraValue1: '≤ 10⁴ CFU/g', extraLabel2: 'Severity', extraValue2: 'High' },
  { n: 12, category: 'MICROBIOLOGY', id: 'ecoli', name: 'E. Coli', emoji: '🔴', color: '#C0392B', tag: 'Pathogen', desc: 'Strict screening for Escherichia coli utilizing ISO 16649 guidelines, acting as the primary indicator for faecal contamination and safeguarding against severe foodborne illness.', extraLabel1: 'Standard', extraValue1: 'Absent / g', extraLabel2: 'Severity', extraValue2: 'Critical' },
  { n: 13, category: 'MICROBIOLOGY', id: 'coliforms', name: 'Coliforms', emoji: '🔵', color: '#2980B9', tag: 'Indicator', desc: 'Detection and Most Probable Number (MPN) enumeration of Coliform bacteria. Serves as a vital proxy for assessing overall plant sanitation and processing hygiene efficacy.', extraLabel1: 'Standard', extraValue1: '≤ 10 MPN/g', extraLabel2: 'Severity', extraValue2: 'Moderate' },
  { n: 14, category: 'MICROBIOLOGY', id: 'tvc', name: 'Total Plate Count', emoji: '🧫', color: '#2980B9', tag: 'Bioburden', desc: 'Aerobic Plate Count (APC) assessment to determine the total bioburden of the spice matrix, validating the 5-log microbial reduction achieved by our advanced steam sterilization lines.', extraLabel1: 'Standard', extraValue1: '≤ 10⁵ CFU/g', extraLabel2: 'Severity', extraValue2: 'Moderate' },
  { n: 15, category: 'MICROBIOLOGY', id: 'others', name: 'Staph. Aureus', emoji: '⚠️', color: '#1ABC9C', tag: 'Pathogen', desc: 'Targeted screening for enterotoxin-producing coagulase-positive Staphylococci, ensuring strict personnel hygiene standards and mitigating cross-contamination during handling.', extraLabel1: 'Standard', extraValue1: 'Absent / g', extraLabel2: 'Severity', extraValue2: 'High' },

  // PESTICIDES
  { n: 16, category: 'PESTICIDE', id: 'aflatoxin', name: 'Aflatoxins B1, B2', emoji: '⚗️', color: '#7B1FA2', tag: 'Mycotoxin', desc: 'High-sensitivity LC-MS/MS quantification of carcinogenic Aflatoxins (B1, B2, G1, G2), guaranteeing absolute compliance with the strictest EU and US FDA mycotoxin thresholds.', extraLabel1: 'Method', extraValue1: 'LC-MS/MS', extraLabel2: 'Limit', extraValue2: '≤ 10 ppb' },
  { n: 17, category: 'PESTICIDE', id: 'organochloro', name: 'Organochlorine', emoji: '🧪', color: '#2E7D32', tag: 'Residue', desc: 'Comprehensive GC-MS screening for persistent Organochlorine pesticide residues, ensuring export shipments are completely free from prohibited environmental contaminants.', extraLabel1: 'Method', extraValue1: 'GC-MS', extraLabel2: 'Limit', extraValue2: '≤ 0.05 mg/kg' },
  { n: 18, category: 'PESTICIDE', id: 'organophos', name: 'Organophosphorous', emoji: '🔬', color: '#2E7D32', tag: 'Residue', desc: 'Rigorous multi-residue analysis targeting Organophosphorus compounds, utilizing advanced mass spectrometry to enforce stringent European MRL (Maximum Residue Limit) compliance.', extraLabel1: 'Method', extraValue1: 'GC-MS/MS', extraLabel2: 'Limit', extraValue2: '≤ 0.05 mg/kg' },
  { n: 19, category: 'PESTICIDE', id: 'pesticide', name: '500+ MRL Panel', emoji: '🌱', color: '#2E7D32', tag: 'Screening', desc: 'Expansive QuEChERS multi-residue extraction followed by LC-MS/MS and GC-MS/MS screening for over 500 pesticides, certifying flawless adherence to global B2B supply chain MRLs.', extraLabel1: 'Scope', extraValue1: '500+ Compounds', extraLabel2: 'Standard', extraValue2: 'EU MRL' },
  { n: 20, category: 'PESTICIDE', id: 'sudan', name: 'Sudan Dyes', emoji: '🎨', color: '#7B1FA2', tag: 'Adulterant', desc: 'Highly sensitive liquid chromatography detection of illicit synthetic red dyes (Sudan I-IV), offering clients an impenetrable guarantee of 100% natural, unadulterated spice color.', extraLabel1: 'Method', extraValue1: 'LC-MS/MS', extraLabel2: 'Limit', extraValue2: 'Absent' },
  { n: 21, category: 'PESTICIDE', id: 'ochratoxin', name: 'Ochratoxin A', emoji: '⚠️', color: '#7B1FA2', tag: 'Mycotoxin', desc: 'Precise quantification of Ochratoxin A (OTA) utilizing immunoaffinity column clean-up and HPLC fluorescence detection, critical for securing EU clearance for premium dried spices.', extraLabel1: 'Method', extraValue1: 'HPLC-FLD', extraLabel2: 'Limit', extraValue2: '≤ 15 μg/kg' },
];

const CSS = `
  @keyframes lab-trackMove { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
  @keyframes lab-gearSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes lab-pulseLight { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  @keyframes lab-slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes lab-popup-reveal { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
  @keyframes lab-scanRadar { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes lab-floatVat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

  .lab-track-anim { animation: lab-trackMove 1.5s linear infinite; }
  .lab-gear-anim { animation: lab-gearSpin 5s linear infinite; transform-box: fill-box; transform-origin: center; }
  .lab-light-pulse { animation: lab-pulseLight 1.5s ease-in-out infinite; }
  .lab-radar-spin { animation: lab-scanRadar 3s linear infinite; transform-box: fill-box; transform-origin: center; }
  .lab-vat-float { animation: lab-floatVat 3s ease-in-out infinite; }

  @media (min-width: 800px) { .lab-mobile { display:none !important; } }
  @media (max-width: 799px) { .lab-desktop { display:none !important; } }

  .lab-modal-overlay {
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: lab-slideUp 0.3s cubic-bezier(0.16,1,0.3,1);
  }
`;

function MachineFactory({ index, x, y, test, isActive, isHov, toggle, setHov }: {
  index: number; x: number; y: number; test: LabTest;
  isActive: boolean; isHov: boolean;
  toggle: () => void; setHov: (n: number | null) => void;
}) {
  const isFocus = isActive || isHov;
  const color = test.color;
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
            <g className="lab-gear-anim">
              <circle cx="0" cy="-18" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="0" cy="-18" r="3" fill={color}/>
              <line x1="-12" y1="-18" x2="12" y2="-18" stroke={strokeColor} strokeWidth="2"/>
              <line x1="0" y1="-6" x2="0" y2="-30" stroke={strokeColor} strokeWidth="2"/>
            </g>
            <circle cx="0" cy="-15" r="4" fill={color} className="lab-light-pulse"/>
          </g>
        )}
        {i === 2 && (
          <g>
            <path d="M-25,40 L25,40 L25,-10 L-25,-10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-25,-10 L0,-30 L25,-10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-10" y="-10" width="20" height="25" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="2" r="4" fill={color} className="lab-light-pulse"/>
            <line x1="-20" y1="20" x2="20" y2="20" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
          </g>
        )}
        {i === 3 && (
          <g>
            <path d="M-30,40 L30,40 L30,10 L-30,10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-30,10 L-20,-20 L20,-20 L30,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="-5" r="12" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="-5" r="6" fill={color} className="lab-light-pulse"/>
            <path d="M0,-17 C-4,-28 4,-34 0,-40" fill="none" stroke={color} strokeWidth="2.5"/>
          </g>
        )}
        {i === 4 && (
          <g>
            <path d="M-40,40 L40,40 L40,10 L-40,10 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-40,10 L-30,-20 L30,-20 L40,10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-25" y="-15" width="50" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-40" y1="-5" x2="40" y2="-5" stroke={color} strokeWidth="2" className="lab-track-anim"/>
            <g className="lab-gear-anim">
              <circle cx="-25" cy="25" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="-25" cy="25" r="3" fill={INK}/>
            </g>
            <g className="lab-gear-anim">
              <circle cx="25" cy="25" r="8" fill="none" stroke={strokeColor} strokeWidth="2"/>
              <circle cx="25" cy="25" r="3" fill={INK}/>
            </g>
          </g>
        )}
        {i === 5 && (
          <g className="lab-vat-float">
            <path d="M-30,-20 L30,-20 L20,40 L-20,40 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-30,-20 Q0,-35 30,-20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-25" y1="0" x2="25" y2="0" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
            <line x1="-20" y1="20" x2="20" y2="20" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
            <path d="M0,40 L0,55" stroke={strokeColor} strokeWidth="4"/>
            <circle cx="0" cy="20" r="8" fill="none" stroke={color} strokeWidth="2" className="lab-radar-spin"/>
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
            <line x1="-20" y1="-15" x2="-20" y2="5" stroke={color} strokeWidth="2" className="lab-track-anim"/>
          </g>
        )}
        {i === 7 && (
          <g>
            <path d="M-45,40 L-25,40 L-25,-30 L-35,-30 Z" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="-25,-20 L35,-20" fill="none" stroke={strokeColor} strokeWidth="6"/>
            <path d="M0,-20 L0,5" fill="none" stroke={strokeColor} strokeWidth="2" strokeDasharray="2 2"/>
            <rect x="-15" y="5" width="30" height="20" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-15" y1="15" x2="15" y2="15" stroke={strokeColor} strokeWidth="1"/>
            <circle cx="35" cy="-20" r="4" fill={color} className="lab-light-pulse"/>
          </g>
        )}
        {i === 8 && (
          <g>
            <circle cx="0" cy="5" r="35" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="5" r="25" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <g className="lab-gear-anim">
              <path d="-15,5 L15,5 M0,-10 L0,20 M-10,-5 L10,15 M10,-5 L-10,15" stroke={strokeColor} strokeWidth="3"/>
              <circle cx="0" cy="5" r="8" fill="#fff" stroke={strokeColor} strokeWidth="2"/>
            </g>
            <circle cx="0" cy="-30" r="5" fill={color} className="lab-light-pulse"/>
          </g>
        )}
        {i === 9 && (
          <g>
            <rect x="-20" y="-10" width="40" height="50" rx="3" fill="#fff" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M0,-10 L0,-30 M-10,-20 L10,-40 M-15,-30 Q0,-45 15,-30" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="-30" r="3" fill={color} className="lab-light-pulse"/>
            <path d="-10,10 L10,10 M-10,20 L10,20" stroke={strokeColor} strokeWidth="2"/>
            <circle cx="0" cy="35" r="4" fill={strokeColor}/>
          </g>
        )}
      </g>

      {/* Emoji Overlay */}
      <circle cx={x} cy={y-8} r="14" fill="#fff" stroke={strokeColor} strokeWidth="1.5" />
      <text x={x} y={y-4} textAnchor="middle" fontSize="14" dominantBaseline="middle">{test.emoji}</text>

      {/* Title block */}
      <rect x={x-65} y={y+85} width="130" height="20" rx="10" fill={isActive ? color : '#fff'} stroke={isActive ? 'none' : strokeColor} strokeWidth={isActive ? '0' : '1.5'} />
      <text x={x} y={y+98} textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {test.name.toUpperCase().substring(0, 18)}
      </text>

      {/* Step Number Tag */}
      <circle cx={x-35} cy={y-45} r="10" fill={isActive ? color : '#fff'} stroke={strokeColor} strokeWidth="1.5"/>
      <text x={x-35} y={y-42} textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {String(test.n).padStart(2, '0')}
      </text>
    </g>
  );
}

export default function AnalyticalLabFlow() {
  const [active, setActive] = useState<number | null>(null);
  const [hov,    setHov]    = useState<number | null>(null);
  const test = active !== null ? TESTS.find(x => x.n === active) : null;
  const toggle  = (n: number) => setActive(v => v === n ? null : n);

  /* Desktop Pipeline Coordinates for 21 items */
  const count = TESTS.length; // 21
  const dSX = Array.from({length: count}, (_, i) => 140 + i * 180);
  const yFixed = 200;
  
  // Track geometry
  const dTrackWidth = 140 + (count - 1) * 180 + 140; // 140 padding on both sides
  const dWheels = Array.from({length: Math.ceil(dTrackWidth/360) + 1}, (_, i) => 60 + i * 360);

  /* Mobile Pipeline Coordinates */
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
    const y3 = 160 + (i + 1) * 220;
    const isLtoR = i % 2 === 0;
    if (isLtoR) return `L90,${y2} A30,30 0 0,0 120,${y2+30} L230,${y2+30} A30,30 0 0,1 260,${y2+60} L260,${y3}`;
    else        return `L260,${y2} A30,30 0 0,1 230,${y2+30} L120,${y2+30} A30,30 0 0,0 90,${y2+60} L90,${y3}`;
  }).join(' ');

  return (
    <>
      <style>{CSS}</style>

      {/* Desktop View */}
      <div className="lab-desktop">
        <div style={{ borderRadius: 8, background: '#F0EEE5', border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden', position: 'relative' }}>
          
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', padding: '40px 0 60px' }}>
            <svg viewBox={`0 0 ${dTrackWidth} 350`} style={{ minWidth: dTrackWidth, height: 350, display: 'block' }}>
              <defs>
                <pattern id="dt-anim-lab" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0,10 L40,10" stroke={INK} strokeWidth="3" strokeDasharray="12 8" className="lab-track-anim" />
                </pattern>
              </defs>

              <path d={`M0,270 L${dTrackWidth},270`} stroke={INK_L} strokeWidth="14" fill="none" strokeOpacity="0.2"/>
              <path d={`M0,270 L${dTrackWidth},270`} stroke="url(#dt-anim-lab)" strokeWidth="8" fill="none" />

              {dWheels.map((cx, i) => (
                <g key={i} transform={`translate(${cx}, 270)`} className="lab-gear-anim">
                  <circle cx="0" cy="0" r="10" fill="#fff" stroke={INK} strokeWidth="2"/>
                  <circle cx="0" cy="0" r="3" fill={INK}/>
                  <path d="M-10,0 L10,0 M0,-10 L0,10 M-7,-7 L7,7 M7,-7 L-7,7" stroke={INK} strokeWidth="1.5"/>
                </g>
              ))}

              {TESTS.map((t, i) => (
                <MachineFactory 
                  key={t.id} index={i} x={dSX[i]} y={yFixed} test={t}
                  isActive={active === t.n} isHov={hov === i}
                  toggle={() => toggle(t.n)} setHov={setHov}
                />
              ))}
            </svg>
          </div>
          <div style={{ textAlign: 'center', padding: '12px 16px 20px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: INK_L, opacity: 0.6 }}>
            ← DRAG TO EXPLORE • CLICK ANY MODULE TO LEARN MORE →
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lab-mobile">
        <div style={{ borderRadius: 8, background: '#F0EEE5', border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden', position: 'relative', padding: '40px 0' }}>
          
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <svg viewBox={`0 0 350 ${mSY[count-1] + 160}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <pattern id="mt-anim-lab" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 L40,10" stroke={INK} strokeWidth="3" strokeDasharray="12 8" className="lab-track-anim" />
              </pattern>
            </defs>

            <path d={mSnakePath} stroke={INK_L} strokeWidth="14" fill="none" strokeOpacity="0.2"/>
            <path d={mSnakePath} stroke="url(#mt-anim-lab)" strokeWidth="8" fill="none" />

            {mRelayWheels.map(([cx, cy], i) => (
              <g key={i} transform={`translate(${cx}, ${cy})`} className="lab-gear-anim">
                <circle cx="0" cy="0" r="10" fill="#fff" stroke={INK} strokeWidth="2"/>
                <circle cx="0" cy="0" r="3" fill={INK}/>
                <path d="M-10,0 L10,0 M0,-10 L0,10 M-7,-7 L7,7 M7,-7 L-7,7" stroke={INK} strokeWidth="1.5"/>
              </g>
            ))}

            {TESTS.map((t, i) => (
              <MachineFactory 
                key={t.id} index={i} x={mSX[i]} y={mSY[i]} test={t}
                isActive={active === t.n} isHov={hov === i}
                toggle={() => toggle(t.n)} setHov={setHov}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Unified Global Floating Modal */}
      {test && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24, animation: 'fadeIn 0.3s cubic-bezier(0.16,1,0.3,1)'
        }} onClick={() => setActive(null)}>
          <div style={{
            background:'#fff', borderRadius:0, border:`2px solid ${INK}`,
            padding:'clamp(32px,5vw,48px)', maxWidth:540, width:'100%',
            boxShadow:`8px 8px 0px ${test.color}`,
            animation:'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
            position:'relative',
          }} onClick={e => e.stopPropagation()}>
            <button onClick={()=>setActive(null)} style={{
              position:'absolute', top:20, right:20, background:INK, border:'none',
              fontSize:24, color:'#fff', cursor:'pointer', width:40, height:40,
              display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s',
            }}
              onMouseEnter={e=>(e.currentTarget.style.background=test.color)}
              onMouseLeave={e=>(e.currentTarget.style.background=INK)}
            >×</button>
            <div style={{ display:'flex', gap:20, alignItems:'center', marginBottom:24 }}>
              <div style={{
                flexShrink:0, width:60, height:60, background:'#fff', border:`2px solid ${INK}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:26, color: test.color, fontFamily:"'Courier New',monospace", fontWeight:800,
                boxShadow:`4px 4px 0px ${test.color}`
              }}>
                {test.emoji}
              </div>
              <div>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:test.color, marginBottom:6, fontWeight:700 }}>
                  {test.category} | {test.tag}
                </div>
                <div style={{ fontFamily:'var(--font-display), ui-sans-serif, system-ui, sans-serif', fontSize:'clamp(22px,3vw,28px)', fontWeight:400, color:INK, lineHeight:1.1, textTransform: 'uppercase' }}>
                  {test.name}
                </div>
              </div>
            </div>
            <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:15, color:'rgba(0,0,0,0.7)', lineHeight:1.8, margin:'0 0 24px' }}>
              {test.desc}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f5f5f5', border: `1px solid ${INK_L}`, padding: '12px 16px', boxShadow: `2px 2px 0px ${INK_L}` }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: INK_L, fontWeight: 700 }}>{test.extraLabel1}:</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: test.color }}>{test.extraValue1}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f5f5f5', border: `1px solid ${INK_L}`, padding: '12px 16px', boxShadow: `2px 2px 0px ${INK_L}` }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: INK_L, fontWeight: 700 }}>{test.extraLabel2}:</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: test.color }}>{test.extraValue2}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
