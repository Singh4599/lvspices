'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import TechHero from '@/components/ui/TechHero';
import { Layers, ShieldCheck, Search, AlertCircle } from 'lucide-react';

const stats = [
  { value: '8', label: 'Process Stages' },
  { value: '500+', label: 'Quality Checks' },
  { value: '100%', label: 'Batch Traced' },
  { value: '0', label: 'Exceptions' },
];

const steps = [
  {
    number: '01',
    title: 'Raw Material Procurement',
    tag: 'Sourcing',
    description: 'Direct procurement from verified farms across India\'s premier spice-growing regions. Every lot traced to origin.',
    points: ['Farm-verified sourcing', 'Grade A selection only', 'Moisture & purity tested on arrival', 'Lot number assigned for full traceability'],
  },
  {
    number: '02',
    title: 'Incoming Quality Check',
    tag: 'IQC',
    description: 'Each incoming batch is held in quarantine until IQC clearance. Tests cover physical, chemical, and microbiological parameters.',
    points: ['Moisture content testing', 'Foreign matter inspection', 'Pesticide residue screening (HPLC)', 'Aflatoxin and mycotoxin testing'],
  },
  {
    number: '03',
    title: 'Pre-Processing & Cleaning',
    tag: 'Cleaning',
    description: 'Multi-stage cleaning removes foreign matter, dust, and damaged material. Optical sorting for color and size uniformity.',
    points: ['Destoner and de-sticker', 'Optical color sorter', 'Metal detector pass', 'Sieving and grading'],
  },
  {
    number: '04',
    title: 'Steam Sterilization',
    tag: 'Sterilization',
    description: 'Saturated steam sterilization achieves 5-log pathogen reduction without chemicals. Salmonella and E. coli eliminated.',
    points: ['5-log pathogen reduction', 'No chemical additives', 'No ethylene oxide', 'Validated batch records'],
  },
  {
    number: '05',
    title: 'Cryogenic Grinding',
    tag: 'Grinding',
    description: 'Material enters the cryogenic chamber at –40°C in liquid nitrogen. Preserves 99.7% of volatile oils and aroma compounds.',
    points: ['–40°C grinding temperature', '99.7% essential oil retention', 'Particle size 30–200 mesh', 'Zero heat-induced degradation'],
  },
  {
    number: '06',
    title: 'Blending & Formulation',
    tag: 'Blending',
    description: 'Precision blending per customer specification. Multi-head weighing for exact ratio control. Homogeneity verified via lab analysis.',
    points: ['Computer-controlled ratios', 'Private label formulations', 'Batch homogeneity testing', 'Flavor consistency certification'],
  },
  {
    number: '07',
    title: 'Packaging',
    tag: 'Packaging',
    description: 'Nitrogen-flushed packaging for maximum shelf life. Available in bulk, retail, and food-service formats per buyer specification.',
    points: ['Nitrogen flush (O₂ < 1%)', 'Bulk 25kg / 50kg options', 'Retail 50g–5kg pouches', 'Automated batch/best-before coding'],
  },
  {
    number: '08',
    title: 'Final QC & Release',
    tag: 'Release',
    description: 'Every finished batch undergoes final QC before release. CoA issued. Export documentation prepared. Shipment authorized.',
    points: ['Certificate of Analysis (CoA)', 'Pesticide & heavy metals clearance', 'Microbiological sign-off', 'Export documentation ready'],
  },
];

export default function ProcessFlowPage() {
  return (
    <div className="relative">

      {/* HERO */}
      <TechHero
        breadcrumb="Process Flow"
        particleWords={['PROCESS FLOW', '8 STAGES', 'TRACEABILITY', '500+ CHECKS', 'VALIDATED', 'ZERO FAIL', 'QUALITY']}
        subtitle="End-to-end Traceability. 8 Validated Stages."
        stats={[
          { icon: <Layers className="h-5 w-5" />, value: '8', label: 'Process Stages' },
          { icon: <ShieldCheck className="h-5 w-5" />, value: '500+', label: 'Quality Checks' },
          { icon: <Search className="h-5 w-5" />, value: '100%', label: 'Batch Traced' },
          { icon: <AlertCircle className="h-5 w-5" />, value: '0', label: 'Exceptions' }
        ]}
        bottomText={
          <>
            Raw Material → Dispatch<br />Fully Validated · Traceable
          </>
        }
      />


      {/* TIMELINE */}
      <section style={{ paddingTop: '120px', paddingBottom: '160px' }}>
        <div className="container-lv">
          {/* Section heading */}
          <div className="flex flex-col items-center text-center" style={{ marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>End-to-End</span>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              From farm to <span className="text-[#AC033B] italic font-serif font-medium">export-ready</span>
            </h2>
            <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', maxWidth: '560px' }}>
              Each stage is validated, documented, and traceable — no step is skipped, no batch released without clearance.
            </p>
          </div>

          {/* Vertical timeline */}
          <div style={{ position: 'relative' }}>
            {/* vertical line */}
            <div className="process-timeline-line" style={{
              position: 'absolute',
              left: '27px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'rgba(172,3,59,0.3)',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {steps.map((step) => (
                <div key={step.number} className="process-timeline-row" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>

                  {/* Circle */}
                  <div className="process-timeline-circle" style={{
                    flexShrink: 0,
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#AC033B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    boxShadow: '0 4px 20px rgba(172,3,59,0.25)',
                  }}>
                    <span className="font-mono font-bold text-white" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                      {step.number}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)',
                      borderRadius: '20px',
                      padding: 'clamp(24px, 3vw, 40px)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '32px',
                      alignItems: 'start',
                      marginBottom: '4px',
                      transition: 'box-shadow 0.3s, transform 0.3s',
                    }}
                    className="process-card"
                  >
                    {/* Left — title + desc */}
                    <div>
                      <span
                        className="font-mono uppercase text-[#AC033B]"
                        style={{ fontSize: '10px', letterSpacing: '0.22em', display: 'block', marginBottom: '10px' }}
                      >
                        {step.tag}
                      </span>
                      <h3
                        className="font-display font-bold text-white"
                        style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', lineHeight: 1.2, marginBottom: '12px' }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-white/50 leading-relaxed" style={{ fontSize: '14px' }}>
                        {step.description}
                      </p>
                    </div>

                    {/* Right — checkpoints */}
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {step.points.map((pt, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span
                            style={{
                              flexShrink: 0,
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: 'rgba(172,3,59,0.15)',
                              border: '1px solid rgba(172,3,59,0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: '1px',
                            }}
                          >
                            <span className="text-[#AC033B]" style={{ fontSize: '9px', fontWeight: 700 }}>✓</span>
                          </span>
                          <span className="text-white/60" style={{ fontSize: '13.5px', lineHeight: '1.5' }}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: '80px', paddingBottom: '120px', background: 'rgba(172,3,59,0.015)' }}>
        <div className="container-lv" style={{ textAlign: 'center' }}>
          <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '20ch', margin: '0 auto 20px' }}>
            See our process in <span className="text-[#AC033B] italic font-serif font-medium">action</span>
          </h2>
          <p className="text-white/50 leading-relaxed" style={{ fontSize: '15px', maxWidth: '480px', margin: '0 auto 40px' }}>
            Request a facility visit or download our full process validation documentation.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact"><Button variant="primary" size="lg">Book a Facility Visit</Button></Link>
            <Link href="/technology"><Button variant="outline" size="lg">All Technologies</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
