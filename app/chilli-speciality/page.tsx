'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import ParallaxCard from '@/components/ui/ParallaxCard';
import CurvedLoop from '@/components/ui/CurvedLoop';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const chilliCategories = ['Chilli Whole', 'Chilli Stemless', 'Chilli Crushed', 'Ground Red Chilli'];

const chillies = {
  'Chilli Whole': [
    {
      name: 'S17 Chilli / Teja Chilli', pungency: '80000-100000 SHU', color: '40-60 ASTA',
      desc: 'Popularly known as S17, it is mostly grown in Guntur and Warangal regions of Andhra Pradesh. Teja enjoys one of the major export markets. It is small in size, normal seed content, bright red, and highly pungent. It is the hottest commercially available chilli variety from India.',
      uses: ['Used to add pungency to any seasoning or chilli powder', 'Used in sauces to add heat', 'Used for stews, studded with other spices to add an accent of heat'],
    },
    {
      name: 'S4 Chilli / Sannam Chilli / Cayenne Pepper', pungency: '25000-35000 SHU', color: '60-80 ASTA',
      desc: 'Guntur Sannam or Capsicum annuum var. longhum, is a variety of chilli that grows in India, specifically in Southern states. It has relatively long fruits and is highly valued for its specific shape and size both in domestic and international markets.',
      uses: ['Used ground as standard red chilli powder', 'Used as garnishing for various cuisines', 'Used for crushing (flakes)'],
    },
    {
      name: 'Byadgi / 5595 Chilli', pungency: '10000-15000 SHU', color: '100-140 ASTA',
      desc: 'A long pointed chilli, dark red and strongly wrinkled. Grown mainly in Karnataka, this chilli has very little heat but imparts a bright orange-red color. It is considered essential in Udupi and Goan cuisine.',
      uses: ['Used in sauces, stir fry & curries', 'Used in ground form to add vibrant color with low pungency'],
    },
    {
      name: 'Kashmiri Chilli', pungency: '1000-2000 SHU', color: '120-160 ASTA',
      desc: 'Grown in temperate regions of North India. It is long, fleshy, and red in color. This chilli is known more for its color than its pungency and has one of the highest color readings of pure capsaicin.',
      uses: ['Used as powder for its intense color and flavor', 'Used in tandoori dishes to add beautiful red color without extreme heat'],
    },
    {
      name: 'S9 Chilli / Mundu Chilli', pungency: '25000-30000 SHU', color: '50-60 ASTA',
      desc: 'Mundu chillies are found in Southern states of India. They are roundish fruit with moderately high pungency and strong characteristic flavor. The skin type is dark shiny and thick.',
      uses: ['Used for unique flavor as ground', 'Very popular in South Indian Cuisine for Sambar and Rasam preparation'],
    },
    {
      name: 'Bhut Jolokia / Ghost Pepper', pungency: '800,000-1,000,000+ SHU', color: 'Variable',
      desc: 'Also known as Ghost pepper or Naga Jolokia. Cultivated in Arunachal Pradesh, Assam, and Manipur. It rates as one of the hottest chillies in the world.',
      uses: ['Used for extreme hot sauces and spice extracts', 'Used in oleoresin extraction'],
    },
  ],
  'Chilli Stemless': [
    {
      name: 'S17 Chilli Stemless', pungency: '80000-100000 SHU', color: '40-60 ASTA',
      desc: 'Premium Teja variety chillies processed through our automated destemming lines. Ensures zero stem content while maintaining the high pungency and physical integrity of the pod.',
      uses: ['Ideal for premium grinding applications', 'Preferred by international food manufacturers to avoid stem contamination'],
    },
    {
      name: 'S4 Sannam Stemless', pungency: '25000-35000 SHU', color: '60-80 ASTA',
      desc: 'Sannam chillies with stems removed. Providing a clean, ready-to-process raw material for spice grinders and FMCG brands.',
      uses: ['Direct milling into standard red chilli powder', 'Used in automated retail packing'],
    },
  ],
  'Chilli Crushed': [
    {
      name: '3/16 Inch Crushed Chilli (Pizza Cut)', pungency: '20000-40000 SHU', color: 'Red with yellow seeds',
      desc: 'Standard pizza cut chilli flakes. Physical, chemical and microbiological parameters are set as per individual customer\'s requirements. Steam sterilized options available.',
      uses: ['Pizza seasoning', 'Pasta and Italian cuisine garnish', 'Tabletop condiment'],
    },
    {
      name: '1/4 Inch Crushed Chilli', pungency: '20000-40000 SHU', color: 'Red with yellow seeds',
      desc: 'Coarse crushed chilli flakes suitable for industrial food applications and robust seasoning blends.',
      uses: ['Meat rubs and marinades', 'Industrial soup and sauce manufacturing'],
    },
    {
      name: '1/8 Inch Crushed Chilli', pungency: '20000-40000 SHU', color: 'Red with yellow seeds',
      desc: 'Finer crushed chilli flakes providing a more even distribution of heat and visual appeal in blended products.',
      uses: ['Spice blends and dry rubs', 'Pickles and condiments'],
    },
  ],
  'Ground Red Chilli': [
    {
      name: 'Extra Hot Red Chilli Powder', pungency: '70000-90000 SHU', color: '50-60 ASTA',
      desc: 'Cryogenically ground from premium Teja (S17) chillies at -150°C to preserve the extreme heat profile, vibrant color, and volatile essential oils.',
      uses: ['Spicy food formulations', 'Hot sauce manufacturing', 'Export markets demanding high heat'],
    },
    {
      name: 'Standard Red Chilli Powder', pungency: '25000-35000 SHU', color: '70-90 ASTA',
      desc: 'A perfectly balanced blend of Sannam and Byadgi chillies, offering moderate heat and excellent red color. The most widely used grade for general culinary applications.',
      uses: ['Everyday cooking and retail packs', 'Curry powders and general spice blends'],
    },
    {
      name: 'Kashmiri / Deggi Style Powder', pungency: '5000-10000 SHU', color: '120-140+ ASTA',
      desc: 'Specially formulated for maximum color impact with minimal heat. Ground from select Byadgi and Kashmiri varieties.',
      uses: ['Tandoori marinades', 'Adding rich red color to gravies and sauces without making them overly spicy'],
    },
  ],
};

export default function ChilliSpecialityPage() {
  const [activeTab, setActiveTab] = useState(chilliCategories[0]);
  const currentProducts = chillies[activeTab as keyof typeof chillies];

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <PageHero
        tag="Speciality Range"
        heading="Chilli"
        headingRed="Products."
        subCopy="LV Spices has been bringing flavour, color, and variety to palates for over 50 years. Chilli has been the backbone of our empire — 15+ varieties in whole, stemless, crushed, and ground forms."
        imageSrc="/images/farm-editorial.png"
        imageAlt="LV Spices Chilli Products"
        overlay="gradient-up"
        stats={[
          { value: '15+', label: 'Chilli Varieties' },
          { value: '1M+ SHU', label: 'Hottest Variety' },
          { value: '50+', label: 'Years Expertise' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE ══════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ INTRO ═════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <ScrollReveal fromY={28}>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, marginBottom: 16 }}>
              One of the things that people find intimidating about cooking Indian food is the vast array of spices used—both whole and ground, which are often combined into complex spice mixes. Rich in antioxidants and alluring tastes, spices are the secret ingredient every good diet boasts of.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.85 }}>
              Our capability to identify, distinguish, store and process large volumes of chilli year on year has led us to form a trusted brand. We boast of more than 15 products in different forms of chillies — from Raw to Stemless to Crushed to Ground, for both domestic and international markets.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ PARALLAX SECTION ═════════════════════════════════ */}
      <div style={{ padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px)', background: '#fff' }}>
        <ParallaxCard
          imageSrc="/images/cryo-dark.png"
          tilt={false}
          parallaxStrength={0.2}
          style={{ height: 'clamp(300px, 40vh, 500px)', width: '100%', borderRadius: 24, border: 'none' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)', zIndex: 1 }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: 'clamp(32px, 6vw, 80px)', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffb3c6', marginBottom: 16 }}>Our Commitment</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', margin: 0, lineHeight: 1.1, maxWidth: 600 }}>The Chilli Experts</h2>
          </div>
        </ParallaxCard>
      </div>

      {/* ══ CURVED LOOP ════════════════════════════════════════ */}
      <div style={{ position: 'relative', background: '#F8F6F1', paddingBottom: 'clamp(60px, 8vw, 120px)', paddingTop: 'clamp(60px, 8vw, 120px)' }}>
        <CurvedLoop 
          marqueeText="CHILLI SPECIALITY • RED CHILLI • STEMLESS CHILLI • "
          speed={1.5}
          curveAmount={250}
          className="fill-[#111] uppercase font-mono tracking-widest"
        />
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
           <text style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontFamily: 'var(--font-display)', color: CRIMSON, fontWeight: 800 }}>LV</text>
           <text style={{ fontSize: 'clamp(9px, 1vw, 14px)', fontFamily: 'var(--font-mono)', color: '#111', letterSpacing: '0.18em', marginTop: 4 }}>SPICES</text>
        </div>
      </div>

      {/* ══ STICKY TABS ═══════════════════════════════════════ */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 20,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)', borderTop: '1px solid rgba(0,0,0,0.04)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', overflowX: 'auto', padding: '14px clamp(24px,5vw,80px)', gap: 10, scrollbarWidth: 'none' }}>
          {chilliCategories.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)} style={{
              fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '11px 22px', borderRadius: 999, flexShrink: 0,
              background: activeTab === cat ? CRIMSON : 'rgba(0,0,0,0.05)',
              color: activeTab === cat ? '#fff' : 'rgba(0,0,0,0.5)',
              border: `1px solid ${activeTab === cat ? CRIMSON : 'rgba(0,0,0,0.1)'}`,
              cursor: 'pointer', transition: 'all 0.22s',
            }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ══ PRODUCT LIST ══════════════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {currentProducts.map((product, idx) => (
            <ScrollReveal key={product.name} fromY={24} delay={idx * 0.07} style={{
              borderBottom: idx === currentProducts.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.07)',
              paddingBottom: 40, marginBottom: 40,
            }}>
              <div style={{ display: 'flex', gap: 'clamp(24px,5vw,52px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Image */}
                <div style={{ flex: '0 0 clamp(140px,20vw,220px)', aspectRatio: '1/1', position: 'relative', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.07)', background: '#fafafa' }}>
                  <Image src="/images/products.png" alt={product.name} fill style={{ objectFit: 'cover' }} />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 260 }}>
                  <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(18px,2.2vw,26px)', fontWeight: 700, color: '#111', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.52)', lineHeight: 1.75, margin: '0 0 20px' }}>
                    {product.desc}
                  </p>

                  {/* Specs row */}
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
                    <div style={{ background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.2)', borderRadius: 10, padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <div style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>Pungency (SHU)</div>
                      <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: CRIMSON }}>{product.pungency}</div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 10, padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <div style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>Colour Value (ASTA)</div>
                      <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111' }}>{product.color}</div>
                    </div>
                  </div>

                  {/* Uses */}
                  <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: '#111', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Uses</div>
                  <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {product.uses.map((use, i) => (
                      <li key={i} style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.52)', lineHeight: 1.5, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: CRIMSON, fontWeight: 700, marginTop: 2 }}>›</span> {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

    </main>
  );
}
