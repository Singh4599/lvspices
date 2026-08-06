'use client';

import { useEffect, useRef, useState } from 'react';

const CR    = '#AC033B';
const INK   = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

const STATS = [
  { value: 40, suffix: '+', label: 'Countries Reached', sub: 'Across 6 continents', color: '#AC033B', pct: 0.82 },
  { value: 50, suffix: '+', label: 'Years in Business', sub: 'Decades of expertise', color: '#1A3F6B', pct: 0.90 },
  { value: 48, suffix: '+', label: 'Global Partners', sub: 'Brands that trust us', color: '#1A6B5A', pct: 0.75 },
  { value: 99, suffix: '%', label: 'On-Time Delivery', sub: 'Across all shipments', color: '#C8860C', pct: 0.99 },
];

const QUOTES = [
  { flag: '🇳🇿', country: 'New Zealand', role: 'Purchase Director', text: 'Consistently impressed by their professionalism and efficiency. Fast response times and commitment to excellence have made our partnership a seamless experience.' },
  { flag: '🇺🇸', country: 'USA', role: 'Grocery Distributor', text: 'We are very pleased with the quality supplied by LV Spices. We sincerely appreciate your responsiveness and look forward to doing business with you for years to come.' },
  { flag: '🇩🇪', country: 'Germany', role: 'FMCG Distributor', text: 'Quality and packaging were exceptional. We placed our annual contract within one month. LV Spices is now our exclusive spice supplier for the European market.' },
  { flag: '🇦🇺', country: 'Australia', role: 'Health Food Brand', text: 'LV stands out for their traceability systems. Every batch comes with a full COA and farm-level records. That transparency is priceless for us.' },
  { flag: '🇬🇧', country: 'UK', role: 'Retail Brand Owner', text: 'Their knowledge of UK and EU regulatory requirements is second to none among Indian exporters. Every shipment is perfectly documented.' },
  { flag: '🇨🇦', country: 'Canada', role: 'Wholesale Distributor', text: 'We rely on dependable service from suppliers like LV Spices to help us keep our schedule and satisfy our customers. Thank you for your timely deliveries.' },
];

/* ── Animated Ring SVG ──────────────────────────────────── */
function RingStat({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<SVGCircleElement>(null);
  const R = 52, C = 2 * Math.PI * R;
  const offset = C * (1 - progress * stat.pct);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setProgress(1), delay); io.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current.closest('div')!);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* SVG ring */}
      <div style={{ position: 'relative', width: 128, height: 128 }}>
        <svg width="128" height="128" viewBox="0 0 128 128">
          {/* Track */}
          <circle cx="64" cy="64" r={R} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8"/>
          {/* Animated fill */}
          <circle
            ref={ref}
            cx="64" cy="64" r={R} fill="none"
            stroke={stat.color} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            transform="rotate(-90 64 64)"
            style={{ transition: `stroke-dashoffset ${1.2 + delay * 0.001}s cubic-bezier(0.4,0,0.2,1)` }}
          />
          {/* Glow dot */}
          {progress > 0 && (
            <circle
              cx={64 + R * Math.cos((2 * Math.PI * stat.pct - Math.PI / 2))}
              cy={64 + R * Math.sin((2 * Math.PI * stat.pct - Math.PI / 2))}
              r="5" fill={stat.color}
              style={{ filter: `drop-shadow(0 0 6px ${stat.color})` }}
            />
          )}
        </svg>
        {/* Center value */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 900, color: INK, lineHeight: 1 }}>
            {stat.value}{stat.suffix}
          </span>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: INK }}>{stat.label}</div>
        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.4)', marginTop: 4, textTransform: 'uppercase' }}>{stat.sub}</div>
      </div>
    </div>
  );
}

/* ── Quote card ─────────────────────────────────────────── */
function QuoteCard({ q }: { q: typeof QUOTES[0] }) {
  return (
    <div style={{
      flexShrink: 0, width: 'clamp(280px,28vw,340px)',
      background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
      borderRadius: 20, padding: '28px 28px 24px',
      display: 'flex', flexDirection: 'column', gap: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 26 }}>{q.flag}</span>
        <div>
          <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: INK }}>{q.country}</div>
          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase' }}>{q.role}</div>
        </div>
        {/* Quote mark SVG */}
        <svg width="28" height="22" viewBox="0 0 28 22" fill="none" style={{ marginLeft: 'auto', opacity: 0.12 }}>
          <path d="M0 22V12.4C0 8.4 1.067 5.133 3.2 2.6 5.333.0667 8.133-.933 11.6.667L10.4 3.467C8.667 2.8 7.2 2.8 6 3.467 4.8 4.133 4 5.4 3.6 7.267H7.6V22H0ZM16.4 22V12.4C16.4 8.4 17.467 5.133 19.6 2.6 21.733.0667 24.533-.933 28 .667L26.8 3.467C25.067 2.8 23.6 2.8 22.4 3.467 21.2 4.133 20.4 5.4 20 7.267H24V22H16.4Z" fill={CR}/>
        </svg>
      </div>
      <p style={{
        fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.65)',
        lineHeight: 1.75, margin: 0, fontStyle: 'italic', flexGrow: 1,
      }}>
        "{q.text}"
      </p>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 14,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: CR }} />
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: CR }}>Verified Client</span>
      </div>
    </div>
  );
}

export default function WorldTestimonialsMap() {
  const trackRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll the quote track */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame: number;
    let paused = false;
    const scroll = () => {
      if (!paused) {
        el.scrollLeft += 0.6;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      frame = requestAnimationFrame(scroll);
    };
    frame = requestAnimationFrame(scroll);
    el.addEventListener('mouseenter', () => { paused = true; });
    el.addEventListener('mouseleave', () => { paused = false; });
    el.addEventListener('touchstart', () => { paused = true; });
    el.addEventListener('touchend', () => { setTimeout(() => { paused = false; }, 2000); });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section style={{ background: '#FAFAF8', padding: 'clamp(72px,9vw,120px) 0' }}>

      {/* ── Heading ─────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)', padding: '0 clamp(24px,5vw,80px)' }}>
        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
          Trust By Numbers
        </div>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: 0 }}>
          Built On <em style={{ fontStyle: 'italic', color: CR }}>Decades of Trust</em>
        </h2>
      </div>

      {/* ── Animated ring stats grid ─────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
        gap: 'clamp(24px,4vw,56px)',
        maxWidth: 900, margin: '0 auto clamp(64px,8vw,96px)',
        padding: '0 clamp(24px,5vw,80px)',
      }}>
        {STATS.map((s, i) => <RingStat key={i} stat={s} delay={i * 180} />)}
      </div>

      {/* ── Quote cards auto-scroll track ───────────── */}
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
          background: 'linear-gradient(to right, #FAFAF8, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 80,
          background: 'linear-gradient(to left, #FAFAF8, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}/>
        <div
          ref={trackRef}
          style={{
            display: 'flex', gap: 20,
            overflowX: 'auto', scrollbarWidth: 'none',
            padding: '16px clamp(24px,5vw,80px) 24px',
          }}
        >
          {/* Double the cards for seamless loop */}
          {[...QUOTES, ...QUOTES].map((q, i) => <QuoteCard key={i} q={q} />)}
        </div>
      </div>

      {/* ── Decorative SVG divider ───────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(40px,5vw,64px)', padding: '0 clamp(24px,5vw,80px)' }}>
        <svg width="100%" viewBox="0 0 900 40" fill="none" preserveAspectRatio="none" style={{ maxWidth: 900, height: 40 }}>
          <line x1="0" y1="20" x2="380" y2="20" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
          <circle cx="450" cy="20" r="16" fill={CR} fillOpacity="0.08"/>
          <circle cx="450" cy="20" r="6" fill={CR}/>
          <line x1="520" y1="20" x2="900" y2="20" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
          <circle cx="450" cy="20" r="24" stroke={CR} strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4"/>
        </svg>
      </div>
    </section>
  );
}
