import SectionLabel from '@/components/ui/SectionLabel';
import RevealText from '@/components/animation/RevealText';

interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
  stats?: { value: string; label: string }[];
}

export default function PageHero({
  label,
  title,
  subtitle,
  className = '',
  children,
  stats,
}: PageHeroProps) {
  return (
    <section className={`min-h-[85vh] flex flex-col justify-center pt-32 md:pt-44 pb-20 md:pb-32 relative overflow-hidden ${className}`}>
      <div className="container-lv relative z-10">
        <SectionLabel>{label}</SectionLabel>

        <RevealText
          as="h1"
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white mt-8 md:mt-10 max-w-5xl"
          splitBy="words"
        >
          {title}
        </RevealText>

        {subtitle && (
          <p className="text-[clamp(1rem,1.8vw,1.25rem)] text-white/50 leading-relaxed mt-7 md:mt-9 max-w-2xl">
            {subtitle}
          </p>
        )}

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-16 mt-14 md:mt-20 pt-12 md:pt-14 border-t border-black/[0.06]">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-[clamp(2rem,4vw,3.5rem)] font-bold text-[#AC033B] leading-none mb-3">{s.value}</div>
                <div className="font-sans text-[12px] text-white/30 tracking-[0.15em] uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>

      {/* Decorative crimson blur — adds depth */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#AC033B]/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#AC033B]/[0.03] blur-[100px] pointer-events-none" />
    </section>
  );
}
