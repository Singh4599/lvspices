'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import ScrollExpansionHero from '@/components/ui/ScrollExpansionHero';
import ScrollReveal, { StaggerReveal, AnimatedStat } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ParallaxCard from '@/components/ui/ParallaxCard';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

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

function TechImage({ src, alt }: { src: string; alt: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 0.65,
        },
      });

      tl.fromTo('.gsap-img-inner',
        { scale: 1.2, filter: 'brightness(0.7)' },
        { scale: 1, filter: 'brightness(1)', duration: 1.1, ease: 'power2.out' }, 0
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: 'clamp(320px, 40vw, 520px)', overflow: 'hidden', borderRadius: 20, position: 'relative', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="gsap-img-inner" style={{ position: 'absolute', inset: -20 }}>
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 60px rgba(0,0,0,0.1)', pointerEvents: 'none' }} />
    </div>
  );
}

export default function TechnologyPage() {
  const [activeMillingLine, setActiveMillingLine] = useState(0);

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <ScrollExpansionHero
        badge="Our Capabilities"
        headingText="Precision"
        headingRed="Technology"
        subText="LV Spices was among the first Indian exporters to adopt fully automated seed cleaning and cryogenic grinding. Innovation is in our DNA."
        imageSrc="/images/tech_cfg.png"
        stats={[
          { value: '7+', label: 'Plants' },
          { value: '80k mts', label: 'Annual Capacity' },
          { value: '100k sqft', label: 'Built-up Area' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE DIVIDER ══════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ PARALLAX SECTION ═════════════════════════════════ */}
      <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)', background: '#fff' }}>
        <ParallaxCard
          imageSrc="/images/tech_milling.png"
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
      <section id="seed-cleaning" style={{ padding: 'clamp(60px,8vw,120px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 500px' }}>
             <TechImage src="/images/tech_seed_cleaning.png" alt="High-tech Seed Cleaning Optical Sorting" />
          </div>
          <ScrollReveal fromY={20} style={{ flex: '1 1 400px' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 12 }}>Step 01</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 24px' }}>Seed Cleaning</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, marginBottom: 20 }}>
              This line has been consistently upgraded since the mid-90s — adapting to the latest global seed cleaning technology. Different kinds of seeds can be separated when they differ in one or more physical characteristics.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, marginBottom: 32 }}>
              The line primarily removes farm admixtures, insect excreta, potential allergens, and ferrous/non-ferrous contaminants using Sifters, De-Stoners, Spirals, Gravity Separators, and the latest A+ Multivision Sortex with online Metal Detectors.
            </p>
            <div style={{ background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.2)', borderRadius: 16, padding: '24px 28px' }}>
              <div style={{ fontFamily: SANS, fontSize: 13, color: CRIMSON, fontWeight: 700, marginBottom: 8 }}>Processing Capacity</div>
              <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: '#111' }}>1 – 3 tons / hour</div>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 8 }}>Per spice seed intended for cleaning</div>
            </div>
          </ScrollReveal>
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
      <section id="milling" style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)', background: '#fff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
          <ScrollReveal fromY={20} style={{ flex: '1 1 400px' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 12 }}>Step 02</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 24px' }}>Milling</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 40px' }}>
              Temperature deltas are critically controlled to prevent overheating — ensuring retention of flavour, negligible SHU loss, ASTA colour, and volatile oil. We have 3 Milling Lines, each tailored for specific product needs.
            </p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
              {millingLines.map((line, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMillingLine(i)}
                  style={{
                    fontFamily: SANS, fontSize: 13, fontWeight: 600, padding: '12px 24px', borderRadius: 999,
                    background: activeMillingLine === i ? CRIMSON : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${activeMillingLine === i ? CRIMSON : 'rgba(0,0,0,0.08)'}`,
                    color: activeMillingLine === i ? '#fff' : 'rgba(0,0,0,0.6)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >{line.label}</button>
              ))}
            </div>

            <div style={{
              background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 20, padding: 'clamp(24px,3vw,32px)',
            }}>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,16px)', color: 'rgba(0,0,0,0.65)', lineHeight: 1.85, margin: 0 }}>
                {millingLines[activeMillingLine].desc}
              </p>
            </div>
          </ScrollReveal>
          
          <div style={{ flex: '1 1 500px' }}>
             <TechImage src="/images/tech_milling.png" alt="Industrial Stainless Steel Milling Equipment" />
          </div>
        </div>
      </section>

      {/* ══ ROASTING ══════════════════════════════════════════ */}
      <section id="roasting" style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 500px' }}>
             <TechImage src="/images/tech_roasting.png" alt="Large Industrial Roasting Drums" />
          </div>
          
          <ScrollReveal fromY={20} style={{ flex: '1 1 400px' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 12 }}>Step 03</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 24px' }}>Roasting</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 40px' }}>
              No Indian Spice Blend is complete without the special roasted flavour. Our dedicated Roasting Line perfectly achieves custom roasted blends to guarantee that extra special taste. It is the responsibility of our R&D Department to prepare recipes and meet specific requirements of custom roast blends.
            </p>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 24,
              background: '#fff', border: '1px solid rgba(172,3,59,0.2)', boxShadow: '0 12px 32px rgba(0,0,0,0.04)',
              borderRadius: 999, padding: '20px 40px',
            }}>
              <span style={{ fontSize: 32 }}>🔥</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>4000 mts/yr</div>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 6 }}>Dedicated Roasting Line Capacity</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ STEAM STERILIZATION ════════════════════════════════ */}
      <section id="steam-sterilization" style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)', background: '#fff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
          <ScrollReveal fromY={20} style={{ flex: '1 1 400px' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 12 }}>Step 04</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 24px' }}>Steam Sterilization</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 24px' }}>
              An environmental-friendly and extremely effective sterilization method yielding a validated 5-log microbial reduction without compromising organoleptic properties.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, marginBottom: 32 }}>
              The process uses high temperature, indirect contact and pre-heating, allowing for good retention of volatile oil and minimal colour changes. Very low micro-results are achieved — especially for seasonings requiring less than 10,000 TPC.
            </p>
            <div style={{
              background: 'rgba(172,3,59,0.04)', border: '1px solid rgba(172,3,59,0.15)',
              borderRadius: 16, padding: '20px 24px',
              fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6,
            }}>
              <span style={{ color: CRIMSON, fontWeight: 700 }}>Post-sterilization packaging</span> takes place in a class 100,000 clean room utilising HEPA filters.
            </div>
          </ScrollReveal>
          
          <div style={{ flex: '1 1 500px' }}>
             <TechImage src="/images/tech_sterilization.png" alt="Advanced Steam Sterilization Chambers" />
          </div>
        </div>
      </section>

      {/* ══ VELOCITY DIVIDER ══════════════════════════════════ */}
      <VelocityMarquee />

      {/* ══ CRYOGENIC GRINDING ════════════════════════════════ */}
      <section id="cryogenic" style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: '#111', color: '#fff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 500px' }}>
             <TechImage src="/images/cryo-dark.png" alt="Cryogenic Grinding" />
          </div>
          
          <ScrollReveal fromY={20} style={{ flex: '1 1 400px' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D0375C', marginBottom: 12 }}>Step 05</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 24px' }}>Cryogenic Grinding</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, margin: '0 0 48px' }}>
              Cryogenic grinding at -150°C preserves 40% more essential oils, colour, and aroma than conventional ambient grinding — making it the gold standard for premium spice processing.
            </p>

            <StaggerReveal style={{ display: 'flex', flexDirection: 'column', gap: 16 }} stagger={0.1}>
              {cryo.map(s => (
                <div key={s.stat} style={{
                  display: 'flex', alignItems: 'center', gap: 24,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16, padding: '24px 28px',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(172,3,59,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(172,3,59,0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                >
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 3.5vw, 40px)', fontWeight: 700, color: '#D0375C', minWidth: 100 }}>{s.stat}</div>
                  <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{s.label}</div>
                </div>
              ))}
            </StaggerReveal>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ CFG TECHNOLOGY ════════════════════════════════════ */}
      <section id="cfg" style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 'clamp(40px, 8vw, 100px)', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
          <ScrollReveal fromY={20} style={{ flex: '1 1 400px' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 12 }}>Step 06</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 24px' }}>CFG Technology</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, marginBottom: 24 }}>
              Our Continuous Flow Grinding (CFG) process is the most advanced spice processing technology in India — combining precision milling with inline quality monitoring.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, marginBottom: 24 }}>
              CFG eliminates batch-to-batch variation by continuously feeding, grinding, and classifying spices in a closed-loop system. Real-time sensor feedback adjusts process parameters automatically. The system is validated under FDA 21 CFR Part 117 FSMA standards and is GMP-compliant.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 24px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.2)', borderRadius: 999 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: CRIMSON }} />
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.15em', color: CRIMSON, fontWeight: 700 }}>FDA 21 CFR Validated</span>
            </div>
          </ScrollReveal>
          
          <div style={{ flex: '1 1 500px' }}>
             <TechImage src="/images/tech_cfg.png" alt="CFG Technology Control Panel" />
          </div>
        </div>
      </section>

    </main>
  );
}
