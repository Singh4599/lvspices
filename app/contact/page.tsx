'use client';

import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import ContactHero from '@/components/contact/ContactHero';
import ScrollReveal, { StaggerReveal } from '@/components/ui/ScrollReveal';
import { VelocityMarquee } from '@/components/about/MarqueeSection';
import Phone3D from '@/components/ui/Phone3D';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

const subjects = [
  'General Inquiry',
  'Request Quotation',
  'Request Samples',
  'Private Label Partnership',
  'R&D Collaboration',
  'Bulk Export Order',
  'Careers',
  'Other',
];

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', country: '', subject: subjects[0], message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 18px', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px',
    fontSize: '14px', fontFamily: SANS, color: '#111', background: '#fafafa', outline: 'none', transition: 'border-color 200ms ease',
  };

  return (
    <main style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>

      {/* ══ SCROLL EXPANSION HERO ════════════════════════════════ */}
      <ContactHero />

      {/* ══ VELOCITY MARQUEE ══════════════════════════════════ */}
      <VelocityMarquee dark />

      {/* ══ SPLIT CONTACT SECTION ══════════════════════════════ */}
      <section id="contact-form" style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(40px,6vw,80px)' }}>
          
          {/* Left: Phone Gateway + Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <ScrollReveal fromY={24}>
              <Phone3D>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
                  <div style={{ width: '36px', height: '1.5px', background: CRIMSON }} />
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON }}>
                    Send a Message
                  </span>
                </div>

                {formState === 'sent' ? (
                  <div style={{ padding: '60px', border: '1px solid rgba(172,3,59,0.15)', borderRadius: '20px', textAlign: 'center', background: 'rgba(172,3,59,0.025)' }}>
                    <div style={{ width: '64px', height: '64px', margin: '0 auto 24px', borderRadius: '50%', background: 'rgba(172,3,59,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#AC033B" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                    </div>
                    <h3 style={{ fontFamily: SERIF, fontSize: '24px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>Message Received</h3>
                    <p style={{ fontFamily: SANS, fontSize: '14px', color: 'rgba(0,0,0,0.5)', lineHeight: 1.7 }}>
                      Our export team will reply within 24 business hours.<br />Check your spam folder if you don&apos;t hear from us.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontFamily: MONO, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '8px' }}>Full Name *</label>
                        <input required style={inputStyle} value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Your name" onFocus={e => (e.target.style.borderColor = CRIMSON)} onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontFamily: MONO, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '8px' }}>Email *</label>
                        <input required type="email" style={inputStyle} value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="you@company.com" onFocus={e => (e.target.style.borderColor = CRIMSON)} onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontFamily: MONO, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '8px' }}>Company</label>
                        <input style={inputStyle} value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} placeholder="Your company" onFocus={e => (e.target.style.borderColor = CRIMSON)} onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontFamily: MONO, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '8px' }}>Country</label>
                        <input style={inputStyle} value={formData.country} onChange={e => setFormData(p => ({ ...p, country: e.target.value }))} placeholder="United Kingdom" onFocus={e => (e.target.style.borderColor = CRIMSON)} onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontFamily: MONO, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '8px' }}>Subject *</label>
                      <select required style={{ ...inputStyle, cursor: 'pointer' }} value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} onFocus={e => (e.target.style.borderColor = CRIMSON)} onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')}>
                        {subjects.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontFamily: MONO, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '8px' }}>Message *</label>
                      <textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' }} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your requirements — products, volumes, destination..." onFocus={e => (e.target.style.borderColor = CRIMSON)} onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')} />
                    </div>

                    <button type="submit" disabled={formState === 'sending'} style={{
                      padding: '16px 40px', background: formState === 'sending' ? 'rgba(172,3,59,0.6)' : CRIMSON, color: '#fff',
                      border: 'none', borderRadius: '999px', fontSize: '14px', fontFamily: SANS, fontWeight: 600,
                      letterSpacing: '0.04em', cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                      alignSelf: 'flex-start', transition: 'all 0.25s',
                    }}
                      onMouseEnter={e => { if (formState !== 'sending') { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(172,3,59,0.3)'; } }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      {formState === 'sending' ? 'Sending...' : 'Send Message →'}
                    </button>
                  </form>
                )}
              </Phone3D>
            </ScrollReveal>
          </div>

          {/* Right: Contact Info only */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <ScrollReveal fromY={24} delay={0.1}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                <div style={{ width: '36px', height: '1.5px', background: CRIMSON }} />
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: CRIMSON }}>
                  Contact Details
                </span>
              </div>
            </ScrollReveal>

            <StaggerReveal stagger={0.06} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Address Card */}
              <div style={{ padding: '32px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(172,3,59,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: CRIMSON }}>
                    <MapPin size={20} />
                  </div>
                  <h3 style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 700, color: '#111' }}>Our Address</h3>
                </div>
                <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '20px' }} />
                <p style={{ fontFamily: SANS, fontSize: '14px', lineHeight: 1.7, color: 'rgba(0,0,0,0.55)', margin: 0 }}>
                  LV Spices Pvt. Ltd.<br />
                  Mumbai, Maharashtra, India<br />
                  <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '13px', display: 'block', marginTop: '8px' }}>Manufacturing: Bhiwandi Plant · Mon–Sat, 9am–6pm IST</span>
                </p>
              </div>

              {/* Contact Card */}
              <div style={{ padding: '32px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(172,3,59,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: CRIMSON }}>
                    <Mail size={20} />
                  </div>
                  <h3 style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 700, color: '#111' }}>Contact Us</h3>
                </div>
                <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '20px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a href="mailto:export@lvspices.com" style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: CRIMSON }}>
                      <Mail size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', fontFamily: MONO, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '4px' }}>Email</div>
                      <div style={{ fontSize: '14px', color: '#111', fontWeight: 600, fontFamily: SANS }}>export@lvspices.com</div>
                    </div>
                  </a>
                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.04)' }} />
                  <a href="tel:+91XXXXXXXXXX" style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: CRIMSON }}>
                      <Phone size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', fontFamily: MONO, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '4px' }}>Phone / WhatsApp</div>
                      <div style={{ fontSize: '14px', color: '#111', fontWeight: 600, fontFamily: SANS }}>+91 XXXXX XXXXX</div>
                    </div>
                  </a>
                </div>
              </div>
            </StaggerReveal>
          </div>

        </div>
      </section>

    </main>
  );
}
