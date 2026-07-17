'use client';

import { useState } from 'react';
import Image from 'next/image';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    applyingFor: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Application submitted successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', overflow: 'hidden' }}>
      
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: 'clamp(300px, 40vw, 480px)' }}>
        {/* Placeholder image (since we don't have the exact silhouette one) */}
        <Image
          src="/images/farm-editorial.png"
          alt="Careers at LV Spices"
          fill
          style={{ objectFit: 'cover', opacity: 0.6 }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.4) 100%)' }} />
        
        <div style={{ position: 'absolute', bottom: 'clamp(30px, 6vw, 60px)', left: 'clamp(24px, 5vw, 80px)' }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '12px 24px',
            display: 'inline-block'
          }}>
            <h1 style={{ fontFamily: SANS, fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
              Work With Us
            </h1>
          </div>
        </div>
      </section>

      {/* ══ FORM SECTION ══════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
              We're Hiring!
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 'clamp(13px, 1.1vw, 15px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
              We are always looking for talented resources with experience in the Spice Trade to help us achieve our goals. Interested candidates can reach out to us by filling out the details below.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, '@media (max-width: 640px)': { gridTemplateColumns: '1fr' } } as any}>
            
            {/* Form Styles */}
            <style dangerouslySetInnerHTML={{__html: `
              .form-fieldset {
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 12px;
                padding: 0 16px;
                margin: 0;
                transition: border-color 0.2s;
              }
              .form-fieldset:focus-within {
                border-color: ${CRIMSON};
              }
              .form-legend {
                font-family: ${SANS};
                font-size: 11px;
                color: rgba(255,255,255,0.5);
                padding: 0 4px;
                margin-left: 8px;
              }
              .form-input {
                width: 100%;
                background: transparent;
                border: none;
                color: #fff;
                font-family: ${SANS};
                font-size: 14px;
                padding: 12px 0 16px;
                outline: none;
              }
              .form-input::placeholder {
                color: rgba(255,255,255,0.2);
              }
              @media (max-width: 640px) {
                .form-fieldset {
                  grid-column: span 2;
                }
              }
            `}} />

            <fieldset className="form-fieldset" style={{ gridColumn: 'span 1' }}>
              <legend className="form-legend">Name</legend>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name here" className="form-input" required />
            </fieldset>

            <fieldset className="form-fieldset" style={{ gridColumn: 'span 1' }}>
              <legend className="form-legend">Email</legend>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email here" className="form-input" required />
            </fieldset>

            <fieldset className="form-fieldset" style={{ gridColumn: 'span 1' }}>
              <legend className="form-legend">Contact Number</legend>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16, paddingTop: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderRight: '1px solid rgba(255,255,255,0.2)', paddingRight: 12 }}>
                  <span style={{ fontSize: 16 }}>🇮🇳</span>
                  <span style={{ fontFamily: SANS, fontSize: 14, color: '#fff' }}>+91</span>
                </div>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter contact number here" style={{ background: 'transparent', border: 'none', color: '#fff', fontFamily: SANS, fontSize: 14, outline: 'none', width: '100%' }} required />
              </div>
            </fieldset>

            <fieldset className="form-fieldset" style={{ gridColumn: 'span 1' }}>
              <legend className="form-legend">Applying For</legend>
              <input type="text" name="applyingFor" value={formData.applyingFor} onChange={handleChange} placeholder="Applying For" className="form-input" required />
            </fieldset>

            <fieldset className="form-fieldset" style={{ gridColumn: 'span 1', gridRow: 'span 2' }}>
              <legend className="form-legend">Your message</legend>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" className="form-input" style={{ resize: 'none', minHeight: 120 }} required />
            </fieldset>

            <fieldset className="form-fieldset" style={{ gridColumn: 'span 1' }}>
              <legend className="form-legend">Resume</legend>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16, paddingTop: 12 }}>
                <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" style={{ display: 'none' }} />
                <label htmlFor="resume" style={{ 
                  background: '#fff', color: '#000', 
                  fontFamily: SANS, fontSize: 12, fontWeight: 600, 
                  padding: '6px 12px', borderRadius: 4, cursor: 'pointer' 
                }}>
                  Choose file
                </label>
                <span style={{ fontFamily: SANS, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>No file chosen</span>
              </div>
            </fieldset>

            <div style={{ gridColumn: 'span 2', marginTop: 16 }}>
              <button type="submit" style={{
                background: '#A3D139', // Using the exact green from the image button
                color: '#000',
                fontFamily: SANS, fontSize: 13, fontWeight: 700,
                padding: '12px 32px',
                border: 'none', borderRadius: 999,
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Submit
              </button>
            </div>

          </form>
        </div>
      </section>

    </main>
  );
}
