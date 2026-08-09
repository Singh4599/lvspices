'use client';

import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import OperationsMap from '@/components/technology/OperationsMap';

import HorizontalTimeline from '@/components/how-we-operate/HorizontalTimeline';
import ProcessVideoSteps from '@/components/how-we-operate/ProcessVideoSteps';
import InfrastructureGrid from '@/components/how-we-operate/InfrastructureGrid';
import GoodManufacturingPractices from '@/components/how-we-operate/GoodManufacturingPractices';

export default function HowWeOperatePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <TechTurbineHero badgeText="How We Operate" marqueeText="HOW WE OPERATE" />

      {/* ══ VELOCITY DIVIDER ══════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ INTERACTIVE MAP ════════════════════════════════════════ */}
      <OperationsMap />

      {/* ══ HORIZONTAL PROCESS TIMELINE ═══════════════════════════ */}
      <HorizontalTimeline />

      {/* ══ VERTICAL VIDEO STEPS ══════════════════════════════════ */}
      <ProcessVideoSteps />

      {/* ══ INFRASTRUCTURE GRID ═══════════════════════════════════ */}
      <InfrastructureGrid />

      {/* ══ GOOD MANUFACTURING PRACTICES ══════════════════════════ */}
      <GoodManufacturingPractices />

    </main>
  );
}
