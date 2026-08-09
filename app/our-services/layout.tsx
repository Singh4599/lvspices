import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bulk Spice Supply, OEM & Private Label Manufacturing Services | LV Spices',
  description: 'LV Spices offers end-to-end spice manufacturing services: bulk supply, OEM private labelling, custom spice blending, cold-chain storage, and global export logistics. FSSC 22000 certified. Trusted by buyers across 40+ countries.',
  keywords: [
    'OEM spice manufacturer India',
    'bulk spice supplier India',
    'custom spice blending India',
    'spice contract manufacturer',
    'private label spice service',
    'cold storage spice supplier',
    'export spice services India',
    'spice manufacturing service India',
    'spice blending company India',
    'food grade bulk spices India',
  ],
  openGraph: {
    title: 'Bulk Spice Supply, OEM & Private Label Services | LV Spices India',
    description: 'End-to-end spice manufacturing services for bulk buyers, OEM clients, and private label brands. 500+ SKUs. FSSC 22000 certified. 40+ countries served.',
    images: [{ url: '/images/hero-spices.png', width: 1200, height: 630, alt: 'LV Spices Manufacturing Services' }],
    type: 'website',
    locale: 'en_US',
    siteName: 'LV Spices',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OEM, Bulk & Private Label Spice Services | LV Spices India',
    description: 'Custom spice manufacturing, OEM production & private labelling — FSSC 22000 certified, serving 40+ countries.',
    images: ['/images/hero-spices.png'],
  },
  alternates: { canonical: 'https://lvspices.com/our-services' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
