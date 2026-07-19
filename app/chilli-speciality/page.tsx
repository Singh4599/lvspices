'use client';

import { useState } from 'react';
import Image from 'next/image';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── Chilli Data ──────────────────────────────────────────── */
const chilliCategories = ['Chilli Whole', 'Chilli Stemless', 'Chilli Crushed', 'Ground Red Chilli'];

const chillies = {
  'Chilli Whole': [
    {
      name: 'S17 Chilli / Teja Chilli',
      desc: 'Popularly known as S17, it is mostly grown in Guntur and Warangal regions of Andhra Pradesh. Teja enjoys one of the major export markets. It is small in size, normal seed content, bright red, and highly pungent. It is the hottest commercially available chilli variety from India.',
      pungency: '80000-100000 SHU',
      color: '40-60 ASTA',
      uses: ['Used to add pungency to any seasoning or chilli powder', 'Used in sauces to add heat', 'Used for stews, studded with other spices to add an accent of heat'],
      image: '/images/products.png'
    },
    {
      name: 'S4 Chilli / Sannam Chilli / Cayenne Pepper',
      desc: 'Guntur Sannam or Capsicum annuum var. longhum, is a variety of chilli that grows in India, specifically in Southern states. It has relatively long fruits and is highly valued for its specific shape and size both in domestic and international markets. It has thick skin and is moderately hot.',
      pungency: '25000-35000 SHU',
      color: '60-80 ASTA',
      uses: ['Used ground as standard red chilli powder', 'Used as garnishing for various cuisines', 'Used for crushing (flakes)'],
      image: '/images/products.png'
    },
    {
      name: 'Byadgi / 5595 Chilli',
      desc: 'A long pointed chilli, dark red and strongly wrinkled. The Dabbi variety is wider. Grown mainly in Karnataka, this chilli has very little heat but imparts a bright orange-red color. It is considered essential in Udupi and Goan cuisine. Heavily used in the oleoresin extraction industry.',
      pungency: '10000-15000 SHU',
      color: '100-140 ASTA',
      uses: ['Used in sauces, stir fry & curries', 'Used in ground form to add vibrant color with low pungency'],
      image: '/images/products.png'
    },
    {
      name: 'Kashmiri Chilli',
      desc: 'Grown in temperate regions of North India. It is long, fleshy, and red in color. Its skin is smooth and very dark in color. This chilli is known more for its color than its pungency. It has the highest color and measure of pure capsaicin content is very low.',
      pungency: '1000-2000 SHU',
      color: '120-160 ASTA',
      uses: ['Used as powder for its intense color and flavor', 'Used in tandoori dishes to add beautiful red color without extreme heat'],
      image: '/images/products.png'
    },
    {
      name: 'S9 Chilli / Mundu Chilli',
      desc: 'Mundu chillies are found in Southern states of India. They are roundish fruit with moderately high pungency and strong characteristic flavor. The skin type is dark shiny and thick. It has 55-60% seed content.',
      pungency: '25000-30000 SHU',
      color: '50-60 ASTA',
      uses: ['Used for unique flavor as ground', 'Very popular in South Indian Cuisine for Sambar and Rasam preparation'],
      image: '/images/products.png'
    },
    {
      name: 'Bhut Jolokia / Ghost Pepper',
      desc: 'Also known as Ghost pepper or Naga Jolokia. Cultivated in Arunachal Pradesh, Assam, and Manipur. It rates as one of the hottest chillies in the world. Even a very small quantity is widely used in preparation of super hot curries and sauces.',
      pungency: '800,000-1,000,000+ SHU',
      color: 'Variable',
      uses: ['Used for extreme hot sauces and spice extracts', 'Used in oleoresin extraction'],
      image: '/images/products.png'
    }
  ],
  'Chilli Stemless': [
    {
      name: 'S17 Chilli Stemless',
      desc: 'Premium Teja variety chillies processed through our automated destemming lines. Ensures zero stem content while maintaining the high pungency and physical integrity of the pod.',
      pungency: '80000-100000 SHU',
      color: '40-60 ASTA',
      uses: ['Ideal for premium grinding applications', 'Preferred by international food manufacturers to avoid stem contamination'],
      image: '/images/products.png'
    },
    {
      name: 'S4 Sannam Stemless',
      desc: 'Sannam chillies with stems removed. Providing a clean, ready-to-process raw material for spice grinders and FMCG brands.',
      pungency: '25000-35000 SHU',
      color: '60-80 ASTA',
      uses: ['Direct milling into standard red chilli powder', 'Used in automated retail packing'],
      image: '/images/products.png'
    }
  ],
  'Chilli Crushed': [
    {
      name: '3/16 Inch Crushed Chilli (Pizza Cut)',
      desc: 'Standard pizza cut chilli flakes. Physical, chemical and microbiological parameters are set as per individual customer\'s requirements. Steam sterilized options available.',
      pungency: '20000-40000 SHU',
      color: 'Red with yellow seeds',
      uses: ['Pizza seasoning', 'Pasta and Italian cuisine garnish', 'Tabletop condiment'],
      image: '/images/products.png'
    },
    {
      name: '1/4 Inch Crushed Chilli',
      desc: 'Coarse crushed chilli flakes suitable for industrial food applications and robust seasoning blends.',
      pungency: '20000-40000 SHU',
      color: 'Red with yellow seeds',
      uses: ['Meat rubs and marinades', 'Industrial soup and sauce manufacturing'],
      image: '/images/products.png'
    },
    {
      name: '1/8 Inch Crushed Chilli',
      desc: 'Finer crushed chilli flakes providing a more even distribution of heat and visual appeal in blended products.',
      pungency: '20000-40000 SHU',
      color: 'Red with yellow seeds',
      uses: ['Spice blends and dry rubs', 'Pickles and condiments'],
      image: '/images/products.png'
    }
  ],
  'Ground Red Chilli': [
    {
      name: 'Extra Hot Red Chilli Powder',
      desc: 'Cryogenically ground from premium Teja (S17) chillies. Ground at -150°C to preserve the extreme heat profile, vibrant color, and volatile essential oils.',
      pungency: '70000-90000 SHU',
      color: '50-60 ASTA',
      uses: ['Spicy food formulations', 'Hot sauce manufacturing', 'Export markets demanding high heat'],
      image: '/images/products.png'
    },
    {
      name: 'Standard Red Chilli Powder',
      desc: 'A perfectly balanced blend of Sannam and Byadgi chillies, offering moderate heat and excellent red color. The most widely used grade for general culinary applications.',
      pungency: '25000-35000 SHU',
      color: '70-90 ASTA',
      uses: ['Everyday cooking and retail packs', 'Curry powders and general spice blends'],
      image: '/images/products.png'
    },
    {
      name: 'Kashmiri / Deggi Style Powder',
      desc: 'Specially formulated for maximum color impact with minimal heat. Ground from select Byadgi and Kashmiri varieties.',
      pungency: '5000-10000 SHU',
      color: '120-140+ ASTA',
      uses: ['Tandoori marinades', 'Adding rich red color to gravies and sauces without making them overly spicy'],
      image: '/images/products.png'
    }
  ]
};

/* ─────────────────────────────────────────────────────────── */

export default function ChilliSpecialityPage() {
  const [activeTab, setActiveTab] = useState(chilliCategories[0]);

  const currentProducts = chillies[activeTab as keyof typeof chillies];

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: 'clamp(300px,40vw,500px)', overflow: 'hidden' }}>
        <Image
          src="/images/farm-editorial.png" // Placeholder for chilli image
          alt="Chilli Products"
          fill
          style={{ objectFit: 'cover', opacity: 0.5 }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)' }} />
        
        <div style={{ position: 'absolute', bottom: 'clamp(40px,6vw,80px)', left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(172,3,59,0.12)', border: '1px solid rgba(172,3,59,0.35)',
            borderRadius: 999, padding: '6px 18px', marginBottom: 20,
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }} />
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON }}>Speciality Range</span>
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
            Chilli Products
          </h1>
        </div>
      </section>

      {/* ══ INTRO TEXT ════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,15.5px)', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, marginBottom: 20 }}>
            One of the things that people find intimidating about cooking Indian food is the vast array of spices used—both whole and ground, which are often combined into complex spice mix. Rich in antioxidants and alluring tastes spices are the secret ingredient every good diet boasts of.
          </p>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,15.5px)', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, marginBottom: 20 }}>
            LV Spices remains central to its pioneer status in the world of spices today. We have been bringing flavor, color and variety to the palates for over 50 years. Chilli has been the backbone of our empire. Our capability to identify, distinguish, store and process large volumes of chilli year on year has led us to form a trusted brand. We boast of more than 15 products in different form of chillies, from Raw to Stemless to Crushed to Ground, for both domestic and international market.
          </p>
        </div>
      </section>

      {/* ══ TABS ══════════════════════════════════════════════ */}
      <section style={{ padding: '0 clamp(24px,5vw,80px)', position: 'sticky', top: 80, zIndex: 10, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,0.07)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 12, overflowX: 'auto', padding: '16px 0', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {chilliCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '12px 24px', borderRadius: 999, flexShrink: 0,
                background: activeTab === cat ? CRIMSON : 'rgba(0,0,0,0.05)',
                color: activeTab === cat ? '#fff' : 'rgba(0,0,0,0.5)',
                border: `1px solid ${activeTab === cat ? CRIMSON : 'rgba(0,0,0,0.1)'}`,
                cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ══ PRODUCT LIST ══════════════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {currentProducts.map((product, idx) => (
              <div key={product.name} style={{
                display: 'flex', gap: 'clamp(24px,5vw,48px)', alignItems: 'flex-start',
                flexWrap: 'wrap',
                paddingBottom: 40,
                borderBottom: idx === currentProducts.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.08)'
              }}>
                {/* Image */}
                <div style={{
                  flex: '0 0 clamp(160px,25vw,240px)',
                  aspectRatio: '1/1',
                  position: 'relative',
                  background: 'rgba(0,0,0,0.03)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.07)'
                }}>
                  <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 260 }}>
                  <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 700, color: '#111', margin: '0 0 12px' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.55)', lineHeight: 1.7, margin: '0 0 20px' }}>
                    {product.desc}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111', width: 140, flexShrink: 0 }}>Pungency (SHU) :</span>
                      <span style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>{product.pungency}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111', width: 140, flexShrink: 0 }}>Color Value :</span>
                      <span style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>{product.color}</span>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111', display: 'block', marginBottom: 8 }}>Uses:</span>
                    <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {product.uses.map((use, i) => (
                        <li key={i} style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.55)', lineHeight: 1.5 }}>
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
