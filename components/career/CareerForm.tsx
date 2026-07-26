'use client';

import { useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';

const CR = '#AC033B';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';

export default function CareerForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', applyingFor: '', message: '' });
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
    <section style={{ padding: 'clamp(60px,10vw,140px) 0', background: '#F8F6F1' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(40px,8vw,100px)', alignItems: 'center' }} className="form-layout">
          <style>{`
            @media (max-width: 900px) { .form-layout { grid-template-columns: 1fr !important; } }
            @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr !important; } }
          `}</style>

          {/* Left Side: Text and Image */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: CR }} />
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.22em', color: CR, textTransform: 'uppercase', fontWeight: 600 }}>We're Hiring</span>
            </div>
            
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(40px,5vw,72px)', fontWeight: 800, color: '#111', letterSpacing: '-0.04em', margin: '0 0 20px', lineHeight: 1.05 }}>
              Ready To<br/>Make An<br/><span style={{ color: CR, fontStyle: 'italic' }}>Impact?</span>
            </h2>
            
            <p style={{ fontFamily: SANS, fontSize: 'clamp(14px,1.1vw,16px)', color: '#6D6962', lineHeight: 1.7, maxWidth: 400, margin: '0 0 40px' }}>
              We are actively looking for passionate individuals to join our global operations. Fill out the application and our talent team will reach out within 3 business days.
            </p>

            <div style={{ position: 'relative', width: '100%', maxWidth: 340, aspectRatio: '4/3', borderRadius: 20, overflow: 'hidden' }}>
              <Image 
                src="/images/fac_lab.png" 
                alt="LV Spices Laboratory" 
                fill 
                style={{ objectFit: 'cover' }}
                sizes="(max-width:768px) 90vw, 30vw"
              />
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div style={{ 
            background: '#fff', 
            borderRadius: 32, 
            padding: 'clamp(32px,4vw,60px)', 
            boxShadow: '0 24px 80px rgba(17,17,17,0.06)'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
                  Application Received!
                </h3>
                <p style={{ fontFamily: SANS, fontSize: 15, color: '#6D6962', lineHeight: 1.7, margin: 0 }}>
                  Thank you for your interest in LV Spices. We will review your profile and be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 700, color: '#111', margin: '0 0 8px' }}>Apply Now</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="form-grid">
                  <PremiumInput label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                  <PremiumInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="form-grid">
                  <PremiumInput label="Contact Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="98765 43210" prefix="🇮🇳 +91" />
                  <PremiumInput label="Applying For" name="applyingFor" type="text" value={formData.applyingFor} onChange={handleChange} placeholder="e.g. Quality Manager" />
                </div>

                <PremiumInput label="Cover Letter / Message" name="message" type="textarea" value={formData.message} onChange={handleChange} placeholder="Tell us about your experience..." />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <label style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 600, marginLeft: 16 }}>
                    Resume / CV
                  </label>
                  <div style={{ 
                    display: 'flex', alignItems: 'center', gap: 16, 
                    background: '#F8F6F1', padding: '12px 16px', borderRadius: 16, border: '1px solid transparent',
                    transition: 'border-color 0.2s'
                  }}>
                    <label htmlFor="resume" style={{
                      background: '#111', color: '#fff',
                      fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '10px 20px', borderRadius: 100, cursor: 'pointer',
                      transition: 'all 0.2s', flexShrink: 0
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = CR; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111'; }}
                    >
                      Choose File
                    </label>
                    <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                      onChange={e => setFileName(e.target.files?.[0]?.name ?? 'No file chosen')}
                    />
                    <span style={{ fontFamily: SANS, fontSize: 13, color: '#6D6962', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {fileName}
                    </span>
                  </div>
                </div>

                <div style={{ paddingTop: 16 }}>
                  <button type="submit" style={{
                    width: '100%', background: '#111', color: '#fff',
                    fontFamily: SANS, fontSize: 14, fontWeight: 600,
                    padding: '20px', border: 'none', borderRadius: 16,
                    cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', letterSpacing: '0.04em', textTransform: 'uppercase'
                  }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.background = CR; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 12px 28px rgba(172,3,59,0.3)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.background = '#111'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PremiumInput({ label, name, type, value, onChange, placeholder, prefix }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111', fontWeight: 600, marginLeft: 16 }}>
        {label}
      </label>
      <div style={{ 
        display: 'flex', alignItems: 'center', 
        background: '#F8F6F1', borderRadius: 16, 
        border: '1px solid transparent', padding: '0 16px',
        transition: 'border-color 0.3s, background 0.3s'
      }}>
        {prefix && (
          <span style={{ fontFamily: SANS, fontSize: 14, color: '#111', marginRight: 12, paddingRight: 12, borderRight: '1px solid rgba(0,0,0,0.1)' }}>
            {prefix}
          </span>
        )}
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            rows={4}
            style={{ 
              width: '100%', background: 'transparent', border: 'none', outline: 'none', 
              color: '#111', fontFamily: SANS, fontSize: 15, resize: 'vertical',
              padding: '16px 0'
            }}
            onFocus={e => { e.currentTarget.parentElement!.style.borderColor = CR; e.currentTarget.parentElement!.style.background = '#fff'; }}
            onBlur={e => { e.currentTarget.parentElement!.style.borderColor = 'transparent'; e.currentTarget.parentElement!.style.background = '#F8F6F1'; }}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            style={{ 
              width: '100%', background: 'transparent', border: 'none', outline: 'none', 
              color: '#111', fontFamily: SANS, fontSize: 15,
              padding: '16px 0'
            }}
            onFocus={e => { e.currentTarget.parentElement!.style.borderColor = CR; e.currentTarget.parentElement!.style.background = '#fff'; }}
            onBlur={e => { e.currentTarget.parentElement!.style.borderColor = 'transparent'; e.currentTarget.parentElement!.style.background = '#F8F6F1'; }}
          />
        )}
      </div>
    </div>
  );
}
