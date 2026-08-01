'use client';

import { useState } from 'react';

const INK    = '#2C1200';
const INK_L  = '#6B3A1F';
const INK_LL = 'rgba(44,18,0,0.28)';
const CRIMSON = '#AC033B';
const GREEN   = '#2E6B3E';
const BLUE    = '#1A5FAB';

interface ZoneData {
  id: number;
  icon: string;
  name: string;
  stat: string;
  desc: string;
  accent: string;
}

const ZONES: ZoneData[] = [
  { id:0, icon:'🏭', name:'Raw Material Intake', stat:'10,000+ MT',       accent:'#5E4A00', desc:'Secure offloading bays with automated sampling probes. All inbound materials undergo strict initial QA clearing before entering the pre-cleaning zone.' },
  { id:1, icon:'🔍', name:'Sorting & Cleaning',  stat:'99.9% Purity',     accent:'#7B4E1B', desc:'Advanced optical and mechanical sorting lines featuring destoners, magnetic separators, and Buhler Sortex machines to remove any physical impurities.' },
  { id:2, icon:'❄️', name:'Cryogenic Grinding',  stat:'-196°C Liquid N₂', accent: BLUE,     desc:'Temperature-controlled grinding preserves up to 40% more essential oils and volatile aromatics compared to standard ambient grinding.' },
  { id:3, icon:'♨️', name:'Steam Sterilization', stat:'5-Log Reduction',  accent:'#5E0A0A', desc:'Continuous Flow sterilization reduces microbial load (salmonella, E. coli) while retaining color, flavor, and sensory profile.' },
  { id:4, icon:'🧪', name:'NABL Accredited Lab', stat:'500+ Parameters',  accent: GREEN,    desc:'In-house ISO/IEC 17025 accredited laboratory conducting comprehensive physical, chemical, microbiological, and pesticide residue testing.' },
  { id:5, icon:'📦', name:'Clean Room Packing',  stat:'Class 100K HEPA',  accent:'#1B4A2E', desc:'Automated Form-Fill-Seal (FFS) lines with Nitrogen flushing operate under strict positive-pressure HEPA-filtered clean room conditions.' },
  { id:6, icon:'🧊', name:'Smart Warehouse',     stat:'Climate Monitored',accent:'#0A4D6E', desc:'FIFO-managed storage with continuous temperature and humidity monitoring ensures optimal shelf-life and freshness retention.' },
  { id:7, icon:'🚢', name:'Export Dispatch',     stat:'40+ Countries',    accent: CRIMSON,  desc:'Container loading bays with strict tamper-evident sealing and final pre-shipment inspections for international regulatory compliance.' },
];

const CSS = `
  @keyframes conveyorRoll { to { stroke-dashoffset: -40; } }
  @keyframes fanSpin      { to { transform: rotate(360deg); } }
  @keyframes dotPulse     { 0%,100%{opacity:0.4; transform:scale(1)} 50%{opacity:1; transform:scale(1.4)} }
  @keyframes dashTravel   { to { stroke-dashoffset: -100; } }
  @keyframes scanSweep    { 0%{transform:translateX(0)} 50%{transform:translateX(60px)} 100%{transform:translateX(0)} }
  
  .conveyor      { animation: conveyorRoll 1.5s linear infinite; }
  .fan-spin      { animation: fanSpin 2.5s linear infinite; transform-origin: center; transform-box: fill-box; }
  .fan-spin-fast { animation: fanSpin 1.2s linear infinite; transform-origin: center; transform-box: fill-box; }
  .dot-pulse     { animation: dotPulse 2s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
  .dash-travel   { stroke-dasharray: 10 8; animation: dashTravel 3s linear infinite; }
  .scan-sweep    { animation: scanSweep 3s ease-in-out infinite; }
  
  .fb-card {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  @media (min-width: 900px) { .fb-mobile { display: none !important; } }
  @media (max-width: 899px) { .fb-desktop { display: none !important; } }
`;

function Fan({ cx, cy, r, color, fast=false }: { cx:number, cy:number, r:number, color:string, fast?:boolean }) {
  return (
    <g className={fast ? 'fan-spin-fast' : 'fan-spin'}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="1.5" />
      {[0,1,2].map(i => (
        <path key={i} d={`M${cx},${cy} L${cx+r*0.8*Math.cos(i*120*Math.PI/180)},${cy+r*0.8*Math.sin(i*120*Math.PI/180)}`} stroke={color} strokeWidth="3" strokeLinecap="round" />
      ))}
      <circle cx={cx} cy={cy} r={r*0.2} fill={color} />
    </g>
  );
}

export default function FactoryBlueprint() {
  const [active, setActive] = useState<number | null>(null);
  const [hov, setHov] = useState<number | null>(null);

  const toggle = (id: number) => setActive(prev => prev === id ? null : id);

  // Layout calculations
  const gw = 180, gh = 180, gap = 80;
  const positions = [
    { x: 80, y: 80 },                             // 0: Intake
    { x: 80 + (gw+gap), y: 80 },                  // 1: Cleaning
    { x: 80 + (gw+gap)*2, y: 80 },                // 2: Grinding
    { x: 80 + (gw+gap)*3, y: 80 },                // 3: Sterilization
    { x: 80 + (gw+gap)*3, y: 80 + gh + gap },     // 4: Lab
    { x: 80 + (gw+gap)*2, y: 80 + gh + gap },     // 5: Packing
    { x: 80 + (gw+gap), y: 80 + gh + gap },       // 6: Warehouse
    { x: 80, y: 80 + gh + gap },                  // 7: Dispatch
  ];

  const connections = [
    { x1: 260, y1: 170, x2: 340, y2: 170 }, // 0 to 1
    { x1: 520, y1: 170, x2: 600, y2: 170 }, // 1 to 2
    { x1: 780, y1: 170, x2: 860, y2: 170 }, // 2 to 3
    { x1: 950, y1: 260, x2: 950, y2: 340 }, // 3 to 4 (Downwards)
    { x1: 860, y1: 430, x2: 780, y2: 430 }, // 4 to 5 (Leftwards)
    { x1: 600, y1: 430, x2: 520, y2: 430 }, // 5 to 6
    { x1: 340, y1: 430, x2: 260, y2: 430 }, // 6 to 7
  ];

  return (
    <div style={{ background: '#FFFDF5', border: `1.5px solid ${INK_L}`, borderRadius: 12, overflow: 'hidden' }}>
      <style>{CSS}</style>

      {/* ─── DESKTOP (INTERACTIVE SVG FLOORPLAN) ─── */}
      <div className="fb-desktop" style={{ position: 'relative', width: '100%' }}>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 1200 }}>
            <svg viewBox="0 0 1200 680" style={{ width: '100%', height: 'auto', display: 'block' }}>
              
              <defs>
                <pattern id="fbGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={INK_LL} strokeWidth="0.5" />
                  <path d="M 20 0 L 20 40 M 0 20 L 40 20" fill="none" stroke={INK_LL} strokeWidth="0.2" />
                </pattern>
                
                {/* Connection arrows */}
                <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse">
                  <path d="M 0,0 L 6,3 L 0,6 Z" fill={INK_L} />
                </marker>
              </defs>

              {/* Background Grid */}
              <rect width="100%" height="100%" fill="url(#fbGrid)" />
              
              {/* Animated Connections (Conveyor belts / Pipes) */}
              <g stroke={INK_L} strokeWidth="6" fill="none">
                {connections.map((c, i) => (
                  <g key={i}>
                    {/* Belt base */}
                    <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="rgba(44,18,0,0.15)" strokeWidth="12" strokeLinecap="round" />
                    {/* Animated dashed line on top */}
                    <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke={INK_L} strokeWidth="4" strokeLinecap="round" strokeDasharray="8 6" className="conveyor" />
                  </g>
                ))}
              </g>

              {/* RENDER ZONES */}
              {ZONES.map((z, i) => {
                const pos = positions[i];
                const isActive = active === i;
                const isHov = hov === i;
                const dim = (active !== null && !isActive); // Dim if another is active
                
                return (
                  <g 
                    key={z.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onMouseEnter={() => setHov(i)}
                    onMouseLeave={() => setHov(null)}
                    onClick={() => toggle(i)}
                    style={{ cursor: 'pointer', transition: 'opacity 0.3s', opacity: dim ? 0.35 : 1 }}
                  >
                    {/* Room Base (Blueprint style box) */}
                    <rect x="0" y="0" width={gw} height={gh} rx="6" fill={isActive ? '#ffffff' : 'rgba(255,255,255,0.6)'} stroke={isActive ? z.accent : INK_L} strokeWidth={isActive ? 3 : 1.5} />
                    
                    {/* Room Label */}
                    <rect x="0" y="0" width={gw} height="28" fill={isActive ? z.accent : 'rgba(44,18,0,0.06)'} rx="6" clipPath="inset(0 0 -6px 0)" />
                    <text x="10" y="18" fontFamily="'Courier New',monospace" fontSize="11" fontWeight="700" fill={isActive ? '#fff' : INK} letterSpacing="0.05em">
                      Z-0{z.id + 1}
                    </text>
                    <text x={gw-10} y="18" textAnchor="end" fontFamily="'Courier New',monospace" fontSize="9" fontWeight="600" fill={isActive ? 'rgba(255,255,255,0.7)' : INK_L}>
                      {z.name.toUpperCase()}
                    </text>

                    {/* Badge */}
                    <circle cx="0" cy="0" r="14" fill={CRIMSON} />
                    <text x="0" y="4" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fontWeight="700" fill="#fff">{z.id + 1}</text>
                    
                    {/* --- SPECIFIC ROOM ILLUSTRATIONS --- */}
                    <g transform="translate(10, 40)" opacity={isActive ? 1 : 0.8}>
                      
                      {/* Intake */}
                      {i === 0 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <rect x="10" y="20" width="140" height="80" rx="4" fill="#E8E4D9" />
                          <line x1="20" y1="40" x2="140" y2="40" strokeDasharray="4 4" />
                          <line x1="20" y1="60" x2="140" y2="60" strokeDasharray="4 4" />
                          <circle cx="40" cy="50" r="8" fill={GREEN} className="dot-pulse" />
                          <rect x="120" y="70" width="20" height="20" fill={INK_L} />
                        </g>
                      )}

                      {/* Sorting */}
                      {i === 1 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <rect x="20" y="20" width="120" height="80" rx="4" fill="none" />
                          <path d="M 20,40 L 140,40 M 20,60 L 140,60 M 20,80 L 140,80" strokeDasharray="2 4" />
                          {/* Scanner sweep line */}
                          <line x1="30" y1="10" x2="30" y2="90" stroke={CRIMSON} strokeWidth="2" className="scan-sweep" />
                          <Fan cx="100" cy="30" r="10" color={INK_L} fast={true} />
                        </g>
                      )}

                      {/* Cryo Grinding */}
                      {i === 2 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <rect x="10" y="10" width="140" height="100" rx="8" fill="#E8F4FB" />
                          <circle cx="80" cy="60" r="30" fill="none" stroke={BLUE} strokeWidth="2" />
                          <Fan cx="80" cy="60" r="20" color={BLUE} fast={true} />
                          <text x="80" y="100" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="10" fill={BLUE} fontWeight="700" stroke="none">-196°C</text>
                        </g>
                      )}

                      {/* Steam Sterilization */}
                      {i === 3 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <rect x="20" y="10" width="120" height="100" rx="20" fill="#FFF5E6" />
                          <circle cx="80" cy="60" r="24" fill="none" stroke={CRIMSON} strokeWidth="3" strokeDasharray="8 4" className="fan-spin" />
                          <path d="M 50,40 Q 65,10 80,40 T 110,40" fill="none" stroke={INK_L} className="dash-travel" />
                          <text x="80" y="64" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="12" fill={CRIMSON} fontWeight="700" stroke="none">♨</text>
                        </g>
                      )}

                      {/* Lab */}
                      {i === 4 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <rect x="20" y="20" width="120" height="80" rx="2" fill="none" />
                          <rect x="30" y="30" width="30" height="50" rx="4" fill="#E8F4FB" />
                          <line x1="30" y1="45" x2="60" y2="45" stroke={BLUE} />
                          <circle cx="45" cy="65" r="4" fill={BLUE} />
                          <circle cx="100" cy="55" r="20" fill="none" stroke={GREEN} strokeDasharray="4 4" className="fan-spin" />
                          <circle cx="100" cy="55" r="8" fill={GREEN} />
                        </g>
                      )}

                      {/* Packaging */}
                      {i === 5 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <rect x="20" y="20" width="120" height="80" rx="4" fill="#F5EDD8" />
                          <rect x="30" y="30" width="40" height="30" fill="none" />
                          <rect x="90" y="30" width="40" height="30" fill="none" />
                          <path d="M 40,70 L 120,70" strokeWidth="4" strokeLinecap="round" className="dash-travel" />
                          <text x="80" y="15" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="9" fill={INK_L} stroke="none">N₂ FLUSH</text>
                        </g>
                      )}

                      {/* Warehouse */}
                      {i === 6 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <line x1="10" y1="90" x2="150" y2="90" strokeWidth="2" />
                          <rect x="20" y="40" width="30" height="50" fill="#E8E4D9" />
                          <rect x="65" y="20" width="30" height="70" fill="#E8E4D9" />
                          <rect x="110" y="50" width="30" height="40" fill="#E8E4D9" />
                          <circle cx="80" cy="10" r="4" fill={CRIMSON} className="dot-pulse" />
                        </g>
                      )}

                      {/* Dispatch */}
                      {i === 7 && (
                        <g stroke={INK} strokeWidth="1.5">
                          <rect x="10" y="30" width="100" height="60" rx="4" fill="#E8F4FB" />
                          <circle cx="30" cy="90" r="10" fill={INK} />
                          <circle cx="90" cy="90" r="10" fill={INK} />
                          <rect x="110" y="30" width="40" height="60" rx="4" fill="#FFF" strokeDasharray="4 4" />
                          <line x1="20" y1="50" x2="90" y2="50" stroke={BLUE} strokeWidth="4" />
                        </g>
                      )}
                    </g>
                  </g>
                );
              })}

            </svg>
          </div>
        </div>

        {/* BOTTOM DETAIL PANEL */}
        <div style={{ height: 110, borderTop: `1.5px solid ${INK_L}`, background: '#fff', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {active === null ? (
            <div style={{ fontFamily: 'Georgia,serif', fontSize: 16, color: INK_L, fontStyle: 'italic' }}>
              Click any zone on the blueprint to view facility details.
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 40, width: '100%', maxWidth: 1000, margin: '0 auto', animation: 'slideUp 0.3s ease' }}>
              <div style={{ flexShrink: 0, width: 240, borderRight: `1px solid ${INK_LL}`, paddingRight: 30 }}>
                <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, letterSpacing: '0.14em', color: ZONES[active].accent, marginBottom: 8, fontWeight: 700 }}>
                  ZONE 0{ZONES[active].id + 1}
                </div>
                <div style={{ fontFamily: 'Georgia,serif', fontSize: 22, fontWeight: 700, color: INK, lineHeight: 1.1 }}>
                  {ZONES[active].name}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, color: INK, fontWeight: 700, marginBottom: 8 }}>
                  KEY METRIC: <span style={{ color: ZONES[active].accent }}>{ZONES[active].stat}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-sans),system-ui', fontSize: 14, color: 'rgba(92,61,30,0.75)', lineHeight: 1.6, margin: 0 }}>
                  {ZONES[active].desc}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── MOBILE (ACCORDION VIEW) ─── */}
      <div className="fb-mobile" style={{ padding: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ZONES.map((z, i) => {
            const isActive = active === i;
            return (
              <div 
                key={z.id} 
                className="fb-card"
                style={{ 
                  background: isActive ? '#fff' : 'transparent',
                  border: `1.5px solid ${isActive ? z.accent : 'rgba(92,61,30,0.15)'}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: isActive ? `0 8px 24px ${z.accent}20` : 'none'
                }}
              >
                {/* Header (Clickable) */}
                <div 
                  onClick={() => toggle(i)}
                  style={{ display: 'flex', alignItems: 'center', padding: '16px', cursor: 'pointer', gap: 16 }}
                >
                  {/* Circular Badge */}
                  <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: isActive ? z.accent : 'transparent', border: `1.5px solid ${isActive ? z.accent : 'rgba(92,61,30,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#fff' : INK, fontFamily: "'Courier New',monospace", fontSize: 12, fontWeight: 700 }}>
                    0{z.id + 1}
                  </div>
                  
                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Georgia,serif', fontSize: 16, fontWeight: 700, color: INK, marginBottom: 2 }}>
                      {z.name}
                    </div>
                    <div style={{ fontFamily: "'Courier New',monospace", fontSize: 10, color: isActive ? z.accent : INK_L, letterSpacing: '0.05em', fontWeight: 600 }}>
                      {z.stat}
                    </div>
                  </div>

                  {/* Icon/Arrow */}
                  <div style={{ flexShrink: 0, fontSize: 18, color: isActive ? z.accent : INK_L, transition: 'transform 0.3s', transform: isActive ? 'rotate(180deg)' : 'none' }}>
                    ↓
                  </div>
                </div>

                {/* Content Body */}
                {isActive && (
                  <div style={{ padding: '0 16px 20px 16px', borderTop: `1px dashed ${INK_LL}`, marginTop: 4, paddingTop: 16 }}>
                    <p style={{ fontFamily: 'var(--font-sans),system-ui', fontSize: 14, color: 'rgba(92,61,30,0.75)', lineHeight: 1.6, margin: 0 }}>
                      {z.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
