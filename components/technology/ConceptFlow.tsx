'use client';

import { useState, useEffect } from 'react';

const CONCEPT_NODES = [
  { n: 1, label: 'Drying', sub: ['Sun Drying', 'Industrial Drying'], color: '#1A6B3E' },
  { n: 2, label: 'Process', sub: ['Examination', 'Breaking Machine', 'Sifting', 'Delta Cleaner', 'Cylinder Separator', 'Gravity Table', 'Metal Detector', 'Sortex'], color: '#1A6B3E' },
  { n: 3, label: 'Quality Control', sub: ['Our In-House Lab', 'Ministry of Agriculture Research', 'Euro Fins Germany'], color: '#1A6B3E' },
  { n: 4, label: 'Packing', sub: [], color: '#8FA87E' },
  { n: 5, label: 'Storing', sub: [], color: '#A8BF9A' },
  { n: 6, label: 'Fumigation', sub: [], color: '#8FA87E' },
  { n: 7, label: 'Folding Shipping', sub: [], color: '#1A6B3E' },
];

const CSS = `
  @keyframes cf-flowMove {
    from { stroke-dashoffset: 24; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes cf-pulseGlow {
    0%, 100% { opacity: 0.4; filter: blur(4px); transform: scale(1); }
    50% { opacity: 0.8; filter: blur(8px); transform: scale(1.1); }
  }
  @keyframes cf-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .cf-pipe-anim {
    animation: cf-flowMove 1s linear infinite;
  }
  .cf-glow {
    animation: cf-pulseGlow 2s ease-in-out infinite;
  }
  
  .cf-node {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
    position: relative;
    z-index: 2;
  }
  .cf-node:hover {
    transform: scale(1.05);
  }
  .cf-node.active {
    transform: scale(1.1);
  }
`;

export default function ConceptFlow() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{ position: 'relative', padding: '60px 0', width: '100%', maxWidth: 1000, margin: '0 auto', background: '#111' }}>
      <style>{CSS}</style>

      {/* SVG Pipeline */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center' }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0 }}>
          <defs>
            <linearGradient id="cf-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0"/>
              <stop offset="20%" stopColor="#D4AF37" stopOpacity="0.8"/>
              <stop offset="80%" stopColor="#D4AF37" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeLinecap="round" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="url(#cf-grad)" strokeWidth="2" strokeDasharray="12 12" className="cf-pipe-anim" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 60, position: 'relative', zIndex: 1, padding: '0 20px' }}>
        {CONCEPT_NODES.map((node, i) => {
          const isActive = active === i;
          const isLeft = i % 2 === 0;

          return (
            <div 
              key={node.n} 
              className={`cf-node ${isActive ? 'active' : ''}`}
              onClick={() => setActive(isActive ? null : i)}
              style={{
                display: 'flex', 
                flexDirection: isLeft ? 'row' : 'row-reverse',
                alignItems: 'center', 
                gap: 'clamp(20px, 4vw, 40px)',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              {/* Content Panel */}
              <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: isLeft ? 'flex-end' : 'flex-start',
                textAlign: isLeft ? 'right' : 'left'
              }}>
                <div style={{
                  background: isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? '#D4AF37' : 'rgba(255,255,255,0.1)'}`,
                  padding: '24px 32px',
                  borderRadius: 24,
                  width: '100%', maxWidth: 360,
                  boxShadow: isActive ? '0 12px 32px rgba(0,0,0,0.5)' : 'none',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {isActive && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: '#D4AF37' }}/>}
                  
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#D4AF37', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>
                    Stage 0{node.n}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
                    {node.label}
                  </h3>
                  
                  <div style={{ height: isActive && node.sub.length > 0 ? 'auto' : 0, overflow: 'hidden', opacity: isActive ? 1 : 0, transition: 'opacity 0.3s', marginTop: isActive && node.sub.length > 0 ? 16 : 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {node.sub.map((s, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
                          {isLeft && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{s}</span>}
                          <div style={{ width: 16, height: 1, background: 'rgba(255,255,255,0.2)' }}/>
                          {!isLeft && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{s}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Orb */}
              <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div className="cf-glow" style={{ position: 'absolute', inset: -10, background: node.color, borderRadius: '50%' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: '#111', border: `2px solid ${isActive ? '#D4AF37' : 'rgba(255,255,255,0.2)'}`,
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5)'
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 800, color: isActive ? '#D4AF37' : '#fff' }}>
                    {node.n}
                  </span>
                </div>
              </div>

              {/* Empty Space for alignment */}
              <div style={{ flex: 1 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
