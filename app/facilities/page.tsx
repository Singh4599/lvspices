'use client';

import Image from 'next/image';
import { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ParallaxCard from '@/components/ui/ParallaxCard';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const facilities = [
  {
    id: 'processing', title: 'Processing Units',
    content: 'LV Spices operates 7+ state-of-the-art processing units spanning over 1,00,000 sq. ft. of built-up area. Equipped with automated cleaning lines, gravity separators, and destoners to ensure 99.9% physical purity. The core relies on proprietary Cryogenic Grinding at -150°C.',
    image: '/images/products.png',
    stat: '7+', statLabel: 'Units',
  },
  {
    id: 'sterilization', title: 'Steam Sterilization',
    content: 'A fully automated, continuous steam sterilization facility meeting stringent global food safety standards. The process uses HTST steam treatment followed by rapid vacuum cooling — delivering validated 5-log microbial reduction without compromising organoleptic properties.',
    image: '/images/farm-editorial.png',
    stat: '5-Log', statLabel: 'Microbial Reduction',
  },
  {
    id: 'analytical', title: 'Analytical & Instrument Lab',
    content: 'Our NABL-accredited (ISO/IEC 17025:2017) in-house analytical laboratory uses LC-MS/MS and GC-MS/MS for comprehensive pesticide residue analysis covering 500+ compounds. HPLC systems quantify curcuminoids, piperine, and capsaicin (SHU).',
    image: '/images/lab.png',
    stat: '500+', statLabel: 'Compounds Tested',
  },
  {
    id: 'micro', title: 'Microbiology Lab',
    content: 'A sterile environment dedicated to pathogen detection. Every lot undergoes rigorous testing for TPC, Yeast & Mould, Coliforms, E. coli, and Salmonella. Rapid-testing protocols and strict environmental monitoring guarantee microbiological safety.',
    image: '/images/lab.png',
    stat: '100%', statLabel: 'Lots Tested',
  },
  {
    id: 'rnd', title: 'Research & Development',
    content: 'Our R&D centre is manned by food technologists and flavour scientists. It focuses on new product development, custom blend formulation for global FMCG brands, and shelf-life enhancement studies with a dedicated sensory evaluation panel.',
    image: '/images/lab.png',
    stat: '425+', statLabel: 'Blends Developed',
  },
  {
    id: 'packaging', title: 'Private Labelling & Packaging',
    content: 'End-to-end private labelling solutions backed by robust packaging infrastructure. Temperature and humidity-controlled packing units feature automated multi-head weighers, FFS machines, and nitrogen flushing — integrated with inline metal detectors.',
    image: '/images/products.png',
    stat: '24mo', statLabel: 'Shelf Life',
  },
];

function FacilityCard({ fac, isOpen, onToggle }: { fac: typeof facilities[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Stat pill */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            background: isOpen ? 'rgba(172,3,59,0.08)' : 'rgba(0,0,0,0.04)',
            border: `1px solid ${isOpen ? 'rgba(172,3,59,0.25)' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: 10, padding: '8px 14px', minWidth: 60,
            transition: 'all 0.3s',
          }}>
            <span style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 700, color: isOpen ? CRIMSON : '#111', lineHeight: 1 }}>{fac.stat}</span>
            <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 2 }}>{fac.statLabel}</span>
          </div>
          <span style={{ fontFamily: SANS, fontSize: 'clamp(16px,2vw,20px)', fontWeight: 600, color: isOpen ? CRIMSON : '#111', transition: 'color 0.3s' }}>
            {fac.title}
          </span>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          border: `1px solid ${isOpen ? CRIMSON : 'rgba(0,0,0,0.15)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? CRIMSON : 'rgba(0,0,0,0.5)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      <div style={{
        maxHeight: isOpen ? '600px' : '0px', opacity: isOpen ? 1 : 0,
        transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s',
        overflow: 'hidden',
      }}>
        <div style={{ paddingBottom: 36, display: 'flex', gap: 'clamp(20px,4vw,40px)', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,15.5px)', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, margin: 0 }}>
              {fac.content}
            </p>
          </div>
          <div style={{ flex: '0 0 clamp(200px,28vw,340px)', height: 200, position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
            <Image src={fac.image} alt={fac.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.12), transparent)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FacilitiesPage() {
  const [openItem, setOpenItem] = useState<string | null>('processing');
  const toggle = (id: string) => setOpenItem(prev => prev === id ? null : id);

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <PageHero
        tag="Infrastructure"
        heading="World-Class"
        headingRed="Facilities."
        subCopy="Cutting-edge processing infrastructure built to produce at scale while meeting the most stringent global food safety requirements."
        imageSrc="/images/farm.png"
        imageAlt="LV Spices Facilities"
        overlay="gradient-up"
        stats={[
          { value: '1L sqft', label: 'Facility Area' },
          { value: '7+', label: 'Processing Units' },
          { value: 'NABL', label: 'Lab Accredited' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE ══════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ PARALLAX SECTION ═════════════════════════════════ */}
      <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)', background: '#fff' }}>
        <ParallaxCard
          imageSrc="/images/factory.png"
          tilt={false}
          parallaxStrength={0.2}
          style={{ height: 'clamp(300px, 40vh, 500px)', width: '100%', borderRadius: 24, border: 'none' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)', zIndex: 1 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: 'clamp(32px, 6vw, 80px)', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffb3c6', marginBottom: 16 }}>Our Commitment</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', margin: 0, lineHeight: 1.1, maxWidth: 600 }}>World-Class Infrastructure</h2>
          </div>
        </ParallaxCard>
      </div>

      {/* ══ FACILITIES ACCORDION ══════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>Our Units</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 60px', lineHeight: 1.05 }}>
              Every Facility, World-Class
            </h2>
          </ScrollReveal>

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            {facilities.map(fac => (
              <ScrollReveal key={fac.id} fromY={16}>
                <FacilityCard
                  fac={fac}
                  isOpen={openItem === fac.id}
                  onToggle={() => toggle(fac.id)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CURVED LOOP ════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingBottom: 'clamp(40px, 6vw, 80px)', paddingTop: 'clamp(40px, 6vw, 80px)' }}>
        <CurvedLoop 
          marqueeText="INFRASTRUCTURE • GLOBAL STANDARDS • SCALABLE • "
          speed={1.5}
          curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
           <text style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
           <text style={{ fontSize: 'clamp(9px, 1vw, 14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>

      {/* ══ FACILITY SNAPSHOT GRID ════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)', background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={20}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 48px' }}>
              A Glimpse Inside
            </h2>
          </ScrollReveal>

          <StaggerReveal stagger={0.08} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: 16,
          }}>
            <div style={{ gridColumn: '1 / 3', gridRow: '1', borderRadius: 12, overflow: 'hidden', position: 'relative', height: 300 }}>
              <Image src="/images/factory.png" alt="Factory" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 24 }}>
                <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: '#fff' }}>Processing Floor</div>
              </div>
            </div>
            <div style={{ gridColumn: '3', gridRow: '1', borderRadius: 12, overflow: 'hidden', position: 'relative', height: 300 }}>
              <Image src="/images/lab.png" alt="Lab" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 24 }}>
                <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: '#fff' }}>QC Laboratory</div>
              </div>
            </div>
            <div style={{ gridColumn: '1', gridRow: '2', borderRadius: 12, overflow: 'hidden', position: 'relative', height: 220 }}>
              <Image src="/images/cryo-dark.png" alt="Cryo" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#fff' }}>Cryogenic Plant</div>
              </div>
            </div>
            <div style={{ gridColumn: '2 / 4', gridRow: '2', borderRadius: 12, overflow: 'hidden', position: 'relative', height: 220 }}>
              <Image src="/images/products.png" alt="Products" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#fff' }}>Packaging & Dispatch</div>
              </div>
            </div>
          </StaggerReveal>
        </div>
      </section>

    </main>
  );
}
