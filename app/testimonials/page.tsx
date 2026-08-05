'use client';

import { useRef } from 'react';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import TestimonialHero from '@/components/testimonials/TestimonialHero';
import WorldTestimonialsMap from '@/components/testimonials/WorldTestimonialsMap';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const featuredTestimonial = {
  quote: "We have been working with LV Spices for some time now and have consistently been impressed by their professionalism and efficiency. Their team is incredibly easy to work with, providing great service and ensuring smooth transactions every step of the way. Their fast response times and commitment to excellence have made our partnership a seamless and productive experience.",
  author: "Purchase Director",
  role: "New Zealand",
  flag: '🇳🇿',
};

const gridTestimonials = [
  { flag: '🇺🇸', country: 'USA', text: 'We want you to know that we are very pleased with the quality supplied by LV Spices. We sincerely appreciate your responsiveness and the way you conduct business. We look forward to doing business with you for years to come.', author: 'Grocery Distributor', highlight: 'quality supplied' },
  { flag: '🇨🇦', country: 'Canada', text: 'Thank you for your timely deliveries. In our business we must get our products to our warehouses on a regular schedule. We rely on dependable service from suppliers like LV Spices to help us keep our schedule and satisfy our customers.', author: 'Wholesale Distributor', highlight: 'timely deliveries' },
  { flag: '🇦🇪', country: 'UAE', text: 'We are regularly importing Chilli and Cumin from LV Spices, and appreciate their quality of goods delivered. We are glad to work with them as customers\' products are having good demand in the international market.', author: 'Spice Importer', highlight: 'international market' },
  { flag: '🇬🇧', country: 'UK', text: 'LV Spices consistently delivers premium quality products with full documentation. Their knowledge of UK and EU regulatory requirements for labelling and pesticide limits is second to none among Indian exporters.', author: 'Retail Brand Owner', highlight: 'regulatory requirements' },
  { flag: '🇦🇺', country: 'Australia', text: 'Having worked with many spice suppliers, LV stands out for their traceability systems. Every batch comes with a full COA and farm-level records. That transparency is priceless for us.', author: 'Health Food Brand', highlight: 'traceability systems' },
  { flag: '🇩🇪', country: 'Germany', text: 'We initially tested a small private label order. The quality and packaging were exceptional — we placed our annual contract within one month. LV Spices is now our exclusive spice supplier for the European market.', author: 'FMCG Distributor', highlight: 'exclusive spice supplier' },
];

const certifications = [
  { name: 'FSSAI', label: 'Food Safety & Standards' },
  { name: 'ISO 22000', label: 'Food Safety Management' },
  { name: 'FSSC 22000', label: 'GFSI Recognized Standard' },
  { name: 'HACCP', label: 'Hazard Analysis CCP' },
  { name: 'NABL', label: 'ISO/IEC 17025:2017 Lab' },
  { name: 'BRC Grade AA', label: 'BRC Global Food Safety' },
  { name: 'Spices Board', label: 'India Registered' },
  { name: 'APEDA', label: 'Agricultural Export' },
];

const countries = ['🇺🇸 USA', '🇬🇧 UK', '🇩🇪 Germany', '🇫🇷 France', '🇯🇵 Japan', '🇦🇺 Australia', '🇨🇦 Canada', '🇦🇪 UAE', '🇳🇿 New Zealand', '🇸🇬 Singapore', '🇳🇱 Netherlands', '🇧🇪 Belgium', '🇮🇹 Italy', '🇪🇸 Spain', '🇲🇾 Malaysia'];

function TiltTestimonialCard({ item }: { item: typeof gridTestimonials[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isD = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isD) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -8;
    const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 8;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
    el.style.borderColor = 'rgba(172,3,59,0.4)';
    el.style.background = 'rgba(172,3,59,0.08)';
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    el.style.borderColor = 'rgba(255,255,255,0.08)';
    el.style.background = 'rgba(255,255,255,0.04)';
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', willChange: 'transform', transition: 'transform 0.12s, background 0.2s, border-color 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 28 }}>{item.flag}</span>
        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#D0375C' }}>{item.country}</div>
      </div>
      <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, margin: '0 0 24px', flexGrow: 1, fontStyle: 'italic' }}>
        &ldquo;{item.text}&rdquo;
      </p>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#fff' }}>{item.author}</div>
        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'rgba(172,3,59,0.25)', color: '#D0375C', borderRadius: 999, padding: '4px 10px' }}>Verified Client</div>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflowX: 'hidden' }}>

      {/* ══ TESTIMONIAL HERO ═════════════════════════════════════ */}
      <TestimonialHero />

      {/* ══ VELOCITY MARQUEE ════════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ WORLD MAP TESTIMONIALS ══════════════════════════════ */}
      <WorldTestimonialsMap />

      {/* ══ FEATURED TESTIMONIAL ═════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={20}>
            <div style={{ fontSize: '🇳🇿'.length > 0 ? 40 : 0, marginBottom: 16 }}>{featuredTestimonial.flag}</div>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 32 }}>Featured Testimonial · {featuredTestimonial.role}</div>
          </ScrollReveal>
          <ScrollReveal fromY={24} delay={0.1}>
            <div style={{ fontFamily: SERIF, fontSize: 'clamp(80px,10vw,140px)', color: CRIMSON, lineHeight: 0.5, marginBottom: 32, opacity: 0.12, userSelect: 'none', textAlign: 'center' }}>&ldquo;</div>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(18px,2.2vw,28px)', color: '#111', lineHeight: 1.7, fontWeight: 300, margin: '0 0 40px', fontStyle: 'italic' }}>
              {featuredTestimonial.quote}
            </p>
          </ScrollReveal>
          <ScrollReveal fromY={16} delay={0.2}>
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 28px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.18)', borderRadius: 12 }}>
              <div style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#111' }}>{featuredTestimonial.author}</div>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase' }}>{featuredTestimonial.role}</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ COUNTRIES MARQUEE STRIP ══════════════════════════════ */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', background: '#fafafa', overflow: 'hidden', padding: '14px 0' }}>
        <div style={{ display: 'flex', gap: 48, animation: 'marqueeL 22s linear infinite', width: 'max-content', paddingRight: 48 }}>
          {[...countries, ...countries].map((c, i) => (
            <span key={i} style={{ fontFamily: SANS, fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>{c}</span>
          ))}
        </div>
      </div>

      {/* ══ GRID TESTIMONIALS — DARK, TILT ══════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#111' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <ScrollReveal fromY={30} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#D0375C', marginBottom: 14 }}>Global Partnerships</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: 0 }}>
              Voices From<br /><em style={{ color: '#D0375C', fontStyle: 'italic' }}>Across The Globe</em>
            </h2>
          </ScrollReveal>
          <StaggerReveal stagger={0.09} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 'clamp(14px,2vw,24px)' }}>
            {gridTestimonials.map((item, i) => (
              <TiltTestimonialCard key={i} item={item} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ VELOCITY DIVIDER ════════════════════════════════════ */}
      <VelocityMarquee />

      {/* ══ CERTIFICATIONS ══════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={30} style={{ marginBottom: 'clamp(48px,6vw,72px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 14 }}>Standards</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 20px' }}>
              A Testament to<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>Our Quality Standards</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(0,0,0,0.5)', maxWidth: 600, margin: '0 auto', lineHeight: 1.75 }}>
              We've earned certifications that matter — recognised globally by the world's most respected food safety authorities.
            </p>
          </ScrollReveal>
          <StaggerReveal stagger={0.06} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {certifications.map(cert => (
              <div key={cert.name} style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 110, transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = CRIMSON; el.style.background = 'rgba(172,3,59,0.05)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 10px 30px rgba(172,3,59,0.1)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.08)'; el.style.background = '#fafafa'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                <div style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 8, textAlign: 'center' }}>{cert.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(0,0,0,0.45)', textAlign: 'center', lineHeight: 1.4 }}>{cert.label}</div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ CURVED LOOP ══════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#fff', paddingTop: 'clamp(60px,8vw,100px)', paddingBottom: 'clamp(100px,12vw,180px)' }}>
        <CurvedLoop marqueeText="TESTIMONIALS • GLOBAL TRUST • 40+ NATIONS • 50 YEARS • " speed={1.5} curveAmount={250} className="fill-[#111] uppercase font-mono tracking-widest" />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <text style={{ fontSize: 'clamp(28px,4vw,56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
          <text style={{ fontSize: 'clamp(9px,1vw,14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>

      {/* ══ CTA ══════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: CRIMSON, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>TRUST</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={24}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5.5vw,80px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Join 48+ Brands<br />Who Trust LV Spices.
            </h2>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#fff', color: CRIMSON, fontFamily: SANS, fontWeight: 700, fontSize: 15, padding: '18px 40px', borderRadius: 999, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
              Start a Partnership →
            </a>
          </ScrollReveal>
        </div>
      </section>

      <style>{`@keyframes marqueeL { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>

    </main>
  );
}
