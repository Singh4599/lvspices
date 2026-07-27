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

  // 10 holes in a ring, 0 at 10-o'clock, clockwise
  const R = 70;
  const holes = Array.from({ length: 10 }, (_, i) => ({
    d: ['0','1','2','3','4','5','6','7','8','9'][i],
    deg: -120 + i * 36,
  }));

  return (
    <div style={{
      width: '100%',
      minHeight: showForm ? 'auto' : 620,
      borderRadius: 24,
      // Aged paper background
      background: 'radial-gradient(ellipse at 30% 20%, #fdf8ec 0%, #f5edda 50%, #ede0c4 100%)',
      backgroundImage: `
        radial-gradient(ellipse at 30% 20%, #fdf8ec 0%, #f5edda 50%, #ede0c4 100%)
      `,
      border: '1px solid rgba(160,130,80,0.2)',
      boxShadow: `
        0 1px 3px rgba(0,0,0,0.04) inset,
        0 24px 60px -20px rgba(0,0,0,0.1),
        0 0 0 1px rgba(255,255,255,0.6) inset
      `,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'min-height 0.5s cubic-bezier(0.16,1,0.3,1)',
    }}>

      {/* Aged paper grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(100,80,40,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100,80,40,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '28px 28px',
      }}/>

      {/* Subtle vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(160,120,60,0.12) 100%)',
      }}/>

      {/* ── FORM ── */}
      {showForm && (
        <div style={{ width: '100%', padding: '44px 36px', animation: 'phoneFormIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards' }}>
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
            fontSize: 11.5, fontWeight: 700,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(80,60,30,0.5)', margin: '0 0 18px 0',
          }}>DIAL YOUR NUMBER</p>

          {/* SVG Phone */}
          <div
            style={{ cursor: spinning ? 'wait' : 'pointer', userSelect: 'none' }}
            onClick={handleSpin}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <svg width="310" height="400" viewBox="-10 -10 320 410" style={{
              overflow: 'visible',
              filter: hovered && !spinning
                ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.22)) drop-shadow(0 4px 8px rgba(0,0,0,0.12))'
                : 'drop-shadow(0 10px 24px rgba(0,0,0,0.14)) drop-shadow(0 2px 4px rgba(0,0,0,0.06))',
              transition: 'filter 0.35s ease',
            }}>

              <defs>
                {/* Pencil sketch displacement */}
                <filter id="sk1">
                  <feTurbulence type="fractalNoise" baseFrequency="0.032" numOctaves="4" seed="3" result="n"/>
                  <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
                </filter>
                <filter id="sk2">
                  <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="7" result="n"/>
                  <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>
                </filter>

                {/* Diagonal hatch — fine */}
                <pattern id="hatch-fine" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="7" stroke="#7a8878" strokeWidth="0.6" opacity="0.55"/>
                </pattern>
                {/* Cross-hatch shadow — for body shading */}
                <pattern id="hatch-cross" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="7" stroke="#5a5040" strokeWidth="0.5" opacity="0.25"/>
                  <line x1="0" y1="0" x2="7" y2="0" stroke="#5a5040" strokeWidth="0.5" opacity="0.15"/>
                </pattern>

                {/* Body gradient — warm aged ivory */}
                <linearGradient id="gBody" x1="0%" y1="0%" x2="90%" y2="100%">
                  <stop offset="0%"   stopColor="#fdf8ef"/>
                  <stop offset="35%"  stopColor="#f5e9cc"/>
                  <stop offset="75%"  stopColor="#e8d4af"/>
                  <stop offset="100%" stopColor="#d8c49a"/>
                </linearGradient>

                {/* Handset gradient */}
                <linearGradient id="gHand" x1="0%" y1="0%" x2="100%" y2="80%">
                  <stop offset="0%"   stopColor="#fdf8ef"/>
                  <stop offset="50%"  stopColor="#f0e4c8"/>
                  <stop offset="100%" stopColor="#d8c49a"/>
                </linearGradient>

                {/* Cord gradient */}
                <linearGradient id="gCord" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#d8c49a"/>
                  <stop offset="40%"  stopColor="#f5e9cc"/>
                  <stop offset="100%" stopColor="#d8c49a"/>
                </linearGradient>

                {/* Dial disc gradient */}
                <radialGradient id="gDial" cx="40%" cy="35%" r="65%">
                  <stop offset="0%"   stopColor="#f8f2e4"/>
                  <stop offset="100%" stopColor="#e0d0b0"/>
                </radialGradient>

                {/* Hole gradient */}
                <radialGradient id="gHole" cx="35%" cy="30%" r="70%">
                  <stop offset="0%"   stopColor="#ffffff"/>
                  <stop offset="100%" stopColor="#f0e8d8"/>
                </radialGradient>
              </defs>

              {/* ═══════════════════════════════════
                  CURLY CORD — spring-like coils
                  ═══════════════════════════════════ */}
              <g filter="url(#sk1)">
                {Array.from({ length: 7 }).map((_, i) => {
                  const yOff = 80 + i * 25;
                  const xOff = 42 + (i % 2 === 0 ? 0 : 5);
                  return (
                    <g key={i}>
                      {/* Coil shadow */}
                      <path
                        d={`M ${xOff-16} ${yOff} Q ${xOff} ${yOff - 14}, ${xOff+16} ${yOff} Q ${xOff} ${yOff + 14}, ${xOff-16} ${yOff}`}
                        fill="#dac8a0" stroke="rgba(0,0,0,0.12)" strokeWidth="6" transform="translate(3,4)"/>
                      {/* Coil fill */}
                      <path
                        d={`M ${xOff-16} ${yOff} Q ${xOff} ${yOff - 14}, ${xOff+16} ${yOff} Q ${xOff} ${yOff + 14}, ${xOff-16} ${yOff}`}
                        fill="url(#gCord)" stroke="#1c1c14" strokeWidth="1.8"/>
                      {/* Highlight on coil top */}
                      <path
                        d={`M ${xOff-10} ${yOff-2} Q ${xOff} ${yOff - 10}, ${xOff+10} ${yOff-2}`}
                        fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.3" strokeLinecap="round"/>
                    </g>
                  );
                })}
              </g>

              {/* ═══════════════════════════════════
                  PHONE BODY
                  ═══════════════════════════════════ */}

              {/* Body ambient shadow */}
              <rect x="60" y="88" width="196" height="254" rx="32"
                fill="rgba(0,0,0,0.12)" filter="blur(14px)" transform="translate(6,14)"/>

              {/* Body fill */}
              <rect x="60" y="88" width="196" height="254" rx="32"
                fill="url(#gBody)" stroke="#1c1c14" strokeWidth="3.5"
                filter="url(#sk1)"/>

              {/* Cross-hatch shading on body right-bottom for depth */}
              <rect x="140" y="180" width="116" height="162" rx="0"
                fill="url(#hatch-cross)" opacity="0.9"
                style={{ clipPath: 'inset(0 0 0 0 round 32px)' }}/>

              {/* Body inner rim highlight */}
              <rect x="64" y="92" width="188" height="246" rx="29"
                fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"
                filter="url(#sk2)"/>

              {/* Body bottom edge — darker for thickness/depth */}
              <path d="M 76 332 Q 60 342 92 342 L 224 342 Q 256 342 240 332"
                fill="#c8b48a" stroke="#1c1c14" strokeWidth="2"
                filter="url(#sk2)"/>

              {/* Subtle form-line detail on body (vintage phone had a ridge) */}
              <path d="M 66 165 Q 158 175 250 165"
                fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="3"
                filter="url(#sk2)"/>

              {/* Handset rest notches on top */}
              <path d="M 90 98 Q 158 68 226 98"
                fill="none" stroke="#1c1c14" strokeWidth="2.8" strokeLinecap="round"
                filter="url(#sk1)"/>
              <path d="M 105 94 Q 158 74 211 94"
                fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4"
                strokeLinecap="round" filter="url(#sk2)"/>

              {/* ═══════════════════════════════════
                  HANDSET
                  ═══════════════════════════════════ */}
              <g filter="url(#sk1)">
                {/* Handset shadow */}
                <path d="M 62 56 Q 85 22 130 18 L 180 18 Q 225 22 244 54 L 246 84 Q 224 60 158 58 Q 88 58 68 82 Z"
                  fill="rgba(0,0,0,0.13)" transform="translate(4,7)"/>
                {/* Handset body */}
                <path d="M 62 56 Q 85 22 130 18 L 180 18 Q 225 22 244 54 L 246 84 Q 224 60 158 58 Q 88 58 68 82 Z"
                  fill="url(#gHand)" stroke="#1c1c14" strokeWidth="3.5"/>
                {/* Highlight */}
                <path d="M 70 55 Q 88 25 130 21 L 180 21 Q 222 25 240 54"
                  fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.2" strokeLinecap="round"/>
                {/* Shading line under top curve */}
                <path d="M 72 58 Q 89 32 130 26 L 180 26 Q 220 32 238 58"
                  fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4" strokeLinecap="round"/>
              </g>

              {/* Handset coiled cord (top connecting) */}
              {[0,1,2,3,4].map(i => (
                <g key={i} filter="url(#sk2)">
                  <ellipse cx={138 + i*9} cy={62 + (i%2)*4} rx={5} ry={8}
                    fill="url(#gCord)" stroke="#1c1c14" strokeWidth={1.5}
                    transform={`rotate(-12 ${138+i*9} ${62+(i%2)*4})`}/>
                </g>
              ))}

              {/* Earpiece */}
              <g filter="url(#sk2)">
                <ellipse cx="70" cy="56" rx="23" ry="17"
                  fill="#e8d8b8" stroke="#1c1c14" strokeWidth="2.8"
                  transform="rotate(-22 70 56)"/>
                <ellipse cx="68" cy="54" rx="23" ry="17"
                  fill="url(#gHand)" stroke="#1c1c14" strokeWidth="2.8"
                  transform="rotate(-22 68 54)"/>
                {/* Highlight rim */}
                <ellipse cx="66" cy="52" rx="23" ry="17"
                  fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.2"
                  transform="rotate(-22 66 52)"/>
                {/* Speaker dots (5x grid) */}
                {[[-7,-5],[-1,-7],[5,-5],[-7,0],[5,0],[-7,5],[0,6],[5,5]].map(([dx,dy],i) => (
                  <circle key={i} cx={68+dx} cy={54+dy} r="1.6" fill="#1c1c14" opacity="0.65"/>
                ))}
              </g>

              {/* Red accent mark */}
              <g filter="url(#sk2)">
                <path d="M 54 48 Q 62 44 66 49 Q 60 54 54 48"
                  fill="#a83232" opacity="0.9"/>
                <path d="M 57 49 Q 62 46 64 49"
                  fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
              </g>
              {/* Black nub / hook */}
              <circle cx="80" cy="70" r="4.5" fill="#1c1c14" filter="url(#sk2)"/>
              <circle cx="78" cy="68" r="1.8" fill="rgba(255,255,255,0.35)"/>

              {/* Mouthpiece */}
              <g filter="url(#sk2)">
                <ellipse cx="246" cy="60" rx="23" ry="17"
                  fill="#e8d8b8" stroke="#1c1c14" strokeWidth="2.8"
                  transform="rotate(22 246 60)"/>
                <ellipse cx="244" cy="58" rx="23" ry="17"
                  fill="url(#gHand)" stroke="#1c1c14" strokeWidth="2.8"
                  transform="rotate(22 244 58)"/>
                <ellipse cx="242" cy="56" rx="23" ry="17"
                  fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.2"
                  transform="rotate(22 242 56)"/>
                {[[-7,-5],[-1,-7],[5,-5],[-7,0],[5,0],[-7,5],[0,6],[5,5]].map(([dx,dy],i) => (
                  <circle key={i} cx={244+dx} cy={58+dy} r="1.6" fill="#1c1c14" opacity="0.65"/>
                ))}
              </g>

              {/* ═══════════════════════════════════
                  DIAL PLATE
                  ═══════════════════════════════════ */}

              {/* Outer ring shadow */}
              <circle cx="155" cy="244" r="110"
                fill="rgba(0,0,0,0.10)" filter="blur(10px)" transform="translate(3,8)"/>

              {/* Outer decorative ring */}
              <circle cx="155" cy="244" r="110"
                fill="#d8c89a" stroke="#1c1c14" strokeWidth="4.5"
                filter="url(#sk1)"/>
              {/* Outer ring inner bevel */}
              <circle cx="155" cy="244" r="110"
                fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3"
                transform="translate(-2,-2)"/>
              <circle cx="155" cy="244" r="110"
                fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="5"
                transform="translate(2,3)"/>

              {/* Small tick marks on outer rim */}
              {Array.from({ length: 40 }).map((_, i) => {
                const a = (i / 40) * 360;
                const rad = (a * Math.PI) / 180;
                const x1 = 155 + Math.cos(rad) * 103;
                const y1 = 244 + Math.sin(rad) * 103;
                const x2 = 155 + Math.cos(rad) * 108;
                const y2 = 244 + Math.sin(rad) * 108;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1c1c14" strokeWidth="0.7" opacity="0.4"/>;
              })}

              {/* ── Rotating wheel ── */}
              <g ref={wheelRef} style={{ transformOrigin: '155px 244px' }}>

                {/* Dial disc */}
                <circle cx="155" cy="244" r="103"
                  fill="url(#gDial)" stroke="#1c1c14" strokeWidth="2"
                  filter="url(#sk1)"/>
                {/* Hatch fill */}
                <circle cx="155" cy="244" r="103" fill="url(#hatch-fine)" opacity="1"/>

                {/* Crosshair construction lines */}
                <line x1="52" y1="244" x2="258" y2="244" stroke="#7a8878" strokeWidth="0.8" opacity="0.4"/>
                <line x1="155" y1="141" x2="155" y2="347" stroke="#7a8878" strokeWidth="0.8" opacity="0.4"/>
                <line x1="82" y1="171" x2="228" y2="317" stroke="#7a8878" strokeWidth="0.7" opacity="0.3"/>
                <line x1="228" y1="171" x2="82" y2="317" stroke="#7a8878" strokeWidth="0.7" opacity="0.3"/>

                {/* ── Digit holes ── */}
                {holes.map(({ d, deg }) => {
                  const rad = (deg * Math.PI) / 180;
                  const cx  = 155 + Math.cos(rad) * R;
                  const cy  = 244 + Math.sin(rad) * R;
                  return (
                    <g key={d}>
                      {/* Hole depth shadow */}
                      <circle cx={cx+1.5} cy={cy+2.5} r="22"
                        fill="rgba(0,0,0,0.2)" filter="url(#sk2)"/>
                      {/* Hole body */}
                      <circle cx={cx} cy={cy} r="21"
                        fill="url(#gHole)" stroke="#1c1c14" strokeWidth="2.8"
                        filter="url(#sk2)"/>
                      {/* Inner bottom shadow */}
                      <path d={`M ${cx-19} ${cy+4} A 20 20 0 0 0 ${cx+19} ${cy+4}`}
                        fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="6"/>
                      {/* Top gloss */}
                      <path d={`M ${cx-13} ${cy-13} A 16 16 0 0 1 ${cx+13} ${cy-13}`}
                        fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.8" strokeLinecap="round"/>
                      {/* Number */}
                      <text x={cx} y={cy}
                        fill="#1c1c14" fontSize="21"
                        fontFamily="'Georgia', 'Times New Roman', serif"
                        fontWeight="700"
                        textAnchor="middle" dominantBaseline="central"
                        style={{ pointerEvents: 'none', fontStyle: 'normal' }}
                        filter="url(#sk2)"
                      >{d}</text>
                    </g>
                  );
                })}

                {/* Center hub shadow */}
                <circle cx="157" cy="246" r="16"
                  fill="rgba(0,0,0,0.18)" filter="url(#sk2)"/>
                {/* Center hub */}
                <circle cx="155" cy="244" r="15"
                  fill="url(#gBody)" stroke="#1c1c14" strokeWidth="2.5"
                  filter="url(#sk2)"/>
                <circle cx="153" cy="242" r="15"
                  fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5"/>
                {/* Orange pivot dot */}
                <circle cx="155" cy="244" r="6" fill="#e8a838"/>
                <circle cx="153" cy="242" r="2.2" fill="rgba(255,255,255,0.6)"/>

              </g>
              {/* end rotating wheel */}

              {/* ── Finger stop ── */}
              <g filter="url(#sk1)">
                {/* Shadow */}
                <path d="M 252 300 C 272 298, 282 278, 265 260"
                  fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="10"
                  strokeLinecap="round" transform="translate(3,4)"/>
                {/* Arm */}
                <path d="M 252 300 C 272 298, 282 278, 265 260"
                  fill="none" stroke="#1c1c14" strokeWidth="6"
                  strokeLinecap="round"/>
                {/* Gloss */}
                <path d="M 252 298 C 270 296, 279 278, 266 262"
                  fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                  strokeLinecap="round"/>
                {/* Anchor dot */}
                <circle cx="252" cy="300" r="5.5" fill="#1c1c14"/>
                <circle cx="250" cy="298" r="2" fill="rgba(255,255,255,0.45)"/>
              </g>

            </svg>
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 10, margin: '4px 0 20px', alignItems: 'center' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 9, height: 9, borderRadius: '50%',
                background: i < dialCount ? '#c88a0a' : 'rgba(100,80,40,0.15)',
                boxShadow: i < dialCount ? '0 0 12px rgba(200,138,10,0.6), inset 0 1px 1px rgba(255,255,255,0.3)' : 'none',
                transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                transform: i < dialCount ? 'scale(1.25)' : 'scale(1)',
              }}/>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', maxWidth: 270 }}>
            <svg width="38" height="28" viewBox="0 0 38 28" style={{ display: 'block', margin: '0 auto 8px' }}>
              <path d="M 8 6 Q 26 10, 30 22" fill="none" stroke="#c88a0a" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M 26 18 L 30 22 L 24 24" fill="none" stroke="#c88a0a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontStyle: 'italic', fontSize: 14.5,
              color: '#b87c08', lineHeight: 1.55, margin: 0,
            }}>
              Go on, tap a few of these{' '}
              <span style={{ fontStyle: 'normal' }}>–</span>{' '}
              we&apos;ll handle the dramatic spinning.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
