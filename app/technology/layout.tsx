import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spice Processing Technology | Cryogenic Grinding & Steam Sterilization | LV Spices',
  description: 'LV Spices uses proprietary CFG Science — Cryogenic-Forced Grinding at -196°C — preserving up to 97% volatile oils. Paired with steam sterilization and a NABL-accredited in-house lab, every batch is export-grade. FSSC 22000 certified spice manufacturer, India.',
  keywords: [
    'cryogenic grinding spices India',
    'CFG Science spice processing',
    'steam sterilization spices',
    'NABL accredited spice lab',
    'spice processing technology India',
    'volatile oil retention spices',
    'advanced spice manufacturing India',
    'food safety certified spice manufacturer',
    'hygienic spice processing plant',
    'spice quality control India',
  ],
  openGraph: {
    title: 'Advanced Spice Processing Technology | LV Spices India',
    description: 'Proprietary CFG Science — Cryogenic-Forced Grinding at -196°C — delivers the highest volatile oil retention in the Indian spice industry. FSSC 22000, ISO 22000, NABL certified.',
    images: [{ url: '/images/factory.png', width: 1200, height: 630, alt: 'LV Spices Cryogenic Grinding Technology' }],
    type: 'website',
    locale: 'en_US',
    siteName: 'LV Spices',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advanced Spice Processing Technology | LV Spices India',
    description: 'Cryogenic-Forced Grinding, Steam Sterilization & NABL Lab — India\'s most advanced spice processing technology.',
    images: ['/images/factory.png'],
  },
  alternates: { canonical: 'https://lvspices.com/technology' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
