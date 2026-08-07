'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ── constants ──────────────────────────────────────────────────────────── */
const CR    = '#AC033B';
const GREEN = '#1A6B3E';
const GOLD  = '#B5861A';
const INK   = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── Machine data ───────────────────────────────────────────────────────── */
export interface Machine {
  id: string;
  label: string;
  sub: string;
  color: string;
  icon: React.ReactNode;
  details: {
    title: string;
    desc: string;
    specs: { label: string; value: string }[];
  };
}

const SPICE_MACHINES: Machine[] = [
  {
    id: 'raw',
    label: 'Raw Spices',
    sub: 'Input',
    color: GOLD,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <ellipse cx="24" cy="34" rx="16" ry="8" fill="currentColor" opacity="0.2"/>
        <path d="M8 34 C8 28 16 18 24 14 C32 18 40 28 40 34" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15"/>
        <path d="M24 14 C22 10 18 8 15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M24 14 C26 9 30 7 33 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M24 14 C24 8 24 5 24 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    details: {
      title: 'Raw Spice Intake',
      desc: 'Raw material sourced from local mandis, APMCs, and outstation mandis. Material is procured from producing centres during peak harvest to maximise freshness and colour retention.',
      specs: [
        { label: 'Source', value: 'Mandis / APMCs' },
        { label: 'Inspection', value: 'On Arrival' },
        { label: 'Traceability', value: 'Farm Level' },
      ],
    },
  },
  {
    id: 'cleaning',
    label: 'Seed Cleaning',
    sub: 'Stage 01',
    color: '#1A5FAB',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="8" y="12" width="32" height="28" rx="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <path d="M8 20 H40" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 24 L18 34 M24 24 L24 34 M30 24 L30 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
        <circle cx="24" cy="8" r="4" fill="currentColor" opacity="0.4"/>
        <path d="M20 8 L24 12 L28 8" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    details: {
      title: 'Seed Cleaning Machine',
      desc: 'Initial cleaning removes dust, chaff, stones, and gross impurities. Multi-stage vibro-screens with air aspiration separate foreign matter. Out-sorted material is redirected to the domestic market.',
      specs: [
        { label: 'Type', value: 'Vibro-screen' },
        { label: 'Capacity', value: '2-5 T/hr' },
        { label: 'Mesh Size', value: '2–12 mm' },
      ],
    },
  },
  {
    id: 'optical',
    label: 'Optical Sorter',
    sub: 'Stage 02',
    color: '#6B2A6B',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="6" y="16" width="36" height="20" rx="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="16" cy="26" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="32" cy="26" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8 L16 16 M20 8 L16 16 M28 8 L32 16 M36 8 L32 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="26" r="1.5" fill="currentColor"/>
        <circle cx="32" cy="26" r="1.5" fill="currentColor"/>
      </svg>
    ),
    details: {
      title: 'Z-Series Optical Sorter',
      desc: 'Advanced Z-series colour sorting with dual cameras and pre-packing magnets. Removes colour-defective seeds, discoloured particles, and residual metal contamination using real-time AI-driven image processing.',
      specs: [
        { label: 'Technology', value: 'Z-Series CCD' },
        { label: 'Accuracy', value: '99.9%' },
        { label: 'Throughput', value: '3 T/hr' },
      ],
    },
  },
  {
    id: 'roaster',
    label: 'Drum Roaster',
    sub: 'Stage 03',
    color: CR,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <ellipse cx="24" cy="24" rx="16" ry="14" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <ellipse cx="24" cy="24" rx="10" ry="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/>
        <path d="M16 38 L16 44 M32 38 L32 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 24 L4 24 M40 24 L44 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        {/* Flame */}
        <path d="M24 30 C22 28 20 26 22 23 C22 23 23 25 24 24 C25 22 24 19 26 18 C27 21 26 22 27 24 C28 21 30 20 30 23 C30 26 28 28 26 30 Z" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
    details: {
      title: 'Drum Roaster',
      desc: 'Continuous rotary drum roaster with precision temperature control for even roasting. Infrared heating with automatic tumbling ensures uniform colour and aroma development without scorching.',
      specs: [
        { label: 'Temp Range', value: '80–250°C' },
        { label: 'Control', value: 'PLC Automated' },
        { label: 'Capacity', value: '500 kg/hr' },
      ],
    },
  },
  {
    id: 'sterilizer',
    label: 'Steam Sterilizer',
    sub: 'Stage 04',
    color: '#0A4D6E',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="10" y="14" width="28" height="24" rx="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <path d="M16 8 L16 14 M24 6 L24 14 M32 8 L32 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        {/* Steam wisps */}
        <path d="M16 22 Q14 19 16 16 Q18 13 16 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M24 22 Q22 19 24 16 Q26 13 24 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M32 22 Q30 19 32 16 Q34 13 32 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <rect x="14" y="30" width="20" height="4" rx="2" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
    details: {
      title: 'Steam Sterilizer',
      desc: 'High-pressure steam sterilization eliminates microbial contamination without chemicals, preserving natural colour, aroma, and volatile oil content. Fully automated HTST (High Temperature Short Time) process.',
      specs: [
        { label: 'Method', value: 'HTST Steam' },
        { label: 'Pressure', value: '3–5 bar' },
        { label: 'Log Reduction', value: '5-log' },
      ],
    },
  },
  {
    id: 'cryo',
    label: 'Cryo Grinder',
    sub: 'Stage 05',
    color: '#1A5FAB',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="8" y="8" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.08"/>
        <text x="24" y="29" textAnchor="middle" fontFamily="monospace" fontSize="13" fontWeight="800" fill="currentColor">-196°</text>
        <path d="M8 18 H40" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        {/* Snowflake */}
        <circle cx="24" cy="13" r="1.5" fill="currentColor" opacity="0.5"/>
        <path d="M22 11 L24 13 L26 11 M22 15 L24 13 L26 15" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      </svg>
    ),
    details: {
      title: 'Cryogenic Grinder',
      desc: 'Liquid nitrogen (-196°C) cooling before and during grinding preserves volatile oils, aroma compounds, and natural colour. Ultra-fine particle sizes achieved without heat damage, maintaining full biological activity.',
      specs: [
        { label: 'Temperature', value: '-196°C (LN₂)' },
        { label: 'Particle Size', value: '< 500 micron' },
        { label: 'Oil Retention', value: '98%+' },
      ],
    },
  },
  {
    id: 'cfg',
    label: 'CFG Technology',
    sub: 'Stage 06',
    color: GREEN,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="6" y="10" width="36" height="12" rx="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
        <rect x="6" y="26" width="36" height="4" rx="2" fill="currentColor" opacity="0.3"/>
        <rect x="6" y="33" width="36" height="4" rx="2" fill="currentColor" opacity="0.2"/>
        <circle cx="38" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M38 7 L38 13 M35 10 L41 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    details: {
      title: 'CFG (Continuous Flow Grinder)',
      desc: 'Final stage continuous flow grinding with integrated classification. Closed-loop particle size control ensures consistent batch-to-batch fineness. Final product is vibroseived to remove coarse particles before packing.',
      specs: [
        { label: 'Type', value: 'Closed-Loop CFG' },
        { label: 'Output', value: '1–3 T/hr' },
        { label: 'Consistency', value: '±5 micron' },
      ],
    },
  },
  {
    id: 'output',
    label: 'Finished Product',
    sub: 'Export Ready',
    color: GOLD,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" width="36" height="36">
        <rect x="10" y="16" width="28" height="26" rx="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15"/>
        <path d="M10 22 H38" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 8 L18 16 M30 8 L30 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 30 L22 36 L32 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="24" y="14" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="currentColor" opacity="0.6">LV</text>
      </svg>
    ),
    details: {
      title: 'Finished Product',
      desc: 'Export-ready product packed in new jute bags, PP bags, or vacuum packs per buyer specifications. Each pack carries batch traceability codes, SGS inspection reports, and Certificate of Analysis. Dispatched from Nhava Sheva / JNPT / Mundra.',
      specs: [
        { label: 'Packing', value: 'Jute / PP / Vacuum' },
        { label: 'Dispatch', value: 'JNPT / Mundra' },
        { label: 'Traceability', value: '100%' },
      ],
    },
  },
];

/* ── Animated flowing pipe connector ────────────────────────────────────── */
function FlowPipe({ active, color = CR }: { active: boolean; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: 64, flexShrink: 0 }}>
      {/* Pipe tube */}
      <svg width="64" height="24" viewBox="0 0 64 24" fill="none" style={{ display: 'block' }}>
        {/* Pipe body */}
        <rect x="0" y="9" width="64" height="6" rx="3" fill={`${color}20`} stroke={`${color}40`} strokeWidth="1"/>
        {/* Animated flow particles */}
        {active && [0, 1, 2].map(i => (
          <motion.circle
            key={i}
            cx={0}
            cy={12}
            r={2.5}
            fill={color}
            opacity={0.7}
            animate={{ cx: [0, 64] }}
            transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        {/* Arrow head */}
        <path d="M56 8 L64 12 L56 16" fill={`${color}60`}/>
      </svg>
    </div>
  );
}

/* ── Machine node ───────────────────────────────────────────────────────── */
function MachineNode({ machine, index, isActive, onClick, isVisible }: {
  machine: Machine;
  index: number;
  isActive: boolean;
  onClick: () => void;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 200 }}
      onClick={onClick}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', position: 'relative', flexShrink: 0 }}
    >
      {/* Glow ring when active */}
      {isActive && (
        <motion.div
          style={{ position: 'absolute', inset: -10, borderRadius: 24, border: `2px solid ${machine.color}`, zIndex: 0 }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.97, 1.03, 0.97] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Machine body */}
      <motion.div
        style={{
          width: 96,
          height: 96,
          borderRadius: 20,
          background: isActive ? machine.color : '#fff',
          border: `2px solid ${isActive ? machine.color : `${machine.color}40`}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          color: isActive ? '#fff' : machine.color,
          boxShadow: isActive ? `0 12px 32px ${machine.color}50` : `0 4px 16px ${machine.color}15`,
          position: 'relative',
          zIndex: 1,
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
        whileHover={{ scale: 1.06, boxShadow: `0 16px 40px ${machine.color}40` }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Subtle shimmer on hover */}
        <motion.div
          style={{ position: 'absolute', inset: 0, borderRadius: 18, background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)', pointerEvents: 'none' }}
          animate={{ opacity: isActive ? 0.4 : 0.6 }}
        />
        {machine.icon}
        {/* Pulse dot top-right */}
        <motion.div
          style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: isActive ? '#fff' : machine.color }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
        />
      </motion.div>

      {/* Label */}
      <div style={{ marginTop: 10, textAlign: 'center', width: 100 }}>
        <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: machine.color, marginBottom: 3 }}>
          {machine.sub}
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 700, color: isActive ? INK : 'rgba(0,0,0,0.7)', lineHeight: 1.2 }}>
          {machine.label}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Detail panel ───────────────────────────────────────────────────────── */
function DetailPanel({ machine, onClose }: { machine: Machine; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: '#fff',
        borderRadius: 20,
        border: `1.5px solid ${machine.color}30`,
        padding: 28,
        boxShadow: `0 20px 60px ${machine.color}25`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent corner */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 80, height: 80, borderRadius: '0 0 80px 0', background: `${machine.color}12`, pointerEvents: 'none' }} />
      {/* Animated top border */}
      <motion.div
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${machine.color}, ${machine.color}50)`, transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, position: 'relative' }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: machine.color, marginBottom: 6 }}>
            {machine.sub}
          </div>
          <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 800, color: INK, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {machine.details.title}
          </h3>
        </div>
        {/* Close */}
        <motion.button
          onClick={onClose}
          style={{ width: 28, height: 28, borderRadius: '50%', border: `1.5px solid rgba(0,0,0,0.12)`, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 12 }}
          whileHover={{ background: `${machine.color}15` }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.button>
      </div>

      <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, margin: '0 0 20px' }}>
        {machine.details.desc}
      </p>

      {/* Specs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {machine.details.specs.map((spec, i) => (
          <motion.div
            key={spec.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.25 + i * 0.08 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: `${machine.color}08`, borderRadius: 8, border: `1px solid ${machine.color}15` }}
          >
            <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>{spec.label}</span>
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: machine.color }}>{spec.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══ Main export ════════════════════════════════════════════════════════════ */
export default function MachinePipelineFlow({ machines = SPICE_MACHINES }: { machines?: Machine[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [flowOn, setFlowOn] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const activeMachine = machines.find(m => m.id === active) ?? null;

  return (
    <div ref={ref} style={{ width: '100%' }}>
      {/* ── Header controls ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 6 }}>
            SEED TO SHELF — CONTINUOUS PROCESSING LINE
          </div>
          <div style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>
            Tap any machine to learn more
          </div>
        </div>
        {/* Flow toggle */}
        <motion.button
          onClick={() => setFlowOn(f => !f)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, border: `1.5px solid ${flowOn ? CR : 'rgba(0,0,0,0.15)'}`, background: flowOn ? `${CR}10` : 'none', cursor: 'pointer', fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: flowOn ? CR : 'rgba(0,0,0,0.45)' }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div style={{ width: 6, height: 6, borderRadius: '50%', background: flowOn ? CR : 'rgba(0,0,0,0.3)' }} animate={{ opacity: flowOn ? [1, 0.3, 1] : 1 }} transition={{ duration: 1.5, repeat: Infinity }} />
          {flowOn ? 'Flow: ON' : 'Flow: OFF'}
        </motion.button>
      </div>

      {/* ── Pipeline row ── */}
      <div style={{ overflowX: 'auto', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, paddingTop: 20, paddingBottom: 8, minWidth: 'max-content' }}>
          {machines.map((machine, i) => (
            <div key={machine.id} style={{ display: 'flex', alignItems: 'center' }}>
              <MachineNode
                machine={machine}
                index={i}
                isActive={active === machine.id}
                onClick={() => setActive(prev => prev === machine.id ? null : machine.id)}
                isVisible={inView}
              />
              {i < machines.length - 1 && (
                <FlowPipe active={flowOn} color={machine.color} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Click instruction hint ── */}
      {active === null && (
        <motion.div
          style={{ textAlign: 'center', marginTop: 12 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>
            ↑ Click any machine to learn more ↑
          </span>
        </motion.div>
      )}

      {/* ── Detail panel ── */}
      <AnimatePresence mode="wait">
        {activeMachine && (
          <motion.div style={{ marginTop: 28 }} key={activeMachine.id}>
            <DetailPanel machine={activeMachine} onClose={() => setActive(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { SPICE_MACHINES };
