'use client';

import { useState } from 'react';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── FAQ Data ─────────────────────────────────────────────── */
const faqCategories = [
  {
    category: 'About LV Spices',
    faqs: [
      {
        q: 'What makes LV Spices different from other spice brands?',
        a: 'LV Spices is recognised for clean sourcing, consistent quality, and a modern processing infrastructure. We use proprietary cryogenic grinding technology that operates at -150°C, preserving 40% more essential oils, natural colour, and aroma compared to conventional grinding. From procurement and cleaning to grinding, packing, and dispatch, we follow strict quality checks at every production stage.',
      },
      {
        q: 'What is Cryogenic Grinding and why does it matter for spices?',
        a: 'Cryogenic grinding is a process where spices are cooled to -150°C using liquid nitrogen before and during grinding. This prevents heat generation which would otherwise volatilise the essential oils responsible for flavour and aroma. The result is a spice that is more flavourful, more aromatic, and retains its natural colour significantly better than conventionally ground spice.',
      },
      {
        q: 'Where is LV Spices manufactured?',
        a: 'Our manufacturing facility is located in India. We operate 7+ processing units spread across 1,00,000 sq. ft. of built-up area, equipped with state-of-the-art processing technology including automated cleaning, cryogenic grinding, steam sterilization, and fully automated packaging lines.',
      },
      {
        q: 'Is LV Spices FSSAI certified and free from artificial additives?',
        a: 'Yes. LV Spices is fully FSSAI licensed and compliant. All our products are 100% free from artificial colours, flavours, and preservatives. We are also certified under ISO 22000:2018, HACCP, and FSSC 22000. Every batch is tested for pesticide residues, heavy metals, mycotoxins, and allergens before dispatch.',
      },
      {
        q: 'How is LV Spices different from other Indian spice exporters?',
        a: 'Unlike commodity exporters, we offer end-to-end services — from sourcing directly from farmers to delivering under your private label. Our in-house design team, packing unit, lab, and IT support mean there are no third-party hand-offs. Every step happens under one roof, which gives us full control over quality and turnaround time.',
      },
    ],
  },
  {
    category: 'Products & Range',
    faqs: [
      {
        q: 'What types of spices and masalas does LV Spices offer?',
        a: 'We offer a comprehensive range including whole spices, ground spices, blended masalas, seed spices, and chilli specialities. Our catalogue covers 500+ SKUs across categories like Chilli Powder, Turmeric, Coriander, Cumin, Pepper, Cardamom, specialty blends (Garam Masala, Biryani Masala, Curry Powder), and custom formulations.',
      },
      {
        q: 'What agricultural products do you export from India?',
        a: 'We specialise in Indian spices and spice products including whole spices (Chilli, Pepper, Cumin, Coriander, Turmeric, Cardamom, Cloves, Nutmeg), ground spices, blended masalas, dehydrated herbs, seed spices, and custom private label spice blends for global markets.',
      },
      {
        q: 'Which spices do you export in bulk?',
        a: 'We export all major Indian spices in bulk — Chilli (various grades), Turmeric (high curcumin varieties), Coriander, Cumin, Black Pepper, Cardamom, Fenugreek, Mustard, Ginger, and specialty crops. We also supply blended masalas in bulk to food manufacturers and restaurant chains worldwide.',
      },
      {
        q: 'Do you offer Chilli Speciality products?',
        a: 'Yes. Chilli is one of our core specialities. We offer Byadagi, Kashmiri, S17, Teja, Reshampatti, and Guntur varieties in whole, crushed, and ground formats. ASTA colour values are tested for every lot, and we can match specific SHU (Scoville Heat Unit) requirements for food manufacturers.',
      },
    ],
  },
  {
    category: 'Export & Supply',
    faqs: [
      {
        q: 'Which countries and regions do you export to?',
        a: 'We export to 40+ countries across GCC (UAE, Saudi Arabia, Kuwait, Qatar, Oman, Bahrain), Europe (UK, Germany, Netherlands, France, Italy), North America (USA, Canada), Africa, Southeast Asia, and Australia. Our logistics team handles all export documentation including phytosanitary certificates, CoA, and bill of lading.',
      },
      {
        q: 'Who do you supply to?',
        a: 'We supply to a wide range of customers including retail spice brands, food manufacturers, restaurant chains and HoReCa distributors, private label importers, supermarket chains, and industrial food processors. We serve both small importers needing a few pallets and large-scale buyers requiring full container loads.',
      },
      {
        q: 'Does LV Spices ship across India and internationally?',
        a: 'Yes. We supply pan-India and export internationally. For domestic customers we offer direct dispatch from our facility. For international orders we handle FCL (Full Container Load) and LCL (Less than Container Load) shipments via sea freight, with air freight available for urgent or sample orders.',
      },
      {
        q: 'How can I request pricing or start an export inquiry?',
        a: 'You can submit an inquiry through our Contact Us page or reach us directly via email or WhatsApp. Please share your product requirement, quantity, destination country, and packaging preference. Our export team will respond with a quotation within 24 hours.',
      },
    ],
  },
  {
    category: 'Private Label & Packaging',
    faqs: [
      {
        q: 'Do you offer private labelling and custom packaging?',
        a: 'Absolutely. Private labelling is one of our core services. We have an in-house design team, packing unit, and IT support to help you launch your own spice brand. We handle everything from label artwork creation and regulatory compliance to filling and dispatch — all under one roof.',
      },
      {
        q: 'What pack sizes are available for private label orders?',
        a: 'We offer private label packaging in a wide range of formats — from 50g retail sachets and 100g–500g consumer packs, to 1kg, 5kg, 25kg, and 50kg bulk bags. We support pouches, jars, tins, and custom-format packaging. Our filling lines can handle retail, HoReCa, and industrial formats.',
      },
      {
        q: 'Can you create a custom spice blend for our brand?',
        a: 'Yes. Our R&D team specialises in custom blend development. You share your target flavour profile or reference sample, and we formulate a matching blend that meets your sensory specifications and regulatory requirements. Development turnaround is typically 2–4 weeks including sensory trials.',
      },
    ],
  },
  {
    category: 'Quality & Certifications',
    faqs: [
      {
        q: 'What certifications and quality standards do your products meet?',
        a: 'LV Spices holds FSSAI, ISO 9001:2015, ISO 22000:2018, FSSC 22000, HACCP, NABL (laboratory accreditation), and Spices Board of India certifications. Our products comply with USFDA, EU Food Safety Regulations, GCC standards, and BRC Global Standard for Food Safety (Tier 2).',
      },
      {
        q: 'Are your spices certified for export to global markets?',
        a: 'Yes. All our export products carry valid phytosanitary certificates, certificates of analysis (CoA), and health certificates as required by the destination country. We are registered with APEDA and comply with the import regulations of USA, EU, UK, GCC, and other markets.',
      },
      {
        q: 'How do you maintain quality during shipping?',
        a: 'Our finished goods are packed in nitrogen-flushed, food-grade packaging to prevent oxidation and moisture ingress. We use temperature-monitored storage and recommend appropriate container conditions for each product type. CoA and shelf life information are shared with every shipment so buyers can track product quality.',
      },
      {
        q: 'What should I check before choosing an Indian spice exporter?',
        a: 'Look for: (1) FSSAI & export certifications, (2) in-house lab with NABL accreditation, (3) pesticide residue testing scope, (4) clear traceability from farm to shipment, (5) references from existing export clients, and (6) ability to provide CoA per lot. LV Spices meets all six criteria.',
      },
    ],
  },
  {
    category: 'Orders & MOQ',
    faqs: [
      {
        q: 'What is your minimum order quantity (MOQ)?',
        a: 'For bulk commodity orders the MOQ is typically 1 metric tonne (1000 kg). For private label orders the MOQ starts from 500 kg per SKU. Sample orders (1–5 kg) are available for evaluation purposes. Please contact our team to discuss specific requirements as MOQ can vary by product.',
      },
      {
        q: 'How should I store LV Spices products to maintain freshness?',
        a: 'Store in a cool, dry place away from direct sunlight and moisture. For whole spices, an airtight container at room temperature maintains quality for up to 24 months. For ground spices and masalas, refrigeration after opening extends freshness. All our packs carry detailed storage instructions and best-before dates.',
      },
      {
        q: 'Does LV Spices offer bulk or wholesale orders for businesses?',
        a: 'Yes. We actively supply to businesses including food manufacturers, distributors, and restaurant chains. We offer competitive pricing for bulk orders, flexible payment terms for established buyers, and the ability to supply on a regular scheduled basis to support your production calendar.',
      },
    ],
  },
];

/* ── Accordion Item ───────────────────────────────────────── */
function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{
      border: `1px solid ${isOpen ? 'rgba(172,3,59,0.35)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'border-color 0.25s',
      marginBottom: 10,
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          padding: '20px 24px',
          background: isOpen ? 'rgba(172,3,59,0.06)' : 'rgba(255,255,255,0.02)',
          border: 'none', cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.25s',
        }}
      >
        <span style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: isOpen ? CRIMSON : 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 18, fontWeight: 300,
          transition: 'all 0.25s',
        }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div style={{ padding: '0 24px 20px' }}>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,14.5px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ '0-0': true });
  const [activeCategory, setActiveCategory] = useState('All');

  const toggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = activeCategory === 'All'
    ? faqCategories
    : faqCategories.filter(c => c.category === activeCategory);

  const totalFAQs = faqCategories.reduce((acc, c) => acc + c.faqs.length, 0);

  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px) clamp(40px,6vw,70px)',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(172,3,59,0.1) 0%, transparent 70%)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 'clamp(40px,6vw,100px)', flexWrap: 'wrap' }}>
          {/* Left — sticky heading (Om Shree style) */}
          <div style={{ flex: '0 0 clamp(220px,28vw,360px)', position: 'sticky', top: 100, height: 'fit-content' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(172,3,59,0.12)', border: '1px solid rgba(172,3,59,0.35)',
              borderRadius: 999, padding: '6px 18px', marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }} />
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON }}>Help Centre</span>
            </div>

            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(44px,6vw,96px)', fontWeight: 700, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.04em', margin: '0 0 20px' }}>
              FAQs
            </h1>

            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: '0 0 32px' }}>
              Have more questions? Contact us for more information.
            </p>

            <a href="/contact" style={{
              display: 'inline-block',
              fontFamily: SANS, fontSize: 14, fontWeight: 600,
              background: CRIMSON, color: '#fff',
              padding: '13px 28px', borderRadius: 999,
              textDecoration: 'none', letterSpacing: '0.04em',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              Talk to us →
            </a>

            {/* Category filters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 40 }}>
              <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>Filter by topic</div>
              {['All', ...faqCategories.map(c => c.category)].map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  fontFamily: SANS, fontSize: 12.5, fontWeight: 500,
                  padding: '9px 14px', borderRadius: 8, textAlign: 'left',
                  background: activeCategory === cat ? 'rgba(172,3,59,0.12)' : 'transparent',
                  border: `1px solid ${activeCategory === cat ? 'rgba(172,3,59,0.35)' : 'transparent'}`,
                  color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.4)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>{cat}</button>
              ))}
            </div>

            {/* Stats */}
            <div style={{ marginTop: 32, padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{totalFAQs}</div>
              <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>Questions Answered</div>
            </div>
          </div>

          {/* Right — FAQ accordion */}
          <div style={{ flex: 1, minWidth: 280 }}>
            {/* Hathi Masala style header */}
            <div style={{
              fontFamily: SERIF, fontSize: 'clamp(16px,2vw,26px)', fontWeight: 700,
              color: '#fff', marginBottom: 32, lineHeight: 1.2,
            }}>
              Questions About Our Spices?<br />
              <span style={{ color: CRIMSON }}>Answered.</span>
            </div>

            {filteredCategories.map((cat, ci) => (
              <div key={cat.category} style={{ marginBottom: 40 }}>
                {/* Category heading */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: CRIMSON, flexShrink: 0 }} />
                  <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                    {cat.category}
                  </div>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                </div>

                {cat.faqs.map((faq, fi) => {
                  const key = `${ci}-${fi}`;
                  return (
                    <AccordionItem
                      key={key}
                      q={faq.q}
                      a={faq.a}
                      isOpen={!!openItems[key]}
                      onToggle={() => toggle(key)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center',
      }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(22px,3vw,44px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
          Still have questions?
        </h2>
        <p style={{ fontFamily: SANS, fontSize: 15, color: 'rgba(255,255,255,0.4)', margin: '0 0 28px' }}>
          Our export team typically replies within 24 hours.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/contact" style={{
            display: 'inline-block', fontFamily: SANS, fontSize: 14, fontWeight: 600,
            background: CRIMSON, color: '#fff', padding: '13px 28px', borderRadius: 999,
            textDecoration: 'none', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Contact Us →
          </a>
          <a href="mailto:info@lvspices.com" style={{
            display: 'inline-block', fontFamily: SANS, fontSize: 14, fontWeight: 500,
            border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)',
            padding: '13px 28px', borderRadius: 999, textDecoration: 'none', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(172,3,59,0.5)'; el.style.color = '#fff'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.2)'; el.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            Email Us
          </a>
        </div>
      </section>

    </main>
  );
}
