import type { Metadata } from 'next';
import CareerHero from '@/components/career/CareerHero';
import CareerMission from '@/components/career/CareerMission';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CareerBenefits from '@/components/career/CareerBenefits';
import CareerForm from '@/components/career/CareerForm';

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
      <CareerHero />
      <div style={{ background: '#F8F6F1', paddingTop: '60px' }}>
        <VelocityMarquee dark={false} />
      </div>
      <CareerMission />
      <CareerBenefits />
      <CareerForm />
    </main>
  );
}
