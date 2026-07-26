'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ScrollExpansionHero from '@/components/ui/ScrollExpansionHero';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ParallaxCard from '@/components/ui/ParallaxCard';
import CurvedLoop from '@/components/ui/CurvedLoop';
import { gsap } from '@/lib/gsap';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const processSteps = [
  { num: '01', title: 'Raw Material Procurement', desc: 'Spices sourced directly from finest farms across India — Rajasthan, M.P., Gujarat, and Kerala — ensuring full farm-to-shelf traceability.', img: '/images/farm.png' },
  { num: '02', title: '360° Inspection & Testing', desc: 'Every incoming lot undergoes 360° physical and chemical inspection in our NABL-accredited in-house laboratory before entering production.', img: '/images/lab.png' },
  { num: '03', title: 'Automated Cleaning & Sorting', desc: 'State-of-the-art automated cleaning and multi-stage optical sorting systems remove damaged material and foreign contaminants.', img: '/images/factory.png' },
  { num: '04', title: 'Cryogenic / Precision Grinding', desc: 'Proprietary cryogenic grinding at -150°C locks in volatile essential oils, natural colour, and aroma.', img: '/images/cryo-dark.png' },
  { num: '05', title: 'Steam Sterilization (CFG)', desc: 'Our patented CFG + steam sterilization process achieves 5-log microbial reduction meeting FDA, EU, and FSSAI standards.', img: '/images/cfg-bg.png' },
  { num: '06', title: 'Quality Testing & Certification', desc: 'Post-process QC tests cover 200+ parameters: moisture, colour, particle size, microbiology, pesticide residue, heavy metals, and mycotoxins.', img: '/images/lab.png' },
  { num: '07', title: 'Hygienic Packaging', desc: 'Automated filling lines handle everything from 50g retail pouches to 25kg bulk bags in nitrogen-flushed, food-grade packaging.', img: '/images/products.png' },
  { num: '08', title: 'Cold Storage & Dispatch', desc: 'Finished goods dispatched via our global logistics network to 40+ countries with full export documentation.', img: '/images/farm-editorial.png' },
];

const infraItems = [
  { title: 'High Production Capacity', desc: '2 lakh sq. ft. plant with daily throughput exceeding 200 metric tonnes across all categories.', img: '/images/factory.png' },
  { title: 'Individual Grinding Lines', desc: '10+ independent grinding lines that eliminate cross-contamination and maintain complete flavour integrity.', img: '/images/cryo-dark.png' },
  { title: 'Cryogenic Grinding Plant', desc: 'Proprietary -150°C cryogenic system preserves 40% more essential oils than conventional grinding.', img: '/images/cryogenic-bg.png' },
  { title: 'Ribbon Blenders', desc: 'Industrial ribbon blenders ensure perfectly uniform blends across every batch.', img: '/images/factory.png' },
  { title: 'High-Capacity Hoppers', desc: 'Large capacity hoppers guarantee smooth, uninterrupted feed to downstream processing equipment.', img: '/images/farm.png' },
  { title: 'Nitrogen Scavenger', desc: 'Nitrogen scavenging in packaging lines displaces oxygen, extending shelf life and preventing oxidative rancidity.', img: '/images/products.png' },
  { title: 'Dust Collector', desc: 'High-efficiency dust collection systems maintain a clean working environment and eliminate product loss.', img: '/images/factory.png' },
  { title: 'Cold Grinding', desc: 'Cold grinding technology for heat-sensitive botanicals and herbs that cannot withstand ambient milling.', img: '/images/cryo-dark.png' },
  { title: 'Vacuum Grinding', desc: 'Vacuum grinding prevents oxidation and preserves natural colour in premium spices.', img: '/images/lab.png' },
  { title: 'Controlled Roasting', desc: 'Controlled-atmosphere roasting equipment delivers precise flavour development without scorching.', img: '/images/farm-editorial.png' },
  { title: 'Low Friction Grinding', desc: 'Low friction pin mills for ultra-fine powdering where particle size uniformity is critical.', img: '/images/cfg-bg.png' },
  { title: 'Precision Blending', desc: 'Blending machines calibrated to quickly produce consistent flavour-locked spice blends at scale.', img: '/images/products.png' },
];

const gmpItems = [
  { title: 'Hygiene and Cleanliness', desc: 'Maintaining clean and hygienic workspace to avoid contamination and ensure product safety across all production environments.' },
  { title: 'Quality Control', desc: 'Strong GMP is our quality management system — ensuring quality at each process including sourcing, manufacturing, packaging, and distribution.' },
  { title: 'Training and Competence', desc: 'Staff requires commitment and environment for reliable, qualified competency — facilitating responsibilities and improving skills.' },
  { title: 'Facility and Equipment Maintenance', desc: 'Regular inspection and maintenance of all machinery and tools — only authorised personnel perform maintenance procedures.' },
  { title: 'Managed Production Practices', desc: 'GMP guidelines involve all production activities — planning, sourcing, manufacturing, quality assurance, and customer service.' },
  { title: 'Documentation and Record-Keeping', desc: 'Data compliance including lab testing files, regular audits, and documenting all production, QC, and distribution records.' },
];

function ProcessStep({ step, isLeft }: { step: any; isLeft: boolean }) {
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

      tl.fromTo('.gsap-img-wrap',
        { clipPath: 'inset(15% 15% 15% 15%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power2.out' }, 0
      );
      tl.fromTo('.gsap-img-inner',
        { scale: 1.2 },
        { scale: 1, duration: 1.1, ease: 'power2.out' }, 0
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <ScrollReveal fromY={24} delay={0.05} style={{
      display: 'flex',
      justifyContent: isLeft ? 'flex-start' : 'flex-end',
      marginBottom: 'clamp(48px, 8vw, 120px)',
      position: 'relative',
    }}>
      {/* Connector dot */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: 14, height: 14, borderRadius: '50%',
        background: CRIMSON, border: '3px solid #fff',
        boxShadow: `0 0 0 3px rgba(172,3,59,0.2)`,
        transform: 'translate(-50%, -50%)', zIndex: 2,
      }} />

      <div ref={wrapperRef} style={{
        width: '46%',
        display: 'flex',
        flexDirection: isLeft ? 'row' : 'row-reverse',
        gap: 'clamp(20px, 3vw, 56px)', alignItems: 'center',
      }}>
        {/* Image */}
        <div className="gsap-img-wrap" style={{
          width: 'clamp(140px, 20vw, 360px)', height: 'clamp(100px, 15vw, 260px)',
          borderRadius: 16, overflow: 'hidden', flexShrink: 0,
          border: '1px solid rgba(0,0,0,0.08)', position: 'relative',
        }}>
          <div className="gsap-img-inner" style={{ position: 'absolute', inset: 0 }}>
            <Image src={step.img} alt={step.title} fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
        {/* Text */}
        <div style={{ textAlign: isLeft ? 'right' : 'left' }}>
          <div style={{ fontFamily: MONO, fontSize: 'clamp(10px, 1vw, 14px)', letterSpacing: '0.2em', color: CRIMSON, marginBottom: 'clamp(6px, 1vw, 12px)' }}>STEP {step.num}</div>
          <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(16px, 2vw, 36px)', fontWeight: 700, color: '#111', margin: '0 0 clamp(8px, 1.5vw, 16px)', lineHeight: 1.15 }}>{step.title}</h3>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px, 1.1vw, 17px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    el.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5}px 32px rgba(172,3,59,0.18)`;
    el.style.borderColor = 'rgba(172,3,59,0.4)';
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.boxShadow = 'none';
    el.style.borderColor = 'rgba(0,0,0,0.07)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function HowWeOperatePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ SCROLL EXPANSION HERO ════════════════════════════════ */}
      <ScrollExpansionHero
        badge="How We Operate"
        headingText="From Farm"
        headingRed="To Your Table."
        subText="State-of-the-art infrastructure spanning 2 lakh sq. ft. with a daily throughput exceeding 200 metric tonnes across all product categories."
        imageSrc="/images/factory.png"
        stats={[
          { value: '200 MT', label: 'Daily Throughput' },
          { value: '2L sqft', label: 'Plant Area' },
          { value: '10+', label: 'Grinding Lines' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE ══════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ PROCESS STEPS — ZIGZAG ════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,160px) clamp(20px,5vw,80px) clamp(20px,3vw,40px)', maxWidth: 1400, margin: '0 auto' }}>
        <ScrollReveal fromY={30}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(56px, 8vw, 120px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Our Process</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5vw,72px)', fontWeight: 700, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
              8-Step Journey to Perfection
            </h2>
          </div>
        </ScrollReveal>

        <div style={{ position: 'relative' }}>
          {/* Vertical spine line */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(172,3,59,0.2)', transform: 'translateX(-50%)' }} />

          {processSteps.map((step, i) => (
            <ProcessStep key={step.num} step={step} isLeft={i % 2 === 0} />
          ))}
        </div>
      </section>

      {/* ══ CURVED LOOP ════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingBottom: 'clamp(40px, 6vw, 80px)', paddingTop: 'clamp(16px, 2vw, 32px)' }}>
        <CurvedLoop 
          marqueeText="HOW WE OPERATE • 8-STEP PROCESS • TRACEABILITY • "
          speed={1.5}
          curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
           <text style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
           <text style={{ fontSize: 'clamp(9px, 1vw, 14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>

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
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', margin: 0, lineHeight: 1.1, maxWidth: 600 }}>8-Step Journey to Perfection</h2>
          </div>
        </ParallaxCard>
      </div>

      {/* ══ HEADLINE BANNER ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,5vw,72px) clamp(20px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          <ScrollReveal fromY={30} style={{ flex: '1 1 400px' }}>
            <h2 style={{
              fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700,
              color: '#111', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0,
            }}>
              We are leading the Spice Industry with<br />
              <span style={{ color: CRIMSON }}>State-of-the-Art</span> Infrastructure<br />
              and Top-Class Facilities
            </h2>
          </ScrollReveal>
          <div style={{ flex: '0 0 auto', height: 2, width: 'clamp(60px,15vw,200px)', background: `linear-gradient(to right, ${CRIMSON}, transparent)` }} />
        </div>
      </section>

      {/* ══ INFRASTRUCTURE GRID ════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,7vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={20}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>Infrastructure</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 48px' }}>
              World-Class Equipment
            </h2>
          </ScrollReveal>

          <StaggerReveal
            stagger={0.07}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,26vw,320px), 1fr))', gap: 'clamp(16px,2vw,24px)' }}
          >
            {infraItems.map((item) => (
              <TiltCard key={item.title}>
                <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                  <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover', opacity: 0.75, transition: 'transform 0.4s' }} />
                </div>
                <div style={{ padding: '18px 20px 24px' }}>
                  <h3 style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: '#111', margin: '0 0 8px' }}>{item.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 12.5, color: 'rgba(0,0,0,0.52)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              </TiltCard>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ VELOCITY DIVIDER ══════════════════════════════════ */}
      <VelocityMarquee reverse />

      {/* ══ GMP ACCORDION ══════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,80px)', flexWrap: 'wrap' }}>
            <ScrollReveal fromY={30} style={{ flex: '0 0 clamp(200px,25vw,320px)' }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Standards</div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3vw,48px)', fontWeight: 700, color: '#111', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
                Good Manufacturing<br />Practices (GMP)
              </h2>
            </ScrollReveal>
            <div style={{ flex: 1, minWidth: 280 }}>
              {gmpItems.map((item) => (
                <ScrollReveal key={item.title} fromY={20} style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                  <details>
                    <summary style={{
                      fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', fontWeight: 600, color: '#111',
                      padding: '20px 0', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none',
                    }}>
                      <span>{item.title}</span>
                      <span style={{ color: CRIMSON, fontSize: 20, fontWeight: 300, flexShrink: 0 }}>+</span>
                    </summary>
                    <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.52)', lineHeight: 1.75, paddingBottom: 20, margin: 0 }}>
                      {item.desc}
                    </p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}
