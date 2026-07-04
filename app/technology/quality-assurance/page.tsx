'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import TechHero from '@/components/ui/TechHero';
import { Beaker, Bug, ScanLine } from 'lucide-react';

const stats = [
  { value: '30+', label: 'QA Scientists' },
  { value: '3', label: 'Accredited Labs' },
  { value: '500+', label: 'Tests / Batch' },
  { value: '9+', label: 'Certifications' },
];

const labs = [
  {
    step: '01',
    title: 'Wet Chemistry Lab',
    icon: <Beaker className="h-7 w-7" />,
    bullets: [
      'Moisture & ash content',
      'Volatile oil content',
      'Crude fibre analysis',
      'Starch & extract content',
    ],
  },
  {
    step: '02',
    title: 'Microbiology Lab',
    icon: <Bug className="h-7 w-7" />,
    bullets: [
      'Total Plate Count',
      'Yeast & Mould',
      'Salmonella & E. coli',
      'Listeria & Bacillus cereus',
    ],
  },
  {
    step: '03',
    title: 'Instrumentation Lab',
    icon: <ScanLine className="h-7 w-7" />,
    bullets: [
      'HPLC — curcumin & piperine',
      'LCMS/MS — 400+ pesticides',
      'ICP-MS — heavy metals',
      'Particle size distribution',
    ],
  },
];

const certifications = [
  'ISO 22000:2018',
  'FSSAI Certified',
  'NABL Accredited',
  'HACCP',
  'Halal Certified',
  'Kosher Certified',
  'BRC Grade A',
  'US FDA Registered',
  'EU Compliant',
];

export default function QualityAssurancePage() {
  return (
    <div className="relative">

      {/* HERO */}
      <TechHero
        breadcrumb="Quality Assurance"
        particleWords={['QUALITY', 'CONTROL', '500+ TESTS', '3 NABL LABS', 'ZERO FAIL', 'ISO 22000', 'PURITY', 'SCIENCE']}
        subtitle="Zero Fail Rate. ISO 22000 Certified."
        stats={[
          { icon: <Beaker className="h-5 w-5" />, value: '500+', label: 'Tests Per Batch' },
          { icon: <Bug className="h-5 w-5" />, value: '3', label: 'NABL Labs' },
          { icon: <ScanLine className="h-5 w-5" />, value: 'ISO 22000', label: 'Certified' },
          { icon: <Beaker className="h-5 w-5" />, value: 'Zero', label: 'Fail Rate' }
        ]}
        bottomText={
          <>
            3 NABL Labs · FSSAI Compliant<br />Pesticide · Heavy Metal Testing
          </>
        }
      />


      {/* LABORATORIES */}
      <section style={{ paddingBottom: '120px', paddingTop: '80px' }}>
        <div className="container-lv">
          <div className="flex flex-col items-center text-center" style={{ marginBottom: '72px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Our Laboratories</span>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              Three labs. <span className="text-[#AC033B] italic font-serif font-medium">One standard.</span>
            </h2>
            <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', maxWidth: '560px' }}>
              NABL-accredited, ISO 17025 compliant. Every test, in-house.
            </p>
          </div>

          <div className="tech-grid-3">
            {labs.map((lab) => (
              <div key={lab.step} className="infrastructure-card" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                <span className="absolute font-display font-bold text-white select-none pointer-events-none" style={{ top: '20px', right: '24px', fontSize: '4.5rem', lineHeight: 1, opacity: 0.03 }}>{lab.step}</span>
                <div className="flex items-center justify-center text-[#AC033B]" style={{ width: '52px', height: '52px', borderRadius: '13px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.12)', marginBottom: '22px' }}>
                  {lab.icon}
                </div>
                <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.2, marginBottom: '18px' }}>{lab.title}</h3>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '20px' }} />
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {lab.bullets.map((item, i) => (
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

      {/* CERTIFICATIONS */}
      <section style={{ paddingTop: '80px', paddingBottom: '120px', background: 'rgba(172,3,59,0.03)' }}>
        <div className="container-lv">
          <div className="flex flex-col items-center text-center" style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Certifications</span>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Verified quality. <span className="text-[#AC033B] italic font-serif font-medium">Documented proof.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
            {certifications.map((c) => (
              <span
                key={c}
                style={{
                  padding: '10px 22px',
                  borderRadius: '999px',
                  border: '1px solid rgba(172,3,59,0.4)',
                  fontSize: '14px',
                  color: '#AC033B',
                  background: 'rgba(172,3,59,0.05)',
                  cursor: 'default',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#AC033B'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(172,3,59,0.05)'; e.currentTarget.style.color = '#AC033B'; }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="container-lv" style={{ textAlign: 'center' }}>
          <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '18ch', margin: '0 auto 20px' }}>
            Verified quality. <span className="text-[#AC033B] italic font-serif font-medium">Documented proof.</span>
          </h2>
          <p className="text-white/50 leading-relaxed" style={{ fontSize: '15px', maxWidth: '440px', margin: '0 auto 40px' }}>
            View our full certification portfolio or request test reports for any batch.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/certifications"><Button variant="primary" size="lg">View Certifications</Button></Link>
            <Link href="/technology"><Button variant="outline" size="lg">All Technologies</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
