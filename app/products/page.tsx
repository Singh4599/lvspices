'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Marquee from '@/components/ui/Marquee';
import CircularGallery from '@/components/animation/CircularGallery';
import { productCategories } from '@/data/products';
import ParticleTextEffect from '@/components/animation/ParticleTextEffect';

export default function ProductsPage() {
  const router = useRouter();

  const galleryItems = productCategories.map((cat) => ({
    image: cat.heroImage ?? '/images/products/spices-hero.png',
    text: cat.name,
  }));

  return (
    <div className="relative">

      {/* ── HERO — Pure Particle Canvas ──────────────────────────────── */}
      <section style={{ position: 'relative', height: '100svh', minHeight: '500px', overflow: 'hidden' }}>
        <ParticleTextEffect
          words={['PRODUCTS', '500+ SKUS', '12 CATEGORIES', '40+ COUNTRIES', 'ORGANIC', 'BULK', 'PRIVATE LABEL', 'EXPORT']}
          intervalFrames={180}
          fullScreen
        />
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(172,3,59,0.7), transparent)' }} />
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <Marquee
        text="SPICES & SEASONING • ORGANIC • CHILLI SPECIALITY • CURRY POWDER • BOTANICAL POWDERS • PRIVATE LABEL • DEHYDRATED • HERBAL TEAS • MILLET"
        className="py-4 border-t border-b border-white/[0.05]"
        textClassName="font-mono text-[11px] tracking-[0.2em] text-[#AC033B]"
        speed={40}
      />

      {/* ── CATEGORIES — CircularGallery ─────────────────────────────── */}
      <section style={{ paddingTop: 'clamp(40px,6vw,80px)', paddingBottom: 'clamp(40px,6vw,100px)' }}>
        <div style={{ padding: '0 clamp(20px,5vw,80px)', marginBottom: 'clamp(8px,2vw,16px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '28px', height: '1px', background: '#AC033B' }} />
            <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '10px', letterSpacing: '0.28em' }}>All Categories</span>
          </div>
          <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2rem, 6vw, 6.5rem)', lineHeight: 1.0, letterSpacing: '-0.03em' }}>
            12 categories. <span className="text-[#AC033B] italic font-serif font-medium">One source.</span>
          </h2>
          <p className="text-white/40" style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', marginTop: 12, maxWidth: 480, lineHeight: 1.6 }}>
            Every category is export-certified, customizable, and available in bulk or private label formats.
          </p>
        </div>

        <div style={{ height: 'clamp(320px, 55vw, 660px)', position: 'relative' }}>
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.05}
            font="bold 28px 'Space Grotesk', sans-serif"
            scrollSpeed={2}
            onItemClick={(index) => {
              const cat = productCategories[index % productCategories.length];
              if (cat) router.push(`/products/${cat.slug}`);
            }}
          />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 'clamp(60px,10vw,140px)', paddingBottom: 'clamp(80px,12vw,160px)' }}>
        <div className="container-lv">
          <div className="flex flex-col items-center text-center" style={{ gap: 'clamp(24px,4vw,48px)' }}>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.2rem, 6vw, 6.5rem)', lineHeight: 1.0, letterSpacing: '-0.03em' }}>
              Ready to <span className="text-[#AC033B] italic font-serif font-medium">order?</span>
            </h2>
            <div className="flex flex-wrap justify-center" style={{ gap: '16px' }}>
              <Link href="/contact"><Button variant="primary" size="lg">Request Quotation</Button></Link>
              <Link href="/catalog"><Button variant="outline" size="lg">Download Catalog</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
