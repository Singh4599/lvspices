'use client';

import { useState, useRef, useEffect } from 'react';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CR    = '#AC033B';
const INK   = '#1A1915';
const GOLD  = '#7B4E1B';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

// ── PROCESS CHART DATA ──────────────────────────────────────────────────────

type NodeType = 'rect' | 'diamond' | 'pentagon' | 'side';

interface FlowNode {
  id: string;
  label: string;
  type: NodeType;
  column: 'main' | 'left' | 'right';
  row: number;
  desc?: string;
  accent?: string;
}

const GROUND_SPICE_STEPS = [
  { step: 1, label: 'Raw Material Receipt', desc: 'We purchase raw material from the local mandis or APMCs as well as outstation mandis. Material is sourced from producing centres during peak harvest to advantage freshness and colour.' },
  { step: 2, label: 'Inspection', type: 'diamond', isDecision: true, yesLabel: 'YES', noLabel: 'NO → Return to Party', desc: 'All incoming raw material undergoes rigorous quality inspection. Samples are tested in our in-house lab. Material not conforming to standards is immediately returned to the supplier.' },
  { step: 3, label: 'Unloading', sideBranches: ['Dry Storage', 'Cold Storage'], desc: 'Post-inspection approval, raw material is unloaded. Based on moisture content and product type, it is directed to either dry storage or cold storage.' },
  { step: 4, label: 'Issue to Production', desc: 'Approved stored material is formally issued to the production floor with documented work orders, ensuring full traceability at every production stage.' },
  { step: 5, label: 'Weighing', desc: 'Every batch is precisely weighed before processing begins. Our digital weighing systems ensure exact quantities, eliminating variance in formulations.' },
  { step: 6, label: 'Mixing (if applicable)', isOptional: true, desc: 'Where required, ingredients are pre-mixed as per recipe specifications before entering the grinding line.' },
  { step: 7, label: 'Feeding', sideNote: 'Bucket Conveyor', desc: 'The spice material is fed into the grinding line via automated bucket conveyors — ensuring consistent, contamination-free material flow.' },
  { step: 8, label: '1st Grinding', sideNote: 'Screw Conveyor', desc: 'First pass through our high-speed grinding mills. Particle size is monitored in real time to meet the target distribution.' },
  { step: 9, label: '2nd Grinding (if applicable)', isOptional: true, sideNote: 'Screw Conveyor', desc: 'For premium fine powders, a second grinding pass achieves sub-500 micron particle size consistency.' },
  { step: 10, label: '3rd Grinding (if applicable)', isOptional: true, sideNote: 'Screw Conveyor', desc: 'Ultra-fine applications may require a third grinding cycle for maximum powder fineness and homogeneity.' },
  { step: 11, label: 'Blending', sideNote: 'Oil (for blended spices)', leftNote: 'Blending Whole Ingredients as per Recipe', desc: 'All components are blended in stainless steel blenders. For spice blends, whole ingredients are incorporated as per the exact recipe. Essential oils added where required.' },
  { step: 12, label: 'Vibroseiving', desc: 'Product passes through vibro-sieve machines to remove coarse particles, lumps, and any foreign material, ensuring uniformity.' },
  { step: 13, label: 'Inspection', type: 'diamond', isDecision: true, yesLabel: 'YES', noLabel: 'NO → Rework', sideNote: 'Packing Material Receipt', desc: 'Final product inspection against physical, chemical, and microbiological specifications. Packing material is simultaneously received and inspected.' },
  { step: 14, label: 'Weighing', rightFlow: ['Inspection', 'Storage', 'Printing if Needed'], desc: 'Approved product is weighed for packing. Packing materials undergo parallel inspection, storage, and printing as needed.' },
  { step: 15, label: 'Bulk Packing in Bags', sideNote: 'Issue for Packing', desc: 'Product is packed in bulk bags (25kg / 50kg) or primary packs as per customer specification. Automated filling ensures exact fill weights.' },
  { step: 16, label: 'Tying', desc: 'All bags are securely tied and sealed — multiple closure points ensure product integrity during transit.' },
  { step: 17, label: 'Stitching', sideNote: 'Dispatch', desc: 'Jute/PP bags are machine-stitched for extra strength. Product is simultaneously prepared for dispatch scheduling.' },
  { step: 18, label: 'Storage', sideNote: 'Container Fumigation', desc: 'Finished goods are stored in our controlled warehouse. Containers are pre-fumigated with approved fumigants before loading.' },
  { step: 19, label: 'Vehicle Inspection', type: 'diamond', isDecision: true, yesLabel: 'YES → Loading/Stuffing', noLabel: 'NO → Reject', desc: 'Each vehicle undergoes inspection for cleanliness, structural integrity, and temperature conditions before loading begins.' },
  { step: 20, label: 'Loading / Stuffing', desc: 'Products are loaded into containers with polysheet and craft paper lining on all walls. Dispatch from Mumbai Nhava Sheva / JNPT / Mundra for sailing.' },
];

const WHOLE_SEEDS_STEPS = [
  { step: 1, label: 'Natural Whole Seeds', desc: 'Premium natural whole seeds sourced from farms following Integrated Pest Management practices.' },
  { step: 2, label: 'Seed Cleaning', sideNote: 'Out Sort → Immediate Market', desc: 'Initial cleaning removes dust, chaff, and gross impurities. Out-sorted material goes to the domestic immediate market.' },
  { step: 3, label: 'Seed Grading/Magnet (3 steps)', desc: 'Three-stage grading with magnet application removes dead, immature seeds and ferrous metal contaminants ensuring only premium seeds proceed.' },
  { step: 4, label: 'Drying', desc: 'Controlled sun drying or industrial drying to reduce moisture content to export-acceptable levels while preserving colour and volatile oil content.' },
  { step: 5, label: 'Wet Hulling', sideNote: 'Reject for Domestic Market', desc: 'Outer hull removed where required. Rejected material is redirected to the domestic market.' },
  { step: 6, label: 'Cleaning and Grading', desc: 'Post-hulling second pass of cleaning and size grading on vibro-separators and gravity tables for export-quality selection.' },
  { step: 7, label: 'Colour Sorting (Z-Series)', desc: 'Advanced Z-series colour sorting machines with pre-packing magnets in place remove any colour-defective seeds and residual metal.' },
  { step: 8, label: 'Packing for Export', desc: 'Sorted, graded product is packed in new jute bags / PP bags / vacuum packs per buyer specification. Each bag is labelled with lot/batch traceability codes.' },
  { step: 9, label: 'In-House SGS Sampling & Inspection', desc: 'Final random sampling by our quality team following SGS-equivalent methodology. Reports prepared for each consignment before shipment.' },
  { step: 10, label: 'Container Preparation', desc: 'Cleaning, fumigation & factory stuffing of containers. Polysheet & craft paper lined walls for all shipments. Dispatch from Mumbai Nhava Sheva / JNPT / Mundra.' },
];

const CONCEPT_NODES = [
  { n: 1, label: 'Drying', sub: ['Sun Drying', 'Industrial Drying'], color: '#1A6B3E', pos: 'top-left' },
  { n: 2, label: 'Process', sub: ['Examination', 'Breaking Machine', 'Sifting', 'Delta Cleaner', 'Cylinder Separator', 'Gravity Table', 'Metal', 'Sortex'], color: '#1A6B3E', pos: 'left' },
  { n: 3, label: 'Quality Control', sub: ['Our In-House Lab', 'Ministry of Agriculture Research Centre', 'Euro Fins Germany'], color: '#1A6B3E', pos: 'bottom-left' },
  { n: 4, label: 'Packing', sub: [], color: '#8FA87E', pos: 'bottom-right' },
  { n: 5, label: 'Storing', sub: [], color: '#A8BF9A', pos: 'right' },
  { n: 6, label: 'Fumigation', sub: [], color: '#8FA87E', pos: 'top-right' },
  { n: 7, label: 'Folding Shipping', sub: [], color: '#1A6B3E', pos: 'top-far-right' },
];

const CSS = `
  @keyframes flow-draw {
    from { stroke-dashoffset: 600; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes node-in {
    from { opacity:0; transform: scale(0.7); }
    to   { opacity:1; transform: scale(1); }
  }
  @keyframes step-in {
    from { opacity:0; transform: translateX(-20px); }
    to   { opacity:1; transform: translateX(0); }
  }
  @keyframes pulse-connector {
    0%   { opacity: 1; }
    50%  { opacity: 0.3; }
    100% { opacity: 1; }
  }

  .pc-step {
    border-left: 2px solid rgba(0,0,0,0.08);
    padding-left: 20px;
    position: relative;
    transition: border-color 0.2s;
    cursor: pointer;
  }
  .pc-step:hover { border-left-color: #AC033B; }
  .pc-step::before {
    content: '';
    position: absolute; left: -6px; top: 16px;
    width: 10px; height: 10px; border-radius: 50%;
    background: rgba(0,0,0,0.15);
    transition: background 0.2s, transform 0.2s;
  }
  .pc-step:hover::before { background: #AC033B; transform: scale(1.3); }

  .pc-step-active { border-left-color: #AC033B !important; }
  .pc-step-active::before { background: #AC033B !important; }

  .pc-diamond {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    background: rgba(172,3,59,0.12);
    border: none;
    display: flex; align-items: center; justify-content: center;
    text-align: center;
  }

  .pc-tab {
    padding: 12px 32px;
    border-radius: 999px;
    border: 1.5px solid rgba(0,0,0,0.12);
    background: none; cursor: pointer;
    transition: all 0.2s;
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(0,0,0,0.5);
  }
  .pc-tab:hover { border-color: #AC033B; color: #AC033B; }
  .pc-tab.active { background: #AC033B; border-color: #AC033B; color: #fff; }

  .pc-side-note {
    font-family: var(--font-mono);
    font-size: 9px; letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.35);
    background: rgba(0,0,0,0.04);
    padding: 3px 10px; border-radius: 6px;
    display: inline-block;
  }

  @media (max-width: 768px) {
    .pc-concept-grid { display: none !important; }
    .pc-concept-mobile { display: block !important; }
  }
`;

function StepConnector({ label }: { label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, margin: '2px 0', position: 'relative' }}>
      <svg width="2" height="40" viewBox="0 0 2 40" style={{ display: 'block' }}>
        <line x1="1" y1="0" x2="1" y2="40" stroke="#AC033B" strokeWidth="2" strokeDasharray="4 4"
          style={{ animation: 'pulse-connector 2s ease-in-out infinite' }}/>
      </svg>
      <svg width="10" height="8" viewBox="0 0 10 8">
        <path d="M5 8L0 0h10z" fill="#AC033B" opacity="0.6"/>
      </svg>
    </div>
  );
}

function StepNode({ step, isDecision, isOptional, sideNote, leftNote, rightFlow, desc, stepNum, active, onClick }: {
  step: string;
  isDecision?: boolean;
  isOptional?: boolean;
  sideNote?: string;
  leftNote?: string;
  rightFlow?: string[];
  desc?: string;
  stepNum: number;
  active: boolean;
  onClick: () => void;
}) {
  if (isDecision) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', position: 'relative' }}>
        <button
          onClick={onClick}
          style={{
            width: 120, height: 120, cursor: 'pointer',
            background: active ? CR : 'rgba(172,3,59,0.08)',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            border: 'none', color: active ? '#fff' : INK,
            fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
            transition: 'all 0.2s', textTransform: 'uppercase',
          }}
        >
          {step}
        </button>
        {sideNote && <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 1, background: 'rgba(0,0,0,0.2)' }}/>
          <span className="pc-side-note">{sideNote}</span>
        </div>}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, justifyContent: 'center' }}>
      {leftNote && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
          <span className="pc-side-note">{leftNote}</span>
          <div style={{ width: 24, height: 1, background: 'rgba(0,0,0,0.2)' }}/>
        </div>
      )}
      <button
        onClick={onClick}
        style={{
          background: active ? CR : (isOptional ? 'rgba(0,0,0,0.04)' : '#fff'),
          border: `1.5px solid ${active ? CR : isOptional ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: isOptional ? 8 : 12,
          padding: '12px 28px', cursor: 'pointer',
          fontFamily: MONO, fontSize: 11, fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: active ? '#fff' : isOptional ? 'rgba(0,0,0,0.45)' : INK,
          transition: 'all 0.2s',
          minWidth: 200, textAlign: 'center',
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: 8, marginRight: 8, opacity: 0.6 }}>
          {String(stepNum).padStart(2, '0')}
        </span>
        {step}
        {isOptional && <span style={{ fontFamily: SANS, fontSize: 9, opacity: 0.5, display: 'block', marginTop: 2 }}>(if applicable)</span>}
      </button>
      {sideNote && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
          <div style={{ width: 24, height: 1, background: 'rgba(0,0,0,0.2)' }}/>
          <span className="pc-side-note">{sideNote}</span>
        </div>
      )}
      {rightFlow && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
          {rightFlow.map(r => (
            <span key={r} className="pc-side-note">{r}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProcessChartPage() {
  const [activeTab, setActiveTab] = useState<'ground' | 'seeds'>('ground');
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const currentSteps = activeTab === 'ground' ? GROUND_SPICE_STEPS : WHOLE_SEEDS_STEPS;

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      <style>{CSS}</style>

      <TechTurbineHero badgeText="Process Chart" marqueeText="PROCESS" />
      <VelocityMarquee dark />

      {/* ── INTRO ──────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAFAF8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>End-to-End Process</div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              From Farm to<br /><em style={{ color: CR, fontStyle: 'italic' }}>Export Container</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.8 }}>
              Every step of our manufacturing process is documented, traceable, and audited. Click any step to understand exactly what happens inside our facility.
            </p>

            {/* Tab selector */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className={`pc-tab ${activeTab === 'ground' ? 'active' : ''}`} onClick={() => { setActiveTab('ground'); setActiveStep(null); }}>
                Ground Spices / Powder
              </button>
              <button className={`pc-tab ${activeTab === 'seeds' ? 'active' : ''}`} onClick={() => { setActiveTab('seeds'); setActiveStep(null); }}>
                Natural Whole Seeds
              </button>
            </div>
          </ScrollReveal>

          {/* Main flowchart area */}
          <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>

            {/* LEFT: The flowchart nodes */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {currentSteps.map((s, i) => (
                <div key={s.step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 560 }}>
                  {i > 0 && <StepConnector />}
                  <StepNode
                    step={s.label}
                    isDecision={(s as any).isDecision ?? false}
                    isOptional={(s as any).isOptional ?? false}
                    sideNote={(s as any).sideNote}
                    leftNote={(s as any).leftNote}
                    rightFlow={(s as any).rightFlow}
                    desc={s.desc}
                    stepNum={s.step}
                    active={activeStep === i}
                    onClick={() => setActiveStep(prev => prev === i ? null : i)}
                  />
                </div>
              ))}

              {/* Dispatch footer */}
              <div style={{ marginTop: 32, textAlign: 'center' }}>
                <StepConnector />
                <div style={{
                  background: INK, color: '#fff',
                  fontFamily: MONO, fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '16px 32px', borderRadius: 12,
                }}>
                  🚢 Dispatch · Nhava Sheva / JNPT / Mundra
                </div>
              </div>
            </div>

            {/* RIGHT: Step detail panel (sticky) */}
            <div style={{
              width: 320, flexShrink: 0,
              position: 'sticky', top: 100,
              background: '#fff',
              border: '1.5px solid rgba(0,0,0,0.08)',
              borderRadius: 20, padding: 28,
              boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
              transition: 'opacity 0.3s',
              opacity: activeStep !== null ? 1 : 0.4,
              minHeight: 200,
            }}>
              {activeStep !== null ? (
                <>
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: CR, marginBottom: 12 }}>
                    Step {String(currentSteps[activeStep].step).padStart(2, '0')}
                  </div>
                  <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 800, color: INK, margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {currentSteps[activeStep].label}
                  </h3>
                  <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, margin: 0 }}>
                    {currentSteps[activeStep].desc}
                  </p>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 180, gap: 12 }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="19" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5"/>
                    <path d="M14 20h12M20 14v12" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', textAlign: 'center' }}>
                    Click any step<br />to learn more
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONCEPT DIAGRAM ──────────────────────────── */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#111' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>
              Overview
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,56px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05 }}>
              The 7-Stage<br /><em style={{ color: CR, fontStyle: 'italic' }}>Concept Flow</em>
            </h2>
          </ScrollReveal>

          {/* Concept nodes grid */}
          <div className="pc-concept-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto' }}>
            {/* Raw materials */}
            <div style={{ gridColumn: '2 / 3', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>Raw Materials "FARMS"</div>
              <div style={{ width: 2, height: 40, background: GOLD, opacity: 0.4 }}/>
            </div>

            {/* Row 1: Drying | Center | Folding Shipping */}
            <div style={{ gridColumn: '1/2', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ScrollReveal fromY={20}>
                <ConceptNode n={1} label="Drying" subs={['Sun Drying', 'Industrial Drying']} color="#1A6B3E"/>
              </ScrollReveal>
            </div>
            <div style={{ gridColumn: '2/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ScrollReveal fromY={0}>
                <div style={{
                  width: 90, height: 90, borderRadius: '50%',
                  background: GOLD, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3C8.5 3 5.5 5.5 5 9M12 3C15.5 3 18.5 5.5 19 9M12 3v18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="3" fill="#fff" opacity="0.4"/>
                  </svg>
                  <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>CONCEPT</span>
                </div>
              </ScrollReveal>
            </div>
            <div style={{ gridColumn: '3/4', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ScrollReveal fromY={20}>
                <ConceptNode n={7} label="Folding Shipping" subs={[]} color="#1A6B3E"/>
              </ScrollReveal>
            </div>
            <div style={{ gridColumn: '4/5', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ScrollReveal fromY={20}>
                <ConceptNode n={6} label="Fumigation" subs={[]} color="#8FA87E"/>
              </ScrollReveal>
            </div>

            {/* Row 2: Process | (center) | Storing */}
            <div style={{ gridColumn: '1/2' }}>
              <ScrollReveal fromY={20}>
                <ConceptNode n={2} label="Process" subs={['Examination', 'Breaking Machine', 'Sifting', 'Delta Cleaner', 'Cylinder Separator', 'Gravity Table', 'Metal Detector', 'Sortex']} color="#1A6B3E"/>
              </ScrollReveal>
            </div>
            <div style={{ gridColumn: '2/3' }}/>
            <div style={{ gridColumn: '3/4' }}>
              <ScrollReveal fromY={20}>
                <ConceptNode n={5} label="Storing" subs={[]} color="#A8BF9A"/>
              </ScrollReveal>
            </div>
            <div style={{ gridColumn: '4/5' }}>
              <ScrollReveal fromY={20}>
                <ConceptNode n={4} label="Packing" subs={[]} color="#8FA87E"/>
              </ScrollReveal>
            </div>

            {/* Row 3: Quality Control */}
            <div style={{ gridColumn: '1/2' }}>
              <ScrollReveal fromY={20}>
                <ConceptNode n={3} label="Quality Control" subs={['Our In-House Lab', 'Ministry of Agriculture Research', 'Euro Fins Germany']} color="#1A6B3E"/>
              </ScrollReveal>
            </div>
          </div>

          {/* Mobile concept list */}
          <div className="pc-concept-mobile" style={{ display: 'none' }}>
            <StaggerReveal stagger={0.1}>
              {CONCEPT_NODES.map(node => (
                <div key={node.n} style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1.5px solid ${node.color}40`,
                  borderRadius: 16, padding: '20px 24px', marginBottom: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: node.sub.length > 0 ? 12 : 0 }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: node.color, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontFamily: MONO, fontSize: 12, fontWeight: 800, color: '#fff', flexShrink: 0,
                    }}>{node.n}</span>
                    <h3 style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: '#fff', margin: 0 }}>{node.label}</h3>
                  </div>
                  {node.sub.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingLeft: 48 }}>
                      {node.sub.map(s => (
                        <span key={s} style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.08)', padding: '3px 10px', borderRadius: 999 }}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ── CURVED LOOP ──────────────────────────────── */}
      <div style={{ position: 'relative', background: '#111', paddingTop: 'clamp(40px,5vw,72px)', paddingBottom: 'clamp(80px,10vw,120px)' }}>
        <CurvedLoop
          marqueeText="SEED TO SHELF • FROM FARM • TRACEABLE • ZERO WASTE • VERIFIED PROCESS • "
          speed={1.5} curveAmount={250}
          className="fill-[#fff] uppercase font-mono tracking-widest opacity-20"
        />
      </div>
    </main>
  );
}

function ConceptNode({ n, label, subs, color }: { n: number; label: string; subs: string[]; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => subs.length > 0 && setOpen(o => !o)}
      style={{ cursor: subs.length > 0 ? 'pointer' : 'default' }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: color, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 2,
          boxShadow: open ? `0 0 0 4px ${color}40` : 'none',
          transition: 'box-shadow 0.2s',
        }}>
          <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 800, color: '#fff' }}>{n}</span>
        </div>
        <span style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.2 }}>{label}</span>
        {subs.length > 0 && (
          <span style={{ fontFamily: MONO, fontSize: 8, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{open ? '▲ CLOSE' : '▼ EXPAND'}</span>
        )}
      </div>
      {open && subs.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
          {subs.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: MONO, fontSize: 8, color: 'rgba(255,255,255,0.35)' }}>{i + 1}</span>
              <span style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
