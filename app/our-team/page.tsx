'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import ProfileCard from '@/components/ui/ProfileCard';

const CR    = '#AC033B';
const INK   = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

const FOUNDER = {
  name: 'Bhavik Karani',
  title: 'Chief Executive Officer (CEO)',
  quote: '"The biggest success is that you have contentment. Hopelessness is not allowed in our religion. You should be persistent. If you are constantly working towards some goal, the divine help is also there for you."',
  bio: `Bhavik Karani is a leading Indian entrepreneur and philanthropist who is the Founder and Chairman of LV Spices. He was the first entrepreneur in his family, starting with a small company that produced hygienic, packaged high-recipe mixes and pure spices.\n\n5 years later, Mr. Bhavik has established a company with a strong presence in over 70 countries across the globe. Today, LV Spices is the number one choice of consumers due to its premium quality and traditional authentic taste.`,
  accent: CR,
};

const TEAM = [
  { name: 'Nina Karani',  title: 'Head of International Sales',     initials: 'NK', accent: '#AC033B', dept: 'Sales',       avatarUrl: '/team/nina.jpg',     backTagline: 'Building global partnerships and opening doors to 70+ countries for LV Spices.',      backStats: [{ label: 'Countries', value: '70+' }, { label: 'Years', value: '5+' }] },
  { name: 'Hiren Shah',   title: 'Procurement Manager',             initials: 'HS', accent: '#1A5FAB', dept: 'Procurement', avatarUrl: '/team/hiren.png',    backTagline: 'Ensuring the finest raw spices reach our facilities at optimal cost and quality.',      backStats: [{ label: 'Suppliers', value: '120+' }, { label: 'SKUs', value: '500+' }] },
  { name: 'Parth Karani', title: 'Business Development Manager',    initials: 'PK', accent: '#2E6B3E', dept: 'Business Dev',avatarUrl: '/team/parth.png',    backTagline: 'Identifying new opportunities and scaling LV Spices to new international markets.',   backStats: [{ label: 'Markets', value: '30+' }, { label: 'Deals', value: '200+' }] },
  { name: 'Mukesh Vora',  title: 'Operations Manager',              initials: 'MV', accent: '#7B4E1B', dept: 'Operations',  avatarUrl: '/team/mukesh.png',   backTagline: 'Orchestrating seamless production cycles to deliver on time, every time.',             backStats: [{ label: 'Tonnes/Mo', value: '500+' }, { label: 'Uptime', value: '99%' }] },
  { name: 'Minakshi Rao', title: 'Quality Control Manager',         initials: 'MR', accent: '#6B2A6B', dept: 'Quality',     avatarUrl: '/team/minakshi.jpg', backTagline: 'Upholding world-class quality standards across every batch — zero compromise.',         backStats: [{ label: 'Tests/Batch', value: '40+' }, { label: 'Certifications', value: '12' }] },
  { name: 'Vinod Singh',  title: 'Export Documentation Specialist', initials: 'VS', accent: '#0A4D6E', dept: 'Export Docs', avatarUrl: '/team/vinod.png',    backTagline: 'Navigating complex international trade regulations with precision and speed.',          backStats: [{ label: 'Shipments', value: '1000+' }, { label: 'Countries', value: '55+' }] },
  { name: 'Vishal Seth',  title: 'Logistics Manager',               initials: 'VS', accent: '#1A7A4A', dept: 'Logistics',   avatarUrl: '/team/vishal.png',   backTagline: 'Delivering freshness to the world — end-to-end supply chain mastery.',               backStats: [{ label: 'On-Time', value: '97%' }, { label: 'Partners', value: '40+' }] },
];

const VALUES = [
  { icon: '◉', label: 'Real Ingredients', desc: 'We only use 100% authentic and safe ingredients.' },
  { icon: '◈', label: 'No Artificial Colour', desc: 'There is no artificial colour added to our products.' },
  { icon: '✦', label: 'Real Flavour', desc: 'The flavour of our product is extracted and genuine.' },
];

/* ── animated "draw-on" SVG path ─────────────────────────────────────────── */
function DrawPath({ d, stroke, delay = 0, duration = 2, strokeWidth = 1.5 }: {
  d: string; stroke: string; delay?: number; duration?: number; strokeWidth?: number;
}) {
  const ref = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (ref.current) setLen(ref.current.getTotalLength());
  }, []);

  return (
    <motion.path
      ref={ref}
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      initial={{ strokeDashoffset: len, strokeDasharray: len, opacity: 0 }}
      animate={inView && len > 0 ? { strokeDashoffset: 0, strokeDasharray: len, opacity: 1 } : {}}
      transition={{ duration, delay, ease: 'easeInOut' }}
    />
  );
}

/* ── floating SVG blob ───────────────────────────────────────────────────── */
function FloatingBlob({ color, x, y, size, delay = 0 }: {
  color: string; x: string; y: string; size: number; delay?: number;
}) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 0 }}
      animate={{ y: [0, -24, 0], x: [0, 12, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg width={size} height={size} viewBox="0 0 200 200">
        <defs>
          <radialGradient id={`blob-${x}-${y}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="100" fill={`url(#blob-${x}-${y})`} />
      </svg>
    </motion.div>
  );
}

/* ── morphing SVG ring ───────────────────────────────────────────────────── */
function MorphRing({ color, size = 240, delay = 0 }: { color: string; size?: number; delay?: number }) {
  return (
    <motion.svg
      width={size} height={size}
      viewBox="0 0 240 240"
      style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: -size / 2, marginTop: -size / 2, pointerEvents: 'none' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 18 + delay * 3, repeat: Infinity, ease: 'linear', delay }}
    >
      <motion.circle
        cx="120" cy="120" r="110"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="20 8"
        animate={{ strokeDashoffset: [0, -200] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
    </motion.svg>
  );
}

/* ── pulsing node for network viz ────────────────────────────────────────── */
function NetworkNode({ x, y, color, size = 8, delay = 0 }: {
  x: number; y: number; color: string; size?: number; delay?: number;
}) {
  return (
    <g>
      <motion.circle
        cx={x} cy={y} r={size * 1.8}
        fill={color}
        fillOpacity={0}
        animate={{ r: [size * 1.8, size * 3.5, size * 1.8], opacity: [0, 0.18, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay, ease: 'easeOut' }}
      />
      <motion.circle
        cx={x} cy={y} r={size}
        fill={color}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, delay, ease: 'easeInOut' }}
      />
      <circle cx={x} cy={y} r={size * 0.45} fill="#fff" opacity={0.7} />
    </g>
  );
}

/* ── animated counter ────────────────────────────────────────────────────── */
function AnimatedNumber({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const dur = 1800;
    const tick = () => {
      const t = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * to));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── section reveal wrapper ──────────────────────────────────────────────── */
function Reveal({ children, delay = 0, fromY = 32, style }: {
  children: React.ReactNode; delay?: number; fromY?: number; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: fromY }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Global styles ──────────────────────────────────────────────────────── */
const CSS = `
  .founder-section { display: flex; gap: clamp(40px,8vw,100px); align-items: flex-start; }
  .team-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 32px; }
  .team-card { width: calc(25% - 24px); min-width: 220px; }
  .founder-quote { padding-left: 28px; border-left: 3px solid #AC033B; text-align: left; }
  .founder-quote-line { height: 2px; background: linear-gradient(90deg, #AC033B, transparent); margin-top: 12px; margin-left: 28px; border-radius: 2px; }
  
  @media (max-width: 1100px) { .team-card { width: calc(33.333% - 22px); } }
  @media (max-width: 800px) {
    .founder-section { flex-direction: column !important; align-items: center; text-align: center; }
    .founder-quote { padding-left: 0; padding-top: 24px; border-left: none; border-top: 3px solid #AC033B; text-align: center; display: inline-block; }
    .founder-quote-line { margin-left: auto; margin-right: auto; background: linear-gradient(90deg, transparent, #AC033B, transparent); width: 60% !important; }
    .team-card { width: 100%; max-width: 340px; margin: 0 auto; }
  }
  @media (max-width: 500px) { .team-card { width: 100%; max-width: 100%; } }
`;

/* ══════════════════════════════════════════════════════════════════════════ */
export default function OurTeamPage() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, -80]);

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK, overflowX: 'hidden' }}>
      <style>{CSS}</style>

      <TechTurbineHero badgeText="Our Team" marqueeText="OUR TEAM" />
      <VelocityMarquee dark />

      {/* ══ 1. INTRO — animated SVG network graph ═════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,80px)', background: '#FAFAF8', position: 'relative', overflow: 'hidden' }}>

        {/* Animated network SVG background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.55 }}>
          <svg width="100%" height="100%" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
            {/* Connection lines */}
            {[
              { x1: 100, y1: 80,  x2: 320, y2: 200 },
              { x1: 320, y1: 200, x2: 600, y2: 140 },
              { x1: 600, y1: 140, x2: 880, y2: 220 },
              { x1: 880, y1: 220, x2: 1100, y2: 100 },
              { x1: 320, y1: 200, x2: 500, y2: 380 },
              { x1: 600, y1: 140, x2: 500, y2: 380 },
              { x1: 880, y1: 220, x2: 700, y2: 400 },
              { x1: 500, y1: 380, x2: 700, y2: 400 },
              { x1: 100, y1: 80,  x2: 200, y2: 320 },
              { x1: 200, y1: 320, x2: 500, y2: 380 },
            ].map((l, i) => (
              <DrawPath
                key={i}
                d={`M${l.x1},${l.y1} Q${(l.x1 + l.x2) / 2},${Math.min(l.y1, l.y2) - 30} ${l.x2},${l.y2}`}
                stroke={CR}
                strokeWidth={1}
                delay={i * 0.15}
                duration={1.2}
              />
            ))}
            {/* Nodes */}
            {[
              { x: 100, y: 80, c: CR, d: 0 },
              { x: 320, y: 200, c: '#AC033B', d: 0.3 },
              { x: 600, y: 140, c: CR, d: 0.6 },
              { x: 880, y: 220, c: '#AC033B', d: 0.9 },
              { x: 1100, y: 100, c: CR, d: 1.2 },
              { x: 500, y: 380, c: '#AC033Baa', d: 0.45 },
              { x: 700, y: 400, c: '#AC033Baa', d: 0.75 },
              { x: 200, y: 320, c: '#AC033Baa', d: 0.15 },
            ].map((n, i) => <NetworkNode key={i} x={n.x} y={n.y} color={n.c} size={7} delay={n.d} />)}
          </svg>
        </div>

        {/* Floating blobs */}
        <FloatingBlob color={CR} x="75%" y="10%" size={320} delay={0} />
        <FloatingBlob color="#1A5FAB" x="5%" y="60%" size={200} delay={1.5} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Reveal delay={0.1}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              LV Spices Team
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              The People Behind<br />
              <motion.em
                style={{ color: CR, fontStyle: 'italic', display: 'inline-block' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Every Shipment
              </motion.em>
            </h1>
          </Reveal>
          <Reveal delay={0.36}>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 600, margin: '0 auto 56px', lineHeight: 1.8 }}>
              We at LV Spices treat everyone equally. We believe that our workforce is a family rather than employees — trust, belief and passion drive optimal output even during hard times.
            </p>
          </Reveal>

          {/* Animated stat bar */}
          <Reveal delay={0.48}>
            <div style={{ display: 'flex', gap: 'clamp(24px,4vw,60px)', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { num: 70, suffix: '+', label: 'Countries Served' },
                { num: 15, suffix: '+', label: 'Years of Excellence' },
                { num: 500, suffix: '+', label: 'Tonnes/Month' },
                { num: 100, suffix: '+', label: 'Team Members' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(32px,4vw,56px)', fontWeight: 900, color: CR, lineHeight: 1, letterSpacing: '-0.04em' }}>
                    <AnimatedNumber to={s.num} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginTop: 6 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 2. FOUNDER — parallax + animated SVG decoration ══════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>

        {/* Animated SVG corners */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.06 }} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <DrawPath d="M0,0 Q200,80 400,0 T800,0 T1200,0" stroke={CR} strokeWidth={2} delay={0} duration={2.5} />
          <DrawPath d="M0,700 Q200,620 400,700 T800,700 T1200,700" stroke={CR} strokeWidth={2} delay={0.5} duration={2.5} />
          <DrawPath d="M0,0 Q80,200 0,400 T0,700" stroke={CR} strokeWidth={2} delay={1} duration={2} />
          <DrawPath d="M1200,0 Q1120,200 1200,400 T1200,700" stroke={CR} strokeWidth={2} delay={1.2} duration={2} />
        </svg>

        {/* Big decorative circle behind founder */}
        <motion.div
          style={{ position: 'absolute', right: '-5%', top: '10%', width: 500, height: 500, borderRadius: '50%', background: `${CR}04`, pointerEvents: 'none' }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Reveal delay={0.1} style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>Our Founder</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05 }}>
              At LV Spices, we believe the best work is born from a shared sense of vision, innovation, commitment &amp; communication.
            </h2>
          </Reveal>

          <div className="founder-section">
            {/* Founder photo with animated rings */}
            <Reveal delay={0.2}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, flexShrink: 0 }}>
                <div style={{ position: 'relative', width: 'clamp(160px, 40vw, 200px)', height: 'clamp(160px, 40vw, 200px)' }}>
                  {/* Animated concentric rings */}
                  {[1, 1.3, 1.6].map((scale, i) => (
                    <motion.div
                      key={i}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: `${2 - i * 0.5}px solid ${CR}`,
                        scale,
                      }}
                      animate={{ opacity: [0.6, 0.15, 0.6], scale: [scale, scale * 1.04, scale] }}
                      transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
                    />
                  ))}
                  <img
                    src="/team/founder.jpg"
                    alt={FOUNDER.name}
                    style={{
                      width: '100%', height: '100%', borderRadius: '50%',
                      objectFit: 'cover', objectPosition: 'top',
                      border: `4px solid ${CR}`,
                      position: 'relative', zIndex: 2,
                      boxShadow: `0 20px 48px ${CR}30`,
                    }}
                  />
                  {/* Rotating dashed ring */}
                  <motion.svg
                    style={{ position: 'absolute', inset: -18, zIndex: 1, pointerEvents: 'none' }}
                    width={236} height={236}
                    viewBox="0 0 236 236"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  >
                    <circle cx="118" cy="118" r="108" stroke={CR} strokeWidth="1.5" fill="none" strokeDasharray="12 6" strokeOpacity="0.5" />
                  </motion.svg>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>{FOUNDER.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: CR, marginTop: 6 }}>{FOUNDER.title}</div>
                </div>
              </div>
            </Reveal>

            {/* Bio with animated underline on quote */}
            <Reveal delay={0.35} style={{ flex: 1 }}>
              {/* Animated SVG quote mark */}
              <div style={{ position: 'relative', marginBottom: 32 }}>
                <motion.svg
                  style={{ position: 'absolute', top: -8, left: -4 }}
                  width="40" height="32"
                  viewBox="0 0 40 32"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  viewport={{ once: true }}
                >
                  <text x="0" y="28" fontSize="48" fill={CR} opacity="0.12" fontFamily="Georgia, serif">"</text>
                </motion.svg>
                <blockquote className="founder-quote" style={{
                  fontFamily: SERIF, fontSize: 'clamp(15px,1.3vw,18px)', fontStyle: 'italic',
                  color: 'rgba(0,0,0,0.65)', lineHeight: 1.7, margin: 0,
                  position: 'relative', zIndex: 1,
                }}>
                  {FOUNDER.quote}
                </blockquote>
                {/* Animated underline */}
                <motion.div
                  className="founder-quote-line"
                  initial={{ width: 0 }}
                  whileInView={{ width: '60%' }}
                  transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                  viewport={{ once: true }}
                />
              </div>
              {FOUNDER.bio.split('\n\n').map((para, i) => (
                <motion.p
                  key={i}
                  style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.62)', lineHeight: 1.85, margin: '0 0 16px' }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  viewport={{ once: true }}
                >
                  {para}
                </motion.p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 3. TEAM GRID — with animated SVG wave divider above ══════════ */}
      <section style={{ background: '#F8F9FA', position: 'relative' }}>

        {/* SVG wave top divider */}
        <div style={{ position: 'relative', overflow: 'hidden', height: 80, marginBottom: -1 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="50%" stopColor="#fff" />
                <stop offset="100%" stopColor="#fff" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,0 L0,0 Z"
              fill="#fff"
              animate={{ d: [
                'M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,0 L0,0 Z',
                'M0,20 C360,60 720,80 1080,20 C1260,0 1380,50 1440,20 L1440,0 L0,0 Z',
                'M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,0 L0,0 Z',
              ]}}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        <div style={{ padding: 'clamp(32px,5vw,72px) clamp(24px,5vw,80px) clamp(64px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>

          {/* Animated dot grid background */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <svg width="100%" height="100%" style={{ opacity: 0.04 }}>
              <defs>
                <pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill={INK} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotgrid)" />
            </svg>
          </div>

          {/* Floating accent blobs in section */}
          <FloatingBlob color={CR} x="80%" y="5%" size={280} delay={0.5} />
          <FloatingBlob color="#1A5FAB" x="2%" y="70%" size={200} delay={2} />

          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <Reveal delay={0.1} style={{ textAlign: 'center', marginBottom: 56 }}>
              {/* Animated pill label */}
              <motion.div
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `${CR}12`, border: `1px solid ${CR}30`,
                  borderRadius: 999, padding: '6px 18px', marginBottom: 18,
                }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  style={{ width: 6, height: 6, borderRadius: '50%', background: CR }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR }}>
                  Executive Leadership
                </span>
              </motion.div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05 }}>
                Meet the<br /><em style={{ color: CR, fontStyle: 'italic' }}>Core Team</em>
              </h2>
            </Reveal>

            <div className="team-grid">
              {TEAM.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="team-card"
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: '-40px' }}
                  style={{ zIndex: 10 }}
                >
                  <ProfileCard
                    name={member.name}
                    title={member.title}
                    dept={member.dept}
                    handle={member.dept.toLowerCase().replace(' ', '')}
                    status="Active"
                    contactText={`Contact ${member.name.split(' ')[0]}`}
                    initials={member.initials}
                    avatarUrl={member.avatarUrl}
                    accentColor={member.accent}
                    showUserInfo={true}
                    enableTilt={true}
                    behindGlowEnabled={true}
                    innerGradient="linear-gradient(145deg, #ffffff 0%, #f4f6f8 100%)"
                    backTagline={member.backTagline}
                    backStats={member.backStats}
                    onContactClick={() => window.location.href = '/contact'}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. DNA HELIX SVG DIVIDER ════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(135deg, ${INK} 0%, #2a2015 100%)`, padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>

        {/* Animated DNA helix SVG */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.12 }}>
          <svg width="100%" height="100%" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid slice">
            {Array.from({ length: 20 }).map((_, i) => {
              const x = i * 70;
              const yTop = 40 + Math.sin(i * 0.6) * 60;
              const yBot = 160 - Math.sin(i * 0.6) * 60;
              return (
                <g key={i}>
                  <DrawPath d={`M${x},${yTop} L${x},${yBot}`} stroke="#fff" strokeWidth={1} delay={i * 0.08} duration={0.5} />
                  <motion.circle cx={x} cy={yTop} r={4} fill="#fff"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  />
                  <motion.circle cx={x} cy={yBot} r={4} fill={CR}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 + 1 }}
                  />
                </g>
              );
            })}
            <DrawPath d={`M0,100 ${Array.from({ length: 20 }).map((_, i) => `Q${i * 70 + 35},${40 + Math.sin((i + 0.5) * 0.6) * 60} ${(i + 1) * 70},${40 + Math.sin((i + 1) * 0.6) * 60}`).join(' ')}`} stroke="#fff" strokeWidth={1.5} delay={0} duration={3} />
            <DrawPath d={`M0,100 ${Array.from({ length: 20 }).map((_, i) => `Q${i * 70 + 35},${160 - Math.sin((i + 0.5) * 0.6) * 60} ${(i + 1) * 70},${160 - Math.sin((i + 1) * 0.6) * 60}`).join(' ')}`} stroke={CR} strokeWidth={1.5} delay={0.5} duration={3} />
          </svg>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal delay={0.1}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
              Our Promise
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(22px,3vw,40px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: 0 }}>
              Every person in our team carries the same <em style={{ color: CR }}>fire</em> — to deliver nothing less than the finest spices to the world.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ══ 4. WE GROW TOGETHER — animated SVG orbit + values ═══════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>

        {/* Large animated SVG orbit decoration */}
        <div style={{ position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.06 }}>
          <motion.svg width={500} height={500} viewBox="0 0 500 500">
            {[80, 140, 200].map((r, i) => (
              <motion.circle
                key={i}
                cx={250} cy={250} r={r}
                stroke={CR}
                strokeWidth={1.5}
                fill="none"
                strokeDasharray={`${r * 0.3} ${r * 0.2}`}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                style={{ transformOrigin: '250px 250px' }}
                transition={{ duration: 10 + i * 5, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </motion.svg>
        </div>

        {/* Left side animated vertical line + dots */}
        <div style={{ position: 'absolute', left: 'clamp(12px,3vw,40px)', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <motion.div
            style={{ width: 1, background: `linear-gradient(to bottom, transparent, ${CR}40, transparent)`, flex: 1 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal delay={0.1}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginBottom: 12 }}>
              We work together
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            {/* Animated word-by-word reveal */}
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,72px)', fontWeight: 900, color: INK, letterSpacing: '-0.04em', margin: '0 0 24px', lineHeight: 1 }}>
              {'— WE GROW TOGETHER. —'.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block', marginRight: '0.25em' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  viewport={{ once: true }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, marginBottom: 56 }}>
              Our entire chain from production to retail gets executed with utter loyalty, and we grow together, which makes it even better.
            </p>
          </Reveal>

          {/* Values with animated SVG icons */}
          <div style={{ display: 'flex', gap: 'clamp(20px,4vw,48px)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.label}
                style={{ flex: 1, minWidth: 180, textAlign: 'center', position: 'relative' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                {/* Animated hexagon background */}
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                  <motion.div
                    style={{
                      width: 64, height: 64, borderRadius: 16,
                      background: `${CR}10`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto',
                    }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  >
                    <span style={{ fontFamily: SERIF, fontSize: 28, color: CR }}>{v.icon}</span>
                  </motion.div>
                  {/* Animated border */}
                  <motion.div
                    style={{
                      position: 'absolute', inset: -3,
                      borderRadius: 19,
                      border: `1.5px solid ${CR}`,
                      opacity: 0,
                    }}
                    animate={{ opacity: [0, 0.5, 0], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                </div>
                <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK, marginBottom: 8 }}>{v.label}</div>
                <div style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6 }}>{v.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA button with animated border */}
          <Reveal delay={0.5}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <motion.a
                href="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  background: CR, color: '#fff', fontFamily: SANS, fontWeight: 700, fontSize: 15,
                  padding: '18px 40px', borderRadius: 999, textDecoration: 'none',
                  boxShadow: `0 8px 32px ${CR}40`, position: 'relative', zIndex: 1,
                }}
                whileHover={{ scale: 1.04, y: -3, boxShadow: `0 16px 48px ${CR}50` }}
                whileTap={{ scale: 0.97 }}
              >
                Get in Touch with Our Team
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >→</motion.span>
              </motion.a>
              {/* Orbiting dot around button */}
              <motion.div
                style={{
                  position: 'absolute', width: 10, height: 10, borderRadius: '50%',
                  background: CR, top: '50%', left: '50%', marginTop: -5, marginLeft: -5,
                  zIndex: 0,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                custom={{ offsetX: 80 }}
              />
            </div>
          </Reveal>
        </div>
      </section>




    </main>
  );
}
