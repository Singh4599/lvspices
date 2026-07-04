'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/animation/MagneticButton';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#AC033B] text-white hover:bg-[#8e0231] hover:-translate-y-[2px] active:translate-y-0',
  outline:
    'bg-transparent text-[#AC033B] border-2 border-[#AC033B] hover:bg-[#AC033B] hover:text-white hover:-translate-y-[2px] active:translate-y-0',
  ghost:
    'bg-transparent text-white hover:text-[#AC033B]',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      magnetic = true,
      icon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isPrimary = variant === 'primary';
    const isOutline = variant === 'outline';

    const heights: Record<ButtonSize, string> = {
      sm: '52px',
      md: '62px',
      lg: '72px',
    };

    const fontSizes: Record<ButtonSize, string> = {
      sm: '12px',
      md: '13px',
      lg: '15px',
    };

    const h = heights[size];
    const fs = fontSizes[size];

    const button = (
      <button
        ref={ref}
        className={cn(
          variantStyles[variant],
          'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'focus-visible:ring-2 focus-visible:ring-[#AC033B] focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        style={{
          height: h,
          padding: '0 34px',
          borderRadius: '999px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px',
          width: 'auto',
          minWidth: 'unset',
          fontSize: fs,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          fontFamily: 'inherit',
          boxShadow: isPrimary
            ? '0 6px 28px rgba(0,0,0,0.16), 0 2px 6px rgba(0,0,0,0.08)'
            : 'none',
        }}
        {...props}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </span>

        {(isPrimary || isOutline) && (
          <span
            className="arrow"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              position: 'relative',
              top: '-1px',
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            →
          </span>
        )}

        {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      </button>
    );

    if (magnetic) {
      return <MagneticButton>{button}</MagneticButton>;
    }

    return button;
  }
);

Button.displayName = 'Button';
export default Button;
