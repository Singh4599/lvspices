'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SketchIcon from './SketchIcon';

const CR = '#111111';

const SERVICES: {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  icon: 'factory' | 'label' | 'globe' | 'flask';
}[] = [
  {
    num: '01',
    title: 'OEM Manufacturing',
    subtitle: 'Bulk Production',
    desc: 'Large-scale spice processing and packaging under your brand. State-of-the-art facilities with full traceability from farm to shipment.',
    tags: ['ISO 22000', 'BRC Certified', 'Custom MOQ'],
    icon: 'factory',
  },
  {
    num: '02',
    title: 'Private Labelling',
    subtitle: 'Launch Your Brand',
    desc: 'End-to-end private label solutions — product formulation, packaging design, and regulatory compliance for global markets.',
    tags: ['Custom Design', 'MOQ 500 Units', 'Global Compliance'],
    icon: 'label',
  },
  {
    num: '03',
    title: 'Bulk Spice Supply',
    subtitle: 'Farm-to-Factory',
    desc: 'Direct sourcing from verified farms across India. Premium quality single-origin and blended spices supplied in bulk to manufacturers worldwide.',
    tags: ['40+ Countries', '500+ Products', 'Cold Chain'],
    icon: 'globe',
  },
  {
    num: '04',
    title: 'Custom Blend Development',
    subtitle: 'R&D Lab Services',
    desc: 'Our in-house food technologists craft custom spice blends to your exact specification — from concept to scale-up in certified lab conditions.',
    tags: ['R&D Lab', 'Recipe IP', 'Stability Testing'],
    icon: 'flask',
  },
];

// ── Sketch border SVG (drawn rectangle around card on hover) ──────────────
function SketchBorder({ active }: { active: boolean }) {
  const pathRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const el = pathRef.current;
    const len = el.getTotalLength?.() ?? 500;
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = active ? '0' : `${len}`;
    gsap.to(el, {
      strokeDashoffset: active ? 0 : len,
      duration: active ? 0.6 : 0.35,
      ease: active ? 'none' : 'power2.in',
    });
  }, [active]);

  return (
    <svg
      style={{ position: 'absolute', inset: -2, width: 'calc(100% + 4px)', height: 'calc(100% + 4px)', pointerEvents: 'none', overflow: 'visible' }}
      fill="none"
    >
      {/* Slightly imperfect rectangle — hand-drawn wobble via path instead of rect */}
      <path
        ref={pathRef as unknown as React.RefObject<SVGPathElement>}
        d="M4,4 L calc(100% - 4px),3 L calc(100% - 3px),calc(100% - 4px) L4,calc(100% - 3px) Z"
        stroke={CR}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 500, strokeDashoffset: 500 }}
      />
    </svg>
  );
}

// Better: use a fixed-path wobbly border instead of calc-in-path
function SketchCardBorder({ active }: { active: boolean }) {
  const rectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!rectRef.current) return;
    const el = rectRef.current;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    gsap.to(el, {
      strokeDashoffset: active ? 0 : len,
      duration: active ? 0.55 : 0.3,
      ease: 'none',
    });
  }, [active]);

  return (
    <svg
      style={{
        position: 'absolute',
        inset: -1,
        width: 'calc(100% + 2px)',
        height: 'calc(100% + 2px)',
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 2,
      }}
      fill="none"
    >
      <rect
        ref={rectRef}
        x="2"
        y="2"
        width="calc(100% - 4px)"
        height="calc(100% - 4px)"
        rx="3"
        stroke={CR}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesList() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hoverState = useRef<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Animate underline SVG under heading — ink draw effect
    if (underlineRef.current) {
      const len = underlineRef.current.getTotalLength?.() ?? 200;
      underlineRef.current.style.strokeDasharray = `${len}`;
      underlineRef.current.style.strokeDashoffset = `${len}`;
      gsap.to(underlineRef.current, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        delay: 0.4,
      });
    }

    const ctx = gsap.context(() => {
      // Header fades in
      gsap.fromTo(headRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        }
      );

      // Cards stagger in
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.65, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
            delay: i * 0.12,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services-list"
      style={{
        background: '#F8F6F1',
        padding: 'clamp(60px,10vw,120px) 0',
        position: 'relative',
      }}
    >
      {/* Section number spine */}
      <div style={{ position: 'absolute', left: 'clamp(16px,3vw,40px)', top: 'clamp(60px,10vw,120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(17,17,17,0.28)', letterSpacing: '0.14em', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>03</span>
        <div style={{ width: 1, height: 56, background: 'rgba(17,17,17,0.12)' }} />
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(64px,8vw,140px)' }}>

        {/* ── Header ── */}
        <div ref={headRef} style={{ opacity: 0, marginBottom: 'clamp(48px,7vw,96px)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 24, height: 1, background: CR }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>What We Offer</span>
          </div>

          {/* Heading with SVG ink underline */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 800, color: '#111', lineHeight: 1.03, letterSpacing: '-0.04em', marginBottom: 8 }}>
              Our Core<br />Services.
            </h2>

            {/* Ink underline drawn under "Services." */}
            <svg
              style={{ position: 'absolute', bottom: -4, left: 0, width: '100%', height: 14, overflow: 'visible' }}
              fill="none"
            >
              {/* Slightly wobbly hand-drawn underline */}
              <path
                ref={underlineRef}
                d="M2 8 Q60 4 120 8 Q180 12 240 7 Q300 4 360 8"
                stroke={CR}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.25"
              />
            </svg>
          </div>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1.1vw,16px)', color: '#6D6962', lineHeight: 1.75, maxWidth: 380, marginTop: 20 }}>
            From farm sourcing to shelf-ready packaging — we cover every step of your spice supply chain.
          </p>
        </div>

        {/* ── Services grid ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(20px,2.5vw,36px)' }}
          className="services-sketch-grid"
        >
          <style>{`
            @media (max-width: 767px) {
              .services-sketch-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.num}
              service={s}
              index={i}
              sectionRef={sectionRef}
              cardRef={el => { cardsRef.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Individual card extracted to allow per-card hover state ──────────────
function ServiceCard({
  service,
  index,
  sectionRef,
  cardRef,
}: {
  service: typeof SERVICES[number];
  index: number;
  sectionRef: React.RefObject<HTMLElement | null>;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const CR = '#111111';
  const rectRef = useRef<SVGRectElement>(null);
  const isHovered = useRef(false);

  function animateBorder(draw: boolean) {
    if (!rectRef.current) return;
    const el = rectRef.current;
    const len = el.getTotalLength();
    gsap.to(el, {
      strokeDashoffset: draw ? 0 : len,
      duration: draw ? 0.55 : 0.3,
      ease: 'none',
      overwrite: true,
    });
  }

  useEffect(() => {
    if (!rectRef.current) return;
    const el = rectRef.current;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: 0,
        padding: 'clamp(28px,3vw,44px)',
        background: '#FFFFFF',
        border: '1px solid rgba(17,17,17,0.08)',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        cursor: 'default',
        transition: 'box-shadow 0.3s, transform 0.3s',
        position: 'relative',
        overflow: 'visible',
      }}
      onMouseEnter={e => {
        isHovered.current = true;
        animateBorder(true);
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 16px 48px rgba(17,17,17,0.08)';
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        isHovered.current = false;
        animateBorder(false);
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Sketch border SVG — drawn on hover */}
      <svg
        style={{
          position: 'absolute',
          inset: -2,
          width: 'calc(100% + 4px)',
          height: 'calc(100% + 4px)',
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 2,
        }}
        fill="none"
      >
        <rect
          ref={rectRef}
          x="2" y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          rx="3"
          stroke={CR}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Number */}
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(17,17,17,0.22)', letterSpacing: '0.2em' }}>
        {service.num}
      </span>

      {/* ── Sketch Icon — drawn on scroll ── */}
      <div style={{ width: 80, height: 80 }}>
        <SketchIcon
          icon={service.icon}
          size={80}
          color={CR}
          strokeWidth={2}
          triggerRef={sectionRef}
          delay={0.2 + index * 0.18}
        />
      </div>

      {/* Subtitle */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: '#6D6962', textTransform: 'uppercase' }}>
        {service.subtitle}
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2vw,30px)', fontWeight: 800, color: '#111', lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
        {service.title}
      </h3>

      {/* Description */}
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(12px,1vw,14px)', color: '#6D6962', lineHeight: 1.8, margin: 0 }}>
        {service.desc}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {service.tags.map(tag => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.14em',
              color: CR,
              textTransform: 'uppercase',
              padding: '4px 10px',
              border: '1px solid rgba(17,17,17,0.15)',
              borderRadius: 40,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
