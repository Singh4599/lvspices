'use client';

import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import TechGlobeOverview from '@/components/technology/TechGlobeOverview';
import TechProcessHorizontal from '@/components/technology/TechProcessHorizontal';
import SpiceProcessingMachine from '@/components/technology/SpiceProcessingMachine';



export default function TechnologyPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ INTERACTIVE TURBINE HERO ════════════════════════════ */}
      <TechTurbineHero />

      {/* ══ VELOCITY MARQUEE DIVIDER ══════════════════════════ */}
      <VelocityMarquee dark={false} />

      {/* ══ INTERACTIVE FACTORY DIAGRAM ════════════════════════ */}
      <SpiceProcessingMachine />

      {/* ══ HORIZONTAL SCROLL PROCESS ══════════════════════════ */}
      <TechProcessHorizontal />

      {/* ══ CURVED LOOP ════════════════════════════════════════ */}
      <div style={{ background: '#fff', overflow: 'hidden', paddingBottom: 'clamp(24px, 3vw, 40px)', paddingTop: 'clamp(24px, 3vw, 40px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', zIndex: 10, marginBottom: 'clamp(8px, 1.5vw, 16px)' }}>
           <div style={{ fontSize: 'clamp(20px, 3vw, 36px)', fontFamily: 'var(--font-display)', color: '#AC033B', fontWeight: 800, lineHeight: 1 }}>LV</div>
           <div style={{ fontSize: 'clamp(7px, 0.8vw, 10px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.22em', marginTop: 4 }}>SPICES</div>
        </div>
        <div style={{ width: '100%' }}>
          <CurvedLoop marqueeText="STATE OF THE ART • ADVANCED PROCESSING • HYGIENE FIRST • " speed={1.5} curveAmount={100} />
        </div>
      </div>

      {/* ══ 3D GLOBE OVERVIEW ══════════════════════════════════ */}
      <TechGlobeOverview />

    </main>
  );
}
