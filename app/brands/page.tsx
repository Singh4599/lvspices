'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── Brand Data ──────────────────────────────────────────── */
// Replace these with actual brand logos when available
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

/* ── Brand Card ──────────────────────────────────────────── */
function BrandCard({ name, category }: { name: string; category: string }) {
  // Generate a consistent "color" for each brand based on name
  const colors = ['#AC033B', '#8B0030', '#C01040', '#6B0025', '#D01850'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const accentColor = colors[colorIndex];

  // Get initials
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        minHeight: 100,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(172,3,59,0.5)';
        el.style.background = 'rgba(172,3,59,0.06)';
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = '0 8px 30px rgba(172,3,59,0.15)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.background = 'rgba(255,255,255,0.03)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Logo placeholder — replace with <Image> when logo files available */}
      <div style={{
        width: 54, height: 54,
        borderRadius: 10,
        background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
        border: `1px solid ${accentColor}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SERIF,
        fontSize: 18,
        fontWeight: 700,
        color: accentColor,
        flexShrink: 0,
      }}>
        {initials}
      </div>

      {/* Brand name */}
      <div style={{
        fontFamily: SANS,
        fontSize: 12.5,
        fontWeight: 600,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 1.3,
      }}>
        {name}
      </div>

      {/* Category pill */}
      <div style={{
        fontFamily: MONO,
        fontSize: 9,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 999,
        padding: '3px 8px',
      }}>
        {category}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function BrandsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = brands.filter(b => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,80px) clamp(40px,6vw,80px)',
        textAlign: 'center',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(172,3,59,0.12) 0%, transparent 70%)',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(172,3,59,0.12)', border: '1px solid rgba(172,3,59,0.35)',
          borderRadius: 999, padding: '6px 18px', marginBottom: 24,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }} />
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON }}>Our Clients</span>
        </div>

        <h1 style={{
          fontFamily: SERIF,
          fontSize: 'clamp(36px,6vw,88px)',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          margin: '0 0 20px',
        }}>
          Brands We Serve.
        </h1>

        <p style={{
          fontFamily: SANS,
          fontSize: 'clamp(14px,1.2vw,17px)',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.7,
          maxWidth: 540,
          margin: '0 auto 40px',
        }}>
          Trusted by {brands.length}+ leading food brands across India and 40+ countries — from retail giants to premium export labels.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(24px,5vw,64px)', flexWrap: 'wrap', marginBottom: 48 }}>
          {[
            { val: `${brands.length}+`, label: 'Active Brands' },
            { val: '40+', label: 'Countries' },
            { val: '500+', label: 'Containers / Year' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: CRIMSON, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Filters & Search ──────────────────────────────── */}
      <section style={{ padding: '0 clamp(20px,5vw,80px) 32px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: SANS,
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '8px 18px',
                  borderRadius: 999,
                  border: `1px solid ${activeCategory === cat ? CRIMSON : 'rgba(255,255,255,0.12)'}`,
                  background: activeCategory === cat ? CRIMSON : 'transparent',
                  color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search brands..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                fontFamily: SANS,
                fontSize: 13,
                color: '#fff',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 999,
                padding: '9px 16px 9px 40px',
                outline: 'none',
                width: 220,
              }}
            />
          </div>
        </div>

        {/* Result count */}
        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginTop: 20 }}>
          Showing {filtered.length} brand{filtered.length !== 1 ? 's' : ''}
        </div>
      </section>

      {/* ── Brands Grid ───────────────────────────────────── */}
      <section style={{ padding: '0 clamp(20px,5vw,80px) clamp(60px,8vw,100px)', maxWidth: 1400, margin: '0 auto' }}>
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(120px,12vw,160px), 1fr))',
            gap: 'clamp(10px,1.5vw,16px)',
          }}>
            {filtered.map(brand => (
              <BrandCard key={brand.name} name={brand.name} category={brand.category} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)', fontFamily: SANS }}>
            No brands found for &ldquo;{search}&rdquo;
          </div>
        )}
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,80px)',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,52px)', fontWeight: 700, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
          Want to be on this list?
        </h2>
        <p style={{ fontFamily: SANS, fontSize: 16, color: 'rgba(255,255,255,0.4)', margin: '0 0 32px' }}>
          Partner with LV Spices and join the world&apos;s leading spice brands.
        </p>
        <a
          href="/contact"
          style={{
            display: 'inline-block',
            fontFamily: SANS,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.05em',
            background: CRIMSON,
            color: '#fff',
            padding: '14px 36px',
            borderRadius: 999,
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
        >
          Get In Touch →
        </a>
      </section>

    </main>
  );
}
