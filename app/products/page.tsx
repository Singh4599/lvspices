'use client';


import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { AnimatedStat, StaggerReveal } from '@/components/ui/ScrollReveal';
import CircularGallery from '@/components/animation/CircularGallery';
import { productCategories } from '@/data/products';

const CR = '#111111';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';



const categoryEmojis: Record<string, string> = {
  'spices-seasoning': '🌶️',
  'no-onion-no-garlic': '🧡',
  'curry-powder': '🍛',
  'snack-seasoning': '🍿',
  'agri-products': '🌾',
  'organic': '🍃',
  'supermarket': '🛒',
  'millet': '🌿',
  'chilli-speciality': '🔥',
  'dehydrated': '🧅',
  'botanical-powders': '🌱',
  'herbal-teas': '🍵',
};

export default function ProductsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const galleryItems = productCategories.map((cat) => ({
    image: cat.heroImage ?? '/images/products/spices-hero.png',
    text: cat.name,
  }));

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 })
        .fromTo('.hero-reveal', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15 });

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (contentRef.current) gsap.set(contentRef.current, { y: -p * 100, opacity: 1 - p * 1.5 });
          if (imageRef.current) gsap.set(imageRef.current, { y: p * 50, scale: 1 + p * 0.1, opacity: 1 - p * 1.5 });
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflowX: 'hidden' }}>

      {/* ══ PARALLAX HERO ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100svh',
          background: '#fff',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
        }}
      >
        {/* Background Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          pointerEvents: 'none',
        }} />

        {/* Floating Image */}
        <div
          ref={imageRef}
          style={{
            position: 'absolute',
            right: '5vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(300px, 40vw, 600px)',
            aspectRatio: '4/5',
            pointerEvents: 'none',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.1)'
          }}
        >
          <Image src="/images/hero-spices.png" alt="Premium Spices" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(255,255,255,0.1), transparent)', pointerEvents: 'none' }} />
        </div>

        {/* Hero Content */}
        <div ref={contentRef} style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: 700 }}>
            <div className="hero-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24, padding: '8px 16px', background: 'rgba(17,17,17,0.05)', border: '1px solid rgba(17,17,17,0.15)', borderRadius: 999 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: CR, boxShadow: `0 0 10px ${CR}` }} />
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: CR, fontWeight: 700 }}>Our Products</span>
            </div>

            <h1 className="hero-reveal" style={{ fontFamily: SERIF, fontSize: 'clamp(48px,7vw,100px)', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
              500+ Products.<br />
              <span style={{ color: CR, fontStyle: 'italic' }}>One Source.</span>
            </h1>

            <p className="hero-reveal" style={{ fontFamily: SANS, fontSize: 'clamp(15px,1.2vw,18px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.8, maxWidth: 500, margin: '0 0 48px' }}>
              Wholesale spices, blended masalas, botanical powders, organic ranges &amp; more — 12 categories, lab-tested, export-certified, and available in bulk, OEM, and private label formats for importers in 40+ countries.
            </p>

            <div style={{ display: 'flex', gap: 'clamp(24px,4vw,60px)', flexWrap: 'wrap' }}>
              {[
                { val: 500, suffix: '+', label: 'Product SKUs' },
                { val: 12, suffix: '', label: 'Categories' },
                { val: 40, suffix: '+', label: 'Countries Served' },
              ].map((stat, i) => (
                <div key={i} className="hero-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px,3vw,40px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    <AnimatedStat value={stat.val} suffix={stat.suffix} label={stat.label} />
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ VELOCITY MARQUEE ══════════════════════════════════════ */}
      <VelocityMarquee dark={true} />

      {/* ══ CATEGORY GRID ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 16 }}>
              All Categories
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px,5vw,72px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 16px', lineHeight: 1.05 }}>
              12 Categories.<br /><span style={{ color: CR, fontStyle: 'italic' }}>Export Certified.</span>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,17px)', color: 'rgba(0,0,0,0.5)', maxWidth: 520, margin: 0, lineHeight: 1.7 }}>
              India&apos;s trusted wholesale spice supplier — every category is available in bulk, OEM, or private label formats, fully compliant with FSSC 22000, HACCP, Halal, and Kosher international food safety standards.
            </p>
          </ScrollReveal>

          {/* 3-Column Grid */}
          <StaggerReveal stagger={0.05}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(12px,1.5vw,24px)',
            }}
          >
            {productCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products/${cat.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    background: '#fafafa',
                    border: '1px solid rgba(0,0,0,0.07)',
                    borderRadius: 20,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-6px)';
                    el.style.boxShadow = '0 24px 60px rgba(0,0,0,0.08)';
                    el.style.borderColor = 'rgba(17,17,17,0.3)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                    el.style.borderColor = 'rgba(0,0,0,0.07)';
                  }}
                >
                  {/* Category Image */}
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
                    <Image
                      src={cat.heroImage ?? '/images/products/spices-hero.png'}
                      alt={cat.name}
                      fill
                      style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: 'clamp(16px,2vw,24px)', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 22 }}>{categoryEmojis[cat.slug] ?? '🌿'}</span>
                      <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: CR, background: 'rgba(17,17,17,0.06)', padding: '4px 10px', borderRadius: 999 }}>
                        {cat.keyProducts.length}+ SKUs
                      </span>
                    </div>

                    <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(16px,1.4vw,20px)', fontWeight: 700, color: '#111', margin: 0, lineHeight: 1.2 }}>
                      {cat.name}
                    </h3>

                    <p style={{ fontFamily: SANS, fontSize: 'clamp(11px,0.9vw,13px)', color: 'rgba(0,0,0,0.5)', margin: 0, lineHeight: 1.6 }}>
                      {cat.shortDesc}
                    </p>

                    <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)' }}>
                        MOQ: {cat.moq}
                      </div>
                      <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: CR }}>
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ CIRCULAR GALLERY ══════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 0', background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)', marginBottom: 'clamp(24px,3vw,40px)' }}>
          <ScrollReveal fromY={20}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 12 }}>
              Interactive Catalogue
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05 }}>
              Browse the Range.
            </h2>
          </ScrollReveal>
        </div>
        <div style={{ height: 'clamp(340px, 55vw, 660px)', position: 'relative' }}>
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#111"
            borderRadius={0.05}
            scrollEase={0.05}
            scrollSpeed={2}
            onItemClick={(index) => {
              const cat = productCategories[index % productCategories.length];
              if (cat) router.push(`/products/${cat.slug}`);
            }}
          />
        </div>
      </section>

      {/* ══ CTA BANNER ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: '#111', textAlign: 'center' }}>
        <ScrollReveal fromY={24}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(17,17,17,0.8)', marginBottom: 20 }}>
            Get Started
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px,5vw,80px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
            Ready to <span style={{ color: CR, fontStyle: 'italic' }}>Order?</span>
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,17px)', color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.7 }}>
            Our export team responds within 24 hours. Tell us what you need and we'll send a custom quotation.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <button style={{
                fontFamily: SANS, fontSize: 15, fontWeight: 700,
                background: CR, color: '#fff',
                padding: '18px 48px', borderRadius: 999, border: 'none', cursor: 'pointer',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(17,17,17,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Request Quotation →
              </button>
            </Link>
            <Link href="/e-brochure" style={{ textDecoration: 'none' }}>
              <button style={{
                fontFamily: SANS, fontSize: 15, fontWeight: 600,
                background: 'transparent', color: 'rgba(255,255,255,0.7)',
                padding: '18px 40px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                Download Brochure
              </button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ══ MOBILE GRID FIX ══════════════════════════════════════ */}
      <style>{`
        @media (max-width: 900px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </main>
  );
}
