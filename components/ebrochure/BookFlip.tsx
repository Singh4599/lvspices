'use client';

import { useState } from 'react';

const CR = '#AC033B';

const CSS = `
  @keyframes bf-open {
    from { transform: perspective(1200px) rotateY(0deg); }
    to   { transform: perspective(1200px) rotateY(-160deg); }
  }
  @keyframes bf-shake {
    0%,100%{transform:perspective(1200px) rotateY(-10deg)}
    50%{transform:perspective(1200px) rotateY(-20deg)}
  }
  @keyframes bf-float {
    0%,100%{transform:translateY(0) rotate(-2deg)}
    50%{transform:translateY(-10px) rotate(-2deg)}
  }
  @keyframes bf-glow {
    0%,100%{box-shadow:0 24px 80px rgba(172,3,59,0.15),0 8px 32px rgba(0,0,0,0.2)}
    50%{box-shadow:0 32px 100px rgba(172,3,59,0.28),0 12px 48px rgba(0,0,0,0.25)}
  }
  @keyframes bf-shimmer {
    0%{left:-100%} 100%{left:200%}
  }
  @keyframes bf-up {
    from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)}
  }
  .bf-book { animation: bf-float 4s ease-in-out infinite, bf-glow 3s ease-in-out infinite; }
  .bf-cover-open { animation: bf-open 1.2s cubic-bezier(.45,0,.55,1) forwards; transform-origin: left center; }
  .bf-cover-closed { transform: perspective(1200px) rotateY(-10deg); transform-origin: left center; transition: transform 0.4s ease; }
  .bf-cover-hover { transform: perspective(1200px) rotateY(-25deg) !important; }
  .bf-shimmer::after {
    content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.15) 50%,transparent 60%);
    animation:bf-shimmer 2.5s ease-in-out infinite; pointer-events:none;
  }
  .bf-page-reveal { animation: bf-up 0.4s ease forwards; }
`;

const PAGES = [
  {
    title: 'LV Spices',
    subtitle: 'Premium Spice Manufacturer',
    content: 'Est. 1975',
    isCover: true,
    bg: `linear-gradient(135deg, #1a0808 0%, #4a0f1a 50%, ${CR} 100%)`,
    accent: '#fff',
  },
  {
    title: 'About Us',
    subtitle: '50 Years of Excellence',
    content: 'From a family enterprise founded in 1975, LV Spices has grown into one of India\'s most trusted spice manufacturers — 200 MT daily capacity, 500+ SKUs, exported to 40+ countries.',
    bg: '#fff',
    accent: CR,
  },
  {
    title: 'Our Products',
    subtitle: '500+ SKUs • 12 Categories',
    content: 'Whole Spices • Ground Spices • Blended Masalas • Chilli Speciality • Agri Products • Organic Range • Supermarket Packs • Dehydrated Vegetables • Botanical Powders • Herbal Teas',
    bg: '#fafafa',
    accent: '#1a3f6b',
  },
  {
    title: 'Certifications',
    subtitle: 'Global Food Safety Standards',
    content: 'FSSC 22000 • HACCP • ISO 22000 • FSSAI • NABL • BRC Grade AA • Halal • Kosher • USFDA Compliant • EU Food Safety Regulations • Spices Board of India',
    bg: '#fff',
    accent: '#1a6b3c',
  },
  {
    title: 'Export Markets',
    subtitle: '40+ Countries Worldwide',
    content: 'USA • UK • Germany • France • Netherlands • UAE • Saudi Arabia • Japan • Singapore • Australia • Canada • New Zealand • South Africa • and 30+ more markets',
    bg: '#fafafa',
    accent: '#5c1a6b',
  },
  {
    title: 'Private Label',
    subtitle: 'Your Brand. Our Expertise.',
    content: 'In-house design team • Custom packaging • OEM manufacturing • Brand launch support • 7-day first draft • MOQ from 500 kg per SKU',
    bg: '#fff',
    accent: CR,
  },
];

function BookPage({ page, isVisible, delay = 0 }: { page: typeof PAGES[0]; isVisible: boolean; delay?: number }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: page.bg,
      borderRadius: '0 16px 16px 0',
      padding: 'clamp(24px,4vw,40px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.3s',
      transitionDelay: `${delay}s`,
    }}>
      {/* Top mark */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: 24, height: 4, background: page.accent, borderRadius: 999 }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>
          LV Spices
        </div>
      </div>

      {/* Content */}
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: page.accent, marginBottom: 12, opacity: 0.8 }}>
          {page.subtitle}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(20px,3vw,32px)', fontWeight: 800, color: page.isCover ? '#fff' : '#111', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {page.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(11px,1vw,13px)', color: page.isCover ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)', lineHeight: 1.75, margin: 0 }}>
          {page.content}
        </p>
      </div>

      {/* Bottom decoration */}
      <div style={{ height: 2, background: `linear-gradient(to right, ${page.accent}, transparent)`, borderRadius: 999, opacity: 0.3 }} />
    </div>
  );
}

export default function BookFlip() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(true);
    setTimeout(() => setIsAnimating(false), 1300);
  };

  const nextPage = () => {
    if (currentPage < PAGES.length - 1) setCurrentPage(p => p + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  return (
    <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,4vw,56px)', background: '#F8F6F1', position: 'relative', overflow: 'hidden' }}>
      <style>{CSS}</style>

      {/* BG texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,60px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: CR, marginBottom: 12 }}>
            Digital Brochure
          </div>
          <h2 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(28px,4.5vw,56px)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
            Flip Through Our <em style={{ color: CR, fontStyle: 'italic' }}>Story</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(0,0,0,0.45)', maxWidth: 400, margin: '0 auto' }}>
            Click to open and explore our catalogue. Download the full PDF below.
          </p>
        </div>

        {/* Book + Controls layout */}
        <div style={{ display: 'flex', gap: 'clamp(24px,5vw,60px)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>

          {/* 3D BOOK */}
          <div
            className="bf-book"
            style={{
              position: 'relative',
              width: 'clamp(240px,35vw,340px)',
              height: 'clamp(300px,44vw,420px)',
              cursor: isOpen ? 'default' : 'pointer',
              flexShrink: 0,
            }}
            onClick={!isOpen ? handleOpen : undefined}
          >
            {/* Book spine (left edge) */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 24,
              background: `linear-gradient(to right, #2a0a10, ${CR})`,
              borderRadius: '8px 0 0 8px',
              boxShadow: 'inset -2px 0 8px rgba(0,0,0,0.3)',
              zIndex: 3,
            }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(-90deg)', fontFamily: 'var(--font-mono)', fontSize: 7, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
                LV SPICES
              </div>
            </div>

            {/* Pages stack (depth illusion) */}
            {[4, 3, 2, 1].map(i => (
              <div key={i} style={{
                position: 'absolute',
                left: 24 + i * 1.5,
                top: i * 0.5,
                right: -i * 0.5,
                bottom: i * 0.5,
                background: i % 2 === 0 ? '#f5f0eb' : '#ede8e2',
                borderRadius: '0 8px 8px 0',
                border: '1px solid rgba(0,0,0,0.06)',
              }} />
            ))}

            {/* Book pages (open view) */}
            {isOpen && (
              <div className="bf-page-reveal" style={{
                position: 'absolute', left: 24, top: 0, right: 0, bottom: 0,
                background: '#fff',
                borderRadius: '0 16px 16px 0',
                border: '1px solid rgba(0,0,0,0.08)',
                overflow: 'hidden',
              }}>
                {PAGES.map((page, i) => (
                  <BookPage key={i} page={page} isVisible={currentPage === i} delay={0.1} />
                ))}
              </div>
            )}

            {/* Cover (front) */}
            <div
              className={`bf-shimmer ${isOpen ? 'bf-cover-open' : 'bf-cover-closed'}`}
              style={{
                position: 'absolute', left: 24, top: 0, right: 0, bottom: 0,
                background: `linear-gradient(135deg, #1a0808 0%, #4a0f1a 50%, ${CR} 100%)`,
                borderRadius: '0 16px 16px 0',
                border: `1px solid ${CR}30`,
                zIndex: 2,
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
              }}
            >
              {/* Cover content */}
              <div style={{ textAlign: 'center', padding: 'clamp(20px,3vw,32px)', position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>LV</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>SPICES</div>
                <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.25)', margin: '0 auto 24px' }} />
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  Export Catalogue<br />2025–26
                </div>
                {!isOpen && (
                  <div style={{ marginTop: 20, fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '6px 14px' }}>
                    Click to Open
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Controls + info */}
          <div style={{ flex: 1, minWidth: 240 }}>
            {isOpen ? (
              <div key="open" className="bf-page-reveal">
                {/* Page indicator */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)', marginBottom: 20 }}>
                  Page {currentPage + 1} of {PAGES.length}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                  {PAGES[currentPage].title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, margin: '0 0 32px' }}>
                  {PAGES[currentPage].content}
                </p>

                {/* Nav controls */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                  <button onClick={prevPage} disabled={currentPage === 0} style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                    padding: '11px 22px', borderRadius: 999, cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                    background: 'transparent', border: '1.5px solid rgba(0,0,0,0.15)',
                    color: 'rgba(0,0,0,0.5)', opacity: currentPage === 0 ? 0.4 : 1, transition: 'all 0.2s',
                  }}>← Prev</button>
                  <button onClick={nextPage} disabled={currentPage === PAGES.length - 1} style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                    padding: '11px 22px', borderRadius: 999, cursor: currentPage === PAGES.length - 1 ? 'not-allowed' : 'pointer',
                    background: CR, color: '#fff', border: 'none',
                    opacity: currentPage === PAGES.length - 1 ? 0.4 : 1, transition: 'all 0.2s',
                  }}>Next →</button>
                </div>

                {/* Page dots */}
                <div style={{ display: 'flex', gap: 6 }}>
                  {PAGES.map((_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i)} style={{
                      width: currentPage === i ? 20 : 6, height: 6, borderRadius: 999,
                      background: currentPage === i ? CR : 'rgba(0,0,0,0.15)',
                      border: 'none', cursor: 'pointer', transition: 'all 0.25s', padding: 0,
                    }} />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: CR, marginBottom: 16 }}>
                  Digital Catalogue
                </div>
                <h3 style={{ fontFamily: 'var(--font-display,Georgia,serif)', fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
                  Everything In One<br />Document
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, margin: '0 0 28px' }}>
                  Our export catalogue covers all 500+ products, certifications, packaging formats, and MOQ details. Click the book to explore, or download the PDF.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button onClick={handleOpen} style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                    padding: '13px 28px', borderRadius: 999, background: CR, color: '#fff',
                    border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                  >
                    📖 Open Catalogue
                  </button>
                  <a href="/brochure.pdf" download style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                    padding: '13px 24px', borderRadius: 999,
                    border: '1.5px solid rgba(0,0,0,0.15)', color: 'rgba(0,0,0,0.6)',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = CR; el.style.color = CR; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(0,0,0,0.15)'; el.style.color = 'rgba(0,0,0,0.6)'; }}
                  >
                    ↓ Download PDF
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
