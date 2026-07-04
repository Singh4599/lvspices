'use client';

/**
 * TechOrbits — Technology page hero scene.
 * CSS-only: 3 concentric rotating rings with tech icons orbiting a central atom.
 * No Three.js dependency — just perspective transforms.
 */

const ORBIT_ICONS = [
  { emoji: '🔬', label: 'Science', ring: 1, angle: 0 },
  { emoji: '❄️', label: 'Cryo', ring: 1, angle: 180 },
  { emoji: '⚗️', label: 'Lab', ring: 2, angle: 60 },
  { emoji: '🛡️', label: 'Safety', ring: 2, angle: 240 },
  { emoji: '🌡️', label: 'Temp', ring: 3, angle: 30 },
  { emoji: '💧', label: 'Steam', ring: 3, angle: 150 },
  { emoji: '🧪', label: 'Test', ring: 3, angle: 270 },
];

export default function TechOrbits() {
  return (
    <div
      aria-hidden
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)',
      }}
    >
      <style>{`
        @keyframes to-spin-1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes to-spin-2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes to-spin-3 { from { transform: rotate(60deg); } to { transform: rotate(420deg); } }
        @keyframes to-counter-1 { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(-360deg); } }
        @keyframes to-counter-2 { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }
        @keyframes to-counter-3 { from { transform: translateY(-50%) rotate(-60deg); } to { transform: translateY(-50%) rotate(-420deg); } }
        @keyframes to-core-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(172,3,59,0.3), 0 0 30px rgba(172,3,59,0.2); transform: translate(-50%,-50%) scale(1); }
          50% { box-shadow: 0 0 0 20px rgba(172,3,59,0), 0 0 50px rgba(172,3,59,0.35); transform: translate(-50%,-50%) scale(1.05); }
        }
        @keyframes to-fade-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }

        .to-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(172,3,59,0.2); left: 50%; top: 50%; transform: translate(-50%, -50%); }
        .to-icon {
          position: absolute;
          top: 50%;
          transform-origin: 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          border: 1px solid rgba(172,3,59,0.1);
        }
      `}</style>

      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(172,3,59,0.04) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Ring 1 — outer */}
      <div className="to-ring" style={{
        width: 400, height: 400,
        animation: 'to-spin-1 12s linear infinite',
      }}>
        {ORBIT_ICONS.filter(ic => ic.ring === 1).map((ic) => (
          <div key={ic.label} className="to-icon" style={{
            left: '50%',
            marginLeft: -20,
            marginTop: -200,
            animation: 'to-counter-1 12s linear infinite',
          }}>
            {ic.emoji}
          </div>
        ))}
      </div>

      {/* Ring 2 — middle */}
      <div className="to-ring" style={{
        width: 260, height: 260,
        animation: 'to-spin-2 8s linear infinite',
        borderColor: 'rgba(172,3,59,0.3)',
      }}>
        {ORBIT_ICONS.filter(ic => ic.ring === 2).map((ic, i) => (
          <div key={ic.label} className="to-icon" style={{
            left: i === 0 ? '50%' : 'auto',
            right: i === 1 ? '-20px' : 'auto',
            top: i === 0 ? '-20px' : i === 1 ? '50%' : 'auto',
            marginLeft: i === 0 ? -20 : 0,
            marginTop: i === 0 ? 0 : -20,
            animation: 'to-counter-2 8s linear infinite',
            fontSize: '18px',
          }}>
            {ic.emoji}
          </div>
        ))}
      </div>

      {/* Ring 3 — inner */}
      <div className="to-ring" style={{
        width: 130, height: 130,
        animation: 'to-spin-3 5s linear infinite',
        borderColor: 'rgba(172,3,59,0.5)',
        borderWidth: '1.5px',
      }} />

      {/* Core */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 52, height: 52,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #AC033B, #7c1d2b)',
        animation: 'to-core-pulse 3s ease-in-out infinite',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        zIndex: 10,
      }}>
        ⚡
      </div>

      {/* Floating stat labels */}
      {[
        { text: '99.7%', sub: 'Oil Retention', x: '10%', y: '20%', delay: '0s' },
        { text: '500+', sub: 'Tests/Batch', x: '75%', y: '15%', delay: '0.4s' },
        { text: '–40°C', sub: 'Cryo Temp', x: '5%', y: '70%', delay: '0.8s' },
        { text: '30+', sub: 'Scientists', x: '78%', y: '72%', delay: '1.2s' },
      ].map((s) => (
        <div key={s.text} style={{
          position: 'absolute',
          left: s.x, top: s.y,
          textAlign: 'center',
          animation: `to-fade-in 0.6s ${s.delay} ease-out both`,
        }}>
          <div style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#AC033B',
            lineHeight: 1,
          }}>{s.text}</div>
          <div style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '9px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginTop: '2px',
          }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
