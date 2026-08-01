'use client';

import { useState } from 'react';

const CR    = '#AC033B';
const INK   = '#111';
const INK_L = 'rgba(17,17,17,0.3)';
const INK_LL = 'rgba(17,17,17,0.07)';

interface Dept {
  id: number;
  code: string;
  name: string;
  headcount: string;
  accent: string;
  icon: string;
  roles: string[];
  desc: string;
  perks: string[];
}

const DEPTS: Dept[] = [
  {
    id:1, code:'PROD', name:'Production & Processing', headcount:'200+ People', accent:'#8B4000', icon:'⚙️',
    roles:['Machine Operator','Shift Supervisor','QC Floor Inspector','Processing Technician','Maintenance Engineer'],
    desc:'The beating heart of LV Spices. You\'ll work on state-of-the-art milling, roasting, and sterilization lines — processing thousands of tonnes of premium spices annually.',
    perks:['Shift bonuses','Safety certifications','Skill upgradation','Medical coverage'],
  },
  {
    id:2, code:'QC',   name:'Quality Control', headcount:'60+ People', accent:CR, icon:'🔬',
    roles:['QC Analyst','Lab Technician','Microbiologist','NABL Auditor','Sensory Evaluator'],
    desc:'NABL-accredited labs, GC-MS instruments, ELISA plates — our QC team is the last line of defence before products reach customers in 40+ countries.',
    perks:['Lab stipend','Conference attendance','NABL training','Publication support'],
  },
  {
    id:3, code:'RND',  name:'R&D & Innovation', headcount:'12 Scientists', accent:'#1A5FAB', icon:'🧪',
    roles:['Food Scientist','Formulation Chemist','Sensory Analyst','Process Engineer','Product Developer'],
    desc:'Develop 50+ new formulations per year. Work with GC-MS, sensory panels, and functional ingredient research — partnering with CFTRI and IIT Food Tech.',
    perks:['Research grants','Journal allowance','Patent bonuses','Flex hours'],
  },
  {
    id:4, code:'SALES', name:'Sales & Marketing', headcount:'80+ People', accent:'#2E6B3E', icon:'🌍',
    roles:['Export Manager','Key Account Manager','Marketing Executive','Brand Strategist','Trade Show Coordinator'],
    desc:'Build relationships with clients across 40+ countries. Attend international trade shows, manage OEM accounts, and grow LV Spices\' global footprint.',
    perks:['International travel','Performance bonuses','CRM tools','Language training'],
  },
  {
    id:5, code:'LOGI',  name:'Logistics & Supply Chain', headcount:'70+ People', accent:'#5E2D79', icon:'🚢',
    roles:['Logistics Coordinator','Customs Executive','Supply Chain Analyst','Warehouse Manager','Documentation Specialist'],
    desc:'Coordinate global shipments from Mumbai across 40+ countries. Manage customs compliance, FSSAI documentation, and cold-chain logistics.',
    perks:['Freight certifications','CHA training','Port access passes','Team lunches'],
  },
  {
    id:6, code:'CORP',  name:'Corporate & Finance', headcount:'50+ People', accent:'#0A4D6E', icon:'💼',
    roles:['Financial Analyst','HR Business Partner','SAP Consultant','Legal Executive','IT Systems Admin'],
    desc:'Drive the business engine. From SAP ERP implementation to FSSAI regulatory compliance — corporate teams ensure everything runs like clockwork.',
    perks:['CPA/CA support','Remote flex','ESOP options','Leadership programmes'],
  },
];

/* ── Layout (hex-like grid: 3 top + 3 bottom) ─── */
const W = 200, H = 170, GAP = 18;
const C0 = 20, C1 = C0+W+GAP, C2 = C0+(W+GAP)*2;
const R0 = 20, R1 = R0+H+GAP;
const SVG_W = C2+W+20;
const SVG_H = R1+H+30;
const LABEL_H = 24;

const POS = [
  { id:1, x:C0, y:R0, w:W, h:H },
  { id:2, x:C1, y:R0, w:W, h:H },
  { id:3, x:C2, y:R0, w:W, h:H },
  { id:4, x:C0, y:R1, w:W, h:H },
  { id:5, x:C1, y:R1, w:W, h:H },
  { id:6, x:C2, y:R1, w:W, h:H },
];

const CONNECT = [
  { x1:C0+W, y1:R0+H/2, x2:C1,   y2:R0+H/2 },
  { x1:C1+W, y1:R0+H/2, x2:C2,   y2:R0+H/2 },
  { x1:C0+W, y1:R1+H/2, x2:C1,   y2:R1+H/2 },
  { x1:C1+W, y1:R1+H/2, x2:C2,   y2:R1+H/2 },
  { x1:C0+W/2, y1:R0+H, x2:C0+W/2, y2:R1 },
  { x1:C1+W/2, y1:R0+H, x2:C1+W/2, y2:R1 },
  { x1:C2+W/2, y1:R0+H, x2:C2+W/2, y2:R1 },
];

const CSS = `
  @keyframes cd-pulse { 0%,100%{opacity:.25} 50%{opacity:1} }
  @keyframes cd-dash  { to{stroke-dashoffset:-32} }
  @keyframes cd-blink { 0%,100%{opacity:1} 50%{opacity:.1} }
  @keyframes cd-slide { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  .cd-pulse { animation: cd-pulse 1.8s ease-in-out infinite; }
  .cd-dash  { stroke-dasharray:7 5; animation: cd-dash 2.5s linear infinite; }
  .cd-blink { animation: cd-blink 1.4s ease-in-out infinite; }
  .cd-slide { animation: cd-slide .35s ease both; }
  .cd-dept  { cursor:pointer; }
  @media (min-width:700px) { .cd-mob { display:none !important; } }
  @media (max-width:699px) { .cd-desk { display:none !important; } }
`;

/* ── Simple illustrations per dept ──── */
function DeptIllus({ id, acc }: { id:number; acc:string }) {
  const iw = W-2, ih = H - LABEL_H - 44;
  switch (id) {
    case 1: return ( /* Production: cogs + belt */
      <g>
        <circle cx="44" cy="44" r="30" fill="none" stroke={acc} strokeWidth="2" strokeDasharray="8 4"/>
        <circle cx="44" cy="44" r="18" fill={acc} fillOpacity=".1"/>
        {[0,60,120,180,240,300].map(a=><line key={a} x1={44+Math.cos(a*Math.PI/180)*18} y1={44+Math.sin(a*Math.PI/180)*18} x2={44+Math.cos(a*Math.PI/180)*30} y2={44+Math.sin(a*Math.PI/180)*30} stroke={acc} strokeWidth="2.5" strokeLinecap="round"/>)}
        <circle cx="44" cy="44" r="6" fill={acc} fillOpacity=".4"/>
        <circle cx="108" cy="44" r="20" fill="none" stroke={INK_L} strokeWidth="1.5" strokeDasharray="5 3"/>
        {[0,90,180,270].map(a=><line key={a} x1={108+Math.cos(a*Math.PI/180)*12} y1={44+Math.sin(a*Math.PI/180)*12} x2={108+Math.cos(a*Math.PI/180)*20} y2={44+Math.sin(a*Math.PI/180)*20} stroke={INK_L} strokeWidth="2" strokeLinecap="round"/>)}
        <rect x="4" y="78" width="150" height="14" rx="4" fill="#e5e7eb" stroke={INK_L} strokeWidth="1"/>
        <line x1="4" y1="85" x2="154" y2="85" stroke={INK_L} strokeWidth="1" strokeDasharray="5 4" className="cd-dash"/>
        <circle cx="12"  cy="85" r="6" fill={INK_L}/>
        <circle cx="146" cy="85" r="6" fill={INK_L}/>
      </g>
    );
    case 2: return ( /* QC: microscope + rings */
      <g>
        <rect x="30" y="54" width="24" height="4" rx="2" fill={INK} fillOpacity=".5"/>
        <rect x="38" y="12" width="4" height="42" fill={INK} fillOpacity=".5"/>
        <rect x="33" y="12" width="14" height="4" rx="1" fill={INK} fillOpacity=".5"/>
        <rect x="37" y="4" width="10" height="12" rx="2" fill="#fff" stroke={INK_L} strokeWidth="1.5"/>
        <circle cx="116" cy="40" r="36" fill="none" stroke={acc} strokeWidth="1.5" strokeDasharray="6 3"/>
        <circle cx="116" cy="40" r="22" fill="none" stroke={acc} strokeWidth="1" strokeDasharray="3 4" opacity=".5"/>
        <circle cx="116" cy="40" r="8"  fill={acc} fillOpacity=".2"/>
        <circle cx="116" cy="40" r="3"  fill={acc} className="cd-pulse"/>
        <line x1="80"  y1="40" x2="152" y2="40" stroke={acc} strokeWidth="1.2" strokeOpacity=".35"/>
        <line x1="116" y1="4"  x2="116" y2="76" stroke={acc} strokeWidth="1.2" strokeOpacity=".35"/>
      </g>
    );
    case 3: return ( /* R&D: flask + molecule */
      <g>
        <path d="M60,10 L60,56 L28,96 L100,96 L68,56 L68,10 Z" fill="none" stroke={INK} strokeWidth="1.5" strokeOpacity=".5"/>
        <path d="M38,78 L90,78 L84,96 L28,96 Z" fill={acc} fillOpacity=".3"/>
        {[[50,70],[64,60],[74,75]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill={acc} fillOpacity=".7" className="cd-pulse" style={{animationDelay:`${i*.3}s`}}/>)}
        <circle cx="134" cy="28" r="10" fill={acc} fillOpacity=".15" stroke={acc} strokeWidth="1.5"/>
        <circle cx="150" cy="50" r="7"  fill="none" stroke={INK_L} strokeWidth="1.5"/>
        <circle cx="120" cy="52" r="7"  fill="none" stroke={INK_L} strokeWidth="1.5"/>
        <circle cx="142" cy="68" r="6"  fill={acc} fillOpacity=".15" stroke={acc} strokeWidth="1.2"/>
        <line x1="134" y1="38" x2="150" y2="50" stroke={INK_L} strokeWidth="1"/>
        <line x1="134" y1="38" x2="120" y2="52" stroke={INK_L} strokeWidth="1"/>
        <line x1="134" y1="38" x2="142" y2="68" stroke={INK_L} strokeWidth="1"/>
        <circle cx="134" cy="28" r="3" fill={acc} className="cd-pulse"/>
      </g>
    );
    case 4: return ( /* Sales: globe + arrows */
      <g>
        <circle cx="80" cy="50" r="46" fill="none" stroke={acc} strokeWidth="1.5"/>
        <ellipse cx="80" cy="50" rx="22" ry="46" fill="none" stroke={acc} strokeWidth="1" strokeOpacity=".4"/>
        <line x1="34" y1="50" x2="126" y2="50" stroke={acc} strokeWidth="1" strokeOpacity=".4"/>
        <line x1="80" y1="4"  x2="80"  y2="96" stroke={acc} strokeWidth="1" strokeOpacity=".4"/>
        <ellipse cx="80" cy="50" rx="46" ry="18" fill="none" stroke={acc} strokeWidth="1" strokeOpacity=".3"/>
        {[[50,28],[110,36],[90,72],[56,66]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" fill={acc} className="cd-blink" style={{animationDelay:`${i*.3}s`}}/>)}
        <circle cx="80" cy="50" r="6" fill={acc} fillOpacity=".25"/>
      </g>
    );
    case 5: return ( /* Logistics: ship outline + route */
      <g>
        <path d="M10,70 Q40,40 80,38 Q120,36 150,60 L155,78 Q155,84 148,84 L12,84 Q5,84 5,78 Z" fill="none" stroke={acc} strokeWidth="2"/>
        <path d="M30,38 L50,16 L100,16 L120,38" fill="none" stroke={acc} strokeWidth="1.5"/>
        <line x1="60" y1="16" x2="60" y2="40" stroke={acc} strokeWidth="1"/>
        <line x1="90" y1="16" x2="90" y2="40" stroke={acc} strokeWidth="1"/>
        <path d="M20,84 Q80,96 155,84" fill="none" stroke={acc} strokeWidth="1" strokeDasharray="5 3" className="cd-dash"/>
        <circle cx="155" cy="84" r="5" fill={acc} fillOpacity=".4" className="cd-pulse"/>
        <text x="80" y="108" textAnchor="middle" fontSize="8" fontFamily="monospace" fill={INK_L}>GLOBAL ROUTE</text>
      </g>
    );
    case 6: return ( /* Corporate: building + graph */
      <g>
        <rect x="30" y="20" width="70" height="80" rx="3" fill="none" stroke={acc} strokeWidth="1.5"/>
        {[0,1,2].map(row=>[0,1].map(col=><rect key={`${row}${col}`} x={38+col*28} y={32+row*22} width="18" height="14" rx="2" fill={acc} fillOpacity=".18" stroke={acc} strokeWidth="1"/>))}
        <rect x="52" y="78" width="16" height="22" rx="1" fill={acc} fillOpacity=".4"/>
        {/* bar chart right */}
        <rect x="108" y="40"  width="10" height="60" rx="2" fill={acc} fillOpacity=".6"/>
        <rect x="122" y="55"  width="10" height="45" rx="2" fill={acc} fillOpacity=".4"/>
        <rect x="136" y="30"  width="10" height="70" rx="2" fill={acc} fillOpacity=".8"/>
        <rect x="150" y="50"  width="10" height="50" rx="2" fill={acc} fillOpacity=".5"/>
        <line x1="106" y1="100" x2="162" y2="100" stroke={INK_L} strokeWidth="1"/>
        <circle cx="156" cy="30" r="4" fill="#22c55e" className="cd-blink"/>
      </g>
    );
    default: return null;
  }
}

export default function CareerDeptExplorer() {
  const [active, setActive] = useState<number|null>(null);
  const [hov,    setHov]    = useState<number|null>(null);

  const toggle = (id:number) => setActive(p => p===id ? null : id);
  const aD = active !== null ? DEPTS[active-1] : null;

  return (
    <div style={{ width:'100%' }}>
      <style>{CSS}</style>

      {/* ── DESKTOP ──────────────────────── */}
      <div className="cd-desk" style={{ background:'#F8F6F1', border:'1.5px solid #D6CFC8', borderRadius:20, overflow:'hidden' }}>

        <div style={{ padding:'13px 24px', borderBottom:'1.5px solid #D6CFC8', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:CR }} className="cd-pulse"/>
            <span style={{ fontFamily:'monospace', fontSize:10, letterSpacing:'.16em', textTransform:'uppercase', color:INK_L }}>
              Departments — Click to Explore
            </span>
          </div>
          <span style={{ fontFamily:'monospace', fontSize:9, color:INK_L }}>
            {active!==null ? `${aD?.headcount} in ${aD?.name}` : '6 Departments · 500+ Professionals'}
          </span>
        </div>

        <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
          <div style={{ minWidth:560, padding:'16px 16px 0' }}>
            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ width:'100%', height:'auto', display:'block' }}>
              <defs>
                <pattern id="cdGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke={INK_LL} strokeWidth=".5"/>
                </pattern>
              </defs>
              <rect width={SVG_W} height={SVG_H} fill="url(#cdGrid)"/>

              {/* connections */}
              {CONNECT.map((c,i)=>(
                <g key={i}>
                  <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="rgba(0,0,0,0.03)" strokeWidth="10" strokeLinecap="round"/>
                  <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke={CR} strokeWidth="2" strokeLinecap="round" className="cd-dash"/>
                </g>
              ))}

              {/* departments */}
              {POS.map(p => {
                const dept = DEPTS[p.id-1];
                const isAct = active===p.id, isHov = hov===p.id;
                const dim   = active!==null && !isAct;
                return (
                  <g key={p.id} className="cd-dept"
                    style={{ opacity: dim ? 0.22 : 1, transition:'opacity .25s' }}
                    onClick={()=>toggle(p.id)}
                    onMouseEnter={()=>setHov(p.id)}
                    onMouseLeave={()=>setHov(null)}
                  >
                    <rect x={p.x+2} y={p.y+3} width={p.w} height={p.h} rx="8" fill="rgba(0,0,0,0.04)"/>
                    <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="8"
                      fill={isAct ? '#fff' : 'rgba(255,255,255,0.84)'}
                      stroke={isAct ? dept.accent : isHov ? dept.accent : '#D6CFC8'}
                      strokeWidth={isAct ? 2.5 : 1.5}/>
                    {/* label strip */}
                    <rect x={p.x} y={p.y} width={p.w} height={LABEL_H} rx="8" fill={isAct ? dept.accent : 'rgba(0,0,0,0.04)'}/>
                    <rect x={p.x} y={p.y+LABEL_H-4} width={p.w} height={4} fill={isAct ? dept.accent : 'rgba(0,0,0,0.04)'}/>
                    <text x={p.x+10} y={p.y+16} fontFamily="'Courier New',monospace" fontSize="9" fontWeight="700"
                      fill={isAct ? '#fff' : INK_L} letterSpacing=".1em">{dept.code}</text>
                    {isAct && <circle cx={p.x+p.w-12} cy={p.y+12} r="4" fill="#fff" fillOpacity=".65" className="cd-blink"/>}

                    {/* illustration */}
                    <svg x={p.x+1} y={p.y+LABEL_H} width={p.w-2} height={p.h-LABEL_H-44} overflow="hidden"
                      viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" opacity={isAct ? 1 : 0.72}>
                      <DeptIllus id={p.id} acc={dept.accent}/>
                    </svg>

                    {/* icon + name */}
                    <text x={p.x+p.w/2} y={p.y+p.h-28} textAnchor="middle" fontFamily="Georgia,serif"
                      fontSize="11" fontWeight="700" fill={isAct ? dept.accent : INK}>{dept.name}</text>
                    <text x={p.x+p.w/2} y={p.y+p.h-14} textAnchor="middle" fontFamily="'Courier New',monospace"
                      fontSize="8" fontWeight="700" fill={dept.accent}>{dept.headcount}</text>

                    {/* number badge */}
                    <circle cx={p.x} cy={p.y} r="13" fill={CR}/>
                    <text x={p.x} y={p.y+4} textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fontWeight="700" fill="#fff">{p.id}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* detail panel */}
        <div style={{ minHeight:140, borderTop:'1.5px solid #D6CFC8', background:'#fff', padding:'24px 28px', display:'flex', alignItems:'flex-start' }}>
          {aD===null ? (
            <div style={{ fontFamily:'Georgia,serif', fontSize:15, color:INK_L, fontStyle:'italic', margin:'0 auto', alignSelf:'center' }}>
              Click any department to see open roles and culture.
            </div>
          ) : (
            <div key={active} className="cd-slide" style={{ display:'flex', gap:28, width:'100%', flexWrap:'wrap' }}>
              <div style={{ minWidth:180, borderRight:'1px solid rgba(0,0,0,0.07)', paddingRight:24 }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{aD.icon}</div>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:9, color:aD.accent, letterSpacing:'.14em', fontWeight:700, marginBottom:4 }}>{aD.code}</div>
                <div style={{ fontFamily:'Georgia,serif', fontSize:16, fontWeight:700, color:INK, marginBottom:4, lineHeight:1.2 }}>{aD.name}</div>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:11, color:aD.accent, fontWeight:700 }}>{aD.headcount}</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:14 }}>
                  {aD.perks.map(p=>(
                    <span key={p} style={{ fontFamily:'system-ui', fontSize:11, background:`${aD.accent}15`, color:aD.accent, border:`1px solid ${aD.accent}30`, borderRadius:999, padding:'3px 10px' }}>{p}</span>
                  ))}
                </div>
              </div>
              <div style={{ flex:1, minWidth:180 }}>
                <p style={{ fontFamily:'system-ui', fontSize:13, color:'rgba(0,0,0,0.6)', lineHeight:1.75, margin:'0 0 14px' }}>{aD.desc}</p>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:9, color:aD.accent, letterSpacing:'.1em', marginBottom:8, fontWeight:700 }}>OPEN ROLES</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {aD.roles.map(r=>(
                    <span key={r} style={{ fontFamily:'system-ui', fontSize:12, background:'rgba(0,0,0,0.04)', color:INK, border:'1px solid rgba(0,0,0,0.08)', borderRadius:8, padding:'5px 12px' }}>{r}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE CARDS ─────────────────── */}
      <div className="cd-mob" style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {DEPTS.map(d=>(
          <div key={d.id} onClick={()=>toggle(d.id)}
            style={{ background:'#fff', border:`1.5px solid ${active===d.id ? d.accent : '#D6CFC8'}`, borderRadius:14, padding:'16px 18px', cursor:'pointer', transition:'all .2s' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontSize:22 }}>{d.icon}</span>
                <div style={{ fontFamily:'monospace', fontSize:9, letterSpacing:'.12em', color:d.accent, fontWeight:700 }}>{d.code}</div>
              </div>
              <div style={{ fontFamily:'monospace', fontSize:10, color:d.accent, fontWeight:700 }}>{d.headcount}</div>
            </div>
            <div style={{ fontFamily:'Georgia,serif', fontSize:15, fontWeight:700, color:INK, marginBottom: active===d.id ? 10 : 0 }}>{d.name}</div>
            {active===d.id && (
              <>
                <p style={{ fontFamily:'system-ui', fontSize:13, color:'rgba(0,0,0,0.6)', lineHeight:1.7, margin:'0 0 10px' }}>{d.desc}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                  {d.roles.map(r=><span key={r} style={{ fontFamily:'system-ui', fontSize:11, background:'rgba(0,0,0,0.04)', color:INK, border:'1px solid rgba(0,0,0,0.08)', borderRadius:8, padding:'4px 10px' }}>{r}</span>)}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
