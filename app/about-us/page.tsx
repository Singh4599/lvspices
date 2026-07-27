import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import OriginStory from '@/components/about/OriginStory';
import JourneyTimeline from '@/components/about/JourneyTimeline';
import MarqueeSection from '@/components/about/MarqueeSection';
import FarmToFactory from '@/components/about/FarmToFactory';
import TechProcess from '@/components/about/TechProcess';
import GlobalReach from '@/components/about/GlobalReach';
import BenefitsGrid from '@/components/about/BenefitsGrid';
import FinalStoryCTA from '@/components/about/FinalStoryCTA';

export const metadata: Metadata = {
  title: 'About Us | Trusted Spice Manufacturer & Exporter Since 1975',
  description: 'LV Spices is India\'s trusted spice manufacturer, supplier & exporter since 1975. 50+ years of export-quality spice manufacturing — bulk spices, OEM, private label & custom blends for 40+ countries. FSSC 22000, HACCP, Halal certified.',
  openGraph: {
    title: 'About LV Spices | India\'s Trusted Spice Manufacturer Since 1975',
    description: 'Five decades of certified spice manufacturing — bulk spices, OEM, private label & custom blends exported to 40+ countries worldwide.',
    images: [{ url: '/images/hero-bowl.png', width: 1200, height: 630 }],
  },
};

export default function AboutUsPage() {
  return (
    <main>
      {/* ── 01 Cinematic Hero ── */}
      <AboutHero />

      {/* ── 02 Origin 1975 ── */}
      <OriginStory />

      {/* ── 03 Timeline ── */}
      <JourneyTimeline />

      {/* ── Marquee strip (velocity text + image + curved arc) ── */}
      <MarqueeSection />

      {/* ── 04 Farm to Factory ── */}
      <FarmToFactory />

      {/* ── 05 Technology Process ── */}
      <TechProcess />

      {/* ── 06 Global Reach (3D Globe) ── */}
      <GlobalReach />

      {/* ── 07 What Sets Us Apart (dark) ── */}
      <BenefitsGrid />

      {/* ── 08 Final CTA ── */}
      <FinalStoryCTA />
    </main>
  );
}
