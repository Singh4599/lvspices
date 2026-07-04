'use client';

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
  textClassName?: string;
  separator?: string;
}

export default function Marquee({
  text,
  speed = 30,
  className = '',
  textClassName = '',
  separator = ' • ',
}: MarqueeProps) {
  const repeatedText = `${text}${separator}`.repeat(8);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="marquee-track inline-flex"
        style={{ animationDuration: `${speed}s` }}
      >
        <span
          className={`inline-block animate-marquee ${textClassName}`}
          style={{ animationDuration: `${speed}s` }}
        >
          {repeatedText}
        </span>
        <span
          className={`inline-block animate-marquee ${textClassName}`}
          style={{ animationDuration: `${speed}s` }}
          aria-hidden="true"
        >
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
