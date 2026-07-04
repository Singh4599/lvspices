'use client';

import { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Phone, Mail, MapPin } from 'lucide-react';

const CRIMSON = '#AC033B';

const sections = [
  {
    title: 'Products',
    links: [
      { label: 'Spices & Seasoning', href: '/products/spices-seasoning' },
      { label: 'No Onion No Garlic', href: '/products/no-onion-no-garlic' },
      { label: 'Curry Powder', href: '/products/curry-powder' },
      { label: 'Snack Seasoning', href: '/products/snack-seasoning' },
      { label: 'Agri Products', href: '/products/agri-products' },
      { label: 'Organic Line', href: '/products/organic' },
      { label: 'Supermarket Range', href: '/products/supermarket' },
      { label: 'Millet Products', href: '/products/millet' },
      { label: 'Chilli Speciality', href: '/products/chilli-speciality' },
      { label: 'Dehydrated', href: '/products/dehydrated' },
      { label: 'Botanical Powders', href: '/products/botanical-powders' },
      { label: 'Herbal Teas', href: '/products/herbal-teas' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '/story' },
      { label: 'Mission & Vision', href: '/mission' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Global Network', href: '/global-network' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Technology',
    links: [
      { label: 'Overview', href: '/technology' },
      { label: 'Infrastructure', href: '/technology/infrastructure' },
      { label: 'Cryogenic Grinding', href: '/technology/cryogenic-grinding' },
      { label: 'Steam Sterilization', href: '/technology/steam-sterilization' },
      { label: 'CFG Science', href: '/technology/cfg-science' },
      { label: 'Quality Assurance', href: '/technology/quality-assurance' },
      { label: 'Process Flow', href: '/technology/process-flow' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Download Catalog', href: '/catalog' },
      { label: 'Private Label Service', href: '/private-label' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

/* ── Mobile accordion section ── */
function AccordionSection({ title, links, isOpen, onToggle }: { title: string; links: { label: string; href: string }[]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <button
        onClick={onToggle}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600 }}>{title}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
          style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <path d="M5 7.5L10 12.5L15 7.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: isOpen ? `${links.length * 44 + 24}px` : '0px', transition: 'max-height 0.35s ease' }}>
        <div style={{ paddingBottom: 16, display: 'flex', flexDirection: 'column' }}>
          {links.map((l) => (
            <Link key={l.label} href={l.href}
              style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', padding: '7px 0', display: 'block', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = CRIMSON)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Desktop link column ── */
function DesktopCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 10, fontWeight: 700 }}>
        {title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {links.map((l) => (
          <Link key={l.label} href={l.href}
            className="font-sans text-white/45 hover:text-[#AC033B] transition-colors"
            style={{ fontSize: '11.5px', textDecoration: 'none', whiteSpace: 'nowrap', lineHeight: 1, display: 'flex', alignItems: 'center', height: 18 }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <>
      <footer style={{ background: '#000', color: '#fff', position: 'relative', zIndex: 2 }}>

        {/* ════════════════════════════════════
            MOBILE FOOTER  (hidden on ≥768px)
        ════════════════════════════════════ */}
        <div className="footer-mobile">
          {/* Brand + social */}
          <div style={{ padding: '40px 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.7rem', letterSpacing: '-0.02em', color: '#fff' }}>
                LV <span style={{ color: CRIMSON }}>Spices</span>
              </span>
            </Link>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 300, marginBottom: 20 }}>
              Premium, globally certified spices — engineered for scale, purity, and excellence.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { href: siteConfig.social.linkedin || '#', label: 'LinkedIn', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
                { href: siteConfig.social.twitter || '#', label: 'Twitter', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { href: '#', label: 'Instagram', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
              ].map(({ href, label, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = CRIMSON)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)')}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          {/* Accordion */}
          <div style={{ padding: '0 24px' }}>
            {sections.map((s) => (
              <AccordionSection 
                key={s.title} 
                title={s.title} 
                links={s.links} 
                isOpen={openSection === s.title}
                onToggle={() => setOpenSection(openSection === s.title ? null : s.title)}
              />
            ))}
          </div>
          {/* Mobile bottom bar */}
          <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
              © {currentYear} LV Spices. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms & Conditions', href: '/terms' }].map((l) => (
                <Link key={l.label} href={l.href}
                  style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════
            DESKTOP FOOTER  (hidden on <768px)
        ════════════════════════════════════ */}
        <div className="footer-desktop">
          <div style={{ maxWidth: 1440, margin: '0 auto', background: 'rgba(255,255,255,0.04)', borderRadius: 24, padding: 'clamp(32px,5vw,64px)', display: 'flex', flexDirection: 'row', gap: 'clamp(32px,5vw,80px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Brand column */}
            <div style={{ flex: '0 0 240px', minWidth: 180 }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <span className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.6rem,2.5vw,2rem)', letterSpacing: '-0.02em' }}>
                  LV <span style={{ color: CRIMSON }}>Spices</span>
                </span>
              </Link>
              <p className="font-sans text-white/45 leading-relaxed" style={{ fontSize: 14, marginTop: 16, maxWidth: 220 }}>
                Experience the luxury of premium, globally certified spices. Engineered for scale, purity, and excellence without compromise.
              </p>
            </div>
            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full gap-x-2 gap-y-4 md:gap-x-4 md:gap-y-4" style={{ flex: 1, minWidth: 240 }}>
              {/* Products — 2 cols */}
              <div className="col-span-2">
                <h4 className="font-mono uppercase text-white font-bold" style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 10 }}>Products</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 0, columnGap: 20 }}>
                  {sections[0].links.map((l) => (
                    <Link key={l.label} href={l.href}
                      className="font-sans text-white/45 hover:text-[#AC033B] transition-colors"
                      style={{ fontSize: '11.5px', textDecoration: 'none', whiteSpace: 'nowrap', lineHeight: 1, display: 'flex', alignItems: 'center', height: 18 }}
                    >{l.label}</Link>
                  ))}
                </div>
              </div>
              <DesktopCol title="Company" links={sections[1].links} />
              <DesktopCol title="Technology" links={sections[2].links} />
              <DesktopCol title="Resources" links={sections[3].links} />
              {/* Contact */}
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-mono uppercase text-white font-bold" style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 10 }}>Contact</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <a href={`tel:${siteConfig.contact.phone}`} className="font-sans text-white/45 hover:text-[#AC033B] transition-colors" style={{ fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Phone className="w-4 h-4 shrink-0" />{siteConfig.contact.phone}
                  </a>
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-sans text-white/45 hover:text-[#AC033B] transition-colors" style={{ fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Mail className="w-4 h-4 shrink-0" />{siteConfig.contact.email}
                  </a>
                  <div className="font-sans text-white/45" style={{ fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />{siteConfig.hq.city}, {siteConfig.hq.country}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Desktop bottom bar */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="font-sans text-white/35" style={{ fontSize: '12.5px' }}>© {currentYear} LV Spices. All rights reserved.</span>
              <Link href="/privacy" className="font-sans text-white/35 hover:text-[#AC033B] transition-colors" style={{ fontSize: '12.5px', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/terms" className="font-sans text-white/35 hover:text-[#AC033B] transition-colors" style={{ fontSize: '12.5px', textDecoration: 'none' }}>Terms & Conditions</Link>
            </div>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <a href={siteConfig.social.linkedin || '#'} target="_blank" rel="nofollow noopener" aria-label="LinkedIn" className="text-white/35 hover:text-[#AC033B] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href={siteConfig.social.twitter || '#'} target="_blank" rel="nofollow noopener" aria-label="Twitter (X)" className="text-white/35 hover:text-[#AC033B] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>

      </footer>

      {/* WhatsApp floating */}
      <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 70, width: 56, height: 56, borderRadius: '50%', background: CRIMSON, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(172,3,59,0.35)', transition: 'transform 0.25s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1) translateY(-2px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)'; }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
