'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ParticleTextEffect from '@/components/animation/ParticleTextEffect';
import GlobeBackground from '@/components/animation/GlobeBackground';
import ScrollReveal from '@/components/animation/ScrollReveal';
import ElectricBorder from '@/components/ui/ElectricBorder';
import TechHero from '@/components/ui/TechHero';
import { Factory, Package, Warehouse, Microscope, Ruler, Users, Clock, ShieldCheck } from 'lucide-react';

const stats = [
  { icon: <Ruler className="h-5 w-5" />, value: '50,000+', label: 'Square Feet' },
  { icon: <Users className="h-5 w-5" />, value: '200+', label: 'Workers' },
  { icon: <Clock className="h-5 w-5" />, value: '24/7', label: 'Production' },
  { icon: <ShieldCheck className="h-5 w-5" />, value: 'ISO 22000', label: 'Certified' },
];

const facilities = [
  {
    number: '01',
    title: 'Manufacturing Plant',
    icon: <Factory className="h-7 w-7" />,
    bullets: [
      'Cryogenic grinding',
      'Allergen-safe production zones',
      'Automated batch blending',
      '300+ MT monthly capacity',
    ],
  },
  {
    number: '02',
    title: 'Packaging Unit',
    icon: <Package className="h-7 w-7" />,
    bullets: [
      'MAP modified atmosphere tech',
      '24-month extended shelf life',
      '5g sachets to 25kg bags',
      'Vision-based SKU verification',
    ],
  },
  {
    number: '03',
    title: 'Warehousing',
    icon: <Warehouse className="h-7 w-7" />,
    bullets: [
      '10,000+ sq ft cold storage',
      'Organic & conventional zones',
      'Real-time humidity monitoring',
      'IoT-linked FIFO inventory',
    ],
  },
  {
    number: '04',
    title: 'Quality Laboratory',
    icon: <Microscope className="h-7 w-7" />,
    bullets: [
      'NABL-accredited test reports',
      'Pesticide & heavy metal testing',
      'ASTA colour & SHU pungency',
      'In-batch QC at every stage',
    ],
  },
];

export default function InfrastructurePage() {
  return (
    <div className="relative">
      {/* HERO */}
      <TechHero
        breadcrumb="Infrastructure"
        particleWords={['MANUFACTURING', 'INFRASTRUCTURE', '50,000 SQ FT', 'ISO 22000', '24/7 OPS', 'WORLD CLASS', 'SCALE', 'PRECISION']}
        subtitle="Always on. Always delivering."
        stats={stats}
        bottomText={
          <>
            50,000 sq ft · 200+ workers<br />ISO 22000 · 24/7 production
          </>
        }
      />



      {/* FACILITY CARDS */}
      <section style={{ paddingBottom: '160px', paddingTop: '80px' }}>
        <div className="container-lv">
          <ScrollReveal delay={0}>
            <div className="flex flex-col items-center text-center" style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
                <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
                <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>
                  Our Facilities
                </span>
                <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              </div>
              <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                Infrastructure <span className="text-[#AC033B] italic font-serif font-medium">at Scale</span>
              </h2>
              <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', maxWidth: '600px' }}>
                A glimpse into our operations — engineered for precision, hygiene, and global compliance.
              </p>
            </div>
          </ScrollReveal>

          <div className="infrastructure-grid">
            {facilities.map((f, idx) => (
              <ScrollReveal key={f.number} delay={idx * 80} from={50}>
                <div style={{ borderRadius: '24px', position: 'relative' }}>
                  <ElectricBorder color="#00ffd1" speed={2} chaos={0.28} borderRadius={24}>
                    <div className="infrastructure-card" style={{ border: 'none' }}>
                      <span className="absolute font-display font-bold text-white select-none pointer-events-none" style={{ top: '20px', right: '24px', fontSize: '4.5rem', lineHeight: 1, opacity: 0.03 }}>
                        {f.number}
                      </span>
                      <div className="flex items-center justify-center text-[#AC033B]" style={{ width: '52px', height: '52px', borderRadius: '13px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.12)', marginBottom: '22px' }}>
                        {f.icon}
                      </div>
                      <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.2, marginBottom: '18px' }}>
                        {f.title}
                      </h3>
                      <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '20px' }} />
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {f.bullets.map((item, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <span className="text-[#AC033B] font-bold shrink-0" style={{ fontSize: '12px', lineHeight: '1.65' }}>—</span>
                            <span className="text-white/60" style={{ fontSize: '13px', lineHeight: '1.6' }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ElectricBorder>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingBottom: '120px' }}>
        <ScrollReveal>
          <div className="container-lv text-center">
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '18ch', margin: '0 auto 20px' }}>
              Built to produce. <span className="text-[#AC033B] italic font-serif font-medium">Built to last.</span>
            </h2>
            <p className="text-white/50 leading-relaxed" style={{ fontSize: '15px', maxWidth: '440px', margin: '0 auto 40px' }}>
              Schedule a facility tour or talk to our experts about our production capabilities.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact"><Button variant="primary" size="lg">Contact Us</Button></Link>
              <Link href="/technology"><Button variant="outline" size="lg">All Technologies</Button></Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
