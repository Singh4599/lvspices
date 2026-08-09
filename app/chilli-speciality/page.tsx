'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ChilliHero from '@/components/chilli/ChilliHero';

const CR = '#e62e04'; // Bright red matching the screenshot
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const chilliCategories = [
  'CHILLI WHOLE',
  'CHILLI STEMLESS',
  'CHILLI CRUSHED',
  'GROUND RED CHILLIES',
  'IPM CHILLIES',
  'ORGANIC',
  'NICHE & OTHER RANGE'
];

type ChilliProduct = {
  name: string;
  code?: string;
  pungency?: string;
  color?: string;
  uses?: string;
  desc: string;
  image: string;
};

type TextSection = {
  isTextOnly: true;
  title: string;
  paragraphs: string[];
};

type TabContent = ChilliProduct[] | TextSection;

const tabData: Record<string, TabContent> = {
  'CHILLI WHOLE': [
    {
      name: 'Teja Chilli',
      code: 'S 17',
      pungency: '80000 - 100000 SHU',
      color: '40 - 60 ASTA',
      desc: 'Popularly known as S17, it is mostly grown in Guntur and Warangal regions of Andhra Pradesh. Teja enjoys one of the major export markets. It is small in size, normal seed content, bright red, and highly pungent. It is the hottest commercially available chilli variety from India.',
      uses: 'Used to add pungency to any seasoning or chilli powder, sauces, stews.',
      image: '/images/chilli/s17.jpg',
    },
    {
      name: 'Sannam Chilli',
      code: 'S 4',
      pungency: '25000 - 35000 SHU',
      color: '60 - 80 ASTA',
      desc: 'Guntur Sannam or Capsicum annuum var. longhum, is a variety of chilli that grows in India, specifically in Southern states. It has relatively long fruits and is highly valued for its specific shape and size both in domestic and international markets.',
      uses: 'Used ground as standard red chilli powder, garnishing, crushing (flakes).',
      image: '/images/chilli/s4.jpg',
    },
    {
      name: 'Wonder Hot Chilli',
      code: 'Wonder Hot',
      pungency: '70000 - 85000 SHU',
      color: '60 - 80 ASTA',
      desc: 'Known for its extreme heat and excellent red color, Wonder Hot is favored by extractors and spice companies alike.',
      uses: 'Very popular in international spice blends for an extra kick of heat.',
      image: '/images/chilli/wonder-hot-chilli.jpg',
    },
    {
      name: 'Tomato Chilli',
      code: 'Warangal Chapatta',
      pungency: '10000 - 15000 SHU',
      color: '80 - 100 ASTA',
      desc: 'Tomato chilli, or Warangal Chapatta, is deep red, very mild, and round like a tomato. It imparts excellent color without overwhelming heat.',
      uses: 'Ideal for color extraction and mild culinary dishes.',
      image: '/images/chilli/tomato-chilli.jpg',
    },
    {
      name: 'Bhut Jolokia / Ghost Pepper',
      code: 'Ghost Pepper',
      pungency: '800,000 - 1,000,000+ SHU',
      color: 'Variable',
      desc: 'Also known as Ghost pepper or Naga Jolokia. Cultivated in Arunachal Pradesh, Assam, and Manipur. It rates as one of the hottest chillies in the world.',
      uses: 'Used for extreme hot sauces, spice extracts, and oleoresin extraction.',
      image: '/images/chilli/bhut.jpg',
    },
    {
      name: 'Mundu Chilli',
      code: 'S 9',
      pungency: '25000 - 30000 SHU',
      color: '50 - 60 ASTA',
      desc: 'Mundu chillies are found in Southern states of India. They are roundish fruit with moderately high pungency and strong characteristic flavor. The skin type is dark shiny and thick.',
      uses: 'Very popular in South Indian Cuisine for Sambar and Rasam preparation.',
      image: '/images/chilli/s9.jpg',
    },
    {
      name: 'Kashmiri Chilli',
      code: 'Kashmiri',
      pungency: '1000 - 2000 SHU',
      color: '120 - 160 ASTA',
      desc: 'Grown in temperate regions of North India. It is long, fleshy, and red in color. This chilli is known more for its color than its pungency and has one of the highest color readings.',
      uses: 'Used as powder for its intense color in tandoori dishes.',
      image: '/images/chilli/kashmiri.jpg',
    },
  ],
  'CHILLI STEMLESS': [
    {
      name: 'S17 Stemless',
      code: 'S 17 Stemless',
      pungency: '80000 - 100000 SHU',
      color: '40 - 60 ASTA',
      desc: 'Premium Teja variety chillies processed through our automated destemming lines. Ensures zero stem content while maintaining the high pungency and physical integrity of the pod.',
      uses: 'Ideal for premium grinding applications.',
      image: '/images/chilli/s17-stem.jpg',
    },
    {
      name: 'Seedless Chilli',
      code: 'Seedless',
      pungency: 'Variable',
      color: 'Variable',
      desc: 'Processed chillies with stems and seeds removed. Providing a clean, ready-to-process raw material for spice grinders.',
      uses: 'Direct milling into pure standard red chilli powder.',
      image: '/images/chilli/seedless.jpg',
    },
  ],
  'CHILLI CRUSHED': [
    {
      name: '3/16 Inch Crushed Chilli',
      code: 'Pizza Cut',
      pungency: '20000 - 40000 SHU',
      color: 'Red with yellow seeds',
      desc: 'Standard pizza cut chilli flakes. Physical, chemical and microbiological parameters are set as per individual customer\'s requirements. Steam sterilized options available.',
      uses: 'Pizza seasoning, Pasta garnish, Tabletop condiment.',
      image: '/images/chilli/3-16.jpg',
    },
    {
      name: '1/4 Inch Crushed Chilli',
      code: 'Coarse Cut',
      pungency: '20000 - 40000 SHU',
      color: 'Red with yellow seeds',
      desc: 'Coarse crushed chilli flakes suitable for industrial food applications and robust seasoning blends.',
      uses: 'Meat rubs, marinades, soup manufacturing.',
      image: '/images/chilli/1-4.jpg',
    },
    {
      name: '1/8 Inch Crushed Chilli',
      code: 'Fine Cut',
      pungency: '20000 - 40000 SHU',
      color: 'Red with yellow seeds',
      desc: 'Finer crushed chilli flakes providing a more even distribution of heat and visual appeal in blended products.',
      uses: 'Spice blends, dry rubs, pickles.',
      image: '/images/chilli/1-8.jpg',
    },
  ],
  'GROUND RED CHILLIES': [
    {
      name: 'Extra Hot Red Chilli Powder',
      code: 'Extra Hot',
      pungency: '70000 - 90000 SHU',
      color: '50 - 60 ASTA',
      desc: 'Ground from premium Teja (S17) chillies to preserve the extreme heat profile, vibrant color, and volatile essential oils.',
      uses: 'Spicy food formulations, Hot sauce manufacturing.',
      image: '/images/chilli/Extra-hot.jpg',
    },
    {
      name: 'Kashmiri Powder',
      code: 'Kashmiri Ground',
      pungency: '5000 - 10000 SHU',
      color: '120 - 140+ ASTA',
      desc: 'Specially formulated for maximum color impact with minimal heat. Ground from select Kashmiri varieties.',
      uses: 'Tandoori marinades, adding rich red color to gravies.',
      image: '/images/chilli/kashmiri powder.jpg',
    },
    {
      name: 'Paprika Powder',
      code: 'Paprika',
      pungency: '500 - 1500 SHU',
      color: '100 - 140 ASTA',
      desc: 'Sweet and vibrant red powder, milled from mild capsicum varieties. Perfect for European and American cuisines.',
      uses: 'Garnishing, color enhancement, mild seasoning.',
      image: '/images/chilli/paprika.jpg',
    },
  ],
  'IPM CHILLIES': {
    isTextOnly: true,
    title: 'IPM Chilli',
    paragraphs: [
      'Producing the Buy rather than Buying the Produce',
      'Insects, pests and diseases are major constraints in enhancing production and productivity of spices. Plant protection in present day is mainly oriented towards chemical controls. The continuous use of pesticides led to increase accumulation of these toxic chemical residues in spices. Consumer exposure to pesticide residues is of considerable concern to consumers, food producers, academics and government agencies. In international scenario there is strict mechanism for monitoring pesticides residues across the world.',
      'Looking at the growing consumer concern for food safety, wholesomeness and origin. We have adopted an ecological approach of Integrated Pest Management for chilli cultivation. IPM approach help us to meet regulatory requirements and achieve sustainable cultivation by encompassing available methods and techniques as cultural, mechanical, biological and need based application of environmentally safer chemicals. This requires large scale interventions at the very grassroots level. With our hard earned \'Trust Equity\' with the farming community, is one of the few companies which is uniquely positioned to usher in this change and deliver long term sustainable food safety to the world. We strive to address the challenges confronting customers by tackling the problems at the source.'
    ]
  },
  'ORGANIC': {
    isTextOnly: true,
    title: 'Organic',
    paragraphs: [
      'In recent years, Environment issues are becoming more and more important in the supply of spices. Consumers in developed countries like EU countries, USA, have become more aware of health related-issues and are paying more attention to their diets. As a result, in addition to the function of adding flavor and spice to food, the safety issues related to chilli pepper are gaining frame as well.',
      'Pesticides and chemical fertilizers are the major food safety concern associated with chilli. Most pesticides and herbicides once taken up by the body go to the war with endocrine system, blocking the body\'s ability to regulate its own hormones.',
      'In order to stop these dangerous pesticides contaminate the India\'s most healthy top export spices, Organic channel for spices is generating increased interest.',
      'We have always been consumer centric and market driven company. Looking at the consumer demand for SAFE AND PURE product with no chemical residues. We are soon coming up with "Organic Chilli" for export market. Organically cultivated chilli means that no pesticides and chemicals are used for the purpose of fertilizer, nutrition and growth regulation. It is an eco-friendly technology for chilli cultivation that maximizes the use of on farm resources and minimizes the use of off-farm resources.',
      'This product is free of pesticides and chemical fertilizers offering a healthy choice for the health conscious consumers.'
    ]
  },
  'NICHE & OTHER RANGE': {
    isTextOnly: true,
    title: 'Niche & Other Range',
    paragraphs: [
      'WE DO A LOT IN CHILLI FROM CRUSHED TO GROUND BUT HOW ARE WE DIFFERENT??????',
      'As a leading brand in Spices, we have already carved a niche for ourselves in spices market both domestically and internationally. Apart from our regular range of 50 products of different chilli varieties, we offer wide range of Niche Products aimed at satisfying consumer needs and demand. Keeping up with the demand, without compromising with quality, our strong Product Development team is capable of reinventing the conventional product and has been successful in delivering innovative products to our customers as per their demand. Our niche products are modern twist to the ethnic taste which will tend to amplify the sensory experience and help make the meal flawless.',
      'GET ON A CALL WITH OUR QUALITY EXPERT WHO CAN HELP YOU TO CREATE A PRODUCT YOU WISH...',
      'BE IT ROASTED CHILLI OR CHILLI RINGS, WHITE CHILLI TO BRINED CHILLI WE HAVE A LOT OF EXPERIENCE IN CHILLIES.'
    ]
  }
};

export default function ChilliSpecialityPage() {
  const [activeTab, setActiveTab] = useState(chilliCategories[0]);
  const content = tabData[activeTab];

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>
      {/* ── NEW HERO ── */}
      <ChilliHero />

      {/* ── INTRO COPY ── */}
      <section style={{ padding: 'clamp(60px,8vw,80px) clamp(24px,5vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <ScrollReveal fromY={20}>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: '#333', lineHeight: 1.8, marginBottom: 20 }}>
              One of the things that people find intimidating about cooking Indian Food is the vast array of spices used- both whole and ground, which are often combined into complex spice mix. Rich in antioxidants and alluring tastes spices are the secret ingredient every good diet boasts of.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: '#333', lineHeight: 1.8, marginBottom: 20 }}>
              LV Spices remains central to its pioneer status in the world of spices today. We have been bringing flavor, color and variety to the palates from years. Chilli has been the backbone of our empire. Our capability to identify, distinguish, store and process large volumes of chilly year on year has led us to form a trusted brand. We have now turned into cohesive functional Export House in chilly. Quality being the over-riding factor in all aspects of our business and powered by Sustainable Philosophy, the business has progressed in delivering long term sustainable food safety to world.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: '#333', lineHeight: 1.8, marginBottom: 20 }}>
              Our key strength IPM programme for Chilly and Strong Backward Integration model aims at 'producing the buy rather than buying the produce'. IPM program help us to control pests without relying solely on pesticides. This ecological approach reduce the emphasis on pesticides by including cultural, biological, genetic, physical, regulatory and mechanical controls and thus enable us to meet stringent norms of PR levels which is our major competitive advantage.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: '#333', lineHeight: 1.8 }}>
              We boast of more than 50 Products in different form of chillies. From Raw to Stemless to Crushed to Ground, for both domestic and international market.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── STICKY TABS ── */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 20,
        background: '#fff',
        padding: '24px 0',
      }}>
        <div style={{ 
          maxWidth: 1200, margin: '0 auto', 
          display: 'flex', overflowX: 'auto', 
          padding: '0 clamp(24px,5vw,80px)', gap: 12, 
          scrollbarWidth: 'none',
          justifyContent: 'center'
        }}>
          {chilliCategories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveTab(cat)} 
              style={{
                fontFamily: SANS, 
                fontSize: 12, 
                fontWeight: 700, 
                letterSpacing: '0.05em', 
                textTransform: 'uppercase',
                padding: '12px 24px', 
                borderRadius: 999, 
                flexShrink: 0,
                background: activeTab === cat ? CR : '#fff',
                color: activeTab === cat ? '#fff' : '#111',
                border: activeTab === cat ? `1px solid ${CR}` : '1px solid #ddd',
                cursor: 'pointer', 
                transition: 'all 0.2s',
                boxShadow: activeTab === cat ? '0 4px 12px rgba(230,46,4,0.2)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <section style={{ padding: 'clamp(40px,6vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          
          {/* If it's a Text-Only section (like IPM, Organic, Niche) */}
          {'isTextOnly' in content ? (
            <ScrollReveal fromY={24}>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 42px)', color: '#111', marginBottom: 32, fontWeight: 700 }}>
                {content.title}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {content.paragraphs.map((p, i) => (
                  <p key={i} style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: '#444', lineHeight: 1.8 }}>
                    {p}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          ) : (
            /* If it's a Product List section */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
              {content.map((product, idx) => (
                <ScrollReveal key={product.name} fromY={24} delay={idx * 0.05} style={{
                  display: 'flex', 
                  gap: 'clamp(32px,6vw,60px)', 
                  alignItems: 'flex-start', 
                  flexWrap: 'wrap' 
                }}>
                  
                  {/* Left: Product Image */}
                  <div style={{ 
                    flex: '0 0 clamp(240px, 30vw, 360px)', 
                    aspectRatio: '4/3', 
                    position: 'relative', 
                    borderRadius: 8, 
                    overflow: 'hidden', 
                    background: '#f5f5f5',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                  }}>
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>

                  {/* Right: Product Details */}
                  <div style={{ flex: 1, minWidth: 300 }}>
                    <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(24px,3vw,32px)', fontWeight: 700, color: '#111', margin: '0 0 16px' }}>
                      {product.name}
                    </h3>
                    <p style={{ fontFamily: SANS, fontSize: 15, color: '#444', lineHeight: 1.7, margin: '0 0 24px' }}>
                      {product.desc}
                    </p>

                    {/* Specs Table (Catalog Style) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid #eee', paddingTop: 20 }}>
                      
                      {product.code && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                          <div style={{ width: 140, fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111', textTransform: 'uppercase' }}>Product Code:</div>
                          <div style={{ flex: 1, fontFamily: SANS, fontSize: 14, color: '#444' }}>{product.code}</div>
                        </div>
                      )}
                      
                      {product.pungency && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                          <div style={{ width: 140, fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111', textTransform: 'uppercase' }}>Pungency:</div>
                          <div style={{ flex: 1, fontFamily: SANS, fontSize: 14, color: '#444' }}>{product.pungency}</div>
                        </div>
                      )}
                      
                      {product.color && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                          <div style={{ width: 140, fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111', textTransform: 'uppercase' }}>Color Value:</div>
                          <div style={{ flex: 1, fontFamily: SANS, fontSize: 14, color: '#444' }}>{product.color}</div>
                        </div>
                      )}

                      {product.uses && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                          <div style={{ width: 140, fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111', textTransform: 'uppercase' }}>Uses:</div>
                          <div style={{ flex: 1, fontFamily: SANS, fontSize: 14, color: '#444' }}>{product.uses}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
