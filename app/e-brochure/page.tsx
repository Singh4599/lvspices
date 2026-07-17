import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E Brochure | LV Spices',
  description: 'LV Spices — E Brochure page coming soon.',
};

export default function Page() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
      <div style={{ textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(32px,6vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>
          E Brochure
        </h1>
        <p style={{ fontFamily: 'system-ui, sans-serif', color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>
          Content coming soon.
        </p>
      </div>
    </main>
  );
}
