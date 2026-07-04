'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import TechHero from '@/components/ui/TechHero';
import { Thermometer, Droplets, Zap, Package, Wind, Sun, Grid, Calendar } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Pre-Cooling',
    icon: <Thermometer className="h-7 w-7" />,
    bullets: [
      'Sub-zero nitrogen exposure',
      'Controlled cooling rate',
      'Moisture-free environment',
      'Preserves volatile oils',
    ],
  },
  {
    step: '02',
    title: 'Liquid Nitrogen',
    icon: <Droplets className="h-7 w-7" />,
    bullets: [
      'Chamber at -196°C',
      'Continuous N₂ flow',
      'No oxygen exposure',
      'Crystal-brittle texture',
    ],
  },
  {
    step: '03',
    title: 'Impact Grinding',
    icon: <Zap className="h-7 w-7" />,
    bullets: [
      'Grinding at -40°C',
      'Zero heat generation',
      'Uniform particle size',
      'No friction damage',
    ],
  },
  {
    step: '04',
    title: 'Sealed Collection',
    icon: <Package className="h-7 w-7" />,
    bullets: [
      'Sealed inert chambers',
      'Volatiles locked inside',
      'Immediate packaging',
      'Zero post-grind loss',
    ],
  },
];

const comparison = [
  { param: 'Temperature',            icon: <Thermometer strokeWidth={1.5} size={18} />, conv: '80°C+',          convSub: 'High heat generation',      lv: '-40°C',           lvSub: 'Ultra-low temperature' },
  { param: 'Essential Oil Retention',icon: <Droplets     strokeWidth={1.5} size={18} />, conv: '40%',            convSub: 'Significant loss',           lv: '99.7%',           lvSub: 'Maximum retention' },
  { param: 'Aroma',                  icon: <Wind         strokeWidth={1.5} size={18} />, conv: 'Degraded',        convSub: 'Volatile compounds lost',    lv: 'Fully Preserved', lvSub: 'Natural aroma intact' },
  { param: 'Color',                  icon: <Sun          strokeWidth={1.5} size={18} />, conv: 'Heat-dulled',     convSub: 'Dull & faded appearance',    lv: 'Vibrant Original',lvSub: 'Natural color retained' },
  { param: 'Particle Uniformity',    icon: <Grid         strokeWidth={1.5} size={18} />, conv: 'Inconsistent',    convSub: 'Uneven particle size',       lv: 'Highly Uniform',  lvSub: 'Consistent particle size' },
  { param: 'Shelf Life',             icon: <Calendar     strokeWidth={1.5} size={18} />, conv: 'Shorter',         convSub: 'Faster degradation',         lv: 'Extended',        lvSub: 'Longer freshness' },
];

export default function CryogenicGrindingPage() {
  return (
    <div className="relative">

      {/* HERO */}
      <TechHero
        breadcrumb="Cryogenic Grinding"
        particleWords={['CRYOGENIC', 'GRINDING', '-40°C', '99.7% OILS', 'LIQUID N₂', 'ZERO HEAT', 'PURITY', 'PRECISION']}
        subtitle="Ultra-low temperature. Maximum retention."
        stats={[
          { icon: <Thermometer className="h-5 w-5" />, value: '-40°C', label: 'Grinding Temp' },
          { icon: <Droplets className="h-5 w-5" />, value: '99.7%', label: 'Oil Retention' },
          { icon: <Zap className="h-5 w-5" />, value: 'Liquid N₂', label: 'Coolant' },
          { icon: <Wind className="h-5 w-5" />, value: 'Zero', label: 'Heat Generation' }
        ]}
        bottomText={
          <>
            -196°C chamber · No oxygen<br />Ultra-fine mesh · Zero loss
          </>
        }
      />


      {/* WHAT IS IT */}
      <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(2px)', padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px)' }}>
        <div className="tech-grid-2" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <div style={{ width: '36px', height: '1.5px', background: '#AC033B' }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>The Problem</span>
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '28px' }}>
              Conventional grinding
              <br />
              <span className="text-[#AC033B] italic font-serif font-medium">kills flavor.</span>
            </h2>
            <p className="text-white/55 leading-relaxed" style={{ fontSize: '15px', maxWidth: '440px', marginBottom: '32px' }}>
              Every rotation of a conventional grinder generates friction. Friction creates heat — above 80°C — which volatilizes and destroys essential oils. By the time your spice reaches the bag, up to 60% of what made it special is already gone.
            </p>
            <p className="text-white/55 leading-relaxed" style={{ fontSize: '15px', maxWidth: '440px' }}>
              We solved this at the physics level. By dropping the grinding chamber to -40°C with liquid nitrogen, we make friction thermodynamically impossible — and lock 99.7% of essential oils inside every particle.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Heat Generated', conv: '80°C+', lv: '-40°C' },
              { label: 'Essential Oils Retained', conv: '40%', lv: '99.7%' },
              { label: 'Aroma Preserved', conv: 'Partial', lv: 'Full' },
              { label: 'Color Vibrancy', conv: 'Dulled', lv: 'Vivid' },
            ].map((row) => (
              <div key={row.label} className="tech-comparison-row" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px 20px' }}>
                <span className="tech-comp-label font-mono text-white/40" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>{row.label}</span>
                <span className="font-mono font-bold text-center text-white/30" style={{ fontSize: '13px' }}>{row.conv}</span>
                <span className="font-mono font-bold text-center text-[#AC033B]" style={{ fontSize: '13px' }}>{row.lv}</span>
              </div>
            ))}
            <div className="tech-comparison-row" style={{ padding: '0 20px' }}>
              <span />
              <span className="font-mono text-white/30 text-center" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>CONVENTIONAL</span>
              <span className="font-mono text-[#AC033B] text-center" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>LV CRYO</span>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS STEPS */}
      <div style={{ background: 'rgba(255,255,255,0.03)', padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '28px' }}>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Process</span>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '16px' }}>
              How <span className="text-[#AC033B] italic font-serif font-medium">cryogenic grinding</span> works
            </h2>
            <p className="text-white/45" style={{ fontSize: '15px', maxWidth: '540px', margin: '0 auto' }}>
              A four-stage process that preserves what conventional grinding destroys.
            </p>
          </div>
          <div className="tech-process-grid">
            {steps.map((s) => (
              <div key={s.step} style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                <span className="absolute font-display font-bold text-white select-none" style={{ top: '16px', right: '20px', fontSize: '4rem', lineHeight: 1, opacity: 0.03 }}>{s.step}</span>
                <div className="flex items-center justify-center text-[#AC033B]" style={{ width: '52px', height: '52px', borderRadius: '13px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.1)', marginBottom: '20px' }}>{s.icon}</div>
                <h3 className="font-display font-bold text-white" style={{ fontSize: '1.1rem', lineHeight: 1.2, marginBottom: '16px' }}>{s.title}</h3>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '16px' }} />
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {s.bullets.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span className="text-[#AC033B] font-bold shrink-0" style={{ fontSize: '12px', lineHeight: '1.65' }}>—</span>
                      <span className="text-white/55" style={{ fontSize: '13px', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '28px' }}>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Comparison</span>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '16px' }}>
              The difference is <span className="text-[#AC033B] italic font-serif font-medium">measurable</span>
            </h2>
            <p className="text-white/45" style={{ fontSize: '15px', maxWidth: '540px', margin: '0 auto' }}>Every critical quality parameter. Every time.</p>
          </div>
          <div className="tech-comparison-table-wrap">
            <div className="tech-comparison-table" style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', background: 'rgba(255,255,255,0.04)' }}>
                <div style={{ padding: '14px 24px', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Parameter</div>
                <div style={{ padding: '14px 24px', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>Conventional Grinding</div>
                <div style={{ padding: '14px 24px', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', fontWeight: 700, background: '#AC033B', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>LV Cryogenic Grinding</div>
              </div>
              {comparison.map((row, i) => (
                <div key={row.param} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.06)', background: i % 2 !== 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(172,3,59,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#AC033B' }}>{row.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{row.param}</span>
                  </div>
                  <div style={{ padding: '14px 24px', borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>{row.conv}</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{row.convSub}</span>
                  </div>
                  <div style={{ padding: '14px 24px', borderLeft: '1px solid rgba(172,3,59,0.1)', background: 'rgba(172,3,59,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#AC033B' }}>{row.lv}</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{row.lvSub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* ── DARK CTA ──────────────────────────────────────────── */}
        <div
          style={{
            background: '#AC033B',
            padding: 'clamp(80px,10vw,120px) clamp(24px,8vw,120px)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '28px' }}>
              <div style={{ width: '36px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
              <span className="font-mono uppercase text-white/60" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Request Samples</span>
              <div style={{ width: '36px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
            </div>
            <h2
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}
            >
              Taste the difference.
            </h2>
            <p className="text-white/70 leading-relaxed" style={{ fontSize: '15px', marginBottom: '40px' }}>
              Request sample spices ground with our cryogenic technology. Compare it against anything on the market. The result speaks for itself.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact">
                <Button variant="outline" size="lg" style={{ background: 'white', color: '#AC033B', borderColor: 'white' }}>
                  Request Samples
                </Button>
              </Link>
              <Link href="/technology">
                <Button variant="outline" size="lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', background: 'transparent' }}>
                  All Technologies
                </Button>
              </Link>
            </div>
          </div>
        </div>

    </div>
  );
}
