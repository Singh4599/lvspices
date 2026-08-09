'use client';

import { useState } from 'react';

const INK    = '#1A1818';
const INK_L  = '#4A4545';
const INK_LL = 'rgba(26,24,24,0.2)';
const CRIMSON = '#AC033B';
const GREEN   = '#2E6B3E';
const BLUE    = '#1A5FAB';

interface ZoneData {
  id: number;
  icon: string;
  name: string;
  gate: string;
  desc: string;
  accent: string;
}

const ZONES: ZoneData[] = [
  { id:0, icon:'🌾', name:'Raw Material Sampling', gate:'GATE 1', accent:'#5E4A00', desc:'All incoming raw spice lots are subjected to rigorous AOAC/ISO standard multi-point sampling before unloading, ensuring baseline traceability and origin compliance.' },
  { id:1, icon:'🔬', name:'In-house Pre-screening', gate:'GATE 2', accent:'#7B4E1B', desc:'Rapid physical and organoleptic parameters (moisture, bulk density, ASTA colour) are validated in our QC lab within 2 hours of receipt to maintain strict intake specifications.' },
  { id:2, icon:'🧪', name:'Third-party Analysis', gate:'GATE 3', accent: BLUE,     desc:'Stringent verification for 500+ pesticide residues, Aflatoxin/Ochratoxin, heavy metals, and microbiological load by independent NABL-accredited and ISO 17025 certified labs.' },
  { id:3, icon:'🚧', name:'QC Hold & Release', gate:'GATE 4', accent: CRIMSON,  desc:'Zero-tolerance production entry. Material remains fully quarantined until a comprehensive Certificate of Analysis (COA) is validated by our Head of Quality Assurance.' },
  { id:4, icon:'📊', name:'In-process Monitoring', gate:'GATE 5', accent: GREEN,    desc:'Continuous inline monitoring via advanced sensors tracks thermal profiles, moisture levels, and particle size distribution (PSD) in real-time, preventing process deviations.' },
  { id:5, icon:'✅', name:'Dispatch Verification', gate:'GATE 6', accent:'#0A4D6E', desc:'Final QA clearance involves matching pre-shipment COAs directly against B2B client specifications and destination-country FDA/EU regulatory frameworks prior to loading.' },
];

const CSS = `
  @keyframes scanSweep    { 0%{transform:translateX(0)} 50%{transform:translateX(60px)} 100%{transform:translateX(0)} }
  @keyframes bubbleUp     { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-20px);opacity:0} }
  @keyframes pulseLight   { 0%,100%{opacity:0.3; transform:scale(1)} 50%{opacity:1; transform:scale(1.2)} }
  @keyframes dashTravel   { to { stroke-dashoffset: -100; } }
  @keyframes scopeFocus   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
  
  .scan-sweep    { animation: scanSweep 2s ease-in-out infinite; }
  .bubble        { animation: bubbleUp 1.5s ease-in-out infinite; }
  .bubble-delay  { animation: bubbleUp 1.5s ease-in-out 0.75s infinite; opacity: 0; }
  .pulse-light   { animation: pulseLight 1.5s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
  .dash-travel   { stroke-dasharray: 10 8; animation: dashTravel 3s linear infinite; }
  .scope-focus   { animation: scopeFocus 2s ease-in-out infinite; }
  
  /* Hide scrollbar for webkit but keep functionality */
  .blueprint-scroll::-webkit-scrollbar {
    display: none;
  }
  .blueprint-scroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  @media (max-width: 768px) {
    .qa-detail-inner {
      flex-direction: column !important;
      gap: 16px !important;
    }
    .qa-detail-left {
      width: 100% !important;
      border-right: none !important;
      border-bottom: 1px solid rgba(0,0,0,0.1) !important;
      padding-right: 0 !important;
      padding-bottom: 16px !important;
    }
    .qa-scroll {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
`;

export default function QALabBlueprint() {
  const [active, setActive] = useState<number | null>(null);
  const [hov, setHov] = useState<number | null>(null);

  const toggle = (id: number) => setActive(prev => prev === id ? null : id);

  // Layout calculations
  const gw = 180, gh = 180, gap = 80;
  const positions = [
    { x: 80, y: 80 },                             // 0: Sampling
    { x: 80 + (gw+gap), y: 80 },                  // 1: Pre-screen
    { x: 80 + (gw+gap)*2, y: 80 },                // 2: 3rd Party
    { x: 80 + (gw+gap)*2, y: 80 + gh + gap },     // 3: Hold & Release
    { x: 80 + (gw+gap), y: 80 + gh + gap },       // 4: In-process
    { x: 80, y: 80 + gh + gap },                  // 5: Dispatch
  ];

  const connections = [
    { x1: 260, y1: 170, x2: 340, y2: 170 }, // 0 to 1
    { x1: 520, y1: 170, x2: 600, y2: 170 }, // 1 to 2
    { x1: 770, y1: 260, x2: 770, y2: 340 }, // 2 to 3 (Downwards)
    { x1: 600, y1: 430, x2: 520, y2: 430 }, // 3 to 4 (Leftwards)
    { x1: 340, y1: 430, x2: 260, y2: 430 }, // 4 to 5
  ];

  const width = 860;
  const height = 560;

  return (
    <div style={{ width: '100%' }}>
      <style>{CSS}</style>

      {/* ─── DESKTOP AND MOBILE SCALED ─── */}
      <div style={{ background: '#F8F6F1', border: `1.5px solid rgba(0,0,0,0.06)`, borderRadius: 20, overflow: 'hidden' }}>
        
        {/* SVG CONTAINER */}
        <div className="qa-scroll" style={{ width: '100%', padding: 'clamp(12px, 4vw, 24px)', display: 'flex', justifyContent: 'flex-start' }}>
          <svg viewBox="40 40 780 480" style={{ width: '100%', height: 'auto', minWidth: 800, overflow: 'visible', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.03))' }}>
              
              <defs>
                <pattern id="fbGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={INK_LL} strokeWidth="0.5" />
                  <path d="M 20 0 L 20 40 M 0 20 L 40 20" fill="none" stroke={INK_LL} strokeWidth="0.2" />
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect width="100%" height="100%" fill="url(#fbGrid)" />
              
              {/* Animated Connections (Pipeline) */}
              <g stroke={INK_L} strokeWidth="6" fill="none">
                {connections.map((c, i) => (
                  <g key={i}>
                    {/* Pipe base */}
                    <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="rgba(0,0,0,0.05)" strokeWidth="12" strokeLinecap="round" />
                    {/* Data/Flow dashed line */}
                    <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke={CRIMSON} strokeWidth="3" strokeLinecap="round" className="dash-travel" />
                  </g>
                ))}
              </g>

              {/* RENDER ZONES */}
              {ZONES.map((z, i) => {
                const pos = positions[i];
                const isActive = active === i;
                const isHov = hov === i;
                const dim = (active !== null && !isActive);
                
                return (
                  <g 
                    key={z.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onMouseEnter={() => setHov(i)}
                    onMouseLeave={() => setHov(null)}
                    onClick={() => toggle(i)}
                    style={{ cursor: 'pointer', transition: 'opacity 0.3s', opacity: dim ? 0.35 : 1 }}
                  >
                    {/* Room Base */}
                    <rect x="0" y="0" width={gw} height={gh} rx="6" fill={isActive ? '#ffffff' : 'rgba(255,255,255,0.7)'} stroke={isActive ? z.accent : INK_LL} strokeWidth={isActive ? 3 : 1.5} />
                    
                    {/* Room Label */}
                    <rect x="0" y="0" width={gw} height="28" fill={isActive ? z.accent : 'rgba(0,0,0,0.04)'} rx="6" clipPath="inset(0 0 -6px 0)" />
                    <text x="10" y="18" fontFamily="'Courier New',monospace" fontSize="11" fontWeight="700" fill={isActive ? '#fff' : INK} letterSpacing="0.05em">
                      {z.gate}
                    </text>
                    <text x={gw-10} y="18" textAnchor="end" fontFamily="'Courier New',monospace" fontSize="9" fontWeight="600" fill={isActive ? 'rgba(255,255,255,0.7)' : INK_L}>
                      {z.name.toUpperCase()}
                    </text>

                    {/* Step Badge */}
                    <circle cx="0" cy="0" r="14" fill={CRIMSON} />
                    <text x="0" y="4" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fontWeight="700" fill="#fff">{z.id + 1}</text>
                    
                    {/* --- SPECIFIC ROOM ILLUSTRATIONS --- */}
                    <g transform="translate(10, 40)" opacity={isActive ? 1 : 0.8}>
                      
                      {/* Sampling */}
                      {i === 0 && (
                        <g stroke={INK} strokeWidth="1.5">
                          {/* Truck back */}
                          <rect x="10" y="20" width="80" height="70" rx="4" fill="#E8F4FB" />
                          <line x1="10" y1="90" x2="90" y2="90" strokeWidth="3" />
                          <circle cx="30" cy="90" r="10" fill={INK_L} />
                          <circle cx="70" cy="90" r="10" fill={INK_L} />
                          {/* Sampler probe */}
                          <line x1="100" y1="10" x2="60" y2="50" stroke={CRIMSON} strokeWidth="3" className="scope-focus" />
                          <rect x="120" y="70" width="30" height="20" fill="none" strokeDasharray="2 2" />
                        </g>
                      )}

                      {/* Pre-screening (Microscope & Moisture) */}
                      {i === 1 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <rect x="30" y="40" width="10" height="50" fill={INK_LL} stroke="none" />
                          <path d="M 20,90 L 60,90 M 40,90 L 40,40 M 35,40 L 45,40" strokeWidth="3" />
                          <rect x="25" y="20" width="20" height="15" rx="2" fill="#fff" className="scope-focus" />
                          <circle cx="100" cy="60" r="24" fill="#fff" strokeDasharray="4 4" className="scan-sweep" />
                          <text x="100" y="64" textAnchor="middle" fontSize="14">🔍</text>
                        </g>
                      )}

                      {/* 3rd Party (Test Tubes) */}
                      {i === 2 && (
                        <g stroke={INK} strokeWidth="1.5">
                          {/* Tube 1 */}
                          <rect x="30" y="30" width="20" height="60" rx="10" fill="none" />
                          <rect x="32" y="50" width="16" height="38" rx="8" fill={BLUE} stroke="none" />
                          <circle cx="40" cy="60" r="3" fill="#fff" stroke="none" className="bubble" />
                          <circle cx="40" cy="70" r="2" fill="#fff" stroke="none" className="bubble-delay" />
                          {/* Tube 2 */}
                          <rect x="70" y="30" width="20" height="60" rx="10" fill="none" />
                          <rect x="72" y="60" width="16" height="28" rx="8" fill={GREEN} stroke="none" />
                          <circle cx="80" cy="75" r="3" fill="#fff" stroke="none" className="bubble" />
                          {/* Rack */}
                          <line x1="10" y1="80" x2="110" y2="80" strokeWidth="4" />
                          <line x1="10" y1="90" x2="110" y2="90" strokeWidth="2" />
                        </g>
                      )}

                      {/* Hold & Release (Lock & Check) */}
                      {i === 3 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <rect x="20" y="30" width="120" height="70" rx="6" fill="#F8F0F2" />
                          <circle cx="80" cy="65" r="16" fill="none" stroke={CRIMSON} strokeWidth="3" />
                          <path d="M 70,65 L 77,72 L 92,55" fill="none" stroke={CRIMSON} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="40" cy="65" r="6" fill={CRIMSON} className="pulse-light" stroke="none" />
                          <line x1="20" y1="10" x2="140" y2="10" strokeDasharray="4 4" strokeWidth="2" />
                        </g>
                      )}

                      {/* In-process Monitoring (Sensors/Graphs) */}
                      {i === 4 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <rect x="20" y="20" width="120" height="80" rx="4" fill="#fff" />
                          <polyline points="30,80 50,60 70,70 90,40 110,60 130,30" fill="none" stroke={GREEN} strokeWidth="3" className="dash-travel" />
                          <circle cx="130" cy="30" r="4" fill={GREEN} stroke="none" className="pulse-light" />
                          <line x1="30" y1="90" x2="130" y2="90" strokeWidth="2" />
                          <line x1="30" y1="25" x2="30" y2="90" strokeWidth="2" />
                        </g>
                      )}

                      {/* Dispatch Verification (Clipboard) */}
                      {i === 5 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <rect x="40" y="10" width="80" height="90" rx="4" fill="#fff" />
                          <rect x="65" y="5" width="30" height="10" rx="2" fill={INK_L} />
                          <line x1="50" y1="40" x2="80" y2="40" />
                          <line x1="50" y1="60" x2="90" y2="60" />
                          <line x1="50" y1="80" x2="100" y2="80" />
                          {/* Checkmark */}
                          <path d="M 110,30 L 120,40 L 140,20" fill="none" stroke={GREEN} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                      )}
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

        {/* Unified Global Floating Modal */}
        {active !== null && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, animation: 'fadeIn 0.3s cubic-bezier(0.16,1,0.3,1)'
          }} onClick={() => setActive(null)}>
            <div style={{
              background:'#fff', borderRadius:0, border:`2px solid ${INK}`,
              padding:'clamp(32px,5vw,48px)', maxWidth:540, width:'100%',
              boxShadow:`8px 8px 0px ${ZONES[active].accent}`,
              animation:'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
              position:'relative',
            }} onClick={e => e.stopPropagation()}>
              <button onClick={()=>setActive(null)} style={{
                position:'absolute', top:20, right:20, background:INK, border:'none',
                fontSize:24, color:'#fff', cursor:'pointer', width:40, height:40,
                display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s',
              }}
                onMouseEnter={e=>(e.currentTarget.style.background=ZONES[active].accent)}
                onMouseLeave={e=>(e.currentTarget.style.background=INK)}
              >×</button>
              <div style={{ display:'flex', gap:20, alignItems:'center', marginBottom:24 }}>
                <div style={{
                  flexShrink:0, width:60, height:60, background:'#fff', border:`2px solid ${INK}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:26, color: ZONES[active].accent, fontFamily:"'Courier New',monospace", fontWeight:800,
                  boxShadow:`4px 4px 0px ${ZONES[active].accent}`
                }}>
                  {String(ZONES[active].id + 1).padStart(2, '0')}
                </div>
                <div>
                  <div style={{ fontFamily:"'Courier New',monospace", fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:ZONES[active].accent, marginBottom:6, fontWeight:700 }}>
                    {ZONES[active].gate}
                  </div>
                  <div style={{ fontFamily:'var(--font-display), ui-sans-serif, system-ui, sans-serif', fontSize:'clamp(22px,3vw,28px)', fontWeight:400, color:INK, lineHeight:1.1, textTransform: 'uppercase' }}>
                    {ZONES[active].name}
                  </div>
                </div>
              </div>
              <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:15, color:'rgba(0,0,0,0.7)', lineHeight:1.8, margin:'0 0 24px' }}>
                {ZONES[active].desc}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
