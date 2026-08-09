'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

const CRIMSON = '#111111';

const PRODUCTS = [
  { id: 'chilli',    name: 'Red Chilli Powder',  icon: '🌶️' },
  { id: 'turmeric',  name: 'Turmeric Powder',     icon: '🌿' },
  { id: 'masala',    name: 'Garam Masala',         icon: '🫙' },
  { id: 'cumin',     name: 'Cumin Seeds',          icon: '🌾' },
  { id: 'pepper',    name: 'Black Pepper',         icon: '⚫' },
  { id: 'coriander', name: 'Coriander Powder',    icon: '🌱' },
];

const PALETTES = [
  { name: 'Crimson',  bg: '#111111', text: '#fff', accent: '#FFD700', border: '#7A0029' },
  { name: 'Midnight', bg: '#1a1a2e', text: '#fff', accent: '#e94560', border: '#16213e' },
  { name: 'Forest',   bg: '#2D6A4F', text: '#fff', accent: '#B7E4C7', border: '#1B4332' },
  { name: 'Gold',     bg: '#C8973E', text: '#fff', accent: '#fff3cd', border: '#A07830' },
  { name: 'Royal',    bg: '#4A0E8F', text: '#fff', accent: '#FFD700', border: '#2D0066' },
  { name: 'Slate',    bg: '#334155', text: '#fff', accent: '#94A3B8', border: '#1E293B' },
];

const SIZES = ['100g', '200g', '500g', '1kg', '5kg', '25kg'];

/* ═══════════════════════════════════════════════
   HERO SVG PACKET — All animations self-contained
   ═══════════════════════════════════════════════ */
function HeroPacketSVG({
  brand, icon, palette, onClick
}: { brand: string; icon: string; palette: typeof PALETTES[0]; onClick: () => void }) {
  const displayBrand = (brand.trim() || 'YOUR BRAND').toUpperCase().slice(0, 16);
  const id = palette.name.toLowerCase();

  return (
    <svg
      viewBox="0 0 340 500"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ width: '100%', maxWidth: 320, cursor: 'pointer', overflow: 'visible' }}
    >
      <defs>
        {/* Gradients */}
        <linearGradient id={`hpb-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#B8B8B8"/>
          <stop offset="18%"  stopColor="#E8E8E8"/>
          <stop offset="82%"  stopColor="#DEDEDE"/>
          <stop offset="100%" stopColor="#ADADAD"/>
        </linearGradient>
        <linearGradient id={`hpl-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={palette.bg}/>
          <stop offset="100%" stopColor={palette.border}/>
        </linearGradient>
        <linearGradient id={`hpg-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(255,255,255,0.22)"/>
          <stop offset="45%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id={`hps-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="rgba(255,255,255,0)"/>
          <stop offset="50%" stopColor="rgba(255,255,255,0.5)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <radialGradient id={`hpglow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor={palette.bg} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={palette.bg} stopOpacity="0"/>
        </radialGradient>
        <filter id={`hpfilt-${id}`}>
          <feDropShadow dx="0" dy="20" stdDeviation="24" floodColor={palette.bg} floodOpacity="0.25"/>
          <feDropShadow dx="0" dy="6"  stdDeviation="8"  floodColor="rgba(0,0,0,0.18)"/>
        </filter>
        <clipPath id={`hplc-${id}`}>
          <rect x="30" y="88" width="280" height="318" rx="4"/>
        </clipPath>
      </defs>

      {/* ── Floating group — GSAP-animated via CSS ── */}
      <g style={{ animation: 'hpFloat 4s ease-in-out infinite' }}>

        {/* Ambient glow behind packet */}
        <ellipse cx="170" cy="430" rx="120" ry="30" fill={`url(#hpglow-${id})`}>
          <animate attributeName="ry" values="28;35;28" dur="4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite"/>
        </ellipse>

        {/* Packet body */}
        <g filter={`url(#hpfilt-${id})`}>
          <path d="M 50 12 Q 50 4 60 4 L 280 4 Q 290 4 290 12 L 296 462 Q 296 492 272 492 L 68 492 Q 44 492 44 462 Z"
            fill={`url(#hpb-${id})`}/>
        </g>

        {/* Side fold lines */}
        <line x1="50" y1="12"  x2="44" y2="462" stroke="rgba(0,0,0,0.07)" strokeWidth="2"/>
        <line x1="290" y1="12" x2="296" y2="462" stroke="rgba(0,0,0,0.07)" strokeWidth="2"/>

        {/* Label area */}
        <rect x="30" y="88" width="280" height="318" rx="4" fill={`url(#hpl-${id})`}/>

        {/* Label top accent strip */}
        <rect x="30" y="88" width="280" height="20" fill={palette.accent} opacity="0.9"/>

        {/* Inner frame */}
        <rect x="40" y="114" width="260" height="286" rx="3"
          fill="none" stroke={`${palette.text}15`} strokeWidth="1"/>

        {/* Sparkle dots — corner decorations */}
        {[[50,98],[302,98],[50,398],[302,398]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill={palette.accent} opacity="0.7">
            <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.5+i*0.3}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        {/* Product icon (emoji as foreignObject alternative — use text) */}
        <text x="170" y="210" textAnchor="middle" fontSize="64">{icon}</text>

        {/* Brand name */}
        <text x="170" y="248" textAnchor="middle"
          fontFamily="Georgia,'Times New Roman',serif"
          fontSize={displayBrand.length > 12 ? '18' : '23'}
          fontWeight="bold" fill={palette.text} letterSpacing="0.1em">
          {displayBrand}
        </text>

        {/* Divider */}
        <line x1="76" y1="258" x2="264" y2="258"
          stroke={`${palette.text}35`} strokeWidth="0.8"/>

        {/* Product type text */}
        <text x="170" y="278" textAnchor="middle"
          fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700"
          fill={palette.accent !== '#fff3cd' && palette.accent !== '#fff' ? palette.accent : `${palette.text}BB`}
          letterSpacing="0.12em">
          PREMIUM SPICE BLEND
        </text>

        {/* Weight */}
        <text x="170" y="300" textAnchor="middle"
          fontFamily="monospace" fontSize="11" fill={`${palette.text}65`} letterSpacing="0.1em">
          NET WT: 100g · FSSAI CERTIFIED
        </text>

        {/* Bottom accent strip */}
        <rect x="30" y="388" width="280" height="18" fill={palette.accent} opacity="0.85"/>

        {/* Barcode */}
        {[0,5,8,12,16,20,23,27,31,35,38,42,46,49].map((x,i) => (
          <rect key={i} x={108+x} y="414" width={i%3===0?3:2} height={i%4===0?28:20}
            fill={`${palette.text}80`}/>
        ))}
        <text x="170" y="450" textAnchor="middle" fontFamily="monospace" fontSize="9"
          fill={`${palette.text}55`}>6 04789 00142 8</text>

        {/* Top seal */}
        <path d="M 60 4 L 280 4 L 285 30 L 55 30 Z" fill="rgba(145,145,145,0.35)"/>

        {/* Hang hole */}
        <circle cx="170" cy="18" r="7" fill="rgba(0,0,0,0.2)"/>
        <circle cx="170" cy="18" r="4.5" fill="rgba(180,180,180,0.9)"/>

        {/* Gloss highlight */}
        <path d="M 60 12 Q 48 18 48 30 L 52 240 Q 68 218 84 152 L 96 12 Z"
          fill={`url(#hpg-${id})`}/>

        {/* ── Shine sweep animation ── */}
        <rect x="-80" y="88" width="80" height="318" fill={`url(#hps-${id})`}>
          <animateTransform attributeName="transform" type="translate"
            values="-80,0; 380,0; 380,0" keyTimes="0;0.4;1"
            dur="5s" repeatCount="indefinite"/>
        </rect>

        {/* ── Click CTA ring ── */}
        <circle cx="170" cy="246" r="156" fill="none"
          stroke={CRIMSON} strokeWidth="1.5" strokeDasharray="8 6" opacity="0.2">
          <animateTransform attributeName="transform" type="rotate"
            from="0 170 246" to="360 170 246" dur="20s" repeatCount="indefinite"/>
        </circle>

        {/* Click to Customise pill */}
        <g style={{ cursor: 'pointer' }}>
          <rect x="86" y="462" width="168" height="36" rx="18"
            fill={CRIMSON}>
            <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
          </rect>
          <text x="170" y="484" textAnchor="middle"
            fontFamily="var(--font-sans),Arial,sans-serif" fontSize="12.5" fontWeight="700"
            fill="#fff" letterSpacing="0.05em">
            ✦ Customise This Packet
          </text>
        </g>

      </g>

      {/* Floating keyframes injected inline */}
      <style>{`
        @keyframes hpFloat {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-16px) rotate(1deg); }
        }
      `}</style>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   PANEL MINI PACKET
   ═══════════════════════════════════════════════ */
function MiniPacket({ brand, icon, palette }: { brand: string; icon: string; palette: typeof PALETTES[0] }) {
  const displayBrand = (brand.trim() || 'YOUR BRAND').toUpperCase().slice(0, 16);
  return (
    <svg viewBox="0 0 340 500" style={{ width: 90 }}>
      <defs>
        <linearGradient id="mp-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8B8B8"/><stop offset="50%" stopColor="#E8E8E8"/><stop offset="100%" stopColor="#ADADAD"/>
        </linearGradient>
        <linearGradient id="mp-label" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.bg}/><stop offset="100%" stopColor={palette.border}/>
        </linearGradient>
      </defs>
      <path d="M 50 12 Q 50 4 60 4 L 280 4 Q 290 4 290 12 L 296 462 Q 296 492 272 492 L 68 492 Q 44 492 44 462 Z" fill="url(#mp-body)"/>
      <rect x="30" y="88" width="280" height="318" rx="4" fill="url(#mp-label)"/>
      <rect x="30" y="88" width="280" height="20" fill={palette.accent} opacity="0.9"/>
      <text x="170" y="210" textAnchor="middle" fontSize="64">{icon}</text>
      <text x="170" y="248" textAnchor="middle" fontFamily="Georgia,serif"
        fontSize={displayBrand.length > 12 ? '18' : '22'} fontWeight="bold"
        fill={palette.text} letterSpacing="0.08em">{displayBrand}</text>
      <path d="M 60 4 L 280 4 L 285 30 L 55 30 Z" fill="rgba(145,145,145,0.35)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
export default function LabelRevealHero() {
  const [open, setOpen]             = useState(false);
  const [brand, setBrand]           = useState('');
  const [productIdx, setProductIdx] = useState(0);
  const [paletteIdx, setPaletteIdx] = useState(0);
  const [sizeIdx, setSizeIdx]       = useState(0);
  const [isTyping, setIsTyping]     = useState(false);
  const panelRef    = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const product = PRODUCTS[productIdx];
  const palette = PALETTES[paletteIdx];
  const size    = SIZES[sizeIdx];

  useEffect(() => {
    if (!panelRef.current) return;
    if (open) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(panelRef.current, { x: '100%', opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'expo.out' });
    } else {
      document.body.style.overflow = '';
      gsap.to(panelRef.current, { x: '100%', opacity: 0, duration: 0.35, ease: 'power3.in' });
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleBrand = (v: string) => {
    setBrand(v); setIsTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setIsTyping(false), 600);
  };

  return (
    <>
      <style>{`
        .plb-panel { position:fixed; top:0; right:0; height:100dvh; width:min(460px,100vw);
          background:#fff; z-index:1000; box-shadow:-20px 0 60px rgba(0,0,0,0.12);
          display:flex; flex-direction:column; overflow:hidden; transform:translateX(100%); }
        .plb-scroll { flex:1; overflow-y:auto; padding:clamp(20px,4vw,32px) clamp(20px,4vw,32px) 100px;
          scrollbar-width:thin; scrollbar-color:${CRIMSON}22 transparent; }
        .plb-footer { position:absolute; bottom:0; left:0; right:0; background:#fff;
          padding:16px clamp(20px,4vw,32px); border-top:1px solid rgba(0,0,0,0.06);
          display:flex; gap:12px; }
        .plb-swatch { width:40px; height:40px; border-radius:12px; border:none; cursor:pointer;
          outline:3px solid transparent; outline-offset:3px; transition:all 0.2s; }
        .plb-swatch.on { outline-color:${CRIMSON}; }
        .plb-size { padding:9px 15px; border-radius:8px; border:2px solid rgba(0,0,0,0.1);
          background:#fff; cursor:pointer; font-family:var(--font-mono); font-size:11px;
          font-weight:700; color:#555; transition:all 0.2s; }
        .plb-size.on { border-color:${CRIMSON}; color:${CRIMSON}; background:rgba(17,17,17,0.04); }
        .plb-prod { padding:10px 8px; border-radius:12px; border:2px solid rgba(0,0,0,0.08);
          background:#fff; cursor:pointer; transition:all 0.2s; display:flex;
          flex-direction:column; align-items:center; gap:4px; }
        .plb-prod.on { border-color:${CRIMSON}; background:rgba(17,17,17,0.04); }
        .hero-layout { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,6vw,100px); align-items:center; }
        @media(max-width:700px){
          .hero-layout { grid-template-columns:1fr; text-align:center; }
          .hero-layout .plb-svg-wrap { order:-1; display:flex; justify-content:center; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: '#fff', overflow: 'hidden',
        padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="hero-layout">

            {/* LEFT — Text */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(17,17,17,0.07)', border: '1px solid rgba(17,17,17,0.2)',
                borderRadius: 999, padding: '6px 18px', marginBottom: 24
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }}/>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CRIMSON }}>PRIVATE LABELLING</span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5.5vw,80px)',
                fontWeight: 800, color: '#111', lineHeight: 0.95, letterSpacing: '-0.04em',
                margin: '0 0 20px'
              }}>
                Launch<br />Your Own<br />
                <em style={{ fontStyle: 'italic', color: CRIMSON }}>Brand.</em>
              </h1>

              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.1vw,16px)',
                color: 'rgba(0,0,0,0.48)', lineHeight: 1.75, maxWidth: 420, margin: '0 0 36px'
              }}>
                We source, process, pack &amp; ship — all under your label.
                500+ products · 40+ countries · FSSC 22000 certified.
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 36 }}>
                {[['500+','Products'],['40+','Countries'],['2–4wk','Turnaround']].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 800, color: '#111' }}>{v}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)' }}>{l}</div>
                  </div>
                ))}
              </div>

              <button onClick={() => setOpen(true)} style={{
                fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600,
                background: CRIMSON, color: '#fff', padding: '16px 36px', borderRadius: 999,
                border: 'none', cursor: 'pointer', transition: 'all 0.25s',
                boxShadow: '0 8px 24px rgba(17,17,17,0.2)'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(17,17,17,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(17,17,17,0.2)'; }}
              >
                ✦ Create Your Label →
              </button>
            </div>

            {/* RIGHT — Animated SVG Packet */}
            <div className="plb-svg-wrap" style={{ display: 'flex', justifyContent: 'center' }}>
              <HeroPacketSVG
                brand={brand}
                icon={product.icon}
                palette={palette}
                onClick={() => setOpen(true)}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Backdrop ── */}
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
          zIndex: 999, backdropFilter: 'blur(3px)'
        }}/>
      )}

      {/* ── Slide-in Panel ── */}
      <div ref={panelRef} className="plb-panel">

        {/* Header */}
        <div style={{
          padding: 'clamp(18px,3vw,28px)', borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0
        }}>
          <MiniPacket brand={brand} icon={product.icon} palette={palette}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: CRIMSON, marginBottom: 4 }}>
              BRAND BUILDER
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: '#111', margin: 0, lineHeight: 1.1 }}>
              Customise Your Pack
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: isTyping ? '#F59E0B' : '#16A34A',
                boxShadow: isTyping ? '0 0 8px #F59E0B' : '0 0 8px #16A34A',
                transition: 'all 0.3s'
              }}/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.1em' }}>
                {isTyping ? 'UPDATING...' : 'LIVE PREVIEW'}
              </span>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{
            width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.1)',
            background: '#f5f5f5', cursor: 'pointer', fontSize: 16, color: '#555',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>×</button>
        </div>

        {/* Body */}
        <div className="plb-scroll">

          {/* Brand Name */}
          <div style={{ marginBottom: 24 }}>
            <FL n={1} label="Brand Name"/>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="e.g. GOLDEN LEAF" value={brand}
                onChange={e => handleBrand(e.target.value)} maxLength={16}
                style={{
                  width: '100%', padding: '14px 50px 14px 16px', border: '2px solid rgba(0,0,0,0.1)',
                  borderRadius: 12, fontSize: 18, fontFamily: 'var(--font-display)', fontWeight: 700,
                  color: '#111', background: '#fff', outline: 'none', boxSizing: 'border-box',
                  letterSpacing: '0.04em', transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = CRIMSON}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
              />
              <span style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(0,0,0,0.28)'
              }}>{brand.length}/16</span>
            </div>
          </div>

          {/* Product */}
          <div style={{ marginBottom: 24 }}>
            <FL n={2} label="Choose Product"/>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
              {PRODUCTS.map((p,i) => (
                <button key={p.id} className={`plb-prod${productIdx===i?' on':''}`}
                  onClick={() => setProductIdx(i)}>
                  <span style={{ fontSize: 20 }}>{p.icon}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600,
                    color: productIdx===i ? CRIMSON : '#333', textAlign: 'center', lineHeight: 1.3 }}>
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Colour */}
          <div style={{ marginBottom: 24 }}>
            <FL n={3} label="Label Colour"/>
            <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginBottom: 8 }}>
              {PALETTES.map((p,i) => (
                <button key={p.name} className={`plb-swatch${paletteIdx===i?' on':''}`}
                  style={{ background: p.bg }} title={p.name}
                  onClick={() => setPaletteIdx(i)}>
                  {paletteIdx===i && <span style={{ color: p.text, fontSize: 13 }}>✓</span>}
                </button>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'rgba(0,0,0,0.35)', margin: 0 }}>
              {palette.name} palette
            </p>
          </div>

          {/* Size */}
          <div>
            <FL n={4} label="Pack Size"/>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SIZES.map((s,i) => (
                <button key={s} className={`plb-size${sizeIdx===i?' on':''}`}
                  onClick={() => setSizeIdx(i)}>{s}</button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="plb-footer">
          <a href="#contact-form" onClick={() => setOpen(false)} style={{
            flex: 1, textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 14,
            fontWeight: 600, background: CRIMSON, color: '#fff', padding: '15px 20px',
            borderRadius: 999, textDecoration: 'none', transition: 'all 0.25s',
            boxShadow: '0 6px 20px rgba(17,17,17,0.2)'
          }}>
            Get {brand.trim() || 'This'} Made →
          </a>
          <button onClick={() => setOpen(false)} style={{
            padding: '15px 18px', borderRadius: 999, border: '1.5px solid rgba(0,0,0,0.1)',
            background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-sans)',
            fontSize: 13, color: 'rgba(0,0,0,0.45)'
          }}>✕</button>
        </div>
      </div>
    </>
  );
}

function FL({ n, label }: { n: number; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%', background: CRIMSON, color: '#fff',
        fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>{n}</div>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: '#111' }}>{label}</span>
    </div>
  );
}
