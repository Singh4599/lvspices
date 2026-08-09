import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spice Products | 500+ SKUs — Ground, Whole, Blended & Organic | LV Spices India',
  description: "Explore LV Spices' 500+ product range: ground spices, whole spices, masalas, curry powders, chilli specialities, organic spices, dehydrated vegetables, botanical powders, and herbal teas. Available for bulk supply, OEM & private label. FSSC 22000 certified. Export to 40+ countries.",
  keywords: [
    'Indian spice products range',
    'bulk spice supplier product list',
    'ground spices India export',
    'whole spices India bulk',
    'masala manufacturer India',
    'chilli speciality exporter India',
    'organic spice supplier India',
    'curry powder manufacturer India',
    'dehydrated vegetables India export',
    'herbal tea manufacturer India',
    'snack seasoning supplier India',
    'agri products India exporter',
    'private label spice products India',
    'bulk masala supplier India',
    '500 SKU spice catalogue India',
  ],
  openGraph: {
    title: '500+ Spice Products | Ground, Whole, Masalas & Organic | LV Spices India',
    description: "India's most comprehensive spice product range: 500+ SKUs across 12 categories — ground spices, whole spices, masalas, chilli specialities, organic, and more. Bulk, OEM & private label available.",
    images: [{ url: '/images/products.png', width: 1200, height: 630, alt: 'LV Spices Product Range — 500+ SKUs' }],
    type: 'website',
    locale: 'en_US',
    siteName: 'LV Spices',
  },
  twitter: {
    card: 'summary_large_image',
    title: '500+ Spice Products | LV Spices India',
    description: 'Ground spices, whole spices, masalas, chilli specialities, organic & more. Bulk, OEM & private label. FSSC 22000 certified.',
    images: ['/images/products.png'],
  },
  alternates: { canonical: 'https://lvspices.com/products' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
