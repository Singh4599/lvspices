'use client';

import { useState, useEffect } from 'react';

const RED    = '#AC033B';
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
  {
    id: 1,
    name: 'Quality Assurance',
    stat: 'FSSC 22000 · NABL',
    desc: 'Every batch at LV Spices passes a strict 3-stage quality check. First, our in-house NABL-accredited lab tests for moisture, colour, and microbial safety. Next, we verify through third-party experts like SGS or Bureau Veritas. Finally, every shipment goes out with a complete Certificate of Analysis. It\'s why our global rejection rate is virtually zero.',
  },
  {
    id: 2,
    name: 'International Regs',
    stat: 'Global Compliance',
    desc: 'Exporting spices means navigating complex global laws. Our documentation team ensures your order complies with USFDA, European MRLs, and Middle Eastern standards before it even leaves the factory. From Health Certificates to Phyto clearance, we handle the paperwork so your shipment clears customs without delays.',
  },
  {
    id: 3,
    name: 'Competitive Pricing',
    stat: 'Direct Sourcing',
    desc: 'By working directly with farmers across India\'s top spice-growing regions, we eliminate middlemen and pass the savings to you. Whether you need pricing on FOB, CIF, or door-to-door (DAP) terms, we provide transparent, highly competitive rates. We also offer flexible payment options for verified buyers.',
  },
  {
    id: 4,
    name: 'Packaging & Label',
    stat: '5g to 50kg',
    desc: 'We pack exactly how you need it — from 5g sachets and retail zip-lock pouches to 50kg bulk export sacks. Need private label packaging? Our design team ensures your artwork perfectly meets the legal labelling requirements of your target market, whether it\'s FSSAI, FDA, or EU standards.',
  },
  {
    id: 5,
    name: 'Logistics & Supply',
    stat: 'FCL & LCL Delivery',
    desc: 'Shipping from major Indian ports like Nhava Sheva and Mundra, we manage your cargo from our warehouse to your destination. We partner with top shipping lines for both full containers (FCL) and smaller LCL loads. Plus, you get real-time tracking so you always know exactly where your cargo is.',
  },
  {
    id: 6,
    name: 'Product Customization',
    stat: 'Custom R&D Lab',
    desc: 'Looking for a unique masala blend or a specific chilli heat level? Our R&D lab works with you to develop custom formulations, matching exact colour, heat, and mesh size requirements. Everything we develop for you is strictly protected under an NDA — your recipe remains yours alone.',
  },
  {
    id: 7,
    name: 'Traceability',
    stat: 'Farm-to-Port Tracking',
    desc: 'Trust starts with transparency. Every shipment features a QR-scannable lot number that traces the spice all the way back to the farm. From harvest dates to lab reports and packaging records, our blockchain-ready traceability system ensures total supply chain visibility for modern retail compliance.',
  },
  {
    id: 8,
    name: 'After-Sales Support',
    stat: 'Dedicated AM',
    desc: 'We don\'t disappear after the container ships. You get a dedicated account manager who understands your business. If you ever face an issue, our strict Service Level Agreement means you get a response within hours, not days. We focus on building long-term partnerships, which is why most of our buyers stay with us.',
  },
  {
    id: 9,
    name: 'Market Insights',
    stat: 'Smart Buying Alerts',
    desc: 'The spice market is volatile, but you don\'t have to guess. We provide our buyers with regular market intelligence — crop forecasts, price trends, and regulatory updates. By knowing when to buy and when to wait, our clients consistently make smarter purchasing decisions and save money.',
  },
  {
    id: 10,
    name: 'Risk Management',
    stat: 'Price & Supply Security',
    desc: 'Don\'t let unexpected price spikes hurt your margins. We offer forward-booking contracts that let you lock in prices and volumes for up to a year. Combined with our massive climate-controlled buffer stock, we ensure your supply remains uninterrupted even during off-season shortages.',
  },
  {
    id: 11,
    name: 'Fast Delivery',
    stat: '7-Day Dispatch',
    desc: 'Speed matters in the food industry. We dispatch standard in-stock spices within just 7 days of order confirmation. Even for custom blends, we aim for a 3 to 4-week turnaround. More importantly, we ensure your critical export documents are couriered promptly so there are no port holding fees.',
  },
  {
    id: 12,
    name: 'Custom Products',
    stat: '100% Confidential',
    desc: 'Some of the best-known spice brands rely on our manufacturing — and we keep their secrets safe. If you want a competitive edge, we can create exclusive product lines for your brand. We sign strict Non-Disclosure Agreements, guaranteeing we will never manufacture your custom blend for anyone else.',
  },
  {
    id: 13,
    name: 'Custom Formats',
    stat: 'Jars, Pouches, Sacks',
    desc: 'From premium glass jars and tin canisters to nitrogen-flushed vacuum bricks, we offer a massive variety of packaging formats. Whatever your retail strategy, we have the food-grade packaging to support it. All formats are available with your custom branding, ready to hit the supermarket shelves.',
  },
  {
    id: 14,
    name: 'Cold Storage',
    stat: 'Preserves Freshness',
    desc: 'Heat destroys flavour. For high-value, temperature-sensitive spices like saffron, vanilla, and cardamom, we use advanced 4°C–12°C cold storage. This preserves the essential volatile oils and natural colours far better than standard warehouses, ensuring the product is as fresh as the day it was harvested.',
  },
];


const CSS = `
  @keyframes beltMove { from { stroke-dashoffset: 20; } to { stroke-dashoffset: 0; } }
  @keyframes gearSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes pulseLight { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  @keyframes srv-slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes popup-reveal { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
  @keyframes steamRise { 0% { transform: translateY(0) scale(1); opacity: 0.6; } 100% { transform: translateY(-20px) scale(1.5); opacity: 0; } }
  @keyframes needleWiggle { 0%, 100% { transform: rotate(-20deg); } 50% { transform: rotate(40deg); } }
  
  .belt-anim { animation: beltMove 1s linear infinite; }
  .srv-track-anim { animation: beltMove 1.5s linear infinite; }
  .gear-anim { animation: gearSpin 4s linear infinite; transform-box: fill-box; transform-origin: center; }
  .srv-gear-anim { animation: gearSpin 4s linear infinite; transform-box: fill-box; transform-origin: center; }
  .gear-anim-rev { animation: gearSpin 4s linear infinite reverse; transform-box: fill-box; transform-origin: center; }
  .light-pulse { animation: pulseLight 2s ease-in-out infinite; }
  .steam-anim { animation: steamRise 2s ease-out infinite; transform-box: fill-box; transform-origin: bottom center; }
  .needle-anim { animation: needleWiggle 3s ease-in-out infinite; transform-box: fill-box; transform-origin: bottom center; }

  @media (min-width: 800px) { .srv-mobile { display:none !important; } }
  @media (max-width: 799px)  { .srv-desktop { display:none !important; } }

  .modal-overlay {
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: srv-slideUp 0.3s cubic-bezier(0.16,1,0.3,1);
  }
`;

function MachineFactory({ i, x, y, s, isActive, isHov, toggle, setHov }: { i:number, x:number, y:number, s:Station, isActive:boolean, isHov:boolean, toggle:()=>void, setHov:(n:number|null)=>void }) {
  const isFocus = isActive || isHov;
  const strokeColor = isFocus ? RED : INK;
  const strokeW = isFocus ? "2.5" : "1.5";
  const glow = isFocus ? "url(#srv-glow)" : "none";

  return (
    <g onClick={toggle} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{cursor:'pointer'}} filter={glow}>
      
      {/* ── Base Connectors (Pipes to main belt) ── */}
      <path d={`M${x-20},${y+40} L${x-20},${y+70} M${x+20},${y+40} L${x+20},${y+70}`} stroke={INK_L} strokeWidth="3" fill="none"/>
      
      {/* ── Unique Machine Drawing per Step ── */}
      <g transform={`translate(${x}, ${y})`}>
        {i === 0 && ( /* Quality Lab */
          <g>
            <path d="M-40,40 L40,40 L30,-20 Q0,-40 -30,-20 Z" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="0" cy="10" r="15" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="10" r="8" fill={RED} className="light-pulse"/>
            <path d="M-40,40 L-50,40 L-50,-10 L-35,-10" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <rect x="-42" y="-30" width="10" height="20" fill="none" stroke={strokeColor} strokeWidth="2"/>
          </g>
        )}
        {i === 1 && ( /* Regs Scanner */
          <g>
            <rect x="-35" y="-30" width="70" height="70" rx="8" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-25" y="-20" width="50" height="30" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-25" y1="-5" x2="25" y2="-5" stroke={RED} strokeWidth="2" className="light-pulse"/>
            <circle cx="-15" cy="25" r="4" fill={strokeColor}/>
            <circle cx="0" cy="25" r="4" fill={strokeColor}/>
            <circle cx="15" cy="25" r="4" fill={strokeColor}/>
          </g>
        )}
        {i === 2 && ( /* Pricing Ticker */
          <g>
            <path d="M-45,40 L45,40 L45,-30 L-45,-30 Z" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <polyline points="-35,20 -15,-10 5,10 25,-20" fill="none" stroke={RED} strokeWidth="2.5" strokeLinejoin="round"/>
            <circle cx="-35" cy="20" r="3" fill={strokeColor}/>
            <circle cx="25" cy="-20" r="3" fill={strokeColor}/>
            <rect x="-45" y="-40" width="90" height="10" fill={strokeColor}/>
            <text x="0" y="-32" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="monospace" fontWeight="bold">GLOBAL TICKER</text>
          </g>
        )}
        {i === 3 && ( /* Packaging Arm */
          <g>
            <path d="M-30,40 L30,40 L30,10 L-30,10 Z" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-15" y="-30" width="30" height="40" rx="3" fill="none" stroke={strokeColor} strokeWidth={strokeW} strokeDasharray="4 2"/>
            {/* Robotic arm */}
            <path d="M-40,40 L-40,-10 L-15,-10" fill="none" stroke={strokeColor} strokeWidth="4" strokeLinejoin="round"/>
            <circle cx="-40" cy="-10" r="4" fill={RED}/>
            <path d="M-15,-15 L-5,-10 L-15,-5 Z" fill={strokeColor}/>
          </g>
        )}
        {i === 4 && ( /* Logistics Crane */
          <g>
            <path d="M-50,40 L-30,40 L-30,-40 L-40,-40 Z" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-30,-30 L40,-30" fill="none" stroke={strokeColor} strokeWidth="6"/>
            <path d="M10,-30 L10,10" fill="none" stroke={strokeColor} strokeWidth="2" strokeDasharray="3 2"/>
            <rect x="-10" y="10" width="40" height="30" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <line x1="-10" y1="25" x2="30" y2="25" stroke={strokeColor} strokeWidth="1"/>
          </g>
        )}
        {i === 5 && ( /* Customization Mixer */
          <g>
            <path d="M-35,40 L35,40 L45,-20 L-45,-20 Z" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-45,-20 Q0,-40 45,-20 Z" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <g className="gear-anim">
              <circle cx="0" cy="10" r="12" fill="none" stroke={RED} strokeWidth="2"/>
              <line x1="-16" y1="10" x2="16" y2="10" stroke={RED} strokeWidth="2"/>
              <line x1="0" y1="-6" x2="0" y2="26" stroke={RED} strokeWidth="2"/>
            </g>
          </g>
        )}
        {i === 6 && ( /* Traceability Server */
          <g>
            <rect x="-25" y="-35" width="50" height="75" rx="4" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            {[ -20, -5, 10 ].map(Y => (
              <g key={Y}>
                <rect x="-18" y={Y} width="36" height="8" fill="none" stroke={strokeColor} strokeWidth="1"/>
                <circle cx="-10" cy={Y+4} r="2" fill={RED} className="light-pulse"/>
                <circle cx="10" cy={Y+4} r="2" fill={strokeColor}/>
              </g>
            ))}
            <path d="M0,-35 L0,-50 M-10,-50 L10,-50 M-15,-60 L15,-60" stroke={strokeColor} strokeWidth="2"/>
          </g>
        )}
        {i === 7 && ( /* After Sales Tower */
          <g>
            <path d="M-20,40 L20,40 L10,-20 L-10,-20 Z" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="-30" r="10" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="-30" r="4" fill={RED} className="light-pulse"/>
            <path d="M-15,-30 A 15 15 0 0 1 15,-30" fill="none" stroke={strokeColor} strokeWidth="2"/>
            <path d="M-22,-30 A 22 22 0 0 1 22,-30" fill="none" stroke={strokeColor} strokeWidth="2" strokeDasharray="4 4"/>
          </g>
        )}
        {i === 8 && ( /* Insights Dial */
          <g>
            <circle cx="0" cy="5" r="35" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="5" r="25" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3"/>
            <line x1="0" y1="5" x2="0" y2="-15" stroke={RED} strokeWidth="3" strokeLinecap="round" className="needle-anim"/>
            <circle cx="0" cy="5" r="4" fill={strokeColor}/>
          </g>
        )}
        {i === 9 && ( /* Risk Shield/Vault */
          <g>
            <path d="M-35,-20 L0,-35 L35,-20 L35,10 Q0,50 -35,10 Z" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-25,-12 L0,-25 L25,-12 L25,5 Q0,35 -25,5 Z" fill="none" stroke={strokeColor} strokeWidth="1"/>
            <circle cx="0" cy="0" r="8" fill="none" stroke={RED} strokeWidth="2"/>
            <line x1="-5" y1="0" x2="5" y2="0" stroke={RED} strokeWidth="2"/>
          </g>
        )}
        {i === 10 && ( /* Fast Delivery Jet */
          <g>
            <path d="M-40,10 L30,10 L45,25 L30,40 L-40,40 Z" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-40,15 L-55,25 L-40,35 Z" fill="none" stroke={RED} strokeWidth="2"/>
            <line x1="-20" y1="25" x2="10" y2="25" stroke={strokeColor} strokeWidth="2" strokeDasharray="5 5"/>
            <path d="M-65,25 L-55,25" stroke={RED} strokeWidth="2" className="belt-anim"/>
          </g>
        )}
        {i === 11 && ( /* Custom 3D Mold */
          <g>
            <rect x="-35" y="-30" width="70" height="70" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-20,-30 L-20,0 M20,-30 L20,0" stroke={strokeColor} strokeWidth="2"/>
            <rect x="-25" y="-5" width="50" height="10" fill={strokeColor}/>
            <path d="M-10,40 L-10,20 Q0,10 10,20 L10,40 Z" fill="none" stroke={RED} strokeWidth="2"/>
          </g>
        )}
        {i === 12 && ( /* Formats Filler */
          <g>
            <path d="M-20,-40 L20,-40 L10,-10 L-10,-10 Z" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <rect x="-5" y="-10" width="10" height="15" fill={strokeColor}/>
            <path d="M-15,40 L-15,15 L15,15 L15,40" fill="none" stroke={strokeColor} strokeWidth={strokeW}/>
            <circle cx="0" cy="25" r="4" fill={RED}/>
          </g>
        )}
        {i === 13 && ( /* Cold Storage Freezer */
          <g>
            <rect x="-30" y="-35" width="60" height="75" rx="5" fill="#FDF8F5" stroke={strokeColor} strokeWidth={strokeW}/>
            <path d="M-20,-25 L20,-25 M-20,-15 L20,-15 M-20,-5 L20,-5 M-20,5 L20,5 M-20,15 L20,15" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 4"/>
            <path d="M-30,-20 L-40,-20 L-40,20 L-30,20" fill="none" stroke="#64B5F6" strokeWidth="3"/>
            <text x="0" y="32" textAnchor="middle" fill={RED} fontSize="9" fontFamily="monospace" fontWeight="bold">-12°C</text>
          </g>
        )}
      </g>

      {/* Title block */}
      <rect x={x-50} y={y+85} width="100" height="20" rx="10" fill={isActive ? RED : '#f0f0f0'} />
      <text x={x} y={y+98} textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {s.name.toUpperCase()}
      </text>
      
      {/* Step Number Tag */}
      <circle cx={x-35} cy={y-45} r="10" fill={isActive ? RED : '#fff'} stroke={strokeColor} strokeWidth="1.5" />
      <text x={x-35} y={y-42} textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill={isActive ? '#fff' : INK}>
        {String(s.id).padStart(2, '0')}
      </text>
    </g>
  );
}

export default function ServicesProcessFlow() {
  const [active, setActive] = useState<number | null>(null);
  const [hov,    setHov]    = useState<number | null>(null);
  const station = active !== null ? STATIONS[active] : null;
  const toggle  = (i: number) => setActive(v => v === i ? null : i);

  const count = STATIONS.length; // 14

  /* Desktop Horizontal Zigzag */
  const dSX = [140, 320, 500, 680, 860, 1040, 1220, 1400, 1580, 1760, 1940, 2120, 2300, 2480];
  const dSY = Array.from({length: count}, (_, i) => i % 2 === 0 ? 120 : 250);
  const dTrackY = dSY.map(y => y + 70);
  const dSnakePath = `M${dSX[0]},${dTrackY[0]} ` + Array.from({length: count - 1}, (_, i) => {
    const x1 = dSX[i], y1 = dTrackY[i], x2 = dSX[i+1], y2 = dTrackY[i+1];
    const cp2 = (x2 - x1) / 2;
    return `C${x1+cp2},${y1} ${x2-cp2},${y2} ${x2},${y2}`;
  }).join(' ');
  const dRelayX = dSX.slice(0, count-1).map((x, i) => Math.round((x + dSX[i+1]) / 2));
  const dRelayY = dTrackY.slice(0, count-1).map((y, i) => Math.round((y + dTrackY[i+1]) / 2));
  const dViewW = 2620;

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

        <div style={{ textAlign:'center', marginBottom:50 }}>
          <div style={{ fontFamily:"'Courier New',monospace", fontSize:11, letterSpacing:'0.3em', textTransform:'uppercase', color:RED, marginBottom:16, fontWeight:700 }}>
            Service Factory
          </div>
          <h2 style={{ fontFamily:'var(--font-display),Georgia,serif', fontSize:'clamp(32px,4vw,56px)', fontWeight:800, color:INK, margin:'0 0 16px', letterSpacing:'-0.03em' }}>
            Continuous Processing Line
          </h2>
          <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:15, color:'rgba(0,0,0,0.5)', margin:0, maxWidth:600, marginLeft:'auto', marginRight:'auto' }}>
            Tap any machine on our service assembly line to see how we engineer value from farm to destination.
          </p>
        </div>

        {/* DESKTOP — Horizontal Zigzag Assembly Line */}
        <div className="srv-desktop">
          <div style={{ borderRadius:8, background:'#F0EEE5', border:'1px solid rgba(0,0,0,0.1)', overflow:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)',
              backgroundSize:'40px 40px' }}/>
            <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch', scrollbarWidth:'none', msOverflowStyle:'none', cursor:'grab' }}>
              <svg viewBox={`0 0 ${dViewW} 450`} style={{ display:'block', minWidth:dViewW, width:'100%' }} xmlns="http://www.w3.org/2000/svg">
                <defs><filter id="srv-glow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={RED} floodOpacity="0.3"/></filter></defs>
                <path d={dSnakePath} fill="none" stroke="#E5E3D8" strokeWidth="18" strokeLinecap="round"/>
                <path d={dSnakePath} fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round"/>
                <path d={dSnakePath} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" className="srv-track-anim"/>
                {dRelayX.map((cx, k) => (
                  <g key={k} transform={`translate(${cx}, ${dRelayY[k]})`} className="srv-gear-anim">
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
              {active===null ? '\u2190 DRAG TO EXPLORE \u2022 CLICK ANY STATION TO LEARN MORE \u2192' : 'CLICK AGAIN OR USE CROSS TO CLOSE'}
            </div>
          </div>
        </div>

        {/* MOBILE — Vertical Zigzag Assembly Line */}
        <div className="srv-mobile">
          <div style={{ borderRadius:8, background:'#F0EEE5', border:'1px solid rgba(0,0,0,0.1)', overflow:'hidden', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, pointerEvents:'none',
              backgroundImage:'linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)',
              backgroundSize:'30px 30px' }}/>
            <svg viewBox={`0 0 360 ${160 + count * 220}`} style={{ display:'block', width:'100%', position:'relative', zIndex:2 }} xmlns="http://www.w3.org/2000/svg">
              <path d={mSnakePath} fill="none" stroke="#E5E3D8" strokeWidth="18" strokeLinecap="round"/>
              <path d={mSnakePath} fill="none" stroke="#444" strokeWidth="5" strokeLinecap="round"/>
              <path d={mSnakePath} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="14 14" className="srv-track-anim"/>
              {mRelayWheels.map(([cx,cy],k) => (
                <g key={k} transform={`translate(${cx}, ${cy})`} className="srv-gear-anim">
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
        <div className="modal-overlay" onClick={()=>setActive(null)}>
          <div style={{
            background:'#fff', borderRadius:0, border:`2px solid ${INK}`,
            padding:'clamp(32px,5vw,48px)', maxWidth:540, width:'100%',
            boxShadow:`8px 8px 0px ${RED}`,
            animation:'popup-reveal 0.3s cubic-bezier(0.16,1,0.3,1)',
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
            <p style={{ fontFamily:'var(--font-sans),system-ui', fontSize:15, color:'rgba(0,0,0,0.7)', lineHeight:1.8, margin:0 }}>
              {station.desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
