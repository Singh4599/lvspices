"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProductHighlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon displayed at top of card */
  categoryIcon?: React.ReactNode;
  /** Category/tag label */
  category?: string;
  /** Main heading */
  title: string;
  /** Supporting text */
  description?: string;
  /** Number watermark (01, 02, etc.) */
  number?: string;
  /** List of bullet points */
  bullets?: string[];
}

export const ProductHighlightCard = React.forwardRef<HTMLDivElement, ProductHighlightCardProps>(
  (
    {
      className,
      categoryIcon,
      category,
      title,
      description,
      number,
      bullets,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl md:rounded-3xl",
          "border border-black/[0.08]",
          "p-10 md:p-12 lg:p-16", // Increased padding for more breathing room
          "hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)]",
          "hover:-translate-y-0.5",
          "transition-all duration-500",
          "group",
          "flex flex-col items-center text-center", // Centered content
          className
        )}
        {...props}
      >
        {/* Number watermark — top center/right */}
        {number && (
          <span className="absolute top-6 right-0 left-0 text-center md:right-10 md:left-auto md:text-right font-display text-[4rem] md:text-[5rem] font-bold text-black/[0.025] leading-none select-none pointer-events-none">
            {number}
          </span>
        )}

        {/* Icon */}
        {categoryIcon && (
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[rgba(172,3,59,0.06)] border border-[rgba(172,3,59,0.1)] flex items-center justify-center text-[#AC033B] mx-auto mb-6 relative z-10">
            {categoryIcon}
          </div>
        )}

        {/* Category label */}
        {category && (
          <p className="font-mono text-[9.5px] md:text-[10px] tracking-[0.25em] uppercase text-[#AC033B] mb-4 relative z-10">
            {category}
          </p>
        )}

        {/* Title */}
        <h3 className="font-display text-lg md:text-xl font-bold text-white leading-snug mb-5 relative z-10">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-[13px] md:text-sm text-black/55 leading-relaxed mb-6 relative z-10">
            {description}
          </p>
        )}

        {/* Bullet list with crimson dashes */}
        {bullets && bullets.length > 0 && (
          <ul className="space-y-3 relative z-10 inline-block text-left mt-2">
            {bullets.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[12px] md:text-[13px] text-white/60 leading-relaxed">
                <span className="text-[#AC033B] font-bold mt-0.5 shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Custom children */}
        {children}
      </div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";
