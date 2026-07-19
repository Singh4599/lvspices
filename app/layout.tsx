import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts';
import { generatePageMeta, generateOrganizationSchema } from '@/lib/seo';
import SmoothScrollProvider from '@/components/animation/SmoothScrollProvider';
import ScrollProgress from '@/components/animation/ScrollProgress';
import PageTransition from '@/components/animation/PageTransition';
import Loader from '@/components/ui/Loader';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Footer from '@/components/layout/Footer';
import NoiseOverlay from '@/components/layout/NoiseOverlay';
import ClientEffects from '@/components/animation/ClientEffects';
import './globals.css';

export const metadata: Metadata = {
  ...generatePageMeta(),
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#111]">
        <ClientEffects />
        <SmoothScrollProvider>
          <PageTransition />
          <Loader />
          <ScrollProgress />
          <NoiseOverlay />
          <FloatingNav />
          <main className="flex-1" style={{ position: 'relative', zIndex: 1 }}>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
