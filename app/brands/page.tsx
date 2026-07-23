'use client';

import { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const brands = [
  { name: 'Patanjali', category: 'Retail' },
  { name: 'Nilons', category: 'Retail' },
  { name: 'Keya', category: 'Retail' },
  { name: 'Euro Foods', category: 'Export' },
  { name: 'Swad', category: 'Export' },
  { name: 'Sugar Chilli', category: 'Retail' },
  { name: 'Jalani', category: 'Retail' },
  { name: 'Society', category: 'Retail' },
  { name: 'Harbor', category: 'Export' },
  { name: 'Makino', category: 'Food Service' },
  { name: 'Ashwin', category: 'Retail' },
  { name: 'Chandan', category: 'Retail' },
  { name: 'Gruner', category: 'Export' },
  { name: 'Fit Flex', category: 'Health' },
  { name: 'Himalars', category: 'Retail' },
  { name: 'Beanut', category: 'Food Service' },
  { name: 'Moong', category: 'Retail' },
  { name: 'Kirloskar', category: 'Food Service' },
  { name: 'Pure Nutrition', category: 'Health' },
  { name: 'Ram Bandhu', category: 'Retail' },
  { name: 'Satvik', category: 'Health' },
  { name: 'Sesa', category: 'Export' },
  { name: 'Silyandra', category: 'Health' },
  { name: 'Malwani', category: 'Retail' },
  { name: 'Nakoda', category: 'Retail' },
  { name: 'Balaji', category: 'Retail' },
  { name: 'Open Coconut', category: 'Health' },
  { name: 'Nutrapurna', category: 'Health' },
  { name: 'ACPL', category: 'Export' },
  { name: 'Eurasia', category: 'Export' },
  { name: 'Tea Fit', category: 'Health' },
  { name: 'Yash Paras', category: 'Retail' },
  { name: 'Vicco', category: 'Health' },
  { name: 'Fasri King', category: 'Food Service' },
  { name: 'Candela', category: 'Export' },
  { name: 'Krishikco', category: 'Food Service' },
  { name: 'Kritika', category: 'Retail' },
  { name: 'Laxmi Gold', category: 'Retail' },
  { name: 'Bedekar', category: 'Retail' },
  { name: 'Cosmore Food', category: 'Food Service' },
  { name: 'Icemach', category: 'Food Service' },
  { name: 'Kalyan', category: 'Retail' },
  { name: 'Madina', category: 'Export' },
  { name: 'Plus Beverages', category: 'Health' },
  { name: 'Bakeats', category: 'Food Service' },
  { name: 'Chamria', category: 'Retail' },
  { name: 'Exiberg', category: 'Export' },
  { name: 'Jagdish', category: 'Retail' },
];

const categories = ['All', 'Retail', 'Export', 'Food Service', 'Health'];

function BrandCard({ name, category }: { name: string; category: string }) {
  const colors = ['#AC033B', '#8B0030', '#C01040', '#6B0025', '#D01850'];
  const accentColor = colors[name.charCodeAt(0) % colors.length];
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{
      background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: 14, padding: '24px 16px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 10, cursor: 'pointer',
      transition: 'all 0.28s ease', minHeight: 100, position: 'relative',
    }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(172,3,59,0.5)'; el.style.background = 'rgba(172,3,59,0.05)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 10px 30px rgba(172,3,59,0.12)'; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.08)'; el.style.background = '#fafafa'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
    >
      <div style={{
        width: 54, height: 54, borderRadius: 10,
        background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
        border: `1px solid ${accentColor}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: accentColor, flexShrink: 0,
      }}>
        {initials}
      </div>
      <div style={{ fontFamily: SANS, fontSize: 12.5, fontWeight: 600, color: '#111', textAlign: 'center', lineHeight: 1.3 }}>
        {name}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', background: 'rgba(0,0,0,0.05)', borderRadius: 999, padding: '3px 8px' }}>
        {category}
      </div>
    </div>
  );
}

export default function BrandsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = brands.filter(b => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <PageHero
        tag="Our Clients"
        heading="Brands We Serve."
        headingRed={undefined}
        subCopy={`Trusted by ${brands.length}+ leading food brands across India and 40+ countries — from retail giants to premium export labels.`}
        imageSrc="/images/products.png"
        imageAlt="LV Spices Brand Partners"
        overlay="gradient-up"
        textAlign="center"
        stats={[
          { value: `${brands.length}+`, label: 'Active Brands' },
          { value: '40+', label: 'Countries' },
          { value: '500+', label: 'Containers / Year' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE ══════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ FILTERS ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,5vw,60px) clamp(20px,5vw,80px) 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <ScrollReveal fromY={16}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Category pills */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                    fontFamily: SANS, fontSize: 13, fontWeight: 500,
                    padding: '8px 18px', borderRadius: 999,
                    border: `1px solid ${activeCategory === cat ? CRIMSON : 'rgba(0,0,0,0.12)'}`,
                    background: activeCategory === cat ? CRIMSON : 'transparent',
                    color: activeCategory === cat ? '#fff' : 'rgba(0,0,0,0.55)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div style={{ position: 'relative' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2"
                  style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text" placeholder="Search brands..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{
                    fontFamily: SANS, fontSize: 13, color: '#111',
                    background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: 999, padding: '9px 16px 9px 40px', outline: 'none', width: 220,
                  }}
                />
              </div>
            </div>

            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', marginTop: 20 }}>
              Showing {filtered.length} brand{filtered.length !== 1 ? 's' : ''}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ BRANDS GRID ═══════════════════════════════════════ */}
      <section style={{ padding: '0 clamp(20px,5vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {filtered.length > 0 ? (
            <StaggerReveal stagger={0.04} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(120px,12vw,160px), 1fr))',
              gap: 'clamp(10px,1.5vw,16px)',
            }}>
              {filtered.map(brand => (
                <BrandCard key={brand.name} name={brand.name} category={brand.category} />
              ))}
            </StaggerReveal>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(0,0,0,0.35)', fontFamily: SANS }}>
              No brands found for &ldquo;{search}&rdquo;
            </div>
          )}
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.06)', background: '#fafafa' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={24}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#111', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              Want to be on this list?
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 16, color: 'rgba(0,0,0,0.45)', margin: '0 0 32px', lineHeight: 1.7 }}>
              Partner with LV Spices and join the world&apos;s leading spice brands.
            </p>
            <a href="/contact" style={{
              display: 'inline-block', fontFamily: SANS, fontSize: 14, fontWeight: 600,
              letterSpacing: '0.04em', background: CRIMSON, color: '#fff',
              padding: '14px 40px', borderRadius: 999, textDecoration: 'none', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(172,3,59,0.3)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
            >
              Get In Touch →
            </a>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
