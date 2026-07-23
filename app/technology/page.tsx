'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import PageHero from '@/components/ui/PageHero';
import ScrollReveal, { StaggerReveal, AnimatedStat } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ParallaxCard from '@/components/ui/ParallaxCard';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const NAV_TABS = [
  { id: 'seed-cleaning', label: 'Seed Cleaning' },
  { id: 'milling', label: 'Milling' },
  { id: 'roasting', label: 'Roasting' },
  { id: 'steam-sterilization', label: 'Steam Sterilization' },
  { id: 'cryogenic', label: 'Cryogenic Grinding' },
  { id: 'cfg', label: 'CFG Technology' },
];

const millingLines = [
  {
    label: 'Milling Line 1',
    desc: 'With an annual capacity of 4000 mts, this robust milling line is designed to handle hard, low fibre spice like Fenugreek, Turmeric, and Ginger.',
  },
  {
    label: 'Milling Line 2',
    desc: 'Our second milling line is dedicated to heat-sensitive spices — Chilli, Coriander, Cumin, and Cardamom. This line operates at lower RPM with enhanced cooling. Capacity: 3500 mts/year.',
  },
  {
    label: 'Milling Line 3',
    desc: 'The third line specialises in ultra-fine grinding for masala blends requiring 60–100 mesh particle size consistency at 3000 mts/year.',
  },
];

const overviewStats = [
  { val: 7, suffix: '+', label: 'Manufacturing Units' },
  { val: 100000, suffix: '+', label: 'SqFt Built-up Area' },
  { val: 80000, suffix: '+', label: 'Mts Annual Capacity' },
];

const cryo = [
  { stat: '-150°C', label: 'Operating Temperature' },
  { stat: '40%', label: 'More Essential Oils Retained' },
  { stat: '5-Log', label: 'Microbial Reduction' },
];

export default function TechnologyPage() {
  const [activeTab, setActiveTab] = useState('seed-cleaning');
  const [activeMillingLine, setActiveMillingLine] = useState(0);
  const [navSticky, setNavSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) setNavSticky(navRef.current.getBoundingClientRect().top <= 64);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <PageHero
        tag="Our Capabilities"
        heading="Precision"
        headingRed="Technology"
        subCopy="LV Spices was among the first Indian exporters to adopt fully automated seed cleaning and cryogenic grinding. Innovation is in our DNA."
        imageSrc="/images/factory.png"
        imageAlt="LV Spices Technology"
        overlay="gradient-up"
        stats={[
          { value: '7+', label: 'Plants' },
          { value: '80k mts', label: 'Annual Capacity' },
          { value: '100k sqft', label: 'Built-up Area' },
        ]}
      />

      {/* ══ STICKY NAV ════════════════════════════════════════ */}
      <div ref={navRef} style={{
        position: 'sticky', top: 64, zIndex: 30,
        background: navSticky ? 'rgba(0,0,0,0.97)' : '#0a0a0a',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        transition: 'background 0.3s',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', overflowX: 'auto' }}>
          {NAV_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              style={{
                fontFamily: SANS, fontSize: 13, fontWeight: 500,
                padding: '18px clamp(16px,2.5vw,36px)',
                background: activeTab === tab.id ? CRIMSON : 'transparent',
                color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.45)',
                border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.25s',
                borderBottom: activeTab === tab.id ? `2px solid ${CRIMSON}` : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══ VELOCITY MARQUEE DIVIDER ══════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ PARALLAX SECTION ═════════════════════════════════ */}
      <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)', background: '#fff' }}>
        <ParallaxCard
          imageSrc="/images/factory.png"
          tilt={false}
          parallaxStrength={0.2}
          style={{ height: 'clamp(300px, 40vh, 500px)', width: '100%', borderRadius: 24, border: 'none' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)', zIndex: 1 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: 'clamp(32px, 6vw, 80px)', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffb3c6', marginBottom: 16 }}>Our Commitment</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', margin: 0, lineHeight: 1.1, maxWidth: 600 }}>Driven By Innovation</h2>
          </div>
        </ParallaxCard>
      </div>

      {/* ══ OVERVIEW ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Overview</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700, color: '#111', letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              Setting The Standard for<br />Spice Processing
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.8, marginBottom: 12 }}>
              LV Spices was among the first Indian exporters to adopt fully automated seed cleaning and cryogenic grinding equipment. Our commitment to precision technology ensures we remain a trusted global processing hub.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.8, margin: '0 0 56px' }}>
              Spread across 7+ units with a built-up area of 100,000 sq. ft., we produce over 80,000 mts annually. Our automated systems reduce human intervention and ensure maximum safety and product integrity.
            </p>
          </ScrollReveal>

          {/* Stats with animated counters */}
          <StaggerReveal stagger={0.12}>
            {overviewStats.map(s => (
              <div key={s.label} style={{
                background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.18)',
                borderRadius: 20, padding: 'clamp(24px,3vw,40px) clamp(28px,4vw,52px)',
                display: 'inline-flex', alignItems: 'center', gap: 20,
                minWidth: 'clamp(200px,22vw,260px)', margin: '8px',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(172,3,59,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(172,3,59,0.18)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.04em' }}>
                    <AnimatedStat value={s.val} suffix={s.suffix} label={s.label} />
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginTop: 8 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ SEED CLEANING ══════════════════════════════════════ */}
      <section id="seed-cleaning" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 12 }}>Step 01</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 12px' }}>Seed Cleaning</h2>
            <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.45)', textAlign: 'center', margin: '0 0 48px', maxWidth: 620, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
              This line has been consistently upgraded since the mid-90s — adapting to the latest global seed cleaning technology.
            </p>
          </ScrollReveal>

          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap' }}>
            <ScrollReveal fromY={20} style={{ flex: '0 0 clamp(260px,40vw,480px)', borderRadius: 4, overflow: 'hidden', position: 'relative', height: 320 }}>
              <Image src="/images/farm.png" alt="Seed Cleaning" fill style={{ objectFit: 'cover', transition: 'transform 0.6s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.15), transparent)' }} />
            </ScrollReveal>

            <ScrollReveal fromY={20} delay={0.1} style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, marginBottom: 20 }}>
                Different kinds of seeds can be separated when they differ in one or more physical characteristics. The line primarily removes farm admixtures, insect excreta, potential allergens, and ferrous/non-ferrous contaminants.
              </p>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, marginBottom: 32 }}>
                The Buhler line uses Sifters, De-Stoners, Spirals, Indent Cylinders, Gravity Separators, and the latest A+ Multivision Sortex with online Metal Detectors.
              </p>
              <div style={{ background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.2)', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ fontFamily: SANS, fontSize: 13, color: CRIMSON, fontWeight: 700, marginBottom: 4 }}>Processing Capacity</div>
                <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: '#111' }}>1 – 3 tons / hour</div>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginTop: 4 }}>Per spice seed intended for cleaning</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ CURVED LOOP ════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingBottom: 'clamp(40px, 6vw, 80px)', paddingTop: 'clamp(40px, 6vw, 80px)' }}>
        <CurvedLoop 
          marqueeText="STATE OF THE ART • ADVANCED PROCESSING • HYGIENE FIRST • "
          speed={1.5}
          curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
           <text style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
           <text style={{ fontSize: 'clamp(9px, 1vw, 14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>

      {/* ══ MILLING ════════════════════════════════════════════ */}
      <section id="milling" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/factory.png" alt="Milling" fill style={{ objectFit: 'cover', opacity: 0.08 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.9) 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 12 }}>Step 02</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 20px' }}>Milling</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.8, margin: '0 0 40px', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
              Temperature deltas are critically controlled to prevent overheating — ensuring retention of flavour, negligible SHU loss, ASTA colour, and volatile oil. We have 3 Milling Lines, each for a specific product need.
            </p>
          </ScrollReveal>

          {/* Milling Line Tabs */}
          <ScrollReveal fromY={20} delay={0.15}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
              {millingLines.map((line, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMillingLine(i)}
                  style={{
                    fontFamily: SANS, fontSize: 13, fontWeight: 500, padding: '10px 24px', borderRadius: 999,
                    background: activeMillingLine === i ? CRIMSON : 'rgba(0,0,0,0.07)',
                    border: `1px solid ${activeMillingLine === i ? CRIMSON : 'rgba(0,0,0,0.15)'}`,
                    color: activeMillingLine === i ? '#fff' : 'rgba(0,0,0,0.6)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >{line.label}</button>
              ))}
            </div>

            <div style={{
              background: '#111', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: 'clamp(24px,3vw,48px)',
              textAlign: 'left',
            }}>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.85, margin: 0 }}>
                {millingLines[activeMillingLine].desc}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ ROASTING ══════════════════════════════════════════ */}
      <section id="roasting" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)', background: '#fafafa' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 12 }}>Step 03</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 20px' }}>Roasting</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.8, margin: '0 0 40px' }}>
              No Indian Spice Blend is complete without the special roasted flavour. We have a dedicated Roasting Line with a running capacity of 4000 mts/annum — perfectly achieving custom roasted blends to guarantee the extra special taste.
            </p>
          </ScrollReveal>

          <ScrollReveal fromY={20} delay={0.15}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 24,
              background: '#111', border: '1px solid rgba(172,3,59,0.25)',
              borderRadius: 999, padding: '20px 40px', marginBottom: 40,
            }}>
              <span style={{ fontSize: 28 }}>🔥</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: '#fff', lineHeight: 1 }}>4000 mts/annum</div>
                <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Dedicated Roasting Line Capacity</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal fromY={20} delay={0.2}>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.45)', lineHeight: 1.8 }}>
              It is the responsibility of the R&D Department to prepare recipes, meet specific requirements of custom roast blends and run trials matching customer samples.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ STEAM STERILIZATION ════════════════════════════════ */}
      <section id="steam-sterilization" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 12 }}>Step 04</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 16px' }}>Steam Sterilization</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.8, textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
              An environmental-friendly and extremely effective sterilization method yielding a validated 5-log microbial reduction without compromising organoleptic properties.
            </p>
          </ScrollReveal>

          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap' }}>
            <ScrollReveal fromY={20} style={{ flex: '0 0 clamp(260px,40vw,460px)', borderRadius: 4, overflow: 'hidden', position: 'relative', height: 300 }}>
              <Image src="/images/cfg-bg.png" alt="Steam Sterilization" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
            <ScrollReveal fromY={20} delay={0.1} style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.8, marginBottom: 20 }}>
                The process uses high temperature, indirect contact and pre-heating, allowing for good retention of volatile oil and minimal colour changes. Very low micro-results are achieved — especially for seasonings requiring less than 10,000 TPC.
              </p>
              <div style={{
                background: 'rgba(172,3,59,0.05)', border: '1px solid rgba(172,3,59,0.2)',
                borderRadius: 12, padding: '16px 20px',
                fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.55)', lineHeight: 1.6,
              }}>
                <span style={{ color: CRIMSON, fontWeight: 700 }}>Post-sterilization packaging</span> takes place in a class 100,000 clean room utilising HEPA filters.
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ VELOCITY DIVIDER ══════════════════════════════════ */}
      <VelocityMarquee />

      {/* ══ CRYOGENIC GRINDING ════════════════════════════════ */}
      <section id="cryogenic" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#111', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D0375C', textAlign: 'center', marginBottom: 12 }}>Step 05</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#fff', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 16px' }}>Cryogenic Grinding</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
              Cryogenic grinding at -150°C preserves 40% more essential oils, colour, and aroma than conventional ambient grinding — making it the gold standard for premium spice processing.
            </p>
          </ScrollReveal>

          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
            <ScrollReveal fromY={20} style={{ flex: '0 0 clamp(260px,40vw,460px)', borderRadius: 4, overflow: 'hidden', position: 'relative', height: 320 }}>
              <Image src="/images/cryo-dark.png" alt="Cryogenic Grinding" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.2), transparent)' }} />
            </ScrollReveal>
            <StaggerReveal style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 16 }} stagger={0.1}>
              {cryo.map(s => (
                <div key={s.stat} style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14, padding: '20px 24px',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(172,3,59,0.4)'; (e.currentTarget as HTMLElement).style.background = 'rgba(172,3,59,0.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                >
                  <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: '#D0375C', minWidth: 90 }}>{s.stat}</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ══ CFG TECHNOLOGY ════════════════════════════════════ */}
      <section id="cfg" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 12 }}>Step 06</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 16px' }}>CFG Technology</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.8, textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
              Our Continuous Flow Grinding (CFG) process is the most advanced spice processing technology in India — combining precision milling with inline quality monitoring.
            </p>
          </ScrollReveal>

          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap' }}>
            <ScrollReveal fromY={20} style={{ flex: '0 0 clamp(260px,40vw,460px)', borderRadius: 4, overflow: 'hidden', position: 'relative', height: 320 }}>
              <Image src="/images/cfg-bg.png" alt="CFG Technology" fill style={{ objectFit: 'cover' }} />
            </ScrollReveal>
            <ScrollReveal fromY={20} delay={0.1} style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.8, marginBottom: 24 }}>
                CFG eliminates batch-to-batch variation by continuously feeding, grinding, and classifying spices in a closed-loop system. Real-time sensor feedback adjusts process parameters automatically.
              </p>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.8, marginBottom: 24 }}>
                The system is validated under FDA 21 CFR Part 117 FSMA standards and is GMP-compliant — making LV Spices one of very few Indian processors capable of supplying direct to US and EU private label retailers.
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.2)', borderRadius: 999 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: CRIMSON }} />
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', color: CRIMSON, fontWeight: 600 }}>FDA 21 CFR Validated</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </main>
  );
}
