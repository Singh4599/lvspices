'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { generatePageMeta } from '@/lib/seo';
import { Clock, Globe, Package, Layers } from 'lucide-react';
import AnimatedHero from '@/components/animation/AnimatedHero';
import AnimatedCards from '@/components/animation/AnimatedCards';
import { AnimatedSectionHeader } from '@/components/animation/AnimatedSectionHeader';
import CircularGallery from '@/components/animation/CircularGallery';

const stats = [
  { value: '1975', label: 'Established', icon: <Clock className="h-5 w-5" /> },
  { value: '40+', label: 'Countries', icon: <Globe className="h-5 w-5" />, numeric: 40, suffix: '+' },
  { value: '500+', label: 'SKUs', icon: <Package className="h-5 w-5" />, numeric: 500, suffix: '+' },
  { value: '50 Yrs', label: 'Legacy', icon: <Layers className="h-5 w-5" /> },
];

const milestones = [
  {
    number: '01',
    year: '1975',
    title: 'The Beginning',
    bullets: [
      'Founded as Chillito Exports in Mumbai',
      'Family-led business rooted in spice trade',
      'First domestic distribution network built',
      'Focus on pure, unadulterated spices',
    ],
  },
  {
    number: '02',
    year: '1985',
    title: 'First Export',
    bullets: [
      'First international shipment from Mumbai port',
      'UK market entry — door to Europe opened',
      'ISO-ready documentation systems started',
      'Relationship-first B2B export model adopted',
    ],
  },
  {
    number: '03',
    year: '1995',
    title: 'Manufacturing',
    bullets: [
      'In-house manufacturing facility established',
      'Shifted from traders to manufacturers',
      'Complete control over quality from farm to port',
      '300+ MT monthly capacity achieved',
    ],
  },
  {
    number: '04',
    year: '2015',
    title: 'Cryogenic Revolution',
    bullets: [
      'Cryogenic grinding line installed',
      'Steam sterilization process validated',
      'Essential oil retention hit 99.7%',
      'NABL lab for pesticide & mycotoxin testing',
    ],
  },
];

const values = [
  {
    number: '01',
    title: 'Accountability',
    bullets: ['Every batch traced. Every test documented. Every shipment guaranteed.'],
  },
  {
    number: '02',
    title: 'Innovation',
    bullets: ['CFG Science. Cryogenic grinding. Steam sterilization. We invented better ways.'],
  },
  {
    number: '03',
    title: 'Scale',
    bullets: ['40+ countries. 500+ containers yearly. 500+ SKUs. Built for the world.'],
  },
];

/** Animated horizontal timeline with line drawing */
function AnimatedTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  return (
    <section style={{ paddingTop: '120px', paddingBottom: '120px', overflow: 'hidden' }}>
      <div className="container-lv">
        <AnimatedSectionHeader
          eyebrow="Our Journey"
          title={<>Five decades <span className="text-[#AC033B] italic font-serif font-medium">of building</span></>}
          description="From a single shipment to Rotterdam to a global supply chain powering the world's largest food brands."
        />

        {/* Timeline */}
        <div ref={ref} style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            right: '32px',
            height: '2px',
            background: 'rgba(255,255,255,0.05)',
            display: 'none',
          }} />
          <motion.div
            initial={reduced ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeOut' as const, delay: 0.2 }}
            style={{
              position: 'absolute',
              top: '32px',
              left: '0',
              right: '0',
              height: '2px',
              background: 'linear-gradient(to right, #AC033B, rgba(172,3,59,0.2))',
              transformOrigin: 'left',
            }}
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0',
          }}>
            {milestones.map((m, i) => (
              <motion.div
                key={m.number}
                initial={reduced ? false : { opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: 'easeOut' as const, delay: 0.3 + i * 0.15 }}
                style={{
                  padding: '0 clamp(16px, 2vw, 32px)',
                  paddingTop: '72px',
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                {/* Year dot on timeline */}
                <motion.div
                  initial={reduced ? false : { scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15, type: 'spring', stiffness: 300 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: '#AC033B',
                    border: '3px solid white',
                    boxShadow: '0 0 0 2px #AC033B',
                    marginTop: '-6px',
                    transform: 'translateX(24px)',
                  }}
                />

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '52px',
                  height: '52px',
                  borderRadius: '13px',
                  background: 'rgba(172,3,59,0.06)',
                  border: '1px solid rgba(172,3,59,0.12)',
                  marginBottom: '16px',
                }}>
                  <span className="font-mono font-bold text-[#AC033B]" style={{ fontSize: '16px' }}>{m.year}</span>
                </div>

                <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.2, marginBottom: '16px' }}>
                  {m.title}
                </h3>

                <div style={{ height: '1px', background: 'rgba(0,0,0,0.07)', marginBottom: '16px' }} />

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {m.bullets.map((b, bi) => (
                    <motion.li
                      key={bi}
                      initial={reduced ? false : { opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.15 + bi * 0.06, duration: 0.5 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}
                    >
                      <span className="text-[#AC033B] font-bold shrink-0" style={{ fontSize: '11px', lineHeight: '1.65' }}>—</span>
                      <span className="text-white/55" style={{ fontSize: '13px', lineHeight: '1.6' }}>{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function StoryPage() {
  return (
    <>
      <AnimatedHero
        eyebrow="Est. 1975"
        title={<>Born in Mumbai.<br /><span className="text-[#AC033B] italic font-serif font-medium">Built for the world.</span></>}
        description="We didn't start with a business plan. We started with spice — and fifty years later, we export to 40+ countries as an international food manufacturing corporation."
        stats={stats}
        imageSrc="/images/factory.png"
        imageAlt="LV Spices Manufacturing"
        particles="spice"
      />

      <AnimatedTimeline />

      {/* VALUES */}
      <section style={{ paddingTop: '0', paddingBottom: '160px' }}>
        <div className="container-lv">
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '80px' }} />
          <AnimatedSectionHeader
            title={<>We're not a masala seller. <span className="text-[#AC033B] italic font-serif font-medium">We're a corporation.</span></>}
            center={false}
          />
          <AnimatedCards
            cards={values.map(v => ({
              number: v.number,
              title: v.title,
              bullets: v.bullets,
            }))}
            columns={3}
          />
        </div>
      </section>
      {/* GALLERY */}
      <section style={{ paddingTop: '0', paddingBottom: '80px' }}>
        <div className="container-lv" style={{ marginBottom: '40px' }}>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '80px' }} />
          <AnimatedSectionHeader
            eyebrow="Gallery"
            title={<>The world we&apos;ve <span className="text-[#AC033B] italic font-serif font-medium">built.</span></>}
            description="From farm to factory to global shelf — every image tells the story of our craft."
          />
        </div>
        <div style={{ height: '520px', position: 'relative' }}>
          <CircularGallery
            bend={4}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.025}
            scrollSpeed={2.5}
            items={[
              { image: '/images/factory.png', text: 'Our Factory' },
              { image: '/images/farm.png', text: 'Farm Sourcing' },
              { image: '/images/lab.png', text: 'QA Laboratory' },
              { image: '/images/cryo-dark.png', text: 'Cryogenic Line' },
              { image: '/images/products.png', text: 'Product Range' },
              { image: '/images/farm-editorial.png', text: 'Field to Shelf' },
              { image: '/images/factory.png', text: 'Scale & Precision' },
              { image: '/images/hero-spices.png', text: 'Pure Spices' },
            ]}
          />
        </div>
      </section>
    </>
  );
}
