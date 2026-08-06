'use client';

import { useState } from 'react';
import TechTurbineHero from '@/components/technology/TechTurbineHero';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CR    = '#AC033B';
const INK   = '#1A1915';
const SERIF = 'var(--font-display), Georgia, serif';
const SANS  = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO  = 'var(--font-mono), "JetBrains Mono", monospace';

const SERVICES = [
  {
    id: 'quality',
    n: '01',
    name: 'High-Quality Product Assurance',
    icon: '✦',
    accent: '#AC033B',
    short: 'Triple-tested. FSSAI + ASTA certified. BRC Grade AA.',
    desc: 'Every consignment undergoes our three-tier quality verification — in-house lab testing, third-party certification, and pre-shipment SGS inspection. Our BRC Grade AA certification is the global benchmark for food safety excellence. We source only from farms we have personally audited.',
    highlights: ['In-house FSSAI-accredited laboratory', 'BRC Grade AA certified', 'Pre-shipment SGS / third-party inspection', 'Zero tolerance for aflatoxins and pesticide residue'],
  },
  {
    id: 'regulations',
    n: '02',
    name: 'Compliance with International Regulations',
    icon: '⚖',
    accent: '#1A5FAB',
    short: 'USFDA, EU MRLs, FSMA, Codex Alimentarius — all covered.',
    desc: 'We are registered and compliant with USFDA (FDA Food Facility Registration), EU import regulations, UK BRC, FSMA (Preventive Controls for Human Food), and Codex Alimentarius standards. Our documentation team pre-clears all shipments for seamless customs clearance in 40+ countries.',
    highlights: ['USFDA registered facility', 'EU/UK BRC compliance', 'FSMA Preventive Controls documentation', 'Codex Alimentarius-aligned specifications'],
  },
  {
    id: 'pricing',
    n: '03',
    name: 'Competitive Pricing and Payment Terms',
    icon: '◈',
    accent: '#2E6B3E',
    short: 'Market-linked pricing. Flexible LC, TT, CAD terms.',
    desc: 'Our direct farm-to-container sourcing model eliminates intermediaries, delivering competitive FOB/CIF pricing. We offer flexible payment terms including Letter of Credit (LC), Telegraphic Transfer (TT at sight/30/60/90 days), and Documents Against Acceptance (D/A) for verified buyers.',
    highlights: ['Direct sourcing — no intermediary markup', 'FOB / CFR / CIF pricing available', 'LC, TT, D/A payment terms', 'Volume-based pricing for large orders'],
  },
  {
    id: 'packaging',
    n: '04',
    name: 'Custom Packaging and Labelling',
    icon: '▣',
    accent: '#7B4E1B',
    short: '5g sachets to 50kg export bags. Your brand, your design.',
    desc: 'We offer complete custom packaging solutions — from 5g retail sachets to 25kg industrial bags. Our in-house design team handles artwork, label compliance (FSSAI, FDA nutrition facts, EU labelling regulation), and language-specific packaging for any target market.',
    highlights: ['5g sachets to 50kg bulk bags', 'Custom label design and compliance', 'Multi-language labelling (EU, UK, US, Middle East)', 'Private label and white-label options'],
  },
  {
    id: 'logistics',
    n: '05',
    name: 'Logistics and Supply Chain Management',
    icon: '⊹',
    accent: '#0A4D6E',
    short: 'Ex-works to door delivery. Full container or LCL.',
    desc: 'End-to-end logistics management from our warehouse to your destination port or inland address. We partner with top freight forwarders for FCL and LCL shipments from Nhava Sheva (JNPT), Mundra, and other major Indian ports. Real-time shipment tracking provided to all buyers.',
    highlights: ['Ex-works, FOB, CFR, CIF, DDP available', 'FCL and LCL consolidation', 'Departure from JNPT, Mundra, Chennai', 'Real-time container tracking'],
  },
  {
    id: 'customization',
    n: '06',
    name: 'Product Customization',
    icon: '⬡',
    accent: '#6B2A6B',
    short: 'From raw to roasted, ground to granulated — your spec, our process.',
    desc: 'Our R&D lab develops custom spice formulations, blends, granulations, and particle sizes to meet buyer-specific requirements. Whether you need a proprietary spice blend, a specific mesh size, or a custom heat level — we develop, validate, and deliver to your spec.',
    highlights: ['Custom blend development', 'Specific mesh size (60, 80, 100 mesh)', 'Heat level calibration (ASTA/Scoville units)', 'Custom granulation and flakes'],
  },
  {
    id: 'traceability',
    n: '07',
    name: 'Traceability and Sustainability',
    icon: '◎',
    accent: '#1A7A4A',
    short: 'Farm-to-fork traceability. IPM farming. Organic certified.',
    desc: 'We maintain complete lot-level traceability from farm registration through processing to delivery. Our IPM (Integrated Pest Management) programme covers 100+ registered farms. Valid IT digital traceability certification provides blockchain-verified supply chain transparency for buyers who require it.',
    highlights: ['100+ IPM-registered farms', 'Valid IT digital traceability (blockchain)', 'NPOP Organic Processing Unit certified', 'Full lot-level batch records maintained'],
  },
  {
    id: 'aftersales',
    n: '08',
    name: 'After-Sales Support',
    icon: '◉',
    accent: '#AC033B',
    short: 'Dedicated account manager. Issue resolution within 24 hours.',
    desc: 'Each buyer is assigned a dedicated account manager available Monday–Saturday. We respond to all quality queries within 24 hours. If any issue is identified with a shipment, our standard resolution process includes free replacement, credit note, or immediate re-testing — as appropriate.',
    highlights: ['Dedicated account manager', '24-hour response SLA on quality queries', 'Complaint resolution: replacement / credit note', 'Post-delivery technical support available'],
  },
  {
    id: 'insights',
    n: '09',
    name: 'Market Insights and Trends',
    icon: '△',
    accent: '#D4830A',
    short: 'Commodity price alerts. Seasonal harvest reports. Regulatory updates.',
    desc: 'Our buyers receive quarterly commodity reports covering price trends, harvest forecasts, and regulatory changes affecting spice imports. We provide early-warning alerts on crop failures, regulatory shifts, and origin certification changes — giving our buyers a sourcing intelligence edge.',
    highlights: ['Quarterly price trend reports', 'Harvest forecast advisories', 'Regulatory change alerts (EU MRLs, USFDA)', 'Crop failure and supply disruption alerts'],
  },
  {
    id: 'risk',
    n: '10',
    name: 'Risk Management',
    icon: '⟐',
    accent: '#555',
    short: 'Forward contracts. Buffer stock. Dual sourcing protocols.',
    desc: 'We offer forward booking contracts to lock in prices during favourable market conditions. Our maintained buffer stock across key spices ensures supply continuity even during harvest shortfalls. Dual-sourcing protocols from multiple growing regions protect against single-origin supply risk.',
    highlights: ['Forward booking contracts available', 'Buffer stock maintained year-round', 'Dual-sourcing from multiple regions', 'Force majeure clause + contingency protocols'],
  },
  {
    id: 'delivery',
    n: '11',
    name: 'Fast Delivery',
    icon: '→',
    accent: '#1A5FAB',
    short: 'Regular stock items ship within 7 days. Custom orders 21–28 days.',
    desc: 'Standard products from our maintained stock are shipped within 7 working days of order confirmation and payment. Custom blends and speciality formulations are processed within 21–28 working days. We provide Bill of Lading, phytosanitary, fumigation, and all export documentation within 3 days of shipment.',
    highlights: ['Stock items: 7-working-day dispatch', 'Custom blends: 21–28 working days', 'Full documentation within 3 days of sailing', 'Express air freight available on request'],
  },
  {
    id: 'customproducts',
    n: '12',
    name: 'Customized Products',
    icon: '✦',
    accent: '#2E6B3E',
    short: 'Private label. Proprietary blends. Exclusive formulations.',
    desc: 'We develop exclusive product lines for importers, distributors, and food manufacturers who want proprietary formulations unavailable to competitors. All custom product development is covered under NDA. Product recipes and formulation files remain confidential and belong to the buyer.',
    highlights: ['NDA-protected formulation development', 'Proprietary blend exclusivity', 'Organic and conventional options', 'Sample development within 14 days'],
  },
  {
    id: 'custompacking',
    n: '13',
    name: 'Customized Packaging',
    icon: '▦',
    accent: '#7B4E1B',
    short: 'Retail, foodservice, industrial — every format available.',
    desc: 'From 1g restaurant sachets to 25kg bulk PP sacks — we accommodate every packaging requirement. Food-grade stand-up pouches, tin containers, glass jars, vacuum-sealed retail packs, and jute export bags are all available with custom printing and full labelling compliance.',
    highlights: ['1g to 25kg pack sizes', 'Pouches, tins, jars, jute, PP woven sacks', 'Custom print, label, and branding', 'Food-grade materials — BPA-free guaranteed'],
  },
  {
    id: 'coldstorage',
    n: '14',
    name: 'Cold Storage Facility',
    icon: '❄',
    accent: '#0A6EBD',
    short: 'Temperature-controlled storage for premium aromatics and naturals.',
    desc: 'Our in-house cold storage maintains 4°C–12°C for temperature-sensitive spices including saffron, vanilla, high-value essential oils, and organic certified aromatics. This preserves volatile oils, colour ASTA values, and aroma intensity, ensuring premium product quality upon delivery.',
    highlights: ['4°C–12°C controlled cold storage', 'Saffron, vanilla, aromatics specialisation', 'Volatile oil and ASTA preservation', 'Humidity-controlled environment'],
  },
];

const CSS = `
  @keyframes svc-in {
    from { opacity:0; transform: translateY(24px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes svc-reveal {
    from { opacity:0; max-height:0; }
    to   { opacity:1; max-height:800px; }
  }
  @keyframes svc-icon-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .svc-item {
    border-bottom: 1px solid rgba(0,0,0,0.07);
    transition: background 0.2s;
  }
  .svc-item:last-child { border-bottom: none; }

  .svc-trigger {
    display: flex; align-items: center; gap: 20px;
    padding: 24px 32px;
    cursor: pointer;
    width: 100%; background: none; border: none;
    text-align: left;
  }

  .svc-panel {
    animation: svc-reveal 0.4s cubic-bezier(0.16,1,0.3,1) both;
    overflow: hidden;
  }

  .svc-highlight {
    display: flex; align-items: flex-start; gap: 8;
    font-family: var(--font-sans);
    font-size: 13px; color: rgba(0,0,0,0.62); line-height: 1.5;
    margin-bottom: 6px;
  }
  .svc-highlight::before {
    content: '✓'; flex-shrink: 0;
    font-weight: 700; margin-top: 1px;
  }

  @media (max-width:700px) {
    .svc-trigger { padding: 18px 20px !important; gap: 14px !important; }
    .svc-n { display: none !important; }
  }
`;

function ServiceItem({ svc, isOpen, onToggle }: {
  svc: typeof SERVICES[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="svc-item" style={{ background: isOpen ? `${svc.accent}03` : 'transparent' }}>
      <button className="svc-trigger" onClick={onToggle} aria-expanded={isOpen}>
        {/* Number */}
        <span className="svc-n" style={{
          fontFamily: MONO, fontSize: 12, fontWeight: 700,
          color: isOpen ? svc.accent : 'rgba(0,0,0,0.18)',
          minWidth: 32, transition: 'color 0.2s',
        }}>
          {svc.n}
        </span>

        {/* Icon circle */}
        <span style={{
          width: 40, height: 40, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, fontSize: 18,
          background: isOpen ? `${svc.accent}15` : 'rgba(0,0,0,0.05)',
          transition: 'background 0.2s',
        }}>
          {svc.icon}
        </span>

        {/* Name + short */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{
            fontFamily: SERIF, fontSize: 'clamp(14px,1.4vw,18px)', fontWeight: 700,
            color: INK, letterSpacing: '-0.02em', lineHeight: 1.2,
            transition: 'color 0.2s',
          }}>
            {svc.name}
          </div>
          {!isOpen && (
            <div style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: 3 }}>
              {svc.short}
            </div>
          )}
        </div>

        {/* Chevron */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path d="M4 6.5L9 11.5L14 6.5" stroke={isOpen ? svc.accent : 'rgba(0,0,0,0.35)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Progress bar */}
      {isOpen && (
        <div style={{ height: 2, background: `linear-gradient(to right, ${svc.accent}, ${svc.accent}30)`, marginBottom: 2 }}/>
      )}

      {/* Panel */}
      {isOpen && (
        <div className="svc-panel" style={{ padding: '4px 32px 28px 92px' }}>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(0,0,0,0.62)', lineHeight: 1.85, margin: '0 0 20px', maxWidth: 680 }}>
            {svc.desc}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '4px 24px' }}>
            {svc.highlights.map(h => (
              <div key={h} className="svc-highlight" style={{ color: 'rgba(0,0,0,0.62)' }}>
                <span style={{ color: svc.accent, fontWeight: 700, marginRight: 8 }}>✓</span>
                {h}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OurServicesPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: INK }}>
      <style>{CSS}</style>

      <TechTurbineHero badgeText="Our Services" marqueeText="SERVICES" />
      <VelocityMarquee dark />

      {/* ── INTRO ─────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)', background: '#FAFAF8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={24} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 14 }}>
              What We Offer
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4.5vw,60px)', fontWeight: 800, color: INK, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.05 }}>
              14 Services.<br /><em style={{ color: CR, fontStyle: 'italic' }}>One Supplier.</em>
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(0,0,0,0.52)', maxWidth: 580, margin: '0 auto', lineHeight: 1.8 }}>
              From farm-verified sourcing to door-delivered compliance documentation — we offer a complete service ecosystem for global spice importers.
            </p>
          </ScrollReveal>

          {/* Quick-stat bar */}
          <StaggerReveal stagger={0.08} style={{ display: 'flex', gap: 'clamp(16px,3vw,48px)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'clamp(48px,6vw,72px)' }}>
            {[
              { n: '14', label: 'Core Services' },
              { n: '40+', label: 'Export Countries' },
              { n: '7 Days', label: 'Standard Dispatch' },
              { n: '24 hr', label: 'Query Response' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 900, color: INK, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </StaggerReveal>

          {/* Services accordion */}
          <ScrollReveal fromY={24}>
            <div style={{
              background: '#fff', border: '1.5px solid rgba(0,0,0,0.07)',
              borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 4px 40px rgba(0,0,0,0.05)',
            }}>
              {/* Header */}
              <div style={{
                padding: '14px 32px', background: '#F8F6F1',
                borderBottom: '1px solid rgba(0,0,0,0.07)',
                display: 'flex', gap: 20, alignItems: 'center',
              }}>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', minWidth: 32 }}>#</span>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', flex: 1 }}>Service</span>
              </div>

              {SERVICES.map(svc => (
                <ServiceItem
                  key={svc.id}
                  svc={svc}
                  isOpen={openId === svc.id}
                  onToggle={() => setOpenId(prev => prev === svc.id ? null : svc.id)}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CURVED LOOP ──────────────────────────────── */}
      <div style={{ position: 'relative', background: '#FAFAF8', paddingTop: 'clamp(40px,5vw,72px)', paddingBottom: 'clamp(80px,10vw,120px)' }}>
        <CurvedLoop
          marqueeText="QUALITY • COMPLIANCE • CUSTOM PACKAGING • FAST DELIVERY • COLD STORAGE • TRACEABILITY • "
          speed={1.5} curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: 'clamp(28px,4vw,56px)', fontFamily: 'var(--font-display)', color: CR, fontWeight: 800 }}>LV</span>
          <span style={{ fontSize: 'clamp(9px,1vw,14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</span>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', background: CR, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(80px,18vw,280px)', fontWeight: 900, color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>SERVICES</span>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal fromY={24}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,5vw,72px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05 }}>
              Ready to Partner<br />with LV Spices?
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,0.75)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.75 }}>
              Tell us your requirement and we'll put together a custom service package tailored to your market and volume.
            </p>
            <a href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: '#fff', color: CR, fontFamily: SANS, fontWeight: 700, fontSize: 15,
              padding: '18px 40px', borderRadius: 999, textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Get a Custom Quote →
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
