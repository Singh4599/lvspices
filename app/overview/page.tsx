import type { Metadata } from 'next';
import OverviewHero from '@/components/overview/OverviewHero';
import OverviewVision from '@/components/overview/OverviewVision';
import OverviewWhyUs from '@/components/overview/OverviewWhyUs';
import OverviewJourney from '@/components/overview/OverviewJourney';

export const metadata: Metadata = {
  title: 'Overview | LV Spices',
  description: 'Learn about our legacy, vision, mission, and journey.',
};

export default function OverviewPage() {
  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <OverviewHero />
      <OverviewVision />
      <OverviewWhyUs />
      <OverviewJourney />
    </main>
  );
}
