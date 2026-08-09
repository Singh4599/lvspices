'use client';

import React from 'react';

const steps = [
  {
    id: 1,
    title: 'Automated Cleaning & Sorting',
    desc: 'Our fully automated cleaning and sorting system processes the spices without direct human contact, ensuring maximum hygiene, consistent quality, and efficient production.',
    video: '/videos/how-we-operate/1.mp4'
  },
  {
    id: 2,
    title: 'Removal of Damaged Materials',
    desc: 'Advanced screening systems identify and remove spoiled, broken, and inferior raw materials, allowing only premium quality ingredients to move to the next stage.',
    video: '/videos/how-we-operate/2.mp4'
  },
  {
    id: 3,
    title: 'Contaminant Removal',
    desc: 'Precision equipment eliminates stones, dust, metallic particles, and other impurities, ensuring safe, clean, and food-grade spices for processing.',
    video: '/videos/how-we-operate/3.mp4'
  },
  {
    id: 4,
    title: 'Hands-Free Grinding Technology',
    desc: 'Our automated grinding lines operate with minimal human intervention, maintaining strict hygiene standards while delivering uniform texture and consistent quality.',
    video: '/videos/how-we-operate/4.mp4'
  },
  {
    id: 5,
    title: 'Advanced Grinding Systems',
    desc: 'Multiple grinding technologies are used to preserve natural aroma, flavor, and essential oils, resulting in fresh and high quality spice blends.',
    video: '/videos/how-we-operate/5.mp4'
  }
];

export default function ProcessVideoSteps() {
  return (
    <section style={{ padding: '100px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        
        {/* Center Vertical Line (desktop) */}
        <div className="hidden md:block" style={{
          position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.1)'
        }} />

        {/* Mobile Vertical Line */}
        <div className="md:hidden" style={{
          position: 'absolute', top: 0, bottom: 0, left: 32, width: 2,
          background: 'rgba(0,0,0,0.1)'
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center', position: 'relative' }} className="flex-col md:flex-row">
                
                {/* Node Dot */}
                <div className="hidden md:block" style={{
                  position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                  width: 16, height: 16, borderRadius: '50%', background: '#fff', border: '3px solid #ccc', zIndex: 2
                }} />

                {/* Mobile Node Dot */}
                <div className="md:hidden" style={{
                  position: 'absolute', left: 32, top: 20, transform: 'translateX(-50%)',
                  width: 12, height: 12, borderRadius: '50%', background: '#fff', border: '2px solid #ccc', zIndex: 2
                }} />

                {/* Left Side (Text or Video) */}
                <div style={{ flex: 1, padding: isEven ? '0 60px 0 0' : '0 0 0 60px', textAlign: isEven ? 'left' : 'left' }} className={`hidden md:block ${!isEven ? 'order-2' : ''}`}>
                  {isEven ? (
                    <div>
                      <h3 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 12 }}>{step.title}</h3>
                      <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  ) : (
                    <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}>
                      <video src={step.video} autoPlay loop muted playsInline style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '16/9' }} />
                    </div>
                  )}
                </div>

                {/* Right Side (Video or Text) */}
                <div style={{ flex: 1, padding: isEven ? '0 0 0 60px' : '0 60px 0 0', textAlign: 'left' }} className={`hidden md:block ${!isEven ? 'order-1' : ''}`}>
                  {isEven ? (
                    <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}>
                      <video src={step.video} autoPlay loop muted playsInline style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '16/9' }} />
                    </div>
                  ) : (
                    <div>
                      <h3 style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 12 }}>{step.title}</h3>
                      <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  )}
                </div>

                {/* Mobile Layout (Stacked) */}
                <div className="md:hidden w-full" style={{ paddingLeft: 64 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 8, marginTop: 12 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6, marginBottom: 20 }}>{step.desc}</p>
                  <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                    <video src={step.video} autoPlay loop muted playsInline style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '16/9' }} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
