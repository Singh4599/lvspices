'use client';

import Link from 'next/link';
import PageHero from '@/components/layout/PageHero';
import Button from '@/components/ui/Button';
import { ProductHighlightCard } from '@/components/ui/product-card';
import { FlaskConical, Palette, Building, ShieldCheck } from 'lucide-react';

const capabilities = [
  {
    number: '01',
    title: 'Custom Formulation',
    icon: <FlaskConical className="h-6 w-6" />,
    description: 'We develop proprietary blends and recipes to your exact specification.',
    bullets: ['From concept to approved formula', 'Proprietary recipe development', 'Flavor matching and benchmarking', 'Shelf-life validation'],
  },
  {
    number: '02',
    title: 'Branded Packaging',
    icon: <Palette className="h-6 w-6" />,
    description: 'Your brand, your design. We produce finished goods in your branded packaging.',
    bullets: ['Custom artwork printing', 'Pouches, jars, tins, sachets', 'Retail-ready formats', 'Nutrition labelling and compliance'],
  },
  {
    number: '03',
    title: 'Co-Manufacturing',
    icon: <Building className="h-6 w-6" />,
    description: 'Full contract manufacturing for established brands. Scale production without CAPEX.',
    bullets: ['Minimum order from 500 kg', 'Dedicated production runs', 'NDA and IP protection', 'Dedicated QA liaison'],
  },
  {
    number: '04',
    title: 'Compliance & Certification',
    icon: <ShieldCheck className="h-6 w-6" />,
    description: 'Our facility already holds the certifications your buyers demand.',
    bullets: ['ISO 9001, ISO 22000, HACCP', 'USDA Organic & EU Organic', 'Halal & Kosher certified', 'FSSAI, Spice Board export compliant'],
  },
];

const categories = [
  'Spices & Seasonings', 'Curry Powders', 'Snack Seasonings',
  'No Onion No Garlic Range', 'Organic Spices', 'Herbal Teas',
  'Botanical Powders', 'Blended Masalas', 'Custom Formulations',
];

const process = [
  { step: '01', title: 'Brief', desc: 'Share your product concept, target market, and packaging requirements.' },
  { step: '02', title: 'Formulate', desc: 'Our team develops samples matched to your brief within 5–7 working days.' },
  { step: '03', title: 'Approve', desc: 'Review lab samples. Iterate until the product is exactly right.' },
  { step: '04', title: 'Produce', desc: 'Full batch production in our ISO-certified facility.' },
  { step: '05', title: 'Ship', desc: 'Export-ready. Fully documented. Delivered to your warehouse.' },
];

export default function PrivateLabelPage() {
  return (
    <>

      <PageHero
        label="PRIVATE LABEL"
        title="Your brand. Our manufacturing."
        subtitle="Full private label and co-manufacturing services — custom formulations, your packaging, world-class quality."
      />

      {/* CTA strip */}
      <section className="bg-[#AC033B] py-12 md:py-16">
        <div className="container-lv flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[13px] tracking-[0.15em] text-white uppercase">Ready to build your brand?</p>
          <Link href="/contact"><Button variant="outline" size="sm" style={{ background: 'white', color: '#AC033B', borderColor: 'white' }}>Start a Conversation</Button></Link>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 md:py-32 lg:py-40">
        <div className="container-lv">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {capabilities.map((cap) => (
              <ProductHighlightCard
                key={cap.number}
                number={cap.number}
                categoryIcon={cap.icon}
                title={cap.title}
                description={cap.description}
                bullets={cap.bullets}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[rgba(172,3,59,0.015)] py-20 md:py-32 lg:py-40">
        <div className="container-lv">
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold text-white mb-4">Categories available for private label</h2>
          <p className="text-[15px] text-white/50 mb-10 max-w-2xl">Any product in our 500+ SKU range can be produced under your brand name.</p>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <span key={cat} className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/50 border border-black/[0.1] px-4 py-2.5 rounded-full hover:border-[#AC033B] hover:text-[#AC033B] transition-colors cursor-default">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-32 lg:py-40">
        <div className="container-lv">
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold text-white mb-12">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 md:gap-6">
            {process.map((p) => (
              <ProductHighlightCard
                key={p.step}
                number={p.step}
                title={p.title}
                description={p.desc}
              />
            ))}
          </div>

          <div className="mt-20 pt-20 border-t border-black/[0.06] flex flex-wrap gap-4">
            <Link href="/contact"><Button variant="primary" size="lg">Enquire Now</Button></Link>
            <Link href="/catalog"><Button variant="outline" size="lg">Download Catalog</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
