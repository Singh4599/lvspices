'use client';

import { useRef } from 'react';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import ScrollExpansionHero from '@/components/ui/ScrollExpansionHero';
import BrandConstellation from '@/components/brands/BrandConstellation';

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

const categoryColors: Record<string, string> = {
  'Retail': '#1a6b3c',
  'Export': '#1a4d8c',
  'Food Service': '#7d2b00',
  'Health': '#5c1a6b',
};

function TiltBrandCard({ name, category }: { name: string; category: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const accentColor = categoryColors[category] || CRIMSON;
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const isD = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isD) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -12;
    const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 12;
    el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
    el.style.borderColor = `${accentColor}66`;
    el.style.background = `${accentColor}08`;
    el.style.boxShadow = `${-ry * 1}px ${rx * 1}px 28px ${accentColor}22`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
    el.style.borderColor = 'rgba(0,0,0,0.08)';
    el.style.background = '#fafafa';
    el.style.boxShadow = 'none';
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, padding: '20px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'default', transition: 'all 0.12s ease', minHeight: 100, willChange: 'transform' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${accentColor}18`, border: `1px solid ${accentColor}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontSize: 17, fontWeight: 700, color: accentColor, flexShrink: 0 }}>
        {initials}
      </div>
      <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: '#111', textAlign: 'center', lineHeight: 1.3 }}>{name}</div>
      <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: accentColor, background: `${accentColor}12`, borderRadius: 999, padding: '3px 8px' }}>
        {category}
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function BrandsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = brands.filter(b => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflowX: 'hidden' }}>

      {/* ══ SCROLL EXPANSION HERO ════════════════════════════════ */}
      <ScrollExpansionHero
        badge="Our Clients"
        headingText={`${brands.length}+ Brands`}
        headingRed="Trust Us."
        subText={`Trusted by ${brands.length}+ leading food brands across India and 40+ countries — from retail giants to premium export labels.`}
        imageSrc="/images/products.png"
        stats={[
          { value: `${brands.length}+`, label: 'Active Brands' },
          { value: '40+', label: 'Countries' },
          { value: '500+', label: 'Containers / Year' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE ════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ BRAND CONSTELLATION SVG ══════════════════ */}
      <BrandConstellation brands={brands} />

      {/* ══ CATEGORY BREAKDOWN VISUAL ════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>Who We Serve</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
              Brands Across<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>Every Sector</em>
            </h2>
          </ScrollReveal>
          <StaggerReveal stagger={0.08} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: 'clamp(14px,2vw,24px)' }}>
            {[
              { cat: 'Retail', count: brands.filter(b => b.category === 'Retail').length, icon: '🛒', desc: 'Consumer-facing retail brands across India and global markets.' },
              { cat: 'Export', count: brands.filter(b => b.category === 'Export').length, icon: '🌍', desc: 'Export labels serving 40+ countries across 6 continents.' },
              { cat: 'Food Service', count: brands.filter(b => b.category === 'Food Service').length, icon: '🍽️', desc: 'HoReCa and institutional food service operators.' },
              { cat: 'Health', count: brands.filter(b => b.category === 'Health').length, icon: '🌿', desc: 'Health, wellness, and nutraceutical brands.' },
            ].map(seg => (
              <div key={seg.cat} style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 20, padding: 'clamp(24px,3vw,40px)', transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.08)'; el.style.borderColor = 'rgba(172,3,59,0.3)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; el.style.borderColor = 'rgba(0,0,0,0.07)'; }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{seg.icon}</div>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(36px,4vw,52px)', fontWeight: 800, color: '#111', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 4 }}>{seg.count}</div>
                <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 10 }}>{seg.cat} Brands</div>
                <p style={{ fontFamily: SANS, fontSize: 12.5, color: 'rgba(0,0,0,0.48)', lineHeight: 1.65, margin: 0 }}>{seg.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ FILTERS ═══════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(16px,2vw,24px) clamp(24px,5vw,80px)', background: '#fff', position: 'sticky', top: 60, zIndex: 40, borderBottom: '1px solid rgba(0,0,0,0.06)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, padding: '8px 18px', borderRadius: 999, border: `1px solid ${activeCategory === cat ? CRIMSON : 'rgba(0,0,0,0.12)'}`, background: activeCategory === cat ? CRIMSON : 'transparent', color: activeCategory === cat ? '#fff' : 'rgba(0,0,0,0.55)', cursor: 'pointer', transition: 'all 0.2s' }}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input type="text" placeholder="Search brands..." value={search} onChange={e => setSearch(e.target.value)} style={{ fontFamily: SANS, fontSize: 13, color: '#111', background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '9px 16px 9px 36px', outline: 'none', width: 200 }} />
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', whiteSpace: 'nowrap' }}>
              {filtered.length} brand{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BRANDS GRID ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,5vw,72px) clamp(24px,5vw,80px) clamp(80px,10vw,130px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {filtered.length > 0 ? (
            <StaggerReveal stagger={0.03} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(110px,11vw,148px), 1fr))', gap: 'clamp(8px,1.2vw,14px)' }}>
              {filtered.map(brand => (
                <TiltBrandCard key={brand.name} name={brand.name} category={brand.category} />
              ))}
            </StaggerReveal>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(0,0,0,0.35)', fontFamily: SANS }}>
              No brands found for &ldquo;{search}&rdquo;
            </div>
          )}
        </div>
      </section>

      {/* ══ CURVED LOOP ══════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingTop: 'clamp(16px,2vw,32px)', paddingBottom: 'clamp(40px,6vw,80px)' }}>
        <CurvedLoop marqueeText="OUR BRANDS • RETAIL • EXPORT • HORECA • HEALTH • " speed={1.5} curveAmount={250} className="fill-[#111] uppercase font-mono tracking-widest" />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <text style={{ fontSize: 'clamp(28px,4vw,56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
          <text style={{ fontSize: 'clamp(9px,1vw,14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>

      {/* ══ CTA ══════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: CRIMSON, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>BRANDS</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={24}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>Ready to Partner?</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5.5vw,80px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Want to be on<br />This List?
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(15px,1.3vw,18px)', color: 'rgba(255,255,255,0.8)', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.75 }}>
              Partner with LV Spices and join the world's most trusted spice brands. Private label, export, or institutional — we scale with you.
            </p>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#fff', color: CRIMSON, fontFamily: SANS, fontWeight: 700, fontSize: 15, padding: '18px 40px', borderRadius: 999, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
              Get In Touch →
            </a>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
