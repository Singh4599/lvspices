import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact LV Spices | Spice Export Inquiry, Bulk Orders & Private Label Queries',
  description: 'Contact LV Spices for bulk spice orders, OEM manufacturing, private label partnerships, and export inquiries. Based in Mumbai, India. Serving 40+ countries. Export team replies within 24 hours. WhatsApp, email & phone available.',
  keywords: [
    'contact LV Spices',
    'spice export inquiry India',
    'bulk spice order inquiry',
    'private label spice manufacturer contact',
    'spice supplier Mumbai contact',
    'OEM spice inquiry India',
    'Indian spice exporter contact',
    'spice manufacturer WhatsApp',
    'spice export quotation India',
    'request spice samples India',
  ],
  openGraph: {
    title: 'Contact LV Spices | Bulk Orders, OEM & Private Label Inquiries',
    description: 'Get in touch with India\'s trusted spice manufacturer. Bulk supply, OEM, and private label inquiries welcome. Mumbai-based. 40+ countries served. Replies within 24 hours.',
    images: [{ url: '/images/factory.png', width: 1200, height: 630, alt: 'Contact LV Spices — Spice Manufacturer Mumbai India' }],
    type: 'website',
    locale: 'en_US',
    siteName: 'LV Spices',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact LV Spices | Spice Export Inquiry',
    description: 'Reach India\'s trusted spice manufacturer for bulk orders, OEM & private label. WhatsApp, email, or phone. Replies in 24 hours.',
    images: ['/images/factory.png'],
  },
  alternates: { canonical: 'https://lvspices.com/contact' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
