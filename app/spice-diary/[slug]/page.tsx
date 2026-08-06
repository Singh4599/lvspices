import { SPICES } from '../data';
import { notFound } from 'next/navigation';
import SpiceDetailClient from './SpiceDetailClient';

export async function generateStaticParams() {
  return SPICES.map(s => ({ slug: s.slug }));
}

export default function SpiceDetailPage({ params }: { params: { slug: string } }) {
  const spice = SPICES.find(s => s.slug === params.slug);
  if (!spice) notFound();
  return <SpiceDetailClient spice={spice} />;
}
