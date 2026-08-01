'use client';

import { useState, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   Premium Vintage Rotary Phone — hand-drawn editorial illustration
   ═══════════════════════════════════════════════════════════════════ */

export default function Phone3D({ children }: { children?: React.ReactNode }) {
  const [dialCount, setDialCount] = useState(0);
  const [showForm, setShowForm]   = useState(false);
  const [spinning, setSpinning]   = useState(false);
  const [hovered, setHovered]     = useState(false);
  const wheelRef = useRef<SVGGElement>(null);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)';
      wheelRef.current.style.transform  = 'rotate(-138deg)';
      setTimeout(() => {
        if (wheelRef.current) {
          wheelRef.current.style.transition = 'transform 0.9s cubic-bezier(0.36,0.07,0.19,0.97)';
          wheelRef.current.style.transform  = 'rotate(0deg)';
        }
        setTimeout(() => {
          setSpinning(false);
          const next = dialCount + 1;
          setDialCount(next);
          if (next >= 3) setTimeout(() => setShowForm(true), 350);
        }, 920);
      }, 620);
    }
  };

  const handleReset = () => { setShowForm(false); setDialCount(0); };

  // 10 holes in a ring, clockwise from top-leftish
  const R = 72;
  const holes = Array.from({ length: 10 }, (_, i) => ({
    d: ['0','1','2','3','4','5','6','7','8','9'][i],
    deg: -126 + i * 36, // -126 is roughly 10:30 o'clock
  }));

  const OUTLINE = '#2a3328';
  const FILL_MAIN = '#f4eedb';
  const FILL_SHADE = '#e6dbc3';
  const GRID_COLOR = 'rgba(160, 170, 160, 0.2)';

  return (
    <div style={{
      width: '100%',
      minHeight: showForm ? 'auto' : 620,
      borderRadius: 24,
      background: '#fdfbf7', // Paper background
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'min-height 0.5s cubic-bezier(0.16,1,0.3,1)',
    }}>

      {/* Grid Paper Background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(${GRID_COLOR} 1px, transparent 1px),
          linear-gradient(90deg, ${GRID_COLOR} 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        backgroundPosition: 'center',
      }}/>

      {/* ── FORM ── */}
      {showForm && (
        <div style={{ width: '100%', padding: '44px 36px', animation: 'phoneFormIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards', position: 'relative', zIndex: 10 }}>
          <style>{`
            @keyframes phoneFormIn{
              from{opacity:0;transform:translateY(20px) scale(0.97);filter:blur(4px)}
              to{opacity:1;transform:none;filter:none}
            }
          `}</style>
          {children}
          <button onClick={handleReset} style={{
            marginTop: 32, display: 'block', background: 'none', border: 'none',
            fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(100,70,30,0.45)', cursor: 'pointer',
            margin: '32px auto 0',
          }}>← Hang up</button>
        </div>
      )}

      {/* ── PHONE ── */}
      {!showForm && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '28px 20px 36px', position: 'relative', zIndex: 1 }}>

          {/* Label */}
          <p style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 14, fontWeight: 700,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(80,90,80,0.7)', margin: '0 0 -10px 0',
            zIndex: 2,
          }}>DIAL YOUR NUMBER</p>

          {/* SVG Phone */}
          <div
            style={{ cursor: spinning ? 'wait' : 'pointer', userSelect: 'none' }}
            onClick={handleSpin}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <svg width="340" height="420" viewBox="0 0 340 420" style={{
              overflow: 'visible',
              filter: hovered && !spinning
                ? 'drop-shadow(0 24px 32px rgba(0,0,0,0.12)) drop-shadow(0 8px 12px rgba(0,0,0,0.06))'
                : 'drop-shadow(0 12px 20px rgba(0,0,0,0.08)) drop-shadow(0 4px 6px rgba(0,0,0,0.04))',
              transition: 'filter 0.35s ease',
            }}>
              
              <defs>
                {/* Sketchy turbulence filter to make lines look hand-drawn */}
                <filter id="sketch">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                </filter>
                
                {/* Dial hatching */}
                <pattern id="hatch-dial" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(100,110,100,0.25)" strokeWidth="0.8"/>
                </pattern>
                
                {/* Base shading hatch */}
                <pattern id="hatch-shade" width="6" height="6" patternTransform="rotate(-45)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(0,0,0,0.2)" strokeWidth="0.6"/>
                </pattern>
              </defs>

              {/* ═══════════════════════════════════
                  CURLY CORD (Left side)
                  ═══════════════════════════════════ */}
              <g filter="url(#sketch)">
                {Array.from({ length: 9 }).map((_, i) => {
                  const y = 140 + i * 22;
                  const x = 50 + Math.sin(i * 0.8) * 8;
                  return (
                    <path key={i} d={`M ${x+20} ${y-10} C ${x-30} ${y-15}, ${x-30} ${y+15}, ${x+20} ${y+10}`} 
                          fill="none" stroke={OUTLINE} strokeWidth="4.5" strokeLinecap="round" />
                  );
                })}
                {Array.from({ length: 9 }).map((_, i) => {
                  const y = 140 + i * 22;
                  const x = 50 + Math.sin(i * 0.8) * 8;
                  return (
                    <path key={'inner'+i} d={`M ${x+20} ${y-10} C ${x-30} ${y-15}, ${x-30} ${y+15}, ${x+20} ${y+10}`} 
                          fill="none" stroke={FILL_MAIN} strokeWidth="2.5" strokeLinecap="round" />
                  );
                })}
              </g>

              {/* ═══════════════════════════════════
                  PHONE BODY
                  ═══════════════════════════════════ */}
              <g filter="url(#sketch)">
                {/* Back shading */}
                <path d="M 95 100 C 130 85, 210 85, 245 100 C 270 140, 275 160, 285 220 C 305 320, 290 380, 250 395 C 170 410, 70 390, 50 370 C 40 300, 60 160, 95 100 Z" 
                      fill="rgba(0,0,0,0.06)" transform="translate(6, 10)" />
                
                {/* Main Body Path */}
                <path d="M 95 100 C 130 85, 210 85, 245 100 C 270 140, 275 160, 285 220 C 305 320, 290 380, 250 395 C 170 410, 70 390, 50 370 C 40 300, 60 160, 95 100 Z" 
                      fill={FILL_MAIN} stroke={OUTLINE} strokeWidth="4.5" strokeLinejoin="round" />

                {/* Body Shading (bottom) */}
                <path d="M 60 360 C 150 375, 240 380, 285 340 C 280 370, 250 395, 170 405 C 80 395, 50 370, 60 360 Z" 
                      fill="url(#hatch-shade)" opacity="0.6" />
                
                {/* Handset Rest */}
                <path d="M 105 95 C 140 120, 200 120, 235 95" fill="none" stroke={OUTLINE} strokeWidth="4" strokeLinecap="round" />
                <path d="M 105 110 C 140 140, 200 140, 235 110" fill="none" stroke={OUTLINE} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
              </g>

              {/* ═══════════════════════════════════
                  HANDSET
                  ═══════════════════════════════════ */}
              <g filter="url(#sketch)">
                {/* Handset shadow */}
                <path d="M 100 100 C 110 50, 130 50, 170 40 C 210 45, 235 60, 250 90 C 255 100, 275 130, 260 140 C 245 150, 210 105, 180 100 C 140 90, 110 120, 90 120 C 70 120, 80 110, 100 100 Z"
                      fill="rgba(0,0,0,0.15)" transform="translate(4, 12)" />
                
                {/* Handset Handle */}
                <path d="M 125 55 C 150 45, 190 45, 215 65 C 225 75, 240 95, 220 100 C 190 90, 150 85, 120 90 C 105 95, 95 85, 105 70 Z" 
                      fill={FILL_MAIN} stroke={OUTLINE} strokeWidth="4.5" strokeLinejoin="round" />
                
                {/* Left Earpiece (Speaker) */}
                <ellipse cx="110" cy="75" rx="35" ry="25" fill={FILL_SHADE} stroke={OUTLINE} strokeWidth="4.5" transform="rotate(-30 110 75)" />
                <ellipse cx="110" cy="75" rx="25" ry="15" fill={FILL_MAIN} stroke={OUTLINE} strokeWidth="2.5" transform="rotate(-30 110 75)" />
                
                {/* Red Mark */}
                <path d="M 115 58 C 122 55, 128 58, 126 62 C 120 66, 112 62, 115 58 Z" fill="#c64747" stroke={OUTLINE} strokeWidth="1.5" />
                
                {/* Speaker Holes */}
                <circle cx="106" cy="75" r="2" fill={OUTLINE} />
                <circle cx="114" cy="75" r="2" fill={OUTLINE} />
                <circle cx="110" cy="70" r="2" fill={OUTLINE} />
                <circle cx="110" cy="80" r="2" fill={OUTLINE} />
                <circle cx="110" cy="75" r="2" fill={OUTLINE} />
                
                {/* Right Mouthpiece */}
                <ellipse cx="230" cy="115" rx="30" ry="22" fill={FILL_SHADE} stroke={OUTLINE} strokeWidth="4.5" transform="rotate(-40 230 115)" />
                <ellipse cx="230" cy="115" rx="20" ry="12" fill={FILL_MAIN} stroke={OUTLINE} strokeWidth="2.5" transform="rotate(-40 230 115)" />
                
                <circle cx="226" cy="115" r="2" fill={OUTLINE} />
                <circle cx="234" cy="115" r="2" fill={OUTLINE} />
                <circle cx="230" cy="111" r="2" fill={OUTLINE} />
                <circle cx="230" cy="119" r="2" fill={OUTLINE} />
                <circle cx="230" cy="115" r="2" fill={OUTLINE} />
              </g>

              {/* ═══════════════════════════════════
                  DIAL PLATE
                  ═══════════════════════════════════ */}
              <g transform="translate(170, 260)">
                
                {/* Outer Ring */}
                <circle cx="0" cy="0" r="115" fill={FILL_MAIN} stroke={OUTLINE} strokeWidth="4.5" filter="url(#sketch)" />
                <circle cx="0" cy="0" r="115" fill="url(#hatch-dial)" />
                <circle cx="0" cy="0" r="105" fill="none" stroke={OUTLINE} strokeWidth="1.5" opacity="0.3" filter="url(#sketch)" />
                
                {/* Outer Dial ticks */}
                {Array.from({ length: 20 }).map((_, i) => {
                  const rad = (i * 18 * Math.PI) / 180;
                  return (
                    <line key={'tick'+i} 
                          x1={Math.cos(rad)*105} y1={Math.sin(rad)*105} 
                          x2={Math.cos(rad)*115} y2={Math.sin(rad)*115} 
                          stroke={OUTLINE} strokeWidth="1.5" opacity="0.4" />
                  );
                })}

                {/* ── Rotating Wheel ── */}
                <g ref={wheelRef}>
                  
                  {/* Dial Disc Base */}
                  <circle cx="0" cy="0" r="95" fill="transparent" />
                  
                  {/* Connecting lines between holes (sketchy touch) */}
                  <circle cx="0" cy="0" r={R} fill="none" stroke={OUTLINE} strokeWidth="1" strokeDasharray="6 6" opacity="0.3" />

                  {/* Holes & Numbers */}
                  {holes.map(({ d, deg }) => {
                    const rad = (deg * Math.PI) / 180;
                    const cx  = Math.cos(rad) * R;
                    const cy  = Math.sin(rad) * R;
                    return (
                      <g key={d} filter="url(#sketch)">
                        {/* Number Background */}
                        <circle cx={cx} cy={cy} r="18" fill="#fff" stroke={OUTLINE} strokeWidth="3.5" />
                        
                        {/* Number Text - Hand-drawn style */}
                        <text x={cx} y={cy + 1}
                          fill={OUTLINE} fontSize="24"
                          fontFamily="'Caveat', 'Kalam', 'Comic Sans MS', cursive, sans-serif"
                          fontWeight="700"
                          textAnchor="middle" dominantBaseline="central"
                          style={{ pointerEvents: 'none' }}
                        >{d}</text>
                      </g>
                    );
                  })}

                  {/* Center Dot */}
                  <circle cx="0" cy="0" r="12" fill={FILL_MAIN} stroke={OUTLINE} strokeWidth="3.5" filter="url(#sketch)" />
                  <circle cx="0" cy="0" r="4" fill="#e29b38" />

                </g>

                {/* ── Finger Stop ── */}
                <g filter="url(#sketch)">
                  {/* Finger stop curve starting from near 4 ending downwards */}
                  <path d="M 85 45 C 100 60, 95 90, 80 100" fill="none" stroke={OUTLINE} strokeWidth="7" strokeLinecap="round" />
                  <path d="M 85 45 C 100 60, 95 90, 80 100" fill="none" stroke="#404c3e" strokeWidth="3" strokeLinecap="round" />
                </g>
              </g>

            </svg>
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 10, margin: '20px 0 20px', alignItems: 'center' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 9, height: 9, borderRadius: '50%',
                background: i < dialCount ? '#8c9c88' : 'rgba(140,156,136,0.2)',
                boxShadow: i < dialCount ? '0 0 12px rgba(140,156,136,0.4)' : 'none',
                transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                transform: i < dialCount ? 'scale(1.2)' : 'scale(1)',
              }}/>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', maxWidth: 270, zIndex: 2 }}>
            <p style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontStyle: 'italic', fontSize: 14.5,
              color: 'rgba(80,90,80,0.7)', lineHeight: 1.55, margin: 0,
            }}>
              Go on, tap a few of these{' '}
              <span style={{ fontStyle: 'normal' }}>–</span>{' '}
              we'll handle the dramatic spinning.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
