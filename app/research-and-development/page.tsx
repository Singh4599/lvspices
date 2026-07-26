'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ScrollReveal, { StaggerReveal, AnimatedStat } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import ScrollExpansionHero from '@/components/ui/ScrollExpansionHero';
import { gsap } from '@/lib/gsap';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const focusAreas = [
  { icon: '🌶️', title: 'New Product Development', desc: 'Our R&D team develops 50+ new formulations annually — from fusion spice blends to functional food ingredients — driven by market intelligence and customer briefs.' },
  { icon: '🧪', title: 'Flavour Science & Innovation', desc: 'GC-MS flavour profiling and advanced sensory panels allow us to analyse and recreate complex flavour systems for private label and export customers worldwide.' },
  { icon: '⚗️', title: 'Process Optimisation', desc: 'Continuous R&D into milling parameters, roasting profiles, and blending ratios to improve colour, pungency, and shelf life without compromise on any dimension.' },
  { icon: '🌿', title: 'Functional Ingredients', desc: 'Research into curcumin bioavailability, piperine enhancement, and antioxidant-rich spice extracts for nutraceutical, pharmaceutical, and health-food applications.' },
  { icon: '📦', title: 'Packaging & Shelf Life', desc: 'Accelerated shelf life studies, nitrogen-flush trials, and modified atmosphere packaging research to extend product life across diverse climate zones globally.' },
  { icon: '🤝', title: 'Custom Blend Formulation', desc: 'Working with global FMCG manufacturers and restaurant chains to develop signature spice blends meeting exact sensory, nutritional, and regulatory specifications.' },
];

const sensorySteps = [
  { num: '01', title: 'Sample Preparation', desc: 'Blind samples of new formulations prepared under controlled conditions — identical in presentation to remove all visual bias from evaluators.' },
  { num: '02', title: 'Panel Evaluation', desc: 'Trained panellists score aroma, colour, heat level, mouthfeel, aftertaste, and overall acceptance against a validated reference standard.' },
  { num: '03', title: 'Scoring & Analysis', desc: 'Statistical analysis using spider charts and Quantitative Descriptive Analysis (QDA) pinpoints improvement areas with scientific precision.' },
  { num: '04', title: 'Consumer Validation', desc: 'For private label blends, scaled consumer trials confirm market acceptability before final production sign-off and launch.' },
];

const milestones = [
  { val: 425, suffix: '+', label: 'Spice Blends Developed' },
  { val: 50, suffix: '+', label: 'New Formulations / Year' },
  { val: 12, suffix: '', label: 'R&D Scientists' },
  { val: 3, suffix: '', label: 'Dedicated R&D Labs' },
];

const partnerships = ['CFTRI, Mysore', 'Spices Board of India', 'IIFPT, Thanjavur', 'Global Flavour Houses', 'NABL Accredited Labs', 'IIT Food Tech Division'];

function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: wrapRef.current, start: 'top 85%', end: 'top 20%', scrub: 0.8 } })
        .fromTo('.ri', { scale: 1.25, filter: 'brightness(0.6)' }, { scale: 1, filter: 'brightness(1)', ease: 'power2.out' })
        .fromTo('.ro', { opacity: 0.6 }, { opacity: 0.2 }, '<');
    }, wrapRef);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 24 }}>
      <div className="ri" style={{ position: 'absolute', inset: -20 }}>
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="ro" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,77,140,0.25), rgba(0,0,0,0.4))', zIndex: 1 }} />
    </div>
  );
}

function TiltCard({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isD = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isD) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -9;
    const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 9;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
    el.style.boxShadow = dark ? `${-ry * 1.5}px ${rx * 1.5}px 36px rgba(172,3,59,0.25)` : `${-ry * 1.5}px ${rx * 1.5}px 36px rgba(0,0,0,0.1)`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    el.style.boxShadow = 'none';
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        background: dark ? 'rgba(255,255,255,0.04)' : '#fafafa',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: 16, padding: '28px 24px', willChange: 'transform', transition: 'transform 0.12s, box-shadow 0.12s',
      }}>
      {children}
    </div>
  );
}

export default function ResearchAndDevelopmentPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflowX: 'hidden' }}>

      {/* ══ SCROLL EXPANSION HERO ════════════════════════════════ */}
      <ScrollExpansionHero
        badge="Innovation"
        headingText="Research &"
        headingRed="Development."
        subText="A dedicated team working round-the-clock on new product formulations and process innovations — keeping LV Spices at the cutting edge of global flavour science."
        imageSrc="/images/lab.png"
        stats={[
          { value: '425+', label: 'Blends Developed' },
          { value: '50+', label: 'New / Year' },
          { value: '12', label: 'Scientists' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE ════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ INTRO SECTION ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(48px,8vw,100px)', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
          <div style={{ flex: '1 1 460px', height: 'clamp(360px,42vw,540px)', minWidth: 0 }}>
            <ZoomImage src="/images/lab.png" alt="R&D Lab" />
          </div>
          <ScrollReveal fromY={24} style={{ flex: '1 1 340px', minWidth: 0 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Innovation Hub</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Product Research<br />&amp; New<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>Development.</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: '0 0 16px' }}>
              Spices are an integral part of our food. In India, it is almost impossible to imagine food without them. LV Spices has always had a dedicated team working round-the-clock to increase the demands of customers by developing new and improved products.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, margin: 0 }}>
              With our fully agile blends developed in-house, it has always been our mission to ensure blends are conceptualised and formulated as per the required taste, keeping in mind regulatory requirements for allergens and pesticide limits.
            </p>
            <div style={{ display: 'flex', gap: 'clamp(20px,4vw,48px)', marginTop: 36, flexWrap: 'wrap' }}>
              {milestones.map(m => (
                <div key={m.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(22px,2.8vw,36px)', fontWeight: 800, color: '#111', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    <AnimatedStat value={m.val} suffix={m.suffix} label={m.label} />
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 8 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ FOCUS AREAS — TILT CARDS ════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <ScrollReveal fromY={30} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>What We Research</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
              R&amp;D Focus <em style={{ color: CRIMSON, fontStyle: 'italic' }}>Areas</em>
            </h2>
          </ScrollReveal>
          <StaggerReveal stagger={0.07} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'clamp(14px,1.8vw,24px)' }}>
            {focusAreas.map(area => (
              <TiltCard key={area.title}>
                <div style={{ fontSize: 30, marginBottom: 18, display: 'inline-flex', width: 52, height: 52, alignItems: 'center', justifyContent: 'center', borderRadius: 14, background: 'rgba(172,3,59,0.07)', border: '1px solid rgba(172,3,59,0.15)' }}>{area.icon}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 14.5, fontWeight: 700, color: '#111', margin: '0 0 10px' }}>{area.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.52)', lineHeight: 1.75, margin: 0 }}>{area.desc}</p>
              </TiltCard>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ VELOCITY DIVIDER ════════════════════════════════════ */}
      <VelocityMarquee reverse />

      {/* ══ SENSORY TESTING — DARK ══════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#111' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,64px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#D0375C', marginBottom: 14 }}>Sensory Science</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 20px' }}>Sensory Testing Protocol</h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
              Before any new formulation enters production, it passes through a four-stage sensory evaluation panel — eliminating subjectivity with science.
            </p>
          </ScrollReveal>
          <StaggerReveal stagger={0.09} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 'clamp(14px,1.8vw,24px)' }}>
            {sensorySteps.map(step => (
              <TiltCard key={step.num} dark>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 18 }}>{step.num}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: '#fff', margin: '0 0 10px' }}>{step.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 12.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
              </TiltCard>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ PARTNERSHIPS ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <ScrollReveal fromY={24}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>Partnerships</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 20px' }}>
              Academic &amp;<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>Industry Tie-ups</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, margin: '0 0 48px' }}>
              Our R&D division collaborates with leading research institutions. Joint research covers functional ingredients, novel extraction methods, and sustainable processing technologies.
            </p>
          </ScrollReveal>
          <StaggerReveal stagger={0.07} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {partnerships.map(partner => (
              <div key={partner} style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, padding: '12px 24px', borderRadius: 999, background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.18)', color: '#111', transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = CRIMSON; el.style.color = '#fff'; el.style.borderColor = CRIMSON; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(172,3,59,0.06)'; el.style.color = '#111'; el.style.borderColor = 'rgba(172,3,59,0.18)'; }}>
                {partner}
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ CURVED LOOP ══════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingTop: 'clamp(16px,2vw,32px)', paddingBottom: 'clamp(40px,6vw,80px)' }}>
        <CurvedLoop marqueeText="INNOVATION • RESEARCH • 425+ BLENDS • NEW DEVELOPMENT • " speed={1.5} curveAmount={250} className="fill-[#111] uppercase font-mono tracking-widest" />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <text style={{ fontSize: 'clamp(28px,4vw,56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
          <text style={{ fontSize: 'clamp(9px,1vw,14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>

      {/* ══ CTA ══════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: '#111', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.03)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>R&D</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={24}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#D0375C', marginBottom: 20 }}>Collaborate With Us</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5.5vw,80px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Have a Custom<br />Blend in Mind?
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(15px,1.3vw,18px)', color: 'rgba(255,255,255,0.65)', maxWidth: 540, margin: '0 auto 48px', lineHeight: 1.75 }}>
              Share your product brief with our R&D team. We'll formulate, test, and validate a blend tailored to your sensory and regulatory needs.
            </p>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: CRIMSON, color: '#fff', fontFamily: SANS, fontWeight: 700, fontSize: 15, padding: '18px 40px', borderRadius: 999, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 32px rgba(172,3,59,0.3)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
              Start a Conversation →
            </a>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
