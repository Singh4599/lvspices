'use client';

import { useState } from 'react';

const CR = '#AC033B';

const CSS = `
  @keyframes ob-draw { from { stroke-dashoffset: 800; opacity: 0 } to { stroke-dashoffset: 0; opacity: 1 } }
  @keyframes ob-fade { from { opacity: 0 } to { opacity: 1 } }
  @keyframes ob-panel { from { opacity: 0; transform: translateX(20px) } to { opacity: 1; transform: translateX(0) } }
  @keyframes ob-ping { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.5);opacity:0} }
  .ob-wall { animation: ob-draw 1.5s ease forwards; stroke-dasharray: 800; }
  .ob-room { animation: ob-fade 0.5s ease forwards; opacity: 0; }
  .ob-panel { animation: ob-panel 0.3s ease forwards; }
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
  accent: string;
}

const ROOMS: Room[] = [
  {
    id: 'reception', label: 'Reception & Lobby', shortLabel: 'Reception', icon: '🪑',
    x: 30, y: 30, w: 200, h: 110,
    info: { heading: 'Reception', detail: 'Mon–Sat: 9am–6pm IST\nSunday: Closed\nVisitors welcome by appointment.', contact: '+91 98765 43210' },
    accent: '#1a4d8c',
  },
  {
    id: 'export', label: 'Export Sales Office', shortLabel: 'Export Sales', icon: '🌍',
    x: 260, y: 30, w: 220, h: 110,
    info: { heading: 'Export Sales', detail: 'International inquiries, quotations, and bulk order processing. Response within 24 hours.', contact: 'export@lvspices.com' },
    accent: CR,
  },
  {
    id: 'rd', label: 'R&D Lab', shortLabel: 'R&D Lab', icon: '🔬',
    x: 510, y: 30, w: 160, h: 110,
    info: { heading: 'R&D Laboratory', detail: 'Custom blend development, sample creation & quality testing. Minimum 5 kg sample MOQ.' },
    accent: '#1a6b3c',
  },
  {
    id: 'dispatch', label: 'Dispatch & Logistics', shortLabel: 'Dispatch', icon: '📦',
    x: 30, y: 175, w: 200, h: 110,
    info: { heading: 'Dispatch', detail: 'Container loading, documentation, phytosanitary, and freight coordination. FCL & LCL.' },
    accent: '#7d4b00',
  },
  {
    id: 'qa', label: 'Quality Control', shortLabel: 'QA / QC', icon: '🏆',
    x: 260, y: 175, w: 150, h: 110,
    info: { heading: 'Quality Control', detail: 'NABL-accredited in-house lab. HACCP / FSSC 22000 compliant testing for every batch.' },
    accent: '#5c1a6b',
  },
  {
    id: 'accounts', label: 'Accounts', shortLabel: 'Accounts', icon: '💼',
    x: 440, y: 175, w: 110, h: 110,
    info: { heading: 'Accounts', detail: 'Billing, payment terms, TT, LC, and financial documentation for export orders.' },
    accent: '#003d4d',
  },
  {
    id: 'it', label: 'IT & Digital', shortLabel: 'IT', icon: '💻',
    x: 580, y: 175, w: 90, h: 110,
    info: { heading: 'IT & Digital', detail: 'ERP, website, and digital brand support for private label partners.' },
    accent: '#2d1f6e',
  },
];

export default function OfficeBlueprintSVG() {
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [revealed, setRevealed] = useState(false);

  const svgW = 700, svgH = 340;

  return (
    <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,56px)', background: '#0d1420', position: 'relative', overflow: 'hidden' }}>
      <style>{CSS}</style>

      {/* BG blueprint grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(26,77,140,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(26,77,140,0.12) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(26,77,140,0.06), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,4vw,48px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#4a9eff', marginBottom: 12 }}>
            Office Blueprint
          </div>
          <h2 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(26px,4vw,48px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
            Find the Right <em style={{ color: '#4a9eff', fontStyle: 'italic' }}>Department</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.35)', maxWidth: 400, margin: '0 auto' }}>
            Click a room on our office floor plan to find who handles your query.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* SVG Blueprint */}
          <div style={{ flex: 2, minWidth: 280, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(26,77,140,0.3)', background: 'rgba(13,20,32,0.8)', position: 'relative' }}>
            <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" style={{ display: 'block' }}
              onMouseEnter={() => setRevealed(true)}
            >
              {/* Blueprint border */}
              <rect x={10} y={10} width={svgW - 20} height={svgH - 20} fill="none" stroke="rgba(74,158,255,0.2)" strokeWidth={0.5} />

              {/* Title block (bottom right) */}
              <rect x={svgW - 150} y={svgH - 50} width={140} height={40} fill="none" stroke="rgba(74,158,255,0.2)" strokeWidth={0.5} />
              <text x={svgW - 80} y={svgH - 32} textAnchor="middle" fontFamily="monospace" fontSize={8} fill="rgba(74,158,255,0.5)" letterSpacing={2}>LV SPICES</text>
              <text x={svgW - 80} y={svgH - 20} textAnchor="middle" fontFamily="monospace" fontSize={6} fill="rgba(74,158,255,0.3)" letterSpacing={1}>MUMBAI OFFICE PLAN</text>

              {/* Outer walls */}
              <rect x={20} y={20} width={svgW - 40} height={svgH - 60}
                fill="none" stroke="rgba(74,158,255,0.6)" strokeWidth={1.5}
                className="ob-wall"
                style={{ animationDelay: '0.1s' }}
              />

              {/* Corridor lines */}
              <line x1={20} y1={160} x2={svgW - 40} y2={160} stroke="rgba(74,158,255,0.2)" strokeWidth={0.5} strokeDasharray="4 4" />
              <line x1={250} y1={20} x2={250} y2={svgH - 60} stroke="rgba(74,158,255,0.2)" strokeWidth={0.5} strokeDasharray="4 4" />
              <line x1={500} y1={20} x2={500} y2={160} stroke="rgba(74,158,255,0.2)" strokeWidth={0.5} strokeDasharray="4 4" />

              {/* Room rectangles */}
              {ROOMS.map((room, i) => {
                const isActive = activeRoom?.id === room.id;
                return (
                  <g key={room.id} className="ob-room" style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                    onClick={() => setActiveRoom(p => p?.id === room.id ? null : room)}
                  >
                    <rect
                      x={room.x} y={room.y} width={room.w} height={room.h}
                      fill={isActive ? `${room.accent}25` : `${room.accent}08`}
                      stroke={isActive ? room.accent : `${room.accent}40`}
                      strokeWidth={isActive ? 1.5 : 0.75}
                      rx={2}
                      style={{ transition: 'all 0.25s' }}
                    />
                    {/* Room label */}
                    <text
                      x={room.x + room.w / 2} y={room.y + room.h / 2 - 8}
                      textAnchor="middle" fontFamily="monospace" fontSize={8}
                      fill={isActive ? room.accent : 'rgba(74,158,255,0.6)'}
                      fontWeight={isActive ? '700' : '400'}
                      letterSpacing={1}
                      style={{ transition: 'fill 0.2s', pointerEvents: 'none' }}
                    >
                      {room.shortLabel.toUpperCase()}
                    </text>
                    {/* Icon */}
                    <text x={room.x + room.w / 2} y={room.y + room.h / 2 + 10} textAnchor="middle" fontSize={16} style={{ pointerEvents: 'none' }}>
                      {room.icon}
                    </text>
                    {/* Active ping */}
                    {isActive && (
                      <>
                        <circle cx={room.x + room.w - 8} cy={room.y + 8} r={4} fill={room.accent} />
                        <circle cx={room.x + room.w - 8} cy={room.y + 8} r={4} fill={room.accent} className="ob-ping" />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Hover hint */}
            {!revealed && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(13,20,32,0.6)', backdropFilter: 'blur(4px)', borderRadius: 16, pointerEvents: 'none' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🏢</div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Hover to Reveal Blueprint</p>
                </div>
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div style={{ flex: 1, minWidth: 220 }}>
            {activeRoom ? (
              <div key={activeRoom.id} className="ob-panel" style={{
                background: `${activeRoom.accent}0f`,
                border: `1px solid ${activeRoom.accent}30`,
                borderRadius: 16, padding: 'clamp(20px,3vw,28px)',
              }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{activeRoom.icon}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: activeRoom.accent, marginBottom: 8 }}>
                  Department
                </div>
                <h3 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 800, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.01em' }}>
                  {activeRoom.info.heading}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: '0 0 20px', whiteSpace: 'pre-line' }}>
                  {activeRoom.info.detail}
                </p>
                {activeRoom.info.contact && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 16px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Contact:</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: activeRoom.accent }}>{activeRoom.info.contact}</span>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: 'clamp(20px,3vw,28px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 36 }}>🗺️</div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
                  Click a room on the blueprint to see department details
                </p>
                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                  {ROOMS.map(r => (
                    <button key={r.id} onClick={() => setActiveRoom(r)} style={{
                      fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '5px 10px', borderRadius: 999, cursor: 'pointer', transition: 'all 0.18s',
                      background: `${r.accent}20`, border: `1px solid ${r.accent}40`, color: r.accent,
                    }}>
                      {r.icon} {r.shortLabel}
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
