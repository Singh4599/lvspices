'use client';

import { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const features = [
  { icon: '🎨', title: 'In-House Design Team', desc: 'Our designers create your packaging artwork, labels, and brand identity — ready for print in any country.' },
  { icon: '📦', title: 'In-House Packing Unit', desc: 'Products are packed in our own facility under strict quality control — zero outsourcing.' },
  { icon: '⚖️', title: 'All Pack Sizes', desc: '100g to 5kg, pouches, boxes, jars — we handle every format for retail, HoReCa, and bulk.' },
  { icon: '✅', title: 'FSSAI & Export Compliant Labels', desc: 'All labels meet destination-country food labelling regulations — GCC, UK, USA, EU and more.' },
  { icon: '🌍', title: 'Any Market, Any Country', desc: 'We understand labelling requirements for 40+ markets. Your product, their regulations — handled.' },
  { icon: '💻', title: 'IT & Tech Support', desc: 'Our in-house IT team can set up your product listings, barcode systems, and ordering workflows.' },
];

const steps = [
  { num: '01', title: 'You Share Your Brand Vision', desc: 'Tell us your brand story, target market, and the products you want to launch.' },
  { num: '02', title: 'Our Design Team Creates Packaging Artwork', desc: 'Concepts, mockups, and final print-ready files — built by our in-house team.' },
  { num: '03', title: 'You Approve the Design', desc: 'Iterate as much as you need. We move only after you sign off.' },
  { num: '04', title: 'We Source & Pack Your Products', desc: 'Pan-India sourcing, our facility, your brand on every pack.' },
  { num: '05', title: 'Quality Check & Compliance Verified', desc: 'Lab-tested batches and labels validated for your destination market.' },
  { num: '06', title: 'Shipped Under Your Brand', desc: 'Container loaded, documents prepared, and tracking handed over.' },
];

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

const compRows = [
  { cap: 'Design Team', lv: 'In-house', typical: 'Outsourced' },
  { cap: 'Packing Unit', lv: 'In-house', typical: 'Third party' },
  { cap: 'IT Support', lv: 'In-house', typical: 'None' },
  { cap: 'Label Compliance', lv: 'Handled', typical: 'Your problem' },
  { cap: 'Turnaround Time', lv: 'Fast', typical: 'Slow' },
  { cap: 'MOQ', lv: 'Flexible', typical: 'High' },
  { cap: 'Certifications', lv: 'FDA, EU, FSSAI', typical: 'Limited' },
];

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
      <PageHero
        tag="Private Labelling"
        heading="Launch Your Own"
        headingRed="Spice Brand."
        subCopy="From sourcing to design to packing — we build your brand for you. Your customers see your brand. We do all the work behind the scenes."
        imageSrc="/images/technology-hero.png" // using a placeholder hero image
        imageAlt="LV Spices Private Labelling"
        overlay="gradient-up"
      />

      {/* ══ VELOCITY MARQUEE ══════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ WHAT IS PL ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <ScrollReveal fromY={24}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 20 }}>What is Private Labelling</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 24px' }}>
              Your brand on the front.<br />
              <span style={{ fontStyle: 'italic', color: CRIMSON }}>Our work behind it.</span>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, margin: 0 }}>
              We source the finest Indian spices, pack them under your brand name and design, and ship them to your market. Your customers see your brand. We do all the work behind the scenes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ FEATURES ══════════════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={16}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>What We Offer</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3vw,44px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 48px' }}>
              Everything you need under one roof
            </h2>
          </ScrollReveal>

          <StaggerReveal stagger={0.05} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px,28vw,340px), 1fr))', gap: 24 }}>
            {features.map(f => (
              <div key={f.title} style={{
                background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16, padding: '32px 28px', transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(172,3,59,0.3)'; el.style.background = 'rgba(172,3,59,0.03)'; el.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.06)'; el.style.background = 'rgba(0,0,0,0.02)'; el.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 12px' }}>{f.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.5)', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ STEPS ══════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <ScrollReveal fromY={20}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>How It Works</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.5vw,52px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 56px' }}>
              From vision to shipped container<br />in 6 simple steps
            </h2>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} fromY={16} delay={i * 0.05} style={{ display: 'flex', gap: 'clamp(20px,4vw,32px)', paddingBottom: i < steps.length - 1 ? 40 : 0, position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%', background: CRIMSON,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#fff',
                    boxShadow: '0 4px 16px rgba(172,3,59,0.3)',
                  }}>{step.num}</div>
                  {i < steps.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(172,3,59,0.15)', marginTop: 12 }} />}
                </div>
                <div style={{ paddingTop: 12 }}>
                  <h3 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 700, color: '#111', margin: '0 0 8px' }}>{step.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 14.5, color: 'rgba(0,0,0,0.5)', lineHeight: 1.7, margin: 0, maxWidth: 500 }}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUCT CATEGORIES ════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={20}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>Available Categories</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 48px' }}>
              Products available for private label
            </h2>
          </ScrollReveal>

          <StaggerReveal stagger={0.03} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(140px,16vw,200px), 1fr))', gap: 16, marginBottom: 40 }}>
            {productCats.map(cat => (
              <div key={cat.name} style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '28px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = CRIMSON; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 12px 30px rgba(172,3,59,0.08)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.08)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
              >
                <span style={{ fontSize: 36 }}>{cat.icon}</span>
                <span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 600, color: '#111' }}>{cat.name}</span>
              </div>
            ))}
          </StaggerReveal>

          <ScrollReveal fromY={16}>
            <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>
              500+ products available for private labelling. Don't see yours?{' '}
              <a href="#contact-form" style={{ color: CRIMSON, textDecoration: 'none', fontWeight: 600 }}>Ask us →</a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ COMPARISON TABLE ══════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <ScrollReveal fromY={24}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>Why It Matters</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
              Why our in-house team matters
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 15, color: 'rgba(0,0,0,0.5)', textAlign: 'center', margin: '0 0 48px' }}>
              Every step happens under one roof — no hand-offs, no finger-pointing.
            </p>
          </ScrollReveal>

          <ScrollReveal fromY={16}>
            <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, overflow: 'hidden', background: '#fff' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(172,3,59,0.06)', borderBottom: '1px solid rgba(172,3,59,0.15)' }}>
                {['Capability', 'LV Spices', 'Typical Exporter'].map((h, i) => (
                  <div key={h} style={{
                    fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                    padding: '20px 24px', color: i === 1 ? CRIMSON : 'rgba(0,0,0,0.4)', fontWeight: 700,
                  }}>{h}</div>
                ))}
              </div>
              {compRows.map((row, i) => (
                <div key={row.cap} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                  borderBottom: i < compRows.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                }}>
                  <div style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.6)', padding: '20px 24px' }}>{row.cap}</div>
                  <div style={{ fontFamily: SANS, fontSize: 14, color: CRIMSON, fontWeight: 600, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span>✓</span> {row.lv}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.3)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span>✗</span> {row.typical}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ CONTACT FORM ══════════════════════════════════════ */}
      <section id="contact-form" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <ScrollReveal fromY={24}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>Get Started</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
              Ready to launch your brand?
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 15, color: 'rgba(0,0,0,0.5)', textAlign: 'center', margin: '0 0 48px' }}>
              Tell us about your vision. Our team will get back within 24 hours.
            </p>
          </ScrollReveal>

          {sent ? (
            <ScrollReveal fromY={16} style={{ background: '#fff', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 20, padding: '48px 32px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
              <h3 style={{ fontFamily: SERIF, fontSize: 28, color: '#111', margin: '0 0 12px' }}>Request Received!</h3>
              <p style={{ fontFamily: SANS, fontSize: 15, color: 'rgba(0,0,0,0.5)' }}>We'll be in touch within 24 hours to discuss your private label requirements.</p>
            </ScrollReveal>
          ) : (
            <ScrollReveal fromY={20}>
              <form onSubmit={handleSubmit} style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 24, padding: 'clamp(32px,5vw,48px)', boxShadow: '0 12px 40px rgba(0,0,0,0.03)',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 24 }}>
                  {[
                    { key: 'name', label: 'Full Name *', placeholder: 'Jane Doe', type: 'text' },
                    { key: 'company', label: 'Company *', placeholder: 'Acme Foods Ltd', type: 'text' },
                    { key: 'country', label: 'Country *', placeholder: 'United Kingdom', type: 'text' },
                    { key: 'email', label: 'Email *', placeholder: 'you@company.com', type: 'email' },
                    { key: 'whatsapp', label: 'WhatsApp', placeholder: '+44 (0) 0000 0000', type: 'tel' },
                    { key: 'products', label: 'Products of Interest', placeholder: 'e.g. Spices, snacks, tea', type: 'text' },
                  ].map(f => (
                    <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>{f.label}</label>
                      <input
                        type={f.type} placeholder={f.placeholder} required={f.label.includes('*')}
                        value={form[f.key as keyof typeof form]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        style={{
                          fontFamily: SANS, fontSize: 14, background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)',
                          borderRadius: 12, padding: '14px 18px', color: '#111', outline: 'none', transition: 'border-color 0.2s',
                        }}
                        onFocus={e => (e.target.style.borderColor = CRIMSON)}
                        onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                  <label style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>Message</label>
                  <textarea
                    rows={4} placeholder="Tell us about your brand vision, target market, and any specific products you have in mind."
                    value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    style={{
                      fontFamily: SANS, fontSize: 14, background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: 12, padding: '14px 18px', color: '#111', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => (e.target.style.borderColor = CRIMSON)}
                    onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                  <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.4)', margin: 0 }}>We reply within 24 hours.</p>
                  <button type="submit" style={{
                    fontFamily: SANS, fontSize: 15, fontWeight: 600, letterSpacing: '0.04em', background: CRIMSON, color: '#fff',
                    padding: '16px 36px', borderRadius: 999, border: 'none', cursor: 'pointer', transition: 'all 0.25s',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(172,3,59,0.3)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
                  >
                    Submit Request →
                  </button>
                </div>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>

    </main>
  );
}
