'use client';

import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const featuredTestimonial = {
  quote: "We have been working with LV Spices for some time now and have consistently been impressed by their professionalism and efficiency. Their team is incredibly easy to work with, providing great service and ensuring smooth transactions every step of the way. Their fast response times and commitment to excellence have made our partnership a seamless and productive experience.",
  author: "Purchase Director",
  role: "New Zealand",
};

const gridTestimonials = [
  {
    flag: "🇺🇸", country: "USA",
    text: "We want you to know that we are very pleased with the quality supplied by LV Spices. We sincerely appreciate your responsiveness and the way you conduct business. We look forward to doing business with you for years to come.",
    author: "Grocery Distributor",
  },
  {
    flag: "🇨🇦", country: "Canada",
    text: "Thank you for your timely deliveries. In our business we must get our products to our warehouses on a regular schedule. We rely on dependable service from suppliers like LV Spices to help us keep our schedule and satisfy our customers.",
    author: "Wholesale Distributor",
  },
  {
    flag: "🇦🇪", country: "UAE",
    text: "We are regularly importing Chilli and Cumin from LV Spices, and appreciate their quality of goods delivered. We are glad to work with them as customers' products are having good demand in the international market.",
    author: "Spice Importer",
  },
];

const certifications = [
  { name: 'FSSAI', label: 'Food Safety and Standards' },
  { name: 'ISO 22000', label: 'Food Safety Management' },
  { name: 'FSSC 22000', label: 'GFSI Recognized Standard' },
  { name: 'HACCP', label: 'Hazard Analysis CCP' },
  { name: 'NABL', label: 'ISO/IEC 17025:2017 Lab' },
  { name: 'BRC Tier 2', label: 'BRC Global Food Safety' },
  { name: 'Spices Board', label: 'India Registered' },
  { name: 'APEDA', label: 'Agricultural Export' },
];

const countries = ['🇺🇸 USA', '🇬🇧 UK', '🇩🇪 Germany', '🇫🇷 France', '🇯🇵 Japan', '🇦🇺 Australia', '🇨🇦 Canada', '🇦🇪 UAE', '🇳🇿 New Zealand', '🇸🇬 Singapore'];

export default function TestimonialsPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <PageHero
        tag="Testimonials"
        heading="Trusted By"
        headingRed="The World."
        subCopy="For over five decades, we have built lasting partnerships with food manufacturers, distributors, and importers across 40+ countries."
        imageSrc="/images/farm-editorial.png"
        imageAlt="LV Spices Global Clients"
        overlay="gradient-up"
        textAlign="center"
        stats={[
          { value: '50+', label: 'Years of Trust' },
          { value: '40+', label: 'Countries' },
          { value: '500+', label: 'Products' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE ══════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ FEATURED TESTIMONIAL ═══════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 920, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={20}>
            {/* Big quote mark */}
            <div style={{ fontFamily: SERIF, fontSize: 120, color: CRIMSON, lineHeight: 0.5, marginBottom: 32, opacity: 0.15, userSelect: 'none' }}>"</div>
          </ScrollReveal>
          <ScrollReveal fromY={24} delay={0.1}>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(18px,2.2vw,28px)', color: '#111', lineHeight: 1.65, fontWeight: 300, marginBottom: 40, fontStyle: 'italic' }}>
              "{featuredTestimonial.quote}"
            </p>
          </ScrollReveal>
          <ScrollReveal fromY={16} delay={0.2}>
            <div style={{
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              padding: '16px 28px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.18)',
              borderRadius: 12,
            }}>
              <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#111' }}>
                {featuredTestimonial.author}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase' }}>
                {featuredTestimonial.role}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ COUNTRIES MARQUEE STRIP ════════════════════════════ */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', background: '#fafafa', overflow: 'hidden', padding: '16px 0' }}>
        <div style={{ display: 'flex', gap: 40, animation: 'marqueeL 20s linear infinite', width: 'max-content' }}>
          {[...countries, ...countries].map((c, i) => (
            <span key={i} style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>{c}</span>
          ))}
        </div>
        <style>{`@keyframes marqueeL { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* ══ GRID TESTIMONIALS ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#111' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D0375C', marginBottom: 16 }}>Global Partnerships</div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
                Voices From Across The Globe
              </h2>
            </div>
          </ScrollReveal>

          <StaggerReveal stagger={0.12} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {gridTestimonials.map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20, padding: 'clamp(28px,4vw,44px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-6px)'; el.style.borderColor = 'rgba(172,3,59,0.4)'; el.style.background = 'rgba(172,3,59,0.08)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.background = 'rgba(255,255,255,0.04)'; }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.flag}</div>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D0375C', marginBottom: 16 }}>{item.country}</div>
                <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, margin: '0 0 28px', flexGrow: 1 }}>
                  "{item.text}"
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, width: '100%' }}>
                  <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#fff' }}>{item.author}</div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ VELOCITY DIVIDER ══════════════════════════════════ */}
      <VelocityMarquee />

      {/* ══ CERTIFICATIONS ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={30}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
              A Testament to Our Quality Standards
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,15px)', color: 'rgba(0,0,0,0.5)', maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.7 }}>
              We've earned certifications that matter. Standards that prove we do things right — recognised globally by the world's most respected authorities.
            </p>
          </ScrollReveal>

          <StaggerReveal stagger={0.07} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {certifications.map(cert => (
              <div key={cert.name} style={{
                background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 14, padding: '24px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                minHeight: 110, transition: 'all 0.25s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = CRIMSON; el.style.background = 'rgba(172,3,59,0.04)'; el.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.08)'; el.style.background = '#fafafa'; el.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 8, textAlign: 'center' }}>{cert.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(0,0,0,0.45)', textAlign: 'center', lineHeight: 1.4 }}>{cert.label}</div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

    </main>
  );
}
