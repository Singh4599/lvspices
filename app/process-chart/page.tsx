'use client';

import { useState, useRef, useEffect } from 'react';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import CurvedLoop from '@/components/ui/CurvedLoop';
import ProcessChartFlow from '@/components/technology/ProcessChartFlow';
import ConceptFlow from '@/components/technology/ConceptFlow';

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
          </ScrollReveal>

          <ProcessChartFlow />

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

          <ConceptFlow />
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


