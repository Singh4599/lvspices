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

// Cloudflare R2 CDN base URL — change via NEXT_PUBLIC_R2_BASE env var in Vercel
const R2_BASE = process.env.NEXT_PUBLIC_R2_BASE ?? '';


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
      <section id="section-products" style={{ padding: 'clamp(16px,2vw,32px) 0 clamp(60px,8vw,80px)', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, marginBottom: '16px', textAlign: 'center', overflow: 'hidden' }}>
          <ScrollReveal delay={0} from={60}>
            <h2 data-gsap="split" suppressHydrationWarning style={{ fontFamily: SERIF, fontSize: 'clamp(28px,6vw,96px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#111', margin: '16px 0 12px' }}>
              Every spice. Every format.
            </h2>
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
      <section id="section-dome" style={{ padding: 'clamp(24px,4vw,40px) 0 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <ScrollReveal delay={0} from={40}>
            <h2 data-gsap="split" suppressHydrationWarning style={{ fontFamily: SERIF, fontSize: 'clamp(36px,5vw,72px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '16px 0 0' }}>
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

    const isMobile = () => window.innerWidth <= 768;

    const images: HTMLImageElement[] = new Array(TOTAL);
    const frameObj = { value: 0 };
    let rafId: number | null = null;
    let pendingIdx = 0;
    let currentDir = isMobile() ? 'hero-mobile' : 'hero';

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

    const loadFrames = (dir: string) => {
      const loadBatch = (start: number, end: number) => {
        for (let i = start; i < end && i < TOTAL; i++) {
          const img = new window.Image();
          images[i] = img;
          img.src = `${R2_BASE}/frames/${dir}/frame_${String(i + 1).padStart(4, '0')}.webp`;
          img.decoding = 'async';
          img.decode().then(() => { if (i === 0) { resize(); drawFrame(img); } }).catch(() => {});
        }
        if (end < TOTAL) setTimeout(() => loadBatch(end, end + 20), 16);
      };
      loadBatch(0, 20);
    };

    const resize = () => {
      const mobile = isMobile();
      const dpr = mobile ? 1 : Math.min(window.devicePixelRatio, 1.5);
      const rect = section.getBoundingClientRect();
      const w = rect.width  || window.innerWidth;
      const h = rect.height || window.innerHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      const newDir = mobile ? 'hero-mobile' : 'hero';
      if (newDir !== currentDir) { currentDir = newDir; loadFrames(currentDir); }
      const img = images[Math.round(frameObj.value)];
      if (img?.complete && img?.naturalWidth) drawFrame(img);
    };

    resize();
    window.addEventListener('resize', resize);
    loadFrames(currentDir);

    const tween = gsap.to(frameObj, {
      value: TOTAL - 1,
      ease: 'none',
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
    <div style={{ background: 'transparent', padding: 'clamp(16px, 3vw, 32px) 0', overflow: 'hidden' }}>
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
        <div style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>{s.label}</div>
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
        <h2 data-gsap="split" suppressHydrationWarning style={{ fontFamily: SERIF, fontSize: 'clamp(26px, 3.8vw, 60px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#111', margin: '28px 0 0' }}>
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
          fadeOutColor="#ffffff"
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
  return (
    <section style={{ padding: 'clamp(40px,5vw,80px) 0', background: 'transparent' }}>
      <div style={{ 
        maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, 
        display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' 
      }}>
        
        {/* Left Side: Headings & Content */}
        <div style={{ flex: 1, minWidth: 'min(100%, 400px)' }}>
          <h2 suppressHydrationWarning style={{
            fontFamily: SERIF,
            fontSize: 'clamp(40px,6vw,84px)',
            fontWeight: 700,
            color: '#111',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            margin: '16px 0 0',
            whiteSpace: 'nowrap'
          }}>
            Who We Are.
          </h2>
          <div suppressHydrationWarning style={{
            fontFamily: SANS,
            fontSize: 'clamp(14px,1.5vw,18px)',
            fontWeight: 400,
            color: '#AC033B',
            marginTop: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '32px'
          }}>
            Farm to Factory
          </div>
        </div>

        {/* Right Side: Direct video */}
        <div style={{ flex: 1, minWidth: 'min(100%, 400px)', position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9' }}>
          <video
            src="/videos/whoweare.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

      </div>
    </section>
  );
}



/* WHAT WE DO */
function VideoStep({
  num,
  title,
  video,
  imageRight,
}: {
  num: string;
  title: string;
  video: string;
  imageRight: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: imageRight ? 'row-reverse' : 'row',
        gap: 'clamp(32px, 5vw, 64px)',
        alignItems: 'center',
        maxWidth: 1400, margin: '0 auto 10vh', padding: `clamp(60px, 8vw, 120px) ${PAGE_PAD}`,
        flexWrap: 'wrap'
      }}
    >
      <div style={{ flex: 0.8, minWidth: 'min(100%, 300px)' }}>
        <div style={{ fontFamily: SERIF, fontSize: 'clamp(48px, 6vw, 80px)', fontStyle: 'italic', color: CRIMSON, lineHeight: 1, marginBottom: 16 }}>{num}</div>
        <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#111', whiteSpace: 'pre-line', marginBottom: 24, lineHeight: 1.1 }}>{title}</h3>
      </div>
      <div style={{ flex: 1.6, minWidth: 'min(100%, 400px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '105%', aspectRatio: '16/9' }}>
          {/* Soft fog shadow */}
          <div style={{
            position: 'absolute',
            top: '-25%', left: '-25%', width: '150%', height: '150%',
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0) 60%)',
            filter: 'blur(40px)',
            zIndex: 0,
            pointerEvents: 'none'
          }} />
          {/* Direct video — autoplay, muted, loop */}
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', zIndex: 1,
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 72%)',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 72%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}

function WhatWeDo() {
  const steps = [
    { num: '01', title: 'Raw Material\nProcurement', video: '/videos/raw.mp4' },
    { num: '02', title: 'Storage',                   video: '/videos/storing-spices.mp4' },
    { num: '03', title: 'RM Inspection',              video: '/videos/rm-inspection.mp4' },
    { num: '04', title: 'Cleaning &\nSorting',        video: '/videos/cleaning-sorting.mp4' },
    { num: '05', title: 'Metal\nDetection',           video: '/videos/metal-detection.mp4' },
    { num: '06', title: 'Roasting',                   video: '/videos/roasting.mp4' },
    { num: '07', title: 'Cryogenic\nGrinding',        video: '/videos/cryogenic-grinding-new.mp4' },
    { num: '08', title: 'Packaging\nLine',            video: '/videos/process.mp4' },
    { num: '09', title: 'Steam\nSterilization',       video: '/videos/steam-sterilization.mp4' },
    { num: '10', title: 'Quality\nAssurance',         video: '/videos/quality-check.mp4' },
    { num: '11', title: 'Shipment\nClearance & Dispatch', video: '/videos/dispatch.mp4' },
  ];

  return (
    <section style={{ padding: 'clamp(16px,2vw,24px) 0' }}>
      {/* Section header */}
      <div className="section-header-wrapper" style={{ maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, marginBottom: 'clamp(20px,3vw,40px)' }}>
        <div className="header-flex-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <h2 suppressHydrationWarning style={{
            fontFamily: SERIF,
            fontSize: 'clamp(40px,6vw,96px)',
            fontWeight: 700,
            color: '#111',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            margin: '16px 0 0',
          }}>
            What We Do.
          </h2>
        </div>
      </div>

      {steps.map((step, i) => (
        <VideoStep
          key={step.num}
          num={step.num}
          title={step.title}
          video={step.video}
          imageRight={i % 2 !== 0}
        />
      ))}
    </section>
  );
}


/* RESOURCES */
function Resources() {
  const resourceSteps = [
    { num: '01', title: 'Inhouse Lab',                   video: '/videos/inhouse-lab.mp4' },
    { num: '02', title: 'Cold Storage',                  video: '/videos/cold-storage.mp4' },
    { num: '03', title: 'Product R&D',                   video: '/videos/product-rd.mp4' },
    { num: '04', title: 'Private Label',                 video: '/videos/private-label.mp4' },
    { num: '05', title: 'Customized\nSolution',          video: '/videos/customised.mp4' },
    { num: '06', title: 'Safety & Quality\nPractices',   video: '/videos/safety-quality.mp4' },
    { num: '07', title: 'Annual Export\nSpice Stock',    video: '/videos/annual-export.mp4' },
    { num: '08', title: 'Agent Network',                 video: '/videos/agent-network.mp4' },
    { num: '09', title: 'Professional\nTeam',            video: '/videos/professional-team.mp4' },
    { num: '10', title: 'Market Insights',               video: '/videos/market-insights.mp4' },
  ];

  return (
    <section style={{ padding: 'clamp(40px,5vw,80px) 0' }}>
      {/* Header: single column, no video */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, marginBottom: 'clamp(40px, 6vw, 80px)' }}>
        <h2 suppressHydrationWarning style={{
          fontFamily: SERIF,
          fontSize: 'clamp(40px,6vw,96px)',
          fontWeight: 700,
          color: '#111',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          margin: '16px 0 0',
        }}>
          Why Choose Us.
        </h2>
      </div>

      {resourceSteps.map((step, i) => (
        <VideoStep
          key={step.num}
          num={step.num}
          title={step.title}
          video={step.video}
          imageRight={i % 2 !== 0}
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
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', fontWeight: 600 }}>{label}</span>
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
      background: 'transparent', color: '#111',
      border: `1px solid rgba(0,0,0,0.25)`,
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
      <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: 700, color: '#111', lineHeight: 1.2, marginBottom: 8 }}>{name}</h3>
      <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: 1.55 }}>{shortDesc}</p>
    </Link>
  );
}

function StaticProcessStep({
  num,
  title,
  desc,
  label,
  imageRight,
}: {
  num?: string;
  title: string;
  desc: string;
  label: string;
  imageRight: boolean;
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: imageRight ? 'row-reverse' : 'row',
      gap: 'clamp(32px, 5vw, 64px)',
      alignItems: 'center',
      maxWidth: 1400, margin: '0 auto', padding: `clamp(40px, 6vw, 80px) ${PAGE_PAD}`,
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      flexWrap: 'wrap'
    }}>
      <div style={{ flex: 1, minWidth: 'min(100%, 300px)' }}>
        {num && <div style={{ fontFamily: SERIF, fontSize: 'clamp(48px, 6vw, 80px)', fontStyle: 'italic', color: CRIMSON, lineHeight: 1, marginBottom: 16 }}>{num}</div>}
        <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#111', whiteSpace: 'pre-line', marginBottom: 24, lineHeight: 1.1 }}>{title}</h3>
        <p style={{ fontFamily: SANS, fontSize: 'clamp(15px, 1.2vw, 18px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.7 }}>{desc}</p>
      </div>
      <div style={{ flex: 1, minWidth: 'min(100%, 300px)', width: '100%' }}>
        <CanvasPlaceholder label={label} />
      </div>
    </div>
  );
}
