'use client';

import { useState } from 'react';

const RED = '#AC033B';
const INK = '#1A1915';
const INK_L = '#4A4A4A';

const CSS = `
  @keyframes ob-draw { from { stroke-dashoffset: 800; opacity: 0 } to { stroke-dashoffset: 0; opacity: 1 } }
  @keyframes ob-fade { from { opacity: 0 } to { opacity: 1 } }
  @keyframes ob-panel { from { opacity: 0; transform: translateX(20px) } to { opacity: 1; transform: translateX(0) } }
  @keyframes ob-ping { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.5);opacity:0} }
  .ob-wall { animation: ob-draw 1.5s ease forwards; stroke-dasharray: 800; }
  .ob-room { animation: ob-fade 0.5s ease forwards; opacity: 0; }
  .ob-panel { animation: ob-panel 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }
  .ob-ping { animation: ob-ping 1.5s ease-out infinite; }
  .ob-room:hover { cursor: pointer; }
`;

interface Room {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  x: number; y: number; w: number; h: number;
  info: { heading: string; detail: string; contact?: string };
}

const ROOMS: Room[] = [
  {
    id: 'reception', label: 'Reception & Lobby', shortLabel: 'Reception', icon: '🪑',
    x: 30, y: 30, w: 200, h: 110,
    info: { heading: 'Reception', detail: 'Mon–Sat: 9am–6pm IST\nSunday: Closed\nVisitors welcome by appointment.', contact: '+91 98765 43210' },
  },
  {
    id: 'export', label: 'Export Sales Office', shortLabel: 'Export Sales', icon: '🌍',
    x: 260, y: 30, w: 220, h: 110,
    info: { heading: 'Export Sales', detail: 'International inquiries, quotations, and bulk order processing. Response within 24 hours.', contact: 'export@lvspices.com' },
  },
  {
    id: 'rd', label: 'R&D Lab', shortLabel: 'R&D Lab', icon: '🔬',
    x: 510, y: 30, w: 160, h: 110,
    info: { heading: 'R&D Laboratory', detail: 'Custom blend development, sample creation & quality testing. Minimum 5 kg sample MOQ.' },
  },
  {
    id: 'dispatch', label: 'Dispatch & Logistics', shortLabel: 'Dispatch', icon: '📦',
    x: 30, y: 175, w: 200, h: 110,
    info: { heading: 'Dispatch', detail: 'Container loading, documentation, phytosanitary, and freight coordination. FCL & LCL.' },
  },
  {
    id: 'qa', label: 'Quality Control', shortLabel: 'QA / QC', icon: '🏆',
    x: 260, y: 175, w: 150, h: 110,
    info: { heading: 'Quality Control', detail: 'NABL-accredited in-house lab. HACCP / FSSC 22000 compliant testing for every batch.' },
  },
  {
    id: 'accounts', label: 'Accounts', shortLabel: 'Accounts', icon: '💼',
    x: 440, y: 175, w: 110, h: 110,
    info: { heading: 'Accounts', detail: 'Billing, payment terms, TT, LC, and financial documentation for export orders.' },
  },
  {
    id: 'it', label: 'IT & Digital', shortLabel: 'IT', icon: '💻',
    x: 580, y: 175, w: 90, h: 110,
    info: { heading: 'IT & Digital', detail: 'ERP, website, and digital brand support for private label partners.' },
  },
];

export default function OfficeBlueprintSVG() {
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [revealed, setRevealed] = useState(false);

  const svgW = 700, svgH = 340;

  return (
    <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,56px)', background: '#FAF9F6', position: 'relative', overflow: 'hidden' }}>
      <style>{CSS}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,4vw,48px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: RED, marginBottom: 12, fontWeight: 700 }}>
            Office Blueprint
          </div>
          <h2 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(26px,4vw,48px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 12px' }}>
            Find the Right <em style={{ color: RED, fontStyle: 'italic' }}>Department</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(0,0,0,0.5)', maxWidth: 400, margin: '0 auto' }}>
            Click a room on our office floor plan to find who handles your query.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* SVG Blueprint */}
          <div style={{ 
            flex: 2, minWidth: 280, borderRadius: 8, overflow: 'hidden', 
            border: '1px solid rgba(0,0,0,0.1)', background: '#F0EEE5', position: 'relative' 
          }}>
            
            {/* Background architectural grid */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              pointerEvents: 'none',
            }} />

            <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" style={{ display: 'block', position: 'relative', zIndex: 1 }}
              onMouseEnter={() => setRevealed(true)}
            >
              <defs>
                <filter id="ob-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={RED} floodOpacity="0.3"/>
                </filter>
              </defs>

              {/* Blueprint border */}
              <rect x={10} y={10} width={svgW - 20} height={svgH - 20} fill="none" stroke={INK_L} strokeWidth={1} strokeDasharray="4 4"/>

              {/* Title block (bottom right) */}
              <rect x={svgW - 150} y={svgH - 50} width={140} height={40} fill="#fff" stroke={INK} strokeWidth={1.5} />
              <text x={svgW - 80} y={svgH - 32} textAnchor="middle" fontFamily="monospace" fontSize={8} fill={INK} letterSpacing={2} fontWeight={700}>LV SPICES</text>
              <text x={svgW - 80} y={svgH - 20} textAnchor="middle" fontFamily="monospace" fontSize={6} fill={INK_L} letterSpacing={1}>MUMBAI OFFICE PLAN</text>

              {/* Outer walls */}
              <rect x={20} y={20} width={svgW - 40} height={svgH - 60}
                fill="none" stroke={INK} strokeWidth={2.5}
                className="ob-wall"
                style={{ animationDelay: '0.1s' }}
              />

              {/* Corridor lines */}
              <line x1={20} y1={160} x2={svgW - 40} y2={160} stroke={INK_L} strokeWidth={1} strokeDasharray="6 6" />
              <line x1={250} y1={20} x2={250} y2={svgH - 60} stroke={INK_L} strokeWidth={1} strokeDasharray="6 6" />
              <line x1={500} y1={20} x2={500} y2={160} stroke={INK_L} strokeWidth={1} strokeDasharray="6 6" />

              {/* Room rectangles */}
              {ROOMS.map((room, i) => {
                const isActive = activeRoom?.id === room.id;
                return (
                  <g key={room.id} className="ob-room" style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                    onClick={() => setActiveRoom(p => p?.id === room.id ? null : room)}
                  >
                    <rect
                      x={room.x} y={room.y} width={room.w} height={room.h}
                      fill={isActive ? 'rgba(172,3,59,0.06)' : '#fff'}
                      stroke={isActive ? RED : INK}
                      strokeWidth={isActive ? 2 : 1}
                      filter={isActive ? 'url(#ob-glow)' : 'none'}
                      style={{ transition: 'all 0.25s' }}
                    />
                    {/* Room label */}
                    <text
                      x={room.x + room.w / 2} y={room.y + room.h / 2 - 8}
                      textAnchor="middle" fontFamily="monospace" fontSize={9}
                      fill={isActive ? RED : INK_L}
                      fontWeight={isActive ? '800' : '600'}
                      letterSpacing={1}
                      style={{ transition: 'fill 0.2s', pointerEvents: 'none' }}
                    >
                      {room.shortLabel.toUpperCase()}
                    </text>
                    {/* Icon */}
                    <text x={room.x + room.w / 2} y={room.y + room.h / 2 + 12} textAnchor="middle" fontSize={16} style={{ pointerEvents: 'none' }}>
                      {room.icon}
                    </text>
                    {/* Active ping */}
                    {isActive && (
                      <>
                        <circle cx={room.x + room.w - 12} cy={room.y + 12} r={4} fill={RED} />
                        <circle cx={room.x + room.w - 12} cy={room.y + 12} r={4} fill={RED} className="ob-ping" />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Hover hint */}
            {!revealed && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', pointerEvents: 'none' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🏢</div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: INK, fontWeight: 700 }}>Hover to Reveal Blueprint</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Panel - Styled exactly like the mechanical blueprint modal */}
          <div style={{ flex: 1, minWidth: 260 }}>
            {activeRoom ? (
              <div key={activeRoom.id} className="ob-panel" style={{
                background: '#fff',
                border: `2px solid ${INK}`,
                boxShadow: `6px 6px 0px ${RED}`,
                padding: 'clamp(24px,3vw,32px)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                  <div style={{
                    flexShrink: 0, width: 50, height: 50,
                    background: '#fff', border: `1.5px solid ${INK}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, boxShadow: `3px 3px 0px ${RED}`
                  }}>
                    {activeRoom.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: RED, marginBottom: 4, fontWeight: 700 }}>
                      Department
                    </div>
                    <div style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(18px,2vw,22px)', fontWeight: 800, color: INK, lineHeight: 1.1 }}>
                      {activeRoom.info.heading}
                    </div>
                  </div>
                </div>

                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(0,0,0,0.65)', lineHeight: 1.7, margin: '0 0 20px', whiteSpace: 'pre-line' }}>
                  {activeRoom.info.detail}
                </p>

                {activeRoom.info.contact && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f5f5f5', border: `1px solid ${INK_L}`, padding: '12px 16px', boxShadow: `2px 2px 0px ${INK_L}` }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: INK_L, fontWeight: 700 }}>Contact:</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: RED }}>{activeRoom.info.contact}</span>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ background: '#fff', border: `2px solid ${INK_L}`, borderStyle: 'dashed', padding: 'clamp(24px,3vw,32px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 36, opacity: 0.5 }}>🗺️</div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(0,0,0,0.5)', margin: 0, fontWeight: 500 }}>
                  Click a room on the blueprint to see department details
                </p>
                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                  {ROOMS.map(r => (
                    <button key={r.id} onClick={() => setActiveRoom(r)} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700,
                      padding: '6px 12px', cursor: 'pointer', transition: 'all 0.18s',
                      background: '#fff', border: `1.5px solid ${INK}`, color: INK, boxShadow: `2px 2px 0px ${INK_L}`
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = RED; e.currentTarget.style.color = RED; e.currentTarget.style.boxShadow = `2px 2px 0px ${RED}`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = INK; e.currentTarget.style.color = INK; e.currentTarget.style.boxShadow = `2px 2px 0px ${INK_L}`; }}
                    >
                      {r.shortLabel}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
