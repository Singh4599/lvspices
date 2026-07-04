'use client';

/**
 * SpiceParticles — Card 01 "The Beginning"
 * Pure CSS floating spice dust particles in crimson/gold palette.
 * Zero JavaScript animation loop — pure @keyframes.
 */
export function SpiceParticles() {
  const particles = Array.from({ length: 28 });

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #1a0008 0%, #2d0010 40%, #0a0003 100%)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes sp-float {
          0%   { transform: translateY(100%) translateX(0) scale(0.6) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(-20px) translateX(var(--sp-x,30px)) scale(1.2) rotate(var(--sp-r,360deg)); opacity: 0; }
        }
        @keyframes sp-shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        .sp-dot {
          position: absolute;
          border-radius: 50%;
          animation: sp-float var(--sp-dur, 7s) var(--sp-del, 0s) ease-in-out infinite;
          will-change: transform, opacity;
        }
        .sp-label {
          position: absolute;
          bottom: 40px;
          left: 40px;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          animation: sp-shimmer 3s ease-in-out infinite;
        }
      `}</style>

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 40% 60%, rgba(172,3,59,0.4) 0%, transparent 65%)',
      }} />

      {/* Particles */}
      {particles.map((_, i) => {
        const size = 3 + (i % 5) * 2;
        const colors = ['#AC033B', '#e8975c', '#c8a96e', '#d4a843', '#AC033B', '#f5c842'];
        const color = colors[i % colors.length];
        return (
          <div
            key={i}
            className="sp-dot"
            style={{
              width: size,
              height: size,
              background: color,
              left: `${(i * 13 + 7) % 90 + 5}%`,
              bottom: 0,
              boxShadow: `0 0 ${size * 2}px ${color}80`,
              // @ts-ignore custom props
              '--sp-dur': `${5 + (i % 4)}s`,
              '--sp-del': `${(i * 0.4) % 6}s`,
              '--sp-x': `${((i % 7) - 3) * 20}px`,
              '--sp-r': `${i % 2 === 0 ? 360 : -360}deg`,
            }}
          />
        );
      })}

      {/* Large blurred orbs */}
      {[
        { x: '20%', y: '30%', size: 120, color: '#AC033B' },
        { x: '70%', y: '60%', size: 80, color: '#c8a96e' },
        { x: '50%', y: '80%', size: 60, color: '#AC033B' },
      ].map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: orb.color,
            opacity: 0.12,
            filter: 'blur(30px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <span className="sp-label">Est. 1975 — Mumbai</span>
    </div>
  );
}

/**
 * FactoryGrid — Card 02 "The Factory"
 * Animated industrial grid with glowing stat counters.
 */
export function FactoryGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0d0d0d',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes fg-grid-pulse {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.09; }
        }
        @keyframes fg-bar {
          0%   { transform: scaleY(0.3); }
          50%  { transform: scaleY(1); }
          100% { transform: scaleY(0.3); }
        }
        @keyframes fg-glow {
          0%, 100% { box-shadow: 0 0 8px #AC033B60; }
          50% { box-shadow: 0 0 24px #AC033Baa; }
        }
        .fg-bar {
          width: 6px;
          border-radius: 3px;
          background: linear-gradient(to top, #AC033B, #e8603c);
          transform-origin: bottom;
          animation: fg-bar var(--fg-dur, 2s) var(--fg-del, 0s) ease-in-out infinite;
        }
        .fg-stat {
          animation: fg-glow 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        animation: 'fg-grid-pulse 4s ease-in-out infinite',
      }} />

      {/* Factory bars visualizer */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '120px', zIndex: 1 }}>
        {[70, 100, 55, 85, 40, 95, 60, 80, 45, 90, 65, 75].map((h, i) => (
          <div
            key={i}
            className="fg-bar"
            style={{
              height: `${h}%`,
              // @ts-ignore
              '--fg-dur': `${1.2 + (i % 4) * 0.3}s`,
              '--fg-del': `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Stats overlay */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '32px',
        display: 'flex',
        gap: '24px',
      }}>
        {[
          { v: '50K', l: 'Sq Ft' },
          { v: '200+', l: 'Workers' },
          { v: '24/7', l: 'Ops' },
        ].map(s => (
          <div key={s.l} className="fg-stat" style={{
            background: 'rgba(172,3,59,0.15)',
            border: '1px solid rgba(172,3,59,0.3)',
            borderRadius: '8px',
            padding: '8px 14px',
          }}>
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * IndiaMap — Card 03 "The Source"
 * Simplified SVG India outline with pulsing origin dots.
 */
export function IndiaMap() {
  const origins = [
    { x: 200, y: 280, label: 'Kerala', delay: '0s' },
    { x: 160, y: 180, label: 'Rajasthan', delay: '0.4s' },
    { x: 220, y: 200, label: 'Gujarat', delay: '0.8s' },
    { x: 240, y: 260, label: 'Andhra', delay: '1.2s' },
    { x: 280, y: 150, label: 'MP', delay: '0.6s' },
    { x: 300, y: 200, label: 'Maharashtra', delay: '1.0s' },
  ];

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #0a0010 0%, #110018 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes im-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes im-ripple {
          0% { transform: scale(0.5); opacity: 0.7; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes im-line {
          0% { stroke-dashoffset: 800; }
          100% { stroke-dashoffset: 0; }
        }
        .im-pulse-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid #AC033B;
          animation: im-ripple 2s ease-out infinite;
        }
        .im-dot {
          animation: im-pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* SVG India silhouette (simplified path) */}
      <svg viewBox="0 80 480 460" width="85%" height="85%" style={{ position: 'absolute' }}>
        <path
          d="M180,100 L220,90 L260,95 L300,110 L330,130 L350,160 L360,190 L365,220 L355,250 L340,270 L320,295 L310,320 L315,350 L305,380 L290,410 L270,430 L250,445 L240,460 L230,445 L210,420 L200,395 L195,370 L185,340 L180,310 L175,280 L170,250 L175,220 L170,190 L160,165 L155,140 L165,115 Z"
          fill="none"
          stroke="rgba(172,3,59,0.15)"
          strokeWidth="1.5"
          strokeDasharray="800"
          style={{ animation: 'im-line 3s ease-out forwards' }}
        />
        <path
          d="M180,100 L220,90 L260,95 L300,110 L330,130 L350,160 L360,190 L365,220 L355,250 L340,270 L320,295 L310,320 L315,350 L305,380 L290,410 L270,430 L250,445 L240,460 L230,445 L210,420 L200,395 L195,370 L185,340 L180,310 L175,280 L170,250 L175,220 L170,190 L160,165 L155,140 L165,115 Z"
          fill="rgba(172,3,59,0.04)"
        />

        {/* Origin dots on SVG */}
        {origins.map((o) => (
          <g key={o.label}>
            <circle cx={o.x} cy={o.y} r="4" fill="#AC033B" className="im-dot" style={{ animationDelay: o.delay }} />
            <circle cx={o.x} cy={o.y} r="8" fill="none" stroke="#AC033B" strokeWidth="1" className="im-pulse-ring" style={{ animationDelay: o.delay }} />
            <text x={o.x + 12} y={o.y + 4} fontSize="9" fill="rgba(255,255,255,0.4)" fontFamily="monospace">{o.label}</text>
          </g>
        ))}
      </svg>

      {/* Label */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '32px',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '10px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)',
      }}>
        Direct Farm Sourcing — 6 Regions
      </div>
    </div>
  );
}

/**
 * MoleculeOrbit — Card 04 "CFG Science"
 * CSS orbital rings around a central atom.
 */
export function MoleculeOrbit() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #080014 0%, #12001f 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes mo-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes mo-spin-r { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes mo-spin-60 { from { transform: rotate(60deg); } to { transform: rotate(420deg); } }
        @keyframes mo-pulse-core {
          0%, 100% { box-shadow: 0 0 20px #7c3aed, 0 0 40px #7c3aed40; transform: scale(1); }
          50% { box-shadow: 0 0 35px #AC033B, 0 0 70px #AC033B40; transform: scale(1.08); }
        }
        @keyframes mo-label-fade { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .mo-ring { position: absolute; border-radius: 50%; border: 1px solid; }
        .mo-electron {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(124,58,237,0.08) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Orbital system */}
      <div style={{ position: 'relative', width: 240, height: 240 }}>
        {/* Ring 1 */}
        <div className="mo-ring" style={{
          width: '100%', height: '100%',
          borderColor: 'rgba(172,3,59,0.4)',
          animation: 'mo-spin 6s linear infinite',
        }}>
          <div className="mo-electron" style={{ background: '#AC033B', boxShadow: '0 0 8px #AC033B' }} />
        </div>

        {/* Ring 2 */}
        <div className="mo-ring" style={{
          width: '65%', height: '65%',
          top: '17.5%', left: '17.5%',
          borderColor: 'rgba(124,58,237,0.5)',
          transform: 'rotate(60deg)',
          animation: 'mo-spin-r 4s linear infinite',
        }}>
          <div className="mo-electron" style={{ background: '#7c3aed', boxShadow: '0 0 8px #7c3aed' }} />
        </div>

        {/* Ring 3 */}
        <div className="mo-ring" style={{
          width: '35%', height: '35%',
          top: '32.5%', left: '32.5%',
          borderColor: 'rgba(200,169,110,0.5)',
          transform: 'rotate(-30deg)',
          animation: 'mo-spin-60 8s linear infinite',
        }}>
          <div className="mo-electron" style={{ background: '#c8a96e', boxShadow: '0 0 8px #c8a96e' }} />
        </div>

        {/* Core nucleus */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: 28, height: 28,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #AC033B 0%, #7c3aed 100%)',
          transform: 'translate(-50%, -50%)',
          animation: 'mo-pulse-core 3s ease-in-out infinite',
          zIndex: 2,
        }} />
      </div>

      {/* Compound labels */}
      {['Curcumin', 'Piperine', 'Capsaicin'].map((label, i) => (
        <div key={label} style={{
          position: 'absolute',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '9px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          animation: `mo-label-fade ${2 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.8}s`,
          top: `${20 + i * 25}%`,
          right: '24px',
        }}>
          {label}
        </div>
      ))}
    </div>
  );
}

/**
 * FrostBurst — Card 05 "Cryogenic Grinding"
 * Icy blue particle burst with frost overlay.
 */
export function FrostBurst() {
  const particles = Array.from({ length: 24 });

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #040d18 0%, #071828 60%, #020810 100%)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes fb-burst {
          0%   { transform: translate(0,0) scale(0); opacity: 0; }
          15%  { opacity: 1; }
          80%  { opacity: 0.7; }
          100% { transform: translate(var(--fb-tx, 50px), var(--fb-ty, -80px)) scale(var(--fb-s, 1.5)); opacity: 0; }
        }
        @keyframes fb-snowflake {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          100% { transform: translateY(110%) rotate(720deg); opacity: 0; }
        }
        @keyframes fb-temp {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .fb-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #deeffe, #7fb3e8);
          animation: fb-burst var(--fb-dur, 4s) var(--fb-del, 0s) ease-out infinite;
          will-change: transform, opacity;
        }
        .fb-flake {
          position: absolute;
          top: -20px;
          font-size: 14px;
          color: rgba(168,212,245,0.5);
          animation: fb-snowflake var(--fb-fdur, 6s) var(--fb-fdel, 0s) linear infinite;
        }
      `}</style>

      {/* Radial ice glow from center */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(127,179,232,0.25) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(20px)',
      }} />

      {/* Burst particles from center */}
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const distance = 60 + (i % 4) * 40;
        const tx = Math.cos(angle * Math.PI / 180) * distance;
        const ty = Math.sin(angle * Math.PI / 180) * distance;
        const size = 3 + (i % 4) * 2;
        return (
          <div
            key={i}
            className="fb-particle"
            style={{
              width: size,
              height: size,
              top: '50%',
              left: '50%',
              marginTop: -size / 2,
              marginLeft: -size / 2,
              boxShadow: `0 0 ${size * 2}px rgba(127,179,232,0.8)`,
              // @ts-ignore
              '--fb-tx': `${tx}px`,
              '--fb-ty': `${ty}px`,
              '--fb-s': `${0.8 + (i % 3) * 0.3}`,
              '--fb-dur': `${3 + (i % 3)}s`,
              '--fb-del': `${(i * 0.15) % 3}s`,
            }}
          />
        );
      })}

      {/* Falling snowflakes */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="fb-flake"
          style={{
            left: `${i * 10 + 5}%`,
            // @ts-ignore
            '--fb-fdur': `${5 + (i % 3)}s`,
            '--fb-fdel': `${i * 0.5}s`,
          }}
        >
          ❄
        </div>
      ))}

      {/* Temperature display */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '32px',
        animation: 'fb-temp 2s ease-in-out infinite',
      }}>
        <div style={{
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: '52px',
          fontWeight: 700,
          fontStyle: 'italic',
          color: '#a8d4f5',
          lineHeight: 1,
        }}>
          –40°C
        </div>
        <div style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '9px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(168,212,245,0.4)',
          marginTop: '4px',
        }}>
          Liquid Nitrogen Process
        </div>
      </div>
    </div>
  );
}

/**
 * LabBeaker — Card 06 "Quality Assurance"
 * SVG lab beaker filling animation with pulsing test result indicators.
 */
export function LabBeaker() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #040d0f 0%, #071520 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes lb-fill {
          0%   { height: 0%; opacity: 0.8; }
          30%  { height: 60%; opacity: 0.9; }
          60%  { height: 85%; opacity: 0.95; }
          100% { height: 60%; opacity: 0.9; }
        }
        @keyframes lb-bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-80px) scale(0.3); opacity: 0; }
        }
        @keyframes lb-scan {
          0% { top: 10%; }
          100% { top: 90%; }
        }
        @keyframes lb-check {
          0% { transform: scale(0) rotate(-45deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .lb-fill { animation: lb-fill 4s ease-in-out infinite; position: absolute; bottom: 0; left: 0; right: 0; }
        .lb-bubble { position: absolute; border-radius: 50%; animation: lb-bubble var(--bb-dur,2s) var(--bb-del,0s) ease-out infinite; }
        .lb-check { animation: lb-check 0.6s var(--ck-del, 0s) cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>

      {/* SVG Beaker */}
      <svg width="120" height="160" viewBox="0 0 120 160" style={{ position: 'relative', zIndex: 1 }}>
        <defs>
          <clipPath id="beaker-clip">
            <path d="M30,20 L30,90 L10,140 L110,140 L90,90 L90,20 Z" />
          </clipPath>
        </defs>

        {/* Beaker outline */}
        <path d="M30,20 L30,90 L10,140 L110,140 L90,90 L90,20 Z"
          fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" strokeLinejoin="round" />

        {/* Liquid fill */}
        <g clipPath="url(#beaker-clip)">
          <div className="lb-fill" />
          <rect className="lb-fill" width="120" height="120"
            fill="rgba(172,3,59,0.2)" rx="0" style={{ transformOrigin: 'bottom' }} />

          {/* Bubbles */}
          {[
            { x: 45, size: 6, dur: '2s', del: '0s' },
            { x: 65, size: 4, dur: '2.5s', del: '0.8s' },
            { x: 55, size: 5, dur: '3s', del: '1.5s' },
          ].map((b, i) => (
            <circle
              key={i}
              className="lb-bubble"
              cx={b.x} cy={120}
              r={b.size / 2}
              fill="rgba(172,3,59,0.3)"
              // @ts-ignore
              style={{ '--bb-dur': b.dur, '--bb-del': b.del }}
            />
          ))}
        </g>

        {/* Measurement lines */}
        {[40, 70, 100, 130].map(y => (
          <line key={y} x1="82" y1={y} x2="90" y2={y} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        ))}

        {/* Beaker neck/rim */}
        <rect x="25" y="14" width="70" height="10" rx="3"
          fill="rgba(0,0,0,0.06)" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      </svg>

      {/* Test result indicators */}
      <div style={{
        position: 'absolute',
        right: '32px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        {[
          { label: 'Pesticide', pass: true, delay: '0.2s' },
          { label: 'Mycotoxin', pass: true, delay: '0.5s' },
          { label: 'Heavy Metals', pass: true, delay: '0.8s' },
          { label: 'Microbio', pass: true, delay: '1.1s' },
        ].map(t => (
          <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              className="lb-check"
              // @ts-ignore
              style={{ '--ck-del': t.delay }}
            >
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: t.pass ? 'rgba(22,163,74,0.12)' : 'rgba(220,38,38,0.12)',
                border: `1.5px solid ${t.pass ? 'rgba(22,163,74,0.5)' : 'rgba(220,38,38,0.5)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
              }}>
                {t.pass ? '✓' : '✗'}
              </div>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '9px',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
            }}>{t.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom label */}
      <div style={{
        position: 'absolute',
        bottom: '28px',
        left: '32px',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '10px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)',
      }}>
        NABL ISO/IEC 17025
      </div>
    </div>
  );
}
