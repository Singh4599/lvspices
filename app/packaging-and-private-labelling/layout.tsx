import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Label Spices & Custom Packaging | Launch Your Spice Brand | LV Spices India',
  description: 'Launch your own spice brand with LV Spices — India’s leading private label spice manufacturer since 1975. 500+ SKUs for custom branding. Flexible MOQ. FSSC 22000 & HACCP certified. End-to-end from formulation to export-ready packaging. Serving 40+ countries.',
  keywords: [
    'private label spices India',
    'custom spice packaging India',
    'private label spice manufacturer',
    'own brand spices India',
    'white label spice supplier',
    'custom spice branding India',
    'spice OEM manufacturer India',
    'launch spice brand India',
    'custom packaging spices',
    'spice contract packaging India',
  ],
  openGraph: {
    title: 'Private Label Spices & Custom Packaging | LV Spices India',
    description: 'Launch your own spice brand. 500+ SKUs, flexible MOQ, FSSC 22000 certified — LV Spices handles formulation, packaging design, and export-ready delivery.',
    images: [{ url: '/images/hero-spices.png', width: 1200, height: 630, alt: 'Private Label Spice Manufacturing India — LV Spices' }],
    type: 'website',
    locale: 'en_US',
    siteName: 'LV Spices',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Label Spice Manufacturer India | LV Spices',
    description: '500+ SKUs for your brand. FSSC 22000 certified. Flexible MOQ. End-to-end custom spice packaging & private labelling.',
    images: ['/images/hero-spices.png'],
  },
  alternates: { canonical: 'https://lvspices.com/packaging-and-private-labelling' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

export default function PackagingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
