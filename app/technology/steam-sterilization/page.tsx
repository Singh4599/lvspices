'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import TechHero from '@/components/ui/TechHero';
import { Droplets, Flame, Wind } from 'lucide-react';

const stats = [
  { value: '5-Log', label: 'Pathogen Reduction' },
  { value: '0', label: 'Chemicals Used' },
  { value: '100%', label: 'Steam Pure' },
];

const steps = [
  {
    step: '01',
    title: 'Pre-Treatment',
    icon: <Droplets className="h-7 w-7" />,
    bullets: [
      'Optimal moisture conditioning',
      'Uniform spice loading',
      'Pre-heating for efficiency',
      'No chemical additives',
    ],
  },
  {
    step: '02',
    title: 'Steam Application',
    icon: <Flame className="h-7 w-7" />,
    bullets: [
      'Saturated steam injection',
      'Precise temp & pressure',
      'Validated hold time',
      '5-Log pathogen kill',
    ],
  },
  {
    step: '03',
    title: 'Rapid Cooling',
    icon: <Wind className="h-7 w-7" />,
    bullets: [
      'Vacuum-assisted cooling',
      'Flavor & color intact',
      'Aroma fully preserved',
      'Immediate sealed transfer',
    ],
  },
];

const pathogens = [
  'Salmonella spp.', 'E. coli', 'Listeria monocytogenes',
  'Bacillus cereus', 'Cronobacter sakazakii', 'Yeast & Mould',
  'Total Plate Count', 'Coliforms', 'Staphylococcus aureus',
];

export default function SteamSterilizationPage() {
  return (
    <div className="relative">

      {/* HERO */}
      <TechHero
        breadcrumb="Steam Sterilization"
        particleWords={['STERILIZATION', 'STEAM', '5-LOG KILL', 'NO CHEMICALS', '100% PURE', 'NO PATHOGENS', 'SAFE SPICE']}
        subtitle="No Chemicals. 100% Pure Steam."
        stats={[
          { icon: <Droplets className="h-5 w-5" />, value: '5-Log', label: 'Pathogen Reduction' },
          { icon: <Flame className="h-5 w-5" />, value: '0', label: 'Chemicals Used' },
          { icon: <Wind className="h-5 w-5" />, value: '100%', label: 'Steam Pure' }
        ]}
        bottomText={
          <>
            No Chemicals · No Irradiation<br />5-Log Kill · 100% Pure
          </>
        }
      />



      {/* PROCESS */}
      <section style={{ paddingTop: '80px', paddingBottom: '120px' }}>
        <div className="container-lv">
          <div className="flex flex-col items-center text-center" style={{ marginBottom: '72px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Process</span>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              The sterilization <span className="text-[#AC033B] italic font-serif font-medium">process</span>
            </h2>
            <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', maxWidth: '560px' }}>
              Three stages — each validated, each critical to achieving 5-Log pathogen reduction.
            </p>
          </div>

          <div className="tech-grid-3">
            {steps.map((s) => (
              <div key={s.step} className="infrastructure-card" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                <span className="absolute font-display font-bold text-white select-none pointer-events-none" style={{ top: '20px', right: '24px', fontSize: '4.5rem', lineHeight: 1, opacity: 0.03 }}>{s.step}</span>
                <div className="flex items-center justify-center text-[#AC033B]" style={{ width: '52px', height: '52px', borderRadius: '13px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.12)', marginBottom: '22px' }}>
                  {s.icon}
                </div>
                <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.2, marginBottom: '18px' }}>{s.title}</h3>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '20px' }} />
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {s.bullets.map((item, i) => (
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

      {/* VALIDATED AGAINST */}
      <section style={{ paddingTop: '80px', paddingBottom: '120px', background: 'rgba(172,3,59,0.03)' }}>
        <div className="container-lv">
          <div className="flex flex-col items-center text-center" style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Validated Against</span>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Every pathogen. <span className="text-[#AC033B] italic font-serif font-medium">Eliminated.</span>
            </h2>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
            {pathogens.map((p) => (
              <span
                key={p}
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
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="container-lv" style={{ textAlign: 'center' }}>
          <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '18ch', margin: '0 auto 20px' }}>
            Safe spice. <span className="text-[#AC033B] italic font-serif font-medium">Proven science.</span>
          </h2>
          <p className="text-white/50 leading-relaxed" style={{ fontSize: '15px', maxWidth: '440px', margin: '0 auto 40px' }}>
            Request our validation data and microbiological test reports for any batch.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact"><Button variant="primary" size="lg">Request Validation Data</Button></Link>
            <Link href="/technology"><Button variant="outline" size="lg">All Technologies</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
