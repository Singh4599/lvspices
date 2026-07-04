'use client';

import Link from 'next/link';
import { Snowflake, Atom, ShieldCheck, FlaskConical } from 'lucide-react';
import TechOrbits from '@/components/animation/TechOrbits';
import TechHero from '@/components/ui/TechHero';
import AnimatedCards from '@/components/animation/AnimatedCards';
import { AnimatedSectionHeader } from '@/components/animation/AnimatedSectionHeader';
import CountUp from '@/components/animation/CountUp';
import { motion } from 'framer-motion';
import FlyingPosters from '@/components/animation/FlyingPosters';
import ElectricBorder from '@/components/animation/ElectricBorder';

const stats = [
  { value: 4, label: 'Core Technologies', suffix: '' },
  { value: 99.7, label: 'Oil Retention', suffix: '%', isFloat: true },
  { value: 500, label: 'Tests Per Batch', suffix: '+' },
  { value: 30, label: 'QA Scientists', suffix: '+' },
];

const technologies = [
  {
    number: '01',
    slug: 'cryogenic-grinding',
    icon: <Snowflake className="h-7 w-7" />,
    title: 'Cryogenic Grinding',
    bullets: [
      '-40°C operating temperature',
      '99.7% essential oil retention',
      'Zero aroma loss',
      'Uniform particle size',
    ],
    extra: (
      <Link href="/technology/cryogenic-grinding" style={{ textDecoration: 'none' }}>
        <div className="flex items-center gap-2 text-[#AC033B] font-medium" style={{ fontSize: '12px', marginTop: '8px' }}>
          Explore
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </Link>
    ),
  },
  {
    number: '02',
    slug: 'cfg-science',
    icon: <Atom className="h-7 w-7" />,
    title: 'CFG Science',
    bullets: [
      '500+ compounds tested',
      'GC-MS & HPLC profiling',
      'AI-driven quality control',
      'R&D partnerships',
    ],
    extra: (
      <Link href="/technology/cfg-science" style={{ textDecoration: 'none' }}>
        <div className="flex items-center gap-2 text-[#AC033B] font-medium" style={{ fontSize: '12px', marginTop: '8px' }}>
          Explore
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </Link>
    ),
  },
  {
    number: '03',
    slug: 'steam-sterilization',
    icon: <ShieldCheck className="h-7 w-7" />,
    title: 'Steam Sterilization',
    bullets: [
      '5-Log pathogen reduction',
      'Zero chemicals used',
      '100% steam pure',
      'Aroma & flavour preserved',
    ],
    extra: (
      <Link href="/technology/steam-sterilization" style={{ textDecoration: 'none' }}>
        <div className="flex items-center gap-2 text-[#AC033B] font-medium" style={{ fontSize: '12px', marginTop: '8px' }}>
          Explore
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </Link>
    ),
  },
  {
    number: '04',
    slug: 'quality-assurance',
    icon: <FlaskConical className="h-7 w-7" />,
    title: 'Quality Assurance',
    bullets: [
      '30+ QA scientists',
      '3 accredited laboratories',
      '500+ tests per batch',
      'HPLC, LCMS/MS, GCMS/MS',
    ],
    extra: (
      <Link href="/technology/quality-assurance" style={{ textDecoration: 'none' }}>
        <div className="flex items-center gap-2 text-[#AC033B] font-medium" style={{ fontSize: '12px', marginTop: '8px' }}>
          Explore
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </Link>
    ),
  },
];

export default function TechnologyPage() {
  return (
    <div className="relative">

      {/* HERO */}
      <TechHero
        breadcrumb="Technology"
        particleWords={['CRYOGENIC', 'CFG SCIENCE', 'PRECISION', '99.7% PURITY', 'STEAM CLEAN', '500+ TESTS', 'NABL LAB', 'TECHNOLOGY']}
        subtitle="Every system exists because the alternative wasn't good enough."
        stats={[
          { icon: <Atom className="h-5 w-5" />, value: '4', label: 'Core Technologies' },
          { icon: <Snowflake className="h-5 w-5" />, value: '99.7%', label: 'Oil Retention' },
          { icon: <FlaskConical className="h-5 w-5" />, value: '500+', label: 'Tests Per Batch' },
          { icon: <ShieldCheck className="h-5 w-5" />, value: '30+', label: 'QA Scientists' }
        ]}
        bottomText={
          <>
            We didn't adopt technology.<br />We invented it.
          </>
        }
      />

      {/* STATS */}
      <section style={{ background: 'rgba(255,255,255,0.05)', padding: 'clamp(48px,6vw,80px) clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 'clamp(32px,6vw,80px)', flexWrap: 'wrap' }}>
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ textAlign: 'center' }}
            >
              <div className="font-mono font-bold text-[#AC033B]" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)', lineHeight: 1, marginBottom: '8px' }}>
                {s.isFloat ? (
                  <>{s.value}{s.suffix}</>
                ) : (
                  <CountUp to={s.value as number} suffix={s.suffix} />
                )}
              </div>
              <div className="font-mono uppercase text-white/35" style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FLYING POSTERS — visual factory gallery */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 0', overflow: 'hidden' }}>
        <div className="container-lv" style={{ marginBottom: '48px' }}>
          <AnimatedSectionHeader
            eyebrow="Inside Our Plant"
            title={<>Where precision <span className="text-[#AC033B] italic font-serif font-medium">meets scale.</span></>}
            description="Our state-of-the-art facility processes millions of kilos annually with zero compromise."
          />
        </div>
        <div className="tech-flying-grid">
          <div className="tech-flying-left" style={{ height: '580px' }}>
            <FlyingPosters
              items={[
                '/images/factory.png',
                '/images/lab.png',
                '/images/cryo-dark.png',
                '/images/farm.png',
              ]}
              planeWidth={440}
              planeHeight={340}
              distortion={4}
              scrollEase={0.018}
            />
          </div>
          <div className="tech-flying-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px,5vw,80px)', gap: '32px' }}>
            {[
              { num: '01', stat: '99.7%', label: 'Essential oil retention via cryogenic grinding' },
              { num: '02', stat: '500+', label: 'Compound tests run per batch in our NABL lab' },
              { num: '03', stat: '40+', label: 'Certifications and global compliance standards met' },
            ].map(item => (
              <ElectricBorder key={item.num} color="#AC033B" speed={0.8} chaos={0.08} borderRadius={16} thickness={1.5} style={{ width: '100%' }}>
                <div style={{ padding: 'clamp(16px,2vw,24px) clamp(20px,2.5vw,32px)', display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <span className="font-mono text-[#AC033B]" style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.6 }}>{item.num}</span>
                  <div style={{ width: '1px', height: '40px', background: 'rgba(172,3,59,0.2)' }} />
                  <div>
                    <div className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.6rem,2.5vw,2rem)', lineHeight: 1, marginBottom: '6px' }}>{item.stat}</div>
                    <div className="font-sans text-white/50" style={{ fontSize: '13px', lineHeight: 1.5 }}>{item.label}</div>
                  </div>
                </div>
              </ElectricBorder>
            ))}
          </div>
        </div>
      </section>

      {/* TECH CARDS */}
      <section style={{ paddingTop: '40px', paddingBottom: '160px' }}>
        <div className="container-lv">
          <AnimatedSectionHeader
            eyebrow="Our Technologies"
            title={<>Engineered for <span className="text-[#AC033B] italic font-serif font-medium">excellence</span></>}
            description="Every technology we use is purpose-built — for purity, precision, and global compliance."
          />
          <AnimatedCards cards={technologies} />
        </div>
      </section>
    </div>
  );
}
