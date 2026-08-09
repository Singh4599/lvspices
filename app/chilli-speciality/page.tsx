'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ChilliHero from '@/components/chilli/ChilliHero';
import ChilliIntroMap from '@/components/chilli/ChilliIntroMap';

const CR = '#111111'; // Bright red matching the screenshot
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
  image: string | 'coming-soon';
};

type TextSection = {
  isTextOnly: true;
  title: string;
  paragraphs: string[];
  bulletPoints?: string[];
};

type TabContent = ChilliProduct[] | TextSection;

const tabData: Record<string, TabContent> = {
  'CHILLI WHOLE': [
    {
      name: 'S9 Chilli / Mundu Chilli / Round Chilli',
      code: 'CHW08',
      pungency: '20000 - 30000 SHU',
      color: '50 - 60 ASTA',
      desc: 'Mundu chillies are found in southern states of India. They are roundish fruit with moderately high pungency and strong characteristic flavor. The skin type is dark shiny and thick.',
      uses: 'Used for unique flavor as ground. Very popular in South Indian Cuisine for Sambar and Rasam preparation. Used as garnishing for various dishes.',
      image: '/images/chilli/s9.jpg',
    },
    {
      name: 'S4 Chilli / Sannam Chilli / Cayenne Pepper',
      code: 'CHW01',
      pungency: '25000 - 35000 SHU',
      color: '60 - 80 ASTA',
      desc: 'Guntur Sannam or Capsicum annuum var. longhum, is a variety of chilli that grows in India specifically in Southern states of India. This variety of chilli has relatively long fruits (7 to 9 cm in length) and is highly valued for its specific shape and size both in domestic and international market.',
      uses: 'Used ground as standard red chilli powder. Used as garnishing for various cuisines. Used for crushing.',
      image: '/images/chilli/s-4.jpg',
    },
    {
      name: 'S17 Chilli / Teja Chilli',
      code: 'CHW06',
      pungency: '80000 - 100000 SHU',
      color: '40 - 60 ASTA',
      desc: 'Popularly known as S17, it is mostly grown in Guntur and Warangal regions of Andhra Pradesh. Teja enjoys one of the major export markets. It is small in size, normal seed content, bright red and highly pungent. It is the hottest commercially available chilli variety from India.',
      uses: 'Used to add pungency to any seasoning or chilli powder. Used in sauces, stews.',
      image: '/images/chilli/s17.jpg',
    },
    {
      name: 'S12 Chilli',
      code: 'CHW07',
      pungency: '60000 - 80000 SHU',
      color: '100 - 120 ASTA',
      desc: 'S12 chilli is mostly grown in the fertile cotton lands of Madhya Pradesh and Maharashtra. The harvesting season is Jan to March. S12 chillies have good color, pungency and size, which make them prominent in the domestic and international markets.',
      uses: 'Used in making curry powder, seasoning and to enhance the flavor in curried dishes. Used for heavy heat in hot sauces.',
      image: '/images/chilli/s12.jpg',
    },
    {
      name: 'Wonder Hot Chilli (WHC)',
      code: 'CHW05',
      pungency: '60000 - 80000 SHU',
      color: '80 - 100 ASTA',
      desc: 'Mostly grown in Guntur, Prakasam and Khammam districts of Andhra Pradesh. This variety is very long and dark. The skin type is thick and shiny. It is the largest chilli in size with the highest color value and imparting pungency.',
      uses: 'Used in making curry powder. Used for color extraction.',
      image: '/images/chilli/wonder-hot-chilli.jpg',
    },
    {
      name: 'Chapata Chilli / Tomato Chilli / Sweet Bell Pepper / Paprika Chilli',
      code: 'CHW03',
      pungency: '15000 - 20000 SHU',
      color: '120 - 150 ASTA',
      desc: 'It is mostly grown in Warangal, Khammam, and Prakasam districts of Andhra Pradesh. It is deep red in color and less pungent. The Capsaicin content is 0.15% and Color Value is 120-150 ASTA. This chillie has one of the thickest skins in Indian chilli varieties making it ideal for color extraction.',
      uses: 'Used in curried dishes as a common ingredient in curry powder and seasoning.',
      image: '/images/chilli/tomato-chilli.jpg',
    },
    {
      name: 'Bird Eye Chilli (A-I Son, B-I Jon)',
      code: 'CHW11',
      pungency: '80000 - 120000 SHU',
      color: '30 - 50 ASTA',
      desc: 'Bird eye chilli is commonly grown in North East India. It is small in size and highly pungent. The skin type is smooth.',
      uses: 'Used in extreme hot sauces. Used in oriental cuisine as fresh green chillies.',
      image: 'coming-soon',
    },
    {
      name: 'Byadgi / 5595 CHILLI',
      code: 'CHW02',
      pungency: '10000 - 15000 SHU',
      color: '100 - 150 ASTA',
      desc: 'A long pointed chilli, dark red and strongly wrinkled. The 5595 variety is grown in Karnataka and Andhra Pradesh. This variety has very little heat but imparts a bright orange-red color. It is a very popular variety for the color extraction industry.',
      uses: 'Used in ground form to add color with low pungency. Used for color extraction.',
      image: 'coming-soon',
    },
    {
      name: 'Kashmiri Chilli',
      code: 'CHW04',
      pungency: '1000 - 2000 SHU',
      color: '120 - 160 ASTA',
      desc: 'Grown in temperate regions of North India. It is long, fleshy, and red in color. This chilli is known more for its color than its pungency and has one of the highest color readings.',
      uses: 'Used as powder for its intense color in tandoori dishes.',
      image: '/images/chilli/kashmiri.jpg',
    },
    {
      name: 'Bhut Jolokia',
      code: 'CHW10',
      pungency: '800,000 - 1,000,000+ SHU',
      color: 'Variable',
      desc: 'Also known as Ghost pepper or Naga Jolokia. Cultivated in Arunachal Pradesh, Assam, and Manipur. It rates as one of the hottest chillies in the world.',
      uses: 'Used for extreme hot sauces, spice extracts, and oleoresin extraction.',
      image: '/images/chilli/bhut.jpg',
    }
  ],
  'CHILLI STEMLESS': [
    {
      name: 'S17 Chilli / Teja Chilli (Stemless)',
      code: 'CHW06S',
      pungency: '80000 - 100000 SHU',
      color: '40 - 60 ASTA',
      desc: 'Premium Teja variety chillies processed through our automated destemming lines. Ensures zero stem content while maintaining the high pungency and physical integrity of the pod.',
      uses: 'Ideal for premium grinding applications. Used to add pungency to any seasoning or chilli powder.',
      image: '/images/chilli/s17-stem.jpg',
    },
    {
      name: 'S4 Chilli / Sannam Chilli / Cayenne Pepper (Stemless)',
      code: 'CHW01S',
      pungency: '25000 - 35000 SHU',
      color: '60 - 80 ASTA',
      desc: 'Sannam chillies with stems removed. Providing a clean, ready-to-process raw material for spice grinders.',
      uses: 'Used ground as standard red chilli powder. Used for crushing.',
      image: 'coming-soon',
    },
    {
      name: 'S668 Chilli Stemless',
      code: 'CHW16S',
      pungency: '30000 - 45000 SHU',
      color: '60 - 80 ASTA',
      desc: 'S668 is a chemical farming variety of chilli grown in Indian state of Karnataka. It has wrinkled skin that is dark red in color. This variety has mild heat and strong color.',
      uses: 'Used in making curry powder, seasoning and to enhance the flavor in curried dishes.',
      image: '/images/chilli/s668 (1).jpg',
    },
    {
      name: 'S12 Chilli (Stemless)',
      code: 'CHW07S',
      pungency: '60000 - 80000 SHU',
      color: '100 - 120 ASTA',
      desc: 'S12 chilli with stem removed. Ideal for color, pungency and size, making them prominent in the domestic and international markets.',
      uses: 'Used in making curry powder, seasoning and to enhance the flavor of curried dishes.',
      image: 'coming-soon',
    },
    {
      name: 'S9 Chilli / Mundu Chilli / Round Chilli Stemless',
      code: 'CHW08S',
      pungency: '20000 - 30000 SHU',
      color: '50 - 60 ASTA',
      desc: 'Mundu chillies with stems removed. Roundish fruit with moderately high pungency and strong characteristic flavor.',
      uses: 'Used in making curry powder, seasoning and to enhance the flavor of curried dishes.',
      image: 'coming-soon',
    }
  ],
  'CHILLI CRUSHED': [
    {
      name: '3/16 Inch Crushed Chilli',
      code: 'CHC01',
      pungency: '20000 - 40000 SHU',
      color: 'Red with yellow seeds',
      desc: 'Standard pizza cut chilli flakes. Physical, chemical and microbiological parameters are set as per individual customer\'s requirements. Steam sterilized options available.',
      uses: 'Pizza seasoning, Pasta garnish, Tabletop condiment.',
      image: '/images/chilli/3-16.jpg',
    },
    {
      name: '1/4 Inch Crushed Chilli',
      code: 'CHC02',
      pungency: '20000 - 40000 SHU',
      color: 'Red with yellow seeds',
      desc: 'Coarse crushed chilli flakes suitable for industrial food applications and robust seasoning blends.',
      uses: 'Meat rubs, marinades, soup manufacturing.',
      image: '/images/chilli/1-4.jpg',
    },
    {
      name: '1/8 Inch Crushed Chilli',
      code: 'CHC03',
      pungency: '20000 - 40000 SHU',
      color: 'Red with yellow seeds',
      desc: 'Finer crushed chilli flakes providing a more even distribution of heat and visual appeal in blended products.',
      uses: 'Spice blends, dry rubs, pickles.',
      image: '/images/chilli/1-8.jpg',
    },
    {
      name: 'Seedless Crushed Chilli',
      code: 'CHC04',
      pungency: '20000 - 30000 SHU',
      color: 'Variable',
      desc: 'Processed crushed chillies with seeds removed. Providing a clean, vibrant red flake for specific culinary applications where seeds are undesirable.',
      uses: 'Premium spice blends, specific garnishing applications.',
      image: '/images/chilli/seedless.jpg',
    }
  ],
  'GROUND RED CHILLIES': [
    {
      name: 'Kashmiri Chilli Powder',
      code: 'CHP01',
      pungency: '1000 - 5000 SHU',
      color: '120 - 160+ ASTA',
      desc: 'Specially formulated for maximum color impact with minimal heat. Ground from select Kashmiri varieties.',
      uses: 'Tandoori marinades, adding rich red color to gravies.',
      image: '/images/chilli/kashmiri powder.jpg',
    },
    {
      name: 'S4 Pepper/ Cayenne Pepper',
      code: 'CHP02',
      pungency: '25000 - 35000 SHU',
      color: '60 - 80 ASTA',
      desc: 'Ground Sannam chillies. A perfectly balanced blend offering moderate heat and excellent red color. The most widely used grade for general culinary applications.',
      uses: 'Everyday cooking, curry powders and general spice blends.',
      image: '/images/chilli/s4-pepper.jpg',
    },
    {
      name: 'Extra Hot Pepper',
      code: 'CHP03',
      pungency: '70000 - 90000 SHU',
      color: '50 - 60 ASTA',
      desc: 'Ground from premium Teja (S17) chillies to preserve the extreme heat profile, vibrant color, and volatile essential oils.',
      uses: 'Spicy food formulations, Hot sauce manufacturing.',
      image: '/images/chilli/Extra-hot.jpg',
    },
    {
      name: 'Paprika Powder',
      code: 'CHP04',
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

// Top bullet points for specific tabs
const tabBullets: Record<string, string[]> = {
  'CHILLI STEMLESS': [
    'Stemless chilli regularly in system for producing stemless chillies.',
    'Physical, chemical and microbiological parameters will be met as per individual customer\'s requirements.',
    'ETO / Steam treatment for sterilization, if desired.',
    'In compliance with strict Regulatory Norms for Pesticide Residues, Aflatoxin and other parameters.',
    'Along with Jute bags, customized packaging is also available.'
  ],
  'CHILLI CRUSHED': [
    'The final product can be customized to meet heat, color, granulation and seed percentage level of the customer specification and end use of requirement.',
    'Granulation offered 0 mm - 1.4 mm',
    'ETO and Steam Sterilization offered'
  ],
  'GROUND RED CHILLIES': [
    'Tailored made ground chillies with desired heat and color value possible',
    'Specialty Tailored Powders offered as per color requirement of customers- Yellow white green & decolored chilli powder',
    'Granulation also offered for 400-600 micron',
    'Physical, chemical and microbiological parameters will be met as per individual customer\'s requirements.',
    'ETO/Steam treatment for sterilization, if desired.',
    'In compliance with strict Regulatory Norms for Pesticide Residues, Aflatoxin and other parameters'
  ]
};

export default function ChilliSpecialityPage() {
  const [activeTab, setActiveTab] = useState(chilliCategories[0]);
  const [openProductIdx, setOpenProductIdx] = useState<number>(-1);

  const handleTabChange = (cat: string) => {
    setActiveTab(cat);
    setOpenProductIdx(-1);
  };

  const content = tabData[activeTab];
  const bullets = tabBullets[activeTab];

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>
      {/* ── NEW HERO ── */}
      <ChilliHero />

      {/* ── INTRO FLOWCHART ── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ChilliIntroMap />
        </div>
      </section>

      {/* ── STICKY TABS ── */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 20,
        background: '#fff',
        padding: '16px 0',
      }}>
        <style>{`
          .chilli-tabs-scroll::-webkit-scrollbar { display: none; }
          .chilli-tabs-container {
            justify-content: flex-start;
          }
          @media (min-width: 1100px) {
            .chilli-tabs-container {
              justify-content: center;
            }
          }
        `}</style>
        <div 
          className="chilli-tabs-scroll chilli-tabs-container"
          style={{ 
            maxWidth: 1200, margin: '0 auto', 
            display: 'flex', overflowX: 'auto', 
            padding: '4px clamp(16px, 5vw, 80px) 24px',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div style={{
            display: 'flex',
            background: CR,
            borderRadius: 999,
            overflow: 'hidden',
            boxShadow: '0 8px 20px rgba(17,17,17,0.15)',
            flexShrink: 0
          }}>
            {chilliCategories.map((cat, i) => (
              <button 
                key={cat} 
                onClick={() => handleTabChange(cat)} 
                style={{
                  fontFamily: SANS, 
                  fontSize: 'clamp(11px, 1.1vw, 13px)', 
                  fontWeight: 700, 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase',
                  padding: '14px clamp(16px, 2vw, 24px)', 
                  background: activeTab === cat ? '#000000' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRight: i < chilliCategories.length - 1 ? '1px solid rgba(0,0,0,0.12)' : 'none',
                  cursor: 'pointer', 
                  transition: 'background 0.2s',
                  flexShrink: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <section style={{ padding: 'clamp(40px,6vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          
          {/* If there are bullet points for the category */}
          {bullets && (
            <div style={{ marginBottom: 48, padding: '24px 32px', background: '#fafafa', borderRadius: 12, border: '1px solid #eee' }}>
              <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {bullets.map((bullet, idx) => (
                  <li key={idx} style={{ fontFamily: SANS, fontSize: 14, color: '#444', lineHeight: 1.6 }}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* If it's a Text-Only section (like IPM, Organic, Niche) */}
          {'isTextOnly' in content ? (
            <ScrollReveal fromY={24}>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(24px, 3.5vw, 36px)', color: '#111', marginBottom: 28, fontWeight: 700 }}>
                {content.title}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {content.paragraphs.map((p, i) => (
                  <p key={i} style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,15px)', color: '#444', lineHeight: 1.8 }}>
                    {p}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          ) : (
            /* If it's a Product List section */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 4vw, 60px)' }}>
              <style>{`
                .prod-header { display: none; }
                .prod-body { display: flex; gap: clamp(32px,6vw,60px); align-items: flex-start; }
                .prod-desktop-title { display: block; }
                
                @media (max-width: 900px) {
                  .prod-header { 
                    display: flex; justify-content: space-between; align-items: center; 
                    padding: 20px 0; border-bottom: 1px solid #eee; cursor: pointer;
                    user-select: none;
                    transition: all 0.3s;
                  }
                  .prod-desktop-title { display: none !important; }
                  .prod-body { 
                    display: none; flex-direction: column; padding-top: 12px; gap: 24px;
                  }
                  .is-open .prod-body { display: flex !important; }
                  .is-open .prod-header { color: ${CR}; border-bottom-color: transparent; padding-bottom: 12px; }
                  .is-open .prod-header svg { transform: rotate(180deg); }
                }
              `}</style>
              {content.map((product, idx) => {
                const isOpen = openProductIdx === idx;
                return (
                <ScrollReveal key={product.name} fromY={24} delay={idx * 0.05} style={{ width: '100%' }}>
                  <div className={`prod-container ${isOpen ? 'is-open' : ''}`}>
                    {/* Mobile Accordion Header */}
                    <div className="prod-header" onClick={() => setOpenProductIdx(isOpen ? -1 : idx)}>
                      <h3 style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, margin: 0, paddingRight: 16 }}>{product.name}</h3>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: 'transform 0.3s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>

                    <div className="prod-body">
                      {/* Left: Product Image */}
                      <div style={{ 
                        flex: '0 0 clamp(240px, 30vw, 360px)',
                        width: '100%', 
                        aspectRatio: '4/3', 
                        position: 'relative', 
                        borderRadius: 8, 
                        overflow: 'hidden', 
                        background: '#f8f8f8',
                        border: '1px solid #eaeaea',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {product.image === 'coming-soon' ? (
                          <div style={{ 
                            fontFamily: SANS, 
                            fontSize: 14, 
                            fontWeight: 600, 
                            color: '#aaa',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 12
                          }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            Coming Soon
                          </div>
                        ) : (
                          <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill 
                            style={{ objectFit: 'cover' }} 
                          />
                        )}
                      </div>

                      {/* Right: Product Details */}
                      <div style={{ flex: 1, minWidth: 300, width: '100%' }}>
                        <h3 className="prod-desktop-title" style={{ fontFamily: SERIF, fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 700, color: '#111', margin: '0 0 16px' }}>
                          {product.name}
                        </h3>
                        
                        {/* Specs Table (Catalog Style) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                          
                          {product.code && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                              <div style={{ width: 120, fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111' }}>Product Code:</div>
                              <div style={{ flex: 1, fontFamily: SANS, fontSize: 14, color: '#444' }}>{product.code}</div>
                            </div>
                          )}
                          
                          {product.pungency && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                              <div style={{ width: 120, fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111' }}>Pungency (SHU):</div>
                              <div style={{ flex: 1, fontFamily: SANS, fontSize: 14, color: '#444' }}>{product.pungency}</div>
                            </div>
                          )}
                          
                          {product.color && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                              <div style={{ width: 120, fontFamily: SANS, fontSize: 13, fontWeight: 700, color: '#111' }}>Color Value:</div>
                              <div style={{ flex: 1, fontFamily: SANS, fontSize: 14, color: '#444' }}>{product.color}</div>
                            </div>
                          )}
                        </div>

                        <p style={{ fontFamily: SANS, fontSize: 14, color: '#444', lineHeight: 1.7, margin: '0 0 16px' }}>
                          {product.desc}
                        </p>

                        {product.uses && (
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                            <span style={{ color: CR, fontWeight: 700, fontSize: 16, lineHeight: 1 }}>›</span>
                            <div style={{ fontFamily: SANS, fontSize: 14, color: '#444', lineHeight: 1.5 }}>
                              <span style={{ fontWeight: 600, color: '#111' }}>Uses: </span>
                              {product.uses}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
