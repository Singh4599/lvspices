import { Metadata } from 'next';
import { generatePageMeta } from '@/lib/seo';

export const metadata: Metadata = generatePageMeta({
  title: 'Contact',
  description: 'Get in touch with LV Spices. Request quotations, samples, or partner with our R&D team. Response within 24 hours.',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
