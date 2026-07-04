import { Metadata } from 'next';
import Image from 'next/image';
import { generatePageMeta } from '@/lib/seo';

export const metadata: Metadata = generatePageMeta({
  title: 'Blog',
  description: 'Insights from the world of spices — technology, quality, trade, and the future of food manufacturing.',
});

const posts = [
  {
    slug: 'why-cryogenic-grinding-matters',
    title: 'Why Cryogenic Grinding Matters: The Science Behind Preserved Flavor',
    excerpt: 'Conventional grinding generates heat above 80°C, destroying up to 60% of essential oils. Here\'s how cryogenic grinding changes everything.',
    category: 'Technology',
    date: 'March 2025',
    readTime: '5 min',
    featured: true,
  },
  {
    slug: 'steam-sterilization-vs-eto',
    title: 'Steam Sterilization vs EtO: Why Chemical-Free Wins',
    excerpt: 'As major retailers ban ethylene oxide-treated spices, steam sterilization emerges as the gold standard for food safety.',
    category: 'Quality',
    date: 'February 2025',
    readTime: '4 min',
    featured: false,
  },
  {
    slug: 'india-spice-export-2025',
    title: 'India\'s Spice Export Landscape in 2025: Trends and Opportunities',
    excerpt: 'India exported $4.2 billion in spices in 2024. Where are the growth markets? What do buyers want? Our analysis.',
    category: 'Trade',
    date: 'January 2025',
    readTime: '7 min',
    featured: false,
  },
  {
    slug: 'what-is-cfg-science',
    title: 'What Is CFG Science? Inside the World\'s First Spice Research Centre',
    excerpt: 'We decode flavor compounds, essential oil chemistry, and volatile aromatics. Here\'s what that actually means.',
    category: 'Innovation',
    date: 'December 2024',
    readTime: '6 min',
    featured: false,
  },
  {
    slug: 'private-label-spice-guide',
    title: 'The Complete Guide to Private Label Spice Manufacturing',
    excerpt: 'From formulation to packaging, certification to logistics — everything you need to know about launching a private label spice brand.',
    category: 'Business',
    date: 'November 2024',
    readTime: '8 min',
    featured: false,
  },
  {
    slug: 'pesticide-testing-spices',
    title: 'Pesticide Testing in Spices: MRLs, Methods, and What Buyers Need to Know',
    excerpt: 'EU MRL regulations, LCMS/MS testing, and multi-residue analysis — a practical guide for importers and food manufacturers.',
    category: 'Quality',
    date: 'October 2024',
    readTime: '6 min',
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  Technology: '#2563eb',
  Quality: '#059669',
  Trade: '#d97706',
  Innovation: '#7c3aed',
  Business: '#AC033B',
};

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>

      {/* ── SPLIT HERO ───────────────────────────────────────────── */}
      <section style={{ paddingTop: 'clamp(120px, 9vw, 160px)', overflow: 'hidden' }}>
        <div
          className="split-hero-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '520px', alignItems: 'stretch' }}
        >
          {/* LEFT */}
          <div
            style={{
              paddingLeft: 'clamp(1.5rem, 6vw, 8rem)',
              paddingRight: 'clamp(2rem, 4vw, 5rem)',
              paddingBottom: '80px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <div style={{ width: '36px', height: '1.5px', background: '#AC033B', flexShrink: 0 }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>
                Insights
              </span>
            </div>

            <h1
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5.2rem)', lineHeight: '0.92', letterSpacing: '-0.02em', marginBottom: '28px' }}
            >
              Knowledge from
              <br />
              <span className="text-[#AC033B] italic font-serif font-medium">the ground up.</span>
            </h1>

            <p
              className="text-white/50 leading-relaxed"
              style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', maxWidth: '440px', marginBottom: '48px' }}
            >
              Spice science, trade intelligence, and manufacturing insights from 50 years of experience at the forefront of the global spice industry.
            </p>

            <div style={{ display: 'flex', gap: '36px', flexWrap: 'wrap' }}>
              {[
                { value: '6+', label: 'Articles' },
                { value: '5', label: 'Categories' },
                { value: '50+', label: 'Years Experience' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-mono font-bold text-[#AC033B]" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
                  <div className="font-mono uppercase text-white/30" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Lab image */}
          <div style={{ position: 'relative', minHeight: '480px', padding: '24px 32px 24px 0' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden' }}>
              <Image src="/images/lab.png" alt="LV Spices R&D Laboratory" fill priority sizes="50vw" className="object-cover" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(255,255,255,0.15) 0%, transparent 20%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ─────────────────────────────────────── */}
      <section style={{ paddingTop: '120px', paddingBottom: '0' }}>
        <div className="container-lv">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
            <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Featured</span>
          </div>

          <div
            className="group"
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0',
              background: 'rgba(172,3,59,0.015)', border: '1px solid rgba(172,3,59,0.08)',
              borderRadius: '24px', overflow: 'hidden', cursor: 'pointer',
            }}
          >
            {/* Text side */}
            <div style={{ padding: 'clamp(40px, 5vw, 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                  <span
                    style={{
                      fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: categoryColors[featured.category] || '#AC033B',
                      background: `${categoryColors[featured.category] || '#AC033B'}15`,
                      padding: '4px 12px', borderRadius: '40px',
                    }}
                  >
                    {featured.category}
                  </span>
                  <span className="text-white/30 font-mono" style={{ fontSize: '11px' }}>{featured.date}</span>
                </div>

                <h2 className="font-display font-bold text-white group-hover:text-[#AC033B] transition-colors duration-300" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '20px' }}>
                  {featured.title}
                </h2>

                <p className="text-white/55 leading-relaxed" style={{ fontSize: '15px', marginBottom: '32px' }}>
                  {featured.excerpt}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="font-mono text-white/30" style={{ fontSize: '12px' }}>{featured.readTime} read</span>
                <span className="flex items-center gap-2 text-[#AC033B] font-medium" style={{ fontSize: '13px' }}>
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </div>
            </div>

            {/* Image side */}
            <div style={{ position: 'relative', minHeight: '360px', background: 'rgba(172,3,59,0.03)' }}>
              <Image src="/images/hero-spices.png" alt={featured.title} fill className="object-cover" sizes="50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL ARTICLES ─────────────────────────────────────────── */}
      <section style={{ paddingTop: '100px', paddingBottom: '160px' }}>
        <div className="container-lv">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
            <div style={{ width: '40px', height: '1px', background: '#AC033B' }} />
            <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>All Articles</span>
          </div>

          <div className="infrastructure-grid">
            {rest.map((post, i) => (
              <article
                key={post.slug}
                className="infrastructure-card group"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                <span className="absolute font-display font-bold text-white select-none pointer-events-none" style={{ top: '20px', right: '24px', fontSize: '4.5rem', lineHeight: 1, opacity: 0.03 }}>
                  {String(i + 2).padStart(2, '0')}
                </span>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <span
                    style={{
                      fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: categoryColors[post.category] || '#AC033B',
                      background: `${categoryColors[post.category] || '#AC033B'}15`,
                      padding: '4px 12px', borderRadius: '40px',
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-white/30 font-mono" style={{ fontSize: '11px' }}>{post.date}</span>
                </div>

                <h3 className="font-display font-bold text-white group-hover:text-[#AC033B] transition-colors duration-300" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.2, marginBottom: '18px', flex: 1 }}>
                  {post.title}
                </h3>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '16px' }} />

                <p className="text-white/55" style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
                  {post.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="font-mono text-white/30" style={{ fontSize: '11px' }}>{post.readTime} read</span>
                  <span className="flex items-center gap-1.5 text-[#AC033B] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontSize: '12px' }}>
                    Read
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
