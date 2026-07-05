'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import ScrollVelocity from '@/components/ui/ScrollVelocity';
import LogoLoop from '@/components/ui/LogoLoop';
import CountUp from '@/components/animation/CountUp';
import ScrollReveal from '@/components/animation/ScrollReveal';
import ElectricBorder from '@/components/animation/ElectricBorder';
import CircularGallery from '@/components/animation/CircularGallery';
import { ShuffleGrid } from '@/components/ui/ShuffleGrid';
import dynamic from 'next/dynamic';
import FloatingSpiceObject from '@/components/animation/FloatingSpiceObject';

const PinnedVideoSection = dynamic(
  () => import('@/components/animation/PinnedVideoSection'),
  { ssr: false }
);

const StickyProcessStep = dynamic(
  () => import('@/components/animation/StickyProcessStep'),
  { ssr: false }
);

const DomeGallery = dynamic(() => import('@/components/animation/DomeGallery'), { ssr: false });


const CRIMSON = '#AC033B';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';

// Responsive helpers via inline styles — works without CSS class dependency
const PAGE_PAD = 'clamp(20px, 5vw, 64px)';

export default function HomePage() {
  return (
    <main style={{ background: 'transparent' }}>
      {/* <FloatingSpiceObject /> */}
      <div id="hero-section"><Hero /></div>
      <div id="after-hero">
        <Divider />
      </div>
      <div id="who-we-are-section"><WhoWeAre /></div>
      <Divider />
      {/* PRODUCT GALLERY */}
      <section id="section-products" style={{ padding: 'clamp(24px,4vw,48px) 0 clamp(100px,14vw,140px)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, marginBottom: '32px', textAlign: 'center', overflow: 'hidden' }}>
          <ChapterTag label="Our Range" />
          <ScrollReveal delay={0} from={60}>
            <h2 data-gsap="split" suppressHydrationWarning style={{ fontFamily: SERIF, fontSize: 'clamp(28px,6vw,96px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', margin: '16px 0 12px' }}>
              Every spice. Every format.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150} from={30}>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.4)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              500+ SKUs across 12 categories — scroll to explore our full product universe.
            </p>
          </ScrollReveal>
        </div>
        <div style={{ height: 'clamp(340px, 55vw, 680px)', position: 'relative' }}>
          <CircularGallery
            bend={2}
            textColor="#ffffff"
            borderRadius={0.07}
            scrollEase={0.05}
            scrollSpeed={2}
            items={[
              { image: '/images/hero-spices.png', text: 'Premium Spices' },
              { image: '/images/products.png', text: 'Full Range' },
              { image: '/images/farm.png', text: 'Farm Sourced' },
              { image: '/images/factory.png', text: 'Manufactured' },
              { image: '/images/lab.png', text: 'Lab Tested' },
              { image: '/images/cryo-dark.png', text: 'Cryogenic' },
              { image: '/images/farm-editorial.png', text: 'Field Fresh' },
              { image: '/images/cfg-bg.png', text: 'CFG Science' },
            ]}
          />
        </div>
      </section>
      <div id="section-what-we-do"><WhatWeDo /></div>
      <Divider />
      {/* RESOURCES */}
      <div id="section-resources"><Resources /></div>
      <Divider />
      {/* DOME GALLERY */}
      <section id="section-dome" style={{ padding: 'clamp(48px,6vw,80px) 0 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <ChapterTag label="Our World" />
          <ScrollReveal delay={0} from={40}>
            <h2 data-gsap="split" suppressHydrationWarning style={{ fontFamily: SERIF, fontSize: 'clamp(36px,5vw,72px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '16px 0 0' }}>
              Explore the Spice Universe.
            </h2>
          </ScrollReveal>
        </div>
        <div style={{ width: '100%', height: 'clamp(480px, 80vw, 700px)', position: 'relative' }}>
          <DomeGallery
            overlayBlurColor="transparent"
            grayscale={false}
            minRadius={600}
            fit={0.55}
            imageBorderRadius="20px"
            openedImageBorderRadius="20px"
            openedImageWidth="480px"
            openedImageHeight="480px"
          />
        </div>
      </section>
      <Divider />
      {/* <FinalCTA /> */}
      {/* <Divider /> */}
      <div id="section-certifications"><Certifications /></div>
      <TickerBar />
    </main>
  );
}

function Divider() {
  return <div style={{ height: 0, width: '100%' }} />;
}

/* ═══ HERO ═══════════════════════════════════════════════ */
function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const TOTAL = 240;

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(TOTAL);
    const frameObj = { value: 0 };
    let rafId: number | null = null;
    let pendingIdx = 0;

    const drawFrame = (img: HTMLImageElement) => {
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      if (!iw || !ih || !cw || !ch) return;
      const scale = Math.max(cw / iw, ch / ih);
      ctx.drawImage(img, (iw - cw / scale) / 2, (ih - ch / scale) / 2, cw / scale, ch / scale, 0, 0, cw, ch);
    };

    const scheduleDraw = (idx: number) => {
      pendingIdx = idx;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const img = images[pendingIdx];
        if (img?.complete && img?.naturalWidth) drawFrame(img);
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = section.getBoundingClientRect();
      const w = rect.width  || window.innerWidth;
      const h = rect.height || window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      const img = images[Math.round(frameObj.value)];
      if (img?.complete && img?.naturalWidth) drawFrame(img);
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < TOTAL; i++) {
      const img = new window.Image();
      images[i] = img;
      img.src = `/frames/hero/frame_${String(i + 1).padStart(4, '0')}.jpg`;
      img.decoding = 'async';
      img.decode().then(() => { if (i === 0) { resize(); drawFrame(img); } }).catch(() => {});
    }

    const tween = gsap.to(frameObj, {
      value: TOTAL - 1, ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=2500',
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
        onRefresh: () => resize(),
      },
      onUpdate: () => scheduleDraw(Math.round(frameObj.value)),
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div>
      <section
        ref={sectionRef}
        style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden', background: '#000' }}
      >
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />
      </section>
    </div>
  );
}

/* ═══ TICKER ═════════════════════════════════════════════ */
function TickerBar() {
  return (
    <div style={{ background: 'transparent', padding: 'clamp(40px, 6vw, 80px) 0', overflow: 'hidden' }}>
      <ScrollVelocity
        texts={['THE SPICE SPECIALIST ·', 'PREMIUM EXPORT QUALITY ·']}
        velocity={50}
        className="font-serif italic text-4xl md:text-7xl tracking-tight text-[#AC033B] px-8"
        damping={50}
        stiffness={400}
      />
    </div>
  );
}

/* ═══ STATS ══════════════════════════════════════════════ */
function Stats() {
  const stats = [
    { value: '50+', label: 'Years of Excellence' },
    { value: '500+', label: 'Product SKUs' },
    { value: '40+', label: 'Countries Served' },
    { value: '500+', label: 'Containers / Year' },
    { value: '100%', label: 'Traceability' },
    { value: 'Zero', label: 'Compromise' },
  ];

  const statLogos = stats.map((s, i) => ({
    node: (
      <div key={i} style={{
        padding: 'clamp(16px, 2.5vw, 24px) clamp(20px, 3vw, 40px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minWidth: '200px',
        borderRight: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 44px)', fontStyle: 'italic', color: CRIMSON, lineHeight: 1, marginBottom: 6 }}>
          {typeof s.value === 'string' && /^\d+$/.test(s.value.replace('+','').replace('%','')) ? <CountUp to={parseInt(s.value)} suffix={s.value.includes('+') ? '+' : s.value.includes('%') ? '%' : ''} /> : s.value}
        </div>
        <div style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>{s.label}</div>
      </div>
    )
  }));

  return (
    <section style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', width: '100%', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
      <LogoLoop
        logos={statLogos}
        speed={80}
        direction="left"
        gap={0}
        pauseOnHover={false}
      />
    </section>
  );
}


/* ═══ CERTIFICATIONS ═════════════════════════════════════ */
function Certifications() {
  const certLogos = [
    { src: "/images/certs/fda.png", alt: "FDA", title: "FDA Certified" },
    { src: "/images/certs/fssc.png", alt: "FSSC", title: "FSSC 22000" },
    { src: "/images/certs/fssai-new.png", alt: "FSSAI", title: "FSSAI India" },
    { src: "/images/certs/new_certi.png", alt: "Certification", title: "Certification" },
    { src: "/images/certs/certii.png", alt: "Certification 2", title: "Certification" },
    { src: "/images/certs/certiii.png", alt: "Certification 3", title: "Certification" },
    { src: "/images/certs/new_certi_5.png", alt: "Certification 5", title: "Certification" },
    { src: "/images/certs/new_certi_6.png", alt: "Certification 6", title: "Certification" },
    { src: "/images/certs/new_certi_7.png", alt: "Certification 7", title: "Certification" },
    { src: "/images/certs/new_certi_8.png", alt: "Certification 8", title: "Certification" },
  ];

  return (
    <section id="section-certifications-inner" style={{ background: 'transparent', padding: `clamp(32px, 4vw, 60px) 0`, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, textAlign: 'center', marginBottom: 28 }}>
        <ChapterTag label="Accreditations" />
        <h2 data-gsap="split" suppressHydrationWarning style={{ fontFamily: SERIF, fontSize: 'clamp(26px, 3.8vw, 60px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#fff', margin: '28px 0 0' }}>
          Global Standards. Zero Compromise.
        </h2>
      </div>
      <div style={{ position: 'relative' }}>
        <LogoLoop
          logos={certLogos}
          speed={140}
          direction="left"
          logoHeight={140}
          gap={64}
          pauseOnHover={false}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#000000"
          ariaLabel="Certification Partners"
        />
      </div>
    </section>
  );
}

/* ═══ FINAL CTA ════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section style={{ padding: `clamp(80px, 10vw, 160px) ${PAGE_PAD} 0`, maxWidth: 1200, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      <ElectricBorder color="#AC033B" speed={1.2} chaos={0.1} borderRadius={32} thickness={2} style={{ width: '100%', borderRadius: '32px' }}>
        <div style={{ padding: 'clamp(48px,6vw,96px) clamp(32px,5vw,80px)', textAlign: 'center' }}>
          <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 28 }}>
            Ready to Begin
          </p>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 7vw, 120px)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.035em', color: '#fff', textTransform: 'uppercase', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            Source The<br />World&apos;s Best.
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 0 }}>
            <PrimaryBtn href="/catalog" label="Download Catalog" />
            <OutlineBtn href="/contact" label="Contact Our Team" />
          </div>
        </div>
      </ElectricBorder>
      <div style={{ height: 100 }} />
    </section>
  );
}

/* ═══ WHO WE ARE ══════════════════════════════════════════ */

/** Reusable canvas placeholder — swapped for real frame canvas when video is ready */
function CanvasPlaceholder({ label }: { label: string }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '16/10',
      borderRadius: 16,
      border: '1px dashed rgba(172,3,59,0.4)',
      background: 'linear-gradient(135deg, #0d0d0d 0%, #111 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 12, left: 12, width: 20, height: 20, borderTop: '2px solid #AC033B', borderLeft: '2px solid #AC033B' }} />
      <div style={{ position: 'absolute', top: 12, right: 12, width: 20, height: 20, borderTop: '2px solid #AC033B', borderRight: '2px solid #AC033B' }} />
      <div style={{ position: 'absolute', bottom: 12, left: 12, width: 20, height: 20, borderBottom: '2px solid #AC033B', borderLeft: '2px solid #AC033B' }} />
      <div style={{ position: 'absolute', bottom: 12, right: 12, width: 20, height: 20, borderBottom: '2px solid #AC033B', borderRight: '2px solid #AC033B' }} />
      {/* Play icon */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ opacity: 0.3 }}>
        <circle cx="20" cy="20" r="19" stroke="#AC033B" strokeWidth="1.5"/>
        <path d="M16 13L28 20L16 27V13Z" fill="#AC033B"/>
      </svg>
      <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(172,3,59,0.6)' }}>
        {label}
      </span>
    </div>
  );
}

function WhoWeAre() {
  const GOLD = '#D4A843';

  const subSections = [
    {
      id: 'chilli-farm',
      tag: '01',
      title: 'Chilli Farm',
      desc: 'Our sourcing journey begins at carefully selected chilli farms across Rajasthan, Andhra Pradesh, and Madhya Pradesh — where ideal climate and soil produce the finest grade produce.',
      mobileDesc: 'Our sourcing journey begins at carefully selected chilli farms across Rajasthan, Andhra Pradesh, and Madhya Pradesh — where ideal climate and soil produce the finest grade produce.',
      framesDir: 'raw', frameCount: 48,
      imageRight: true,
    },
    {
      id: 'spice-market',
      tag: '02',
      title: 'Spice Market',
      desc: 'We manage over 500+ acres of contracted, fully traceable, and strictly pesticide-free chilli farming to ensure the absolute highest standards of quality from the very root.',
      mobileDesc: '500+ acres of contracted, traceable, pesticide-free chilli farming.',
      framesDir: 'storing-spices', frameCount: 48,
      imageRight: false,
    },
    {
      id: 'sun-drying',
      tag: '03',
      title: 'Sun Drying —\nMix Spices',
      desc: 'Our traditional sun-drying methods are carefully monitored to naturally preserve the essential volatile oils, vibrant colour, deep aroma, and ideal moisture content of the spices.',
      mobileDesc: 'Traditional sun-drying preserves natural oils, colour, aroma and moisture.',
      framesDir: 'roasting', frameCount: 48,
      imageRight: true,
    },
  ];

  return (
    <section style={{ padding: 'clamp(16px,2vw,24px) 0' }}>
      {/* Section header */}
      <div className="section-header-wrapper" style={{ maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, marginBottom: 'clamp(40px,5vw,80px)' }}>
        <ChapterTag label="Our Story" />
        <h2 suppressHydrationWarning style={{
          fontFamily: SERIF,
          fontSize: 'clamp(40px,6vw,96px)',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          margin: '16px 0 24px',
        }}>
          Who We Are.
        </h2>
        <p style={{ fontFamily: SANS, fontSize: 'clamp(15px,1.2vw,18px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 540 }}>
          Founded in 1975 — five decades of farm-to-shelf mastery, serving 40+ countries across 5 continents. Every grain, every colour, every aroma — controlled from origin.
        </p>
      </div>

      {/* 3 sub-sections — each pins the full row */}
      {subSections.map((sub) => (
        <StickyProcessStep
          key={sub.id}
          num={sub.tag}
          title={sub.title}
          desc={sub.desc}
          mobileDesc={sub.mobileDesc}
          framesDir={sub.framesDir}
          frameCount={sub.frameCount}
          imageRight={sub.imageRight}
          scrollDistance={500}
        />
      ))}
    </section>
  );
}



/* WHAT WE DO */
function WhatWeDo() {
  const steps = [
    { num: '01', title: 'Raw Material\nProcurement', framesDir: 'raw', frameCount: 48,
      desc: 'Our sourcing journey begins at carefully selected chilli farms. Direct sourcing from 500+ certified farms ensuring complete backward integration and GPS traceability from farm to factory.',
      mobileDesc: 'Direct sourcing from 500+ certified farms with GPS traceability.' },
    { num: '02', title: 'Storage', framesDir: 'storing-spices', frameCount: 48,
      desc: 'Upon arrival, materials are stored in our state-of-the-art climate-controlled warehousing preventing moisture build-up, microbial growth, and cross-contamination prior to processing.',
      mobileDesc: 'Climate-controlled warehousing preventing moisture and cross-contamination.' },
    { num: '03', title: 'RM Inspection', framesDir: 'rm-inspection', frameCount: 48,
      desc: 'Every batch undergoes rigorous inbound testing for moisture levels, microbial load, aflatoxins, and pesticide residue to ensure absolute compliance with global standards.',
      mobileDesc: 'Rigorous testing for moisture, microbial load, and pesticide residue.' },
    { num: '04', title: 'Cleaning &\nSorting', framesDir: 'cleaning-sorting', frameCount: 72,
      desc: 'We utilize advanced Optical Sortex technology and multi-stage mechanical cleaning to meticulously remove any foreign matter, dust, and physically damaged units.',
      mobileDesc: 'Optical Sortex tech removes foreign matter and damaged units.' },
    { num: '05', title: 'Metal\nDetection', framesDir: 'metal-detection', frameCount: 48,
      desc: 'Our processing lines are equipped with ultra-sensitive industrial metal detectors ensuring zero ferrous, non-ferrous, or stainless steel contamination in the raw materials.',
      mobileDesc: 'Zero ferrous or stainless steel contamination via industrial detectors.' },
    { num: '06', title: 'Roasting', framesDir: 'roasting', frameCount: 48,
      desc: 'Spices are subjected to precision temperature-controlled roasting, unlocking their deep natural aroma while carefully maintaining optimal moisture levels for maximum shelf life.',
      mobileDesc: 'Temperature-controlled roasting unlocks aroma while maintaining moisture.' },
    { num: '07', title: 'Cryogenic\nGrinding', framesDir: 'cold-storage', frameCount: 72,
      desc: 'Advanced liquid nitrogen grinding processes at sub-zero temperatures preserve the highly volatile essential oils, natural colour, and delicate flavor profiles of the spices.',
      mobileDesc: 'Liquid nitrogen grinding preserves volatile oils and natural colour.' },
    { num: '08', title: 'Packaging\nLine', framesDir: 'dispatch', frameCount: 64,
      desc: 'Fully automated, contactless hygienic packaging systems rapidly pack the finished products into consumer pouches, retail jars, and bulk industrial bags.',
      mobileDesc: 'Automated hygienic packaging for pouches, jars, and bulk bags.' },
    { num: '09', title: 'Steam\nSterilization', framesDir: 'safety-quality', frameCount: 72,
      desc: 'Our FDA-compliant steam sterilization chamber achieves a guaranteed 5-log pathogen reduction without the use of harmful chemicals or irradiation.',
      mobileDesc: 'FDA-compliant chamber achieves 5-log pathogen reduction without chemicals.' },
    { num: '10', title: 'Quality\nAssurance', framesDir: 'quality-check', frameCount: 48,
      desc: 'Our NABL-accredited in-house FSSAI laboratory conducts comprehensive testing on 200+ physical, chemical, and microbiological parameters for every single batch.',
      mobileDesc: 'In-house FSSAI lab tests 200+ physical and chemical parameters.' },
    { num: '11', title: 'Shipment\nClearance & Dispatch', framesDir: 'dispatch', frameCount: 64,
      desc: 'We handle end-to-end export documentation, custom clearance, and strict pre-shipment inspections ensuring smooth global dispatch to over 40 countries.',
      mobileDesc: 'End-to-end export documentation and pre-shipment inspection before dispatch.' },
  ];

  return (
    <section style={{ padding: 'clamp(16px,2vw,24px) 0' }}>
      {/* Section header */}
      <div className="section-header-wrapper" style={{ maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, marginBottom: 'clamp(40px,5vw,80px)' }}>
        <ChapterTag label="Our Process" />
        <div className="header-flex-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <h2 suppressHydrationWarning style={{
            fontFamily: SERIF,
            fontSize: 'clamp(40px,6vw,96px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            margin: '16px 0 0',
          }}>
            What We Do.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, maxWidth: 360, margin: '0 0 8px', paddingBottom: 8 }}>
            Eleven precision steps — from raw material to global shelf. Every step controlled, certified and traceable.
          </p>
        </div>
      </div>
      {/* 11 steps — each pins full row */}
      {steps.map((step, i) => (
        <StickyProcessStep
          key={step.num}
          num={step.num}
          title={step.title}
          desc={step.desc}
          mobileDesc={step.mobileDesc}
          framesDir={step.framesDir}
          frameCount={step.frameCount}
          imageRight={i % 2 === 0}
          scrollDistance={500}
        />
      ))}
    </section>
  );
}


/* RESOURCES */
function Resources() {
  const steps = [
    { num: '01', title: 'Inhouse Lab', framesDir: 'inhouse-lab', frameCount: 72,
      desc: 'Our advanced NABL-accredited testing laboratory is equipped to analyze over 200+ quality parameters for every production batch, ensuring zero defects.',
      mobileDesc: 'NABL-accredited testing lab with 200+ parameters for every batch.' },
    { num: '02', title: 'Cold Storage', framesDir: 'cold-storage', frameCount: 72,
      desc: 'Our massive temperature-controlled cold chain infrastructure preserves highly volatile essential oils, active compounds, and natural color over extended storage periods.',
      mobileDesc: 'Temperature-controlled cold chain preserves volatile oils and active compounds.' },
    { num: '03', title: 'Product R&D', framesDir: 'product-rd', frameCount: 72,
      desc: 'Our dedicated food scientists are continuously developing innovative new spice blends, seasonings, and functional formulations tailored for diverse global markets.',
      mobileDesc: 'Developing new spice blends and functional formulations for global markets.' },
    { num: '04', title: 'Private Label', framesDir: 'private-label', frameCount: 64,
      desc: 'We offer comprehensive end-to-end private branding, custom recipe formulations, and flexible co-packing solutions for major global retailers and food brands.',
      mobileDesc: 'Full branding, custom formulations and co-packing for global retailers.' },
    { num: '05', title: 'Customized\nSolution', framesDir: 'customised', frameCount: 64,
      desc: 'From bespoke spice blends and specific particle sizes to unique packaging requirements, our solutions are meticulously tailored to your exact needs.',
      mobileDesc: 'Bespoke blends, particle sizes, and packaging tailored to your needs.' },
    { num: '06', title: 'Safety & Quality\nPractices', framesDir: 'safety-quality', frameCount: 72,
      desc: 'We maintain an FDA and EU certified zero-tolerance policy on contamination, featuring complete farm-to-shelf traceability for absolute consumer safety.',
      mobileDesc: 'FDA/EU certified zero-tolerance policy with full farm-to-shelf traceability.' },
    { num: '07', title: 'Annual Export\nSpice Stock', framesDir: 'annual-export', frameCount: 64,
      desc: 'With a robust inventory managing over 500+ containers annually, we ensure a highly consistent and uninterrupted supply chain across 40+ countries.',
      mobileDesc: '500+ containers annually ensuring consistent supply across 40+ countries.' },
    { num: '08', title: 'Agent Network', framesDir: 'agent-network', frameCount: 72,
      desc: 'Our highly active and expansive global distributor network ensures rapid last-mile delivery and strict adherence to local regulatory compliance.',
      mobileDesc: 'Active distributor network ensuring last-mile delivery and regulatory compliance.' },
    { num: '09', title: 'Professional\nTeam', framesDir: 'professional-team', frameCount: 72,
      desc: 'A dedicated team of 200+ experienced food scientists, agronomists, and supply chain engineers actively manage every aspect of our operations.',
      mobileDesc: '200+ food scientists, agronomists, and engineers managing the supply chain.' },
    { num: '10', title: 'Market Insights', framesDir: 'market-insights', frameCount: 72,
      desc: 'We leverage real-time pricing intelligence, geopolitical crop trend analysis, and deep market insights to optimize our strategic sourcing decisions.',
      mobileDesc: 'Real-time pricing intelligence and global crop trend analysis for sourcing.' },
  ];

  return (
    <section style={{ padding: 'clamp(16px,2vw,24px) 0' }}>
      {/* Section header */}
      <div className="section-header-wrapper" style={{ maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, marginBottom: 'clamp(40px,5vw,80px)' }}>
        <ChapterTag label="Our Infrastructure" />
        <div className="header-flex-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <h2 suppressHydrationWarning style={{
            fontFamily: SERIF,
            fontSize: 'clamp(40px,6vw,96px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            margin: '16px 0 0',
          }}>
            Resources.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, maxWidth: 360, margin: '0 0 8px' }}>
            The infrastructure, expertise and systems that make LV Spices a trusted global supplier.
          </p>
        </div>
      </div>

      {/* 10 resource steps — each pins full row */}
      {steps.map((step, i) => (
        <StickyProcessStep
          key={step.num}
          num={step.num}
          title={step.title}
          desc={step.desc}
          mobileDesc={step.mobileDesc}
          framesDir={step.framesDir}
          frameCount={step.frameCount}
          imageRight={i % 2 === 0}
          scrollDistance={500}
        />
      ))}
    </section>
  );
}
/* SHARED COMPONENTS */

function ChapterTag({ number, label }: { number?: string; label: string }) {
  return (
    <div className="chapter-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
      {number && <span style={{ fontFamily: SERIF, fontSize: 'clamp(24px, 3vw, 48px)', fontWeight: 700, fontStyle: 'italic', color: CRIMSON, lineHeight: 1 }}>{number}</span>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ height: 1, width: 24, background: CRIMSON }} />
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{label}</span>
      </div>
    </div>
  );
}

function TextLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON, textDecoration: 'none' }}>
      {label}
      <span style={{ display: 'block', height: 1, width: 44, background: CRIMSON }} />
    </Link>
  );
}

function PrimaryBtn({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: CRIMSON, color: '#fff',
      padding: 'clamp(12px, 1.5vw, 18px) clamp(20px, 2.5vw, 36px)',
      fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em',
      textTransform: 'uppercase', textDecoration: 'none',
    }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    >
      {label}
    </Link>
  );
}

function OutlineBtn({ href, label, dark = false }: { href: string; label: string; dark?: boolean }) {
  return (
    <Link href={href} style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      background: 'transparent', color: '#fff',
      border: `1px solid rgba(255,255,255,0.25)`,
      padding: 'clamp(12px, 1.5vw, 18px) clamp(20px, 2.5vw, 36px)',
      fontFamily: MONO, fontSize: 11, letterSpacing: '0.18em',
      textTransform: 'uppercase', textDecoration: 'none',
    }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    >
      {label}
    </Link>
  );
}

function ProductCard({ slug, name, shortDesc }: { slug: string; name: string; shortDesc: string }) {
  return (
    <Link href={`/products/${slug}`}
      style={{ display: 'block', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', padding: 'clamp(20px, 2.5vw, 36px) clamp(16px, 2vw, 28px)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.07)', borderBottom: '3px solid transparent', transition: 'border-color 0.25s, background 0.25s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = CRIMSON; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'; }}
    >
      <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', color: CRIMSON, textTransform: 'uppercase', marginBottom: 10 }}>Explore →</p>
      <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 8 }}>{name}</h3>
      <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>{shortDesc}</p>
    </Link>
  );
}
