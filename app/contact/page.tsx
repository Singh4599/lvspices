'use client';

import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { ShuffleGrid } from '@/components/ui/ShuffleGrid';

const stats = [
  { value: '24hr', label: 'Response Time' },
  { value: '50+', label: 'Countries Served' },
  { value: 'B2B', label: 'Specialist' },
  { value: '500+', label: 'SKUs Available' },
];

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
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    color: '#ffffff',
    background: 'rgba(255,255,255,0.05)',
    outline: 'none',
    transition: 'border-color 200ms ease',
  };

  return (
    <>

      {/* ── SPLIT HERO ───────────────────────────────────────────── */}
      <section style={{ paddingTop: 'clamp(100px, 9vw, 160px)', overflow: 'hidden' }}>
        <div className="split-hero-grid">
          {/* LEFT */}
          <div className="split-hero-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <div style={{ width: '36px', height: '1.5px', background: '#AC033B', flexShrink: 0 }} />
              <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>
                Get in Touch
              </span>
            </div>

            <h1
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 5.2rem)', lineHeight: '0.92', letterSpacing: '-0.02em', marginBottom: '28px' }}
            >
              Let's build
              <br />
              <span className="text-[#AC033B] italic font-serif font-medium">together.</span>
            </h1>

            <p
              className="text-white/50 leading-relaxed"
              style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)', maxWidth: '440px', marginBottom: '40px' }}
            >
              Whether you need a quotation, samples, or a custom private-label formulation —
              our export team responds within 24 hours.
            </p>

            <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 36px)', flexWrap: 'wrap' }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono font-bold text-[#AC033B]" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)', lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
                  <div className="font-mono uppercase text-white/30" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — animated shuffle mosaic */}
          <div className="split-hero-right">
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '20px', overflow: 'hidden' }}>
              <ShuffleGrid />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM + INFO ──────────────────────────────────── */}
      <section style={{ paddingTop: 'clamp(60px, 8vw, 120px)', paddingBottom: 'clamp(60px, 8vw, 120px)' }}>
        <div className="container-lv">
          <div className="contact-form-grid">

            {/* FORM */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
                <div style={{ width: '36px', height: '1.5px', background: '#AC033B' }} />
                <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Send a Message</span>
              </div>

              {formState === 'sent' ? (
                <div style={{ padding: '60px', border: '1.5px solid rgba(172,3,59,0.15)', borderRadius: '20px', textAlign: 'center', background: 'rgba(172,3,59,0.025)' }}>
                  <div style={{ width: '64px', height: '64px', margin: '0 auto 24px', borderRadius: '50%', background: 'rgba(172,3,59,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#AC033B" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-white" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Message Received</h3>
                  <p className="text-white/50" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                    Our export team will reply within 24 business hours.
                    Check your spam folder if you don't hear from us.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-row-grid">
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>Full Name *</label>
                      <input required style={inputStyle} value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Your name" onFocus={e => (e.target.style.borderColor = '#AC033B')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>Email *</label>
                      <input required type="email" style={inputStyle} value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="you@company.com" onFocus={e => (e.target.style.borderColor = '#AC033B')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                  </div>

                  <div className="form-row-grid">
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>Company</label>
                      <input style={inputStyle} value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} placeholder="Your company" onFocus={e => (e.target.style.borderColor = '#AC033B')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>Country</label>
                      <input style={inputStyle} value={formData.country} onChange={e => setFormData(p => ({ ...p, country: e.target.value }))} placeholder="United Kingdom" onFocus={e => (e.target.style.borderColor = '#AC033B')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>Subject *</label>
                    <select required style={{ ...inputStyle, cursor: 'pointer' }} value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#AC033B')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}>
                      {subjects.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>Message *</label>
                    <textarea required rows={5} style={{ ...inputStyle, resize: 'vertical' }} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your requirements — products, volumes, destination..." onFocus={e => (e.target.style.borderColor = '#AC033B')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    style={{
                      padding: '14px 40px',
                      background: formState === 'sending' ? 'rgba(172,3,59,0.6)' : '#AC033B',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontFamily: 'monospace',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                      alignSelf: 'flex-start',
                      transition: 'transform 150ms ease, box-shadow 150ms ease',
                    }}
                    onMouseEnter={e => { if (formState !== 'sending') { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(172,3,59,0.28)'; } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    {formState === 'sending' ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>

            {/* SIDE INFO CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                <div style={{ width: '36px', height: '1.5px', background: '#AC033B' }} />
                <span className="font-mono uppercase text-[#AC033B]" style={{ fontSize: '11px', letterSpacing: '0.28em' }}>Contact Details</span>
              </div>

              {/* Card 1 — Address */}
              <div className="infrastructure-card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AC033B', flexShrink: 0 }}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-white" style={{ fontSize: '1.05rem' }}>Our Address</h3>
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '18px' }} />
                <p style={{ fontSize: '13.5px', lineHeight: '1.75', color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
                  LV Spices Pvt. Ltd.<br />
                  Mumbai, Maharashtra, India<br />
                  <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px' }}>Manufacturing: Bhiwandi Plant · Mon–Sat, 9am–6pm IST</span>
                </p>
              </div>

              {/* Card 2 — Contact */}
              <div className="infrastructure-card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(172,3,59,0.06)', border: '1px solid rgba(172,3,59,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AC033B', flexShrink: 0 }}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-white" style={{ fontSize: '1.05rem' }}>Contact Us</h3>
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '18px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <a href="mailto:export@lvspices.com" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(172,3,59,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AC033B', flexShrink: 0 }}>
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '2px' }}>Email</div>
                      <div style={{ fontSize: '13.5px', color: '#AC033B', fontWeight: 600 }}>export@lvspices.com</div>
                    </div>
                  </a>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />
                  <a href="tel:+91XXXXXXXXXX" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(172,3,59,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AC033B', flexShrink: 0 }}>
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '2px' }}>Phone / WhatsApp</div>
                      <div style={{ fontSize: '13.5px', color: '#AC033B', fontWeight: 600 }}>+91 XXXXX XXXXX</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero split ── */
        .split-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
          align-items: stretch;
        }
        .split-hero-left {
          padding-left: clamp(1.5rem, 6vw, 8rem);
          padding-right: clamp(2rem, 4vw, 5rem);
          padding-bottom: 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .split-hero-right {
          position: relative;
          min-height: 360px;
          padding: 20px 28px 20px 0;
        }
        /* ── Contact form ── */
        .contact-form-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 64px;
          align-items: start;
        }
        /* ── Form row inputs ── */
        .form-row-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .contact-form-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        /* ── Mobile ── */
        @media (max-width: 768px) {
          .split-hero-grid {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .split-hero-left {
            padding-left: clamp(1.2rem, 5vw, 2.5rem);
            padding-right: clamp(1.2rem, 5vw, 2.5rem);
            padding-bottom: 32px;
            padding-top: 12px;
          }
          .split-hero-right {
            min-height: 320px;
            padding: 0 16px 32px 16px;
          }
          .form-row-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
