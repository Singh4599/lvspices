'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ── Data ─────────────────────────────────────────────── */
type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Company',
    children: [
      { label: 'Overview', href: '/overview' },
      { label: 'About Us', href: '/about-us' },
      { label: 'Our Services', href: '/our-services' },
      { label: 'Our Team', href: '/our-team' },
      { label: 'IPM', href: '/ipm' },
      { label: 'How We Operate', href: '/how-we-operate' },
      { label: 'Facilities', href: '/facilities' },
      { label: 'Career', href: '/career' },
      { label: 'Testimonials', href: '/testimonials' },
    ],
  },
  {
    label: 'Technology & QA',
    children: [
      { label: 'Technology', href: '/technology' },
      { label: 'Quality Assurance', href: '/quality-assurance' },
      { label: 'Quality Control', href: '/quality-control-and-training' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Analytical Lab', href: '/analytical' },
      { label: 'Process Chart', href: '/process-chart' },
      { label: 'Research & Development', href: '/research-and-development' },
    ],
  },
  {
    label: 'Products',
    children: [
      { label: 'All Products', href: '/products' },
      { label: 'Chilli Speciality', href: '/chilli-speciality' },
      { label: 'E-Brochure', href: '/e-brochure' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Spice Diary', href: '/spice-diary' },
      { label: 'Spice School', href: '/spice-school' },
      { label: 'Explore World', href: '/explore-world' },
      { label: 'Private Label', href: '/packaging-and-private-labelling' },
      { label: 'FAQ', href: '/faq' },
    ]
  },
  { label: 'Contact Us', href: '/contact' },
];

/* ── Dropdown (desktop) ───────────────────────────────── */
function NavDropdown({
  item, isOpen, onEnter, onLeave,
}: {
  item: NavItem;
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const hasChildren = !!item.children?.length;

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={hasChildren ? onEnter : undefined}
      onMouseLeave={hasChildren ? onLeave : undefined}
    >
      <Link
        href={item.href || '#'}
        onClick={e => { if (hasChildren && !item.href) e.preventDefault(); }}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '8px 18px',
          fontSize: 15.5, fontWeight: 700,
          color: '#111',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.01em',
          transition: 'color 0.18s',
        }}
        onMouseEnter={e => { if (!hasChildren) (e.currentTarget as HTMLElement).style.color = '#111111'; }}
        onMouseLeave={e => { if (!hasChildren) (e.currentTarget as HTMLElement).style.color = '#111'; }}
      >
        {item.label}
        {hasChildren && (
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none', color: '#111111' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>

      {/* Dropdown panel */}
      {hasChildren && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          minWidth: 240,
          background: '#fff',
          boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
          borderTop: '2px solid #111111',
          borderRadius: '0 0 8px 8px',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.2s, transform 0.2s',
          zIndex: 1000,
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto'
        }}>
          {item.children!.map(child => (
            <Link
              key={child.href}
              href={child.href}
              style={{
                display: 'block',
                padding: '10px 18px',
                fontSize: 13.5,
                color: '#333',
                textDecoration: 'none',
                borderBottom: '1px solid #f2f2f2',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#f5f5f5';
                (e.currentTarget as HTMLElement).style.color = '#111111';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#fff';
                (e.currentTarget as HTMLElement).style.color = '#333';
              }}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Mobile accordion item ────────────────────────────── */
function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children?.length;

  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
      {hasChildren ? (
        <>
          <button
            onClick={() => setOpen(p => !p)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 24px', fontSize: 15, fontWeight: 600, color: '#111',
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}
          >
            {item.label}
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke='#111111' strokeWidth="2.5"
              style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div style={{ background: '#fafafa', paddingBottom: 8 }}>
              {item.children!.map(child => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '11px 32px', fontSize: 13.5, color: '#444',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#111111', flexShrink: 0 }} />
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href!}
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 24px', fontSize: 15, fontWeight: 600, color: '#111',
            textDecoration: 'none',
          }}
        >
          {item.label}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}

/* ── Main Navbar ──────────────────────────────────────── */
export default function Navbar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleEnter = useCallback((i: number) => {
    clearTimeout(timers.current[i]);
    setOpenIndex(i);
  }, []);

  const handleLeave = useCallback((i: number) => {
    timers.current[i] = setTimeout(() => setOpenIndex(prev => prev === i ? null : prev), 180);
  }, []);

  return (
    <>
      {/* ─── MAIN NAVBAR ─────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        background: '#fff',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(0,0,0,0.07)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.1)' : 'none',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <Image src="/logo.png" alt="LV Spices" width={48} height={48} style={{ objectFit: 'contain' }} priority />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.08em', color: '#111111' }}>LV SPICES</div>
              <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.12em', color: '#888', textTransform: 'uppercase' }}>Since 1985</div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }} className="desktop-nav">
            {navItems.map((item, i) => (
              <NavDropdown
                key={item.label}
                item={item}
                isOpen={openIndex === i}
                onEnter={() => handleEnter(i)}
                onLeave={() => handleLeave(i)}
              />
            ))}
          </div>

          {/* Right: 365 Brand + Buy Now + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>

            {/* 365 Spicery brand badge — desktop */}
            <a
              href="https://365spicery.com"
              target="_blank"
              rel="noopener noreferrer"
              className="desktop-nav"
              id="nav-365spicery-badge"
              style={{
                display: 'flex', alignItems: 'center',
                textDecoration: 'none',
                transition: 'transform 0.18s, filter 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-1px)';
                el.style.filter = 'brightness(0.95)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'none';
                el.style.filter = 'none';
              }}
            >
              {/* Logo slab — show the actual brand mark large */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/365spicery.webp"
                alt="365 Spicery"
                style={{
                  height: 58,
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}
              />
            </a>

            {/* Buy Now — desktop */}
            <a
              href="https://365spicery.com"
              target="_blank"
              rel="noopener noreferrer"
              className="desktop-nav"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#111111', color: '#fff',
                padding: '11px 24px', borderRadius: 999,
                fontSize: 13, fontWeight: 700, letterSpacing: '0.07em',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 14px rgba(17,17,17,0.28)',
                transition: 'background 0.2s, box-shadow 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#333333';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(17,17,17,0.42)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#111111';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 14px rgba(17,17,17,0.28)';
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              Buy Now
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Hamburger — mobile */}
            <button
              className="mobile-nav"
              onClick={() => setIsMobileOpen(p => !p)}
              aria-label="Toggle menu"
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                width: 40, height: 40, gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 2, background: '#111', borderRadius: 2,
                  transition: 'transform 0.28s cubic-bezier(.5,0,.5,1), opacity 0.2s',
                  transform: isMobileOpen
                    ? i === 0 ? 'translateY(7px) rotate(45deg)'
                    : i === 1 ? 'scaleX(0)'
                    : 'translateY(-7px) rotate(-45deg)'
                    : 'none',
                  opacity: isMobileOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── MOBILE MENU ─────────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        pointerEvents: isMobileOpen ? 'auto' : 'none',
      }}>
        {/* Backdrop */}
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
            opacity: isMobileOpen ? 1 : 0, transition: 'opacity 0.3s',
          }}
        />

        {/* Drawer */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 'min(340px, 88vw)', height: '100%',
          background: '#fff', overflowY: 'auto',
          transform: isMobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: '4px 0 32px rgba(0,0,0,0.15)',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Drawer header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 24px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fff', flexShrink: 0,
          }}>
            <Link href="/" onClick={() => setIsMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <Image src="/logo.png" alt="LV Spices" width={38} height={38} style={{ objectFit: 'contain' }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#111111' }}>LV SPICES</div>
                <div style={{ fontSize: 9, color: '#aaa', letterSpacing: '0.08em' }}>SINCE 1985</div>
              </div>
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close"
              style={{
                width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#f5f5f5', borderRadius: 8, border: 'none', cursor: 'pointer',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {navItems.map(item => (
              <MobileNavItem key={item.label} item={item} onClose={() => setIsMobileOpen(false)} />
            ))}
          </div>

          {/* Quick links */}
          <div style={{ padding: '16px 20px', background: '#111', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* 365 Spicery badge — mobile */}
            <a
              href="https://365spicery.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/365spicery.webp"
                alt="365 Spicery"
                style={{ width: 'auto', height: 52, borderRadius: 6, display: 'block' }}
              />
            </a>
            <a
              href="https://365spicery.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: '#111111', color: '#fff', padding: '10px 20px',
                borderRadius: 999, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
                textDecoration: 'none', boxShadow: '0 2px 10px rgba(17,17,17,0.3)',
              }}
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav  { display: none  !important; }
        @media (max-width: 1024px) {
          .desktop-nav { display: none  !important; }
          .mobile-nav  { display: flex  !important; }
        }
      `}</style>
    </>
  );
}
