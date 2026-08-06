'use client';

import { useRef, useEffect, useState } from 'react';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CR    = '#AC033B';
const GREEN = '#1A6B3E';
const INK   = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

const IPM_STEPS = [
  {
    n: 1,
    title: 'Farmer Registration & Orientation',
    desc: 'Farmers in the programme are given priority guidance and soil preparation. A good rapport is established with all of them.',
  },
  {
    n: 2,
    title: 'Regular Farm Visits',
    desc: 'Our team members visit each farmer\'s individual fields between every visit and supervise their farms. They are given inputs in terms of chemicals required, manual weeding of noxious weeds, problems which were identified and any requirements if any, etc.',
  },
  {
    n: 3,
    title: 'Pesticide Residue Mapping',
    desc: 'At the same time, every land registry of pesticide doctors is checked to ensure none of the farmers on our list have purchased any kind of harmful or harmful chemical.',
  },
  {
    n: 4,
    title: 'Expert Agronomist Support',
    desc: 'In case of farmer problem not reliably guided in case of exact deterrence of other problems.',
  },
  {
    n: 5,
    title: 'Premium Price Incentive',
    desc: 'To each high premium is paid to farmers, ensuring they get better status and other special treatment results. They actively and independently represent our farming community and lend their support to our natural market.',
  },
  {
    n: 6,
    title: 'Compliance via Literature',
    desc: 'Pamphlets or brochures are donated promptly by the team and used to laboratories for specific residue-testing. This leaves very little risk of non-compliance.',
  },
  {
    n: 7,
    title: 'Contamination Prevention',
    desc: 'Our sampling quality system is carefully applied in case of exact deterrence at any stage. These bugs are then handled and treated to our team and our processing and cleaning plant.',
  },
  {
    n: 8,
    title: 'Direct Container Sourcing',
    desc: 'Machines are cleared 100% to avoid contamination from any IPM norms. Also note that during process, Dispatch to May members are only clearing IPM material and all other stocks are not any other.',
  },
  {
    n: 9,
    title: 'Pre-Shipment SGS Sampling',
    desc: 'After verifying goods are dispatched to our warehouse, note therefore send out shipment sampling from each market and 1-5 carton of bags on any in-house treasury. After laboratory confirms to be compliant, only then we proceed to ship the lot.',
  },
  {
    n: 10,
    title: 'Buyer Farm Traceability',
    desc: 'Every buyer can be given complete traceability reports to the head level giving them 100% confidence.',
  },
];

const SUSTAINABILITY = [
  {
    icon: '🌿',
    label: 'Monoray',
    desc: 'High pheromone pest is a famous attracting that gets better crops than other crop worker offers. This complex chemical pest-repellent delays ensuring farmer farm can crop safely compared to usual today.',
  },
  {
    icon: '🏛',
    label: 'Government',
    desc: 'The harmful chemical used on our effect site on the comprehensive farm, the special chemical stock boxes resident in an Massuet usually used then also but often farm policy. Massuet observes the water can be protected by improving their improved and their improved farm policy.',
  },
  {
    icon: '👨‍🌾',
    label: 'Farmer Training',
    desc: 'Farmers are guided at all stages to ensure to be adequate standards in rating, growing, planning and distributing in the programme. Seed selection, cross variety and the way of seeds which are best in each category is a requirement in the programme. This leads to better farm life and quality of seed market, local knowledge profiling and locally, the training and skills are learned in way to make continuous progress.',
  },
];

const CSS = `
  @keyframes ipm-step-in {
    from { opacity:0; transform: translateX(-30px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes ipm-line-grow {
    from { height: 0; }
    to   { height: 100%; }
  }
  @keyframes ipm-pulse {
    0%, 100% { opacity:1; transform: scale(1); }
    50%       { opacity:0.6; transform: scale(0.9); }
  }
  @keyframes ipm-bg-scroll {
    from { background-position: 0 0; }
    to   { background-position: 0 -60px; }
  }

  .ipm-step-row {
    display: flex; gap: 24px; position: relative;
    padding-bottom: 32px;
    cursor: default;
    transition: opacity 0.2s;
  }
  .ipm-step-row:hover .ipm-step-dot { transform: scale(1.3); }
  .ipm-step-row:hover .ipm-step-content { border-left-color: #1A6B3E !important; }

  .ipm-step-dot {
    width: 36px; height: 36px; border-radius: 50%;
    background: #1A6B3E; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-mono); font-size: 13px; font-weight: 800;
    flex-shrink: 0; position: relative; z-index: 2;
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .ipm-step-dot:hover { box-shadow: 0 0 0 6px rgba(26,107,62,0.2); }

  .ipm-step-connector {
    position: absolute; left: 18px; top: 36px; bottom: 0;
    width: 1px; background: rgba(26,107,62,0.15); z-index: 1;
  }

  .ipm-step-content {
    flex: 1; padding: 2px 0 0 0;
    border-left: 2px solid transparent;
    padding-left: 16px;
    transition: border-color 0.2s;
  }

  .report-btn {
    display: block; padding: 9px 16px;
    background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.08);
    border-radius: 8px; text-decoration: none;
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(0,0,0,0.55);
    transition: all 0.2s; cursor: pointer;
    text-align: center;
  }
  .report-btn:hover { background: #1A6B3E; color: #fff; border-color: #1A6B3E; }

  @media (max-width:700px) {
    .ipm-layout { flex-direction: column !important; }
    .ipm-reports-grid { grid-template-columns: 1fr !important; }
    .ipm-sustain-grid { grid-template-columns: 1fr !important; }
  }
`;

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedProgress({ pct, color, label }: { pct: number; color: string; label: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>{label}</span>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: 'rgba(0,0,0,0.07)', borderRadius: 999 }}>
        <div style={{
          height: '100%', borderRadius: 999, background: color,
          width: inView ? `${pct}%` : '0%',
          transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
        }}/>
      </div>
    </div>
  );
}

export default function IPMPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      <style>{CSS}</style>

      <TechTurbineHero badgeText="IPM" marqueeText="INTEGRATED PEST MANAGEMENT" />
      <VelocityMarquee dark />

      {/* ── OVERVIEW ──────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="ipm-layout" style={{ display: 'flex', gap: 60, alignItems: 'flex-start' }}>
            {/* Left: overview text */}
            <div style={{ flex: 1 }}>
              <ScrollReveal fromY={24}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: GREEN, marginBottom: 16 }}>Overview</div>
                <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
                  Integrated Pest<br /><em style={{ color: GREEN, fontStyle: 'italic' }}>Management</em>
                </h1>
                <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.62)', lineHeight: 1.85, margin: '0 0 24px' }}>
                  Lately, India's farms have been increasingly spraying more and more pesticides to counter insects and QD-compliant limits. It has become a requirement for Indian companies to formulate sustainable livelihoods for farmers, considering also that the country barely touches the boundary of good agricultural practices. We are one into 4% year of our IPM Country program now.
                </p>
                <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.62)', lineHeight: 1.85, margin: '0 0 32px' }}>
                  Company identified 100 progressive farmers and we are now part of their process undertaking production inventory. We are one into 4000 Packers in this region. A total area of 4000 Packers is registered with us to cultivate IPM leaves by adopting good agricultural practices and integrated pest management.
                </p>

                {/* Progress bars */}
                <AnimatedProgress pct={100} color={GREEN} label="IPM-Registered Farms" />
                <AnimatedProgress pct={94} color={GREEN} label="Pesticide Compliance Rate" />
                <AnimatedProgress pct={88} color={GREEN} label="Traceability Coverage" />
                <AnimatedProgress pct={100} color={GREEN} label="Pre-shipment Inspection" />
              </ScrollReveal>
            </div>

            {/* Right: decorative feature box */}
            <ScrollReveal fromY={30} style={{ flexShrink: 0, width: 'clamp(260px, 30vw, 340px)' }}>
              <div style={{
                background: '#F8F6F1', borderRadius: 20, padding: 32,
                border: `1.5px solid ${GREEN}20`,
                boxShadow: `0 12px 48px ${GREEN}12`,
              }}>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: GREEN, marginBottom: 20 }}>Programme Stats</div>
                {[
                  { n: '100+', label: 'Registered Farms' },
                  { n: '4,000', label: 'Acres Under IPM' },
                  { n: '10', label: 'Steps in Protocol' },
                  { n: '0', label: 'Tolerance: Excess Pesticide' },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <span style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>{s.label}</span>
                    <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 800, color: GREEN }}>{s.n}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── IPM STEPS ─────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAFAF8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: GREEN, marginBottom: 14 }}>Our Process</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05 }}>
              Steps Included in Our<br /><em style={{ color: GREEN, fontStyle: 'italic' }}>IPM Programme</em>
            </h2>
          </ScrollReveal>

          <div className="ipm-layout" style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
            {/* Steps timeline */}
            <div style={{ flex: 1, position: 'relative' }}>
              {IPM_STEPS.map((step, i) => (
                <ScrollReveal key={step.n} fromY={20} style={{ animationDelay: `${i * 0.06}s` }}>
                  <div
                    className="ipm-step-row"
                    onClick={() => setActiveStep(prev => prev === i ? null : i)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Connector line */}
                    {i < IPM_STEPS.length - 1 && <div className="ipm-step-connector"/>}

                    {/* Number dot */}
                    <div className="ipm-step-dot"
                      style={{ background: activeStep === i ? CR : GREEN }}>
                      {step.n}
                    </div>

                    {/* Content */}
                    <div className="ipm-step-content"
                      style={{ borderLeftColor: activeStep === i ? CR : 'transparent' }}>
                      <div style={{ fontFamily: SERIF, fontSize: 'clamp(14px,1.2vw,17px)', fontWeight: 700, color: INK, marginBottom: activeStep === i ? 10 : 0, lineHeight: 1.3 }}>
                        {step.title}
                      </div>
                      {activeStep === i && (
                        <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, margin: 0 }}>
                          {step.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Step hint panel */}
            <div style={{
              width: 260, flexShrink: 0, position: 'sticky', top: 100,
              background: '#fff', border: '1.5px solid rgba(0,0,0,0.07)',
              borderRadius: 16, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            }}>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: GREEN, marginBottom: 12 }}>
                {activeStep !== null ? `Step ${IPM_STEPS[activeStep].n} of 10` : 'Click any step'}
              </div>
              <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: 1.7, margin: 0 }}>
                {activeStep !== null ? IPM_STEPS[activeStep].desc : 'Select a step from the timeline to learn more about our IPM protocol.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── REPORTS ───────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#111' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: 0 }}>
              Sample Reports
            </h2>
          </ScrollReveal>

          <div className="ipm-reports-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {/* Raw Reports */}
            <ScrollReveal fromY={24}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `${GREEN}20`, borderRadius: 999, padding: '4px 14px',
                  fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', color: GREEN,
                  textTransform: 'uppercase', marginBottom: 20,
                }}>
                  ● Raw Report
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[1, 2, 3, 4].map(n => (
                    <button key={n} className="report-btn" style={{ color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      Sample Report {n}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* IPM Reports */}
            <ScrollReveal fromY={24} style={{ animationDelay: '0.1s' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `${CR}20`, borderRadius: 999, padding: '4px 14px',
                  fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', color: CR,
                  textTransform: 'uppercase', marginBottom: 20,
                }}>
                  ● IPM Report
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[1, 2, 3, 4].map(n => (
                    <button key={n} className="report-btn" style={{ color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      Sample Report {n}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY ────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: GREEN, marginBottom: 14 }}>
              Sustainability
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: 0 }}>
              Suitable Sustainability<br /><em style={{ color: GREEN, fontStyle: 'italic' }}>Initiatives</em>
            </h2>
          </ScrollReveal>

          <div className="ipm-sustain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {SUSTAINABILITY.map((s, i) => (
              <ScrollReveal key={s.label} fromY={24} style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{
                  padding: 28, borderRadius: 16, background: '#FAFAF8',
                  border: `1.5px solid ${GREEN}20`,
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 16px 48px ${GREEN}15`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                  <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: INK, margin: '0 0 12px' }}>{s.label}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.57)', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURVED LOOP ──────────────────────────────────── */}
      <div style={{ position: 'relative', background: '#fff', paddingTop: 'clamp(40px,5vw,72px)', paddingBottom: 'clamp(80px,10vw,120px)' }}>
        <CurvedLoop
          marqueeText="PESTICIDE FREE • FARM TO FORK • IPM CERTIFIED • SUSTAINABLE • ZERO TOLERANCE • "
          speed={1.5} curveAmount={250}
          className="fill-[#1A6B3E] uppercase font-mono tracking-widest"
        />
      </div>
    </main>
  );
}
