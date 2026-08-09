'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import LogoLoop from '@/components/ui/LogoLoop';
import CountUp from '@/components/animation/CountUp';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ElectricBorder from '@/components/animation/ElectricBorder';
import CircularGallery from '@/components/animation/CircularGallery';
import { ShuffleGrid } from '@/components/ui/ShuffleGrid';
import dynamic from 'next/dynamic';
import FloatingSpiceObject from '@/components/animation/FloatingSpiceObject';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';

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
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

function useInView(options = { rootMargin: '400px' }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.rootMargin]);

  return { ref, inView };
}

// Cloudflare R2 CDN base URL — change via NEXT_PUBLIC_R2_BASE env var in Vercel
const R2_BASE = process.env.NEXT_PUBLIC_R2_BASE ?? '';


// Responsive helpers via inline styles — works without CSS class dependency
const PAGE_PAD = 'clamp(20px, 5vw, 64px)';


export default function HomePage() {
  return (
    <main style={{ background: 'transparent', overflowX: 'clip' }}>
      {/* <FloatingSpiceObject /> */}
      <div id="hero-section"><Hero /></div>
      <div id="after-hero">
        <Divider />
      </div>
      <div id="who-we-are-section"><WhoWeAre /></div>
      <Divider />
      {/* PRODUCT GALLERY */}
      <section id="section-products" style={{ padding: 'clamp(16px,2vw,32px) 0 clamp(60px,8vw,80px)', overflow: 'hidden', scrollMarginTop: '80px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, marginBottom: '16px', textAlign: 'center', overflow: 'visible' }}>
          <ScrollReveal delay={0} fromY={60}>
            <h2 suppressHydrationWarning style={{ fontFamily: SERIF, fontSize: 'clamp(28px,6vw,96px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#111', margin: '16px 0 12px' }}>
              Every spice. Every format. Every market.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.5)', maxWidth: 560, margin: '0 auto 12px', lineHeight: 1.7 }}>
              India&apos;s trusted spice manufacturer, supplier &amp; exporter — serving bulk buyers, OEM clients, private label brands, and custom blend requirements across 40+ countries.
            </p>
          </ScrollReveal>
        </div>
        <div style={{ height: 'clamp(340px, 55vw, 680px)', position: 'relative' }}>
          <CircularGallery
            bend={2}
            textColor="#111111"
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
      {/* CURVED LOOP BREAK */}
      <div style={{ position: 'relative', background: '#fff', paddingBottom: 'clamp(40px, 6vw, 80px)', paddingTop: 'clamp(40px, 6vw, 80px)' }}>
        <CurvedLoop 
          marqueeText="PREMIUM EXPORT QUALITY • FARM FRESH • QUALITY GUARANTEED • "
          speed={1.5}
          curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
           <text style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
           <text style={{ fontSize: 'clamp(9px, 1vw, 14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>
      {/* RESOURCES */}
      <div id="section-resources"><Resources /></div>
      <Divider />
      {/* DOME GALLERY */}
      <section id="section-dome" style={{ padding: 'clamp(24px,4vw,40px) 0 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <ScrollReveal delay={0} fromY={40}>
            <h2 suppressHydrationWarning style={{ fontFamily: SERIF, fontSize: 'clamp(36px,5vw,72px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '16px 0 0' }}>
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

/* ═══ HERO ═══════════════════════════════════════════════
   Canvas video scrubbing — GSAP on all devices.
   Mobile optimisations:
   • RAF-gated seekTo (one seek per animation frame max)
   • Smaller scroll distance on mobile (less distance = less work)
   • RVFC loop ONLY when actively seeking (not spinning idle)
   • Lower minimum seek delta on mobile (skip tiny moves)
   ════════════════════════════════════════════════════════ */
function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video   = videoRef.current!;
    const canvas  = canvasRef.current!;
    const section = sectionRef.current!;
    if (!video || !canvas || !section) return;

    const isMob = window.innerWidth <= 768;

    video.src = isMob ? '/videos/hero-mobile-v3.mp4' : '/videos/hero-desktop-v4.mp4';
    video.load();

    // Use willReadFrequently: false — we're only writing, never reading pixels
    const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false })!;

    const resize = () => {
      // Use section's actual rendered size — NOT window.innerWidth/Height.
      // On iOS Safari, window.innerHeight ≠ 100svh (address bar offset),
      // causing the canvas buffer to mismatch the CSS size → top/bottom black bars.
      canvas.width  = section.clientWidth  || window.innerWidth;
      canvas.height = section.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawFrame = () => {
      if (!video.videoWidth) return;
      const hR = canvas.width  / video.videoWidth;
      const vR = canvas.height / video.videoHeight;
      const r  = Math.max(hR, vR);
      const cx = (canvas.width  - video.videoWidth  * r) / 2;
      const cy = (canvas.height - video.videoHeight * r) / 2;
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
                    cx, cy, video.videoWidth * r, video.videoHeight * r);
    };

    let destroyed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyVid = video as any;
    const hasRVFC: boolean = typeof anyVid.requestVideoFrameCallback === 'function';

    // ── RVFC: draw exactly once per decoded frame ──
    // We only register a callback when a seek has been issued, not in a permanent loop.
    // This avoids burning GPU every vsync when the user isn't scrolling.
    let pendingDraw = false;
    const requestDraw = () => {
      if (pendingDraw) return;
      pendingDraw = true;
      if (hasRVFC) {
        anyVid.requestVideoFrameCallback(() => { drawFrame(); pendingDraw = false; });
      } else {
        // fallback: draw on seeked event (registered below)
        pendingDraw = false;
      }
    };

    const onSeeked = () => { drawFrame(); pendingDraw = false; };
    if (!hasRVFC) video.addEventListener('seeked', onSeeked);

    // ── RAF-gated seek: at most ONE seek per animation frame ──
    let rafPending = false;
    let pendingSeekT = -1;
    let lastSeekT    = -1;
    // Larger delta on mobile = skip micro-movements = far fewer seeks
    const MIN_DELTA = isMob ? 0.1 : 0.033; // ~3fps mobile gate vs ~30fps desktop gate

    const seekTo = (t: number) => {
      pendingSeekT = t;
      if (rafPending) return;           // already have a frame queued, just update target
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const target = pendingSeekT;
        if (Math.abs(target - lastSeekT) < MIN_DELTA) return; // delta too small, skip
        lastSeekT = target;
        if (typeof anyVid.fastSeek === 'function') anyVid.fastSeek(target);
        else video.currentTime = target;
        requestDraw(); // ask for one frame draw after seek
      });
    };

    // Mobile gets shorter scroll so the video completes sooner and CPU pressure is lower
    const SCROLL_DISTANCE = isMob ? 1500 : 3000;

    let scrollTriggerInstance: ReturnType<typeof ScrollTrigger.create> | null = null;
    let duration = 0;
    let setupDone = false;

    const setupScroll = () => {
      if (setupDone) return;
      setupDone = true;
      duration = video.duration || 10;
      setReady(true);
      drawFrame();

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start:  'top top',
        end:    `+=${SCROLL_DISTANCE}`,
        pin:    true,
        anticipatePin: 1,
        onUpdate(self) {
          const t = self.progress * (duration - 0.05);
          seekTo(t); // RAF-gated, won't flood the CPU
        },
      });
    };

    video.addEventListener('canplaythrough', setupScroll, { once: true });
    video.addEventListener('loadeddata', () => setTimeout(setupScroll, 300), { once: true });
    video.addEventListener('loadedmetadata', () => { resize(); drawFrame(); });

    return () => {
      destroyed = true;
      window.removeEventListener('resize', resize);
      if (!hasRVFC) video.removeEventListener('seeked', onSeeked);
      scrollTriggerInstance?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden', background: '#000' }}
    >
      {!ready && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={typeof window !== 'undefined' && window.innerWidth <= 768
              ? '/videos/hero-mobile-poster.webp'
              : '/videos/hero-desktop-poster.webp'}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
          />
          <div style={{
            position: 'relative', zIndex: 1,
            width: 32, height: 32, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.1)',
            borderTopColor: '#AC033B',
            animation: 'spin 0.7s linear infinite',
          }} />
        </div>
      )}
      <video ref={videoRef} playsInline muted preload="auto" style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </section>
  );
}





/* ═══ TICKER ═════════════════════════════════════════════ */
function TickerBar() {
  return (
    <div style={{ background: '#fafafa', padding: 'clamp(16px, 3vw, 32px) 0', overflow: 'hidden' }}>
      <VelocityMarquee dark={false} />
    </div>
  );
}

/* ═══ STATS ══════════════════════════════════════════════ */
function Stats() {
  const stats = [
    { value: '50+', label: 'Years of Spice Excellence' },
    { value: '500+', label: 'Product SKUs' },
    { value: '40+', label: 'Countries Exported To' },
    { value: '500+', label: 'Containers / Year' },
    { value: '100%', label: 'Batch Traceability' },
    { value: 'Zero', label: 'Compromise on Quality' },
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
  const { ref: videoRef, inView } = useInView();
  return (
    <section style={{ padding: 'clamp(40px,5vw,160px) 0', background: 'transparent', overflowX: 'clip' }}>
      <div style={{ 
        maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, 
        display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' 
      }}>
        
        {/* Left Side: Headings & Content */}
        <div style={{ flex: 1, minWidth: 'min(100%, 280px)' }}>
          <h2 suppressHydrationWarning style={{
            fontFamily: SERIF,
            fontSize: 'clamp(48px, 7vw, 120px)',
            fontWeight: 700,
            color: '#111',
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            margin: '0 0 20px',
          }}>
            Who <span className="heading-accent" style={{ fontStyle: 'italic', color: CRIMSON }}>We</span> Are.
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '32px' }}>
            <div style={{ width: 32, height: 1.5, background: CRIMSON }} />
            <p style={{
              fontFamily: MONO,
              fontSize: 'clamp(10px, 1.2vw, 13px)',
              color: 'rgba(0,0,0,0.45)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              margin: 0,
              fontWeight: 700
            }}>
              Certified Spice Manufacturer &amp; Exporter — India
            </p>
          </div>
        </div>

        {/* Right Side: Direct video with fog effect */}
        <div style={{ flex: 1.6, minWidth: 'min(100%, 300px)' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
            {/* Soft fog shadow — desktop only */}
            <div className="whoweare-fog" style={{
              position: 'absolute',
              top: '-25%', left: '-25%', width: '150%', height: '150%',
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0) 60%)',
              filter: 'blur(40px)',
              zIndex: 0,
              pointerEvents: 'none'
            }} />
            <video
              ref={videoRef}
              src={inView ? "/videos/whoweare.mp4" : undefined}
              poster="/videos/whoweare.webp"
              autoPlay
              muted
              loop
              playsInline
              className="whoweare-video"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', zIndex: 1,
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}



/* WHAT WE DO — Scroll Stack */
function StackedVideoStep({
  num, title, video, imageRight, index, isLast,
}: {
  num: string; title: string; video: string;
  imageRight: boolean; index: number; isLast: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: videoRef, inView } = useInView();

  useEffect(() => {
    const card = cardRef.current;
    if (!card || isLast) return;

    // Force card onto its own GPU compositing layer to avoid repaints
    gsap.set(card, { z: 0 });

    const st = ScrollTrigger.create({
      trigger: card,
      start: 'top top+=90',
      end: 'bottom top+=90',
      scrub: 0.5, // smooth scrub, no jerk
      onUpdate: (self) => {
        // Only scale — never use filter here (filter breaks GPU compositing)
        gsap.set(card, { scale: 1 - self.progress * 0.04 });
      },
      onLeave: () => {
        gsap.set(card, { scale: 0.96 });
      },
      onEnterBack: () => {
        gsap.set(card, { scale: 1 });
      },
    });
    return () => st.kill();
  }, [isLast]);

  return (
    <div
      ref={cardRef}
      className="stacked-card"
      style={{
        position: 'sticky',
        top: 80,
        zIndex: index + 10,
        background: '#ffffff',
        borderRadius: 28,
        transformOrigin: 'top center',
        marginBottom: 16,
        marginLeft: 'clamp(8px, 1.5vw, 24px)',
        marginRight: 'clamp(8px, 1.5vw, 24px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        willChange: 'transform',
      }}
    >
      <div
        data-image-right={imageRight ? 'true' : 'false'}
        className="stacked-card-inner"
        style={{
          display: 'flex',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
          maxWidth: 1400, margin: '0 auto',
          padding: `clamp(40px, 6vw, 80px) clamp(32px, 5vw, 64px)`,
          flexWrap: 'wrap',
        }}
      >
        <div className="stacked-card-text" style={{ flex: 1 }}>
          <div className="stacked-card-num" style={{ fontFamily: SERIF, fontSize: 'clamp(48px, 6vw, 80px)', fontStyle: 'italic', color: CRIMSON, lineHeight: 1, marginBottom: 16 }}>{num}</div>
          <h3 className="stacked-card-title" style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 700, color: '#111', whiteSpace: 'pre-line', marginBottom: 24, lineHeight: 1.05, letterSpacing: '-0.03em' }}>{title}</h3>
        </div>
        <div className="stacked-card-video" style={{ flex: 1.6 }}>
          <div className="card-video-wrapper" style={{ position: 'relative', width: '100%' }}>
            <div
              className="card-fog"
              style={{
                position: 'absolute',
                top: '-25%', left: '-25%', width: '150%', height: '150%',
                background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0) 60%)',
                filter: 'blur(40px)',
                zIndex: 0, pointerEvents: 'none'
              }}
            />
            <video
              ref={videoRef}
              src={inView ? video : undefined}
              poster={video.replace('.mp4', '.webp')}
              autoPlay muted loop playsInline
              className="card-video"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', zIndex: 1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Keep VideoStep for Resources section (no stacking there) */
function VideoStep({
  num, title, video, imageRight,
}: {
  num: string; title: string; video: string; imageRight: boolean;
}) {
  const { ref: videoRef, inView } = useInView();
  return (
    <div style={{
      display: 'flex',
      flexDirection: imageRight ? 'row-reverse' : 'row',
      gap: 'clamp(32px, 5vw, 64px)',
      alignItems: 'center',
      maxWidth: 1400, margin: '0 auto 10vh', padding: `clamp(60px, 8vw, 120px) ${PAGE_PAD}`,
      flexWrap: 'wrap'
    }}>
      <div style={{ flex: 0.8, minWidth: 'min(100%, 300px)' }}>
        <div style={{ fontFamily: SERIF, fontSize: 'clamp(48px, 6vw, 80px)', fontStyle: 'italic', color: CRIMSON, lineHeight: 1, marginBottom: 16 }}>{num}</div>
        <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#111', whiteSpace: 'pre-line', marginBottom: 24, lineHeight: 1.1 }}>{title}</h3>
      </div>
      <div style={{ flex: 1.6, minWidth: 'min(100%, 400px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '105%', aspectRatio: '16/9' }}>
          <div style={{
            position: 'absolute',
            top: '-25%', left: '-25%', width: '150%', height: '150%',
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0) 60%)',
            filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none'
          }} />
          <video 
            ref={videoRef}
            src={inView ? video : undefined}
            poster={video.replace('.mp4', '.webp')}
            autoPlay muted loop playsInline
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
    { num: '01', title: 'Raw Material\nProcurement', video: '/videos/raw-material-new.mp4' },
    { num: '02', title: 'Storage',                   video: '/videos/storage-new.mp4' },
    { num: '03', title: 'RM Inspection',              video: '/videos/inspection-new.mp4' },
    { num: '04', title: 'Cleaning &\nSorting',        video: '/videos/cleaning-sorting.mp4' },
    { num: '05', title: 'Metal\nDetection',           video: '/videos/metal-detction-new.mp4' },
    { num: '06', title: 'Roasting',                   video: '/videos/roasting.mp4' },
    { num: '07', title: 'Cryogenic\nGrinding',        video: '/videos/cryogenic-grinding-new.mp4' },
    { num: '08', title: 'Packaging\nLine',            video: '/videos/process.mp4' },
    { num: '09', title: 'Steam\nSterilization',       video: '/videos/steam-sterilization.mp4' },
    { num: '10', title: 'Quality\nAssurance',         video: '/videos/quality-check-new2.mp4' },
    { num: '11', title: 'Shipment\nClearance & Dispatch', video: '/videos/dispatch.mp4' },
  ];

  return (
    <section style={{ padding: 'clamp(60px,8vw,120px) 0 clamp(80px,10vw,160px)' }}>
      {/* Section header */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, marginBottom: 'clamp(32px, 4vw, 64px)', position: 'relative', zIndex: 200 }}>
        <h2 suppressHydrationWarning style={{
          fontFamily: SERIF,
          fontSize: 'clamp(48px, 7vw, 120px)',
          fontWeight: 700,
          color: '#111',
          lineHeight: 1.0,
          letterSpacing: '-0.04em',
          margin: '0 0 20px',
        }}>
          What <span className="heading-accent" style={{ fontStyle: 'italic', color: CRIMSON }}>We</span> Do.
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 1.5, background: CRIMSON }} />
          <p style={{
            fontFamily: MONO,
            fontSize: 'clamp(10px, 1.2vw, 13px)',
            color: 'rgba(0,0,0,0.45)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: 0,
          }}>Farm to Factory &mdash; 11 Steps of Excellence</p>
        </div>
      </div>

      {/* Stacking cards container */}
      <div style={{ position: 'relative' }}>
        {steps.map((step, i) => (
          <StackedVideoStep
            key={step.num}
            num={step.num}
            title={step.title}
            video={step.video}
            imageRight={i % 2 !== 0}
            index={i}
            isLast={i === steps.length - 1}
          />
        ))}
      </div>
    </section>
  );
}



/* RESOURCES */
function Resources() {
  const resourceSteps = [
    { num: '01', title: 'Inhouse Lab',                   video: '/videos/in-house-and-rd.mp4' },
    { num: '02', title: 'Cold Storage',                  video: '/videos/raw-material-storage.mp4' },
    { num: '03', title: 'Product R&D',                   video: '/videos/product-rd.mp4' },
    { num: '04', title: 'Private Label',                 video: '/videos/private-lable.mp4' },
    { num: '05', title: 'Customized\nSolution',          video: '/videos/customised.mp4' },
    { num: '06', title: 'Safety & Quality\nPractices',   video: '/videos/safety-quality.mp4' },
    { num: '07', title: 'Annual Export\nSpice Stock',    video: '/videos/annual-export.mp4' },
    { num: '08', title: 'Agent Network',                 video: '/videos/agent-network.mp4' },
    { num: '09', title: 'Professional\nTeam',            video: '/videos/professional-team.mp4' },
    { num: '10', title: 'Market Insights',               video: '/videos/market-insights.mp4' },
  ];

  return (
    <section style={{ padding: 'clamp(60px,8vw,120px) 0 clamp(80px,10vw,160px)' }}>
      {/* Section header */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: `0 ${PAGE_PAD}`, marginBottom: 'clamp(32px, 4vw, 64px)', position: 'relative', zIndex: 200 }}>
        <h2 suppressHydrationWarning style={{
          fontFamily: SERIF,
          fontSize: 'clamp(48px, 7vw, 120px)',
          fontWeight: 700,
          color: '#111',
          lineHeight: 1.0,
          letterSpacing: '-0.04em',
          margin: '0 0 20px',
        }}>
          Why <span className="heading-accent" style={{ fontStyle: 'italic', color: CRIMSON }}>Choose</span> Us.
        </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 1.5, background: CRIMSON }} />
            <p style={{
              fontFamily: MONO,
              fontSize: 'clamp(10px, 1.2vw, 13px)',
              color: 'rgba(0,0,0,0.45)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              margin: 0,
            }}>Trusted Bulk Spice Supplier &amp; Global Spice Exporter</p>
          </div>
      </div>

      {/* Stacking cards */}
      <div style={{ position: 'relative' }}>
        {resourceSteps.map((step, i) => (
          <StackedVideoStep
            key={step.num}
            num={step.num}
            title={step.title}
            video={step.video}
            imageRight={i % 2 !== 0}
            index={i}
            isLast={i === resourceSteps.length - 1}
          />
        ))}
      </div>
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
