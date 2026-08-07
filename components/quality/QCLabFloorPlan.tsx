'use client';

import { useState } from 'react';

const CR     = '#AC033B';
const INK    = '#1A1818';
const INK_L  = 'rgba(26,24,24,0.28)';
const INK_LL = 'rgba(26,24,24,0.07)';
const WALL   = '#D6CFC8';
const FLOOR  = '#F5F3EF';

interface Room { id:number; key:string; gate:string; name:string; stat:string; accent:string; desc:string; }

const ROOMS: Room[] = [
  { id:0, key:'reception', gate:'ENTRY POINT', name:'Sample Reception',       stat:'100% Lots',       accent:'#7B4E1B', desc:'Every incoming lot is assigned a unique batch ID. AOAC/ISO standard sampling is performed at multiple points of the consignment before any material is unloaded. Physical documentation is cross-checked with the Purchase Order.' },
  { id:1, key:'prescreen', gate:'GATE 1',      name:'In-House Pre-Screening', stat:'< 2 Hours',        accent:'#1A5FAB', desc:'Within 2 hours of receipt, our in-house QC lab checks moisture content, colour (ASTA units), particle size, and visual defects. Only pre-approved material advances. Rejections are quarantined immediately.' },
  { id:2, key:'pesticide', gate:'GATE 2',      name:'Pesticide Testing Lab',  stat:'169 Residues',    accent:CR,        desc:'Our NABL ISO 17025-accredited lab screens 169 pesticide residues using GC-MS/MS and LC-MS/MS. Ochratoxin, Aflatoxin, heavy metals, NDPA colour value, and Curcumin are all tested on-site.' },
  { id:3, key:'allergen',  gate:'GATE 3',      name:'Allergen ELISA Lab',     stat:'12 Allergens',    accent:'#2E6B3E', desc:'ELISA analysis is run for 12 major allergen categories including Sesame, Gluten, Mustard, and Tree Nuts. Celery allergens are verified via third-party PCR at specified frequencies.' },
  { id:4, key:'microbio',  gate:'GATE 4',      name:'Microbiology Lab',       stat:'5-Log Reduction', accent:'#5E2D79', desc:'pH parameters, pathogens (Salmonella, E.Coli, Listeria), total plate count, yeast & mould are all in NABL scope. Steam sterilization achieves a validated 5-log microbial reduction with no chemicals.' },
  { id:5, key:'qcfloor',   gate:'GATE 5',      name:'QC Floor Monitoring',    stat:'Every 30 Min',    accent:'#0A4D6E', desc:'Daily metal detector calibration, weight verification at every filling station, sealing integrity checks every 30 minutes, and online moisture & colour sensors on milling lines.' },
  { id:6, key:'training',  gate:'BRC TIER 2',  name:'Training & Documentation',stat:'100% Staff',     accent:'#6B4C00', desc:'GMP training every 6 months for all shop floor staff. HACCP, allergen awareness, personal hygiene, and documentation training is mandatory for every team member.' },
];

/* ── Layout dimensions ─────────────── */
const RW = 190, RH = 158, GAP = 14;
const C0 = 18, C1 = C0+RW+GAP, C2 = C0+(RW+GAP)*2;
const R0 = 18, R1 = R0+RH+GAP, R2 = R0+(RH+GAP)*2;
const SVG_W = C2+RW+18;
const SVG_H = R2 + 148 + 20;
const LABEL_H = 24;
const FOOT_H  = 40;
const IW = RW-2;   // illustration viewport width
const IH = RH - LABEL_H - FOOT_H; // illustration viewport height ≈ 94

const ROOM_LAYOUT = [
  { id:0, x:C0, y:R0, w:RW, h:RH },
  { id:1, x:C0, y:R1, w:RW, h:RH },
  { id:2, x:C1, y:R0, w:RW, h:RH },
  { id:3, x:C2, y:R0, w:RW, h:RH },
  { id:4, x:C1, y:R1, w:RW, h:RH },
  { id:5, x:C2, y:R1, w:RW, h:RH },
  { id:6, x:C0, y:R2, w:RW*3+GAP*2, h:148 },
];

const CORRIDORS = [
  { x1:C0+RW, y1:R0+RH/2, x2:C1,    y2:R0+RH/2 },
  { x1:C1+RW, y1:R0+RH/2, x2:C2,    y2:R0+RH/2 },
  { x1:C0+RW, y1:R1+RH/2, x2:C1,    y2:R1+RH/2 },
  { x1:C1+RW, y1:R1+RH/2, x2:C2,    y2:R1+RH/2 },
  { x1:C0+RW/2, y1:R0+RH, x2:C0+RW/2, y2:R1 },
  { x1:C1+RW/2, y1:R0+RH, x2:C1+RW/2, y2:R1 },
  { x1:C2+RW/2, y1:R0+RH, x2:C2+RW/2, y2:R1 },
  { x1:C0+RW/2, y1:R1+RH, x2:C0+RW/2, y2:R2 },
  { x1:C1+RW/2, y1:R1+RH, x2:C1+RW/2, y2:R2 },
  { x1:C2+RW/2, y1:R1+RH, x2:C2+RW/2, y2:R2 },
];

/* ── CSS ─────────────────────────────── */
const CSS = `
  @keyframes qi-scope  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(3px)} }
  @keyframes qi-bubble { 0%{transform:translateY(0);opacity:.9} 100%{transform:translateY(-12px);opacity:0} }
  @keyframes qi-pulse  { 0%,100%{opacity:.3} 50%{opacity:1} }
  @keyframes qi-dash   { to{stroke-dashoffset:-24} }
  @keyframes qi-scan   { 0%{transform:translateY(0)} 50%{transform:translateY(24px)} 100%{transform:translateY(0)} }
  @keyframes qi-cw     { to{transform:rotate(360deg)} }
  @keyframes qi-ccw    { to{transform:rotate(-360deg)} }
  @keyframes qi-blink  { 0%,100%{opacity:1} 50%{opacity:.1} }
  @keyframes qi-up     { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  .qi-scope  { animation: qi-scope  2.2s ease-in-out infinite; transform-box:fill-box; transform-origin:top center; }
  .qi-bub    { animation: qi-bubble 1.8s ease-in-out infinite; }
  .qi-bub2   { animation: qi-bubble 1.8s ease-in-out .7s infinite; opacity:0; }
  .qi-pulse  { animation: qi-pulse  1.6s ease-in-out infinite; }
  .qi-dash   { stroke-dasharray:7 5; animation: qi-dash 2.5s linear infinite; }
  .qi-scan   { animation: qi-scan   3s ease-in-out infinite; }
  .qi-cw     { animation: qi-cw     7s linear infinite; transform-box:fill-box; transform-origin:center; }
  .qi-ccw    { animation: qi-ccw    7s linear infinite; transform-box:fill-box; transform-origin:center; }
  .qi-blink  { animation: qi-blink  1.4s ease-in-out infinite; }
  .qi-up     { animation: qi-up     .35s ease both; }
  .qi-room   { cursor:pointer; }
  @media (min-width:700px) { .qc-mob { display:none !important; } }
  @media (max-width:699px) { .qc-desk { display:none !important; } }
`;

/* ── Illustrations ────────────────────
   Drawn inside a nested <svg> with
   width=IW (~190), height=IH (~94)
   so overflow is auto-contained.
   ─────────────────────────────────── */
function Illus({ k, acc }: { k:string; acc:string }) {
  switch (k) {
    case 'reception': return (
      <g>
        {/* clipboard */}
        <rect x="8"  y="6"  width="44" height="60" rx="3" fill="#fff" stroke={INK} strokeWidth="1.5"/>
        <rect x="23" y="2"  width="14" height="9"  rx="2" fill={INK_L}/>
        <line x1="16" y1="24" x2="44" y2="24" stroke={INK_L} strokeWidth="1.2"/>
        <line x1="16" y1="34" x2="44" y2="34" stroke={INK_L} strokeWidth="1.2"/>
        <line x1="16" y1="44" x2="36" y2="44" stroke={INK_L} strokeWidth="1.2"/>
        {/* barcode */}
        <rect x="62" y="12" width="52" height="44" rx="3" fill="none" stroke={acc} strokeWidth="1.5"/>
        {[66,70,74,78,82,86,90,94,98,102,106].map(x=>(
          <line key={x} x1={x} y1="16" x2={x} y2="52" stroke={acc} strokeWidth="1"/>
        ))}
        <text x="88" y="62" textAnchor="middle" fontSize="8" fontFamily="monospace" fill={INK_L}>LOT-ID</text>
        <circle cx="52" cy="64" r="5" fill={acc} className="qi-pulse"/>
        {/* arrow */}
        <path d="M 124 34 L 140 34 M 134 28 L 140 34 L 134 40" fill="none" stroke={INK_L} strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    );

    case 'prescreen': return (
      <g>
        {/* microscope */}
        <rect x="30" y="54" width="28" height="5"  rx="2" fill={INK}/>
        <rect x="40" y="14" width="4"  height="40" fill={INK}/>
        <rect x="34" y="14" width="16" height="5"  rx="1" fill={INK}/>
        <rect x="38" y="4"  width="12" height="14" rx="2" fill="#fff" stroke={INK} strokeWidth="1.5" className="qi-scope"/>
        {/* scan target */}
        <circle cx="118" cy="38" r="32" fill="none" stroke={acc} strokeWidth="1.5" strokeDasharray="6 3" className="qi-cw"/>
        <circle cx="118" cy="38" r="20" fill="none" stroke={acc} strokeWidth="1"   strokeDasharray="3 5" className="qi-ccw"/>
        <circle cx="118" cy="38" r="7"  fill={acc} fillOpacity=".22"/>
        <line x1="86"  y1="38" x2="150" y2="38" stroke={acc} strokeWidth="1.5" className="qi-scan"/>
        <line x1="118" y1="6"  x2="118" y2="70" stroke={acc} strokeWidth="1"   strokeOpacity=".3"/>
      </g>
    );

    case 'pesticide': return (
      <g>
        {/* GC-MS instrument */}
        <rect x="4"  y="8"  width="32" height="66" rx="4" fill="#fff" stroke={INK} strokeWidth="1.5"/>
        <rect x="8"  y="12" width="24" height="12" rx="2" fill={acc} fillOpacity=".18"/>
        <line x1="8" y1="30" x2="32" y2="30" stroke={INK_L} strokeWidth="1"/>
        <line x1="8" y1="40" x2="32" y2="40" stroke={INK_L} strokeWidth="1"/>
        <line x1="8" y1="50" x2="24" y2="50" stroke={INK_L} strokeWidth="1"/>
        {/* tube rack */}
        <rect x="46" y="20" width="120" height="52" rx="3" fill="#fff" stroke={INK} strokeWidth="1.5"/>
        {[50,62,74,86,98,110,122,134,146,158].map((x,j)=>(
          <g key={x}>
            <rect x={x}   y="24" width="8" height="38" rx="4" fill="none" stroke={INK} strokeWidth="1"/>
            <rect x={x+1} y={j%2===0?44:40} width="6" height={j%2===0?16:20} rx="3"
              fill={j%2===0?acc:'#1A5FAB'} stroke="none"/>
            <circle cx={x+4} cy={j%2===0?47:43} r="2" fill="#fff" className={j%2===0?'qi-bub':'qi-bub2'}/>
          </g>
        ))}
        {/* PASS badge */}
        <circle cx="174" cy="14" r="6" fill="#22c55e" className="qi-blink"/>
        <text x="174" y="6" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={INK_L}>OK</text>
      </g>
    );

    case 'allergen': return (
      <g>
        {/* ELISA plate */}
        <rect x="4" y="10" width="132" height="64" rx="4" fill="#fff" stroke={INK} strokeWidth="1.5"/>
        {[0,1,2,3].map(row=>[0,1,2,3,4,5,6,7].map(col=>{
          const cx=16+col*16, cy=22+row*13;
          const filled=(row*8+col)<22;
          return <circle key={`${row}-${col}`} cx={cx} cy={cy} r="5"
            fill={filled?(row<2?acc:'#22c55e'):'none'} fillOpacity={filled?.5:1}
            stroke={INK_L} strokeWidth=".7"
            className={filled&&(row*8+col)%4===0?'qi-pulse':''}/>;
        }))}
        <text x="70" y="8" textAnchor="middle" fontSize="8" fontFamily="monospace" fill={INK_L}>ELISA PLATE</text>
        {/* pipette */}
        <path d="M152 2 L146 58 L149 66 L151 58 L152 10" fill="none" stroke={INK} strokeWidth="2"/>
        <circle cx="148" cy="68" r="4" fill={acc} fillOpacity=".8" className="qi-bub"/>
        {/* result tick */}
        <circle cx="170" cy="18" r="8" fill="#22c55e" fillOpacity=".15" stroke="#22c55e" strokeWidth="1.5"/>
        <path d="M163,18 L168,23 L177,12" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    );

    case 'microbio': return (
      <g>
        {/* petri dish */}
        <circle cx="44" cy="44" r="38" fill="#fff" stroke={INK} strokeWidth="1.5"/>
        <circle cx="44" cy="44" r="30" fill={acc} fillOpacity=".04" stroke={acc} strokeWidth=".8"/>
        {[[40,32],[56,28],[36,56],[60,50],[44,20],[30,42],[52,42]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="3" fill={acc} fillOpacity=".6" className="qi-pulse" style={{animationDelay:`${i*.22}s`}}/>
        ))}
        {/* centrifuge */}
        <circle cx="138" cy="44" r="36" fill="none" stroke={INK} strokeWidth="1.5"/>
        <circle cx="138" cy="44" r="22" fill="none" stroke={INK_L} strokeWidth=".8" strokeDasharray="6 3" className="qi-cw"/>
        <circle cx="138" cy="44" r="8"  fill={acc} fillOpacity=".18"/>
        <line x1="138" y1="22" x2="138" y2="66" stroke={INK} strokeWidth="2" className="qi-cw"/>
        <line x1="116" y1="44" x2="160" y2="44" stroke={INK} strokeWidth="2" className="qi-cw"/>
      </g>
    );

    case 'qcfloor': return (
      <g>
        {/* conveyor belt */}
        <rect x="4"  y="34" width="162" height="24" rx="6" fill="#e5e7eb" stroke={INK} strokeWidth="1.5"/>
        <line x1="4" y1="46" x2="166" y2="46" stroke={INK_L} strokeWidth="1" strokeDasharray="7 5" className="qi-dash"/>
        <circle cx="14"  cy="46" r="10" fill={INK_L} stroke={INK} strokeWidth="1"/>
        <circle cx="156" cy="46" r="10" fill={INK_L} stroke={INK} strokeWidth="1"/>
        {[34,68,102,136].map(x=>(
          <rect key={x} x={x} y="36" width="18" height="20" rx="2" fill="#fff" stroke={acc} strokeWidth="1.5"/>
        ))}
        {/* metal detector arch */}
        <path d="M74 6 L74 34 M108 6 L108 34" stroke={acc} strokeWidth="3" strokeLinecap="round"/>
        <path d="M74 8 Q91 -2 108 8" fill="none" stroke={acc} strokeWidth="3"/>
        <circle cx="91" cy="6" r="5" fill={acc} className="qi-blink"/>
        {/* weight display */}
        <rect x="4" y="64" width="52" height="16" rx="3" fill="#fff" stroke={INK_L} strokeWidth="1"/>
        <text x="30" y="76" textAnchor="middle" fontSize="8" fontFamily="monospace" fill={INK}>100g ✓</text>
      </g>
    );

    case 'training': return (
      <g>
        {/* whiteboard — shorter so people don't overlap */}
        <rect x="4"  y="6"  width="128" height="48" rx="3" fill="#fff" stroke={INK} strokeWidth="1.5"/>
        <text x="68" y="20" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={acc} fontWeight="700">GMP TRAINING</text>
        <line x1="12" y1="28" x2="124" y2="28" stroke={INK_L} strokeWidth="1"/>
        <line x1="12" y1="37" x2="108" y2="37" stroke={INK_L} strokeWidth="1"/>
        <line x1="12" y1="46" x2="88"  y2="46" stroke={INK_L} strokeWidth="1"/>
        {/* certificate badge */}
        <rect x="142" y="12" width="44" height="32" rx="3" fill={acc} fillOpacity=".12" stroke={acc} strokeWidth="1.5"/>
        <text x="164" y="25" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={acc} fontWeight="700">BRC</text>
        <text x="164" y="36" textAnchor="middle" fontSize="7" fontFamily="monospace" fill={acc}>TIER 2</text>
        <text x="187" y="12" fontSize="13" className="qi-pulse">⭐</text>
        {/* people row — clear gap below whiteboard */}
        {[14,36,58,80,102,124,146,168,190].map(x=>(
          <g key={x}>
            <circle cx={x} cy="64" r="6"  fill={INK_L}/>
            <rect   x={x-7} y="71" width="14" height="8" rx="3" fill={INK_L}/>
          </g>
        ))}
      </g>
    );

    default: return null;
  }
}

/* ── Main component ──────────────────── */
export default function QCLabFloorPlan() {
  const [active, setActive] = useState<number|null>(null);
  const [hov, setHov]       = useState<number|null>(null);

  const toggle = (id:number) => setActive(p => p===id ? null : id);
  const aRoom  = active !== null ? ROOMS[active] : null;

  return (
    <div style={{ width:'100%' }}>
      <style>{CSS}</style>

      <div className="qc-desk" style={{ background:FLOOR, border:`1.5px solid ${WALL}`, borderRadius:20, overflow:'hidden' }}>

        {/* header */}
        <div style={{ padding:'11px 20px', borderBottom:`1.5px solid ${WALL}`, background:'#fff', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:CR }} className="qi-pulse"/>
            <span style={{ fontFamily:'monospace', fontSize:10, letterSpacing:'.15em', textTransform:'uppercase', color:INK_L }}>
              QC Lab — Interactive Floor Plan
            </span>
          </div>
          <span style={{ fontFamily:'monospace', fontSize:9, color:INK_L }}>
            {active!==null ? `${ROOMS[active].gate} selected` : 'Click any room'}
          </span>
        </div>

        {/* scroll wrapper for mobile */}
        <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
          <div style={{ minWidth:480, padding:'14px 14px 0' }}>

            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ width:'100%', height:'auto', display:'block' }}>

              <defs>
                <pattern id="qcFP-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke={INK_LL} strokeWidth=".5"/>
                </pattern>
              </defs>

              {/* grid bg */}
              <rect width={SVG_W} height={SVG_H} fill="url(#qcFP-grid)"/>
              <rect x={12} y={12} width={SVG_W-24} height={SVG_H-24} rx="8" fill="none" stroke={WALL} strokeWidth="2"/>

              {/* corridors */}
              {CORRIDORS.map((c,i)=>(
                <g key={i}>
                  <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke={WALL} strokeWidth="12" strokeLinecap="round"/>
                  <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke={CR}   strokeWidth="2"  strokeLinecap="round" className="qi-dash"/>
                </g>
              ))}

              {/* rooms */}
              {ROOM_LAYOUT.map(rl => {
                const room      = ROOMS[rl.id];
                const isAct     = active === rl.id;
                const isHov     = hov    === rl.id;
                const dim       = active !== null && !isAct;
                const isTrainig = rl.id === 6;

                // illustration nested svg dimensions
                const illus_x = rl.x + 1;
                const illus_y = rl.y + LABEL_H;
                const illus_w = rl.w - 2;
                const illus_h = isTrainig ? rl.h - LABEL_H - 44 : IH;

                return (
                  <g key={rl.id} className="qi-room"
                    style={{ opacity: dim ? 0.22 : 1, transition:'opacity .25s' }}
                    onClick={()=>toggle(rl.id)}
                    onMouseEnter={()=>setHov(rl.id)}
                    onMouseLeave={()=>setHov(null)}
                  >
                    {/* shadow */}
                    <rect x={rl.x+2} y={rl.y+3} width={rl.w} height={rl.h} rx="6" fill="rgba(0,0,0,0.05)"/>

                    {/* room body */}
                    <rect x={rl.x} y={rl.y} width={rl.w} height={rl.h} rx="6"
                      fill={isAct ? '#fff' : 'rgba(255,255,255,0.84)'}
                      stroke={isAct ? room.accent : isHov ? room.accent : WALL}
                      strokeWidth={isAct ? 2.5 : 1.5}/>

                    {/* label strip */}
                    <rect x={rl.x} y={rl.y} width={rl.w} height={LABEL_H}
                      fill={isAct ? room.accent : 'rgba(0,0,0,0.04)'}
                      rx="6"/>
                    <rect x={rl.x} y={rl.y+LABEL_H-4} width={rl.w} height={4}
                      fill={isAct ? room.accent : 'rgba(0,0,0,0.04)'}/>

                    <text x={rl.x+10} y={rl.y+16}
                      fontFamily="'Courier New',monospace" fontSize="9" fontWeight="700"
                      fill={isAct ? '#fff' : INK_L} letterSpacing=".1em">
                      {room.gate}
                    </text>
                    {isAct && <circle cx={rl.x+rl.w-13} cy={rl.y+12} r="5" fill="#fff" fillOpacity=".65" className="qi-blink"/>}

                    {/* *** NESTED SVG = automatic overflow:hidden for illustrations *** */}
                    <svg x={illus_x} y={illus_y} width={illus_w} height={illus_h}
                      overflow="hidden" viewBox={`0 0 ${illus_w} ${illus_h}`}
                      preserveAspectRatio="xMidYMid meet"
                      opacity={isAct ? 1 : 0.72}
                    >
                      <Illus k={room.key} acc={room.accent}/>
                    </svg>

                    {/* room name + stat */}
                    <text x={rl.x+rl.w/2} y={rl.y+rl.h-(isTrainig?22:28)}
                      textAnchor="middle" fontFamily="Georgia,serif"
                      fontSize={isTrainig?13:11} fontWeight="700"
                      fill={isAct ? room.accent : INK}>
                      {room.name}
                    </text>
                    <text x={rl.x+rl.w/2} y={rl.y+rl.h-(isTrainig?9:14)}
                      textAnchor="middle" fontFamily="'Courier New',monospace"
                      fontSize="8" fontWeight="700" fill={room.accent}>
                      {room.stat}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* detail panel */}
        <div style={{ minHeight:80, borderTop:`1.5px solid ${WALL}`, background:'#fff', padding:'16px 20px', display:'flex', alignItems:'center' }}>
          {aRoom===null ? (
            <div style={{ fontFamily:'Georgia,serif', fontSize:14, color:INK_L, fontStyle:'italic', margin:'0 auto', textAlign:'center' }}>
              Click any room on the floor plan to view inspection details.
            </div>
          ) : (
            <div key={active} className="qi-up" style={{ display:'flex', gap:24, width:'100%', flexWrap:'wrap' }}>
              <div style={{ minWidth:160, borderRight:`1px solid ${INK_LL}`, paddingRight:20 }}>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:9, letterSpacing:'.14em', color:aRoom.accent, marginBottom:5, fontWeight:700 }}>
                  {aRoom.gate}
                </div>
                <div style={{ fontFamily:'Georgia,serif', fontSize:16, fontWeight:700, color:INK, lineHeight:1.2 }}>
                  {aRoom.name}
                </div>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:12, color:aRoom.accent, fontWeight:700, marginTop:6 }}>
                  {aRoom.stat}
                </div>
              </div>
              <div style={{ flex:1, minWidth:180 }}>
                <p style={{ fontFamily:'system-ui,sans-serif', fontSize:13, color:'rgba(0,0,0,0.6)', lineHeight:1.75, margin:0 }}>
                  {aRoom.desc}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE CARD LIST ──────────────────────────────────── */}
      <div className="qc-mob" style={{ padding: '0 10px', marginTop: 24 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 2, background: 'rgba(0,0,0,0.1)' }} />
          
          {ROOMS.map((room) => (
            <div key={room.id} style={{ position: 'relative', paddingLeft: 60, marginBottom: 48 }}>
              <div style={{ 
                position: 'absolute', left: 8, top: 0, width: 34, height: 34, borderRadius: '50%', 
                background: '#fff', border: `3px solid ${room.accent}`, zIndex: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 800, color: room.accent
              }}>
                {String(room.id + 1).padStart(2, '0')}
              </div>
              
              <div style={{ 
                background: '#fff', borderRadius: 16, overflow: 'hidden', 
                border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' 
              }}>
                <div style={{ padding: 20 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: room.accent, marginBottom: 4, fontWeight: 700 }}>
                    {room.gate}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 20, fontWeight: 800, color: INK, marginBottom: 12 }}>
                    {room.name}
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 16 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 800, color: room.accent, lineHeight: 1 }}>{room.stat}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans,system-ui)', fontSize: 14, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, margin: 0 }}>
                    {room.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
