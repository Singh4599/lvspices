import type { Metadata } from 'next';
import CareerHero from '@/components/career/CareerHero';
import CareerMission from '@/components/career/CareerMission';
import CareerBenefits from '@/components/career/CareerBenefits';
import CareerDeptExplorer from '@/components/career/CareerDeptExplorer';
import CareerPathBlueprint from '@/components/career/CareerPathBlueprint';
import CareerForm from '@/components/career/CareerForm';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import ScrollReveal from '@/components/ui/ScrollReveal';

const CR   = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

export const metadata: Metadata = {
  title: 'Careers — LV Spices | Join Our Team',
  description: 'Work with the best. Join 500+ professionals building the future of Indian spice exports.',
  openGraph: {
    title: 'Careers — LV Spices',
    description: 'Work with the best. Join 500+ professionals building the future of Indian spice exports.',
    images: [{ url: '/images/farm-editorial.png', width: 1200, height: 630 }],
  },
};

export default function CareerPage() {
  return (
    <main style={{ background: '#F8F6F1', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ══ HERO ═════════════════════════════════════════════ */}
      <CareerHero />

      {/* ══ VELOCITY MARQUEE ════════════════════════════════ */}
      <div style={{ background: '#F8F6F1', paddingTop: '60px' }}>
        <VelocityMarquee dark={false} />
      </div>

      {/* ══ MISSION ══════════════════════════════════════════ */}
      <CareerMission />

      {/* ══ CAREER PATH BLUEPRINT SVG ═══════════════════════════ */}
      <CareerPathBlueprint />

      {/* ══ DEPARTMENT EXPLORER ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(64px,8vw,110px) clamp(20px,5vw,72px)', background: '#fff' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              Where Will You Fit?
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 18px', lineHeight: 1.05 }}>
              Explore Our <em style={{ color: CR, fontStyle: 'italic' }}>Departments</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(0,0,0,0.52)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
              500+ professionals across 6 departments — from lab scientists and QC analysts to logistics coordinators and export managers. Click a department to explore roles.
            </p>
          </ScrollReveal>

          <CareerDeptExplorer />
        </div>
      </section>

      {/* ══ BENEFITS ═════════════════════════════════════════ */}
      <CareerBenefits />



      {/* ══ APPLICATION FORM ═════════════════════════════════ */}
      <CareerForm />

    </main>
  );
}
