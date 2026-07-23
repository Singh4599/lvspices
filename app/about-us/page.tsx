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
  title: 'Our Story — LV Spices | 50 Years of Spice Excellence',
  description: 'From a small beginning in 1975 to 40+ countries worldwide — discover the LV Spices journey through five decades of passion, purity and precision.',
  openGraph: {
    title: 'Our Story — LV Spices',
    description: 'Five decades of dedication, from our roots to the world.',
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
