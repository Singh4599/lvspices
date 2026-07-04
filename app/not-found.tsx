import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="container-lv text-center">
        <span className="font-mono text-[120px] md:text-[180px] font-bold text-[#AC033B] leading-none opacity-10 block">
          404
        </span>
        <h1 className="font-display text-[28px] md:text-[40px] font-bold text-white -mt-8 md:-mt-12">
          Page not found
        </h1>
        <p className="text-[16px] text-white/50 mt-4 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Link href="/">
            <Button variant="primary" size="lg">Back to Home</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
