'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

/* ── Nav tabs ────────────────────────────────────────────── */
const NAV_TABS = [
  { id: 'seed-cleaning', label: 'Seed Cleaning' },
  { id: 'milling', label: 'Milling' },
  { id: 'roasting', label: 'Roasting' },
  { id: 'steam-sterilization', label: 'Steam Sterilization' },
  { id: 'cryogenic', label: 'Cryogenic Grinding' },
  { id: 'cfg', label: 'CFG Technology' },
];

/* ── Milling Lines ────────────────────────────────────────── */
const millingLines = [
  {
    label: 'Milling Line 1',
    desc: 'With an annual capacity of 4000 mts, this robust milling line is designed to handle hard, low fibre spice like Fenugreek, Turmeric, and Ginger. These particularly hard spices are ground to desired mesh sizes on a single pass. The product temperatures are monitored throughout to ensure that volatile oils and flavours are maintained.',
  },
  {
    label: 'Milling Line 2',
    desc: 'Our second milling line is dedicated to heat-sensitive spices — Chilli, Coriander, Cumin, and Cardamom. This line operates at lower RPM with enhanced cooling to preserve colour (ASTA values) and essential oil content. Capacity: 3500 mts/year.',
  },
  {
    label: 'Milling Line 3',
    desc: 'The third line specialises in ultra-fine grinding for masala blends and spice mixes requiring 60–100 mesh particle size consistency. Automated sieving and inline classification ensure uniform particle distribution at 3000 mts/year throughput.',
  },
];

/* ─────────────────────────────────────────────────────────── */

export default function TechnologyPage() {
  const [activeTab, setActiveTab] = useState('seed-cleaning');
  const [activeMillingLine, setActiveMillingLine] = useState(0);
  const [navSticky, setNavSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        setNavSticky(navRef.current.getBoundingClientRect().top <= 64);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: 'clamp(420px,55vw,680px)', overflow: 'hidden' }}>
        <Image
          src="/images/factory.png"
          alt="LV Spices Technology"
          fill
          style={{ objectFit: 'cover', opacity: 0.5 }}
          priority
        />
        {/* Dark gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)',
        }} />

        <div style={{
          position: 'absolute', bottom: 'clamp(32px,6vw,80px)', left: 'clamp(24px,6vw,100px)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(172,3,59,0.15)', border: '1px solid rgba(172,3,59,0.4)',
            borderRadius: 999, padding: '6px 18px', marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: CRIMSON, display: 'inline-block' }} />
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON }}>Our Capabilities</span>
          </div>
          <h1 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(40px,7vw,96px)',
            fontWeight: 700,
            color: '#111',
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            margin: 0,
          }}>
            Technology
          </h1>
        </div>
      </section>

      {/* ══ STICKY NAV ════════════════════════════════════════ */}
      <div ref={navRef} style={{
        position: 'sticky', top: 64, zIndex: 30,
        background: navSticky ? 'rgba(0,0,0,0.95)' : '#0a0a0a',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        transition: 'background 0.3s',
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          display: 'flex', overflowX: 'auto',
        }}>
          {NAV_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              style={{
                fontFamily: SANS,
                fontSize: 13,
                fontWeight: 500,
                padding: '18px clamp(16px,2.5vw,36px)',
                background: activeTab === tab.id ? CRIMSON : 'transparent',
                color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.45)',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s',
                borderBottom: activeTab === tab.id ? `2px solid ${CRIMSON}` : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══ OVERVIEW ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(32px,5vw,64px)', fontWeight: 700, color: '#111', letterSpacing: '-0.03em', margin: '0 0 24px' }}>Overview</h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, marginBottom: 16 }}>
            LV Spices was among the first Indian exporters to adopt fully automated seed cleaning and cryogenic grinding equipment. Our commitment to precision technology and continuous innovation has made us a trusted global processing hub.
          </p>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.2vw,16px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, margin: '0 0 48px' }}>
            Spread across 7+ units with a built-up area of 100,000 sq. ft., we are equipped to produce at an annual capacity of over 80,000 mts. Our automated systems reduce human intervention, minimise errors, and ensure utmost safety, security, and health of both people and product.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(20px,4vw,60px)', flexWrap: 'wrap' }}>
            {[
              { val: '7+', label: 'Manufacturing Units', icon: '🏭' },
              { val: '100,000+', label: 'SqFt Built-up Area', icon: '📐' },
              { val: '80,000+', label: 'Mts Annual Capacity', icon: '⚡' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(172,3,59,0.08)',
                border: '1px solid rgba(172,3,59,0.2)',
                borderRadius: 16,
                padding: '20px 32px',
                display: 'flex', alignItems: 'center', gap: 16,
                minWidth: 'clamp(180px,20vw,240px)',
              }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: SERIF, fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginTop: 6 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SEED CLEANING ══════════════════════════════════════ */}
      <section id="seed-cleaning" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 12px' }}>Seed Cleaning</h2>
          <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.4)', textAlign: 'center', margin: '0 0 48px', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            This line was started back in the mid 90s and has been consistently upgraded — adapting to the latest technology available for seed cleaning globally.
          </p>

          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Image */}
            <div style={{ flex: '0 0 clamp(260px,40vw,480px)', borderRadius: 20, overflow: 'hidden', position: 'relative', height: 320 }}>
              <Image src="/images/farm.png" alt="Seed Cleaning" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.2), transparent)' }} />
            </div>
            {/* Text */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 24 }}>
                Different kinds of seeds can be separated when they differ in one or more physical characteristics. Primarily, the line is engaged to remove farm admixtures, insect and rodent excreta, potential allergens, ferrous and non-ferrous contaminants.
              </p>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 32 }}>
                The Buhler line for cleaning uses Sifters, De-Stoners, Spirals, Indent Cylinders, Gravity Separators, and the latest A+ Multivision Sortex and an On-line Metal Detector. Various controls are in place at the shop floor for identifying and segregation of rejected and cleaned material.
              </p>
              {/* Highlight */}
              <div style={{
                background: 'rgba(172,3,59,0.08)', border: '1px solid rgba(172,3,59,0.25)',
                borderRadius: 12, padding: '16px 20px',
              }}>
                <div style={{ fontFamily: SANS, fontSize: 13, color: CRIMSON, fontWeight: 700, marginBottom: 4 }}>Processing Capacity</div>
                <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 700, color: '#111' }}>1 – 3 tons / hour</div>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginTop: 4 }}>Per spice seed intended for cleaning</div>
              </div>
            </div>
          </div>

          {/* Kibbled subheading */}
          <div style={{ marginTop: 64 }}>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(22px,3vw,40px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 20px' }}>
              Kibbled Spice and Botanicals Line
            </h3>
            <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, marginBottom: 16 }}>
                  At the facility, pre-crushing lines are installed for the preparation of various cut sizes of chillies, as well as for herbal roots and botanicals. Before crushing, the product is cleaned through different stages. Zig-zag classifiers are used for removing heavy admixtures and stones, which operate according to density difference.
                </p>
                <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8 }}>
                  We use FIC Sortex machines manufactured by Buhler. It is currently possible to remove fungal-prone chilli pods and discoloured chillies vs. normal ones. The online installation of magnets removes ferrous impurities as well as sieves with varying screen sizes so that the final product fits the required cut size.
                </p>
              </div>
              <div style={{
                flex: '0 0 auto',
                background: 'rgba(172,3,59,0.08)', border: '1px solid rgba(172,3,59,0.25)',
                borderRadius: 16, padding: '28px 32px', textAlign: 'center',
              }}>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(40px,5vw,72px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>4000</div>
                <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 8 }}>Tons of material<br />can be processed<br />per annum</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MILLING ════════════════════════════════════════════ */}
      <section id="milling" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
        {/* Background team image */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/factory.png" alt="Milling" fill style={{ objectFit: 'cover', opacity: 0.12 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 20px' }}>Milling</h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, margin: '0 0 40px', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            Installation of Milling Lines is important to ensure there is minimal human intervention by use of a touch screen PLC Controller. The temperature deltas are critically controlled to prevent overheating which ensures retention of flavour and negligible loss of SHUs, ASTA Colour and Volatile oil of spice blends. At LV Spices, we have installed 3 Milling Lines, each with a capacity higher than the former, to cater to the specific needs of each product/spice.
          </p>

          {/* Milling Line Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {millingLines.map((line, i) => (
              <button
                key={i}
                onClick={() => setActiveMillingLine(i)}
                style={{
                  fontFamily: SANS, fontSize: 13, fontWeight: 500,
                  padding: '10px 24px', borderRadius: 999,
                  background: activeMillingLine === i ? CRIMSON : 'rgba(0,0,0,0.06)',
                  border: `1px solid ${activeMillingLine === i ? CRIMSON : 'rgba(255,255,255,0.12)'}`,
                  color: activeMillingLine === i ? '#fff' : 'rgba(255,255,255,0.55)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >{line.label}</button>
            ))}
          </div>

          {/* Content card */}
          <div style={{
            background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 16, padding: 'clamp(24px,3vw,40px)',
            backdropFilter: 'blur(20px)',
            textAlign: 'left',
          }}>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, margin: 0 }}>
              {millingLines[activeMillingLine].desc}
            </p>
          </div>
        </div>
      </section>

      {/* ══ ROASTING ══════════════════════════════════════════ */}
      <section id="roasting" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 20px' }}>Roasting</h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, margin: '0 0 40px' }}>
            No Indian Spice Blend is complete without the special roasted flavour. We have a dedicated Roasting Line with a running capacity of 4000 mts/annum. These roasters are ideal for making the perfectly desired custom roasted blends, thus guaranteeing the extra special taste in our spice. Often the degree of roasting is critical in ensuring that we get the perfect flavour and aroma.
          </p>

          {/* Stat badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 20,
            background: 'rgba(172,3,59,0.08)', border: '1px solid rgba(172,3,59,0.25)',
            borderRadius: 999, padding: '16px 32px', marginBottom: 40,
          }}>
            <span style={{ fontSize: 28 }}>🔥</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 700, color: '#111', lineHeight: 1 }}>4000 mts/annum</div>
              <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 4 }}>Dedicated Roasting Line Capacity</div>
            </div>
          </div>

          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.45)', lineHeight: 1.8 }}>
            It is the responsibility of R&D Department to prepare recipes, meet the specific requirements of custom roast blends and to run trials that match the samples provided by the customer.
          </p>
        </div>
      </section>

      {/* ══ STEAM STERILIZATION ════════════════════════════════ */}
      <section id="steam-sterilization" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 16px' }}>Steam Sterilization</h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
            Steam Sterilization is an environmental-friendly and extremely effective sterilization method. It yields little waste while monitoring multiple parameters like moisture, temperature, time, etc. Our process is a seamless marriage between the EuroFins-validated continuous and batch systems for a 5-log reduction.
          </p>

          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 clamp(260px,40vw,460px)', borderRadius: 20, overflow: 'hidden', position: 'relative', height: 300 }}>
              <Image src="/images/cfg-bg.png" alt="Steam Sterilization" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 20 }}>
                The main advantages of this facility at our factory is the high temperature, indirect contact and pre-heating, which uses a minimum quantity of steam. The process allows for good retention of volatile oil and minimal colour changes.
              </p>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 28 }}>
                Flexibility in the system allows for gentle pasteurisation or high-temperature sterilization cycles. Very low micro-results can easily be achieved, especially for seasonings where less than 10,000 TPC is required.
              </p>
              <div style={{
                background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 12, padding: '16px 20px',
                fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6,
              }}>
                <span style={{ color: CRIMSON, fontWeight: 700 }}>Post-sterilization packaging</span> takes place in a class 100,000 clean room utilising HEPA filters or high micron filters.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CRYOGENIC GRINDING ════════════════════════════════ */}
      <section id="cryogenic" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 16px' }}>Cryogenic Grinding</h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            Cryogenic grinding at -150°C preserves 40% more essential oils, colour, and aroma than conventional ambient grinding — making it the gold standard for premium spice processing.
          </p>

          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
            <div style={{ flex: '0 0 clamp(260px,40vw,460px)', borderRadius: 20, overflow: 'hidden', position: 'relative', height: 300 }}>
              <Image src="/images/cryo-dark.png" alt="Cryogenic Grinding" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(172,3,59,0.15), transparent)' }} />
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { stat: '-150°C', label: 'Operating Temperature' },
                  { stat: '40%', label: 'More Essential Oils Retained' },
                  { stat: '5-Log', label: 'Microbial Reduction' },
                ].map(s => (
                  <div key={s.stat} style={{
                    display: 'flex', alignItems: 'center', gap: 20,
                    background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)',
                    borderRadius: 12, padding: '16px 20px',
                  }}>
                    <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 700, color: CRIMSON, minWidth: 80 }}>{s.stat}</div>
                    <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CFG TECHNOLOGY ════════════════════════════════════ */}
      <section id="cfg" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 16px' }}>CFG Technology</h2>
          <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            Our patented Continuous Flow Grinding (CFG) process is the most advanced spice processing technology in India — combining precision milling with inline quality monitoring.
          </p>

          <div style={{ display: 'flex', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 clamp(260px,40vw,460px)', borderRadius: 20, overflow: 'hidden', position: 'relative', height: 300 }}>
              <Image src="/images/cfg-bg.png" alt="CFG Technology" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 24 }}>
                CFG eliminates batch-to-batch variation by continuously feeding, grinding, and classifying spices in a closed-loop system. Real-time sensor feedback adjusts the process parameters automatically, ensuring consistent colour, particle size, and microbiology lot after lot.
              </p>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8 }}>
                The system is validated under FDA 21 CFR Part 117 FSMA standards and is GMP-compliant, making LV Spices one of very few Indian processors capable of supplying direct to US and EU private label retailers.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
