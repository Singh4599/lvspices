import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMeta } from '@/lib/seo';
import Button from '@/components/ui/Button';
import FlyingPosters from '@/components/animation/FlyingPosters';
import { Download, FileText, Briefcase, Factory, Leaf } from 'lucide-react';

export const metadata: Metadata = generatePageMeta({
  title: 'Catalog',
  description: 'Download the complete LV Spices product catalog — 500+ SKUs across 13 categories with specifications, certifications, and packaging options.',
});

const catalogs = [
  {
    title: 'Master Product Catalog',
    description: 'Complete overview of all 500+ SKUs across 13 categories. Includes product specifications, available formats, and packaging options.',
    pages: '48 pages',
    format: 'PDF',
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: 'Organic Range',
    description: 'USDA & EU Organic certified spices — whole, ground, and custom blends for organic food manufacturers.',
    pages: '16 pages',
    format: 'PDF',
    icon: <Leaf className="h-6 w-6" />,
  },
  {
    title: 'Private Label',
    description: 'Custom packaging, formulation, and branding capabilities for retailers and distributors worldwide.',
    pages: '12 pages',
    format: 'PDF',
    icon: <FileText className="h-6 w-6" />,
  },
  {
    title: 'Technology & Quality',
    description: 'Cryogenic grinding, steam sterilization, CFG Science R&D, and quality assurance capabilities.',
    pages: '20 pages',
    format: 'PDF',
    icon: <Factory className="h-6 w-6" />,
  },
];

const posterItems = [
  '/images/products/packaging-hero.png',
  '/images/factory.png',
  '/images/products/spices-hero.png',
  '/images/products/agri-hero.png',
  '/images/products/snack-hero.png'
];

export default function CatalogPage() {
  return (
    <div className="relative">
      {/* ── HERO WITH FLYING POSTERS ───────────────────────────── */}
      <section style={{ paddingTop: 'clamp(120px, 9vw, 160px)', paddingBottom: '80px', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(24px,6vw,80px)', textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Downloads</span>
            <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
          </div>
          <h1 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.8rem)', lineHeight: '0.95', letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Everything we make. <span className="text-[#AC033B] italic font-serif font-medium">In one catalog.</span>
          </h1>
          <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', maxWidth: '600px', margin: '0 auto' }}>
            Download our complete product range, technical specifications, and capability brochures. Get immediate access to all technical data sheets and MOQs.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '36px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="font-mono font-bold text-[#AC033B]" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', lineHeight: 1, marginBottom: '4px' }}>500+</div>
            <div className="font-mono uppercase text-white/30" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>SKUs</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="font-mono font-bold text-[#AC033B]" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', lineHeight: 1, marginBottom: '4px' }}>13</div>
            <div className="font-mono uppercase text-white/30" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>Categories</div>
          </div>
        </div>

        <div style={{ height: '600px', width: '100%', position: 'relative' }}>
          <FlyingPosters
            items={posterItems}
            planeWidth={300}
            planeHeight={400}
            distortion={2}
          />
        </div>
      </section>

      {/* ── CATALOGS GRID ──────────────────────────────────── */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container-lv">
          <div className="flex flex-col items-center text-center" style={{ marginBottom: '72px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Brochures</span>
              <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            </div>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              Digital <span className="text-[#AC033B] italic font-serif font-medium">Resources.</span>
            </h2>
            <p className="text-white/50 leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)', maxWidth: '600px' }}>
              Select a brochure to view full details on our product specifications, packaging options, and processing capabilities.
            </p>
          </div>

          <div className="infrastructure-grid">
            {catalogs.map((cat, index) => (
              <div key={cat.title} className="infrastructure-card flex flex-col" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="absolute font-display font-bold text-white select-none pointer-events-none" style={{ top: '20px', right: '24px', fontSize: '4.5rem', lineHeight: 1, opacity: 0.03 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="flex items-center justify-center text-[#AC033B]" style={{ width: '52px', height: '52px', borderRadius: '13px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.12)', marginBottom: '22px' }}>
                  {cat.icon}
                </div>

                <h3 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', lineHeight: 1.2, marginBottom: '16px' }}>{cat.title}</h3>
                
                <p className="text-[14px] text-white/60 leading-relaxed flex-1 mb-8">{cat.description}</p>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '20px' }} />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-white/30 font-mono tracking-widest">{cat.pages}</span>
                  </div>

                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    {cat.format}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOM SHEET REQUEST ──────────────────────────────────── */}
      <section style={{ paddingBottom: '160px', paddingTop: '80px' }}>
        <div className="container-lv">
          <div style={{ background: 'rgba(172,3,59,0.04)', border: '1px solid rgba(172,3,59,0.1)', borderRadius: '24px', padding: '60px 40px', textAlign: 'center' }}>
            <h3 className="font-display text-[28px] font-bold text-white mb-4">Need a custom specification sheet?</h3>
            <p className="text-[15px] text-white/60 mx-auto max-w-2xl leading-relaxed mb-8">
              We can prepare product-specific technical data sheets, Certificates of Analysis (COAs), or category-specific catalogs tailored exactly to your procurement requirements.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">Request Custom Catalog</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
