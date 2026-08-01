'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const CRIMSON = '#AC033B';
const SERIF = 'var(--font-display), Georgia, "Times New Roman", serif';
const SANS = 'var(--font-sans), Inter, system-ui, sans-serif';
const MONO = 'var(--font-mono), "JetBrains Mono", monospace';

export default function PhoneContactForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', whatsapp: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 10,
    fontSize: 13, fontFamily: SANS, color: '#111', background: '#fafafa', outline: 'none', 
    transition: 'border-color 200ms ease', boxSizing: 'border-box',
  };

  return (
    <div id="contact-form" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {/* PHONE MOCKUP CONTAINER */}
      <ScrollReveal fromY={30} style={{ 
        width: '100%', maxWidth: 420, background: '#1a1a1a', padding: '12px', 
        borderRadius: 48, boxShadow: '0 24px 80px rgba(0,0,0,0.12), inset 0 4px 12px rgba(255,255,255,0.1)',
        position: 'relative', border: '1px solid rgba(255,255,255,0.08)'
      }}>
        
        {/* PHYSICAL BUTTONS (Volume/Power) */}
        <div style={{ position: 'absolute', left: -4, top: 120, width: 4, height: 32, background: '#1a1a1a', borderRadius: '4px 0 0 4px' }} />
        <div style={{ position: 'absolute', left: -4, top: 168, width: 4, height: 48, background: '#1a1a1a', borderRadius: '4px 0 0 4px' }} />
        <div style={{ position: 'absolute', right: -4, top: 140, width: 4, height: 60, background: '#1a1a1a', borderRadius: '0 4px 4px 0' }} />

        {/* SCREEN */}
        <div style={{ 
          background: '#fff', borderRadius: 36, height: '100%', minHeight: 700, 
          position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' 
        }}>
          
          {/* NOTCH */}
          <div style={{ 
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', 
            width: 120, height: 28, background: '#1a1a1a', 
            borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 10 
          }}>
            {/* Camera dot */}
            <div style={{ position: 'absolute', top: 8, right: 24, width: 8, height: 8, borderRadius: '50%', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)' }} />
          </div>

          {/* SCREEN CONTENT */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '60px 24px 30px' }} className="plb2-scroll">
            
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: CRIMSON, marginBottom: 8 }}>Get Started</div>
              <h2 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 800, color: '#111', letterSpacing: '-0.02em', margin: '0 0 10px', lineHeight: 1.1 }}>
                Launch<br /><em style={{ color: CRIMSON, fontStyle: 'italic' }}>Your Brand</em>
              </h2>
              <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.5)', margin: 0, lineHeight: 1.5 }}>
                Fill this out and we'll reply via WhatsApp or email.
              </p>
            </div>

            {sent ? (
              <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 20, padding: '40px 24px', textAlign: 'center', marginTop: 40, animation: 'plb2-up 0.4s ease forwards' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: SERIF, fontSize: 22, color: '#111', margin: '0 0 8px' }}>Request Sent!</h3>
                <p style={{ fontFamily: SANS, fontSize: 13, color: 'rgba(0,0,0,0.6)' }}>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { key: 'name', label: 'Name', placeholder: 'Jane Doe', type: 'text' },
                  { key: 'company', label: 'Company', placeholder: 'Acme Foods', type: 'text' },
                  { key: 'email', label: 'Email', placeholder: 'you@company.com', type: 'email' },
                  { key: 'whatsapp', label: 'WhatsApp', placeholder: '+44 0000 0000', type: 'tel' },
                ].map(f => (
                  <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} required={f.label.includes('*')} value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = CRIMSON)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')} />
                  </div>
                ))}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                  <label style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)' }}>Vision & Products</label>
                  <textarea rows={3} placeholder="I want to launch 3 spice blends in standup pouches..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.target.style.borderColor = CRIMSON)}
                    onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.08)')} />
                </div>

                <button type="submit" style={{ 
                  fontFamily: SANS, fontSize: 14, fontWeight: 600, background: CRIMSON, color: '#fff', 
                  padding: '14px 20px', borderRadius: 999, border: 'none', cursor: 'pointer', transition: 'all 0.25s',
                  boxShadow: '0 8px 20px rgba(172,3,59,0.2)'
                }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  Send Request →
                </button>
              </form>
            )}

            {/* Home Bar */}
            <div style={{ width: 120, height: 4, background: 'rgba(0,0,0,0.15)', borderRadius: 2, margin: '30px auto 0' }} />
          </div>

        </div>
      </ScrollReveal>
    </div>
  );
}
