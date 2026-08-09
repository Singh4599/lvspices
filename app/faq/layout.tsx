import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Spice Manufacturing, Export, Private Label & Quality | LV Spices',
  description: 'Answers to 21+ questions about LV Spices\' bulk spice supply, OEM manufacturing, private label services, export compliance, cryogenic grinding, certifications (FSSC 22000, NABL, Halal), MOQ, and custom spice blending. India\'s trusted spice manufacturer since 1975.',
  keywords: [
    'spice manufacturer FAQ India',
    'LV Spices frequently asked questions',
    'private label spice FAQ',
    'bulk spice supplier India FAQ',
    'cryogenic grinding spices FAQ',
    'spice export certifications India',
    'minimum order quantity spices India',
    'FSSC 22000 spice manufacturer FAQ',
    'OEM spice manufacturing questions',
    'custom spice blend FAQ India',
  ],
  openGraph: {
    title: 'FAQ — Spice Manufacturing, Export & Private Label | LV Spices India',
    description: '21+ expert answers about bulk spice supply, OEM, private label, export compliance, and cryogenic grinding. India\'s trusted spice manufacturer since 1975.',
    images: [{ url: '/images/lab.png', width: 1200, height: 630, alt: 'LV Spices FAQ — Spice Manufacturing Expertise' }],
    type: 'website',
    locale: 'en_US',
    siteName: 'LV Spices',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spice Manufacturing FAQ | LV Spices India',
    description: 'Everything you need to know about Indian spice manufacturing, export, private label, and quality certifications.',
    images: ['/images/lab.png'],
  },
  alternates: { canonical: 'https://lvspices.com/faq' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
