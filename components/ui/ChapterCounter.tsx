interface ChapterCounterProps {
  number: string | number;
  className?: string;
}

export default function ChapterCounter({ number, className = '' }: ChapterCounterProps) {
  const display = typeof number === 'number' ? String(number).padStart(2, '0') : number;

  return (
    <span
      className={`font-mono text-[#AC033B] font-bold leading-none select-none ${className}`}
      aria-hidden="true"
    >
      {display}
    </span>
  );
}
