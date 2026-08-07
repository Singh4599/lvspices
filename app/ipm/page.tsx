'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView as fmUseInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import IPMProcessFlow from '@/components/technology/IPMProcessFlow';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';

/* ── constants ──────────────────────────────────────────────────────────── */
const CR    = '#AC033B';
const GREEN = '#1A6B3E';
const LIME  = '#2E8B57';
const INK   = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── data ───────────────────────────────────────────────────────────────── */


const SUSTAINABILITY = [
  { icon: '🌿', label: 'Monoray', color: '#2E8B57', desc: 'High pheromone pest attractants deliver better crop protection. This complex chemical pest-repellent delays harmful infestations, ensuring farmers can crop safely.' },
  { icon: '🏛',  label: 'Government', color: '#1A5FAB', desc: 'Working with government bodies to protect farmland, our special chemical stock boxes are monitored and the water supply is safeguarded through improved farm policy.' },
  { icon: '👨‍🌾', label: 'Farmer Training', color: GREEN, desc: 'Farmers are guided at all stages — seed selection, cross variety, growing practices — building continuous progress in quality, local knowledge and farm life.' },
];

const STATS = [
  { n: 100, suffix: '+', label: 'Registered Farms' },
  { n: 4000, suffix: '', label: 'Acres Under IPM' },
  { n: 10, suffix: '', label: 'Protocol Steps' },
  { n: 0, suffix: '', label: 'Tolerance: Excess Pesticide' },
];

/* ── Animated counter ───────────────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = fmUseInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now(), dur = 1600;
    const tick = () => {
      const t = Math.min((Date.now() - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * to));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ── Draw-on SVG path ───────────────────────────────────────────────────── */
function DrawPath({ d, stroke, delay = 0, duration = 2, strokeWidth = 1.5, fill = 'none' }: {
  d: string; stroke: string; delay?: number; duration?: number; strokeWidth?: number; fill?: string;
}) {
  const ref = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const inView = fmUseInView(ref as any, { once: true, margin: '-60px' });
  useEffect(() => { if (ref.current) setLen(ref.current.getTotalLength()); }, []);
  return (
    <motion.path
      ref={ref} d={d} stroke={stroke} strokeWidth={strokeWidth} fill={fill}
      strokeLinecap="round" strokeLinejoin="round"
      initial={{ strokeDashoffset: len || 2000, strokeDasharray: len || 2000, opacity: 0 }}
      animate={inView && len > 0 ? { strokeDashoffset: 0, strokeDasharray: len, opacity: 1 } : {}}
      transition={{ duration, delay, ease: 'easeInOut' }}
    />
  );
}

/* ── Floating organic blob ──────────────────────────────────────────────── */
function Orb({ color, size, x, y, delay = 0 }: { color: string; size: number; x: string; y: string; delay?: number }) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 0, borderRadius: '50%', width: size, height: size, background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`, filter: 'blur(30px)' }}
      animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ── Scroll-triggered reveal ────────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 30, style }: {
  children: React.ReactNode; delay?: number; y?: number; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = fmUseInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated progress bar ──────────────────────────────────────────────── */
function ProgressBar({ pct, color, label }: { pct: number; color: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = fmUseInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)' }}>{label}</span>
        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{ height: 7, background: 'rgba(0,0,0,0.07)', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
        <motion.div
          style={{ height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${color}, ${color}99)`, position: 'relative', overflow: 'hidden' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Shimmer sweep */}
          <motion.div
            style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', transform: 'skewX(-20deg)' }}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 2, delay: 1.2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function IPMPage() {

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK, overflowX: 'hidden' }}>
      <TechTurbineHero badgeText="IPM" marqueeText="INTEGRATED PEST MANAGEMENT" />
      <VelocityMarquee dark />

      {/* ══ 1. OVERVIEW — animated leaf SVG + stats ══════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>

        {/* Animated SVG growing plant/leaf network */}
        <div style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', pointerEvents: 'none', opacity: 0.07 }}>
          <svg viewBox="0 0 600 700" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMaxYMid meet">
            {/* Main trunk */}
            <DrawPath d="M300,680 C300,600 280,500 300,400 C320,300 280,200 300,100" stroke={GREEN} strokeWidth={3} delay={0} duration={2.5} />
            {/* Branches */}
            <DrawPath d="M300,550 C280,520 230,490 190,460" stroke={GREEN} strokeWidth={2} delay={0.5} duration={1.2} />
            <DrawPath d="M300,480 C330,450 380,420 420,390" stroke={GREEN} strokeWidth={2} delay={0.8} duration={1.2} />
            <DrawPath d="M300,380 C270,350 220,330 170,310" stroke={GREEN} strokeWidth={2} delay={1.1} duration={1.2} />
            <DrawPath d="M300,300 C330,270 390,250 440,230" stroke={GREEN} strokeWidth={2} delay={1.4} duration={1.2} />
            <DrawPath d="M300,200 C275,175 235,160 195,140" stroke={GREEN} strokeWidth={2} delay={1.7} duration={1.2} />
            <DrawPath d="M300,150 C330,120 370,105 410,90" stroke={GREEN} strokeWidth={2} delay={2.0} duration={1.2} />
            {/* Leaf blobs */}
            {[
              { cx: 175, cy: 450, rx: 35, ry: 20, rot: -30, d: 0.7 },
              { cx: 430, cy: 380, rx: 38, ry: 22, rot: 20, d: 1.0 },
              { cx: 155, cy: 300, rx: 40, ry: 24, rot: -20, d: 1.3 },
              { cx: 450, cy: 220, rx: 36, ry: 20, rot: 25, d: 1.6 },
              { cx: 180, cy: 130, rx: 34, ry: 18, rot: -15, d: 1.9 },
              { cx: 415, cy: 80, rx: 38, ry: 20, rot: 15, d: 2.2 },
            ].map((l, i) => (
              <motion.ellipse
                key={i} cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry}
                fill={GREEN}
                style={{ transformOrigin: `${l.cx}px ${l.cy}px`, rotate: l.rot }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.6 }}
                transition={{ duration: 0.6, delay: l.d, type: 'spring', stiffness: 200 }}
                viewport={{ once: true }}
              />
            ))}
          </svg>
        </div>

        {/* Floating orbs */}
        <Orb color={GREEN} size={340} x="70%" y="-10%" delay={0} />
        <Orb color={LIME} size={200} x="5%" y="60%" delay={1.5} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Left text block */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <Reveal delay={0.1}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: GREEN, marginBottom: 16 }}>Overview</div>
              </Reveal>
              <Reveal delay={0.2}>
                <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
                  Integrated Pest<br />
                  <em style={{ color: GREEN, fontStyle: 'italic' }}>Management</em>
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.62)', lineHeight: 1.85, margin: '0 0 16px' }}>
                  India's farms face growing pressure from pesticide overuse. We believe in formulating sustainable livelihoods for farmers through responsible agricultural practices. We are now in our 4th year of our IPM Country programme.
                </p>
                <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.62)', lineHeight: 1.85, margin: '0 0 32px' }}>
                  We have identified 100+ progressive farmers across 4,000 acres, helping them adopt good agricultural practices and integrated pest management, delivering traceable, residue-free spices to the world.
                </p>
              </Reveal>

              {/* Progress bars */}
              <Reveal delay={0.45}>
                <ProgressBar pct={100} color={GREEN} label="IPM-Registered Farms" />
                <ProgressBar pct={94} color={GREEN} label="Pesticide Compliance Rate" />
                <ProgressBar pct={88} color={GREEN} label="Traceability Coverage" />
                <ProgressBar pct={100} color={GREEN} label="Pre-shipment Inspection" />
              </Reveal>
            </div>

            {/* Right stats card */}
            <Reveal delay={0.4} style={{ flexShrink: 0, width: 'clamp(260px,30vw,340px)' }}>
              <div style={{ background: '#F8F6F1', borderRadius: 24, padding: 36, border: `1.5px solid ${GREEN}20`, boxShadow: `0 12px 48px ${GREEN}12`, position: 'relative', overflow: 'hidden' }}>
                {/* Animated corner SVG */}
                <svg style={{ position: 'absolute', top: 0, right: 0, opacity: 0.08, pointerEvents: 'none' }} width={120} height={120} viewBox="0 0 120 120">
                  <DrawPath d="M120,0 L120,120 L0,120" stroke={GREEN} strokeWidth={40} delay={0.6} duration={1} />
                </svg>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: GREEN, marginBottom: 24 }}>Programme Stats</div>
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < STATS.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                    viewport={{ once: true }}
                  >
                    <span style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>{s.label}</span>
                    <span style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 800, color: GREEN }}>
                      <Counter to={s.n} suffix={s.suffix} />
                    </span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 2. SVG WAVE DIVIDER ══════════════════════════════════════════ */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 90, background: '#FAFAF8', marginTop: -1 }}>
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
          <motion.path
            d="M0,45 C240,90 480,0 720,45 C960,90 1200,0 1440,45 L1440,0 L0,0 Z"
            fill="#fff"
            animate={{ d: [
              'M0,45 C240,90 480,0 720,45 C960,90 1200,0 1440,45 L1440,0 L0,0 Z',
              'M0,20 C240,0 480,90 720,20 C960,0 1200,90 1440,20 L1440,0 L0,0 Z',
              'M0,45 C240,90 480,0 720,45 C960,90 1200,0 1440,45 L1440,0 L0,0 Z',
            ]}}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* ══ 3. IPM STEPS — SVG Process Flow ════════════════════ */}
      <IPMProcessFlow />

      {/* ══ 4. CURVED MARQUEE (Middle) ══════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#FAFAF8', paddingTop: '12px', paddingBottom: 'clamp(40px,5vw,72px)' }}>
        {/* LV Spices Logo centered above the loop */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0px' }}>
          <img
            src="/logo.png"
            alt="LV Spices"
            style={{ height: 'clamp(48px,6vw,80px)', width: 'auto', objectFit: 'contain', opacity: 0.85 }}
          />
        </div>
        <CurvedLoop
          marqueeText="PESTICIDE FREE • FARM TO FORK • IPM CERTIFIED • SUSTAINABLE • ZERO TOLERANCE • "
          speed={1.5} curveAmount={250}
          className="fill-[#1A6B3E] uppercase font-mono tracking-widest"
        />
      </div>

      {/* ══ 5. SUSTAINABILITY — animated ecosystem SVG ═══════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>

        {/* Animated concentric circles SVG decoration */}
        <div style={{ position: 'absolute', right: '-8%', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.04 }}>
          <svg width={500} height={500} viewBox="0 0 500 500">
            {[60, 120, 180, 240].map((r, i) => (
              <motion.circle
                key={r} cx={250} cy={250} r={r}
                stroke={GREEN} strokeWidth={2} fill="none"
                strokeDasharray={`${r * 0.4} ${r * 0.15}`}
                style={{ transformOrigin: '250px 250px' }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </svg>
        </div>

        {/* Animated SVG sprout on left */}
        <div style={{ position: 'absolute', left: '-2%', bottom: '0%', pointerEvents: 'none', opacity: 0.06, width: 200, height: 300 }}>
          <svg viewBox="0 0 200 300" style={{ width: '100%', height: '100%' }}>
            <DrawPath d="M100,300 C100,250 90,200 100,150 C110,100 95,60 100,20" stroke={GREEN} strokeWidth={3} delay={0} duration={2} />
            <DrawPath d="M100,220 C80,200 50,190 30,175" stroke={GREEN} strokeWidth={2} delay={0.5} duration={1} />
            <DrawPath d="M100,160 C125,140 155,130 175,115" stroke={GREEN} strokeWidth={2} delay={0.8} duration={1} />
          </svg>
        </div>

        <Orb color={GREEN} size={280} x="-5%" y="-20%" delay={0} />
        <Orb color={LIME} size={220} x="75%" y="70%" delay={1.2} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal delay={0.1} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: GREEN, marginBottom: 14 }}>Sustainability</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05 }}>
              Suitable Sustainability<br /><em style={{ color: GREEN, fontStyle: 'italic' }}>Initiatives</em>
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {SUSTAINABILITY.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -8, boxShadow: `0 24px 56px ${s.color}20` }}
                style={{ padding: 32, borderRadius: 20, background: '#FAFAF8', border: `1.5px solid ${s.color}20`, position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.3s' }}
              >
                {/* Animated background arc */}
                <motion.svg
                  style={{ position: 'absolute', top: -20, right: -20, pointerEvents: 'none', opacity: 0.1 }}
                  width={120} height={120} viewBox="0 0 120 120"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <circle cx={60} cy={60} r={50} stroke={s.color} strokeWidth={2} fill="none" strokeDasharray="16 8" />
                </motion.svg>

                {/* Icon with animated ring */}
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
                  <motion.div
                    style={{ width: 64, height: 64, borderRadius: 16, background: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}
                    animate={{ rotate: [0, 4, -4, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {s.icon}
                  </motion.div>
                  <motion.div
                    style={{ position: 'absolute', inset: -4, borderRadius: 20, border: `1.5px solid ${s.color}` }}
                    animate={{ opacity: [0, 0.5, 0], scale: [0.95, 1.08, 0.95] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  />
                </div>

                <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: INK, margin: '0 0 12px' }}>{s.label}</h3>
                <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.57)', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>

                {/* Bottom accent line */}
                <motion.div
                  style={{ position: 'absolute', bottom: 0, left: 0, height: 3, background: `linear-gradient(90deg, ${s.color}, transparent)`, borderRadius: '0 0 0 20px' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  transition={{ duration: 1, delay: 0.4 + i * 0.15 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. PROMISE BANNER — animated roots SVG ═══════════════════════ */}
      <section style={{ padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,80px)', background: `linear-gradient(135deg, ${INK} 0%, #0d200f 100%)`, position: 'relative', overflow: 'hidden' }}>

        {/* Growing roots / mycelium SVG */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.1 }}>
          <svg width="100%" height="100%" viewBox="0 0 1400 260" preserveAspectRatio="xMidYMid slice">
            {[
              'M700,260 C680,220 650,180 620,140 C590,100 560,70 530,30',
              'M700,260 C720,220 750,175 780,135 C810,95 840,65 875,25',
              'M700,260 C700,230 685,200 670,170 C650,130 640,90 625,50',
              'M700,260 C700,230 715,195 730,165 C750,125 760,85 775,45',
              'M700,260 C660,240 620,220 580,205 C540,185 500,175 455,160',
              'M700,260 C740,240 780,215 820,200 C865,182 905,172 955,158',
              'M620,140 C600,120 570,105 540,85 C510,65 480,50 450,30',
              'M780,135 C800,115 830,100 860,80 C890,60 920,45 950,25',
            ].map((d, i) => (
              <DrawPath key={i} d={d} stroke={GREEN} strokeWidth={1.5} delay={i * 0.2} duration={1.8} />
            ))}
            {/* Tiny leaf dots at tips */}
            {[
              { cx: 530, cy: 30 }, { cx: 875, cy: 25 }, { cx: 625, cy: 50 }, { cx: 775, cy: 45 },
              { cx: 455, cy: 160 }, { cx: 955, cy: 158 }, { cx: 450, cy: 30 }, { cx: 950, cy: 25 },
            ].map((p, i) => (
              <motion.circle key={i} cx={p.cx} cy={p.cy} r={5} fill={GREEN}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.8 }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.1, type: 'spring' }}
                viewport={{ once: true }}
              />
            ))}
          </svg>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal delay={0.1}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
              Our Commitment
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(22px,3.5vw,44px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: '0 0 24px' }}>
              Every acre we partner with carries a single promise —<br />
              <motion.em
                style={{ color: GREEN, fontStyle: 'italic' }}
                animate={{ textShadow: [`0 0 0px ${GREEN}`, `0 0 24px ${GREEN}80`, `0 0 0px ${GREEN}`] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                pesticide-free, traceable, responsible.
              </motion.em>
            </h2>
            <motion.a
              href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: GREEN, color: '#fff', fontFamily: SANS, fontWeight: 700, fontSize: 14, padding: '16px 36px', borderRadius: 999, textDecoration: 'none', boxShadow: `0 8px 32px ${GREEN}50` }}
              whileHover={{ scale: 1.04, y: -2, boxShadow: `0 16px 48px ${GREEN}70` }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More About Our Programme
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </motion.a>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
