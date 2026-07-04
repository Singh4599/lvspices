import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { generatePageMeta } from '@/lib/seo';
import Button from '@/components/ui/Button';
import { productCategories } from '@/data/products';
import ProductVideoHero from '@/components/product/ProductVideoHero';
import ProductSpiceCarousel from '@/components/product/ProductSpiceCarousel';
import PackagingSection from '@/components/product/PackagingSection';
import { SpiceParticles } from '@/components/animation/CardScenes';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return productCategories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = productCategories.find((c) => c.slug === slug);
  if (!category) return {};
  return generatePageMeta({
    title: category.name,
    description: `${category.description} — Premium export quality from LV Spices.`,
  });
}

export default async function ProductCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = productCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const catIndex = productCategories.indexOf(category);
  const products = category.productItems ?? category.keyProducts.map((name) => ({
    name,
    desc: 'Whole, ground & custom formats available',
    image: undefined,
  }));

  return (
    <>
      {/* ── FULLSCREEN VIDEO HERO ─────────────────────────────────── */}
      <ProductVideoHero
        categoryName={category.name}
        categoryIndex={catIndex}
        description={category.description}
        productsCount={products.length}
        buyerTypesCount={category.targetBuyers.length}
        certificationsCount={category.certifications.length}
        moq={category.moq}
        certifications={category.certifications}
      />

      {/* ── PRODUCT SHOWCASE CAROUSEL ─────────────────────────────── */}
      <ProductSpiceCarousel
        products={products}
        categorySlug={category.slug}
        categoryName={category.name}
      />



      {/* ── PACKAGING & SPECS (3D Scroll Effect) ─────────────────── */}
      <PackagingSection
        packaging={category.packaging}
        certifications={category.certifications}
        packagingImage={category.packagingImage}
        categoryName={category.name}
        description={category.description}
      />

      {/* ── LUXURY CTA SECTION ──────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24 px-6 sm:px-12 lg:px-24 flex justify-center">
        <div className="max-w-[1400px] w-full grid md:grid-cols-2 rounded-[40px] overflow-hidden relative border border-white/10 bg-black/40 backdrop-blur-xl" style={{ boxShadow: '0 20px 80px rgba(0,0,0,0.08)' }}>
          
          {/* Left Content - Perfectly Centered */}
          <div className="flex flex-col items-center justify-center p-10 md:p-16 lg:p-24 relative z-10 text-center min-w-0">
            <div className="w-full max-w-[540px] flex flex-col items-center">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '24px', padding: '8px 18px', background: 'rgba(172,3,59,0.06)', borderRadius: '40px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#AC033B' }} />
                <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '10px', letterSpacing: '0.22em' }}>Manufacturing</span>
              </div>
              
              <h2
                className="font-display font-bold text-white mb-6"
                style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                Need a custom <br/>
                <span className="text-[#AC033B]">specification?</span>
              </h2>
              
              <p className="text-white/60 mb-10 text-lg" style={{ lineHeight: 1.7 }}>
                We'll manufacture to your exact requirements — from customized spice formulations and bespoke blending to final private-label packaging. Our state-of-the-art facilities ensure consistency and quality at any scale.
              </p>
              
              <div className="flex gap-4 flex-wrap justify-center">
                <Link href="/contact">
                  <Button variant="primary" size="lg">Request Quotation</Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" size="lg">View All Products</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Video - Embedded smoothly */}
          <div className="relative min-h-[400px] md:min-h-[600px] w-full bg-black/40 min-w-0">
             <div className="absolute inset-0 w-full h-full flex items-center justify-center">
               <SpiceParticles />
             </div>
          </div>
          
        </div>
      </section>
    </>
  );
}
