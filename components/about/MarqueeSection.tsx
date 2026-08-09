'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CR = '#111111';

// ── 1. LINEAR VELOCITY TEXT MARQUEE ───────────────────────────────────────────
const TEXT_ITEMS = [
  'Farm Direct',
  '★',
  'NABL Certified',
  '★',
  'Cryogenic Grinding',
  '★',
  '50 Years of Trust',
  '★',
  'BRC Tier 2',
  '★',
  '40+ Nations',
  '★',
  'Private Label',
  '★',
  'Steam Sterilized',
  '★',
];

export function VelocityMarquee({ reverse = false, dark = false }: { reverse?: boolean; dark?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let x = 0;
    let speed = reverse ? 0.45 : -0.45;
    let raf: number;
    const totalW = el.scrollWidth / 2;

    function tick() {
      x += speed;
      if (!reverse && x <= -totalW) x = 0;
      if (reverse && x >= 0) x = -totalW;
      el!.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reverse]);

  const items = [...TEXT_ITEMS, ...TEXT_ITEMS];

  return (
    <div style={{ overflow: 'hidden', width: '100%', background: dark ? '#111' : CR, padding: '14px 0', userSelect: 'none' }}>
      <div ref={trackRef} style={{ display: 'flex', gap: 0, width: 'max-content', willChange: 'transform' }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontFamily: item === '★' ? 'serif' : 'var(--font-mono)',
            fontSize: item === '★' ? 12 : 11,
            letterSpacing: item === '★' ? 0 : '0.18em',
            color: dark ? (item === '★' ? CR : 'rgba(248,246,241,0.6)') : (item === '★' ? 'rgba(255,255,255,0.6)' : '#fff'),
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            padding: '0 28px',
            fontWeight: 600,
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── 2. IMAGE MARQUEE ───────────────────────────────────────────────────────────
const MARQUEE_IMAGES = [
  { src: '/images/spices_aerial.png', alt: 'Aerial view of assorted spices' },
  { src: '/images/spice_farm.png', alt: 'Spice farm at golden hour' },
  { src: '/images/factory.png', alt: 'Modern spice factory' },
  { src: '/images/lab.png', alt: 'Quality testing laboratory' },
  { src: '/images/hero-bowl.png', alt: 'Premium spice bowl' },
  { src: '/images/spices_macro.png', alt: 'Macro spice photography' },
  { src: '/images/lv_journey_1.png', alt: 'LV Spices journey' },
  { src: '/images/spice_portrait.png', alt: 'Spice portrait' },
];

export function ImageMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let x = 0;
    let raf: number;
    const totalW = el.scrollWidth / 2;

    function tick() {
      x -= 0.55;
      if (x <= -totalW) x = 0;
      el!.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const imgs = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <div style={{ overflow: 'hidden', width: '100%', background: '#F8F6F1', padding: 'clamp(40px,6vw,80px) 0' }}>
      <div ref={trackRef} style={{ display: 'flex', gap: 16, width: 'max-content', willChange: 'transform' }}>
        {imgs.map((img, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              width: 'clamp(180px,22vw,280px)',
              aspectRatio: '3/4',
              flexShrink: 0,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="280px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


// ── DEFAULT EXPORT — all three together as a section ─────────────────────────
export default function MarqueeSection() {
  return (
    <>
      {/* Velocity marquee — brand red */}
      <div aria-hidden="true">
        <VelocityMarquee />
        <VelocityMarquee reverse />
      </div>

      {/* Image marquee strip */}
      <ImageMarquee />

      {/* Full-width curved loop component from UI library */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingBottom: 'clamp(40px, 6vw, 80px)', paddingTop: 'clamp(40px, 6vw, 80px)' }}>
        <CurvedLoop 
          marqueeText="FARM FRESH • EXPORT EXCELLENCE • QUALITY GUARANTEED • "
          speed={1.5}
          curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
        {/* Absolute center label - pushed up to avoid overlap with the smile curve */}
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
           <text style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-display)', color: CR, fontWeight: 800 }}>LV</text>
           <text style={{ fontSize: 'clamp(9px, 1vw, 14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>
    </>
  );
}
