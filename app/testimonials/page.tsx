'use client';

import { useRef } from 'react';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import CurvedLoop from '@/components/ui/CurvedLoop';
import TestimonialHero from '@/components/testimonials/TestimonialHero';
import WorldTestimonialsMap from '@/components/testimonials/WorldTestimonialsMap';

const CRIMSON = '#111111';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const featuredTestimonial = {
  quote: "LV Spices has completely transformed our supply chain reliability. As a high-volume European distributor, we require uncompromising compliance with stringent EU pesticide limits, Aflatoxin controls, and microbiological safety standards. LV Spices not only meets these metrics with their in-house LC-MS/MS testing and BRCGS Grade AA facilities, but they provide full farm-to-port traceability. Their proactive documentation and unmatched cryogenic grinding quality make them the absolute gold standard for Indian spice exports.",
  author: "Chief Procurement Officer",
  role: "Global FMCG Conglomerate, Europe",
  flag: '🇪🇺',
};

const gridTestimonials = [
  { flag: '🇺🇸', country: 'USA', text: 'Their FDA-compliant steam sterilization and HTST processes give us complete peace of mind. LV Spices delivers pathogen-free, premium volatile oil content every single time.', author: 'National Grocery Distributor', highlight: 'FDA-compliant steam sterilization' },
  { flag: '🇨🇦', country: 'Canada', text: 'Customs clearance is never an issue. Their meticulous export documentation and adherence to North American food safety regulations ensure our supply chain never stops.', author: 'Wholesale Import Director', highlight: 'export documentation' },
  { flag: '🇦🇪', country: 'UAE', text: 'We demand premium visual and sensory profiles for the Middle Eastern market. Their Buhler Sortex optical cleaning guarantees 99.9% purity for our bulk cumin and cardamom imports.', author: 'Spice Trading Consortium', highlight: '99.9% purity' },
  { flag: '🇬🇧', country: 'UK', text: 'LV Spices is one of the few Indian exporters who truly understand stringent UK MRLs. Their proactive pesticide residue management protects our brand reputation.', author: 'Retail Brand Owner', highlight: 'pesticide residue management' },
  { flag: '🇦🇺', country: 'Australia', text: 'Australian biosecurity is notoriously strict, but LV Spices handles it flawlessly. Their comprehensive COAs and farm-level traceability records are industry-leading.', author: 'Health Food Manufacturer', highlight: 'farm-level traceability' },
  { flag: '🇩🇪', country: 'Germany', text: 'The cryogenic grinding technology they utilize dramatically improves the aroma and shelf life of our private label spices. They are now our exclusive European manufacturing partner.', author: 'FMCG Supply Chain VP', highlight: 'cryogenic grinding technology' },
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
    el.style.borderColor = 'rgba(17,17,17,0.4)';
    el.style.background = 'rgba(17,17,17,0.08)';
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
        <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'rgba(17,17,17,0.25)', color: '#D0375C', borderRadius: 999, padding: '4px 10px' }}>Verified Client</div>
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
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 28px', background: 'rgba(17,17,17,0.06)', border: '1px solid rgba(17,17,17,0.18)', borderRadius: 12 }}>
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
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = CRIMSON; el.style.background = 'rgba(17,17,17,0.05)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 10px 30px rgba(17,17,17,0.1)'; }}
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
