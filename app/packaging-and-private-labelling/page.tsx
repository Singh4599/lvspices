'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── Feature cards ────────────────────────────────────────── */
const features = [
  {
    icon: '🎨',
    title: 'In-House Design Team',
    desc: 'Our designers create your packaging artwork, labels, and brand identity — ready for print in any country.',
  },
  {
    icon: '📦',
    title: 'In-House Packing Unit',
    desc: 'Products are packed in our own facility under strict quality control — zero outsourcing.',
  },
  {
    icon: '⚖️',
    title: 'All Pack Sizes',
    desc: '100g to 5kg, pouches, boxes, jars — we handle every format for retail, HoReCa, and bulk.',
  },
  {
    icon: '✅',
    title: 'FSSAI & Export Compliant Labels',
    desc: 'All labels meet destination-country food labelling regulations — GCC, UK, USA, EU and more.',
  },
  {
    icon: '🌍',
    title: 'Any Market, Any Country',
    desc: 'We understand labelling requirements for 40+ markets. Your product, their regulations — handled.',
  },
  {
    icon: '💻',
    title: 'IT & Tech Support',
    desc: 'Our in-house IT team can set up your product listings, barcode systems, and ordering workflows.',
  },
];

/* ── Process Steps ────────────────────────────────────────── */
const steps = [
  { num: '01', title: 'You Share Your Brand Vision', desc: 'Tell us your brand story, target market, and the products you want to launch.' },
  { num: '02', title: 'Our Design Team Creates Packaging Artwork', desc: 'Concepts, mockups, and final print-ready files — built by our in-house team.' },
  { num: '03', title: 'You Approve the Design', desc: 'Iterate as much as you need. We move only after you sign off.' },
  { num: '04', title: 'We Source & Pack Your Products', desc: 'Pan-India sourcing, our facility, your brand on every pack.' },
  { num: '05', title: 'Quality Check & FSSAI / Export Compliance Verified', desc: 'Lab-tested batches and labels validated for your destination market.' },
  { num: '06', title: 'Shipped Under Your Brand', desc: 'Container loaded, documents prepared, and tracking handed over.' },
];

/* ── Product Categories ──────────────────────────────────── */
const productCats = [
  { icon: '🌶️', name: 'Spices' },
  { icon: '🫘', name: 'Pulses' },
  { icon: '🌾', name: 'Flours' },
  { icon: '🍚', name: 'Rice' },
  { icon: '🥜', name: 'Nuts' },
  { icon: '🍿', name: 'Snacks' },
  { icon: '🧄', name: 'Masalas' },
  { icon: '🍵', name: 'Tea & Beverages' },
];

/* ── Comparison Table ─────────────────────────────────────── */
const compRows = [
  { cap: 'Design Team', lv: 'In-house', typical: 'Outsourced' },
  { cap: 'Packing Unit', lv: 'In-house', typical: 'Third party' },
  { cap: 'IT Support', lv: 'In-house', typical: 'None' },
  { cap: 'Label Compliance', lv: 'Handled', typical: 'Your problem' },
  { cap: 'Turnaround Time', lv: 'Fast', typical: 'Slow' },
  { cap: 'MOQ', lv: 'Flexible', typical: 'High' },
  { cap: 'Certifications', lv: 'FDA, EU, FSSAI', typical: 'Limited' },
];

/* ── Testimonial ─────────────────────────────────────────── */
const testimonial = {
  text: '"What sets LV Spices apart is their private labelling service. We now sell our own brand of premium Indian spices and it has transformed our business. Their in-house design team made it seamless."',
  name: 'Priya Naidoo',
  company: 'Naidoo Foods Ltd',
  location: 'Durban, South Africa',
};

/* ─────────────────────────────────────────────────────────── */

export default function PrivateLabelPage() {
  const [form, setForm] = useState({ name: '', company: '', country: '', email: '', whatsapp: '', products: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{
        minHeight: 'clamp(400px,55vw,680px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #120008 60%, #0a0a0a 100%)',
      }}>
        {/* Diagonal grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(172,3,59,0.03) 0px, rgba(172,3,59,0.03) 1px, transparent 1px, transparent 40px)',
          zIndex: 0,
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: 1200, margin: '0 auto',
          padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,80px) clamp(60px,8vw,100px)',
          display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap',
        }}>
          {/* Left */}
          <div style={{ flex: '1 1 400px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(172,3,59,0.12)', border: '1px solid rgba(172,3,59,0.35)',
              borderRadius: 999, padding: '6px 18px', marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }} />
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON }}>Private Labelling</span>
            </div>

            <h1 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(32px,5.5vw,72px)',
              fontWeight: 700,
              color: '#111',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 0 20px',
            }}>
              Launch Your Own<br />
              <span style={{ color: CRIMSON }}>Spice Brand</span>
            </h1>

            <p style={{
              fontFamily: SANS,
              fontSize: 'clamp(14px,1.2vw,17px)',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.75,
              maxWidth: 480,
              margin: '0 0 36px',
            }}>
              From sourcing to design to packing — we build your brand for you. Your customers see your brand. We do all the work behind the scenes.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#contact-form" style={{
                display: 'inline-block', fontFamily: SANS, fontSize: 14, fontWeight: 600,
                background: CRIMSON, color: '#111', padding: '14px 32px', borderRadius: 999,
                textDecoration: 'none', letterSpacing: '0.04em', transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              >
                Start Your Private Label Journey →
              </a>
              <a href="#how-it-works" style={{
                display: 'inline-block', fontFamily: SANS, fontSize: 14, fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(0,0,0,0.6)',
                padding: '14px 28px', borderRadius: 999, textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.5)'; el.style.color = '#fff'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.2)'; el.style.color = 'rgba(255,255,255,0.6)'; }}
              >
                Browse Catalog
              </a>
            </div>
          </div>

          {/* Right — Mockup boxes */}
          <div style={{ flex: '0 0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {['Premium\nBlend', 'Organic\nSpices', 'Export\nGrade', 'Your\nBrand', 'Private\nLabel', 'Custom\nPack'].map((label, i) => (
              <div key={i} style={{
                width: 90, height: 110,
                borderRadius: 10,
                background: i % 3 === 0
                  ? `linear-gradient(160deg, ${CRIMSON}, #6B0025)`
                  : i % 3 === 1
                    ? 'rgba(0,0,0,0.06)'
                    : 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center',
                fontFamily: SANS, fontSize: 10.5, fontWeight: 600,
                color: i % 3 === 0 ? '#fff' : 'rgba(255,255,255,0.4)',
                lineHeight: 1.4,
                whiteSpace: 'pre-line',
                transform: i % 2 === 0 ? 'rotate(-2deg)' : 'rotate(1.5deg)',
                boxShadow: i % 3 === 0 ? '0 8px 24px rgba(172,3,59,0.3)' : 'none',
              }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT IS PL ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 20 }}>What is Private Labelling</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 24px' }}>
            Your brand on the front.<br />Our work behind it.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, margin: 0 }}>
            We source the finest Indian spices, pack them under your brand name and design, and ship them to your market. Your customers see your brand. We do all the work behind the scenes.
          </p>
        </div>
      </section>

      {/* ══ FEATURES ══════════════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>What We Offer</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3vw,44px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 40px' }}>
            Everything you need under one roof
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px,28vw,340px), 1fr))', gap: 20 }}>
            {features.map(f => (
              <div key={f.title} style={{
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 16,
                padding: '28px 24px',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.05)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = 'rgba(0,0,0,0.03)'; }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#111', margin: '0 0 10px' }}>{f.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STEPS ══════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>How It Works</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,48px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 48px' }}>
            From vision to shipped container in 6 steps
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((step, i) => (
              <div key={step.num} style={{ display: 'flex', gap: 20, paddingBottom: i < steps.length - 1 ? 32 : 0, position: 'relative' }}>
                {/* Left — number + line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#111',
                    flexShrink: 0,
                    boxShadow: '0 4px 20px rgba(172,3,59,0.35)',
                  }}>{step.num}</div>
                  {i < steps.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: 'rgba(172,3,59,0.2)', marginTop: 8 }} />
                  )}
                </div>
                {/* Right — content */}
                <div style={{ paddingTop: 10 }}>
                  <h3 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 8px' }}>{step.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUCT CATEGORIES ════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Available Categories</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,48px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 40px' }}>
            Products available for private label
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(130px,14vw,180px), 1fr))', gap: 16, marginBottom: 32 }}>
            {productCats.map(cat => (
              <div key={cat.name} style={{
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 14,
                padding: '24px 16px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                transition: 'all 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.05)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = 'rgba(0,0,0,0.03)'; }}
              >
                <span style={{ fontSize: 32 }}>{cat.icon}</span>
                <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{cat.name}</span>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.4)' }}>
            500+ products available for private labelling. Don&apos;t see yours?{' '}
            <a href="#contact-form" style={{ color: CRIMSON, textDecoration: 'none' }}>Ask us →</a>
          </p>
        </div>
      </section>

      {/* ══ COMPARISON TABLE ══════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>Why It Matters</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,48px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Why our in-house team matters
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.4)', textAlign: 'center', margin: '0 0 36px' }}>
            Every step happens under one roof — no hand-offs, no finger-pointing.
          </p>

          <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(172,3,59,0.15)', borderBottom: '1px solid rgba(172,3,59,0.25)' }}>
              {['Capability', 'LV Spices', 'Typical Exporter'].map((h, i) => (
                <div key={h} style={{
                  fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                  padding: '16px 20px',
                  color: i === 1 ? CRIMSON : 'rgba(255,255,255,0.5)',
                  fontWeight: 700,
                }}>{h}</div>
              ))}
            </div>
            {/* Rows */}
            {compRows.map((row, i) => (
              <div key={row.cap} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: i < compRows.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
              }}>
                <div style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.6)', padding: '16px 20px' }}>{row.cap}</div>
                <div style={{ fontFamily: SANS, fontSize: 13.5, color: '#4ade80', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 700 }}>✓</span> {row.lv}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(255,100,100,0.7)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>✗</span> {row.typical}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIAL ═══════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)',
        background: `linear-gradient(135deg, rgba(172,3,59,0.08) 0%, rgba(0,0,0,0) 100%)`,
        borderTop: '1px solid rgba(172,3,59,0.12)',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: `linear-gradient(135deg, ${CRIMSON}, #6B0025)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: '#111',
            margin: '0 auto 20px',
          }}>P</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 20 }}>
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: CRIMSON, fontSize: 18 }}>★</span>)}
          </div>
          <blockquote style={{
            fontFamily: SERIF, fontSize: 'clamp(16px,1.8vw,22px)', fontStyle: 'italic',
            color: 'rgba(255,255,255,0.8)', lineHeight: 1.65, margin: '0 0 24px',
          }}>
            {testimonial.text}
          </blockquote>
          <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 4 }}>{testimonial.name}</div>
          <div style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(0,0,0,0.4)' }}>{testimonial.company}</div>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: CRIMSON, marginTop: 4 }}>{testimonial.location}</div>
        </div>
      </section>

      {/* ══ CONTACT FORM ══════════════════════════════════════ */}
      <section id="contact-form" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>Get Started</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3.5vw,48px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Ready to launch your brand?
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.4)', textAlign: 'center', margin: '0 0 40px' }}>
            Tell us about your vision. Our team will get back within 24 hours.
          </p>

          {sent ? (
            <div style={{
              background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)',
              borderRadius: 16, padding: '40px 32px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: SERIF, fontSize: 24, color: '#4ade80', margin: '0 0 12px' }}>Request Received!</h3>
              <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 20, padding: 'clamp(24px,4vw,48px)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                {[
                  { key: 'name', label: 'Full Name *', placeholder: 'Jane Doe', type: 'text' },
                  { key: 'company', label: 'Company *', placeholder: 'Acme Foods Ltd', type: 'text' },
                  { key: 'country', label: 'Country *', placeholder: 'United Kingdom', type: 'text' },
                  { key: 'email', label: 'Email *', placeholder: 'you@company.com', type: 'email' },
                  { key: 'whatsapp', label: 'WhatsApp', placeholder: '+44 (0) 0000 0000', type: 'tel' },
                  { key: 'products', label: 'Products of Interest', placeholder: 'e.g. Spices, snacks, tea', type: 'text' },
                ].map(f => (
                  <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      style={{
                        fontFamily: SANS, fontSize: 13.5,
                        background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10, padding: '12px 16px', color: '#111', outline: 'none',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 28 }}>
                <label style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your brand vision, target market, and any specific products you have in mind."
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  style={{
                    fontFamily: SANS, fontSize: 13.5,
                    background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10, padding: '12px 16px', color: '#111', outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <p style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(0,0,0,0.3)', margin: 0 }}>
                  We never share your details. Reply within 24 hours.
                </p>
                <button type="submit" style={{
                  fontFamily: SANS, fontSize: 14, fontWeight: 600, letterSpacing: '0.04em',
                  background: CRIMSON, color: '#111', padding: '14px 32px', borderRadius: 999,
                  border: 'none', cursor: 'pointer', transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                >
                  Request Private Label Consultation →
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </main>
  );
}
