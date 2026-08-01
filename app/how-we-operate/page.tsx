'use client';

import ScrollExpansionHero from '@/components/ui/ScrollExpansionHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import OperationsMap from '@/components/technology/OperationsMap';

export default function HowWeOperatePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <ScrollExpansionHero
        badge="How We Operate"
        headingText="Seed to"
        headingRed="Shelf."
        subText="8 precise steps — from farm procurement to global export. Click each station below to explore the technology behind LV Spices."
        imageSrc="/images/factory.png"
        stats={[
          { value: '200 MT', label: 'Daily Output' },
          { value: '8 Steps', label: 'Zero Compromise' },
          { value: '40+', label: 'Countries' },
        ]}
      />

      {/* ══ VELOCITY DIVIDER ══════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ INTERACTIVE MAP ════════════════════════════════════════ */}
      <OperationsMap />

    </main>
  );
}
