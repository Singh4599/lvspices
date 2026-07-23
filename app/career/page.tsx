'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const perks = [
  { icon: '🌱', title: 'Growth', desc: 'Rapid career progression with mentorship from industry leaders.' },
  { icon: '🌍', title: 'Global Exposure', desc: 'Work with buyers, partners, and clients across 40+ countries.' },
  { icon: '🏆', title: 'Excellence Culture', desc: 'A quality-first environment that rewards precision and innovation.' },
  { icon: '🤝', title: 'Team Spirit', desc: 'A collaborative culture where every team member matters and grows together.' },
];

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', applyingFor: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('No file chosen');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111', overflow: 'hidden' }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <PageHero
        tag="Careers"
        heading="Work With"
        headingRed="The Best."
        subCopy="We are always looking for talented resources with experience in the Spice Trade to help us achieve our global ambitions. Join the LV Spices family."
        imageSrc="/images/farm-editorial.png"
        imageAlt="Careers at LV Spices"
        overlay="gradient-up"
        stats={[
          { value: '50+', label: 'Years of Excellence' },
          { value: '500+', label: 'Team Members' },
          { value: '40+', label: 'Countries Served' },
        ]}
      />

      {/* ══ VELOCITY MARQUEE ══════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ WHY LV SPICES ══════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, textAlign: 'center', marginBottom: 16 }}>Why Join Us</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(30px,4.5vw,60px)', fontWeight: 700, color: '#111', textAlign: 'center', letterSpacing: '-0.03em', margin: '0 0 56px' }}>
              More Than a Job. A Mission.
            </h2>
          </ScrollReveal>

          <StaggerReveal
            stagger={0.1}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(220px,22vw,280px), 1fr))', gap: 24 }}
          >
            {perks.map(p => (
              <div key={p.title} style={{
                background: '#fafafa', border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 20, padding: '32px 28px',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(172,3,59,0.35)'; el.style.background = 'rgba(172,3,59,0.03)'; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 8px 24px rgba(172,3,59,0.08)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,0,0,0.07)'; el.style.background = '#fafafa'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 700, color: '#111', margin: '0 0 10px' }}>{p.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 13.5, color: 'rgba(0,0,0,0.52)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ══ APPLICATION FORM ══════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)', background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <ScrollReveal fromY={30}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 16 }}>We're Hiring</div>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
                Apply Now
              </h2>
              <p style={{ fontFamily: SANS, fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
                Interested candidates can reach out to us by filling out the details below. Our team will get back to you within 3 business days.
              </p>
            </div>
          </ScrollReveal>

          {submitted ? (
            <ScrollReveal fromY={20}>
              <div style={{
                textAlign: 'center', background: 'rgba(172,3,59,0.05)', border: '1px solid rgba(172,3,59,0.2)',
                borderRadius: 20, padding: 'clamp(40px,6vw,80px)',
              }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
                  Application Submitted!
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(0,0,0,0.52)', lineHeight: 1.7, margin: 0 }}>
                  Thank you for your interest in joining LV Spices. Our team will review your application and be in touch within 3 business days.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal fromY={20} delay={0.1}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="form-grid">
                  <FormField label="Full Name">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required style={inputStyle} />
                  </FormField>
                  <FormField label="Email Address">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required style={inputStyle} />
                  </FormField>
                </div>

                {/* Phone + Applying For row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="form-grid">
                  <FormField label="Contact Number">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontFamily: SANS, fontSize: 14, color: '#111', display: 'flex', alignItems: 'center', gap: 6, borderRight: '1px solid rgba(0,0,0,0.15)', paddingRight: 12 }}>
                        🇮🇳 +91
                      </span>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Contact number" required style={{ ...inputStyle, background: 'transparent', border: 'none', padding: 0, flex: 1, outline: 'none' }} />
                    </div>
                  </FormField>
                  <FormField label="Applying For">
                    <input type="text" name="applyingFor" value={formData.applyingFor} onChange={handleChange} placeholder="e.g. Quality Manager" required style={inputStyle} />
                  </FormField>
                </div>

                {/* Message */}
                <FormField label="Your Message">
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about yourself and your experience..." required rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }} />
                </FormField>

                {/* Resume */}
                <FormField label="Resume / CV">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <label htmlFor="resume" style={{
                      background: CRIMSON, color: '#fff',
                      fontFamily: SANS, fontSize: 12, fontWeight: 600,
                      padding: '8px 18px', borderRadius: 999, cursor: 'pointer',
                      transition: 'opacity 0.2s',
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.8'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                    >
                      Choose File
                    </label>
                    <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                      onChange={e => setFileName(e.target.files?.[0]?.name ?? 'No file chosen')}
                    />
                    <span style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{fileName}</span>
                  </div>
                </FormField>

                <div style={{ paddingTop: 8 }}>
                  <button type="submit" style={{
                    background: '#111', color: '#fff',
                    fontFamily: SANS, fontSize: 14, fontWeight: 700,
                    padding: '14px 40px', border: 'none', borderRadius: 999,
                    cursor: 'pointer', transition: 'all 0.25s', letterSpacing: '0.02em',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.background = CRIMSON; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(172,3,59,0.25)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.background = '#111'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
                  >
                    Submit Application →
                  </button>
                </div>

                <style>{`
                  @media (max-width: 640px) {
                    .form-grid { grid-template-columns: 1fr !important; }
                  }
                `}</style>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ══ COMPANY PHOTO FOOTER ══════════════════════════════ */}
      <section style={{ padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)', background: '#111' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <ScrollReveal fromY={20}>
            <div style={{ borderRadius: 'clamp(16px,3vw,40px)', overflow: 'hidden', position: 'relative', height: 'clamp(200px,28vw,360px)' }}>
              <Image src="/images/farm.png" alt="LV Spices Team" fill style={{ objectFit: 'cover', opacity: 0.6 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.1) 100%)' }} />
              <div style={{ position: 'absolute', top: '50%', left: 'clamp(24px,5vw,80px)', transform: 'translateY(-50%)' }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D0375C', marginBottom: 12 }}>Built With Passion</div>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(22px,3vw,44px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  Be Part of Our Story.
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}

// ── Helper UI Components ────────────────────────────────────────────────────
function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid rgba(0,0,0,0.1)',
      borderRadius: 12, padding: '12px 16px',
      transition: 'border-color 0.2s',
    }}
      onFocusCapture={e => { (e.currentTarget as HTMLElement).style.borderColor = CRIMSON; }}
      onBlurCapture={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.1)'; }}
    >
      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 6 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'transparent', border: 'none',
  color: '#111', fontFamily: SANS, fontSize: 14,
  padding: '4px 0 8px', outline: 'none',
};
