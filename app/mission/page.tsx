'use client';

import { Target, Eye, ShieldCheck, Handshake } from 'lucide-react';
import AnimatedHero from '@/components/animation/AnimatedHero';
import AnimatedCards from '@/components/animation/AnimatedCards';
import { AnimatedSectionHeader } from '@/components/animation/AnimatedSectionHeader';

const stats = [
  { value: '1975', label: 'Founded' },
  { value: '50', label: 'Years Legacy', numeric: 50, suffix: '' },
  { value: '40+', label: 'Countries', numeric: 40, suffix: '+' },
];

const cards = [
  {
    number: '01',
    icon: <Target className="h-7 w-7" />,
    title: 'Our Mission',
    bullets: [
      'Deliver unadulterated, authentic Indian spices to the global market.',
      'Maintain the highest standards of food safety and traceability.',
      'Empower local farming communities through fair trade practices.',
      'Drive continuous innovation in spice processing technology.',
    ],
  },
  {
    number: '02',
    icon: <Eye className="h-7 w-7" />,
    title: 'Our Vision',
    bullets: [
      "To be the world's most trusted partner for spices and seasonings.",
      'Achieve a billion-dollar scale while maintaining uncompromised quality.',
      'Set the global benchmark for spice safety and sustainability.',
      'Pioneer research in flavor preservation and essential oil retention.',
    ],
  },
  {
    number: '03',
    icon: <ShieldCheck className="h-7 w-7" />,
    title: 'Core Values',
    bullets: [
      'Integrity: Total transparency in sourcing and testing.',
      'Quality: Zero tolerance for adulteration or contamination.',
      'Accountability: Every batch traced from farm to container.',
      'Excellence: Exceeding international compliance standards.',
    ],
  },
  {
    number: '04',
    icon: <Handshake className="h-7 w-7" />,
    title: 'Our Commitments',
    bullets: [
      'To our buyers: Consistent flavor profiles year-round.',
      'To our consumers: 100% safe, chemical-free ingredients.',
      'To our farmers: Sustainable livelihoods and long-term partnerships.',
      'To the planet: Minimizing our environmental footprint.',
    ],
  },
];

export default function MissionPage() {
  return (
    <>
      <AnimatedHero
        eyebrow="Our Purpose"
        title={<>Driven by<br /><span className="text-[#AC033B] italic font-serif font-medium">purpose.</span></>}
        description="For 50 years, our compass hasn't changed. We exist to bring the true, unadulterated flavors of India to the world, without compromise."
        stats={stats}
        imageSrc="/images/factory.png"
        imageAlt="LV Spices Purpose"
        particles="spice"
      />

      <section style={{ paddingTop: '120px', paddingBottom: '160px' }}>
        <div className="container-lv">
          <AnimatedSectionHeader
            eyebrow="Guiding Principles"
            title={<>Our foundation. <span className="text-[#AC033B] italic font-serif font-medium">Our future.</span></>}
            description="The pillars that define who we are, how we operate, and where we are going."
          />
          <AnimatedCards cards={cards} />
        </div>
      </section>
    </>
  );
}
