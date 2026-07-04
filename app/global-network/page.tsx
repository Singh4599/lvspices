'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { exportRegions, exportStats } from '@/data/export-markets';
import Marquee from '@/components/ui/Marquee';
import { Map, CheckCircle2 } from 'lucide-react';
import AnimatedHero from '@/components/animation/AnimatedHero';
import AnimatedCards from '@/components/animation/AnimatedCards';
import { AnimatedSectionHeader } from '@/components/animation/AnimatedSectionHeader';
import CountUp from '@/components/animation/CountUp';

const stats = [
  { value: exportStats.destinations, label: 'Export Destinations', numeric: 40, suffix: '+' },
  { value: exportStats.containersAnnual, label: 'Containers Annually', numeric: 500, suffix: '+' },
  { value: exportStats.exportExperience, label: 'Years Experience', numeric: 40, suffix: '' },
];

function DocumentationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  return (
    <section ref={ref} style={{ paddingBottom: '160px' }}>
      <div className="container-lv">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
          style={{
            background: 'rgba(172,3,59,0.02)',
            border: '1px solid rgba(172,3,59,0.08)',
            borderRadius: '24px',
            padding: '60px 40px',
          }}
        >
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{ width: '24px', height: '1.5px', background: '#AC033B', flexShrink: 0 }} />
                <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Documentation</span>
              </div>
              <h3 className="font-display font-bold text-white mb-4" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                Seamless<br /><span className="text-[#AC033B] italic font-serif">Clearance.</span>
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6">
                Our dedicated export division ensures every shipment is accompanied by perfect documentation for rapid customs clearance.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-[10px] tracking-widest text-white/35 w-full mb-1">INCOTERMS:</span>
                {exportStats.incoterms.map((term) => (
                  <span key={term} className="px-2.5 py-1 rounded bg-[#AC033B]/10 text-[11px] font-mono text-[#AC033B]">{term}</span>
                ))}
              </div>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exportStats.documentation.map((doc, i) => (
                <motion.div
                  key={doc}
                  initial={reduced ? false : { opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/05 backdrop-blur-md"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#AC033B] shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{doc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function GlobalNetworkPage() {
  const regionCards = exportRegions.map((region, index) => ({
    number: String(index + 1).padStart(2, '0'),
    icon: <Map className="h-6 w-6" />,
    title: region.name,
    extra: (
      <div className="flex flex-wrap gap-2 mt-2">
        {region.countries.map((country) => (
          <span key={country} className="px-3 py-1.5 rounded-md border border-[#AC033B]/20 bg-black/40 text-[12px] font-medium text-white/80">
            {country}
          </span>
        ))}
      </div>
    ),
  }));

  return (
    <>
      <AnimatedHero
        eyebrow="Global Reach"
        title={<>The world is our<br /><span className="text-[#AC033B] italic font-serif font-medium">market.</span></>}
        description="From Mumbai to Rotterdam, Delhi to New York — we supply the world's leading food manufacturers, retailers, and distributors with uncompromising quality."
        stats={stats}
        imageSrc="/images/global.jpg"
        imageAlt="LV Spices Global Network"
        particles="spice"
      />

      <section style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container-lv">
          <AnimatedSectionHeader
            eyebrow="Presence"
            title={<>Exporting to <span className="text-[#AC033B] italic font-serif font-medium">5 Continents.</span></>}
            description="We have established a robust logistics network capable of delivering compliant shipments to any major port globally."
          />
          <AnimatedCards cards={regionCards} />
        </div>
      </section>

      <DocumentationSection />

      <Marquee
        text="LONDON • ROTTERDAM • HAMBURG • NEW YORK • DUBAI • SINGAPORE • TOKYO • SYDNEY • PARIS • TORONTO • MUMBAI"
        className="py-6 border-t border-black/[0.06]"
        textClassName="font-mono text-[11px] tracking-[0.2em] text-[#AC033B]"
        speed={50}
      />
    </>
  );
}
