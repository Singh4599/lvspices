'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Map, Recycle, Leaf, Users } from 'lucide-react';
import AnimatedHero from '@/components/animation/AnimatedHero';
import AnimatedCards from '@/components/animation/AnimatedCards';
import { AnimatedSectionHeader } from '@/components/animation/AnimatedSectionHeader';

const stats = [
  { value: 'Zero', label: 'Waste Target' },
  { value: '100%', label: 'Traceable' },
  { value: 'Eco', label: 'Packaging' },
];

const cards = [
  {
    number: '01',
    icon: <Map className="h-7 w-7" />,
    title: 'Responsible Sourcing',
    bullets: [
      'Direct partnerships with 5,000+ local farmers.',
      'Promoting pesticide-free and organic farming practices.',
      'Fair pricing models ensuring community prosperity.',
      'Farm-level geofencing for complete traceability.',
    ],
  },
  {
    number: '02',
    icon: <Recycle className="h-7 w-7" />,
    title: 'Waste Reduction',
    bullets: [
      'By-product upcycling into organic fertilizers.',
      'Zero-liquid discharge (ZLD) effluent treatment.',
      'Optimized grinding minimizing spice dust loss.',
      'Comprehensive recycling protocols in manufacturing.',
    ],
  },
  {
    number: '03',
    icon: <Leaf className="h-7 w-7" />,
    title: 'Eco-Friendly Packaging',
    bullets: [
      'Transitioning to 100% recyclable mono-materials.',
      'Biodegradable bulk shipping solutions.',
      'Reduction in virgin plastic usage across SKUs.',
      'FSC-certified paperboard for retail cartons.',
    ],
  },
  {
    number: '04',
    icon: <Users className="h-7 w-7" />,
    title: 'Community Impact',
    bullets: [
      'Skills training programs for agricultural workers.',
      'Investments in rural education and healthcare.',
      'Empowering women in the processing workforce.',
      'Safe, ethical, and audited working conditions (SMETA).',
    ],
  },
];

/** Animated progress bars for sustainability metrics */
function MetricsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();

  const metrics = [
    { label: 'Organic Sourcing', pct: 68 },
    { label: 'Renewable Energy', pct: 42 },
    { label: 'Water Recycled', pct: 85 },
    { label: 'Zero-Waste Batches', pct: 91 },
  ];

  return (
    <section ref={ref} style={{ paddingBottom: '80px' }}>
      <div className="container-lv">
        <div style={{
          background: 'rgba(172,3,59,0.02)',
          border: '1px solid rgba(172,3,59,0.07)',
          borderRadius: '20px',
          padding: 'clamp(32px,4vw,56px)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
            {metrics.map((m, i) => (
              <div key={m.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="font-mono text-white/45 uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em' }}>{m.label}</span>
                  <span className="font-mono font-bold text-[#AC033B]" style={{ fontSize: '12px' }}>{m.pct}%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div
                    initial={reduced ? false : { scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, ease: 'easeOut' as const, delay: 0.2 + i * 0.15 }}
                    style={{
                      height: '100%',
                      width: `${m.pct}%`,
                      background: 'linear-gradient(to right, #AC033B, #e8603c)',
                      borderRadius: '2px',
                      transformOrigin: 'left',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SustainabilityPage() {
  return (
    <>
      <AnimatedHero
        eyebrow="Our Commitment"
        title={<>Farming with<br /><span className="text-[#AC033B] italic font-serif font-medium">conscience.</span></>}
        description="We believe that taking from the earth requires giving back. Our sustainability initiatives ensure that our growth never comes at the cost of the environment or our communities."
        stats={stats}
        imageSrc="/images/farm.png"
        imageAlt="LV Spices Sustainable Farming"
        particles="leaf"
      />

      <section style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container-lv">
          <AnimatedSectionHeader
            eyebrow="Initiatives"
            title={<>Protecting the <span className="text-[#AC033B] italic font-serif font-medium">source.</span></>}
            description="Our actionable steps towards a greener, more sustainable spice industry."
          />
          <AnimatedCards cards={cards} />
        </div>
      </section>

      <MetricsStrip />
    </>
  );
}
