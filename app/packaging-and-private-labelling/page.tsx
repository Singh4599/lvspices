'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import ScrollExpansionHero from '@/components/ui/ScrollExpansionHero';
import PrivateLabelProcessHorizontal from '@/components/packaging/PrivateLabelProcessHorizontal';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const features = [
  { icon: '🎨', title: 'In-House Design Team', desc: 'Our designers create your packaging artwork, labels, and brand identity — ready for print in any country. Multiple concept rounds included.' },
  { icon: '📦', title: 'In-House Packing Unit', desc: 'Products are packed in our own facility under strict quality control — zero outsourcing, full traceability from farm to shelf.' },
  { icon: '⚖️', title: 'All Pack Sizes', desc: '50g to 25kg bags, standup pouches, boxes, jars, and bulk — we handle every format for retail, HoReCa, and industrial use.' },
  { icon: '✅', title: 'FSSAI & Export Labels', desc: 'All labels meet destination-country food labelling regulations — GCC, UK, USA, EU, Australia, Canada and more. Handled entirely by us.' },
  { icon: '🌍', title: 'Any Market, Any Country', desc: 'We understand labelling requirements for 40+ markets. Your product, their regulations — fully handled by our documentation team.' },
  { icon: '💻', title: 'IT & Tech Support', desc: 'Our in-house IT team can set up your product listings, barcode systems, EAN registration, and ordering workflows.' },
];


const productCats = [
  { icon: '🌶️', name: 'Spices', count: '150+ SKUs' },
  { icon: '🫘', name: 'Pulses', count: '30+ SKUs' },
  { icon: '🌾', name: 'Flours', count: '20+ SKUs' },
  { icon: '🍚', name: 'Rice', count: '15+ SKUs' },
  { icon: '🥜', name: 'Nuts & Dry Fruits', count: '25+ SKUs' },
  { icon: '🍿', name: 'Snacks', count: '40+ SKUs' },
  { icon: '🧄', name: 'Masalas', count: '80+ SKUs' },
  { icon: '🍵', name: 'Tea & Beverages', count: '20+ SKUs' },
];

const compRows = [
  { cap: 'Design Team', lv: 'In-house', typical: 'Outsourced' },
  { cap: 'Packing Unit', lv: 'In-house', typical: 'Third party' },
  { cap: 'IT Support', lv: 'In-house', typical: 'None' },
  { cap: 'Label Compliance', lv: 'Fully Handled', typical: 'Your problem' },
  { cap: 'Turnaround Time', lv: 'Fast (2–4 weeks)', typical: 'Slow (8–12 weeks)' },
  { cap: 'MOQ', lv: 'Flexible', typical: 'High MOQ' },
  { cap: 'Certifications', lv: 'FDA, EU, FSSAI, BRC', typical: 'Limited' },
];

function TiltCard({ children, bg = '#fff', border = 'rgba(0,0,0,0.07)' }: { children: React.ReactNode; bg?: string; border?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isD = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isD) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -9;
    const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 9;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
    el.style.boxShadow = `${-ry * 1.5}px ${rx * 1.5}px 36px rgba(172,3,59,0.12)`;
    el.style.borderColor = 'rgba(172,3,59,0.3)';
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    el.style.boxShadow = 'none';
    el.style.borderColor = border;
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ background: bg, border: `1px solid ${border}`, borderRadius: 16, padding: 'clamp(24px,3vw,36px)', willChange: 'transform', transition: 'transform 0.12s, box-shadow 0.12s, border-color 0.12s' }}>
      {children}
    </div>
  );
}

export default function PrivateLabelPage() {
  const [form, setForm] = useState({ name: '', company: '', country: '', email: '', whatsapp: '', products: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 18px', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12,
    fontSize: 14, fontFamily: SANS, color: '#111', background: '#fafafa', outline: 'none', transition: 'border-color 200ms ease', boxSizing: 'border-box',
  };

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflowX: 'hidden' }}>

      {/* ══ SCROLL EXPANSION HERO ════════════════════════════════ */}
      <ScrollExpansionHero
        badge="Private Labelling"
        headingText="Launch Your Own"
        headingRed="Spice Brand."
        subText="India's leading private label spice manufacturer \u2014 OEM, white label, and custom-branded spice packs for retail, HoReCa, and wholesale buyers. FSSC 22000 certified. Export-ready for 40+ countries."
        imageSrc="/images/products.png"
        stats={[
          { value: '500+', label: 'Products Available' },
          { value: '40+', label: 'Country Labels' },
          { value: '100%', label: 'In-House' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE ════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ WHAT IS PL ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <ScrollReveal fromY={24}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 20 }}>What is Private Labelling</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 24px' }}>
              Your brand on the front.<br />
              <em style={{ fontStyle: 'italic', color: CRIMSON }}>Our work behind it.</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85, margin: 0 }}>
              We source the finest Indian spices, process them at our FSSC 22000-certified plant, pack them under your brand name and design, and ship them to your market — with full export documentation. Your customers see your brand. We do all the work behind the scenes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ FEATURES — TILT CARDS ════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(80px,10vw,130px)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <ScrollReveal fromY={16} style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,64px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>What We Offer</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
              Everything Under<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>One Roof</em>
            </h2>
          </ScrollReveal>
          <StaggerReveal stagger={0.06} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'clamp(14px,1.8vw,24px)' }}>
            {features.map(f => (
              <TiltCard key={f.title} bg="rgba(0,0,0,0.02)" border="rgba(0,0,0,0.06)">
                <div style={{ fontSize: 30, marginBottom: 18, display: 'inline-flex', width: 52, height: 52, alignItems: 'center', justifyContent: 'center', borderRadius: 14, background: 'rgba(172,3,59,0.07)', border: '1px solid rgba(172,3,59,0.15)' }}>{f.icon}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#111', margin: '0 0 10px' }}>{f.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
              </TiltCard>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <PrivateLabelProcessHorizontal />

      {/* ══ PRODUCT CATEGORIES ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={20} style={{ marginBottom: 'clamp(40px,5vw,64px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>Available Categories</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: 0 }}>
              500+ Products for<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>Private Label</em>
            </h2>
          </ScrollReveal>
          <StaggerReveal stagger={0.04} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))', gap: 16, marginBottom: 40 }}>
            {productCats.map(cat => (
              <div key={cat.name} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '28px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = CRIMSON; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 12px 30px rgba(172,3,59,0.1)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.08)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                <span style={{ fontSize: 32 }}>{cat.icon}</span>
                <div>
                  <div style={{ fontFamily: SANS, fontSize: 13.5, fontWeight: 700, color: '#111', marginBottom: 4 }}>{cat.name}</div>
                  <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: CRIMSON }}>{cat.count}</div>
                </div>
              </div>
            ))}
          </StaggerReveal>
          <ScrollReveal fromY={16}>
            <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>
              Don't see your category?{' '}
              <a href="#contact-form" style={{ color: CRIMSON, textDecoration: 'none', fontWeight: 600 }}>Ask us — we likely have it →</a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ COMPARISON TABLE ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,64px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>Why It Matters</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              Why Our In-House<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>Team Matters</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 15, color: 'rgba(0,0,0,0.5)', maxWidth: 560, margin: '0 auto' }}>Every step happens under one roof — no hand-offs, no finger-pointing, no surprises.</p>
          </ScrollReveal>
          <ScrollReveal fromY={16}>
            <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 20, overflow: 'hidden', background: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(172,3,59,0.06)', borderBottom: '1px solid rgba(172,3,59,0.12)' }}>
                {['Capability', 'LV Spices', 'Typical Exporter'].map((h, i) => (
                  <div key={h} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '20px 24px', color: i === 1 ? CRIMSON : 'rgba(0,0,0,0.4)', fontWeight: 700 }}>{h}</div>
                ))}
              </div>
              {compRows.map((row, i) => (
                <div key={row.cap} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < compRows.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(172,3,59,0.02)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.6)', padding: '18px 24px' }}>{row.cap}</div>
                  <div style={{ fontFamily: SANS, fontSize: 13.5, color: CRIMSON, fontWeight: 600, padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(172,3,59,0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: CRIMSON, flexShrink: 0 }}>✓</span>{row.lv}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.3)', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(0,0,0,0.04)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(0,0,0,0.3)', flexShrink: 0 }}>✗</span>{row.typical}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ CURVED LOOP ══════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingTop: 'clamp(16px,2vw,32px)', paddingBottom: 'clamp(40px,6vw,80px)' }}>
        <CurvedLoop marqueeText="PRIVATE LABELLING • CUSTOM PACKAGING • YOUR BRAND • 500+ PRODUCTS • " speed={1.5} curveAmount={250} className="fill-[#111] uppercase font-mono tracking-widest" />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <text style={{ fontSize: 'clamp(28px,4vw,56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
          <text style={{ fontSize: 'clamp(9px,1vw,14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>

      {/* ══ CONTACT FORM ════════════════════════════════════════ */}
      <section id="contact-form" style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,56px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>Get Started</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              Ready to Launch<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>Your Brand?</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 15, color: 'rgba(0,0,0,0.5)' }}>Tell us about your vision. Our team will get back within 24 hours.</p>
          </ScrollReveal>

          {sent ? (
            <ScrollReveal fromY={16} style={{ background: '#fff', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 24, padding: '56px 32px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 52, marginBottom: 24 }}>✅</div>
              <h3 style={{ fontFamily: SERIF, fontSize: 28, color: '#111', margin: '0 0 12px' }}>Request Received!</h3>
              <p style={{ fontFamily: SANS, fontSize: 15, color: 'rgba(0,0,0,0.5)' }}>We'll be in touch within 24 hours to discuss your private label requirements.</p>
            </ScrollReveal>
          ) : (
            <ScrollReveal fromY={20}>
              <form onSubmit={handleSubmit} style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 24, padding: 'clamp(32px,5vw,52px)', boxShadow: '0 12px 40px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 20 }}>
                  {[
                    { key: 'name', label: 'Full Name *', placeholder: 'Jane Doe', type: 'text' },
                    { key: 'company', label: 'Company *', placeholder: 'Acme Foods Ltd', type: 'text' },
                    { key: 'country', label: 'Country *', placeholder: 'United Kingdom', type: 'text' },
                    { key: 'email', label: 'Email *', placeholder: 'you@company.com', type: 'email' },
                    { key: 'whatsapp', label: 'WhatsApp', placeholder: '+44 (0) 0000 0000', type: 'tel' },
                    { key: 'products', label: 'Products of Interest', placeholder: 'e.g. Spices, masalas, tea', type: 'text' },
                  ].map(f => (
                    <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} required={f.label.includes('*')} value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ ...inputStyle, background: '#fff' }}
                        onFocus={e => (e.target.style.borderColor = CRIMSON)}
                        onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')} />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
                  <label style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>Message</label>
                  <textarea rows={4} placeholder="Tell us about your brand vision, target market, pack sizes, and any specific products you have in mind." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'vertical', background: '#fff' }}
                    onFocus={e => (e.target.style.borderColor = CRIMSON)}
                    onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                  <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.4)', margin: 0 }}>We reply within 24 hours.</p>
                  <button type="submit" style={{ fontFamily: SANS, fontSize: 15, fontWeight: 600, background: CRIMSON, color: '#fff', padding: '16px 40px', borderRadius: 999, border: 'none', cursor: 'pointer', transition: 'all 0.25s' }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(172,3,59,0.3)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
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
