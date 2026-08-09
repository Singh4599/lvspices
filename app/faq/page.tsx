'use client';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ParallaxCard from '@/components/ui/ParallaxCard';
import FAQMindMap from '@/components/faq/FAQMindMap';

const CRIMSON = '#111111';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';



const faqCategories = [
  {
    category: 'About LV Spices',
    faqs: [
      { q: 'What makes LV Spices different from other spice brands?', a: 'LV Spices is recognised for clean sourcing, consistent quality, and a modern processing infrastructure. We use proprietary cryogenic grinding technology that operates at -150°C, preserving 40% more essential oils, natural colour, and aroma compared to conventional grinding.' },
      { q: 'What is Cryogenic Grinding and why does it matter for spices?', a: 'Cryogenic grinding is a process where spices are cooled to -150°C using liquid nitrogen before and during grinding. This prevents heat generation which would otherwise volatilise the essential oils responsible for flavour and aroma.' },
      { q: 'Where is LV Spices manufactured?', a: 'Our manufacturing facility is located in India. We operate 7+ processing units spread across 1,00,000 sq. ft. of built-up area, equipped with state-of-the-art processing technology.' },
      { q: 'Is LV Spices FSSAI certified and free from artificial additives?', a: 'Yes. LV Spices is fully FSSAI licensed and compliant. All our products are 100% free from artificial colours, flavours, and preservatives. We are also certified under ISO 22000:2018, HACCP, and FSSC 22000.' },
      { q: 'How is LV Spices different from other Indian spice exporters?', a: 'Unlike commodity exporters, we offer end-to-end services — from sourcing directly from farmers to delivering under your private label. Every step happens under one roof, which gives us full control over quality.' },
    ],
  },
  {
    category: 'Products & Range',
    faqs: [
      { q: 'What types of spices and masalas does LV Spices offer?', a: 'We offer a comprehensive range including whole spices, ground spices, blended masalas, seed spices, and chilli specialities. Our catalogue covers 500+ SKUs across categories.' },
      { q: 'What agricultural products do you export from India?', a: 'We specialise in Indian spices and spice products including whole spices (Chilli, Pepper, Cumin, Coriander, Turmeric, Cardamom, Cloves, Nutmeg), ground spices, blended masalas, and custom private label spice blends.' },
      { q: 'Which spices do you export in bulk?', a: 'We export all major Indian spices in bulk — Chilli (various grades), Turmeric, Coriander, Cumin, Black Pepper, Cardamom, Fenugreek, Mustard, Ginger, and specialty crops.' },
      { q: 'Do you offer Chilli Speciality products?', a: 'Yes. Chilli is one of our core specialities. We offer Byadagi, Kashmiri, S17, Teja, Reshampatti, and Guntur varieties in whole, crushed, and ground formats.' },
    ],
  },
  {
    category: 'Export & Supply',
    faqs: [
      { q: 'Which countries and regions do you export to?', a: 'We export to 40+ countries across GCC, Europe (UK, Germany, Netherlands, France), North America (USA, Canada), Africa, Southeast Asia, and Australia.' },
      { q: 'Who do you supply to?', a: 'We supply to retail spice brands, food manufacturers, restaurant chains and HoReCa distributors, private label importers, supermarket chains, and industrial food processors.' },
      { q: 'Does LV Spices ship across India and internationally?', a: 'Yes. We supply pan-India and export internationally, handling FCL and LCL shipments via sea freight, with air freight available for urgent or sample orders.' },
      { q: 'How can I request pricing or start an export inquiry?', a: 'Submit an inquiry through our Contact Us page or reach us directly via email or WhatsApp. Our export team will respond with a quotation within 24 hours.' },
    ],
  },
  {
    category: 'Private Label & Packaging',
    faqs: [
      { q: 'Do you offer private labelling and custom packaging?', a: 'Absolutely. Private labelling is one of our core services. We have an in-house design team, packing unit, and IT support to help you launch your own spice brand — all under one roof.' },
      { q: 'What pack sizes are available for private label orders?', a: 'We offer packaging in a wide range of formats — from 50g retail sachets and 100g–500g consumer packs, to 1kg, 5kg, 25kg, and 50kg bulk bags. We support pouches, jars, tins, and custom-format packaging.' },
      { q: 'Can you create a custom spice blend for our brand?', a: 'Yes. Our R&D team specialises in custom blend development. You share your target flavour profile, and we formulate a matching blend meeting your sensory specifications and regulatory requirements.' },
    ],
  },
  {
    category: 'Quality & Certifications',
    faqs: [
      { q: 'What certifications and quality standards do your products meet?', a: 'LV Spices holds FSSAI, ISO 9001:2015, ISO 22000:2018, FSSC 22000, HACCP, NABL, and Spices Board of India certifications. Our products comply with USFDA, EU Food Safety Regulations, and GCC standards.' },
      { q: 'Are your spices certified for export to global markets?', a: 'Yes. All our export products carry valid phytosanitary certificates, CoA, and health certificates as required by the destination country.' },
      { q: 'How do you maintain quality during shipping?', a: 'Finished goods are packed in nitrogen-flushed, food-grade packaging to prevent oxidation and moisture ingress. Temperature-monitored storage ensures integrity through the supply chain.' },
    ],
  },
  {
    category: 'Orders & MOQ',
    faqs: [
      { q: 'What is your minimum order quantity (MOQ)?', a: 'For bulk commodity orders the MOQ is typically 1 metric tonne (1000 kg). For private label orders the MOQ starts from 500 kg per SKU. Sample orders (1–5 kg) are available for evaluation purposes.' },
      { q: 'How should I store LV Spices products to maintain freshness?', a: 'Store in a cool, dry place away from direct sunlight and moisture. Whole spices maintain quality for up to 24 months. All packs carry detailed storage instructions and best-before dates.' },
      { q: 'Does LV Spices offer bulk or wholesale orders for businesses?', a: 'Yes. We actively supply to food manufacturers, distributors, and restaurant chains, offering competitive pricing for bulk orders and flexible payment terms for established buyers.' },
    ],
  },
];

export default function FAQPage() {
  const totalFAQs = faqCategories.reduce((acc, c) => acc + c.faqs.length, 0);

  // Build flat FAQ list for JSON-LD schema
  const allFAQsFlat = faqCategories.flatMap(cat =>
    cat.faqs.map(f => ({ question: f.q, answer: f.a }))
  );

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
  ];

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>
      {/* ── Structured Data: FAQPage + Breadcrumb (AEO/GEO) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(allFAQsFlat)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,100px) clamp(40px,5vw,60px)',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(17,17,17,0.08) 0%, transparent 70%)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal fromY={20}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(17,17,17,0.1)', border: '1px solid rgba(17,17,17,0.3)',
              borderRadius: 999, padding: '6px 18px', marginBottom: 24,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }} />
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: CRIMSON }}>Help Centre</span>
            </div>
          </ScrollReveal>

          <ScrollReveal fromY={28} delay={0.1}>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(48px,7vw,100px)', fontWeight: 800, color: '#111', lineHeight: 0.95, letterSpacing: '-0.04em', margin: '0 0 20px' }}>
              Frequently Asked<br />
              <span style={{ color: CRIMSON, fontStyle: 'italic' }}>Questions.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal fromY={16} delay={0.25}>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(0,0,0,0.5)', maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.75 }}>
              {totalFAQs} questions answered about our spice manufacturing, bulk supply, OEM, private label, export quality, and custom blend services. Can&apos;t find what you need? Our export team replies within 24 hours.
            </p>
            <a href="/contact" style={{
              display: 'inline-block', fontFamily: SANS, fontSize: 14, fontWeight: 600,
              background: CRIMSON, color: '#fff', padding: '13px 32px', borderRadius: 999,
              textDecoration: 'none', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(17,17,17,0.3)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
            >
              Talk to us →
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ VELOCITY MARQUEE ══════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ PARALLAX SECTION ═════════════════════════════════ */}
      <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)', background: '#fff' }}>
        <ParallaxCard
          imageSrc="/images/lab.png"
          tilt={false}
          parallaxStrength={0.2}
          style={{ height: 'clamp(300px, 40vh, 500px)', width: '100%', borderRadius: 24, border: 'none' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)', zIndex: 1 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: 'clamp(32px, 6vw, 80px)', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffb3c6', marginBottom: 16 }}>Knowledge Base</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', margin: 0, lineHeight: 1.1, maxWidth: 600 }}>We Have Answers</h2>
          </div>
        </ParallaxCard>
      </div>

      {/* ══ FAQ BODY ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,6vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <FAQMindMap faqData={faqCategories} />
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.06)', textAlign: 'center', background: '#fafafa' }}>
        <ScrollReveal fromY={24}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(22px,3vw,44px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Still have questions?
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 15, color: 'rgba(0,0,0,0.45)', margin: '0 0 28px' }}>
            Our export team typically replies within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{
              display: 'inline-block', fontFamily: SANS, fontSize: 14, fontWeight: 600,
              background: CRIMSON, color: '#fff', padding: '13px 32px', borderRadius: 999,
              textDecoration: 'none', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(17,17,17,0.3)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
            >
              Contact Us →
            </a>
            <a href="mailto:export@lvspices.com" style={{
              display: 'inline-block', fontFamily: SANS, fontSize: 14, fontWeight: 500,
              border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(0,0,0,0.6)',
              padding: '13px 28px', borderRadius: 999, textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = CRIMSON; el.style.color = CRIMSON; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.15)'; el.style.color = 'rgba(0,0,0,0.6)'; }}
            >
              Email Us
            </a>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
