'use client';

import Image from 'next/image';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── Testimonials Data ────────────────────────────────────── */
const featuredTestimonial = {
  quote: "We have been working with LV Spices for some time now and have consistently been impressed by their professionalism and efficiency. Their team is incredibly easy to work with, providing great service and ensuring smooth transactions every step of the way. LV Spices demonstrates a deep understanding of our needs and handles each interaction with attention to detail and compliance. Their fast response times and commitment to excellence have made our partnership a seamless and productive experience. We highly value their support and look forward to a long and successful business relationship.",
  author: "Jon Doe", // Placeholder name based on the screenshot
  role: "Purchase Director, New Zealand",
};

const gridTestimonials = [
  {
    flag: "🇺🇸",
    country: "USA",
    text: "We want you to know that we are very pleased with the quality supplied by LV Spices. We sincerely appreciate your responsiveness and the way you conduct business. We are highly pleased with your company because of our satisfaction with your product supplies. We look forward to doing business with you for years to come.",
    author: "Grocery Distributor",
  },
  {
    flag: "🇨🇦",
    country: "Canada",
    text: "Thank you for your timely deliveries of ordered products. In our business we must get our products to our warehouses on a regular schedule. We rely on dependable service from suppliers like LV Spices to help us keep our schedule and satisfy our customers. We want you to know that we appreciate your efforts and look forward to continuing our business relationship.",
    author: "Wholesale Distributor",
  },
  {
    flag: "🇦🇪", // Using UAE as representative for Middle East
    country: "UAE",
    text: "We are regularly importing Chilli and Cumin from LV Spices, and appreciate their quality of goods delivered. We are glad to work with them as customers' products are having good demand and response in the international market as well as the domestic market.",
    author: "Spice Importer",
  },
];

/* ── Certifications Data ──────────────────────────────────── */
const certifications = [
  { name: 'FSSAI', label: 'Food Safety and Standards Authority of India' },
  { name: 'ISO 22000:2018', label: 'Food Safety Management System' },
  { name: 'FSSC 22000', label: 'GFSI Recognized Food Safety Standard' },
  { name: 'HACCP', label: 'Hazard Analysis Critical Control Point' },
  { name: 'NABL', label: 'ISO/IEC 17025:2017 Accredited Laboratory' },
  { name: 'BRC Tier 2', label: 'BRC Global Standard for Food Safety' },
  { name: 'Spices Board', label: 'Spices Board of India Registered' },
  { name: 'APEDA', label: 'Agricultural & Processed Food Products' },
];

/* ─────────────────────────────────────────────────────────── */

export default function TestimonialsPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ 
        padding: 'clamp(100px, 12vw, 160px) clamp(24px, 5vw, 80px) clamp(60px, 8vw, 100px)',
        textAlign: 'center',
        background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(172,3,59,0.1) 0%, transparent 80%)',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 20 }}>
            Testimonials
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 24px', lineHeight: 1.1 }}>
            What Our Clients Say
          </h1>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px, 1.2vw, 16px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.7 }}>
            For over five decades, we have built lasting partnerships with food manufacturers, distributors, and importers across 40+ countries. Here is what they have to say about working with LV Spices.
          </p>
        </div>
      </section>

      {/* ══ FEATURED TESTIMONIAL (Centra Style) ═══════════════ */}
      <section style={{ padding: '0 clamp(24px, 5vw, 80px) clamp(60px, 8vw, 100px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          {/* Quote Icon */}
          <div style={{ 
            fontFamily: SERIF, fontSize: 80, color: CRIMSON, lineHeight: 0.5, 
            marginBottom: 32, opacity: 0.8 
          }}>
            “
          </div>
          
          <p style={{ 
            fontFamily: SANS, fontSize: 'clamp(16px, 2vw, 24px)', color: '#111', 
            lineHeight: 1.6, fontWeight: 300, marginBottom: 40 
          }}>
            {featuredTestimonial.quote}
          </p>
          
          <div>
            <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 4 }}>
              {featuredTestimonial.author}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.05em', color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase' }}>
              {featuredTestimonial.role}
            </div>
          </div>
        </div>
      </section>

      {/* ══ GRID TESTIMONIALS (Om Shree Style) ════════════════ */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)', background: 'rgba(0,0,0,0.02)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: 0 }}>
              Global Partnerships
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {gridTestimonials.map((item, i) => (
              <div key={i} style={{ 
                background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 16, padding: 'clamp(32px, 4vw, 48px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                transition: 'transform 0.3s, border-color 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.borderColor = 'rgba(172,3,59,0.3)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.borderColor = 'rgba(0,0,0,0.07)'; }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.flag}</div>
                
                <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, margin: '0 0 32px', flexGrow: 1 }}>
                  "{item.text}"
                </p>
                
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, width: '100%' }}>
                  <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 4 }}>
                    {item.author}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase' }}>
                    {item.country}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══ CERTIFICATIONS & RECOGNITION ══════════════════════ */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
            A Testament to Our Quality Standards
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px, 1.2vw, 15px)', color: 'rgba(0,0,0,0.5)', maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.7 }}>
            We've earned certifications that matter in this business. Standards that prove we do things right. Our commitment to excellence has been recognised globally.
          </p>

          {/* Grid of Certifications */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {certifications.map(cert => (
              <div key={cert.name} style={{
                background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 12, padding: '24px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                minHeight: 120,
              }}>
                <div style={{ fontFamily: SANS, fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 8, textAlign: 'center' }}>
                  {cert.name}
                </div>
                <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(0,0,0,0.45)', textAlign: 'center', lineHeight: 1.4 }}>
                  {cert.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
