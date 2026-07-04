'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Package, Beaker, FileCheck, Truck } from 'lucide-react';
import AnimatedHero from '@/components/animation/AnimatedHero';
import AnimatedCards from '@/components/animation/AnimatedCards';
import { AnimatedSectionHeader } from '@/components/animation/AnimatedSectionHeader';

const stats = [
  { value: '500+', label: 'Base SKUs', numeric: 500, suffix: '+' },
  { value: 'Custom', label: 'Formulas' },
  { value: '30 Days', label: 'Sample TAT' },
  { value: '5g–25kg', label: 'Pack Sizes' },
];

const cards = [
  {
    number: '01',
    icon: <Beaker className="h-7 w-7" />,
    title: 'Custom Formulation',
    bullets: [
      'In-house R&D team led by flavor scientists.',
      'Reverse engineering of existing flavor profiles.',
      'Bespoke spice blends tailored to local palates.',
      'Scale-up from lab samples to full production.',
    ],
  },
  {
    number: '02',
    icon: <Package className="h-7 w-7" />,
    title: 'Packaging Design',
    bullets: [
      'Flexible packaging: sachets, pouches, PET jars.',
      'Retail and foodservice (HORECA) sizing.',
      'Modified Atmosphere Packaging (MAP) available.',
      'In-house label printing and application.',
    ],
  },
  {
    number: '03',
    icon: <FileCheck className="h-7 w-7" />,
    title: 'Regulatory Compliance',
    bullets: [
      'FSSAI, FDA, and EU food safety compliance.',
      'Nutritional profiling and allergen declarations.',
      'Label compliance review for target export markets.',
      'Kosher, Halal, and Organic certifications support.',
    ],
  },
  {
    number: '04',
    icon: <Truck className="h-7 w-7" />,
    title: 'Global Logistics',
    bullets: [
      'FCL and LCL shipment consolidation.',
      'Palletization optimized for international freight.',
      'Complete export documentation handling.',
      'Temperature-controlled transit options.',
    ],
  },
];

/** Animated process flow — numbered steps with connecting line */
function ProcessFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  const steps = [
    { n: '01', label: 'Briefing', desc: 'Share your requirements' },
    { n: '02', label: 'Formulation', desc: 'R&D develops sample' },
    { n: '03', label: 'Approval', desc: 'You approve sample' },
    { n: '04', label: 'Production', desc: 'Full-scale manufacturing' },
    { n: '05', label: 'Delivery', desc: 'Packed & shipped worldwide' },
  ];

  return (
    <section ref={ref} style={{ paddingTop: '0', paddingBottom: '160px' }}>
      <div className="container-lv">
        <AnimatedSectionHeader
          eyebrow="The Workflow"
          title={<>Concept to <span className="text-[#AC033B] italic font-serif font-medium">shelf.</span></>}
          description="A streamlined private label journey — from your idea to the retailer's shelf in as little as 30 days."
        />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '0', overflow: 'hidden' }}>
          {/* Connecting line */}
          <motion.div
            initial={reduced ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, ease: 'easeOut' as const, delay: 0.3 }}
            style={{
              position: 'absolute',
              top: '26px',
              left: '26px',
              right: '26px',
              height: '2px',
              background: 'linear-gradient(to right, #AC033B, rgba(172,3,59,0.1))',
              transformOrigin: 'left',
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={reduced ? false : { opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: 'easeOut' as const, delay: 0.2 + i * 0.15 }}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                paddingTop: '64px',
                paddingLeft: '8px',
                paddingRight: '8px',
              }}
            >
              {/* Step dot */}
              <motion.div
                initial={reduced ? false : { scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.4 + i * 0.15, type: 'spring', stiffness: 350 }}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: i === 0 ? '#AC033B' : 'white',
                  border: `2px solid ${i === 0 ? '#AC033B' : 'rgba(172,3,59,0.25)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  boxShadow: i === 0 ? '0 4px 20px rgba(172,3,59,0.35)' : '0 2px 8px rgba(0,0,0,0.06)',
                  position: 'absolute',
                  top: 0,
                }}
              >
                <span
                  className="font-mono font-bold"
                  style={{ fontSize: '13px', color: i === 0 ? 'white' : '#AC033B' }}
                >
                  {step.n}
                </span>
              </motion.div>

              <div
                className="font-display font-bold text-white"
                style={{ fontSize: '14px', lineHeight: 1.2, marginBottom: '6px' }}
              >
                {step.label}
              </div>
              <div
                className="text-white/35"
                style={{ fontSize: '12px', lineHeight: 1.5 }}
              >
                {step.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PrivateLabelPage() {
  return (
    <>
      <AnimatedHero
        eyebrow="Contract Manufacturing"
        title={<>Your brand.<br /><span className="text-[#AC033B] italic font-serif font-medium">Our expertise.</span></>}
        description="End-to-end private label solutions for the world's leading retailers and food brands. From custom R&D formulation to shelf-ready packaging, we handle the complexity so you can focus on sales."
        stats={stats}
        imageSrc="/images/products.png"
        imageAlt="LV Spices Private Label Packaging"
        particles="spice"
      />

      <section style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container-lv">
          <AnimatedSectionHeader
            eyebrow="What We Offer"
            title={<>Full-service <span className="text-[#AC033B] italic font-serif font-medium">solution.</span></>}
            description="A fully integrated contract manufacturing workflow designed for scale and speed to market."
          />
          <AnimatedCards cards={cards} />
        </div>
      </section>

      <ProcessFlow />
    </>
  );
}
