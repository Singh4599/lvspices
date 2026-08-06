'use client';

import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import OperationsMap from '@/components/technology/OperationsMap';

export default function HowWeOperatePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <TechTurbineHero badgeText="How We Operate" marqueeText="HOW WE OPERATE" />

      {/* ══ VELOCITY DIVIDER ══════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ INTERACTIVE MAP ════════════════════════════════════════ */}
      <OperationsMap />

    </main>
  );
}
