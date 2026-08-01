'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import CurvedLoop from '@/components/ui/CurvedLoop';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import FactoryBlueprint from '@/components/facilities/FactoryBlueprint';

/* ─────────────────────────────────────────────────
   Design tokens
───────────────────────────────────────────────── */
const CR        = '#AC033B';
const OFF_WHITE = '#F8F6F2';
const INK       = '#1A1915';
const WARM_GRAY = '#8A8580';

/* ─────────────────────────────────────────────────
   Data
───────────────────────────────────────────────── */
const PROCESS_STEPS = [
  { n: '01', label: 'Raw Material',        sub: 'Certified farms',          img: '/images/fac_sorting.png'        },
  { n: '02', label: 'Cleaning',            sub: 'Optical sorting',          img: '/images/fac_hero.png'           },
  { n: '03', label: 'Cryo Grinding',       sub: 'Temperature-locked aroma', img: '/images/fac_cryo.png'           },
  { n: '04', label: 'Steam Sterilisation', sub: '5-log microbial kill',     img: '/images/fac_sterilization.png'  },
  { n: '05', label: 'Laboratory',          sub: 'NABL 500+ tests',          img: '/images/fac_lab.png'            },
  { n: '06', label: 'Packaging',           sub: 'Class 100K clean room',    img: '/images/fac_pack.png'           },
  { n: '07', label: 'Warehouse',           sub: 'Climate-controlled',       img: '/images/fac_warehouse.png'      },
  { n: '08', label: 'Export',              sub: '40+ countries',            img: '/images/fac_aerial.png'         },
];

// Exactly 6 highlight cards
const HIGHLIGHTS = [
  { label: 'Cryogenic Grinding',   caption: 'Temperature-locked. Aroma preserved.',  img: '/images/fac_cryo.png'          },
  { label: 'Steam Sterilisation',  caption: 'Validated microbial reduction.',         img: '/images/fac_sterilization.png' },
  { label: 'Smart Warehouse',      caption: 'Climate-controlled. FIFO managed.',      img: '/images/fac_warehouse.png'     },
  { label: 'NABL Laboratory',      caption: 'ISO/IEC 17025:2017 accredited.',         img: '/images/fac_lab.png'           },
  { label: 'Auto Packaging',       caption: 'Hygienic. Sealed for freshness.',        img: '/images/fac_pack.png'          },
  { label: 'Sorting & Cleaning',   caption: '99.9% physical purity guaranteed.',      img: '/images/fac_sorting.png'       },
];

const METRICS = [
  { label: 'Microbial Safety',    desc: '5-Log kill rate. HTST validated.',    pct: 99.999 },
  { label: 'Heavy Metal Testing', desc: 'Pb, Cd, As, Hg per EU 2023/915.',     pct: 100    },
  { label: 'Pesticide Residues',  desc: '500+ compounds. LC-MS/MS precision.', pct: 100    },
  { label: 'Moisture Control',    desc: 'Inline NIR continuous monitoring.',    pct: 98     },
  { label: 'Aflatoxin Detection', desc: 'HPLC-FD. Below detection limits.',    pct: 99.5   },
  { label: 'Oil Retention',       desc: '40% higher vs ambient grinding.',      pct: 95     },
];

const NUMBERS = [
  { val: 11000, suffix: '+',  label: 'Sq Ft',     sub: 'Total built-up area' },
  { val: 7,     suffix: '+',  label: 'Plants',    sub: 'Processing units'    },
  { val: 80,    suffix: 'K+', label: 'MT / Year', sub: 'Annual output'       },
  { val: 500,   suffix: '+',  label: 'Products',  sub: 'SKUs produced'       },
];

// Exactly 8 cert tiles
const CERTS = [
  { name: 'FSSAI',        detail: 'Lic. 10020042004726'       },
  { name: 'ISO 22000',    detail: 'Food Safety Management'    },
  { name: 'BRCGS',        detail: 'Global Food Standard AA'   },
  { name: 'Halal',        detail: 'Internationally Certified' },
  { name: 'Kosher',       detail: 'Star-K Certified'          },
  { name: 'US FDA',       detail: 'Registered Facility'       },
  { name: 'APEDA',        detail: 'Export Authorized'         },
  { name: 'Spices Board', detail: 'Government of India'       },
];

/* ─────────────────────────────────────────────────
   Shared label pill
───────────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <div style={{ width: 28, height: 1, background: CR }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.30em', textTransform: 'uppercase', color: CR, fontWeight: 600 }}>
        {text}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   S01 — HERO
═══════════════════════════════════════════════ */
function Hero() {
  const secRef   = useRef<HTMLElement>(null);
  const headRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);
  const tagRef   = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bgRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(tagRef.current,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.2);
      tl.fromTo(headRef.current!.children, { y: '110%' }, { y: '0%', duration: 1.1, stagger: 0.09 }, 0.35);
      tl.fromTo(imgRef.current,
        { clipPath: 'inset(10% 6% 10% 6% round 40px)', scale: 1.06 },
        { clipPath: 'inset(0% 0% 0% 0% round 32px)', scale: 1, duration: 1.6, ease: 'power2.out' }, 0.15);
      tl.fromTo(statsRef.current, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.0);
      tl.fromTo('.hero-chips > div', { y: 24, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 }, 1.1);

      // 3-layer parallax
      ScrollTrigger.create({
        trigger: secRef.current,
        start: 'top top', end: '+=90%', scrub: 1.3,
        onUpdate: (self) => {
          const p = self.progress;
          if (bgRef.current)    gsap.set(bgRef.current,    { opacity: 1 - p });
          if (imgRef.current)   gsap.set(imgRef.current,   { scale: 1 + p * 0.06, x: p * -24 });
          if (headRef.current)  gsap.set(headRef.current,  { opacity: 1 - p * 1.8 });
          if (statsRef.current) gsap.set(statsRef.current, { opacity: 1 - p * 2.4 });
          if (tagRef.current)   gsap.set(tagRef.current,   { opacity: 1 - p * 3.0 });
        },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} style={{ background: OFF_WHITE, position: 'relative', overflow: 'hidden', paddingTop: 'clamp(100px,10vw,120px)', paddingBottom: 'clamp(80px,8vw,120px)' }}>
      <div ref={bgRef} style={{ position: 'absolute', inset: '-10%', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '8%', right: '-4%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(172,3,59,0.055) 0%, transparent 68%)' }} />
        <div style={{ position: 'absolute', bottom: '4%', left: '-6%', width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(172,3,59,0.04) 0%, transparent 68%)' }} />
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', padding: '0 clamp(24px,5vw,88px)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 6fr', gap: 'clamp(36px,5vw,72px)', alignItems: 'center' }} className="hero-split">
          <style>{`
            @media(max-width:860px){.hero-split{grid-template-columns:1fr !important;}}
            @media(max-width:860px){.hero-chips{display:none !important;}}
          `}</style>

          <div>
            <div ref={tagRef} style={{ marginBottom: 36, opacity: 0 }}>
              <SectionLabel text="Our Facilities" />
            </div>
            <div ref={headRef}>
              <div style={{ overflow: 'hidden' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,6.5vw,104px)', fontWeight: 800, color: INK, lineHeight: 0.92, letterSpacing: '-0.04em', margin: 0 }}>World-Class</h1>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,6.5vw,104px)', fontWeight: 700, fontStyle: 'italic', color: CR, lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0 }}>Infrastructure.</h1>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.8vw,42px)', fontWeight: 400, fontStyle: 'italic', color: WARM_GRAY, lineHeight: 1.25, letterSpacing: '-0.02em', margin: '14px 0 0' }}>Engineered For Purity.</h2>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.1vw,17px)', color: WARM_GRAY, lineHeight: 1.85, maxWidth: 400, margin: 'clamp(20px,3vw,40px) 0 0' }}>
              Seven manufacturing plants. One uncompromising standard. Every gram produced under the most rigorous food-safety protocols on Earth.
            </p>
            <div ref={statsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 18px', marginTop: 40, opacity: 0 }}>
              {['100% Traceability', 'BRC Grade AA', 'ISO 22000:2018', 'NABL Lab'].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 100, padding: '8px 18px', boxShadow: '0 2px 12px rgba(26,25,21,0.06)' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: CR }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: INK, fontWeight: 500 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', paddingBottom: 'clamp(40px,5vw,64px)', display: 'flex', justifyContent: 'center' }}>
            {/* Image capped like About Us — maxWidth 520px, 3/4 ratio */}
            <div ref={imgRef} style={{ position: 'relative', width: '100%', maxWidth: 380, aspectRatio: '3/4', borderRadius: 28, overflow: 'hidden', clipPath: 'inset(10% 6% 10% 6% round 32px)' }}>
              <Image src="/images/fac_hero.png" alt="LV Spices Manufacturing Floor" fill priority sizes="(max-width:860px) 100vw, 520px" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(26,25,21,0.16) 100%)' }} />
            </div>
            <div className="hero-chips">
              {/* Bottom-left chip */}
              <div style={{ position: 'absolute', bottom: '8%', left: '-4%', background: '#fff', borderRadius: 14, padding: '14px 18px', boxShadow: '0 12px 36px rgba(26,25,21,0.1)', minWidth: 120 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,26px)', fontWeight: 800, color: INK, lineHeight: 1 }}>11,000+</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: WARM_GRAY, marginTop: 5 }}>Sq Ft Area</div>
              </div>
              {/* Top-right chip */}
              <div style={{ position: 'absolute', top: '16%', right: '-4%', background: CR, borderRadius: 14, padding: '14px 18px', boxShadow: '0 12px 36px rgba(172,3,59,0.22)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2vw,26px)', fontWeight: 800, color: '#fff', lineHeight: 1 }}>7+</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginTop: 5 }}>Plants</div>
              </div>
              {/* Mid-right chip */}
              <div style={{ position: 'absolute', bottom: '30%', right: '-5%', background: '#fff', borderRadius: 14, padding: '14px 18px', boxShadow: '0 12px 36px rgba(26,25,21,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,1.6vw,22px)', fontWeight: 800, color: CR, lineHeight: 1 }}>NABL</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: WARM_GRAY, marginTop: 5 }}>Accredited</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TICKER
═══════════════════════════════════════════════ */
function TickerStrip() {
  const tickRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(tickRef.current, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: tickRef.current, start: 'top 95%' } });
  }, []);

  const items = ['ISO 22000:2018', 'FSSC 22000 v6', 'BRC Grade AA', 'NABL ISO/IEC 17025', 'FSSAI', 'Halal Certified', 'Kosher', 'APEDA', 'US FDA', 'EU Compliant', 'Spices Board India'];
  const doubled = [...items, ...items];
  return (
    <div ref={tickRef} style={{ background: CR, padding: '13px 0', overflow: 'hidden', whiteSpace: 'nowrap', opacity: 0 }}>
      <div style={{ display: 'inline-flex', animation: 'facScroll 28s linear infinite', willChange: 'transform' }}>
        {doubled.map((c, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.88)', textTransform: 'uppercase', padding: '0 36px', flexShrink: 0, fontWeight: 500 }}>✦ {c}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   S02 — PROCESS TIMELINE
═══════════════════════════════════════════════ */
function ProcessTimeline() {
  const secRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ptl-head', { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: secRef.current, start: 'top 80%' } });
      gsap.utils.toArray<HTMLElement>('.ptl-step').forEach((el, i) => {
        gsap.fromTo(el, { y: 56, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out', scrollTrigger: { trigger: secRef.current, start: 'top 72%' }, delay: i * 0.07 });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} style={{ background: '#fff', padding: 'clamp(80px,10vw,130px) clamp(24px,4vw,80px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="ptl-head" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px,4vw,60px)', alignItems: 'end', marginBottom: 'clamp(56px,7vw,96px)', opacity: 0 }}>
          <div>
            <SectionLabel text="Core Process" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,76px)', fontWeight: 800, color: INK, letterSpacing: '-0.04em', lineHeight: 1, margin: 0 }}>
              From Raw<br /><em style={{ color: CR, fontStyle: 'italic' }}>To Remarkable.</em>
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.05vw,16px)', color: WARM_GRAY, lineHeight: 1.85, maxWidth: 360, margin: 0 }}>
            Every step is precision-controlled through our 8-stage journey — zero compromise.
          </p>
        </div>

        <div style={{ marginTop: 24, opacity: 0 }} className="ptl-step">
          <FactoryBlueprint />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CURVED LOOP ARC
═══════════════════════════════════════════════ */
function CurvedLoopBreak({ dark = false }: { dark?: boolean }) {
  return (
    <div style={{ position: 'relative', background: dark ? INK : OFF_WHITE, paddingTop: 'clamp(20px,3.5vw,52px)', paddingBottom: 'clamp(60px,10vw,140px)', overflow: 'hidden' }}>
      <CurvedLoop
        marqueeText="NABL ACCREDITED • FSSC 22000 • BRC GRADE AA • FDA REGISTERED • HALAL • KOSHER • APEDA • SPICES BOARD • "
        speed={1.8}
        curveAmount={260}
        className={dark ? 'fill-[rgba(255,255,255,0.45)] uppercase tracking-widest' : 'fill-[rgba(26,25,21,0.45)] uppercase tracking-widest'}
      />
      <div style={{ position: 'absolute', top: '14%', left: '50%', transform: 'translate(-50%,0)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', zIndex: 2 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.2vw,44px)', fontWeight: 800, color: CR, lineHeight: 1 }}>LV</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(7px,0.7vw,11px)', color: dark ? 'rgba(255,255,255,0.5)' : INK, letterSpacing: '0.24em', marginTop: 4 }}>SPICES</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   IMAGE STRIP MARQUEE
═══════════════════════════════════════════════ */
function ImageStripMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const imgs = [
    { src: '/images/fac_hero.png',         alt: 'Processing Floor'   },
    { src: '/images/fac_sorting.png',      alt: 'Sorting Line'       },
    { src: '/images/fac_cryo.png',         alt: 'Cryogenic'          },
    { src: '/images/fac_sterilization.png',alt: 'Sterilisation'      },
    { src: '/images/fac_lab.png',          alt: 'Laboratory'         },
    { src: '/images/fac_pack.png',         alt: 'Packaging'          },
    { src: '/images/fac_warehouse.png',    alt: 'Warehouse'          },
    { src: '/images/fac_aerial.png',       alt: 'Aerial View'        },
  ];
  const doubled = [...imgs, ...imgs];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let x = 0, raf: number;
    const totalW = el.scrollWidth / 2;
    const tick = () => { x -= 0.55; if (x <= -totalW) x = 0; el.style.transform = `translateX(${x}px)`; raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ overflow: 'hidden', background: OFF_WHITE, padding: 'clamp(40px,5vw,72px) 0' }}>
      <div ref={trackRef} style={{ display: 'flex', gap: 18, width: 'max-content', willChange: 'transform' }}>
        {doubled.map((img, i) => (
          <div key={i} style={{ position: 'relative', width: 260, height: 340, flexShrink: 0, borderRadius: 18, overflow: 'hidden' }}>
            <Image src={img.src} alt={img.alt} fill sizes="260px" style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,25,21,0.42) 0%, transparent 52%)' }} />
            <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>{img.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   S03 — 6 HIGHLIGHT CARDS
═══════════════════════════════════════════════ */
function Highlights() {
  const secRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hl-head', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: secRef.current, start: 'top 82%' } });
      gsap.utils.toArray<HTMLElement>('.hl-card').forEach((el, i) => {
        gsap.fromTo(el, { y: 64, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: 'power2.out', scrollTrigger: { trigger: secRef.current, start: 'top 74%' }, delay: i * 0.07 });
        const img = el.querySelector('img');
        if (img) gsap.fromTo(img, { y: 24 }, { y: -24, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.9 } });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} style={{ background: '#fff', padding: 'clamp(80px,10vw,130px) clamp(24px,4vw,80px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="hl-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(40px,5vw,72px)', flexWrap: 'wrap', gap: 24, opacity: 0 }}>
          <div>
            <SectionLabel text="Infrastructure Highlights" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4.2vw,64px)', fontWeight: 800, color: INK, letterSpacing: '-0.04em', lineHeight: 1.06, margin: 0 }}>
              Inside<br />The Plant.
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: WARM_GRAY, lineHeight: 1.8, maxWidth: 340, margin: 0 }}>
            A close look at the facilities that define our quality. Every corner built for precision.
          </p>
        </div>

        {/* 3-column grid, 2 rows — alternating heights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(14px,1.8vw,22px)' }} className="hl-grid">
          <style>{`
            @media(max-width:780px){.hl-grid{grid-template-columns:repeat(2,1fr) !important;}}
            @media(max-width:500px){.hl-grid{grid-template-columns:1fr !important;}}
            .hl-card:hover{box-shadow:0 20px 60px rgba(26,25,21,0.14) !important;}
          `}</style>
          {HIGHLIGHTS.map((item, i) => (
            <div key={i} className="hl-card" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '1/1', opacity: 0, boxShadow: '0 4px 24px rgba(26,25,21,0.06)', transition: 'box-shadow 0.35s ease' }}>
              <Image src={item.img} alt={item.label} fill sizes="(max-width:780px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,25,21,0.68) 0%, rgba(26,25,21,0.08) 48%, transparent 70%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 26px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,1.4vw,19px)', fontWeight: 700, color: '#fff', marginBottom: 5 }}>{item.label}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.68)', fontStyle: 'italic', lineHeight: 1.5 }}>{item.caption}</div>
              </div>
              <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', borderRadius: 100, padding: '4px 12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>0{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   S04 — QUALITY FIRST
═══════════════════════════════════════════════ */
function MetricRow({ label, desc, pct, index }: { label: string; desc: string; pct: number; index: number }) {
  const lineRef = useRef<SVGLineElement>(null);
  const dotRef  = useRef<SVGCircleElement>(null);
  const rowRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const W = 180, target = (pct / 100) * W;
      const st = { trigger: rowRef.current!, start: 'top 90%', once: true };
      gsap.fromTo(lineRef.current, { attr: { x2: 0 } }, { attr: { x2: target }, duration: 1.5, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(dotRef.current,  { attr: { cx: 0 } }, { attr: { cx: target }, duration: 1.5, ease: 'power3.out', scrollTrigger: st });
      gsap.fromTo(rowRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.65, ease: 'power2.out', scrollTrigger: { trigger: rowRef.current!, start: 'top 92%', once: true }, delay: index * 0.08 });
    });
    return () => ctx.revert();
  }, [pct, index]);

  return (
    <div ref={rowRef} style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 24, borderBottom: '1px solid rgba(26,25,21,0.06)', marginBottom: 24, opacity: 0 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(13px,1.1vw,17px)', fontWeight: 700, color: INK, marginBottom: 4 }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: WARM_GRAY, lineHeight: 1.5 }}>{desc}</div>
      </div>
      <div style={{ flexShrink: 0, width: 180 }}>
        <svg width="180" height="18" viewBox="0 0 180 18">
          <line x1="0" y1="9" x2="180" y2="9" stroke="rgba(26,25,21,0.07)" strokeWidth="1" />
          <line ref={lineRef} x1="0" y1="9" x2="0" y2="9" stroke={CR} strokeWidth="1.5" />
          <circle ref={dotRef} cx="0" cy="9" r="4" fill={CR} />
        </svg>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: CR, letterSpacing: '0.1em', textAlign: 'right', marginTop: 3 }}>{pct}%</div>
      </div>
    </div>
  );
}

function QualityFirst() {
  const secRef      = useRef<HTMLElement>(null);
  const imgWrapRef  = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imgWrapRef.current, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: secRef.current, start: 'top 72%' } });
      gsap.fromTo(imgInnerRef.current, { y: 36 }, { y: -36, ease: 'none', scrollTrigger: { trigger: secRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.fromTo(textRef.current, { x: 56, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: secRef.current, start: 'top 74%' } });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} style={{ background: OFF_WHITE, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'clamp(520px,60vw,780px)', alignItems: 'stretch' }} className="qf-grid">
        <style>{`@media(max-width:860px){.qf-grid{grid-template-columns:1fr !important;}}`}</style>
        <div style={{ position: 'relative', minHeight: 'clamp(380px,48vw,100%)', overflow: 'hidden' }}>
          <div ref={imgWrapRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', clipPath: 'inset(0 100% 0 0)' }}>
            <div ref={imgInnerRef} style={{ position: 'absolute', inset: '-7%' }}>
              <Image src="/images/fac_lab.png" alt="NABL Accredited Laboratory" fill sizes="50vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
        <div ref={textRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(48px,7vw,96px) clamp(36px,5vw,72px)', opacity: 0 }}>
          <SectionLabel text="Quality First" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,3.8vw,56px)', fontWeight: 800, color: INK, letterSpacing: '-0.04em', lineHeight: 1.06, margin: '0 0 14px' }}>
            Every Batch.<br /><em style={{ color: CR, fontStyle: 'italic' }}>Scientifically Verified.</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px,1vw,15px)', color: WARM_GRAY, lineHeight: 1.85, margin: '0 0 36px', maxWidth: 380 }}>
            Our NABL-accredited laboratory runs 500+ compound analyses on every lot. No batch leaves without a full Certificate of Analysis.
          </p>
          <div>
            {METRICS.map((m, i) => <MetricRow key={m.label} label={m.label} desc={m.desc} pct={m.pct} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   S05 — NUMBERS
═══════════════════════════════════════════════ */
function AnimatedCounter({ val, suffix, duration = 1.9 }: { val: number; suffix: string; duration?: number }) {
  const spanRef   = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (spanRef.current) spanRef.current.textContent = val.toLocaleString() + suffix;
      return;
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: spanRef.current, start: 'top 86%', once: true, onEnter: () => {
        if (triggered.current) return; triggered.current = true;
        gsap.fromTo({ n: 0 }, { n: val }, { duration, ease: 'power2.out', onUpdate: function () { if (spanRef.current) spanRef.current.textContent = Math.round(this.targets()[0].n).toLocaleString() + suffix; } });
      }});
    });
    return () => ctx.revert();
  }, [val, suffix, duration]);
  return <span ref={spanRef}>0{suffix}</span>;
}

function FacilityNumbers() {
  const secRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fn-item').forEach((el, i) => {
        gsap.fromTo(el, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: secRef.current, start: 'top 76%' }, delay: i * 0.1 });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} style={{ background: '#fff', padding: 'clamp(90px,11vw,160px) clamp(24px,5vw,88px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="fn-item" style={{ marginBottom: 'clamp(56px,7vw,100px)', opacity: 0 }}>
          <SectionLabel text="Scale & Capacity" />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,7vw,100px)' }}>
          {NUMBERS.map(n => (
            <div key={n.label} className="fn-item" style={{ opacity: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,7.5vw,120px)', fontWeight: 800, color: INK, lineHeight: 0.85, letterSpacing: '-0.05em' }}>
                <AnimatedCounter val={n.val} suffix={n.suffix} />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.2vw,32px)', fontWeight: 600, color: CR, fontStyle: 'italic', marginTop: 10, marginBottom: 5 }}>{n.label}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: WARM_GRAY }}>{n.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   S06 — 8 CERT TILES
═══════════════════════════════════════════════ */
function CertWall() {
  const secRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.cw-head', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: secRef.current, start: 'top 80%' } });
      gsap.utils.toArray<HTMLElement>('.cw-tile').forEach((el, i) => {
        gsap.fromTo(el, { y: 36, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out', scrollTrigger: { trigger: secRef.current, start: 'top 72%' }, delay: i * 0.055 });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} style={{ background: OFF_WHITE, padding: 'clamp(80px,10vw,130px) clamp(24px,4vw,80px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="cw-head" style={{ marginBottom: 'clamp(44px,5.5vw,72px)', opacity: 0 }}>
          <SectionLabel text="Certified Excellence" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4.2vw,64px)', fontWeight: 800, color: INK, letterSpacing: '-0.04em', lineHeight: 1.06, margin: 0 }}>
            Built To The<br />Highest Standard.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(14px,1.8vw,22px)' }} className="cw-grid">
          <style>{`
            @media(max-width:780px){.cw-grid{grid-template-columns:repeat(2,1fr) !important;}}
            .cw-tile:hover{box-shadow:0 10px 40px rgba(26,25,21,0.1) !important;transform:translateY(-3px);}
          `}</style>
          {CERTS.map((c, i) => (
            <div key={i} className="cw-tile" style={{ background: '#fff', borderRadius: 18, padding: 'clamp(24px,2.8vw,36px)', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 14px rgba(26,25,21,0.04)', opacity: 0, border: '1px solid rgba(26,25,21,0.05)', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.2vw,28px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', marginBottom: 8 }}>{c.name}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: WARM_GRAY, lineHeight: 1.55 }}>{c.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   S07 — SUSTAINABILITY
═══════════════════════════════════════════════ */
function Sustainability() {
  const secRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.sus-head', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: secRef.current, start: 'top 80%' } });
      gsap.fromTo(imgRef.current, { y: 36 }, { y: -56, ease: 'none', scrollTrigger: { trigger: secRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.3 } });
      gsap.utils.toArray<HTMLElement>('.sus-pin').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.55, scrollTrigger: { trigger: secRef.current, start: 'top 65%' }, delay: i * 0.09 });
      });
      gsap.utils.toArray<HTMLElement>('.sus-stat').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: el, start: 'top 90%' }, delay: i * 0.1 });
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  const pins = [
    { label: 'Solar Roof',           x: '22%', y: '18%' },
    { label: 'Rainwater Harvesting', x: '68%', y: '12%' },
    { label: 'Zero Waste',           x: '15%', y: '62%' },
    { label: 'Water Recycling',      x: '76%', y: '58%' },
    { label: 'Energy Efficient',     x: '47%', y: '76%' },
  ];

  return (
    <section ref={secRef} style={{ background: '#fff', padding: 'clamp(80px,10vw,130px) clamp(24px,4vw,80px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="sus-head" style={{ marginBottom: 40, opacity: 0 }}>
          <SectionLabel text="Sustainability" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4.2vw,64px)', fontWeight: 800, color: INK, letterSpacing: '-0.04em', lineHeight: 1.06, margin: 0 }}>
            Built For<br /><em style={{ color: CR, fontStyle: 'italic' }}>Tomorrow.</em>
          </h2>
        </div>
        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '16/7' }}>
          <div ref={imgRef} style={{ position: 'absolute', inset: '-7%' }}>
            <Image src="/images/fac_aerial.png" alt="LV Spices campus aerial view" fill sizes="100vw" style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,25,21,0.17)' }} />
          </div>
          {pins.map((p, i) => (
            <div key={i} className="sus-pin" style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)', opacity: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(26,25,21,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '10px 18px', whiteSpace: 'nowrap', boxShadow: '0 12px 32px rgba(0,0,0,0.2)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: CR, boxShadow: `0 0 10px ${CR}` }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', fontWeight: 600, color: '#fff', textTransform: 'uppercase' }}>{p.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(28px,4.5vw,72px)', marginTop: 44 }}>
          {[{ val: '100%', label: 'Renewable Energy Target' }, { val: 'Zero', label: 'Effluent Discharge' }, { val: '40%', label: 'Water Recycled' }, { val: '500KW', label: 'Solar Capacity' }].map((s, i) => (
            <div key={i} className="sus-stat" style={{ textAlign: 'center', opacity: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3.2vw,44px)', fontWeight: 800, color: INK, letterSpacing: '-0.04em' }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: WARM_GRAY, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   S08 — FACTORY VISIT CTA
═══════════════════════════════════════════════ */
function FactoryVisit() {
  const secRef = useRef<HTMLElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(txtRef.current, { y: 38, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: secRef.current, start: 'top 72%' } });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} style={{ background: OFF_WHITE, padding: 'clamp(80px,10vw,130px) clamp(24px,4vw,80px)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div ref={txtRef} style={{ textAlign: 'center', opacity: 0 }}>
          <SectionLabel text="Factory Visit" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5.5vw,88px)', fontWeight: 800, color: INK, letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 20px' }}>
            See Where<br /><em style={{ color: CR, fontStyle: 'italic' }}>Quality Begins.</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.2vw,18px)', color: WARM_GRAY, lineHeight: 1.8, maxWidth: 480, margin: '0 auto 36px' }}>
            We welcome auditors, buyers, and partners to our plants. Experience the infrastructure behind every shipment.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: INK, color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, padding: '17px 42px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.02em' }}>
            Book A Factory Visit
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE ASSEMBLY
═══════════════════════════════════════════════ */
export default function FacilitiesPage() {
  return (
    <main style={{ background: '#fff', color: INK, overflowX: 'hidden' }}>
      <Hero />
      <TickerStrip />
      <ProcessTimeline />
      <CurvedLoopBreak dark={false} />
      <VelocityMarquee dark={false} />
      <VelocityMarquee reverse dark={false} />
      <ImageStripMarquee />
      <Highlights />
      <CurvedLoopBreak dark={false} />
      <QualityFirst />
      <FacilityNumbers />
      <CertWall />
      <Sustainability />
      <FactoryVisit />
      <style>{`
        @keyframes facScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
