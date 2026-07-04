'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import TechHero from '@/components/ui/TechHero';
import { FlaskConical, Cpu, Atom, TestTube, Microscope, ScanSearch } from 'lucide-react';

const pillars = [
  {
    step: '01',
    title: 'Flavor Compounds',
    icon: <FlaskConical className="h-7 w-7" />,
    bullets: [
      '500+ compounds identified',
      'Isolation & preservation',
      'Batch-to-batch consistency',
      'Custom flavor profiling',
    ],
  },
  {
    step: '02',
    title: 'Essential Oil Chemistry',
    icon: <Atom className="h-7 w-7" />,
    bullets: [
      'GC-MS & HPLC profiling',
      'Terpenoid quantification',
      'Volatile oil mapping',
      'Phenylpropanoid analysis',
    ],
  },
  {
    step: '03',
    title: 'AI Quality Control',
    icon: <Cpu className="h-7 w-7" />,
    bullets: [
      '10,000+ batch profiles trained',
      'Predictive consistency models',
      'Real-time deviation alerts',
      'R&D partnership support',
    ],
  },
];

const compounds = [
  { name: 'Curcumin', source: 'Turmeric', property: 'Anti-inflammatory, golden pigment' },
  { name: 'Piperine', source: 'Black Pepper', property: 'Bioavailability enhancer, pungency' },
  { name: 'Capsaicin', source: 'Chilli', property: 'Scoville heat, pain receptor activation' },
  { name: 'Cinnamaldehyde', source: 'Cinnamon', property: 'Sweet-spicy aroma, antimicrobial' },
  { name: 'Eugenol', source: 'Cloves', property: 'Analgesic, numbing, warm aroma' },
  { name: 'Cuminaldehyde', source: 'Cumin', property: 'Warm, earthy, signature aroma' },
  { name: 'Linalool', source: 'Coriander', property: 'Floral, citrus, calming' },
  { name: 'Gingerol', source: 'Ginger', property: 'Pungent, warming, anti-nausea' },
];

export default function CFGSciencePage() {
  return (
    <div className="relative">

      {/* HERO */}
      <TechHero
        breadcrumb="CFG Science"
        particleWords={['CFG SCIENCE', 'R&D CENTRE', '500+ MOLECULES', 'GC-MS', 'HPLC', 'AI QUALITY', 'FLAVOR', 'TERPENES']}
        subtitle="R&D Centre. Flavor Science."
        stats={[
          { icon: <TestTube className="h-5 w-5" />, value: '500+', label: 'Molecules' },
          { icon: <Microscope className="h-5 w-5" />, value: 'GC-MS', label: 'Analysis' },
          { icon: <FlaskConical className="h-5 w-5" />, value: 'HPLC', label: 'Testing' },
          { icon: <Cpu className="h-5 w-5" />, value: 'AI', label: 'Quality Check' }
        ]}
        bottomText={
          <>
            R&D Centre · Flavor Science<br />500+ Molecules Profiled
          </>
        }
      />


      {/* OUR SCIENCE */}
      <section style={{ paddingBottom: '120px', paddingTop: '80px' }}>
        <div className="container-lv">
          <div className="flex flex-col items-center text-center" style={{ marginBottom: '72px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Our Science</span>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              Three pillars of <span className="text-[#AC033B] italic font-serif font-medium">CFG Science</span>
            </h2>
            <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', maxWidth: '560px' }}>
              Research-grade tools and methods — applied at commercial scale.
            </p>
          </div>

          <div className="tech-grid-3">
            {pillars.map((p) => (
              <div key={p.step} className="infrastructure-card" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                <span className="absolute font-display font-bold text-white select-none pointer-events-none" style={{ top: '20px', right: '24px', fontSize: '4.5rem', lineHeight: 1, opacity: 0.03 }}>{p.step}</span>
                <div className="flex items-center justify-center text-[#AC033B]" style={{ width: '52px', height: '52px', borderRadius: '13px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.12)', marginBottom: '22px' }}>
                  {p.icon}
                </div>
                <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.2, marginBottom: '18px' }}>{p.title}</h3>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '20px' }} />
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {p.bullets.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span className="text-[#AC033B] font-bold shrink-0" style={{ fontSize: '12px', lineHeight: '1.65' }}>—</span>
                      <span className="text-white/60" style={{ fontSize: '13px', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPOUND LIBRARY */}
      <section style={{ paddingTop: '80px', paddingBottom: '120px', background: 'rgba(172,3,59,0.03)' }}>
        <div className="container-lv">
          <div className="flex flex-col items-center text-center" style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Compound Library</span>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              500+ molecules <span className="text-[#AC033B] italic font-serif font-medium">decoded</span>
            </h2>
          </div>

          <div className="tech-comparison-table-wrap" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="tech-comparison-table" style={{ minWidth: '500px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.5fr', background: 'rgba(255,255,255,0.04)' }}>
                <div style={{ padding: '16px 24px', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Active Compound</div>
                <div style={{ padding: '16px 24px', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>Natural Source</div>
                <div style={{ padding: '16px 24px', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', fontWeight: 700, background: '#AC033B', display: 'flex', alignItems: 'center' }}>Key Property</div>
              </div>
              {compounds.map((row, i) => (
                <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.5fr', borderTop: '1px solid rgba(255,255,255,0.06)', background: i % 2 !== 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(172,3,59,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#AC033B' }}>
                      <Microscope strokeWidth={1.5} size={18} />
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>{row.name}</span>
                  </div>
                  <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>{row.source}</span>
                  </div>
                  <div style={{ padding: '16px 24px', borderLeft: '1px solid rgba(172,3,59,0.1)', background: 'rgba(172,3,59,0.04)', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#AC033B' }}>{row.property}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="container-lv" style={{ textAlign: 'center' }}>
          <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '18ch', margin: '0 auto 20px' }}>
            Custom flavor <span className="text-[#AC033B] italic font-serif font-medium">profiles.</span>
          </h2>
          <p className="text-white/50 leading-relaxed" style={{ fontSize: '15px', maxWidth: '440px', margin: '0 auto 40px' }}>
            Bespoke compound analysis and R&D partnerships for food manufacturers worldwide.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact"><Button variant="primary" size="lg">Contact R&D Team</Button></Link>
            <Link href="/technology"><Button variant="outline" size="lg">All Technologies</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
